import React, { useState } from "react";
import { violations, addViolation } from "./violationsData"; // Import violations data
import axios from "axios";
import "./AddViolation.css"; 

const API_KEY = "Your_gemini_api_key"; // Replace with your Gemini API Key

const AddViolation = () => {
    const [formData, setFormData] = useState({
        licensePlate: "",
        violationType: "",
        date: "",
        location: "",
        driverName: "",
        fineAmount: "",
        officersInvolved: "",
        remarks: "",
    });
    const handleDelete = (index) => {
        const updatedViolations = violationList.filter((_, i) => i !== index);
        setViolationList(updatedViolations);
    };
    

    const [violationList, setViolationList] = useState(violations); // State for violations
    const [violationInfo, setViolationInfo] = useState({}); // Store violation details from Gemini API

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (Object.values(formData).some((value) => value === "")) {
            alert("Please fill in all fields.");
            return;
        }

        addViolation(formData); // Add violation to storage
        setViolationList([...violations]); // Update state

        setFormData({
            licensePlate: "",
            violationType: "",
            date: "",
            location: "",
            driverName: "",
            fineAmount: "",
            officersInvolved: "",
            remarks: "",
        });
    };

    const fetchViolationInfo = async (violationType) => {
        const prompt = `Provide information about the traffic violation: "${violationType}". Include its consequences and precaution tips.`;

        try {
            const response = await axios.post(
                `https://generativelanguage.googleapis.com/v1/models/gemini-1.5-pro:generateContent?key=${API_KEY}`,
                {
                    contents: [{ role: "user", parts: [{ text: prompt }] }]
                }
            );

            const reply = response.data.candidates[0].content.parts[0].text;
            setViolationInfo((prev) => ({ ...prev, [violationType]: reply }));
        } catch (error) {
            console.error("Error fetching violation details:", error);
            setViolationInfo((prev) => ({ ...prev, [violationType]: "Failed to fetch details." }));
        }
    };

    return (
        <div className="container">
            <h2 className="title">🚦 Add Traffic Violation</h2>
            <form className="form" onSubmit={handleSubmit}>
                <input type="text" name="licensePlate" placeholder="License Plate" value={formData.licensePlate} onChange={handleChange} required />
                <input type="text" name="violationType" placeholder="Violation Type" value={formData.violationType} onChange={handleChange} required />
                <input type="date" name="date" value={formData.date} onChange={handleChange} required />
                <input type="text" name="location" placeholder="Location" value={formData.location} onChange={handleChange} required />
                <input type="text" name="driverName" placeholder="Driver Name" value={formData.driverName} onChange={handleChange} required />
                <input type="number" name="fineAmount" placeholder="Fine Amount ($)" value={formData.fineAmount} onChange={handleChange} required />
                <input type="text" name="officersInvolved" placeholder="Officers Involved" value={formData.officersInvolved} onChange={handleChange} required />
                <textarea name="remarks" placeholder="Additional Remarks" value={formData.remarks} onChange={handleChange} required></textarea>
                <button type="submit" className="submit-btn">🚀 Add Violation</button>
            </form>

            <h2 className="title">📋 Traffic Violations</h2>
            <ul className="violation-list">
            {violationList.map((violation, index) => (
    <li key={index} className="violation-item">
        <p><strong>📌 License Plate:</strong> {violation.licensePlate}</p>
        <p><strong>⚠️ Violation Type:</strong> {violation.violationType}</p>
        <button 
            onClick={() => fetchViolationInfo(violation.violationType)}
            style={{ backgroundColor: "black", color: "white", padding: "10px 15px", border: "none", borderRadius: "25px", cursor: "pointer" }}
        >
            🔍 Get Violation Info
        </button>

        {violationInfo[violation.violationType] && (
            <div className="violation-info">
                <h4>📖 Violation Details:</h4>
                <p style={{ backgroundColor: "black", color: "white", padding: "20px", lineHeight: "1.8", borderRadius: "20px" }}>
                    {violationInfo[violation.violationType]}
                </p>
            </div>
        )}

        <p><strong>📅 Date:</strong> {violation.date}</p>
        <p><strong>📍 Location:</strong> {violation.location}</p>
        <p><strong>👤 Driver Name:</strong> {violation.driverName}</p>
        <p><strong>💰 Fine Amount:</strong> ${violation.fineAmount}</p>
        <p><strong>🚔 Officers Involved:</strong> {violation.officersInvolved}</p>
        <p><strong>📝 Remarks:</strong> {violation.remarks}</p>
        
        <button 
            onClick={() => handleDelete(index)}
            style={{ backgroundColor: "red", color: "white", padding: "5px 10px", border: "none", borderRadius: "5px", cursor: "pointer", marginTop: "10px" }}
        >
            🗑️ Delete
        </button>
    </li>
))}

            </ul>
        </div>
    );
};

export default AddViolation;
