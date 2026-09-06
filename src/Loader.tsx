import React, { useEffect, useState } from 'react';
import './Loader.css';

const LOADING_TEXTS = [
  "INITIALIZING SYSTEMS",
  "ESTABLISHING CONNECTION",
  "CALIBRATING NEURAL NET",
  "IGNITING CORE",
  "BUILDING WHAT'S NEXT..."
];

type Props = { onComplete: () => void };

export default function Loader({ onComplete }: Props) {
  const [loaded, setLoaded] = useState(false);
  const [progress, setProgress] = useState(0);
  const [hidden, setHidden] = useState(false);
  const [textIndex, setTextIndex] = useState(0);

  useEffect(() => {
    // Text changes
    const textInterval = setInterval(() => {
      setTextIndex(i => (i + 1) % LOADING_TEXTS.length);
    }, 800);
    return () => clearInterval(textInterval);
  }, []);

  useEffect(() => {
    // Simulate loading progress
    const interval = setInterval(() => {
      setProgress(p => {
        if (p >= 100) {
          clearInterval(interval);
          return 100;
        }
        return Math.min(100, p + Math.random() * 8 + 1); // slightly slower for cinematic feel
      });
    }, 150);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (progress === 100) {
      const timer = setTimeout(() => {
        setLoaded(true);
      }, 600);
      
      const hideTimer = setTimeout(() => {
        setHidden(true);
        onComplete();
      }, 3000); 
      
      return () => {
        clearTimeout(timer);
        clearTimeout(hideTimer);
      };
    }
  }, [progress, onComplete]);

  if (hidden) return null;

  return (
    <div className={`modern-loader-container ${loaded ? 'loaded' : ''}`}>
      {/* Top Half */}
      <div className="loader-half top">
        <div className="bg-image"></div>
      </div>

      {/* Bottom Half */}
      <div className="loader-half bottom">
        <div className="bg-image"></div>
      </div>
      
      {/* Cinematic Flash Overlay */}
      <div className="flash-overlay"></div>

      {/* Futuristic Progress HUD */}
      <div className="hud-overlay">
        <div className="hud-text-container">
            <span className="hud-status">{progress < 100 ? LOADING_TEXTS[textIndex] : "SYSTEM READY"}</span>
            <span className="hud-percentage">{Math.floor(progress)}%</span>
        </div>
        <div className="hud-progress-bar">
            <div className="hud-progress-fill" style={{ width: `${progress}%` }}>
                <div className="hud-progress-flare"></div>
            </div>
        </div>
      </div>
    </div>
  );
}
