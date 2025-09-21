import React, { useState, useEffect } from 'react';
import { Brain } from 'lucide-react';

interface LoadingScreenProps {
  onComplete: () => void;
}

export const LoadingScreen: React.FC<LoadingScreenProps> = ({ onComplete }) => {
  const [loadingText, setLoadingText] = useState('Initializing Aura...');
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const texts = [
      'Initializing Aura...',
      'Preparing your safe space...',
      'Loading wellness tools...',
      'Almost ready to listen...',
      'Welcome to your journey...'
    ];

    let textIndex = 0;
    let progressValue = 0;

    const progressInterval = setInterval(() => {
      progressValue += Math.random() * 15 + 5;
      if (progressValue >= 100) {
        progressValue = 100;
        clearInterval(progressInterval);
        setTimeout(() => {
          onComplete();
        }, 500);
      }
      setProgress(progressValue);
    }, 400);

    const textInterval = setInterval(() => {
      if (textIndex < texts.length - 1) {
        textIndex++;
        setLoadingText(texts[textIndex]);
      }
    }, 600);

    return () => {
      clearInterval(progressInterval);
      clearInterval(textInterval);
    };
  }, [onComplete]);

  return (
    <div className="loading-container">
      {/* Floating Particles */}
      <div className="loading-particles">
        <div className="particle"></div>
        <div className="particle"></div>
        <div className="particle"></div>
        <div className="particle"></div>
        <div className="particle"></div>
      </div>

      <div className="text-center">
        {/* Aura Logo with Glow */}
        <div className="aura-logo aura-logo-glow">
          <Brain className="w-8 h-8 text-white" />
        </div>

        {/* Brand Name */}
        <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent mb-2 animate-pulse-glow">
          Aura
        </h1>
        
        <p className="text-foreground/80 mb-8 text-lg">
          Your Confidential AI Companion
        </p>

        {/* Loading Bar */}
        <div className="loading-bar-container mb-6">
          <div 
            className="loading-bar"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Loading Text */}
        <p className="text-foreground/70 text-sm animate-fade-in">
          {loadingText}
        </p>

        {/* Progress Percentage */}
        <div className="mt-4">
          <span className="text-2xl font-bold text-primary">
            {Math.round(progress)}%
          </span>
        </div>

        {/* Breathing Animation Hint */}
        <div className="mt-8">
          <div className="w-4 h-4 rounded-full bg-blue-400 mx-auto animate-pulse"></div>
          <p className="text-xs text-foreground/50 mt-2">
            Take a deep breath while we prepare...
          </p>
        </div>
      </div>
    </div>
  );
};