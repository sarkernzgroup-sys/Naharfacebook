import React, { useState } from 'react';
import { 
  Camera, 
  Edit3, 
  CheckCircle2, 
  MapPin, 
  Briefcase, 
  GraduationCap, 
  PhoneCall, 
  Heart, 
  Calendar, 
  Users, 
  Plus, 
  MessageCircle, 
  X, 
  Check, 
  Sparkles,
  Award
} from 'lucide-react';
import { User, Post, ReactionType } from '../../types';
import { PostCard } from '../Feed/PostCard';
import { sounds } from '../../utils/soundEffects';

interface ProfileViewProps {
  userToView: User;
  currentUser: User;
  posts: Post[];
  onReaction: (postId: string, reaction: ReactionType) => void;
  onAddComment: (postId: string, commentText: string) => void;
  onOpenChatWithUser: (user: User) => void;
  onStartCall: (user: User, type: 'audio' | 'video') => void;
  onUpdateCurrentUser: (updated: User) => void;
  onSelectUserToView: (user: User) => void;
  language: 'bn' | 'en';
}

export const ProfileView: React.FC<ProfileViewProps> = ({
  userToView,
  currentUser,
  posts,
  onReaction,
  onAddComment,
  onOpenChatWithUser,
  onStartCall,
  onUpdateCurrentUser,
  onSelectUserToView,
  language
}) => {
  const [activeTab, setActiveTab] = useState<'posts' | 'about' | 'friends' | 'photos'>('posts');
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  // Edit form state
  const [editName, setEditName] = useState(userToView.name);
  const [editBanglaName, setEditBanglaName] = useState(userToView.banglaName);
  const [editBio, setEditBio] = useState(userToView.bio);
  const [editLocation, setEditLocation] = useState(userToView.location);
  const [editPhone, setEditPhone] = useState(userToView.phone);
  const [editWork, setEditWork] = useState(userToView.work || '');
  const [editBloodGroup, setEditBloodGroup] = useState(userToView.bloodGroup || 'O+');

  const isSelf = userToView.id === currentUser.id;
  const userPosts = posts.filter(p => p.author.id === userToView.id);

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    const updated: User = {
      ...userToView,
      name: editName.trim() || userToView.name,
      banglaName: editBanglaName.trim() || userToView.banglaName,
      bio: editBio.trim() || userToView.bio,
      location: editLocation.trim() || userToView.location,
      phone: editPhone.trim() || userToView.phone,
      work: editWork.trim() || userToView.work,
      bloodGroup: editBloodGroup
    };
    onUpdateCurrentUser(updated);
    sounds.playMessagePop();
    setIsEditModalOpen(false);
  };

  return (
    <div className="max-w-5xl mx-auto pb-12 space-y-4">
      
      {/* PROFILE HEADER HERO CONTAINER */}
      <div className="bg-white dark:bg-[#242526] rounded-b-3xl shadow-xs border-b border-slate-200 dark:border-zinc-800 overflow-hidden">
        
        {/* Cover Photo Container */}
        <div className="relative h-48 sm:h-72 md:h-84 w-full bg-gradient-to-r from-rose-700 via-red-600 to-amber-600 overflow-hidden">
          <img
            src={userToView.coverPhoto}
            alt="Cover"
            className="w-full h-full object-cover"
          />
          {isSelf && (
            <button
              onClick={() => alert('কভার ফটো পরিবর্তনের জন্য ফাইল নির্বাচন করুন')}
              className="absolute bottom-4 right-4 bg-white/90 dark:bg-black/70 hover:bg-white text-slate-800 dark:text-white px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-md backdrop-blur-xs transition-colors"
            >
              <Camera className="w-4 h-4" />
              <span>কভার এডিট</span>
            </button>
          )}
        </div>

        {/* Profile Info Bar */}
        <div className="px-4 sm:px-8 pb-5">
          <div className="flex flex-col md:flex-row items-center md:items-end justify-between -mt-16 sm:-mt-20 gap-4">
            
            {/* Avatar & Names */}
            <div className="flex flex-col md:flex-row items-center gap-4 text-center md:text-left">
              <div className="relative group">
                <img
                  src={userToView.avatar}
                  alt={userToView.name}
                  className="w-32 sm:w-40 h-32 sm:h-40 rounded-full object-cover ring-4 ring-white dark:ring-[#242526] shadow-xl bg-white"
                />
                {isSelf && (
                  <button
                    onClick={() => alert('প্রোফাইল ছবি পরিবর্তনের জন্য নির্বাচন করুন')}
                    className="absolute bottom-2 right-2 w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 dark:bg-zinc-700 dark:hover:bg-zinc-600 text-slate-700 dark:text-white flex items-center justify-center shadow-md transition-colors"
                  >
                    <Camera className="w-4 h-4" />
                  </button>
                )}
              </div>

              <div className="space-y-1">
                <div className="flex items-center justify-center md:justify-start gap-2 flex-wrap">
                  <h1 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 dark:text-white">
                    {userToView.banglaName || userToView.name}
                  </h1>
                  {userToView.isVerified && (
                    <CheckCircle2 className="w-5 h-5 text-blue-500 fill-blue-500" />
                  )}
                  {userToView.role === 'founder' && (
                    <span className="bg-rose-100 text-rose-700 dark:bg-rose-950/70 dark:text-rose-300 text-xs px-2.5 py-0.5 rounded-full font-bold border border-rose-300 dark:border-rose-800 flex items-center gap-1">
                      <Award className="w-3.5 h-3.5" />
                      প্রতিষ্ঠাতা ও রূপকার
                    </span>
                  )}
                </div>

                <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
                  {userToView.friendsCount.toLocaleString()} জন বন্ধু · {userToView.followersCount.toLocaleString()} জন অনুসারী
                </p>

                {/* Founder Helpline Highlight */}
                {userToView.role === 'founder' && (
                  <div className="inline-flex items-center gap-2 mt-1 px-3 py-1 rounded-full bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900 text-xs text-rose-700 dark:text-rose-300 font-semibold">
                    <PhoneCall className="w-3.5 h-3.5 text-rose-600 animate-pulse" />
                    <span>সার্বক্ষণিক ফ্রি হেল্পলাইন: 01825986764</span>
                  </div>
                )}
              </div>
            </div>

            {/* Profile Action Buttons */}
            <div className="flex items-center gap-2.5 shrink-0">
              {isSelf ? (
                <>
                  <button
                    onClick={() => setIsEditModalOpen(true)}
                    className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-zinc-700 dark:hover:bg-zinc-600 text-slate-800 dark:text-white text-xs sm:text-sm font-semibold flex items-center gap-1.5 transition-colors"
                  >
                    <Edit3 className="w-4 h-4" />
                    <span>প্রোফাইল এডিট</span>
                  </button>
                  <button
                    onClick={() => alert('নতুন স্টোরি তৈরি করুন ট্যাব থেকে')}
                    className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs sm:text-sm font-bold flex items-center gap-1.5 shadow-md shadow-rose-600/20 transition-all"
                  >
                    <Plus className="w-4 h-4" />
                    <span>স্টোরি যোগ করুন</span>
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={() => onOpenChatWithUser(userToView)}
                    className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs sm:text-sm font-bold flex items-center gap-1.5 shadow-md shadow-rose-600/20 transition-all"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>বার্তা পাঠান</span>
                  </button>
                  <button
                    onClick={() => onStartCall(userToView, 'audio')}
                    className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs sm:text-sm font-bold flex items-center gap-1.5 shadow-md transition-all"
                  >
                    <PhoneCall className="w-4 h-4" />
                    <span>কল করুন</span>
                  </button>
                </>
              )}
            </div>

          </div>

          {/* Profile Navigation Tabs */}
          <div className="flex items-center gap-2 sm:gap-4 mt-6 pt-2 border-t border-slate-200 dark:border-zinc-800 overflow-x-auto scrollbar-none text-xs sm:text-sm font-semibold">
            <button
              onClick={() => setActiveTab('posts')}
              className={`py-2 px-3 border-b-2 whitespace-nowrap transition-colors ${
                activeTab === 'posts' ? 'border-rose-600 text-rose-600 dark:text-rose-400' : 'border-transparent text-slate-600 dark:text-slate-400 hover:text-slate-900'
              }`}
            >
              পোস্টসমূহ
            </button>
            <button
              onClick={() => setActiveTab('about')}
              className={`py-2 px-3 border-b-2 whitespace-nowrap transition-colors ${
                activeTab === 'about' ? 'border-rose-600 text-rose-600 dark:text-rose-400' : 'border-transparent text-slate-600 dark:text-slate-400 hover:text-slate-900'
              }`}
            >
              পরিচিতি (About)
            </button>
            <button
              onClick={() => setActiveTab('friends')}
              className={`py-2 px-3 border-b-2 whitespace-nowrap transition-colors ${
                activeTab === 'friends' ? 'border-rose-600 text-rose-600 dark:text-rose-400' : 'border-transparent text-slate-600 dark:text-slate-400 hover:text-slate-900'
              }`}
            >
              বন্ধুরা ({userToView.friendsCount})
            </button>
            <button
              onClick={() => setActiveTab('photos')}
              className={`py-2 px-3 border-b-2 whitespace-nowrap transition-colors ${
                activeTab === 'photos' ? 'border-rose-600 text-rose-600 dark:text-rose-400' : 'border-transparent text-slate-600 dark:text-slate-400 hover:text-slate-900'
              }`}
            >
              ছবিসমূহ
            </button>
          </div>

        </div>
      </div>

      {/* PROFILE CONTENT BODY: TWO COLUMN LAYOUT */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 px-2 sm:px-0">
        
        {/* LEFT COLUMN: INTRO & DETAILS */}
        <div className="md:col-span-5 space-y-4">
          
          {/* Bio & Details Box */}
          <div className="bg-white dark:bg-[#242526] rounded-2xl p-4 sm:p-5 border border-slate-200 dark:border-zinc-800 shadow-xs space-y-3.5">
            <h3 className="font-bold text-base text-slate-900 dark:text-white">
              পরিচিতি
            </h3>

            <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-200 leading-relaxed text-center p-3 rounded-xl bg-slate-50 dark:bg-zinc-800/60 border border-slate-100 dark:border-zinc-700/60">
              {userToView.bio}
            </p>

            <div className="space-y-3 text-xs sm:text-sm text-slate-700 dark:text-slate-200 pt-1">
              {userToView.work && (
                <div className="flex items-center gap-2.5">
                  <Briefcase className="w-4 h-4 text-slate-400 shrink-0" />
                  <span>কর্মক্ষেত্র: <b>{userToView.work}</b></span>
                </div>
              )}

              {userToView.education && (
                <div className="flex items-center gap-2.5">
                  <GraduationCap className="w-4 h-4 text-slate-400 shrink-0" />
                  <span>শিক্ষা: <b>{userToView.education}</b></span>
                </div>
              )}

              <div className="flex items-center gap-2.5">
                <MapPin className="w-4 h-4 text-slate-400 shrink-0" />
                <span>বসবাস: <b>{userToView.location}</b></span>
              </div>

              {userToView.bloodGroup && (
                <div className="flex items-center gap-2.5">
                  <Heart className="w-4 h-4 text-rose-500 shrink-0" />
                  <span>রক্তের গ্রুপ: <b className="text-rose-600 dark:text-rose-400">{userToView.bloodGroup}</b></span>
                </div>
              )}

              <div className="flex items-center gap-2.5">
                <PhoneCall className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>যোগাযোগ: <b>{userToView.phone}</b></span>
              </div>

              <div className="flex items-center gap-2.5">
                <Calendar className="w-4 h-4 text-slate-400 shrink-0" />
                <span>যোগদানের তারিখ: <b>{userToView.joinedDate}</b></span>
              </div>
            </div>

            {isSelf && (
              <button
                onClick={() => setIsEditModalOpen(true)}
                className="w-full py-2 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-zinc-700 dark:hover:bg-zinc-600 text-xs font-bold text-slate-800 dark:text-white transition-colors"
              >
                তথ্য পরিবর্তন করুন
              </button>
            )}
          </div>

          {/* Photos Grid Widget */}
          <div className="bg-white dark:bg-[#242526] rounded-2xl p-4 sm:p-5 border border-slate-200 dark:border-zinc-800 shadow-xs space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-base text-slate-900 dark:text-white">
                ছবিসমূহ
              </h3>
              <span className="text-xs text-rose-600 cursor-pointer hover:underline font-semibold">
                সব দেখুন
              </span>
            </div>

            <div className="grid grid-cols-3 gap-1.5 rounded-xl overflow-hidden">
              <img src={userToView.avatar} alt="Photo 1" className="h-24 w-full object-cover" />
              <img src={userToView.coverPhoto} alt="Photo 2" className="h-24 w-full object-cover" />
              <img src="/src/assets/images/feed_humanity_post_1794414393784.jpg" alt="Photo 3" className="h-24 w-full object-cover" />
            </div>
          </div>

        </div>

        {/* RIGHT COLUMN: USER POSTS */}
        <div className="md:col-span-7 space-y-4">
          <h3 className="font-bold text-base text-slate-900 dark:text-white px-1">
            {userToView.banglaName || userToView.name}-এর পোস্টসমূহ ({userPosts.length})
          </h3>

          {userPosts.length > 0 ? (
            userPosts.map(post => (
              <PostCard
                key={post.id}
                post={post}
                currentUser={currentUser}
                onReaction={onReaction}
                onAddComment={onAddComment}
                onSelectUserToView={onSelectUserToView}
                onOpenChatWithUser={onOpenChatWithUser}
              />
            ))
          ) : (
            <div className="bg-white dark:bg-[#242526] rounded-2xl p-8 border border-slate-200 dark:border-zinc-800 text-center text-slate-500">
              এখনো কোনো পোস্ট নেই।
            </div>
          )}
        </div>

      </div>

      {/* EDIT PROFILE MODAL */}
      {isEditModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="w-full max-w-lg bg-white dark:bg-[#242526] rounded-3xl p-6 shadow-2xl border border-slate-200 dark:border-zinc-700 max-h-[90vh] overflow-y-auto space-y-4">
            
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-zinc-800">
              <h3 className="font-bold text-lg text-slate-900 dark:text-white">
                প্রোফাইল তথ্য পরিবর্তন
              </h3>
              <button
                onClick={() => setIsEditModalOpen(false)}
                className="w-8 h-8 rounded-full bg-slate-100 dark:bg-zinc-700 flex items-center justify-center text-slate-500"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveProfile} className="space-y-3.5 text-xs sm:text-sm">
              <div>
                <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">
                  বাংলা নাম
                </label>
                <input
                  type="text"
                  value={editBanglaName}
                  onChange={e => setEditBanglaName(e.target.value)}
                  className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 text-slate-900 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">
                  ইংরেজি নাম
                </label>
                <input
                  type="text"
                  value={editName}
                  onChange={e => setEditName(e.target.value)}
                  className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 text-slate-900 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">
                  বায়ো (সংক্ষিপ্ত পরিচিতি)
                </label>
                <textarea
                  rows={3}
                  value={editBio}
                  onChange={e => setEditBio(e.target.value)}
                  className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 text-slate-900 dark:text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">
                    বসবাস (স্থান)
                  </label>
                  <input
                    type="text"
                    value={editLocation}
                    onChange={e => setEditLocation(e.target.value)}
                    className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 text-slate-900 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">
                    রক্তের গ্রুপ
                  </label>
                  <select
                    value={editBloodGroup}
                    onChange={e => setEditBloodGroup(e.target.value)}
                    className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 text-slate-900 dark:text-white font-bold"
                  >
                    <option value="A+">A+</option>
                    <option value="A-">A-</option>
                    <option value="B+">B+</option>
                    <option value="B-">B-</option>
                    <option value="O+">O+</option>
                    <option value="O-">O-</option>
                    <option value="AB+">AB+</option>
                    <option value="AB-">AB-</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">
                  ফোন নম্বর / হটলাইন
                </label>
                <input
                  type="tel"
                  value={editPhone}
                  onChange={e => setEditPhone(e.target.value)}
                  className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 text-slate-900 dark:text-white font-bold"
                />
              </div>

              <div>
                <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">
                  পেশা / কর্মক্ষেত্র
                </label>
                <input
                  type="text"
                  value={editWork}
                  onChange={e => setEditWork(e.target.value)}
                  className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 text-slate-900 dark:text-white"
                />
              </div>

              <div className="pt-3 flex gap-2">
                <button
                  type="button"
                  onClick={() => setIsEditModalOpen(false)}
                  className="flex-1 py-2.5 rounded-xl bg-slate-100 dark:bg-zinc-700 font-bold text-slate-700 dark:text-white"
                >
                  বাতিল
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 font-bold text-white shadow-md shadow-rose-600/30"
                >
                  সংরক্ষণ করুন
                </button>
              </div>

            </form>

          </div>
        </div>
      )}

    </div>
  );
};
