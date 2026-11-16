import React, { useState, useRef } from 'react';
import { 
  Image, 
  Video, 
  Smile, 
  HeartHandshake, 
  BarChart2, 
  X, 
  Plus, 
  PhoneCall, 
  MapPin, 
  Sparkles,
  CheckCircle2
} from 'lucide-react';
import { User, Post, ReactionType } from '../../types';
import { sounds } from '../../utils/soundEffects';

interface CreatePostBoxProps {
  currentUser: User;
  onAddPost: (post: Post) => void;
  isOpenModalDirectly?: boolean;
  onCloseModalDirectly?: () => void;
}

export const CreatePostBox: React.FC<CreatePostBoxProps> = ({
  currentUser,
  onAddPost,
  isOpenModalDirectly = false,
  onCloseModalDirectly
}) => {
  const [isModalOpen, setIsModalOpen] = useState(isOpenModalDirectly);
  const [content, setContent] = useState('');
  const [selectedImages, setSelectedImages] = useState<string[]>([]);
  const [feeling, setFeeling] = useState<string>('');
  
  // Emergency blood/aid state
  const [isEmergency, setIsEmergency] = useState(false);
  const [emergencyCategory, setEmergencyCategory] = useState<'blood' | 'medical' | 'relief' | 'education'>('blood');
  const [bloodGroup, setBloodGroup] = useState('O+');
  const [hospitalLocation, setHospitalLocation] = useState('ঢাকা মেডিকেল কলেজ হাসপাতাল');
  const [patientInfo, setPatientInfo] = useState('');
  const [contactNumber, setContactNumber] = useState('01825986764');
  const [urgency, setUrgency] = useState<'critical' | 'high' | 'medium'>('critical');

  // Poll state
  const [isPollOpen, setIsPollOpen] = useState(false);
  const [pollQuestion, setPollQuestion] = useState('');
  const [pollOptions, setPollOptions] = useState<string[]>(['', '']);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const url = URL.createObjectURL(file);
      setSelectedImages(prev => [...prev, url]);
    }
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleClose = () => {
    setIsModalOpen(false);
    if (onCloseModalDirectly) onCloseModalDirectly();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim() && selectedImages.length === 0 && !isEmergency && !pollQuestion) {
      alert('অনুগ্রহ করে কিছু লিখুন বা ছবি যুক্ত করুন।');
      return;
    }

    const newPost: Post = {
      id: 'post_' + Date.now(),
      author: currentUser,
      timestamp: 'এইমাত্র',
      content: content.trim(),
      images: selectedImages.length > 0 ? selectedImages : undefined,
      isHumanityEmergency: isEmergency,
      emergencyDetails: isEmergency ? {
        category: emergencyCategory,
        title: emergencyCategory === 'blood' 
          ? `জরুরি ${bloodGroup} রক্তের প্রয়োজন` 
          : 'জরুরি মানবিক সহায়তা আবেদন',
        bloodGroup: emergencyCategory === 'blood' ? bloodGroup : undefined,
        location: hospitalLocation || 'ঢাকা, বাংলাদেশ',
        patientInfo: patientInfo || 'অসহায় রোগীর সাহায্যার্থে',
        contactNumber: contactNumber || '01825986764',
        urgency: urgency
      } : undefined,
      reactions: {
        like: 1,
        love: 0,
        care: 0,
        haha: 0,
        wow: 0,
        sad: 0,
        angry: 0
      },
      userReaction: 'like',
      commentsCount: 0,
      sharesCount: 0,
      viewsCount: 1,
      comments: [],
      poll: isPollOpen && pollQuestion.trim() ? {
        question: pollQuestion.trim(),
        options: pollOptions.filter(o => o.trim()).map((opt, i) => ({
          id: `opt_${i}`,
          text: opt,
          votes: 0
        })),
        totalVotes: 0
      } : undefined
    };

    onAddPost(newPost);
    sounds.playMessagePop();

    // Reset
    setContent('');
    setSelectedImages([]);
    setFeeling('');
    setIsEmergency(false);
    setIsPollOpen(false);
    handleClose();
  };

  return (
    <>
      {/* Feed Inline Trigger Card */}
      <div className="bg-white dark:bg-[#242526] rounded-2xl p-3.5 sm:p-4 border border-slate-200 dark:border-zinc-800 shadow-xs space-y-3">
        <div className="flex items-center gap-2.5 sm:gap-3">
          <img
            src={currentUser.avatar}
            alt={currentUser.name}
            className="w-10 h-10 rounded-full object-cover ring-2 ring-rose-500/20"
          />
          <button
            onClick={handleOpenModal}
            className="flex-1 bg-[#f0f2f5] dark:bg-[#3a3b3c] hover:bg-slate-200 dark:hover:bg-zinc-600 text-slate-500 dark:text-slate-400 text-left px-4 py-2.5 rounded-full text-xs sm:text-sm font-medium transition-colors"
          >
            {currentUser.banglaName || currentUser.name}, আপনার মনের কথা বা মানবিক বার্তা শেয়ার করুন...
          </button>
        </div>

        <div className="h-px bg-slate-100 dark:bg-zinc-800" />

        {/* Action Triggers */}
        <div className="grid grid-cols-3 gap-1">
          <button
            onClick={() => {
              setIsEmergency(true);
              handleOpenModal();
            }}
            className="flex items-center justify-center gap-1.5 py-2 px-1 rounded-xl hover:bg-rose-50 dark:hover:bg-rose-950/30 text-rose-600 dark:text-rose-400 transition-colors text-xs font-semibold"
          >
            <HeartHandshake className="w-4 h-4 shrink-0 text-rose-600 animate-pulse" />
            <span className="truncate">রক্ত / সহায়তা</span>
          </button>

          <button
            onClick={() => {
              handleOpenModal();
              setTimeout(() => fileInputRef.current?.click(), 100);
            }}
            className="flex items-center justify-center gap-1.5 py-2 px-1 rounded-xl hover:bg-emerald-50 dark:hover:bg-emerald-950/30 text-emerald-600 dark:text-emerald-400 transition-colors text-xs font-semibold"
          >
            <Image className="w-4 h-4 shrink-0 text-emerald-600" />
            <span className="truncate">ছবি / ভিডিও</span>
          </button>

          <button
            onClick={() => {
              setIsPollOpen(true);
              handleOpenModal();
            }}
            className="flex items-center justify-center gap-1.5 py-2 px-1 rounded-xl hover:bg-amber-50 dark:hover:bg-amber-950/30 text-amber-600 dark:text-amber-400 transition-colors text-xs font-semibold"
          >
            <BarChart2 className="w-4 h-4 shrink-0 text-amber-600" />
            <span className="truncate">পোল / মতামত</span>
          </button>
        </div>
      </div>

      {/* FULL POST CREATION MODAL */}
      {(isModalOpen || isOpenModalDirectly) && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 animate-in fade-in">
          <div className="w-full max-w-xl bg-white dark:bg-[#242526] rounded-3xl shadow-2xl border border-slate-200 dark:border-zinc-700 overflow-hidden flex flex-col max-h-[90vh]">
            
            {/* Modal Header */}
            <div className="px-5 py-4 border-b border-slate-100 dark:border-zinc-800 flex items-center justify-between">
              <h3 className="font-bold text-base text-slate-900 dark:text-white flex items-center gap-2">
                <span>পোস্ট তৈরি করুন</span>
                {isEmergency && (
                  <span className="text-xs bg-rose-600 text-white px-2 py-0.5 rounded-full font-bold">
                    জরুরি মানবসেবা
                  </span>
                )}
              </h3>
              <button
                onClick={handleClose}
                className="w-8 h-8 rounded-full bg-slate-100 dark:bg-zinc-700 hover:bg-slate-200 dark:hover:bg-zinc-600 flex items-center justify-center text-slate-600 dark:text-slate-300 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-5 space-y-4">
              
              {/* Author badge */}
              <div className="flex items-center gap-3">
                <img
                  src={currentUser.avatar}
                  alt={currentUser.name}
                  className="w-11 h-11 rounded-full object-cover"
                />
                <div>
                  <div className="flex items-center gap-1 font-bold text-sm text-slate-900 dark:text-white">
                    <span>{currentUser.banglaName || currentUser.name}</span>
                    {currentUser.isVerified && (
                      <CheckCircle2 className="w-3.5 h-3.5 text-blue-500 fill-blue-500" />
                    )}
                    {feeling && (
                      <span className="text-xs font-normal text-slate-500 dark:text-slate-400">
                        অনুভূতি: {feeling}
                      </span>
                    )}
                  </div>
                  <span className="text-xs text-rose-600 dark:text-rose-400 font-medium">
                    🌐 সবার জন্য উন্মুক্ত (Public)
                  </span>
                </div>
              </div>

              {/* Main Textarea */}
              <textarea
                placeholder={`${currentUser.banglaName || currentUser.name}, আপনার মনের কথা লিখুন...`}
                value={content}
                onChange={e => setContent(e.target.value)}
                rows={4}
                className="w-full bg-transparent text-slate-900 dark:text-white placeholder-slate-400 border-none focus:outline-none text-base resize-none"
                autoFocus
              />

              {/* Emergency Assistance Form Box */}
              {isEmergency && (
                <div className="p-4 rounded-2xl bg-rose-50/80 dark:bg-rose-950/20 border border-rose-200 dark:border-rose-900/60 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-rose-800 dark:text-rose-300 flex items-center gap-1.5">
                      <HeartHandshake className="w-4 h-4 text-rose-600" />
                      জরুরি মানবিক তথ্য পূরণ করুন
                    </span>
                    <button
                      type="button"
                      onClick={() => setIsEmergency(false)}
                      className="text-xs text-rose-600 hover:underline"
                    >
                      বাতিল
                    </button>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div>
                      <label className="block text-slate-600 dark:text-slate-300 font-semibold mb-1">ক্যাটাগরি</label>
                      <select
                        value={emergencyCategory}
                        onChange={e => setEmergencyCategory(e.target.value as any)}
                        className="w-full p-2 rounded-xl bg-white dark:bg-zinc-800 border border-rose-200 dark:border-zinc-700 text-slate-800 dark:text-slate-100"
                      >
                        <option value="blood">🩸 রক্তের প্রয়োজন</option>
                        <option value="medical">🩺 চিকিৎসা ও ওষুধ সহায়তা</option>
                        <option value="relief">📦 ত্রাণ ও শীতবস্ত্র বিতরণ</option>
                        <option value="education">📚 শিক্ষা সহায়তা</option>
                      </select>
                    </div>

                    {emergencyCategory === 'blood' && (
                      <div>
                        <label className="block text-slate-600 dark:text-slate-300 font-semibold mb-1">রক্তের গ্রুপ</label>
                        <select
                          value={bloodGroup}
                          onChange={e => setBloodGroup(e.target.value)}
                          className="w-full p-2 rounded-xl bg-white dark:bg-zinc-800 border border-rose-200 dark:border-zinc-700 text-slate-800 dark:text-slate-100 font-bold text-rose-600"
                        >
                          <option value="A+">A পজিটিভ (A+)</option>
                          <option value="A-">A নেগেটিভ (A-)</option>
                          <option value="B+">B পজিটিভ (B+)</option>
                          <option value="B-">B নেগেটিভ (B-)</option>
                          <option value="O+">O পজিটিভ (O+)</option>
                          <option value="O-">O নেগেটিভ (O-)</option>
                          <option value="AB+">AB পজিটিভ (AB+)</option>
                          <option value="AB-">AB নেগেটিভ (AB-)</option>
                        </select>
                      </div>
                    )}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                    <div>
                      <label className="block text-slate-600 dark:text-slate-300 font-semibold mb-1">হাসপাতাল বা স্থান</label>
                      <input
                        type="text"
                        placeholder="যেমন: ঢাকা মেডিকেল কলেজ, ওয়ার্ড ৮"
                        value={hospitalLocation}
                        onChange={e => setHospitalLocation(e.target.value)}
                        className="w-full p-2 rounded-xl bg-white dark:bg-zinc-800 border border-rose-200 dark:border-zinc-700 text-slate-800 dark:text-slate-100"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-600 dark:text-slate-300 font-semibold mb-1">যোগাযোগ নম্বর (হেল্পলাইন)</label>
                      <input
                        type="tel"
                        placeholder="01825986764"
                        value={contactNumber}
                        onChange={e => setContactNumber(e.target.value)}
                        className="w-full p-2 rounded-xl bg-white dark:bg-zinc-800 border border-rose-200 dark:border-zinc-700 text-slate-800 dark:text-slate-100 font-bold"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Poll Builder Box */}
              {isPollOpen && (
                <div className="p-4 rounded-2xl bg-amber-50/70 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900/60 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-amber-800 dark:text-amber-300 flex items-center gap-1.5">
                      <BarChart2 className="w-4 h-4 text-amber-600" />
                      জনমত জরিপ / পোল
                    </span>
                    <button
                      type="button"
                      onClick={() => setIsPollOpen(false)}
                      className="text-xs text-amber-600 hover:underline"
                    >
                      বাতিল
                    </button>
                  </div>

                  <input
                    type="text"
                    placeholder="আপনার প্রশ্ন লিখুন..."
                    value={pollQuestion}
                    onChange={e => setPollQuestion(e.target.value)}
                    className="w-full p-2 rounded-xl bg-white dark:bg-zinc-800 border border-amber-200 dark:border-zinc-700 text-xs sm:text-sm text-slate-800 dark:text-slate-100"
                  />

                  <div className="space-y-2">
                    {pollOptions.map((opt, idx) => (
                      <input
                        key={idx}
                        type="text"
                        placeholder={`বিকল্প ${idx + 1}`}
                        value={opt}
                        onChange={e => {
                          const newOpts = [...pollOptions];
                          newOpts[idx] = e.target.value;
                          setPollOptions(newOpts);
                        }}
                        className="w-full p-2 rounded-xl bg-white dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 text-xs text-slate-800 dark:text-slate-100"
                      />
                    ))}

                    {pollOptions.length < 4 && (
                      <button
                        type="button"
                        onClick={() => setPollOptions([...pollOptions, ''])}
                        className="text-xs text-amber-600 hover:underline flex items-center gap-1 font-semibold"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        <span>আরেকটি বিকল্প যোগ করুন</span>
                      </button>
                    )}
                  </div>
                </div>
              )}

              {/* Uploaded Images Preview */}
              {selectedImages.length > 0 && (
                <div className="grid grid-cols-2 gap-2 relative">
                  {selectedImages.map((img, i) => (
                    <div key={i} className="relative rounded-2xl overflow-hidden h-40 bg-slate-100">
                      <img src={img} alt="Post asset" className="w-full h-full object-cover" />
                      <button
                        type="button"
                        onClick={() => setSelectedImages(selectedImages.filter((_, idx) => idx !== i))}
                        className="absolute top-2 right-2 w-7 h-7 rounded-full bg-black/60 text-white flex items-center justify-center hover:bg-black/80"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}

              {/* Hidden File Input */}
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                accept="image/*,video/*"
                className="hidden"
              />

              {/* Add to Post Toolbar */}
              <div className="p-3 rounded-2xl border border-slate-200 dark:border-zinc-700 flex items-center justify-between bg-slate-50 dark:bg-zinc-800/50">
                <span className="text-xs font-bold text-slate-700 dark:text-slate-300">
                  পোস্টে যুক্ত করুন
                </span>
                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    title="ছবি বা ভিডিও যোগ করুন"
                    className="w-8 h-8 rounded-full hover:bg-slate-200 dark:hover:bg-zinc-700 flex items-center justify-center text-emerald-600"
                  >
                    <Image className="w-5 h-5" />
                  </button>

                  <button
                    type="button"
                    onClick={() => setIsEmergency(!isEmergency)}
                    title="জরুরি রক্তদান বা মানবসেবা আবেদন"
                    className="w-8 h-8 rounded-full hover:bg-slate-200 dark:hover:bg-zinc-700 flex items-center justify-center text-rose-600"
                  >
                    <HeartHandshake className="w-5 h-5" />
                  </button>

                  <button
                    type="button"
                    onClick={() => setIsPollOpen(!isPollOpen)}
                    title="পোল বা মতামত জরিপ"
                    className="w-8 h-8 rounded-full hover:bg-slate-200 dark:hover:bg-zinc-700 flex items-center justify-center text-amber-600"
                  >
                    <BarChart2 className="w-5 h-5" />
                  </button>

                  <button
                    type="button"
                    onClick={() => setFeeling(feeling ? '' : 'মানবসেবায় নিবেদিত ❤️')}
                    title="অনুভূতি যোগ করুন"
                    className="w-8 h-8 rounded-full hover:bg-slate-200 dark:hover:bg-zinc-700 flex items-center justify-center text-yellow-500"
                  >
                    <Smile className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-sm shadow-md shadow-rose-600/30 transition-all active:scale-[0.99]"
              >
                পোস্ট প্রকাশ করুন
              </button>

            </form>
          </div>
        </div>
      )}
    </>
  );
};
