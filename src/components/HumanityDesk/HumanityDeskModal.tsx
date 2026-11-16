import React, { useState } from 'react';
import { 
  X, 
  Heart, 
  PhoneCall, 
  Search, 
  Award, 
  MapPin, 
  CheckCircle2, 
  ShieldCheck, 
  LifeBuoy, 
  Send,
  Droplet
} from 'lucide-react';
import { User } from '../../types';
import { sounds } from '../../utils/soundEffects';

interface HumanityDeskModalProps {
  isOpen: boolean;
  onClose: () => void;
  allUsers: User[];
  onOpenChatWithUser: (user: User) => void;
}

export const HumanityDeskModal: React.FC<HumanityDeskModalProps> = ({
  isOpen,
  onClose,
  allUsers,
  onOpenChatWithUser
}) => {
  const [activeTab, setActiveTab] = useState<'blood' | 'aid' | 'volunteer'>('blood');
  const [selectedBloodGroup, setSelectedBloodGroup] = useState<string>('all');
  
  // Aid request form state
  const [patientName, setPatientName] = useState('');
  const [aidPhone, setAidPhone] = useState('');
  const [aidDetails, setAidDetails] = useState('');
  const [aidHospital, setAidHospital] = useState('');
  const [submittedAid, setSubmittedAid] = useState(false);

  // Volunteer form state
  const [volName, setVolName] = useState('');
  const [volDistrict, setVolDistrict] = useState('ঢাকা');
  const [volBlood, setVolBlood] = useState('O+');
  const [volPhone, setVolPhone] = useState('');
  const [registeredVol, setRegisteredVol] = useState(false);

  if (!isOpen) return null;

  const bloodDonors = allUsers.filter(u => {
    if (selectedBloodGroup === 'all') return !!u.bloodGroup;
    return u.bloodGroup === selectedBloodGroup;
  });

  const handleSubmitAid = (e: React.FormEvent) => {
    e.preventDefault();
    sounds.playMessagePop();
    setSubmittedAid(true);
  };

  const handleRegisterVol = (e: React.FormEvent) => {
    e.preventDefault();
    sounds.playMessagePop();
    setRegisteredVol(true);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 animate-in fade-in">
      <div className="w-full max-w-2xl bg-white dark:bg-[#242526] rounded-3xl shadow-2xl border border-rose-200 dark:border-zinc-700 overflow-hidden flex flex-col max-h-[92vh]">
        
        {/* MODAL HERO HEADER */}
        <div className="p-5 bg-gradient-to-r from-red-600 via-rose-600 to-rose-700 text-white relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 text-white flex items-center justify-center transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-white text-rose-600 flex items-center justify-center shadow-lg">
              <Heart className="w-7 h-7 fill-rose-600 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl sm:text-2xl font-black">
                  জরুরি মানবসেবা ডেস্ক
                </h2>
                <span className="bg-white/25 text-white px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider">
                  ১০০% ফ্রি সেবা
                </span>
              </div>
              <p className="text-xs text-rose-100 mt-0.5">
                জনক: এস এন নাজমুল সরকার · হটলাইন: 01825986764 (২৪ ঘণ্টা সার্বক্ষণিক)
              </p>
            </div>
          </div>

          {/* Quick Hotline Strip */}
          <div className="mt-4 p-2.5 rounded-xl bg-black/25 backdrop-blur-xs flex items-center justify-between border border-white/15">
            <div className="text-xs">
              <span className="text-rose-200 block text-[10px]">জরুরি মুহূর্তে সরাসরি কল করুন:</span>
              <span className="font-extrabold text-white text-sm sm:text-base tracking-wider">01825986764</span>
            </div>
            <a
              href="tel:01825986764"
              className="px-3.5 py-1.5 rounded-lg bg-white text-rose-700 font-bold text-xs flex items-center gap-1.5 shadow-md active:scale-95 transition-all"
            >
              <PhoneCall className="w-3.5 h-3.5 animate-bounce" />
              <span>সরাসরি কল দিন</span>
            </a>
          </div>
        </div>

        {/* TABS */}
        <div className="grid grid-cols-3 border-b border-slate-200 dark:border-zinc-800 text-xs sm:text-sm font-bold bg-slate-50 dark:bg-zinc-800/50">
          <button
            onClick={() => setActiveTab('blood')}
            className={`py-3 text-center border-b-2 transition-colors ${
              activeTab === 'blood' ? 'border-rose-600 text-rose-600 dark:text-rose-400 bg-white dark:bg-[#242526]' : 'border-transparent text-slate-600 dark:text-slate-400'
            }`}
          >
            🩸 রক্তদাতা খুঁজুন
          </button>
          <button
            onClick={() => setActiveTab('aid')}
            className={`py-3 text-center border-b-2 transition-colors ${
              activeTab === 'aid' ? 'border-rose-600 text-rose-600 dark:text-rose-400 bg-white dark:bg-[#242526]' : 'border-transparent text-slate-600 dark:text-slate-400'
            }`}
          >
            🩺 চিকিৎসা সহায়তা
          </button>
          <button
            onClick={() => setActiveTab('volunteer')}
            className={`py-3 text-center border-b-2 transition-colors ${
              activeTab === 'volunteer' ? 'border-rose-600 text-rose-600 dark:text-rose-400 bg-white dark:bg-[#242526]' : 'border-transparent text-slate-600 dark:text-slate-400'
            }`}
          >
            🤝 ভলান্টিয়ার যোগ দিন
          </button>
        </div>

        {/* MODAL BODY */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4">
          
          {/* TAB 1: BLOOD DONOR DIRECTORY */}
          {activeTab === 'blood' && (
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <span className="text-xs font-bold text-slate-700 dark:text-slate-300">
                  রক্তের গ্রুপ দিয়ে ফিল্টার করুন:
                </span>
                <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
                  {['all', 'A+', 'B+', 'O+', 'O-', 'AB+'].map(bg => (
                    <button
                      key={bg}
                      onClick={() => setSelectedBloodGroup(bg)}
                      className={`px-3 py-1 rounded-full text-xs font-bold transition-colors ${
                        selectedBloodGroup === bg
                          ? 'bg-rose-600 text-white shadow-xs'
                          : 'bg-slate-100 dark:bg-zinc-800 text-slate-700 dark:text-slate-300'
                      }`}
                    >
                      {bg === 'all' ? 'সব গ্রুপ' : bg}
                    </button>
                  ))}
                </div>
              </div>

              {/* Donors List */}
              <div className="space-y-2.5">
                {bloodDonors.map(donor => (
                  <div
                    key={donor.id}
                    className="p-3.5 rounded-2xl bg-white dark:bg-zinc-800/80 border border-slate-200 dark:border-zinc-700 shadow-2xs flex items-center justify-between gap-3"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="relative">
                        <img src={donor.avatar} alt={donor.name} className="w-12 h-12 rounded-full object-cover ring-2 ring-rose-500/30" />
                        <span className="absolute -bottom-1 -right-1 w-5 h-5 bg-rose-600 text-white rounded-full flex items-center justify-center text-[10px] font-black">
                          {donor.bloodGroup}
                        </span>
                      </div>
                      <div className="min-w-0">
                        <div className="flex items-center gap-1">
                          <span className="font-bold text-sm text-slate-900 dark:text-white truncate">
                            {donor.banglaName || donor.name}
                          </span>
                          {donor.isVerified && <CheckCircle2 className="w-3.5 h-3.5 text-blue-500 fill-blue-500" />}
                        </div>
                        <span className="text-xs text-slate-500 dark:text-slate-400 block truncate">
                          অবস্থান: {donor.location}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        onClick={() => {
                          onOpenChatWithUser(donor);
                          onClose();
                        }}
                        className="p-2 rounded-xl bg-slate-100 dark:bg-zinc-700 text-slate-700 dark:text-white hover:bg-slate-200"
                        title="চ্যাট করুন"
                      >
                        চ্যাট
                      </button>
                      <a
                        href={`tel:${donor.phone}`}
                        className="px-3 py-1.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold flex items-center gap-1 shadow-xs"
                      >
                        <PhoneCall className="w-3.5 h-3.5" />
                        <span>কল দিন</span>
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 2: REQUEST AID */}
          {activeTab === 'aid' && (
            <div>
              {submittedAid ? (
                <div className="p-8 text-center space-y-3">
                  <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="font-bold text-lg text-slate-900 dark:text-white">
                    আপনার মানবিক আবেদনটি গৃহীত হয়েছে!
                  </h3>
                  <p className="text-xs text-slate-600 dark:text-slate-300 max-w-md mx-auto">
                    আমাদের কেন্দ্রীয় ভলান্টিয়ার টিম ও প্রতিষ্ঠাতা এস এন নাজমুল সরকার অতিসত্বর আপনার সাথে যোগাযোগ করবেন। যেকোনো জরুরি মুহূর্তে 01825986764 নম্বরে কল করুন।
                  </p>
                  <button
                    onClick={() => setSubmittedAid(false)}
                    className="px-4 py-2 rounded-xl bg-rose-600 text-white text-xs font-bold"
                  >
                    নতুন আবেদন করুন
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmitAid} className="space-y-3 text-xs sm:text-sm">
                  <div>
                    <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">
                      রোগী বা গ্রহীতার নাম
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="রোগীর নাম..."
                      value={patientName}
                      onChange={e => setPatientName(e.target.value)}
                      className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 text-slate-900 dark:text-white"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">
                        হাসপাতাল / এলাকা
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="যেমন: ঢাকা মেডিকেল"
                        value={aidHospital}
                        onChange={e => setAidHospital(e.target.value)}
                        className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 text-slate-900 dark:text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">
                        যোগাযোগের মোবাইল নম্বর
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="01XXXXXXXXX"
                        value={aidPhone}
                        onChange={e => setAidPhone(e.target.value)}
                        className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 text-slate-900 dark:text-white font-bold"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">
                      সমস্যার বিবরণ ও কি সহায়তা প্রয়োজন
                    </label>
                    <textarea
                      rows={3}
                      required
                      placeholder="অসুস্থতা, প্রয়োজনীয় ওষুধ বা রক্তের বিস্তারিত বিবরণ লিখুন..."
                      value={aidDetails}
                      onChange={e => setAidDetails(e.target.value)}
                      className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 text-slate-900 dark:text-white"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-sm shadow-md shadow-rose-600/30"
                  >
                    আবেদন জমা দিন (সম্পূর্ণ ফ্রি)
                  </button>
                </form>
              )}
            </div>
          )}

          {/* TAB 3: VOLUNTEER REGISTRATION */}
          {activeTab === 'volunteer' && (
            <div>
              {registeredVol ? (
                <div className="p-8 text-center space-y-3">
                  <div className="w-16 h-16 rounded-full bg-rose-100 text-rose-600 mx-auto flex items-center justify-center">
                    <Heart className="w-8 h-8 fill-rose-600" />
                  </div>
                  <h3 className="font-bold text-lg text-slate-900 dark:text-white">
                    স্বাগতম মানবতার ফেরিওয়ালা পরিবারে! ❤️
                  </h3>
                  <p className="text-xs text-slate-600 dark:text-slate-300 max-w-md mx-auto">
                    আপনার মানবিক সেবার অঙ্গীকার আমাদের সমাজকে আরও সমৃদ্ধ করবে। আপনার এলাকায় যেকোনো মানবিক সংকট বা রক্তদানের প্রয়োজনে আপনার সাথে সমন্বয় করা হবে।
                  </p>
                </div>
              ) : (
                <form onSubmit={handleRegisterVol} className="space-y-3 text-xs sm:text-sm">
                  <div>
                    <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">
                      আপনার পূর্ণ নাম
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="যেমন: মোঃ সাব্বির আহমেদ"
                      value={volName}
                      onChange={e => setVolName(e.target.value)}
                      className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 text-slate-900 dark:text-white"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">
                        জেলা
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="যেমন: ঢাকা / চট্টগ্রাম"
                        value={volDistrict}
                        onChange={e => setVolDistrict(e.target.value)}
                        className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 text-slate-900 dark:text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">
                        রক্তের গ্রুপ
                      </label>
                      <select
                        value={volBlood}
                        onChange={e => setVolBlood(e.target.value)}
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
                      মোবাইল নম্বর
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="01XXXXXXXXX"
                      value={volPhone}
                      onChange={e => setVolPhone(e.target.value)}
                      className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 text-slate-900 dark:text-white font-bold"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow-md transition-colors"
                  >
                    ভলান্টিয়ার হিসেবে রেজিস্টার করুন
                  </button>
                </form>
              )}
            </div>
          )}

        </div>

      </div>
    </div>
  );
};
