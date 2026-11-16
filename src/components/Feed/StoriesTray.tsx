import React from 'react';
import { Plus } from 'lucide-react';
import { Story, User } from '../../types';

interface StoriesTrayProps {
  stories: Story[];
  currentUser: User;
  onOpenStory: (story: Story) => void;
  onCreateStory: () => void;
}

export const StoriesTray: React.FC<StoriesTrayProps> = ({
  stories,
  currentUser,
  onOpenStory,
  onCreateStory
}) => {
  return (
    <div className="flex gap-2.5 overflow-x-auto pb-2 scrollbar-none px-1">
      
      {/* Create Story Card */}
      <div 
        onClick={onCreateStory}
        className="w-28 sm:w-32 h-44 sm:h-48 rounded-2xl bg-white dark:bg-[#242526] border border-slate-200 dark:border-zinc-800 shadow-xs relative overflow-hidden shrink-0 cursor-pointer group flex flex-col justify-between hover:shadow-md transition-all"
      >
        <div className="h-32 sm:h-36 overflow-hidden">
          <img
            src={currentUser.avatar}
            alt={currentUser.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
        <div className="absolute top-28 sm:top-32 left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-rose-600 text-white flex items-center justify-center border-3 border-white dark:border-[#242526] shadow-sm group-hover:scale-110 transition-transform">
          <Plus className="w-5 h-5 stroke-[2.5]" />
        </div>
        <div className="p-2 pt-4 text-center bg-white dark:bg-[#242526]">
          <span className="text-[11px] font-bold text-slate-800 dark:text-white block leading-tight">
            স্টোরি তৈরি
          </span>
        </div>
      </div>

      {/* Stories list */}
      {stories.map((story) => (
        <div
          key={story.id}
          onClick={() => onOpenStory(story)}
          className="w-28 sm:w-32 h-44 sm:h-48 rounded-2xl relative overflow-hidden shrink-0 cursor-pointer group shadow-xs hover:shadow-md transition-all select-none"
        >
          {/* Background image */}
          <img
            src={story.mediaUrl}
            alt={story.author.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          {/* Dark gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/30" />

          {/* Author avatar with ring */}
          <div className="absolute top-3 left-3">
            <img
              src={story.author.avatar}
              alt={story.author.name}
              className={`w-9 h-9 rounded-full object-cover ring-2 ${
                story.isSeen ? 'ring-slate-400' : 'ring-rose-500 ring-offset-2 ring-offset-black/50'
              }`}
            />
          </div>

          {/* Caption & author name */}
          <div className="absolute bottom-2.5 left-2.5 right-2.5 text-white">
            {story.caption && (
              <p className="text-[10px] font-medium text-rose-200 line-clamp-2 leading-tight mb-1 drop-shadow-xs">
                {story.caption}
              </p>
            )}
            <span className="text-xs font-bold truncate block drop-shadow-sm">
              {story.author.banglaName || story.author.name}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};
