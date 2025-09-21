import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Sparkles, RefreshCw, Volume2 } from 'lucide-react';

interface AffirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const affirmations = [
  "You are stronger than you think, and braver than you believe.",
  "Every challenge you face is making you wiser and more resilient.",
  "Your feelings are valid, and it's okay to take things one step at a time.",
  "You have survived difficult times before, and you will get through this too.",
  "You deserve love, kindness, and compassion - especially from yourself.",
  "Your mental health matters, and taking care of yourself is not selfish.",
  "You are worthy of peace, happiness, and all the good things life has to offer.",
  "It's okay to not be okay sometimes. Healing is not linear.",
  "You have the power to create positive change in your life.",
  "You are not alone in this journey. There are people who care about you."
];

export const AffirmationModal: React.FC<AffirmationModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [currentAffirmation, setCurrentAffirmation] = useState(
    affirmations[Math.floor(Math.random() * affirmations.length)]
  );
  const [isAnimating, setIsAnimating] = useState(false);

  const getNewAffirmation = () => {
    setIsAnimating(true);
    setTimeout(() => {
      const newAffirmation = affirmations[Math.floor(Math.random() * affirmations.length)];
      setCurrentAffirmation(newAffirmation);
      setIsAnimating(false);
    }, 300);
  };

  const speakAffirmation = () => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(currentAffirmation);
      utterance.rate = 0.8;
      utterance.pitch = 1.1;
      window.speechSynthesis.speak(utterance);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="glass-card border-0 max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-center text-2xl bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent flex items-center justify-center gap-2">
            <Sparkles className="w-6 h-6 text-green-400" />
            Daily Affirmation
          </DialogTitle>
        </DialogHeader>
        
        <div className="text-center space-y-8 py-6">
          {/* Affirmation Text */}
          <div className="glass-card p-6 min-h-[120px] flex items-center justify-center">
            <p 
              className={`text-lg leading-relaxed text-center transition-all duration-300 ${
                isAnimating ? 'opacity-0 transform scale-95' : 'opacity-100 transform scale-100'
              }`}
            >
              "{currentAffirmation}"
            </p>
          </div>

          {/* Decorative Elements */}
          <div className="flex justify-center space-x-4">
            <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></div>
            <div className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" style={{animationDelay: '0.5s'}}></div>
            <div className="w-2 h-2 rounded-full bg-purple-400 animate-pulse" style={{animationDelay: '1s'}}></div>
          </div>

          {/* Controls */}
          <div className="flex gap-3 justify-center">
            <Button
              onClick={getNewAffirmation}
              className="wellness-button flex items-center gap-2"
              disabled={isAnimating}
            >
              <RefreshCw className={`w-4 h-4 ${isAnimating ? 'animate-spin' : ''}`} />
              New Affirmation
            </Button>
            <Button
              onClick={speakAffirmation}
              variant="outline"
              className="glass-card border-glass-border flex items-center gap-2"
            >
              <Volume2 className="w-4 h-4" />
              Listen
            </Button>
          </div>

          {/* Encouragement */}
          <div className="glass-card p-4">
            <p className="text-sm text-muted-foreground">
              💚 <strong>Remember:</strong> Affirmations work best when you truly believe in them. 
              Take a moment to breathe and let these words resonate with your heart.
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};