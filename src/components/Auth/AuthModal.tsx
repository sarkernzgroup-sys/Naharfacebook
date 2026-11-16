import React, { useState } from 'react';
import { 
  X, 
  Mail, 
  Lock, 
  User as UserIcon, 
  Phone, 
  CheckCircle2, 
  ShieldCheck, 
  ArrowRight,
  Heart,
  KeyRound
} from 'lucide-react';
import { User } from '../../types';
import { sounds } from '../../utils/soundEffects';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentUser: User;
  allUsers: User[];
  onSwitchUser: (user: User) => void;
  onRegisterUser: (newUser: User) => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  currentUser,
  allUsers,
  onSwitchUser,
  onRegisterUser
}) => {
  const [authMode, setAuthMode] = useState<'login' | 'register' | 'otp' | 'switch'>('switch');
  
  // Registration form
  const [name, setName] = useState('');
  const [banglaName, setBanglaName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('01XXXXXXXXX');
  const [bloodGroup, setBloodGroup] = useState('O+');

  // OTP form
  const [otpCode, setOtpCode] = useState('');
  const [generatedOtp, setGeneratedOtp] = useState('582914');
  const [pendingUser, setPendingUser] = useState<User | null>(null);

  if (!isOpen) return null;

  const handleStartRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.includes('@gmail.com') && !email.includes('@')) {
      alert('অনুগ্রহ করে সঠিক Gmail বা ইমেইল ঠিকানা দিন।');
      return;
    }

    const newUser: User = {
      id: 'user_' + Date.now(),
      name: name.trim() || 'New Member',
      banglaName: banglaName.trim() || name.trim() || 'নতুন সদস্য',
      email: email.trim(),
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=300&auto=format&fit=crop&q=80',
      coverPhoto: '/src/assets/images/humanity_cover_banner_1794414391964.jpg',
      bio: 'মানবতার ফেরিওয়ালা পরিবারের নতুন সদস্য। মানুষের কল্যাণে নিবেদিত। ❤️',
      role: 'user',
      isVerified: false,
      location: 'বাংলাদেশ',
      phone: phone || '01825986764',
      joinedDate: 'আজ',
      followersCount: 1,
      followingCount: 5,
      friendsCount: 2,
      bloodGroup: bloodGroup
    };

    const code = Math.floor(100000 + Math.random() * 900000).toString();
    setGeneratedOtp(code);
    setPendingUser(newUser);
    setAuthMode('otp');
    sounds.playMessagePop();
  };

  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (!otpCode || otpCode.trim() !== generatedOtp) {
      alert(`ভুল কোড! যাচাইকরণ কোডটি হলো: ${generatedOtp}`);
      return;
    }

    if (pendingUser) {
      onRegisterUser(pendingUser);
      sounds.playMessagePop();
      alert('Gmail ভেরিফিকেশন সফল! আপনার অ্যাকাউন্ট তৈরি হয়েছে।');
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 animate-in fade-in">
      <div className="w-full max-w-md bg-white dark:bg-[#242526] rounded-3xl shadow-2xl border border-slate-200 dark:border-zinc-700 overflow-hidden flex flex-col">
        
        {/* Header */}
        <div className="p-4 px-5 border-b border-slate-100 dark:border-zinc-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-rose-600 text-white flex items-center justify-center">
              <Heart className="w-4 h-4 fill-white" />
            </div>
            <span className="font-bold text-base text-slate-900 dark:text-white">
              মানবতার ফেরিওয়ালা
            </span>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-100 dark:bg-zinc-700 flex items-center justify-center text-slate-500"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Auth Submenu Tabs */}
        <div className="grid grid-cols-3 border-b border-slate-200 dark:border-zinc-800 text-xs font-bold bg-slate-50 dark:bg-zinc-800/50">
          <button
            onClick={() => setAuthMode('switch')}
            className={`py-2.5 text-center transition-colors ${
              authMode === 'switch' ? 'bg-white dark:bg-[#242526] text-rose-600 border-b-2 border-rose-600' : 'text-slate-500'
            }`}
          >
            আইডি পরিবর্তন
          </button>
          <button
            onClick={() => setAuthMode('login')}
            className={`py-2.5 text-center transition-colors ${
              authMode === 'login' ? 'bg-white dark:bg-[#242526] text-rose-600 border-b-2 border-rose-600' : 'text-slate-500'
            }`}
          >
            লগইন
          </button>
          <button
            onClick={() => setAuthMode('register')}
            className={`py-2.5 text-center transition-colors ${
              authMode === 'register' ? 'bg-white dark:bg-[#242526] text-rose-600 border-b-2 border-rose-600' : 'text-slate-500'
            }`}
          >
            Gmail রেজিস্ট্রেশন
          </button>
        </div>

        {/* MODAL CONTENT */}
        <div className="p-5 space-y-4 max-h-[80vh] overflow-y-auto">
          
          {/* TAB 1: SWITCH PROFILE (Instant 1-Click login as Founder or Demo Users) */}
          {authMode === 'switch' && (
            <div className="space-y-3">
              <span className="text-xs font-bold text-slate-500 block uppercase tracking-wider">
                একটি আইডি নির্বাচন করুন:
              </span>

              <div className="space-y-2">
                {allUsers.map((user) => {
                  const isCurrent = user.id === currentUser.id;

                  return (
                    <div
                      key={user.id}
                      onClick={() => {
                        onSwitchUser(user);
                        sounds.playMessagePop();
                        onClose();
                      }}
                      className={`p-3 rounded-2xl border flex items-center justify-between cursor-pointer transition-all ${
                        isCurrent 
                          ? 'border-rose-600 bg-rose-50/70 dark:bg-rose-950/30' 
                          : 'border-slate-200 dark:border-zinc-700 hover:bg-slate-50 dark:hover:bg-zinc-800'
                      }`}
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <img src={user.avatar} alt={user.name} className="w-10 h-10 rounded-full object-cover shrink-0" />
                        <div className="min-w-0">
                          <div className="flex items-center gap-1">
                            <span className="font-bold text-sm text-slate-900 dark:text-white truncate">
                              {user.banglaName || user.name}
                            </span>
                            {user.role === 'founder' && (
                              <span className="text-[10px] bg-rose-600 text-white px-1.5 py-0.2 rounded-full font-bold">
                                জনক
                              </span>
                            )}
                          </div>
                          <span className="text-xs text-slate-500 dark:text-slate-400 block truncate">
                            {user.email} · {user.role}
                          </span>
                        </div>
                      </div>

                      {isCurrent ? (
                        <span className="text-xs text-rose-600 font-bold px-2 py-1 rounded-lg bg-rose-100 dark:bg-rose-950">
                          বর্তমান
                        </span>
                      ) : (
                        <span className="text-xs text-slate-400">
                          সুইচ করুন →
                        </span>
                      )}
                    </div>
                  );
                })}
              </div>

              <div className="pt-2 text-center">
                <button
                  onClick={() => setAuthMode('register')}
                  className="text-xs font-bold text-rose-600 hover:underline"
                >
                  + নতুন Gmail অ্যাকাউন্ট খুলুন
                </button>
              </div>
            </div>
          )}

          {/* TAB 2: LOGIN */}
          {authMode === 'login' && (
            <form onSubmit={(e) => { e.preventDefault(); alert('সফলভাবে লগইন হয়েছে!'); onClose(); }} className="space-y-3.5 text-xs sm:text-sm">
              <div>
                <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">
                  Gmail অথবা মোবাইল নম্বর
                </label>
                <div className="flex items-center bg-slate-50 dark:bg-zinc-800 rounded-xl px-3 py-2 border border-slate-200 dark:border-zinc-700">
                  <Mail className="w-4 h-4 text-slate-400 mr-2 shrink-0" />
                  <input
                    type="email"
                    required
                    placeholder="sarkernzgroup@gmail.com"
                    className="w-full bg-transparent text-slate-900 dark:text-white focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">
                  পাসওয়ার্ড
                </label>
                <div className="flex items-center bg-slate-50 dark:bg-zinc-800 rounded-xl px-3 py-2 border border-slate-200 dark:border-zinc-700">
                  <Lock className="w-4 h-4 text-slate-400 mr-2 shrink-0" />
                  <input
                    type="password"
                    required
                    placeholder="••••••••"
                    className="w-full bg-transparent text-slate-900 dark:text-white focus:outline-none"
                  />
                </div>
              </div>

              <div className="flex justify-between items-center text-xs">
                <label className="flex items-center gap-1.5 cursor-pointer text-slate-600 dark:text-slate-400">
                  <input type="checkbox" defaultChecked className="rounded text-rose-600" />
                  <span>মনে রাখুন</span>
                </label>
                <button type="button" onClick={() => alert('পাসওয়ার্ড পুনরুদ্ধারের জন্য হটলাইনে (01825986764) যোগাযোগ করুন')} className="text-rose-600 hover:underline">
                  পাসওয়ার্ড ভুলে গেছেন?
                </button>
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-sm shadow-md transition-colors"
              >
                লগইন করুন
              </button>
            </form>
          )}

          {/* TAB 3: REGISTER */}
          {authMode === 'register' && (
            <form onSubmit={handleStartRegister} className="space-y-3 text-xs sm:text-sm">
              <div>
                <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">
                  আপনার বাংলা নাম
                </label>
                <input
                  type="text"
                  required
                  placeholder="যেমন: এস এম শাহরিয়ার"
                  value={banglaName}
                  onChange={e => setBanglaName(e.target.value)}
                  className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 text-slate-900 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">
                  Gmail অ্যাকাউন্ট (OTP পাঠানো হবে)
                </label>
                <input
                  type="email"
                  required
                  placeholder="yourname@gmail.com"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 text-slate-900 dark:text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">
                    মোবাইল নম্বর
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="01XXXXXXXXX"
                    value={phone}
                    onChange={e => setPhone(e.target.value)}
                    className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 text-slate-900 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">
                    রক্তের গ্রুপ
                  </label>
                  <select
                    value={bloodGroup}
                    onChange={e => setBloodGroup(e.target.value)}
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
                  পাসওয়ার্ড
                </label>
                <input
                  type="password"
                  required
                  placeholder="কমপক্ষে ৬ সংখ্যার পাসওয়ার্ড"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 text-slate-900 dark:text-white"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-sm shadow-md transition-colors flex items-center justify-center gap-2"
              >
                <span>Gmail OTP কোড পাঠান</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          )}

          {/* TAB 4: OTP VERIFICATION */}
          {authMode === 'otp' && (
            <div className="space-y-4 text-center">
              <div className="w-14 h-14 rounded-full bg-rose-100 dark:bg-rose-950 text-rose-600 mx-auto flex items-center justify-center">
                <KeyRound className="w-7 h-7" />
              </div>

              <div>
                <h3 className="font-bold text-base text-slate-900 dark:text-white">
                  Gmail OTP কোড দিন
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                  <b>{pendingUser?.email}</b> ঠিকানায় ৬ সংখ্যার একটি কোড পাঠানো হয়েছে।
                </p>
              </div>

              {/* Code hint badge for instant testing */}
              <div 
                onClick={() => setOtpCode(generatedOtp)}
                className="p-2.5 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900 cursor-pointer hover:bg-rose-100 transition-colors"
                title="ক্লিক করে কোড বসিয়ে দিন"
              >
                <span className="text-[11px] text-slate-500 block">আপনার পরীক্ষার সুবিধার্থে জেনারেটেড কোড (ক্লিক করুন):</span>
                <span className="text-xl font-black text-rose-600 tracking-widest">{generatedOtp}</span>
              </div>

              <form onSubmit={handleVerifyOtp} className="space-y-3">
                <input
                  type="text"
                  maxLength={6}
                  placeholder="৬ সংখ্যার OTP কোড"
                  value={otpCode}
                  onChange={e => setOtpCode(e.target.value)}
                  className="w-full text-center text-xl font-bold tracking-widest p-2.5 rounded-xl bg-slate-50 dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 text-slate-900 dark:text-white"
                />

                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow-md"
                >
                  যাচাই করে অ্যাকাউন্ট তৈরি সম্পন্ন করুন
                </button>
              </form>
            </div>
          )}

        </div>

      </div>
    </div>
  );
};
