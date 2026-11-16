import React from 'react';
import { 
  Users, 
  MessageCircle, 
  Tv, 
  PlaySquare, 
  Layers, 
  Flag, 
  ShoppingBag, 
  Clock, 
  Bookmark, 
  HeartHandshake, 
  ShieldCheck, 
  Settings, 
  PhoneCall, 
  CheckCircle2, 
  Sparkles,
  Award
} from 'lucide-react';
import { User } from '../types';

interface SidebarLeftProps {
  currentUser: User;
  activeTab: string;
  setActiveTab: (tab: any) => void;
  onSelectUserToView: (user: User) => void;
  onOpenHumanityDesk: () => void;
  language: 'bn' | 'en';
}

export const SidebarLeft: React.FC<SidebarLeftProps> = ({
  currentUser,
  activeTab,
  setActiveTab,
  onSelectUserToView,
  onOpenHumanityDesk,
  language
}) => {
  return (
    <aside className="w-72 hidden xl:block sticky top-14 h-[calc(100vh-3.5rem)] overflow-y-auto px-2 py-4 space-y-4">
      
      {/* Current User Quick Tile */}
      <button
        onClick={() => {
          onSelectUserToView(currentUser);
          setActiveTab('profile');
        }}
        className="w-full flex items-center gap-3 p-2.5 rounded-xl hover:bg-slate-200/70 dark:hover:bg-[#3a3b3c] transition-colors text-left group"
      >
        <img
          src={currentUser.avatar}
          alt={currentUser.name}
          className="w-10 h-10 rounded-full object-cover ring-2 ring-rose-500/20 group-hover:ring-rose-500 transition-all"
        />
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1">
            <span className="font-bold text-sm text-slate-900 dark:text-white truncate">
              {currentUser.banglaName || currentUser.name}
            </span>
            {currentUser.isVerified && (
              <CheckCircle2 className="w-3.5 h-3.5 text-blue-500 fill-blue-500 shrink-0" />
            )}
          </div>
          <span className="text-xs text-slate-500 dark:text-slate-400 block truncate">
            {currentUser.role === 'founder' ? 'প্রতিষ্ঠাতা ও প্রধান সংগঠক' : 'সদস্য · ' + currentUser.location}
          </span>
        </div>
      </button>

      {/* FOUNDER & HELPLINE SPECIAL BANNER CARD */}
      <div className="p-3.5 rounded-2xl bg-gradient-to-br from-rose-50 via-red-50 to-amber-50 dark:from-rose-950/40 dark:via-red-950/30 dark:to-zinc-900 border border-rose-200/70 dark:border-rose-900/50 shadow-xs relative overflow-hidden">
        <div className="flex items-start gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-rose-600 flex items-center justify-center text-white shrink-0 shadow-sm shadow-rose-500/30">
            <Award className="w-5 h-5" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-1.5">
              <span className="text-xs font-bold text-rose-800 dark:text-rose-300">
                {language === 'bn' ? 'জনক ও প্রধান উদ্যোক্তা' : 'Founder & Visionary'}
              </span>
              <span className="text-[10px] bg-rose-600 text-white px-1.5 py-0.2 rounded-full font-bold">
                ফ্রি সেবা
              </span>
            </div>
            <p className="text-xs font-bold text-slate-900 dark:text-white mt-0.5 truncate">
              এস এন নাজমুল সরকার
            </p>
            <p className="text-[11px] text-slate-600 dark:text-slate-300 leading-tight mt-0.5">
              (SN Nazmul Sarker)
            </p>
          </div>
        </div>

        <div className="mt-3 pt-2.5 border-t border-rose-200/60 dark:border-rose-900/40 flex items-center justify-between">
          <div>
            <span className="text-[10px] text-slate-500 dark:text-slate-400 block font-medium">জরুরি হটলাইন:</span>
            <a href="tel:01825986764" className="text-xs font-bold text-rose-700 dark:text-rose-400 hover:underline flex items-center gap-1">
              <PhoneCall className="w-3 h-3 text-rose-600 animate-pulse" />
              01825986764
            </a>
          </div>
          <span className="text-[10px] px-2 py-0.5 rounded-md bg-white dark:bg-zinc-800 text-emerald-700 dark:text-emerald-400 font-bold border border-emerald-200 dark:border-emerald-800">
            ২৪ ঘণ্টা চালু
          </span>
        </div>
      </div>

      {/* Main Navigation Shortcuts */}
      <nav className="space-y-0.5 text-sm font-medium">
        
        <button
          onClick={() => setActiveTab('friends')}
          className={`w-full flex items-center gap-3.5 px-3 py-2.5 rounded-xl transition-colors text-left ${
            activeTab === 'friends' ? 'bg-slate-200/80 dark:bg-[#3a3b3c] text-rose-600 dark:text-rose-400' : 'text-slate-700 dark:text-slate-200 hover:bg-slate-200/50 dark:hover:bg-[#3a3b3c]'
          }`}
        >
          <div className="w-9 h-9 rounded-full bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0">
            <Users className="w-5 h-5" />
          </div>
          <div className="flex-1">
            <span className="font-semibold block">{language === 'bn' ? 'বন্ধুরা ও অনুরোধ' : 'Friends'}</span>
            <span className="text-[11px] text-slate-500 dark:text-slate-400 block font-normal">২টি নতুন অনুরোধ</span>
          </div>
        </button>

        <button
          onClick={() => setActiveTab('messenger')}
          className={`w-full flex items-center gap-3.5 px-3 py-2.5 rounded-xl transition-colors text-left ${
            activeTab === 'messenger' ? 'bg-slate-200/80 dark:bg-[#3a3b3c] text-rose-600 dark:text-rose-400' : 'text-slate-700 dark:text-slate-200 hover:bg-slate-200/50 dark:hover:bg-[#3a3b3c]'
          }`}
        >
          <div className="w-9 h-9 rounded-full bg-purple-100 dark:bg-purple-900/40 text-purple-600 dark:text-purple-400 flex items-center justify-center shrink-0">
            <MessageCircle className="w-5 h-5" />
          </div>
          <span className="font-semibold">{language === 'bn' ? 'মেসেঞ্জার ও কলিং' : 'Messenger & Calls'}</span>
        </button>

        <button
          onClick={() => onOpenHumanityDesk()}
          className="w-full flex items-center gap-3.5 px-3 py-2.5 rounded-xl transition-colors text-left text-slate-700 dark:text-slate-200 hover:bg-rose-100/60 dark:hover:bg-rose-950/30 group"
        >
          <div className="w-9 h-9 rounded-full bg-rose-100 dark:bg-rose-900/40 text-rose-600 dark:text-rose-400 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
            <HeartHandshake className="w-5 h-5" />
          </div>
          <div className="flex-1">
            <span className="font-semibold text-rose-700 dark:text-rose-400 flex items-center gap-1">
              জরুরি মানবসেবা ডেস্ক
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            </span>
            <span className="text-[11px] text-slate-500 dark:text-slate-400 block font-normal">রক্তদান, চিকিৎসা ও ত্রাণ সহায়তা</span>
          </div>
        </button>

        <button
          onClick={() => setActiveTab('reels')}
          className={`w-full flex items-center gap-3.5 px-3 py-2.5 rounded-xl transition-colors text-left ${
            activeTab === 'reels' ? 'bg-slate-200/80 dark:bg-[#3a3b3c] text-rose-600 dark:text-rose-400' : 'text-slate-700 dark:text-slate-200 hover:bg-slate-200/50 dark:hover:bg-[#3a3b3c]'
          }`}
        >
          <div className="w-9 h-9 rounded-full bg-rose-100 dark:bg-rose-900/40 text-rose-600 dark:text-rose-400 flex items-center justify-center shrink-0">
            <PlaySquare className="w-5 h-5" />
          </div>
          <span className="font-semibold">{language === 'bn' ? 'রিলস (শর্ট ভিডিও)' : 'Reels'}</span>
        </button>

        <button
          onClick={() => setActiveTab('watch')}
          className={`w-full flex items-center gap-3.5 px-3 py-2.5 rounded-xl transition-colors text-left ${
            activeTab === 'watch' ? 'bg-slate-200/80 dark:bg-[#3a3b3c] text-rose-600 dark:text-rose-400' : 'text-slate-700 dark:text-slate-200 hover:bg-slate-200/50 dark:hover:bg-[#3a3b3c]'
          }`}
        >
          <div className="w-9 h-9 rounded-full bg-amber-100 dark:bg-amber-900/40 text-amber-600 dark:text-amber-400 flex items-center justify-center shrink-0">
            <Tv className="w-5 h-5" />
          </div>
          <span className="font-semibold">{language === 'bn' ? 'ভিডিও ওয়াচ' : 'Watch Videos'}</span>
        </button>

        <div className="h-px bg-slate-200 dark:bg-zinc-800 my-2" />

        {/* Secondary Menu Items */}
        <button
          onClick={() => alert('গ্রুপ সেকশন শীঘ্রই উন্মুক্ত হচ্ছে।')}
          className="w-full flex items-center gap-3.5 px-3 py-2 rounded-xl text-slate-700 dark:text-slate-200 hover:bg-slate-200/50 dark:hover:bg-[#3a3b3c] transition-colors text-left"
        >
          <div className="w-8 h-8 rounded-full bg-cyan-100 dark:bg-cyan-900/40 text-cyan-600 flex items-center justify-center shrink-0">
            <Layers className="w-4 h-4" />
          </div>
          <span className="text-xs font-semibold">{language === 'bn' ? 'গ্রুপসমূহ' : 'Groups'}</span>
        </button>

        <button
          onClick={() => alert('পেজ সেকশন প্রস্তুত হচ্ছে।')}
          className="w-full flex items-center gap-3.5 px-3 py-2 rounded-xl text-slate-700 dark:text-slate-200 hover:bg-slate-200/50 dark:hover:bg-[#3a3b3c] transition-colors text-left"
        >
          <div className="w-8 h-8 rounded-full bg-orange-100 dark:bg-orange-900/40 text-orange-600 flex items-center justify-center shrink-0">
            <Flag className="w-4 h-4" />
          </div>
          <span className="text-xs font-semibold">{language === 'bn' ? 'পেজ' : 'Pages'}</span>
        </button>

        <button
          onClick={() => alert('মার্কেটপ্লেস: সুবিধা বঞ্চিতদের হস্তশিল্প ও পণ্য প্রদর্শন।')}
          className="w-full flex items-center gap-3.5 px-3 py-2 rounded-xl text-slate-700 dark:text-slate-200 hover:bg-slate-200/50 dark:hover:bg-[#3a3b3c] transition-colors text-left"
        >
          <div className="w-8 h-8 rounded-full bg-teal-100 dark:bg-teal-900/40 text-teal-600 flex items-center justify-center shrink-0">
            <ShoppingBag className="w-4 h-4" />
          </div>
          <span className="text-xs font-semibold">{language === 'bn' ? 'মার্কেটপ্লেস' : 'Marketplace'}</span>
        </button>

        <button
          onClick={() => alert('আপনার বিগত বছরের মানবিক পোস্ট ও স্মৃতিসমূহ।')}
          className="w-full flex items-center gap-3.5 px-3 py-2 rounded-xl text-slate-700 dark:text-slate-200 hover:bg-slate-200/50 dark:hover:bg-[#3a3b3c] transition-colors text-left"
        >
          <div className="w-8 h-8 rounded-full bg-indigo-100 dark:bg-indigo-900/40 text-indigo-600 flex items-center justify-center shrink-0">
            <Clock className="w-4 h-4" />
          </div>
          <span className="text-xs font-semibold">{language === 'bn' ? 'স্মৃতিসমূহ' : 'Memories'}</span>
        </button>

        <button
          onClick={() => alert('সংরক্ষিত পোস্ট তালিকা।')}
          className="w-full flex items-center gap-3.5 px-3 py-2 rounded-xl text-slate-700 dark:text-slate-200 hover:bg-slate-200/50 dark:hover:bg-[#3a3b3c] transition-colors text-left"
        >
          <div className="w-8 h-8 rounded-full bg-violet-100 dark:bg-violet-900/40 text-violet-600 flex items-center justify-center shrink-0">
            <Bookmark className="w-4 h-4" />
          </div>
          <span className="text-xs font-semibold">{language === 'bn' ? 'সংরক্ষিত' : 'Saved'}</span>
        </button>

        <div className="h-px bg-slate-200 dark:bg-zinc-800 my-2" />

        {/* Super Admin Panel Entry */}
        <button
          onClick={() => setActiveTab('admin')}
          className={`w-full flex items-center gap-3.5 px-3 py-2.5 rounded-xl transition-colors text-left ${
            activeTab === 'admin' ? 'bg-purple-100 dark:bg-purple-950/40 text-purple-700 dark:text-purple-300' : 'text-slate-700 dark:text-slate-200 hover:bg-slate-200/50 dark:hover:bg-[#3a3b3c]'
          }`}
        >
          <div className="w-8 h-8 rounded-full bg-purple-600 text-white flex items-center justify-center shrink-0 shadow-xs">
            <ShieldCheck className="w-4 h-4" />
          </div>
          <div>
            <span className="text-xs font-bold block text-purple-700 dark:text-purple-300">
              {language === 'bn' ? 'সুপার অ্যাডমিন ড্যাশবোর্ড' : 'Super Admin Panel'}
            </span>
            <span className="text-[10px] text-slate-500 dark:text-slate-400 block font-normal">
              ৪টি অ্যাডমিন রোল ও সম্পূর্ণ নিয়ন্ত্রণ
            </span>
          </div>
        </button>
      </nav>

      {/* Footer copyright */}
      <div className="pt-4 text-[11px] text-slate-500 dark:text-slate-500 leading-relaxed px-3">
        <p>© 2026 মানবতার ফেরিওয়ালা · প্রতিষ্ঠাতা: এস এন নাজমুল সরকার</p>
        <p className="mt-1">মানুষের জন্য, মানুষের পাশে · সম্পূর্ণ ফ্রি সেবা</p>
      </div>

    </aside>
  );
};
