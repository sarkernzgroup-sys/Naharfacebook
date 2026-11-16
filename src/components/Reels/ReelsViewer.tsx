import React, { useState } from 'react';
import { 
  Heart, 
  MessageCircle, 
  Share2, 
  Volume2, 
  VolumeX, 
  ChevronUp, 
  ChevronDown, 
  CheckCircle2, 
  Play, 
  Pause,
  Music,
  Send,
  X
} from 'lucide-react';
import { Reel, User } from '../../types';
import { sounds } from '../../utils/soundEffects';

interface ReelsViewerProps {
  reels: Reel[];
  currentUser: User;
  onSelectUserToView: (user: User) => void;
  language: 'bn' | 'en';
}

export const ReelsViewer: React.FC<ReelsViewerProps> = ({
  reels,
  currentUser,
  onSelectUserToView,
  language
}) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true);
  const [showComments, setShowComments] = useState(false);
  const [likedReels, setLikedReels] = useState<Record<string, boolean>>({ [reels[0]?.id]: true });
  const [commentInput, setCommentInput] = useState('');
  const [commentsMap, setCommentsMap] = useState<Record<string, { id: string; author: string; text: string }[]>>({
    [reels[0]?.id]: [
      { id: '1', author: 'তাহমিনা আক্তার', text: 'অসাধারণ মানবিক কাজ! আল্লাহ আপনাদের সহায় হোন।' },
      { id: '2', author: 'রাকিবুল হাসান', text: 'অনেক অনেক ভালোবাসা পুরো টিমের জন্য।' }
    ]
  });

  const currentReel = reels[activeIndex] || reels[0];

  const handleNext = () => {
    if (activeIndex < reels.length - 1) {
      setActiveIndex(i => i + 1);
    }
  };

  const handlePrev = () => {
    if (activeIndex > 0) {
      setActiveIndex(i => i - 1);
    }
  };

  const handleToggleLike = (reelId: string) => {
    sounds.playReactionPop();
    setLikedReels(prev => ({
      ...prev,
      [reelId]: !prev[reelId]
    }));
  };

  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentInput.trim()) return;
    const newComment = {
      id: Date.now().toString(),
      author: currentUser.banglaName || currentUser.name,
      text: commentInput.trim()
    };
    setCommentsMap(prev => ({
      ...prev,
      [currentReel.id]: [...(prev[currentReel.id] || []), newComment]
    }));
    sounds.playMessagePop();
    setCommentInput('');
  };

  if (!currentReel) return null;

  const isLiked = likedReels[currentReel.id];
  const comments = commentsMap[currentReel.id] || [];

  return (
    <div className="max-w-md mx-auto h-[calc(100vh-4.5rem)] py-2 flex items-center justify-center relative select-none">
      
      {/* Navigation Arrows for Desktop */}
      <div className="hidden lg:flex flex-col gap-3 absolute -right-16 top-1/2 -translate-y-1/2 z-30">
        <button
          onClick={handlePrev}
          disabled={activeIndex === 0}
          className="w-11 h-11 rounded-full bg-white dark:bg-[#3a3b3c] hover:bg-slate-100 shadow-lg flex items-center justify-center text-slate-800 dark:text-white disabled:opacity-30 transition-all"
        >
          <ChevronUp className="w-6 h-6" />
        </button>
        <button
          onClick={handleNext}
          disabled={activeIndex === reels.length - 1}
          className="w-11 h-11 rounded-full bg-white dark:bg-[#3a3b3c] hover:bg-slate-100 shadow-lg flex items-center justify-center text-slate-800 dark:text-white disabled:opacity-30 transition-all"
        >
          <ChevronDown className="w-6 h-6" />
        </button>
      </div>

      {/* REEL STAGE CARD */}
      <div className="relative w-full h-full max-h-[760px] rounded-3xl overflow-hidden bg-black shadow-2xl flex flex-col justify-between">
        
        {/* Background Video / Animated Image with Fallback */}
        <div 
          className="absolute inset-0 z-0 cursor-pointer"
          onClick={() => setIsPlaying(!isPlaying)}
        >
          {currentReel.videoUrl.endsWith('.mp4') ? (
            <video
              src={currentReel.videoUrl}
              autoPlay
              loop
              muted={isMuted}
              playsInline
              className="w-full h-full object-cover"
            />
          ) : (
            <img
              src={currentReel.thumbnail}
              alt={currentReel.videoTitle}
              className="w-full h-full object-cover"
            />
          )}

          {/* Dark gradient for text readability */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/90 pointer-events-none" />

          {/* Play/Pause overlay icon */}
          {!isPlaying && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/30">
              <div className="w-16 h-16 rounded-full bg-black/60 text-white flex items-center justify-center">
                <Play className="w-8 h-8 ml-1" />
              </div>
            </div>
          )}
        </div>

        {/* TOP BAR */}
        <div className="relative z-10 p-4 flex items-center justify-between text-white">
          <div className="flex items-center gap-1.5 bg-black/40 backdrop-blur-xs px-3 py-1 rounded-full">
            <span className="text-xs font-bold text-rose-400">রিলস</span>
            <span className="text-white/60">·</span>
            <span className="text-xs">মানবতার গল্প</span>
          </div>

          <button
            onClick={() => setIsMuted(!isMuted)}
            className="w-9 h-9 rounded-full bg-black/40 backdrop-blur-xs flex items-center justify-center text-white"
          >
            {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
          </button>
        </div>

        {/* RIGHT ACTION BAR */}
        <div className="absolute right-3 bottom-20 z-20 flex flex-col items-center gap-4 text-white">
          
          {/* Creator Avatar with follow shortcut */}
          <div className="relative">
            <img
              src={currentReel.creator.avatar}
              alt={currentReel.creator.name}
              onClick={() => onSelectUserToView(currentReel.creator)}
              className="w-11 h-11 rounded-full object-cover ring-2 ring-rose-500 cursor-pointer"
            />
          </div>

          {/* Like Button */}
          <button
            onClick={() => handleToggleLike(currentReel.id)}
            className="flex flex-col items-center gap-1 group"
          >
            <div className={`w-11 h-11 rounded-full flex items-center justify-center backdrop-blur-xs transition-transform group-hover:scale-110 ${
              isLiked ? 'bg-rose-600 text-white' : 'bg-black/40 text-white'
            }`}>
              <Heart className={`w-6 h-6 ${isLiked ? 'fill-white stroke-white' : ''}`} />
            </div>
            <span className="text-xs font-bold drop-shadow-sm">
              {(currentReel.likesCount + (isLiked ? 1 : 0)).toLocaleString()}
            </span>
          </button>

          {/* Comment Drawer Trigger */}
          <button
            onClick={() => setShowComments(!showComments)}
            className="flex flex-col items-center gap-1 group"
          >
            <div className="w-11 h-11 rounded-full bg-black/40 flex items-center justify-center backdrop-blur-xs group-hover:scale-110 transition-transform">
              <MessageCircle className="w-6 h-6" />
            </div>
            <span className="text-xs font-bold drop-shadow-sm">
              {(currentReel.commentsCount + comments.length).toLocaleString()}
            </span>
          </button>

          {/* Share Button */}
          <button
            onClick={() => alert('রিলস লিঙ্ক কপি করা হয়েছে!')}
            className="flex flex-col items-center gap-1 group"
          >
            <div className="w-11 h-11 rounded-full bg-black/40 flex items-center justify-center backdrop-blur-xs group-hover:scale-110 transition-transform">
              <Share2 className="w-6 h-6" />
            </div>
            <span className="text-xs font-bold drop-shadow-sm">
              {currentReel.sharesCount.toLocaleString()}
            </span>
          </button>

        </div>

        {/* BOTTOM INFO PANEL */}
        <div className="relative z-10 p-4 pr-16 text-white space-y-2">
          
          {/* Creator Name */}
          <div 
            onClick={() => onSelectUserToView(currentReel.creator)}
            className="flex items-center gap-2 cursor-pointer w-fit"
          >
            <span className="font-bold text-sm drop-shadow-md hover:underline">
              {currentReel.creator.banglaName || currentReel.creator.name}
            </span>
            {currentReel.creator.isVerified && (
              <CheckCircle2 className="w-4 h-4 text-blue-400 fill-blue-400" />
            )}
            <span className="text-[11px] bg-rose-600 px-2 py-0.5 rounded-full font-bold">
              ফলো করুন
            </span>
          </div>

          {/* Reel Title */}
          <p className="text-xs sm:text-sm text-slate-100 font-medium line-clamp-2 drop-shadow-sm leading-snug">
            {currentReel.videoTitle}
          </p>

          {/* Audio Track Tag */}
          <div className="flex items-center gap-2 text-xs text-rose-200">
            <Music className="w-3.5 h-3.5 animate-spin" />
            <span className="truncate">{currentReel.audioTitle}</span>
          </div>

        </div>

        {/* SLIDE-UP COMMENTS DRAWER */}
        {showComments && (
          <div className="absolute inset-x-0 bottom-0 top-1/3 z-30 bg-white dark:bg-[#242526] rounded-t-3xl p-4 flex flex-col justify-between animate-in slide-in-from-bottom-5">
            <div className="flex items-center justify-between pb-2 border-b border-slate-200 dark:border-zinc-800">
              <h4 className="font-bold text-sm text-slate-900 dark:text-white">
                মন্তব্য ({comments.length + currentReel.commentsCount})
              </h4>
              <button 
                onClick={() => setShowComments(false)}
                className="text-slate-400 hover:text-slate-600 dark:hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto py-2 space-y-2.5 text-xs">
              {comments.map(c => (
                <div key={c.id} className="p-2 rounded-xl bg-slate-100 dark:bg-zinc-800">
                  <span className="font-bold text-slate-900 dark:text-white block">{c.author}</span>
                  <p className="text-slate-700 dark:text-slate-200 mt-0.5">{c.text}</p>
                </div>
              ))}
            </div>

            <form onSubmit={handleAddComment} className="flex items-center gap-2 pt-2 border-t border-slate-200 dark:border-zinc-800">
              <input
                type="text"
                placeholder="একটি মন্তব্য লিখুন..."
                value={commentInput}
                onChange={e => setCommentInput(e.target.value)}
                className="flex-1 bg-slate-100 dark:bg-zinc-800 rounded-full px-3 py-2 text-xs text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none"
              />
              <button
                type="submit"
                disabled={!commentInput.trim()}
                className="text-rose-600 disabled:opacity-40 p-2"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        )}

      </div>
    </div>
  );
};
