import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Send, Mic, MicOff, Brain, Heart } from 'lucide-react';

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

interface ChatInterfaceProps {
  onBreathingExercise: () => void;
  onAffirmation: () => void;
}

export const ChatInterface: React.FC<ChatInterfaceProps> = ({
  onBreathingExercise,
  onAffirmation,
}) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Hi there! I'm Aura, your confidential AI companion. I'm here to listen and support you. How are you feeling today?",
      isUser: false,
      timestamp: new Date(),
    },
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = async () => {
    if (!inputText.trim()) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      text: inputText,
      isUser: true,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, newMessage]);
    setInputText('');
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: "I hear you, and I want you to know that your feelings are completely valid. It takes courage to share what's on your mind. Would you like to talk more about what's been on your mind, or would a breathing exercise help you feel more centered right now?",
        isUser: false,
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, aiResponse]);
      setIsTyping(false);
    }, 2000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const toggleListening = () => {
    setIsListening(!isListening);
    // Voice recognition would be implemented here
  };

  return (
    <div className="flex flex-col h-full max-w-4xl mx-auto p-4">
      {/* Header */}
      <div className="glass-card p-6 mb-6 text-center">
        <div className="flex items-center justify-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center animate-pulse-glow">
            <Brain className="w-5 h-5 text-white" />
          </div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
            Aura
          </h1>
        </div>
        <p className="text-muted-foreground">Your Confidential AI Companion</p>
      </div>

      {/* Chat Messages */}
      <Card className="flex-1 glass-card p-6 mb-4 overflow-hidden">
        <div className="h-full flex flex-col">
          <div className="flex-1 overflow-y-auto space-y-4 pr-2">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.isUser ? 'justify-end' : 'justify-start'} animate-fade-in`}
              >
                <div
                  className={`${
                    message.isUser ? 'chat-bubble-user' : 'chat-bubble-ai'
                  } animate-fade-in`}
                >
                  <p className="text-sm leading-relaxed">{message.text}</p>
                  <span className="text-xs opacity-70 mt-1 block">
                    {message.timestamp.toLocaleTimeString([], {
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </span>
                </div>
              </div>
            ))}
            
            {isTyping && (
              <div className="flex justify-start animate-fade-in">
                <div className="chat-bubble-ai">
                  <div className="typing-indicator">
                    <div className="typing-dot"></div>
                    <div className="typing-dot"></div>
                    <div className="typing-dot"></div>
                  </div>
                  <p className="text-xs opacity-70 mt-2">Aura is thinking...</p>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        </div>
      </Card>

      {/* Wellness Tools */}
      <div className="flex gap-3 mb-4 justify-center">
        <Button
          onClick={onBreathingExercise}
          className="wellness-button flex items-center gap-2"
          size="sm"
        >
          <Heart className="w-4 h-4" />
          Breathing Exercise
        </Button>
        <Button
          onClick={onAffirmation}
          className="wellness-button flex items-center gap-2"
          size="sm"
        >
          <Brain className="w-4 h-4" />
          Affirmation
        </Button>
      </div>

      {/* Input Area */}
      <div className="glass-card p-4">
        <div className="flex gap-3 items-end">
          <div className="flex-1">
            <Input
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Share what's on your mind... I'm here to listen"
              className="border-0 bg-surface-elevated/50 backdrop-blur-sm resize-none"
              disabled={isTyping}
            />
          </div>
          <Button
            onClick={toggleListening}
            size="icon"
            variant={isListening ? "default" : "outline"}
            className={`shrink-0 ${isListening ? 'animate-pulse-glow' : ''}`}
          >
            {isListening ? <Mic className="w-4 h-4" /> : <MicOff className="w-4 h-4" />}
          </Button>
          <Button
            onClick={sendMessage}
            size="icon"
            disabled={!inputText.trim() || isTyping}
            className="shrink-0 wellness-button"
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};