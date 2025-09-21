import React, { useState } from 'react';
import { ChatInterface } from '@/components/ChatInterface';
import { BreathingExercise } from '@/components/BreathingExercise';
import { AffirmationModal } from '@/components/AffirmationModal';
import { EmotionDetection } from '@/components/EmotionDetection';
import { LoadingScreen } from '@/components/LoadingScreen';
import { AppSidebar } from '@/components/AppSidebar';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';
import { Menu } from 'lucide-react';

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
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <AppSidebar />
        
        <main className="flex-1">
          {/* Header with Sidebar Trigger */}
          <header className="glass-card h-16 flex items-center justify-between px-6 border-b border-glass-border">
            <div className="flex items-center gap-4">
              <SidebarTrigger asChild>
                <Button variant="outline" size="icon" className="glass-card border-glass-border">
                  <Menu className="w-4 h-4" />
                </Button>
              </SidebarTrigger>
              
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center animate-pulse-glow">
                  <span className="text-white font-bold text-sm">A</span>
                </div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                  Aura
                </h1>
              </div>
            </div>
            
            {/* Privacy Badge */}
            <div className="glass-card px-3 py-1 border border-green-500/20">
              <span className="text-xs text-green-400 font-medium">🔒 100% Private</span>
            </div>
          </header>

          <div className="p-6">
            <div className="grid lg:grid-cols-4 gap-6 h-[calc(100vh-8rem)]">
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
        </main>
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
    </SidebarProvider>
  );
};

export default Index;
