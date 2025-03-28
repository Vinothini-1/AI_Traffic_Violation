import { useState, useEffect, useRef } from 'react';
import * as mobilenet from "@tensorflow-models/mobilenet";
import "@tensorflow/tfjs";

function Detection() {
    const [isModelLoading, setIsModelLoading] = useState(true);
    const [model, setModel] = useState(null);
    const [imageURL, setImageURL] = useState("");
    const [results, setResults] = useState([]);
    const [history, setHistory] = useState([]);

    const imageRef = useRef(null);
    const textInputRef = useRef(null);
    const fileInputRef = useRef(null);

    useEffect(() => {
        const loadModel = async () => {
            try {
                const loadedModel = await mobilenet.load();
                setModel(loadedModel);
            } catch (error) {
                console.error("Error loading model:", error);
            } finally {
                setIsModelLoading(false);
            }
        };
        loadModel();
    }, []);

    const uploadImage = (e) => {
        const file = e.target.files[0];
        if (file) {
            const url = URL.createObjectURL(file);
            setImageURL(url);
            setResults([]);
        }
    };

    const identify = async () => {
        if (!model) {
            console.error("Model is not loaded yet!");
            return;
        }
        if (!imageRef.current) {
            console.error("No image found for classification!");
            return;
        }
        try {
            const predictions = await model.classify(imageRef.current);
            setResults(predictions);
        } catch (error) {
            console.error("Error during classification:", error);
        }
    };

    const handleOnChange = (e) => {
        setImageURL(e.target.value);
        setResults([]);
    };

    const triggerUpload = () => fileInputRef.current?.click();

    useEffect(() => {
        if (imageURL) {
            setHistory((prevHistory) => [imageURL, ...prevHistory].slice(0, 5));
        }
    }, [imageURL]);

    if (isModelLoading) return <h2>Loading Model...</h2>;

    return (
        <div className="App">
            <h1 className='header'>Image Identification</h1>
            <div className='inputHolder'>
                <input type='file' accept='image/*' className='uploadInput' onChange={uploadImage} ref={fileInputRef} hidden />
                <button className='uploadImage' onClick={triggerUpload}>Upload Image</button>
                <span className='or'>OR</span>
                <input type="text" placeholder='Paste image URL' ref={textInputRef} onChange={handleOnChange} />
            </div>
            <div className="mainWrapper">
                <div className="mainContent">
                    <div className="imageHolder">
                        {imageURL && <img src={imageURL} alt="Upload Preview" crossOrigin="anonymous" ref={imageRef} />}
                    </div>
                    {results.length > 0 && (
                        <div className='resultsHolder'>
                            {results.map((result, index) => (
                                <div className='result' key={index}>
                                    <span className='name'>{result.className}</span>
                                    <span className='confidence'>Confidence: {(result.probability * 100).toFixed(2)}% {index === 0 && <span className='bestGuess'>Best Guess</span>}</span>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
                {imageURL && <button className='button' onClick={identify}>Identify Image</button>}
            </div>
            {history.length > 0 && (
                <div className="recentPredictions">
                    <h2>Recent Images</h2>
                    <div className="recentImages">
                        {history.map((image, index) => (
                            <div className="recentPrediction" key={index}>
                                <img src={image} alt='Recent' onClick={() => setImageURL(image)} />
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}

export default Detection;
