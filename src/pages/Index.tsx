import React, { useState } from 'react';
import { ChatInterface } from '@/components/ChatInterface';
import { BreathingExercise } from '@/components/BreathingExercise';
import { AffirmationModal } from '@/components/AffirmationModal';
import { EmotionDetection } from '@/components/EmotionDetection';
import { LoadingScreen } from '@/components/LoadingScreen';

const Index = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [showBreathing, setShowBreathing] = useState(false);
  const [showAffirmation, setShowAffirmation] = useState(false);
  const [currentEmotion, setCurrentEmotion] = useState<string>('neutral');

  const handleEmotionDetected = (emotion: string) => {
    setCurrentEmotion(emotion);
    console.log('Emotion detected:', emotion);
  };

  const handleLoadingComplete = () => {
    setIsLoading(false);
  };

  if (isLoading) {
    return <LoadingScreen onComplete={handleLoadingComplete} />;
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-6">
        {/* Privacy Notice */}
        <div className="glass-card p-4 mb-6 text-center">
          <p className="text-sm text-muted-foreground">
            🔒 <strong>100% Confidential:</strong> All conversations happen in your browser. 
            Nothing is stored or shared. Your privacy is our priority.
          </p>
        </div>

        <div className="grid lg:grid-cols-4 gap-6 h-[calc(100vh-12rem)]">
          {/* Emotion Detection Sidebar */}
          <div className="lg:col-span-1 space-y-4">
            <EmotionDetection onEmotionDetected={handleEmotionDetected} />
            
            {/* Current Status */}
            <div className="glass-card p-4">
              <h3 className="font-semibold text-sm mb-2">Your Wellbeing</h3>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Mood:</span>
                  <span className="capitalize text-primary">{currentEmotion}</span>
                </div>
                <div className="w-full h-2 bg-surface-elevated rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-blue-400 to-green-400 transition-all duration-500"
                    style={{ width: '75%' }}
                  />
                </div>
              </div>
            </div>

            {/* Quick Tips */}
            <div className="glass-card p-4">
              <h3 className="font-semibold text-sm mb-2">💡 Quick Tips</h3>
              <ul className="text-xs text-muted-foreground space-y-1">
                <li>• Try the breathing exercise for instant calm</li>
                <li>• Use voice input for hands-free support</li>
                <li>• Share your feelings openly - this is a safe space</li>
              </ul>
            </div>
          </div>

          {/* Main Chat Interface */}
          <div className="lg:col-span-3">
            <ChatInterface
              onBreathingExercise={() => setShowBreathing(true)}
              onAffirmation={() => setShowAffirmation(true)}
            />
          </div>
        </div>
      </div>

      {/* Modals */}
      <BreathingExercise
        isOpen={showBreathing}
        onClose={() => setShowBreathing(false)}
      />
      
      <AffirmationModal
        isOpen={showAffirmation}
        onClose={() => setShowAffirmation(false)}
      />
    </div>
  );
};

export default Index;
