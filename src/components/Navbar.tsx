import React, { useState } from 'react';
import { 
  Heart, 
  Search, 
  Home, 
  Tv, 
  PlaySquare, 
  Users, 
  Plus, 
  MessageCircle, 
  Bell, 
  Moon, 
  Sun, 
  PhoneCall, 
  ShieldCheck, 
  LogOut, 
  UserCheck, 
  LifeBuoy, 
  Layers,
  CheckCircle2,
  X
} from 'lucide-react';
import { User, NotificationItem, Conversation } from '../types';

interface NavbarProps {
  currentUser: User;
  activeTab: 'feed' | 'watch' | 'reels' | 'friends' | 'profile' | 'admin' | 'humanity' | 'messenger';
  setActiveTab: (tab: 'feed' | 'watch' | 'reels' | 'friends' | 'profile' | 'admin' | 'humanity' | 'messenger') => void;
  isDarkMode: boolean;
  setIsDarkMode: (val: boolean) => void;
  language: 'bn' | 'en';
  setLanguage: (lang: 'bn' | 'en') => void;
  notifications: NotificationItem[];
  markNotificationRead: (id: string) => void;
  conversations: Conversation[];
  openChatWithUser: (user: User) => void;
  onOpenCreatePost: () => void;
  onOpenAuthModal: () => void;
  onOpenHumanityDesk: () => void;
  onSelectUserToView: (user: User) => void;
  allUsers: User[];
}

export const Navbar: React.FC<NavbarProps> = ({
  currentUser,
  activeTab,
  setActiveTab,
  isDarkMode,
  setIsDarkMode,
  language,
  setLanguage,
  notifications,
  markNotificationRead,
  conversations,
  openChatWithUser,
  onOpenCreatePost,
  onOpenAuthModal,
  onOpenHumanityDesk,
  onSelectUserToView,
  allUsers
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showMessengerTray, setShowMessengerTray] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);

  const unreadNotifications = notifications.filter(n => !n.isRead).length;
  const unreadMessagesCount = conversations.reduce((acc, c) => acc + c.unreadCount, 0);

  // Filtered search results
  const filteredUsers = searchQuery.trim()
    ? allUsers.filter(u => 
        u.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
        u.banglaName.includes(searchQuery) ||
        (u.bloodGroup && u.bloodGroup.toLowerCase().includes(searchQuery.toLowerCase()))
      )
    : [];

  return (
    <header className="sticky top-0 z-40 bg-white dark:bg-[#242526] border-b border-slate-200 dark:border-zinc-800 shadow-xs transition-colors duration-200">
      <div className="max-w-[1920px] mx-auto px-2 sm:px-4 h-14 flex items-center justify-between gap-2 md:gap-4">
        
        {/* LEFT ZONE: Logo & Search */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          <button 
            onClick={() => setActiveTab('feed')} 
            className="flex items-center gap-2 group text-left focus:outline-none"
            title="মানবতার ফেরিওয়ালা - হোম"
          >
            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-rose-600 to-red-500 flex items-center justify-center text-white shadow-md shadow-rose-500/20 group-hover:scale-105 transition-transform">
              <Heart className="w-6 h-6 fill-white stroke-white animate-pulse" />
            </div>
            <div className="hidden lg:block leading-tight">
              <span className="text-xl font-bold tracking-tight text-slate-900 dark:text-white flex items-center gap-1 font-['Hind_Siliguri']">
                মানবতার ফেরিওয়ালা
              </span>
              <span className="text-[10px] text-rose-600 dark:text-rose-400 font-semibold block tracking-wider uppercase">
                {language === 'bn' ? 'মানুষের জন্য, মানুষের পাশে' : 'Connect • Care • Humanity'}
              </span>
            </div>
          </button>

          {/* Search Bar with dropdown */}
          <div className="relative">
            <div className="flex items-center bg-[#f0f2f5] dark:bg-[#3a3b3c] rounded-full px-3 py-1.5 focus-within:ring-2 focus-within:ring-rose-500 w-9 sm:w-48 md:w-64 transition-all">
              <Search className="w-4 h-4 text-slate-500 dark:text-slate-400 shrink-0" />
              <input
                type="text"
                placeholder={language === 'bn' ? 'বন্ধু বা রক্ত গ্রুপ খুঁজুন...' : 'Search friends, blood...'}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setIsSearchFocused(true)}
                className="w-full bg-transparent border-none text-xs sm:text-sm text-slate-900 dark:text-slate-100 placeholder-slate-500 focus:outline-none ml-2 hidden sm:block"
              />
              {searchQuery && (
                <button 
                  onClick={() => setSearchQuery('')}
                  className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Search Dropdown */}
            {isSearchFocused && searchQuery.trim() && (
              <div 
                className="absolute top-12 left-0 w-72 sm:w-80 bg-white dark:bg-[#242526] rounded-xl shadow-xl border border-slate-200 dark:border-zinc-700 py-2 z-50 animate-in fade-in slide-in-from-top-2"
                onMouseDown={(e) => e.preventDefault()}
              >
                <div className="px-3 py-1 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase">
                  {language === 'bn' ? 'অনুসন্ধানের ফলাফল' : 'Search Results'}
                </div>
                {filteredUsers.length > 0 ? (
                  filteredUsers.map(user => (
                    <button
                      key={user.id}
                      onClick={() => {
                        onSelectUserToView(user);
                        setActiveTab('profile');
                        setIsSearchFocused(false);
                        setSearchQuery('');
                      }}
                      className="w-full flex items-center gap-3 px-3 py-2 hover:bg-slate-100 dark:hover:bg-[#3a3b3c] text-left transition-colors"
                    >
                      <img src={user.avatar} alt={user.name} className="w-9 h-9 rounded-full object-cover" />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-1">
                          <span className="text-sm font-semibold text-slate-900 dark:text-white truncate">
                            {user.banglaName || user.name}
                          </span>
                          {user.isVerified && (
                            <CheckCircle2 className="w-3.5 h-3.5 text-blue-500 fill-blue-500 shrink-0" />
                          )}
                        </div>
                        <div className="text-xs text-slate-500 dark:text-slate-400 truncate">
                          {user.bloodGroup ? `রক্তের গ্রুপ: ${user.bloodGroup} · ` : ''}{user.location}
                        </div>
                      </div>
                    </button>
                  ))
                ) : (
                  <div className="px-3 py-4 text-center text-xs text-slate-500 dark:text-slate-400">
                    কোনো ফলাফল পাওয়া যায়নি
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* CENTER ZONE: Facebook-Style Primary Navigation Tabs */}
        <nav className="hidden sm:flex items-center h-full gap-1 md:gap-2 flex-1 justify-center max-w-2xl px-2">
          <button
            onClick={() => setActiveTab('feed')}
            title="হোম (News Feed)"
            className={`h-full px-4 md:px-7 flex items-center justify-center border-b-[3px] transition-all relative ${
              activeTab === 'feed'
                ? 'border-rose-600 text-rose-600 dark:text-rose-500'
                : 'border-transparent text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-[#3a3b3c] rounded-lg'
            }`}
          >
            <Home className="w-6 h-6" />
          </button>

          <button
            onClick={() => setActiveTab('watch')}
            title="ভিডিও (Watch)"
            className={`h-full px-4 md:px-7 flex items-center justify-center border-b-[3px] transition-all relative ${
              activeTab === 'watch'
                ? 'border-rose-600 text-rose-600 dark:text-rose-500'
                : 'border-transparent text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-[#3a3b3c] rounded-lg'
            }`}
          >
            <Tv className="w-6 h-6" />
          </button>

          <button
            onClick={() => setActiveTab('reels')}
            title="রিলস (Reels)"
            className={`h-full px-4 md:px-7 flex items-center justify-center border-b-[3px] transition-all relative ${
              activeTab === 'reels'
                ? 'border-rose-600 text-rose-600 dark:text-rose-500'
                : 'border-transparent text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-[#3a3b3c] rounded-lg'
            }`}
          >
            <PlaySquare className="w-6 h-6" />
          </button>

          <button
            onClick={() => setActiveTab('friends')}
            title="বন্ধুরা (Friends)"
            className={`h-full px-4 md:px-7 flex items-center justify-center border-b-[3px] transition-all relative ${
              activeTab === 'friends'
                ? 'border-rose-600 text-rose-600 dark:text-rose-500'
                : 'border-transparent text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-[#3a3b3c] rounded-lg'
            }`}
          >
            <Users className="w-6 h-6" />
          </button>

          <button
            onClick={() => onOpenHumanityDesk()}
            title="জরুরি মানবসেবা ডেস্ক (Emergency Blood & Aid)"
            className={`h-full px-4 md:px-7 flex items-center justify-center border-b-[3px] transition-all relative ${
              activeTab === 'humanity'
                ? 'border-rose-600 text-rose-600 dark:text-rose-500'
                : 'border-transparent text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/30 rounded-lg'
            }`}
          >
            <Heart className="w-6 h-6 fill-rose-500/20" />
            <span className="hidden xl:inline ml-1.5 text-xs font-bold text-rose-600 dark:text-rose-400">
              {language === 'bn' ? 'মানবসেবা' : 'Emergency'}
            </span>
          </button>
        </nav>

        {/* RIGHT ZONE: Actions, Messenger, Notifications, User Profile */}
        <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
          
          {/* Quick Helpline Button */}
          <a
            href="tel:01825986764"
            title="২৪/৭ হেল্পলাইন: 01825986764"
            className="hidden sm:flex items-center gap-1.5 px-2.5 py-1.5 rounded-full bg-emerald-50 hover:bg-emerald-100 dark:bg-emerald-950/40 dark:hover:bg-emerald-900/50 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 text-xs font-semibold transition-colors"
          >
            <PhoneCall className="w-3.5 h-3.5 text-emerald-600 animate-bounce" />
            <span className="tracking-tight">01825986764</span>
          </a>

          {/* Create Post Button */}
          <button
            onClick={onOpenCreatePost}
            title={language === 'bn' ? 'পোস্ট তৈরি করুন' : 'Create Post'}
            className="w-9 h-9 rounded-full bg-[#e4e6eb] dark:bg-[#3a3b3c] hover:bg-slate-200 dark:hover:bg-zinc-600 flex items-center justify-center text-slate-800 dark:text-slate-100 transition-colors"
          >
            <Plus className="w-5 h-5" />
          </button>

          {/* Messenger Tray Trigger */}
          <div className="relative">
            <button
              onClick={() => {
                setShowMessengerTray(!showMessengerTray);
                setShowNotifications(false);
                setShowUserMenu(false);
              }}
              title="মেসেঞ্জার"
              className="w-9 h-9 rounded-full bg-[#e4e6eb] dark:bg-[#3a3b3c] hover:bg-slate-200 dark:hover:bg-zinc-600 flex items-center justify-center text-slate-800 dark:text-slate-100 transition-colors relative"
            >
              <MessageCircle className="w-5 h-5" />
              {unreadMessagesCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-600 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {unreadMessagesCount}
                </span>
              )}
            </button>

            {/* Messenger Popover Tray */}
            {showMessengerTray && (
              <div className="absolute right-0 top-12 w-80 sm:w-96 bg-white dark:bg-[#242526] rounded-2xl shadow-2xl border border-slate-200 dark:border-zinc-700 p-3 z-50">
                <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-zinc-800">
                  <h3 className="font-bold text-slate-900 dark:text-white text-base">
                    {language === 'bn' ? 'চ্যাট ও বার্তা' : 'Chats'}
                  </h3>
                  <button 
                    onClick={() => {
                      setActiveTab('messenger');
                      setShowMessengerTray(false);
                    }}
                    className="text-xs text-rose-600 hover:underline font-semibold"
                  >
                    {language === 'bn' ? 'মেসেঞ্জারে সব দেখুন' : 'See all in Messenger'}
                  </button>
                </div>

                <div className="mt-2 space-y-1 max-h-80 overflow-y-auto">
                  {conversations.map(conv => (
                    <button
                      key={conv.id}
                      onClick={() => {
                        openChatWithUser(conv.participant);
                        setShowMessengerTray(false);
                      }}
                      className="w-full flex items-center gap-3 p-2 rounded-xl hover:bg-slate-100 dark:hover:bg-[#3a3b3c] transition-colors text-left"
                    >
                      <div className="relative shrink-0">
                        <img 
                          src={conv.participant.avatar} 
                          alt={conv.participant.name} 
                          className="w-11 h-11 rounded-full object-cover"
                        />
                        {conv.isOnline && (
                          <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 rounded-full border-2 border-white dark:border-[#242526]" />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-semibold text-slate-900 dark:text-white truncate">
                            {conv.participant.banglaName || conv.participant.name}
                          </span>
                          <span className="text-[10px] text-slate-400">
                            {conv.messages[conv.messages.length - 1]?.timestamp || ''}
                          </span>
                        </div>
                        <p className={`text-xs truncate ${conv.unreadCount > 0 ? 'font-bold text-slate-900 dark:text-white' : 'text-slate-500 dark:text-slate-400'}`}>
                          {conv.messages[conv.messages.length - 1]?.text || 'ছবি বা ফাইল পাঠিয়েছেন'}
                        </p>
                      </div>
                      {conv.unreadCount > 0 && (
                        <span className="w-2.5 h-2.5 rounded-full bg-blue-600 shrink-0" />
                      )}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Notifications Trigger */}
          <div className="relative">
            <button
              onClick={() => {
                setShowNotifications(!showNotifications);
                setShowMessengerTray(false);
                setShowUserMenu(false);
              }}
              title="নোটিফিকেশন"
              className="w-9 h-9 rounded-full bg-[#e4e6eb] dark:bg-[#3a3b3c] hover:bg-slate-200 dark:hover:bg-zinc-600 flex items-center justify-center text-slate-800 dark:text-slate-100 transition-colors relative"
            >
              <Bell className="w-5 h-5" />
              {unreadNotifications > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-600 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {unreadNotifications}
                </span>
              )}
            </button>

            {/* Notifications Popover */}
            {showNotifications && (
              <div className="absolute right-0 top-12 w-80 sm:w-96 bg-white dark:bg-[#242526] rounded-2xl shadow-2xl border border-slate-200 dark:border-zinc-700 p-3 z-50">
                <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-zinc-800">
                  <h3 className="font-bold text-slate-900 dark:text-white text-base">
                    {language === 'bn' ? 'নোটিফিকেশন' : 'Notifications'}
                  </h3>
                  <span className="text-xs text-slate-500">
                    {unreadNotifications} টি নতুন
                  </span>
                </div>

                <div className="mt-2 space-y-1 max-h-80 overflow-y-auto">
                  {notifications.map(n => (
                    <div
                      key={n.id}
                      onClick={() => markNotificationRead(n.id)}
                      className={`flex items-start gap-3 p-2.5 rounded-xl transition-colors cursor-pointer ${
                        n.isRead ? 'hover:bg-slate-100 dark:hover:bg-[#3a3b3c]' : 'bg-rose-50/70 dark:bg-rose-950/20 hover:bg-rose-100/60'
                      }`}
                    >
                      <img src={n.actor.avatar} alt={n.actor.name} className="w-10 h-10 rounded-full object-cover shrink-0" />
                      <div className="flex-1 min-w-0">
                        <p className="text-xs text-slate-900 dark:text-white font-medium leading-snug">
                          {n.title}
                        </p>
                        <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5 line-clamp-1">
                          {n.description}
                        </p>
                        <span className="text-[10px] text-slate-400 mt-1 block">
                          {n.timestamp}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Dark Mode Toggle */}
          <button
            onClick={() => setIsDarkMode(!isDarkMode)}
            title={isDarkMode ? 'লাইট মোড চালু করুন' : 'ডার্ক মোড চালু করুন'}
            className="w-9 h-9 rounded-full bg-[#e4e6eb] dark:bg-[#3a3b3c] hover:bg-slate-200 dark:hover:bg-zinc-600 flex items-center justify-center text-slate-800 dark:text-slate-100 transition-colors"
          >
            {isDarkMode ? <Sun className="w-5 h-5 text-amber-400" /> : <Moon className="w-5 h-5 text-slate-700" />}
          </button>

          {/* User Profile Avatar Dropdown */}
          <div className="relative">
            <button
              onClick={() => {
                setShowUserMenu(!showUserMenu);
                setShowNotifications(false);
                setShowMessengerTray(false);
              }}
              className="flex items-center gap-1.5 focus:outline-none p-0.5 rounded-full hover:ring-2 hover:ring-rose-500 transition-all"
            >
              <img
                src={currentUser.avatar}
                alt={currentUser.name}
                className="w-9 h-9 rounded-full object-cover ring-2 ring-rose-500/30"
              />
            </button>

            {/* User Dropdown Menu */}
            {showUserMenu && (
              <div className="absolute right-0 top-12 w-72 bg-white dark:bg-[#242526] rounded-2xl shadow-2xl border border-slate-200 dark:border-zinc-700 p-2 z-50">
                <div 
                  onClick={() => {
                    onSelectUserToView(currentUser);
                    setActiveTab('profile');
                    setShowUserMenu(false);
                  }}
                  className="flex items-center gap-3 p-2 rounded-xl hover:bg-slate-100 dark:hover:bg-[#3a3b3c] cursor-pointer"
                >
                  <img src={currentUser.avatar} alt={currentUser.name} className="w-12 h-12 rounded-full object-cover" />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1">
                      <span className="font-bold text-slate-900 dark:text-white text-sm truncate">
                        {currentUser.banglaName || currentUser.name}
                      </span>
                      {currentUser.isVerified && <CheckCircle2 className="w-3.5 h-3.5 text-blue-500 fill-blue-500" />}
                    </div>
                    <span className="text-xs text-rose-600 dark:text-rose-400 font-semibold">
                      প্রোফাইল দেখুন
                    </span>
                  </div>
                </div>

                <div className="h-px bg-slate-200 dark:bg-zinc-700 my-1.5" />

                <button
                  onClick={() => {
                    setActiveTab('admin');
                    setShowUserMenu(false);
                  }}
                  className="w-full flex items-center gap-3 px-3 py-2 text-sm text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-[#3a3b3c] rounded-xl transition-colors text-left"
                >
                  <ShieldCheck className="w-4 h-4 text-purple-600" />
                  <span>সুপার অ্যাডমিন প্যানেল</span>
                </button>

                <button
                  onClick={() => {
                    onOpenHumanityDesk();
                    setShowUserMenu(false);
                  }}
                  className="w-full flex items-center gap-3 px-3 py-2 text-sm text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-[#3a3b3c] rounded-xl transition-colors text-left"
                >
                  <LifeBuoy className="w-4 h-4 text-rose-600" />
                  <span>জরুরি মানবসেবা ডেস্ক</span>
                </button>

                <button
                  onClick={() => {
                    setLanguage(language === 'bn' ? 'en' : 'bn');
                    setShowUserMenu(false);
                  }}
                  className="w-full flex items-center gap-3 px-3 py-2 text-sm text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-[#3a3b3c] rounded-xl transition-colors text-left"
                >
                  <Layers className="w-4 h-4 text-blue-600" />
                  <span>ভাষা পরিবর্তন ({language === 'bn' ? 'English' : 'বাংলা'})</span>
                </button>

                <button
                  onClick={() => {
                    onOpenAuthModal();
                    setShowUserMenu(false);
                  }}
                  className="w-full flex items-center gap-3 px-3 py-2 text-sm text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-[#3a3b3c] rounded-xl transition-colors text-left"
                >
                  <UserCheck className="w-4 h-4 text-emerald-600" />
                  <span>অ্যাকাউন্ট পরিবর্তন / লগইন</span>
                </button>

                <div className="h-px bg-slate-200 dark:bg-zinc-700 my-1.5" />

                <button
                  onClick={() => {
                    onOpenAuthModal();
                    setShowUserMenu(false);
                  }}
                  className="w-full flex items-center gap-3 px-3 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/30 rounded-xl transition-colors text-left font-medium"
                >
                  <LogOut className="w-4 h-4" />
                  <span>লগআউট</span>
                </button>
              </div>
            )}
          </div>

        </div>
      </div>

      {/* MOBILE BOTTOM NAVIGATION BAR (FB Mobile style) */}
      <div className="sm:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 dark:bg-[#242526]/95 backdrop-blur-md border-t border-slate-200 dark:border-zinc-800 grid grid-cols-5 items-center h-14 px-1">
        <button
          onClick={() => setActiveTab('feed')}
          className={`flex flex-col items-center justify-center h-full ${
            activeTab === 'feed' ? 'text-rose-600' : 'text-slate-500 dark:text-slate-400'
          }`}
        >
          <Home className="w-5 h-5" />
          <span className="text-[10px] font-medium mt-0.5">ফিড</span>
        </button>

        <button
          onClick={() => setActiveTab('watch')}
          className={`flex flex-col items-center justify-center h-full ${
            activeTab === 'watch' ? 'text-rose-600' : 'text-slate-500 dark:text-slate-400'
          }`}
        >
          <Tv className="w-5 h-5" />
          <span className="text-[10px] font-medium mt-0.5">ভিডিও</span>
        </button>

        <button
          onClick={() => setActiveTab('reels')}
          className={`flex flex-col items-center justify-center h-full ${
            activeTab === 'reels' ? 'text-rose-600' : 'text-slate-500 dark:text-slate-400'
          }`}
        >
          <PlaySquare className="w-5 h-5" />
          <span className="text-[10px] font-medium mt-0.5">রিলস</span>
        </button>

        <button
          onClick={() => setActiveTab('friends')}
          className={`flex flex-col items-center justify-center h-full ${
            activeTab === 'friends' ? 'text-rose-600' : 'text-slate-500 dark:text-slate-400'
          }`}
        >
          <Users className="w-5 h-5" />
          <span className="text-[10px] font-medium mt-0.5">বন্ধু</span>
        </button>

        <button
          onClick={() => {
            onSelectUserToView(currentUser);
            setActiveTab('profile');
          }}
          className={`flex flex-col items-center justify-center h-full ${
            activeTab === 'profile' ? 'text-rose-600' : 'text-slate-500 dark:text-slate-400'
          }`}
        >
          <img src={currentUser.avatar} alt="Profile" className="w-5 h-5 rounded-full object-cover" />
          <span className="text-[10px] font-medium mt-0.5">প্রোফাইল</span>
        </button>
      </div>
    </header>
  );
};
