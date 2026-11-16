import React from 'react';
import { PhoneCall, CheckCircle2, UserPlus, Users, Search, Heart, MessageCircle } from 'lucide-react';
import { User, FriendRequest } from '../types';

interface SidebarRightProps {
  onlineUsers: User[];
  friendRequests: FriendRequest[];
  onConfirmFriend: (requestId: string) => void;
  onDeleteFriendRequest: (requestId: string) => void;
  openChatWithUser: (user: User) => void;
  onSelectUserToView: (user: User) => void;
  onOpenHumanityDesk: () => void;
  language: 'bn' | 'en';
}

export const SidebarRight: React.FC<SidebarRightProps> = ({
  onlineUsers,
  friendRequests,
  onConfirmFriend,
  onDeleteFriendRequest,
  openChatWithUser,
  onSelectUserToView,
  onOpenHumanityDesk,
  language
}) => {
  return (
    <aside className="w-80 hidden lg:block sticky top-14 h-[calc(100vh-3.5rem)] overflow-y-auto px-2 py-4 space-y-5">
      
      {/* 24/7 HELPLINE EMERGENCY CARD */}
      <div className="p-4 rounded-2xl bg-white dark:bg-[#242526] border border-rose-200/80 dark:border-zinc-800 shadow-xs">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-600 animate-ping" />
            <h3 className="font-bold text-xs uppercase tracking-wider text-rose-700 dark:text-rose-400">
              {language === 'bn' ? 'জরুরি মানবসেবা সহায়তা' : 'Humanitarian Helpline'}
            </h3>
          </div>
          <span className="text-[10px] bg-rose-100 dark:bg-rose-950/60 text-rose-700 dark:text-rose-300 px-2 py-0.5 rounded-full font-bold">
            ফ্রি
          </span>
        </div>

        <p className="text-xs text-slate-600 dark:text-slate-300 leading-snug">
          রক্তের সংকট, অসুস্থ রোগীর চিকিৎসা সহায়তা বা যেকোনো জরুরি মানবিক প্রয়োজনে সরাসরি কল করুন:
        </p>

        <div className="mt-3 p-2.5 rounded-xl bg-rose-50/80 dark:bg-rose-950/20 border border-rose-200/60 dark:border-rose-900/40 flex items-center justify-between">
          <div className="min-w-0">
            <span className="text-[10px] text-slate-500 dark:text-slate-400 block font-medium">জনক: এস এন নাজমুল সরকার</span>
            <span className="text-sm font-bold text-slate-900 dark:text-white tracking-wide">01825986764</span>
          </div>
          <a
            href="tel:01825986764"
            className="px-3 py-1.5 rounded-lg bg-rose-600 hover:bg-rose-700 text-white text-xs font-semibold flex items-center gap-1.5 shadow-sm shadow-rose-600/30 active:scale-95 transition-all"
          >
            <PhoneCall className="w-3.5 h-3.5" />
            <span>কল করুন</span>
          </a>
        </div>

        <button
          onClick={onOpenHumanityDesk}
          className="mt-2.5 w-full py-1.5 rounded-lg text-center text-xs font-semibold text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/30 transition-colors flex items-center justify-center gap-1"
        >
          <Heart className="w-3.5 h-3.5 fill-rose-600" />
          <span>রক্তের আবেদন বা ডোনার খুঁজুন</span>
        </button>
      </div>

      {/* FRIEND REQUESTS SECTION */}
      {friendRequests.length > 0 && (
        <div className="space-y-3">
          <div className="flex items-center justify-between px-1">
            <h3 className="font-bold text-xs uppercase tracking-wider text-slate-500 dark:text-slate-400">
              {language === 'bn' ? 'বন্ধু হওয়ার অনুরোধ' : 'Friend Requests'}
            </h3>
            <span className="text-xs text-rose-600 font-semibold">{friendRequests.length}টি</span>
          </div>

          <div className="space-y-2.5">
            {friendRequests.map((req) => (
              <div 
                key={req.id}
                className="p-3 rounded-2xl bg-white dark:bg-[#242526] border border-slate-200/80 dark:border-zinc-800 shadow-xs"
              >
                <div className="flex items-center gap-3">
                  <img
                    src={req.user.avatar}
                    alt={req.user.name}
                    className="w-11 h-11 rounded-full object-cover cursor-pointer"
                    onClick={() => onSelectUserToView(req.user)}
                  />
                  <div className="flex-1 min-w-0">
                    <span 
                      onClick={() => onSelectUserToView(req.user)}
                      className="font-bold text-sm text-slate-900 dark:text-white truncate block hover:underline cursor-pointer"
                    >
                      {req.user.banglaName || req.user.name}
                    </span>
                    <span className="text-[11px] text-slate-500 dark:text-slate-400 block">
                      {req.mutualFriends} টি সাধারণ বন্ধু · {req.timestamp}
                    </span>
                  </div>
                </div>

                <div className="mt-3 grid grid-cols-2 gap-2">
                  <button
                    onClick={() => onConfirmFriend(req.id)}
                    className="py-1.5 rounded-lg bg-rose-600 hover:bg-rose-700 text-white text-xs font-semibold text-center transition-colors shadow-xs"
                  >
                    নিশ্চিত করুন
                  </button>
                  <button
                    onClick={() => onDeleteFriendRequest(req.id)}
                    className="py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-zinc-700 dark:hover:bg-zinc-600 text-slate-700 dark:text-slate-200 text-xs font-semibold text-center transition-colors"
                  >
                    বাতিল
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ACTIVE ONLINE CONTACTS LIST */}
      <div className="space-y-2">
        <div className="flex items-center justify-between px-1">
          <h3 className="font-bold text-xs uppercase tracking-wider text-slate-500 dark:text-slate-400">
            {language === 'bn' ? 'অনলাইন বন্ধুরা' : 'Contacts'}
          </h3>
          <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-bold flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            {onlineUsers.length} জন সক্রিয়
          </span>
        </div>

        <div className="space-y-0.5">
          {onlineUsers.map((user) => (
            <button
              key={user.id}
              onClick={() => openChatWithUser(user)}
              className="w-full flex items-center gap-3 p-2 rounded-xl hover:bg-slate-200/60 dark:hover:bg-[#3a3b3c] transition-colors text-left group"
            >
              <div className="relative shrink-0">
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="w-9 h-9 rounded-full object-cover"
                />
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 rounded-full border-2 border-white dark:border-[#242526]" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1">
                  <span className="text-sm font-semibold text-slate-800 dark:text-slate-100 truncate group-hover:text-rose-600 dark:group-hover:text-rose-400 transition-colors">
                    {user.banglaName || user.name}
                  </span>
                  {user.isVerified && (
                    <CheckCircle2 className="w-3.5 h-3.5 text-blue-500 fill-blue-500 shrink-0" />
                  )}
                </div>
                <span className="text-[11px] text-slate-500 dark:text-slate-400 block truncate">
                  {user.work ? user.work : user.location}
                </span>
              </div>
              <MessageCircle className="w-4 h-4 text-slate-400 group-hover:text-rose-600 opacity-0 group-hover:opacity-100 transition-opacity shrink-0" />
            </button>
          ))}
        </div>
      </div>

    </aside>
  );
};
