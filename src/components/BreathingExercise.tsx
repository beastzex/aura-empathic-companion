import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Play, Pause, X } from 'lucide-react';

interface BreathingExerciseProps {
  isOpen: boolean;
  onClose: () => void;
}

export const BreathingExercise: React.FC<BreathingExerciseProps> = ({
  isOpen,
  onClose,
}) => {
  const [isActive, setIsActive] = useState(false);
  const [phase, setPhase] = useState<'inhale' | 'hold' | 'exhale'>('inhale');
  const [timeLeft, setTimeLeft] = useState(4);

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isActive) {
      interval = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            // Move to next phase
            if (phase === 'inhale') {
              setPhase('hold');
              return 4;
            } else if (phase === 'hold') {
              setPhase('exhale');
              return 6;
            } else {
              setPhase('inhale');
              return 4;
            }
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [isActive, phase]);

  const toggleExercise = () => {
    setIsActive(!isActive);
  };

  const resetExercise = () => {
    setIsActive(false);
    setPhase('inhale');
    setTimeLeft(4);
  };

  const getPhaseText = () => {
    switch (phase) {
      case 'inhale':
        return 'Breathe In';
      case 'hold':
        return 'Hold';
      case 'exhale':
        return 'Breathe Out';
    }
  };

  const getPhaseInstruction = () => {
    switch (phase) {
      case 'inhale':
        return 'Slowly breathe in through your nose';
      case 'hold':
        return 'Hold your breath gently';
      case 'exhale':
        return 'Slowly breathe out through your mouth';
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="glass-card border-0 max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center text-2xl bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
            Guided Breathing
          </DialogTitle>
        </DialogHeader>
        
        <div className="text-center space-y-8 py-6">
          {/* Breathing Circle */}
          <div className="relative flex items-center justify-center">
            <div 
              className={`breathing-circle transition-transform duration-1000 ${
                isActive 
                  ? phase === 'inhale' 
                    ? 'scale-125' 
                    : phase === 'hold' 
                    ? 'scale-125' 
                    : 'scale-100'
                  : 'scale-100'
              }`}
            >
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-4xl font-bold text-white">
                  {timeLeft}
                </span>
              </div>
            </div>
          </div>

          {/* Phase Instructions */}
          <div className="space-y-2">
            <h3 className="text-xl font-semibold text-primary">
              {getPhaseText()}
            </h3>
            <p className="text-muted-foreground">
              {getPhaseInstruction()}
            </p>
          </div>

          {/* Controls */}
          <div className="flex gap-3 justify-center">
            <Button
              onClick={toggleExercise}
              className="wellness-button flex items-center gap-2"
            >
              {isActive ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
              {isActive ? 'Pause' : 'Start'}
            </Button>
            <Button
              onClick={resetExercise}
              variant="outline"
              className="glass-card border-glass-border"
            >
              Reset
            </Button>
          </div>

          {/* Tips */}
          <div className="glass-card p-4 mt-6">
            <p className="text-sm text-muted-foreground">
              💡 <strong>Tip:</strong> Focus on the rhythm and let your body relax with each breath. 
              This 4-4-6 pattern helps activate your body's natural relaxation response.
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};