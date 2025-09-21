import React, { useRef, useEffect, useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Camera, CameraOff, Eye } from 'lucide-react';

interface EmotionDetectionProps {
  onEmotionDetected?: (emotion: string) => void;
}

export const EmotionDetection: React.FC<EmotionDetectionProps> = ({
  onEmotionDetected,
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isActive, setIsActive] = useState(false);
  const [currentEmotion, setCurrentEmotion] = useState<string>('neutral');
  const [stream, setStream] = useState<MediaStream | null>(null);

  const startCamera = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: 'user' } 
      });
      
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
        setStream(mediaStream);
        setIsActive(true);
        
        // Simulate emotion detection
        simulateEmotionDetection();
      }
    } catch (error) {
      console.error('Error accessing camera:', error);
    }
  };

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      setStream(null);
    }
    setIsActive(false);
  };

  const simulateEmotionDetection = () => {
    // This would be replaced with actual face-api.js integration
    const emotions = ['happy', 'calm', 'focused', 'neutral', 'thoughtful'];
    
    const interval = setInterval(() => {
      if (!isActive) {
        clearInterval(interval);
        return;
      }
      
      const randomEmotion = emotions[Math.floor(Math.random() * emotions.length)];
      setCurrentEmotion(randomEmotion);
      onEmotionDetected?.(randomEmotion);
    }, 3000);
  };

  useEffect(() => {
    return () => {
      stopCamera();
    };
  }, []);

  return (
    <Card className="glass-card p-4 max-w-sm">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold flex items-center gap-2">
            <Eye className="w-5 h-5 text-blue-400" />
            Emotion Sense
          </h3>
          <Button
            onClick={isActive ? stopCamera : startCamera}
            size="sm"
            variant={isActive ? "destructive" : "default"}
            className={isActive ? '' : 'wellness-button'}
          >
            {isActive ? <CameraOff className="w-4 h-4" /> : <Camera className="w-4 h-4" />}
          </Button>
        </div>

        {/* Video Feed */}
        <div className="relative">
          <video
            ref={videoRef}
            autoPlay
            muted
            playsInline
            className={`w-full h-32 object-cover rounded-lg ${
              isActive ? 'block' : 'hidden'
            }`}
          />
          {!isActive && (
            <div className="w-full h-32 bg-surface-elevated/50 rounded-lg flex items-center justify-center">
              <Camera className="w-8 h-8 text-muted-foreground" />
            </div>
          )}
          
          {/* Emotion Overlay */}
          {isActive && (
            <div className="absolute bottom-2 left-2 right-2">
              <div className="glass-card p-2 text-center">
                <span className="text-sm font-medium capitalize">
                  Feeling: <span className="text-primary">{currentEmotion}</span>
                </span>
              </div>
            </div>
          )}
        </div>

        <p className="text-xs text-muted-foreground text-center">
          {isActive 
            ? 'Aura can sense your emotional state to provide better support'
            : 'Enable camera to help Aura understand your emotional state'
          }
        </p>
      </div>
    </Card>
  );
};