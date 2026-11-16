import React, { useState } from 'react';
import { 
  Tv, 
  Play, 
  ThumbsUp, 
  MessageCircle, 
  Share2, 
  CheckCircle2, 
  Bookmark, 
  Filter,
  Sparkles
} from 'lucide-react';
import { User, Reel } from '../../types';
import { sounds } from '../../utils/soundEffects';

interface WatchViewProps {
  reels: Reel[];
  currentUser: User;
  onSelectUserToView: (user: User) => void;
  language: 'bn' | 'en';
}

export const WatchView: React.FC<WatchViewProps> = ({
  reels,
  currentUser,
  onSelectUserToView,
  language
}) => {
  const [activeCategory, setActiveCategory] = useState<'all' | 'humanity' | 'blood' | 'relief'>('all');
  const [playingVideoId, setPlayingVideoId] = useState<string | null>(null);

  const categories = [
    { id: 'all', label: 'সব ভিডিও' },
    { id: 'humanity', label: '❤️ মানবতার গল্প' },
    { id: 'blood', label: '🩸 রক্তদান সচেতনতা' },
    { id: 'relief', label: '📦 ত্রাণ ও উপহার' }
  ];

  return (
    <div className="max-w-4xl mx-auto py-4 px-2 sm:px-4 space-y-6">
      
      {/* WATCH HEADER & CATEGORY TABS */}
      <div className="bg-white dark:bg-[#242526] rounded-2xl p-4 border border-slate-200 dark:border-zinc-800 shadow-xs space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-amber-500 text-white flex items-center justify-center shadow-sm">
              <Tv className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
                {language === 'bn' ? 'মানবতার ভিডিও ও ডকুমেন্টারি' : 'Watch & Documentaries'}
              </h2>
              <span className="text-xs text-slate-500 dark:text-slate-400">
                অনুপ্রেরণামূলক সামাজিক কাজ ও সেবামূলক ভিডিও
              </span>
            </div>
          </div>
        </div>

        {/* Categories Segmented Bar */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id as any)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-colors ${
                activeCategory === cat.id
                  ? 'bg-rose-600 text-white shadow-xs'
                  : 'bg-slate-100 dark:bg-zinc-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* VIDEO FEED CARDS */}
      <div className="space-y-5">
        {reels.map((video) => {
          const isPlaying = playingVideoId === video.id;

          return (
            <div
              key={video.id}
              className="bg-white dark:bg-[#242526] rounded-2xl border border-slate-200 dark:border-zinc-800 shadow-xs overflow-hidden"
            >
              {/* Author Row */}
              <div className="p-4 flex items-center justify-between">
                <div 
                  onClick={() => onSelectUserToView(video.creator)}
                  className="flex items-center gap-3 cursor-pointer"
                >
                  <img
                    src={video.creator.avatar}
                    alt={video.creator.name}
                    className="w-10 h-10 rounded-full object-cover ring-2 ring-rose-500/20"
                  />
                  <div>
                    <div className="flex items-center gap-1 font-bold text-sm text-slate-900 dark:text-white">
                      <span>{video.creator.banglaName || video.creator.name}</span>
                      {video.creator.isVerified && (
                        <CheckCircle2 className="w-3.5 h-3.5 text-blue-500 fill-blue-500" />
                      )}
                    </div>
                    <span className="text-[11px] text-slate-500 dark:text-slate-400">
                      ভিডিও প্রকাশকাল: ২ দিন আগে · 🌐 Public
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => alert('ভিডিওটি সংরক্ষিত হয়েছে')}
                  className="w-8 h-8 rounded-full hover:bg-slate-100 dark:hover:bg-zinc-700 flex items-center justify-center text-slate-400"
                >
                  <Bookmark className="w-4 h-4" />
                </button>
              </div>

              {/* Video Title */}
              <div className="px-4 pb-2.5">
                <p className="text-sm font-semibold text-slate-800 dark:text-slate-100">
                  {video.videoTitle}
                </p>
              </div>

              {/* Player Stage */}
              <div className="relative aspect-video bg-black flex items-center justify-center overflow-hidden">
                {isPlaying ? (
                  <video
                    src={video.videoUrl}
                    controls
                    autoPlay
                    playsInline
                    className="w-full h-full object-contain"
                  />
                ) : (
                  <div 
                    onClick={() => {
                      setPlayingVideoId(video.id);
                      sounds.playMessagePop();
                    }}
                    className="relative w-full h-full cursor-pointer group"
                  >
                    <img
                      src={video.thumbnail}
                      alt={video.videoTitle}
                      className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-black/30 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                      <div className="w-16 h-16 rounded-full bg-rose-600/90 text-white flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform">
                        <Play className="w-8 h-8 ml-1 fill-white" />
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Metrics & Actions */}
              <div className="p-3 px-4 flex items-center justify-between border-t border-slate-100 dark:border-zinc-800 text-xs text-slate-600 dark:text-slate-300">
                <div className="flex items-center gap-1.5">
                  <span className="text-rose-600 font-bold">❤️ {video.likesCount.toLocaleString()}</span>
                  <span>·</span>
                  <span>{video.commentsCount} টি মন্তব্য</span>
                  <span>·</span>
                  <span>{video.sharesCount} টি শেয়ার</span>
                </div>

                <div className="flex items-center gap-2">
                  <button 
                    onClick={() => {
                      sounds.playReactionPop();
                      alert('লাইক দেওয়া হয়েছে!');
                    }}
                    className="px-3 py-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-zinc-700 font-semibold flex items-center gap-1"
                  >
                    <ThumbsUp className="w-3.5 h-3.5" />
                    <span>লাইক</span>
                  </button>
                  <button 
                    onClick={() => alert('ভিডিও লিঙ্ক কপি হয়েছে!')}
                    className="px-3 py-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-zinc-700 font-semibold flex items-center gap-1"
                  >
                    <Share2 className="w-3.5 h-3.5" />
                    <span>শেয়ার</span>
                  </button>
                </div>
              </div>

            </div>
          );
        })}
      </div>

    </div>
  );
};
