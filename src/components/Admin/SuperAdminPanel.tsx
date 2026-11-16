import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Users, 
  FileText, 
  Tv, 
  DollarSign, 
  AlertTriangle, 
  CheckCircle2, 
  XCircle, 
  Settings, 
  History, 
  Search, 
  UserCheck, 
  Trash2, 
  Lock, 
  PhoneCall, 
  Award,
  CreditCard,
  Check
} from 'lucide-react';
import { User, Post, PayoutRequest, UserReport } from '../../types';
import { sounds } from '../../utils/soundEffects';

interface SuperAdminPanelProps {
  currentUser: User;
  allUsers: User[];
  posts: Post[];
  payouts: PayoutRequest[];
  reports: UserReport[];
  onToggleUserBan: (userId: string) => void;
  onVerifyUser: (userId: string) => void;
  onDeletePost: (postId: string) => void;
  onApprovePayout: (payoutId: string) => void;
  onRejectPayout: (payoutId: string) => void;
  language: 'bn' | 'en';
}

type AdminRole = 'superadmin' | 'admin' | 'moderator' | 'support';

export const SuperAdminPanel: React.FC<SuperAdminPanelProps> = ({
  currentUser,
  allUsers,
  posts,
  payouts,
  reports,
  onToggleUserBan,
  onVerifyUser,
  onDeletePost,
  onApprovePayout,
  onRejectPayout,
  language
}) => {
  const [activeRole, setActiveRole] = useState<AdminRole>('superadmin');
  const [activeSection, setActiveSection] = useState<'overview' | 'users' | 'posts' | 'monetization' | 'reports' | 'logs' | 'settings'>('overview');
  const [userSearch, setUserSearch] = useState('');
  
  // Simulated audit logs
  const [auditLogs, setAuditLogs] = useState([
    { id: '1', admin: 'এস এন নাজমুল সরকার', action: 'ভুয়া আর্থিক পোস্ট অপসারণ ও ব্যবহারকারীকে সতর্কবার্তা', time: '১০ মিনিট আগে' },
    { id: '2', admin: 'তাহমিনা আক্তার', action: 'bKash উত্তোলন আবেদন (৳১৫,৪০০) অনুমোদন', time: '১ ঘণ্টা আগে' },
    { id: '3', admin: 'ডাঃ আরিফ হোসেন', action: 'জরুরি রক্তদাতা প্রোফাইল ভেরিফিকেশন প্রদান', time: '৩ ঘণ্টা আগে' }
  ]);

  const filteredUsers = allUsers.filter(u => 
    u.name.toLowerCase().includes(userSearch.toLowerCase()) || 
    u.banglaName.includes(userSearch) ||
    u.email.toLowerCase().includes(userSearch.toLowerCase())
  );

  return (
    <div className="max-w-6xl mx-auto py-4 px-2 sm:px-4 space-y-6">
      
      {/* ADMIN CONTROL BAR: ROLE SWITCHER & BADGE */}
      <div className="bg-white dark:bg-[#242526] rounded-2xl p-4 sm:p-5 border border-purple-200 dark:border-zinc-800 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-purple-600 to-indigo-600 text-white flex items-center justify-center shadow-md">
            <ShieldCheck className="w-7 h-7" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-black text-slate-900 dark:text-white">
                মানবতার ফেরিওয়ালা — Super Admin Control
              </h2>
              <span className="bg-purple-100 text-purple-700 dark:bg-purple-950/70 dark:text-purple-300 text-xs px-2.5 py-0.5 rounded-full font-bold uppercase tracking-wider">
                {activeRole}
              </span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              প্রতিষ্ঠাতা: এস এন নাজমুল সরকার · হেল্পলাইন: 01825986764 · সম্পূর্ণ নিয়ন্ত্রণ ড্যাশবোর্ড
            </p>
          </div>
        </div>

        {/* 4 Admin Roles Switcher */}
        <div className="flex items-center gap-1.5 bg-slate-100 dark:bg-zinc-800 p-1.5 rounded-2xl overflow-x-auto scrollbar-none">
          <button
            onClick={() => setActiveRole('superadmin')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
              activeRole === 'superadmin' ? 'bg-purple-600 text-white shadow-xs' : 'text-slate-600 dark:text-slate-300 hover:text-purple-600'
            }`}
          >
            Super Admin (সম্পূর্ণ ক্ষমতা)
          </button>
          <button
            onClick={() => setActiveRole('admin')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
              activeRole === 'admin' ? 'bg-purple-600 text-white shadow-xs' : 'text-slate-600 dark:text-slate-300 hover:text-purple-600'
            }`}
          >
            Admin (কনটেন্ট)
          </button>
          <button
            onClick={() => setActiveRole('moderator')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
              activeRole === 'moderator' ? 'bg-purple-600 text-white shadow-xs' : 'text-slate-600 dark:text-slate-300 hover:text-purple-600'
            }`}
          >
            Moderator (রিপোর্ট)
          </button>
          <button
            onClick={() => setActiveRole('support')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
              activeRole === 'support' ? 'bg-purple-600 text-white shadow-xs' : 'text-slate-600 dark:text-slate-300 hover:text-purple-600'
            }`}
          >
            Support (সহায়তা)
          </button>
        </div>
      </div>

      {/* ADMIN NAVIGATION TABS */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
        <button
          onClick={() => setActiveSection('overview')}
          className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-colors ${
            activeSection === 'overview'
              ? 'bg-purple-600 text-white shadow-xs'
              : 'bg-white dark:bg-[#242526] text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-zinc-800'
          }`}
        >
          ড্যাশবোর্ড ওভারভিউ
        </button>

        <button
          onClick={() => setActiveSection('users')}
          className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-colors ${
            activeSection === 'users'
              ? 'bg-purple-600 text-white shadow-xs'
              : 'bg-white dark:bg-[#242526] text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-zinc-800'
          }`}
        >
          ইউজার ম্যানেজমেন্ট ({allUsers.length})
        </button>

        <button
          onClick={() => setActiveSection('posts')}
          className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-colors ${
            activeSection === 'posts'
              ? 'bg-purple-600 text-white shadow-xs'
              : 'bg-white dark:bg-[#242526] text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-zinc-800'
          }`}
        >
          পোস্ট ও ভিডিও নিয়ন্ত্রণ ({posts.length})
        </button>

        <button
          onClick={() => setActiveSection('monetization')}
          className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-colors ${
            activeSection === 'monetization'
              ? 'bg-purple-600 text-white shadow-xs'
              : 'bg-white dark:bg-[#242526] text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-zinc-800'
          }`}
        >
          উপার্জন ও উত্তোলন ({payouts.length})
        </button>

        <button
          onClick={() => setActiveSection('reports')}
          className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-colors ${
            activeSection === 'reports'
              ? 'bg-purple-600 text-white shadow-xs'
              : 'bg-white dark:bg-[#242526] text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-zinc-800'
          }`}
        >
          রিপোর্ট ও কমপ্লেইন ({reports.length})
        </button>

        <button
          onClick={() => setActiveSection('logs')}
          className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-colors ${
            activeSection === 'logs'
              ? 'bg-purple-600 text-white shadow-xs'
              : 'bg-white dark:bg-[#242526] text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-zinc-800'
          }`}
        >
          অডিট লগ (Audit History)
        </button>
      </div>

      {/* SECTION 1: OVERVIEW METRICS */}
      {activeSection === 'overview' && (
        <div className="space-y-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            
            <div className="bg-white dark:bg-[#242526] rounded-2xl p-4 border border-slate-200 dark:border-zinc-800 shadow-xs">
              <span className="text-xs text-slate-500 font-semibold block">মোট নিবন্ধিত ইউজার</span>
              <span className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tabular-nums mt-1 block">
                ১২৪,৫৮০+
              </span>
              <span className="text-[11px] text-emerald-600 font-bold block mt-1">
                ↑ দৈনিক নতুন ৮৫০+
              </span>
            </div>

            <div className="bg-white dark:bg-[#242526] rounded-2xl p-4 border border-slate-200 dark:border-zinc-800 shadow-xs">
              <span className="text-xs text-slate-500 font-semibold block">মোট মানবিক পোস্ট</span>
              <span className="text-2xl sm:text-3xl font-black text-rose-600 tabular-nums mt-1 block">
                ৫৪,২১০+
              </span>
              <span className="text-[11px] text-slate-500 font-medium block mt-1">
                ছবি, ভিডিও ও আবেদন
              </span>
            </div>

            <div className="bg-white dark:bg-[#242526] rounded-2xl p-4 border border-slate-200 dark:border-zinc-800 shadow-xs">
              <span className="text-xs text-slate-500 font-semibold block">রক্তদান ও সহায়তা সফল</span>
              <span className="text-2xl sm:text-3xl font-black text-emerald-600 tabular-nums mt-1 block">
                ১২,৪৮০+
              </span>
              <span className="text-[11px] text-slate-500 font-medium block mt-1">
                জরুরি রোগী রক্ষা
              </span>
            </div>

            <div className="bg-white dark:bg-[#242526] rounded-2xl p-4 border border-slate-200 dark:border-zinc-800 shadow-xs">
              <span className="text-xs text-slate-500 font-semibold block">বিতরণকৃত সহায়তা ফান্ড</span>
              <span className="text-2xl sm:text-3xl font-black text-indigo-600 tabular-nums mt-1 block">
                ৳১৮,৪০,০০০
              </span>
              <span className="text-[11px] text-slate-500 font-medium block mt-1">
                সম্পূর্ণ স্বচ্ছ হিসাব
              </span>
            </div>

          </div>

          {/* Quick Notice & Security Box */}
          <div className="p-4 rounded-2xl bg-amber-50/80 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900/40 flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
            <div className="text-xs text-slate-700 dark:text-slate-300">
              <span className="font-bold text-amber-900 dark:text-amber-200 block text-sm">
                কমিউনিটি নির্দেশিকা ও প্ল্যাটফর্ম নিরাপত্তা
              </span>
              <span>
                ভুয়া অ্যাকাউন্ট ও প্রতারণামূলক পোস্ট তাৎক্ষণিক নিষিদ্ধ করুন। কোনো ভুয়া সাহায্যপ্রার্থী পাওয়া গেলে অ্যাকাউন্ট স্থায়ীভাবে বাতিল করে হটলাইন (01825986764) এর সাথে যোগাযোগ করতে বলুন।
              </span>
            </div>
          </div>
        </div>
      )}

      {/* SECTION 2: USERS MANAGEMENT */}
      {activeSection === 'users' && (
        <div className="bg-white dark:bg-[#242526] rounded-2xl border border-slate-200 dark:border-zinc-800 shadow-xs overflow-hidden">
          
          <div className="p-4 border-b border-slate-200 dark:border-zinc-800 flex items-center justify-between">
            <h3 className="font-bold text-base text-slate-900 dark:text-white">
              ব্যবহারকারী তালিকা ও নিয়ন্ত্রণ
            </h3>
            <div className="flex items-center bg-[#f0f2f5] dark:bg-[#3a3b3c] rounded-xl px-3 py-1.5 w-64">
              <Search className="w-4 h-4 text-slate-400 mr-2" />
              <input
                type="text"
                placeholder="ইউজার খুঁজুন..."
                value={userSearch}
                onChange={e => setUserSearch(e.target.value)}
                className="w-full bg-transparent text-xs text-slate-900 dark:text-white focus:outline-none"
              />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 dark:bg-zinc-800/60 text-slate-500 uppercase font-bold border-b border-slate-200 dark:border-zinc-800">
                <tr>
                  <th className="p-3">ইউজার</th>
                  <th className="p-3">ইমেইল / ফোন</th>
                  <th className="p-3">অবস্থান ও রক্ত</th>
                  <th className="p-3">রোল</th>
                  <th className="p-3">স্ট্যাটাস</th>
                  <th className="p-3 text-right">পদক্ষেপ</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-zinc-800 text-slate-800 dark:text-slate-200">
                {filteredUsers.map(user => (
                  <tr key={user.id} className="hover:bg-slate-50/50 dark:hover:bg-zinc-800/40 transition-colors">
                    <td className="p-3 flex items-center gap-2.5">
                      <img src={user.avatar} alt={user.name} className="w-9 h-9 rounded-full object-cover" />
                      <div>
                        <div className="flex items-center gap-1 font-bold">
                          <span>{user.banglaName || user.name}</span>
                          {user.isVerified && <CheckCircle2 className="w-3.5 h-3.5 text-blue-500 fill-blue-500" />}
                        </div>
                        <span className="text-[10px] text-slate-400">{user.name}</span>
                      </div>
                    </td>
                    <td className="p-3">
                      <span className="block font-medium">{user.email}</span>
                      <span className="text-[10px] text-slate-400 font-bold">{user.phone}</span>
                    </td>
                    <td className="p-3">
                      <span>{user.location}</span>
                      {user.bloodGroup && (
                        <span className="block text-rose-600 font-bold">গ্রুপ: {user.bloodGroup}</span>
                      )}
                    </td>
                    <td className="p-3">
                      <span className="px-2 py-0.5 rounded-full bg-purple-100 text-purple-700 dark:bg-purple-950 dark:text-purple-300 font-bold">
                        {user.role}
                      </span>
                    </td>
                    <td className="p-3">
                      <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300 font-bold">
                        সক্রিয় (Active)
                      </span>
                    </td>
                    <td className="p-3 text-right space-x-1.5">
                      <button
                        onClick={() => {
                          onVerifyUser(user.id);
                          sounds.playMessagePop();
                        }}
                        className="px-2 py-1 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100 dark:bg-blue-950/40 font-bold"
                      >
                        {user.isVerified ? 'ভেরিফাইড' : 'ভেরিফাই'}
                      </button>
                      <button
                        onClick={() => {
                          onToggleUserBan(user.id);
                          sounds.playCallEnd();
                        }}
                        className="px-2 py-1 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 dark:bg-red-950/40 font-bold"
                      >
                        নিষিদ্ধ / Ban
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

        </div>
      )}

      {/* SECTION 3: MONETIZATION & WITHDRAWALS */}
      {activeSection === 'monetization' && (
        <div className="bg-white dark:bg-[#242526] rounded-2xl border border-slate-200 dark:border-zinc-800 shadow-xs overflow-hidden">
          
          <div className="p-4 border-b border-slate-200 dark:border-zinc-800 flex items-center justify-between">
            <div>
              <h3 className="font-bold text-base text-slate-900 dark:text-white">
                ক্রিয়েটর আয় ও উত্তোলন আবেদন (bKash / Nagad / Rocket)
              </h3>
              <p className="text-xs text-slate-500">
                বিজ্ঞাপন ও কনটেন্ট থেকে অর্জিত ফান্ড উত্তোলন অনুমোদন
              </p>
            </div>
            <span className="text-xs font-bold text-emerald-600 bg-emerald-50 dark:bg-emerald-950/40 px-3 py-1 rounded-full">
              সক্রিয় ফান্ড গেটওয়ে
            </span>
          </div>

          <div className="divide-y divide-slate-100 dark:divide-zinc-800">
            {payouts.map(p => (
              <div key={p.id} className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <img src={p.creator.avatar} alt={p.creator.name} className="w-11 h-11 rounded-full object-cover" />
                  <div>
                    <span className="font-bold text-sm text-slate-900 dark:text-white block">
                      {p.creator.banglaName || p.creator.name}
                    </span>
                    <span className="text-xs text-slate-500">
                      মেথড: <b>{p.method}</b> ({p.accountNumber}) · তারিখ: {p.requestDate}
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between sm:justify-end gap-3">
                  <div className="text-right">
                    <span className="text-base font-black text-emerald-600 tabular-nums block">
                      ৳{p.amount.toLocaleString()}
                    </span>
                    <span className={`text-[10px] font-bold uppercase ${
                      p.status === 'approved' ? 'text-emerald-600' : p.status === 'rejected' ? 'text-red-600' : 'text-amber-600'
                    }`}>
                      {p.status === 'approved' ? 'অনুমোদিত' : p.status === 'rejected' ? 'বাতিল' : 'অপেক্ষমান (Pending)'}
                    </span>
                  </div>

                  {p.status === 'pending' && (
                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => {
                          onApprovePayout(p.id);
                          sounds.playMessagePop();
                        }}
                        className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-xs"
                      >
                        অনুমোদন
                      </button>
                      <button
                        onClick={() => {
                          onRejectPayout(p.id);
                          sounds.playCallEnd();
                        }}
                        className="px-3 py-1.5 rounded-lg bg-red-100 hover:bg-red-200 text-red-600 text-xs font-bold"
                      >
                        বাতিল
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

        </div>
      )}

      {/* SECTION 4: POSTS MODERATION */}
      {activeSection === 'posts' && (
        <div className="space-y-4">
          <div className="bg-white dark:bg-[#242526] rounded-2xl p-4 border border-slate-200 dark:border-zinc-800 shadow-xs flex items-center justify-between">
            <h3 className="font-bold text-base text-slate-900 dark:text-white">
              পোস্ট ও ভিডিও কনটেন্ট নিয়ন্ত্রণ ({posts.length})
            </h3>
            <span className="text-xs text-slate-500">কোনো অনৈতিক বা ভুয়া পোস্ট মুছে ফেলুন</span>
          </div>

          <div className="space-y-3">
            {posts.map(post => (
              <div key={post.id} className="bg-white dark:bg-[#242526] rounded-2xl p-4 border border-slate-200 dark:border-zinc-800 shadow-xs flex flex-col sm:flex-row justify-between gap-3">
                <div className="flex items-start gap-3">
                  <img src={post.author.avatar} alt="Author" className="w-10 h-10 rounded-full object-cover shrink-0" />
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="font-bold text-sm text-slate-900 dark:text-white">
                        {post.author.banglaName || post.author.name}
                      </span>
                      <span className="text-xs text-slate-400">· {post.timestamp}</span>
                      {post.isHumanityEmergency && (
                        <span className="text-[10px] bg-red-600 text-white px-2 py-0.2 rounded-full font-bold">
                          জরুরি পোস্ট
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-slate-700 dark:text-slate-300 mt-1 line-clamp-2">
                      {post.content}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => {
                      onDeletePost(post.id);
                      sounds.playCallEnd();
                    }}
                    className="px-3 py-1.5 rounded-lg bg-red-50 hover:bg-red-100 text-red-600 text-xs font-bold flex items-center gap-1"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>পোস্ট ডিলিট</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SECTION 5: AUDIT LOGS */}
      {activeSection === 'logs' && (
        <div className="bg-white dark:bg-[#242526] rounded-2xl p-5 border border-slate-200 dark:border-zinc-800 shadow-xs space-y-4">
          <h3 className="font-bold text-base text-slate-900 dark:text-white flex items-center gap-2">
            <History className="w-5 h-5 text-purple-600" />
            <span>অ্যাডমিন অডিট ও অ্যাক্টিভিটি ইতিহাস</span>
          </h3>

          <div className="space-y-2.5">
            {auditLogs.map(log => (
              <div key={log.id} className="p-3 rounded-xl bg-slate-50 dark:bg-zinc-800/60 border border-slate-100 dark:border-zinc-700/60 flex items-center justify-between text-xs">
                <div>
                  <span className="font-bold text-purple-700 dark:text-purple-300 block">{log.admin}</span>
                  <span className="text-slate-700 dark:text-slate-200">{log.action}</span>
                </div>
                <span className="text-slate-400">{log.time}</span>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
};
