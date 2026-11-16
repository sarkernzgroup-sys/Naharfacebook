import React, { useState } from 'react';
import { 
  Users, 
  UserPlus, 
  UserCheck, 
  MessageCircle, 
  Search, 
  CheckCircle2, 
  PhoneCall,
  X
} from 'lucide-react';
import { User, FriendRequest } from '../../types';

interface FriendsViewProps {
  friendRequests: FriendRequest[];
  allUsers: User[];
  currentUser: User;
  onConfirmFriend: (requestId: string) => void;
  onDeleteFriendRequest: (requestId: string) => void;
  onOpenChatWithUser: (user: User) => void;
  onSelectUserToView: (user: User) => void;
  language: 'bn' | 'en';
}

export const FriendsView: React.FC<FriendsViewProps> = ({
  friendRequests,
  allUsers,
  currentUser,
  onConfirmFriend,
  onDeleteFriendRequest,
  onOpenChatWithUser,
  onSelectUserToView,
  language
}) => {
  const [activeTab, setActiveTab] = useState<'requests' | 'suggestions' | 'all'>('requests');
  const [searchQuery, setSearchQuery] = useState('');
  const [addedFriendsMap, setAddedFriendsMap] = useState<Record<string, boolean>>({});

  const filteredAllUsers = allUsers.filter(u => 
    u.id !== currentUser.id && 
    (u.name.toLowerCase().includes(searchQuery.toLowerCase()) || u.banglaName.includes(searchQuery))
  );

  const handleAddFriend = (userId: string) => {
    setAddedFriendsMap(prev => ({ ...prev, [userId]: true }));
    alert('বন্ধু হওয়ার অনুরোধ পাঠানো হয়েছে!');
  };

  return (
    <div className="max-w-4xl mx-auto py-4 px-2 sm:px-4 space-y-6">
      
      {/* HEADER & TABS */}
      <div className="bg-white dark:bg-[#242526] rounded-2xl p-4 sm:p-5 border border-slate-200 dark:border-zinc-800 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-blue-500 text-white flex items-center justify-center shadow-sm">
              <Users className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
                {language === 'bn' ? 'বন্ধুরা ও ফ্রেন্ড রিকোয়েস্ট' : 'Friends & Requests'}
              </h2>
              <span className="text-xs text-slate-500 dark:text-slate-400">
                মানবিক বন্ধুদের সাথে যুক্ত হোন ও কথা বলুন
              </span>
            </div>
          </div>

          {/* Search bar */}
          <div className="flex items-center bg-[#f0f2f5] dark:bg-[#3a3b3c] rounded-xl px-3 py-1.5 w-full sm:w-64">
            <Search className="w-4 h-4 text-slate-400 mr-2 shrink-0" />
            <input
              type="text"
              placeholder="নাম দিয়ে খুঁজুন..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full bg-transparent text-xs text-slate-800 dark:text-white placeholder-slate-400 focus:outline-none"
            />
          </div>
        </div>

        {/* Tab Buttons */}
        <div className="flex items-center gap-2 border-t border-slate-100 dark:border-zinc-800 pt-3">
          <button
            onClick={() => setActiveTab('requests')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-colors ${
              activeTab === 'requests'
                ? 'bg-rose-600 text-white shadow-xs'
                : 'bg-slate-100 dark:bg-zinc-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200'
            }`}
          >
            অনুরোধসমূহ ({friendRequests.length})
          </button>

          <button
            onClick={() => setActiveTab('suggestions')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-colors ${
              activeTab === 'suggestions'
                ? 'bg-rose-600 text-white shadow-xs'
                : 'bg-slate-100 dark:bg-zinc-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200'
            }`}
          >
            প্রস্তাবিত বন্ধুরা
          </button>

          <button
            onClick={() => setActiveTab('all')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-colors ${
              activeTab === 'all'
                ? 'bg-rose-600 text-white shadow-xs'
                : 'bg-slate-100 dark:bg-zinc-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200'
            }`}
          >
            সকল বন্ধু ({filteredAllUsers.length})
          </button>
        </div>
      </div>

      {/* REQUESTS TAB */}
      {activeTab === 'requests' && (
        <div className="space-y-3">
          {friendRequests.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {friendRequests.map((req) => (
                <div
                  key={req.id}
                  className="bg-white dark:bg-[#242526] rounded-2xl p-4 border border-slate-200 dark:border-zinc-800 shadow-xs flex items-center gap-3.5"
                >
                  <img
                    src={req.user.avatar}
                    alt={req.user.name}
                    onClick={() => onSelectUserToView(req.user)}
                    className="w-16 h-16 rounded-full object-cover cursor-pointer ring-2 ring-rose-500/20 shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <span 
                      onClick={() => onSelectUserToView(req.user)}
                      className="font-bold text-sm text-slate-900 dark:text-white truncate block hover:underline cursor-pointer"
                    >
                      {req.user.banglaName || req.user.name}
                    </span>
                    <span className="text-xs text-slate-500 dark:text-slate-400 block mt-0.5">
                      {req.mutualFriends} টি সাধারণ বন্ধু · {req.timestamp}
                    </span>

                    <div className="mt-2.5 flex items-center gap-2">
                      <button
                        onClick={() => onConfirmFriend(req.id)}
                        className="flex-1 py-1.5 rounded-lg bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold transition-colors shadow-xs"
                      >
                        নিশ্চিত করুন
                      </button>
                      <button
                        onClick={() => onDeleteFriendRequest(req.id)}
                        className="flex-1 py-1.5 rounded-lg bg-slate-100 dark:bg-zinc-700 hover:bg-slate-200 text-slate-700 dark:text-slate-200 text-xs font-bold transition-colors"
                      >
                        মুছে ফেলুন
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-white dark:bg-[#242526] rounded-2xl p-8 border border-slate-200 dark:border-zinc-800 text-center text-slate-500">
              কোনো নতুন বন্ধুত্বের অনুরোধ নেই।
            </div>
          )}
        </div>
      )}

      {/* SUGGESTIONS & ALL FRIENDS TAB */}
      {(activeTab === 'suggestions' || activeTab === 'all') && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
          {filteredAllUsers.map((user) => {
            const isAdded = addedFriendsMap[user.id];

            return (
              <div
                key={user.id}
                className="bg-white dark:bg-[#242526] rounded-2xl p-4 border border-slate-200 dark:border-zinc-800 shadow-xs flex flex-col justify-between"
              >
                <div className="flex items-center gap-3">
                  <img
                    src={user.avatar}
                    alt={user.name}
                    onClick={() => onSelectUserToView(user)}
                    className="w-12 h-12 rounded-full object-cover cursor-pointer ring-2 ring-rose-500/20 shrink-0"
                  />
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-1">
                      <span 
                        onClick={() => onSelectUserToView(user)}
                        className="font-bold text-sm text-slate-900 dark:text-white truncate hover:underline cursor-pointer"
                      >
                        {user.banglaName || user.name}
                      </span>
                      {user.isVerified && (
                        <CheckCircle2 className="w-3.5 h-3.5 text-blue-500 fill-blue-500 shrink-0" />
                      )}
                    </div>
                    <span className="text-xs text-slate-500 dark:text-slate-400 block truncate">
                      {user.bloodGroup ? `রক্ত: ${user.bloodGroup} · ` : ''}{user.location}
                    </span>
                  </div>
                </div>

                <div className="mt-4 flex items-center gap-2">
                  {activeTab === 'suggestions' ? (
                    <button
                      onClick={() => handleAddFriend(user.id)}
                      disabled={isAdded}
                      className={`w-full py-2 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all ${
                        isAdded 
                          ? 'bg-slate-100 dark:bg-zinc-700 text-slate-500' 
                          : 'bg-rose-600 hover:bg-rose-700 text-white shadow-xs'
                      }`}
                    >
                      <UserPlus className="w-3.5 h-3.5" />
                      <span>{isAdded ? 'অনুরোধ পাঠানো হয়েছে' : 'বন্ধু করুন'}</span>
                    </button>
                  ) : (
                    <>
                      <button
                        onClick={() => onOpenChatWithUser(user)}
                        className="flex-1 py-1.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold flex items-center justify-center gap-1.5 transition-colors"
                      >
                        <MessageCircle className="w-3.5 h-3.5" />
                        <span>মেসেজ</span>
                      </button>
                      <button
                        onClick={() => onSelectUserToView(user)}
                        className="px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-zinc-700 text-slate-700 dark:text-slate-200 text-xs font-bold hover:bg-slate-200"
                      >
                        প্রোফাইল
                      </button>
                    </>
                  )}
                </div>

              </div>
            );
          })}
        </div>
      )}

    </div>
  );
};
