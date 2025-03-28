import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { FaCar, FaTrafficLight, FaVideo, FaChartLine, FaShieldAlt } from 'react-icons/fa';
import { MdTimer, MdAutorenew } from 'react-icons/md';
import { BiCctv } from 'react-icons/bi';
import './SignalAutomation.css'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const SignalAutomation = () => {
  const [junctions, setJunctions] = useState([
    { id: 1, name: 'North Junction', density: 0, signal: 'red', waitTime: 0, timer: 0 },
    { id: 2, name: 'South Junction', density: 0, signal: 'red', waitTime: 0, timer: 0 },
    { id: 3, name: 'East Junction', density: 0, signal: 'red', waitTime: 0, timer: 0 },
    { id: 4, name: 'West Junction', density: 0, signal: 'red', waitTime: 0, timer: 0 },
  ]);

  const [currentGreenIndex, setCurrentGreenIndex] = useState(0);
  const [simulationActive, setSimulationActive] = useState(false);
  const [cctvActive, setCctvActive] = useState(true);
  const [violationDetectionActive, setViolationDetectionActive] = useState(false);
  const [recentViolations, setRecentViolations] = useState([]);
  const simulationRef = useRef(null);
  const timerRef = useRef(null);
  const videoRefs = useRef([]);

  // Chart configuration
  const chartData = {
    labels: junctions.map(j => j.name),
    datasets: [
      {
        label: 'Traffic Density (%)',
        data: junctions.map(j => j.density),
        borderColor: 'rgb(75, 192, 192)',
        backgroundColor: 'rgba(75, 192, 192, 0.5)',
        tension: 0.4,
      },
      {
        label: 'Wait Time (seconds)',
        data: junctions.map(j => j.waitTime),
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
        tension: 0.4,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Real-time Traffic Analysis',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 100,
      },
    },
  };

  // Calculate signal timing based on traffic density
  const calculateGreenTime = (density) => {
    // Define timing based on density ranges
    if (density <= 10) {
      return 10; // 1-10% density: 10 seconds
    } else if (density <= 30) {
      return 20; // 10-30% density: 20 seconds
    } else if (density <= 50) {
      return 30; // 30-50% density: 30 seconds
    } else if (density <= 75) {
      return 40; // 50-75% density: 40 seconds
    } else {
      return 60; // 75-100% density: 60 seconds
    }
  };

  // Calculate red time for other signals based on current green signal
  const calculateRedTime = (greenTime, position, currentGreen) => {
    // Calculate how many signals ahead this one is from the current green
    const distance = (position - currentGreen + 4) % 4;
    return greenTime * distance;
  };

  // Simulated YOLO detection results with more realistic patterns
  const detectTraffic = (videoElement, junctionId) => {
    // Simulate more realistic traffic patterns
    const timeOfDay = new Date().getHours();
    const isRushHour = (timeOfDay >= 8 && timeOfDay <= 10) || (timeOfDay >= 16 && timeOfDay <= 18);
    
    // Base density varies by time of day
    let baseDensity = isRushHour ? 75 : 35;
    
    // Add some randomization
    const variation = Math.random() * 20 - 10; // ±10
    
    // Ensure density stays within bounds and aligns with our timing ranges
    const density = Math.max(1, Math.min(100, baseDensity + variation));
    
    // Round to nearest 5% for more stable readings
    return Math.round(density / 5) * 5;
  };

  // Switch signals based on timer
  const switchSignals = () => {
    setJunctions(prevJunctions => {
      const newJunctions = [...prevJunctions];
      const currentJunction = newJunctions[currentGreenIndex];
      
      // Only switch if current green signal timer is at 0
      if (currentJunction.timer <= 0) {
        // Calculate next green index in cyclic order
        const nextGreenIndex = (currentGreenIndex + 1) % 4;
        const nextJunction = newJunctions[nextGreenIndex];
        
        // Calculate green time for next junction based on its density
        const greenTime = calculateGreenTime(nextJunction.density);
        
        // Update all junction signals and timers
        newJunctions.forEach((junction, index) => {
          if (index === nextGreenIndex) {
            // Next junction gets green
            junction.signal = 'green';
            junction.timer = greenTime;
          } else if (index === currentGreenIndex) {
            // Current green changes to red
            junction.signal = 'red';
            junction.timer = greenTime * ((4 + index - nextGreenIndex) % 4); // Time until its next turn
          } else {
            // Other junctions stay red with updated wait times
            junction.signal = 'red';
            junction.timer = greenTime * ((4 + index - nextGreenIndex) % 4); // Time until their turn
          }
        });
        
        // Set yellow signal for the next junction in sequence
        const futureGreenIndex = (nextGreenIndex + 1) % 4;
        newJunctions[futureGreenIndex].signal = 'yellow';
        
        // Update current green index
        setCurrentGreenIndex(nextGreenIndex);
      }
      
      return newJunctions;
    });
  };

  const handleViolationDetected = (challan) => {
    setRecentViolations(prev => [challan, ...prev].slice(0, 10)); // Keep last 10 violations
    
    // Simulate notification to police and vehicle owner
    console.log(`SMS sent to police: New violation detected at ${challan.location}`);
    console.log(`SMS sent to vehicle owner ${challan.vehicleNumber}: E-challan generated`);
  };

  useEffect(() => {
    if (simulationActive) {
      // Update traffic density every 2 seconds
      simulationRef.current = setInterval(() => {
        setJunctions(prevJunctions => {
          return prevJunctions.map(junction => {
            const density = detectTraffic(videoRefs.current[junction.id - 1], junction.id);
            return {
              ...junction,
              density,
              waitTime: Math.floor(junction.timer),
            };
          });
        });
      }, 2000);

      // Initialize first green signal if not already set
      if (!junctions.some(j => j.signal === 'green')) {
        switchSignals();
      }
      
      // Update timers every second and check for signal changes
      timerRef.current = setInterval(() => {
        setJunctions(prevJunctions => {
          const newJunctions = prevJunctions.map(junction => ({
            ...junction,
            timer: Math.max(0, junction.timer - 1),
          }));
          
          // Check if current green signal timer is at 0
          if (newJunctions[currentGreenIndex].timer === 0) {
            switchSignals();
          }
          
          return newJunctions;
        });
      }, 1000);
    } else {
      if (simulationRef.current) {
        clearInterval(simulationRef.current);
      }
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    }

    return () => {
      if (simulationRef.current) {
        clearInterval(simulationRef.current);
      }
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [simulationActive, currentGreenIndex]);

  return (
    <div className="signal-automation-container">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold flex items-center gap-3">
            <FaTrafficLight className="text-green-500" />
            Intelligent Traffic Signal Control
          </h1>
          
          <button
            className={`control-button ${violationDetectionActive ? 'bg-red-500 hover:bg-red-600' : 'bg-blue-500 hover:bg-blue-600'}`}
            onClick={() => setViolationDetectionActive(!violationDetectionActive)}
          >
            <FaShieldAlt />
            {violationDetectionActive ? 'Disable Rule Violation Detection' : 'Enable Rule Violation Detection'}
          </button>
        </div>

        <div className="mb-6 bg-white rounded-lg shadow-lg p-4">
          <h2 className="text-xl font-semibold mb-3">Signal Timing Rules</h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3 text-sm">
            <div className="p-2 bg-gray-50 rounded">
              <div className="font-semibold">1-10%</div>
              <div className="text-gray-600">10 sec</div>
            </div>
            <div className="p-2 bg-gray-50 rounded">
              <div className="font-semibold">10-30%</div>
              <div className="text-gray-600">20 sec</div>
            </div>
            <div className="p-2 bg-gray-50 rounded">
              <div className="font-semibold">30-50%</div>
              <div className="text-gray-600">30 sec</div>
            </div>
            <div className="p-2 bg-gray-50 rounded">
              <div className="font-semibold">50-75%</div>
              <div className="text-gray-600">40 sec</div>
            </div>
            <div className="p-2 bg-gray-50 rounded">
              <div className="font-semibold">75-100%</div>
              <div className="text-gray-600">60 sec</div>
            </div>
          </div>
        </div>

        <div className="cctv-grid">
          {junctions.map((junction, index) => (
            <motion.div
              key={junction.id}
              className="cctv-feed"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="traffic-animation">
                <div className="road">
                  <div className="road-line" />
                </div>
                {[...Array(Math.ceil(junction.density / 20))].map((_, i) => (
                  <div
                    key={i}
                    className={`vehicle car${(i % 4) + 1} ${junction.signal === 'green' ? 'active' : ''}`}
                    style={{
                      '--speed': `${junction.signal === 'green' ? '2s' : '4s'}`,
                      animationDelay: `${i * 0.5}s`
                    }}
                  />
                ))}
              </div>
              
              <div className="analytics-overlay">
                <BiCctv />
                <span className="live-indicator">LIVE</span>
                <span>{Math.round(junction.density)}% Density</span>
              </div>

              <div className="signal-controls mt-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold">{junction.name}</h3>
                  <div className="flex items-center gap-2">
                    <div className={`signal-light ${junction.signal}`}>
                      <span className="timer-display">{Math.ceil(junction.timer)}s</span>
                    </div>
                    <span className="signal-status">{junction.signal.toUpperCase()}</span>
                  </div>
                </div>
                
                <div className="density-bar">
                  <div
                    className="density-bar-fill"
                    style={{
                      width: `${junction.density}%`,
                      backgroundColor: junction.density > 70 ? '#ff4444' : 
                                    junction.density > 40 ? '#ffbb33' : '#00C851'
                    }}
                  />
                </div>

                <div className="flex justify-between text-sm text-gray-600">
                  <span>Density: {Math.round(junction.density)}%</span>
                  <span>Wait Time: {junction.timer > 0 ? Math.ceil(junction.timer) : 0}s</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="flex gap-4 mb-8">
          <button
            className="control-button"
            onClick={() => setSimulationActive(!simulationActive)}
          >
            {simulationActive ? <MdTimer /> : <MdAutorenew />}
            {simulationActive ? 'Stop Automation' : 'Start Automation'}
          </button>
          
          <button
            className="control-button"
            onClick={() => setCctvActive(!cctvActive)}
          >
            <FaVideo />
            {cctvActive ? 'Pause CCTV' : 'Resume CCTV'}
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
          <div className="chart-container">
            <Line data={chartData} options={chartOptions} />
          </div>
          
          {violationDetectionActive && (
            <div className="violation-container">
              <RuleViolationDetection
                junctionId={currentGreenIndex + 1}
                onViolationDetected={handleViolationDetected}
              />
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default SignalAutomation;
