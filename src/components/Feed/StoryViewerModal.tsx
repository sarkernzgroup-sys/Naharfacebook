import React, { useState, useEffect } from 'react';
import { X, Heart, ChevronLeft, ChevronRight, Send, CheckCircle2 } from 'lucide-react';
import { Story } from '../../types';
import { sounds } from '../../utils/soundEffects';

interface StoryViewerModalProps {
  stories: Story[];
  initialStoryId: string;
  onClose: () => void;
  onSendReply: (storyId: string, replyText: string) => void;
}

export const StoryViewerModal: React.FC<StoryViewerModalProps> = ({
  stories,
  initialStoryId,
  onClose,
  onSendReply
}) => {
  const [currentIndex, setCurrentIndex] = useState(() => {
    const idx = stories.findIndex(s => s.id === initialStoryId);
    return idx !== -1 ? idx : 0;
  });
  const [progress, setProgress] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [replyText, setReplyText] = useState('');
  const [liked, setLiked] = useState(false);

  const currentStory = stories[currentIndex];

  useEffect(() => {
    setProgress(0);
    setLiked(false);
  }, [currentIndex]);

  useEffect(() => {
    if (isPaused) return;

    const interval = 50; // update every 50ms
    const step = (100 / (5000 / interval)); // 5 seconds per story

    const timer = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          // Advance to next story
          if (currentIndex < stories.length - 1) {
            setCurrentIndex(c => c + 1);
            return 0;
          } else {
            onClose();
            return 100;
          }
        }
        return prev + step;
      });
    }, interval);

    return () => clearInterval(timer);
  }, [isPaused, currentIndex, stories.length, onClose]);

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (currentIndex > 0) {
      setCurrentIndex(c => c - 1);
    }
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (currentIndex < stories.length - 1) {
      setCurrentIndex(c => c + 1);
    } else {
      onClose();
    }
  };

  const handleLike = (e: React.MouseEvent) => {
    e.stopPropagation();
    setLiked(!liked);
    sounds.playReactionPop();
  };

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!replyText.trim()) return;
    onSendReply(currentStory.id, replyText);
    sounds.playMessagePop();
    setReplyText('');
    alert('স্টোরি উত্তর পাঠানো হয়েছে!');
  };

  if (!currentStory) return null;

  return (
    <div 
      className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-2 sm:p-4 select-none backdrop-blur-md"
      onMouseDown={() => setIsPaused(true)}
      onMouseUp={() => setIsPaused(false)}
      onTouchStart={() => setIsPaused(true)}
      onTouchEnd={() => setIsPaused(false)}
    >
      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 z-50 w-10 h-10 rounded-full bg-white/20 hover:bg-white/30 text-white flex items-center justify-center transition-colors"
      >
        <X className="w-6 h-6" />
      </button>

      {/* Prev button */}
      {currentIndex > 0 && (
        <button
          onClick={handlePrev}
          className="hidden md:flex absolute left-8 top-1/2 -translate-y-1/2 z-40 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 text-white items-center justify-center transition-colors"
        >
          <ChevronLeft className="w-8 h-8" />
        </button>
      )}

      {/* Next button */}
      {currentIndex < stories.length - 1 && (
        <button
          onClick={handleNext}
          className="hidden md:flex absolute right-8 top-1/2 -translate-y-1/2 z-40 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 text-white items-center justify-center transition-colors"
        >
          <ChevronRight className="w-8 h-8" />
        </button>
      )}

      {/* Story Stage Container */}
      <div className="relative w-full max-w-md h-[88vh] max-h-[820px] rounded-3xl overflow-hidden bg-zinc-900 shadow-2xl flex flex-col justify-between">
        
        {/* Background Media */}
        <img
          src={currentStory.mediaUrl}
          alt={currentStory.author.name}
          className="absolute inset-0 w-full h-full object-cover"
        />

        {/* Top Gradient for controls */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/75 via-transparent to-black/80 pointer-events-none" />

        {/* TOP BAR: Multi-segment Progress Bars */}
        <div className="relative z-20 p-3 pt-3.5 space-y-2">
          <div className="flex gap-1.5 w-full">
            {stories.map((s, idx) => (
              <div key={s.id} className="h-1 flex-1 bg-white/30 rounded-full overflow-hidden">
                <div
                  className="h-full bg-white transition-all duration-75"
                  style={{
                    width: idx < currentIndex ? '100%' : idx === currentIndex ? `${progress}%` : '0%'
                  }}
                />
              </div>
            ))}
          </div>

          {/* Author Header */}
          <div className="flex items-center justify-between pt-1">
            <div className="flex items-center gap-2.5">
              <img
                src={currentStory.author.avatar}
                alt={currentStory.author.name}
                className="w-10 h-10 rounded-full object-cover border-2 border-rose-500"
              />
              <div className="text-white">
                <div className="flex items-center gap-1 font-bold text-sm">
                  <span>{currentStory.author.banglaName || currentStory.author.name}</span>
                  {currentStory.author.isVerified && (
                    <CheckCircle2 className="w-3.5 h-3.5 text-blue-400 fill-blue-400" />
                  )}
                </div>
                <span className="text-[11px] text-white/70 block">{currentStory.timestamp}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Center Tap Navigation Zones */}
        <div className="absolute inset-x-0 top-20 bottom-24 z-10 flex">
          <div className="w-1/3 h-full cursor-pointer" onClick={handlePrev} />
          <div className="w-2/3 h-full cursor-pointer" onClick={handleNext} />
        </div>

        {/* BOTTOM BAR: Caption & Reply Box */}
        <div className="relative z-20 p-4 space-y-3">
          {currentStory.caption && (
            <p className="text-white text-sm font-medium drop-shadow-md bg-black/40 backdrop-blur-xs p-3 rounded-xl border border-white/10 leading-snug">
              {currentStory.caption}
            </p>
          )}

          <div className="flex items-center gap-2">
            <form onSubmit={handleSend} className="flex-1 flex items-center bg-white/20 backdrop-blur-md rounded-full px-4 py-2 border border-white/20">
              <input
                type="text"
                placeholder="একটি উত্তর লিখুন..."
                value={replyText}
                onChange={e => setReplyText(e.target.value)}
                className="w-full bg-transparent text-white placeholder-white/70 text-xs sm:text-sm focus:outline-none"
              />
              {replyText && (
                <button type="submit" className="text-rose-400 hover:text-rose-300 ml-1">
                  <Send className="w-4 h-4" />
                </button>
              )}
            </form>

            <button
              onClick={handleLike}
              className={`w-11 h-11 rounded-full flex items-center justify-center transition-all ${
                liked ? 'bg-rose-600 text-white scale-110' : 'bg-white/20 text-white hover:bg-white/30'
              }`}
            >
              <Heart className={`w-6 h-6 ${liked ? 'fill-white stroke-white' : ''}`} />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
