import React, { useState, useEffect, useRef } from 'react';
import { 
  X, 
  Minus, 
  Maximize2, 
  Phone, 
  Video, 
  Send, 
  Image, 
  Smile, 
  Mic, 
  Check, 
  CheckCheck,
  Heart
} from 'lucide-react';
import { User, Conversation, ChatMessage } from '../../types';
import { sounds } from '../../utils/soundEffects';

interface ChatWindowProps {
  conversation: Conversation;
  currentUser: User;
  onSendMessage: (conversationId: string, text: string) => void;
  onClose: () => void;
  onStartCall: (participant: User, type: 'audio' | 'video') => void;
  onSelectUserToView: (user: User) => void;
}

export const ChatWindow: React.FC<ChatWindowProps> = ({
  conversation,
  currentUser,
  onSendMessage,
  onClose,
  onStartCall,
  onSelectUserToView
}) => {
  const [isMinimized, setIsMinimized] = useState(false);
  const [inputText, setInputText] = useState('');
  const [isRecordingVoice, setIsRecordingVoice] = useState(false);
  const [voiceSeconds, setVoiceSeconds] = useState(0);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const participant = conversation.participant;

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [conversation.messages, isMinimized]);

  // Voice recording timer simulation
  useEffect(() => {
    let timer: number;
    if (isRecordingVoice) {
      timer = window.setInterval(() => {
        setVoiceSeconds(s => s + 1);
      }, 1000);
    } else {
      setVoiceSeconds(0);
    }
    return () => clearInterval(timer);
  }, [isRecordingVoice]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;
    onSendMessage(conversation.id, inputText.trim());
    sounds.playMessagePop();
    setInputText('');
  };

  const handleSendVoice = () => {
    setIsRecordingVoice(false);
    onSendMessage(conversation.id, `🎙️ ভয়েস মেসেজ (${voiceSeconds} সেকেন্ড)`);
    sounds.playMessagePop();
  };

  const quickEmojis = ['❤️', '👍', '🩸', '🙏', '🌸'];

  if (isMinimized) {
    return (
      <div 
        onClick={() => setIsMinimized(false)}
        className="w-64 bg-white dark:bg-[#242526] rounded-t-2xl shadow-xl border border-slate-200 dark:border-zinc-700 p-2.5 flex items-center justify-between cursor-pointer hover:bg-slate-50 dark:hover:bg-zinc-800 transition-colors"
      >
        <div className="flex items-center gap-2 min-w-0">
          <div className="relative shrink-0">
            <img src={participant.avatar} alt={participant.name} className="w-7 h-7 rounded-full object-cover" />
            {conversation.isOnline && <span className="absolute bottom-0 right-0 w-2 h-2 bg-emerald-500 rounded-full" />}
          </div>
          <span className="font-bold text-xs text-slate-800 dark:text-white truncate">
            {participant.banglaName || participant.name}
          </span>
        </div>
        <button 
          onClick={(e) => { e.stopPropagation(); onClose(); }} 
          className="text-slate-400 hover:text-slate-600 dark:hover:text-white"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    );
  }

  return (
    <div className="w-80 sm:w-84 h-[440px] bg-white dark:bg-[#242526] rounded-t-2xl shadow-2xl border border-slate-200 dark:border-zinc-700 flex flex-col overflow-hidden animate-in slide-in-from-bottom-2">
      
      {/* CHAT HEADER */}
      <div className="p-2.5 px-3 bg-white dark:bg-[#242526] border-b border-slate-200 dark:border-zinc-700 flex items-center justify-between shadow-2xs">
        <div 
          onClick={() => onSelectUserToView(participant)}
          className="flex items-center gap-2 cursor-pointer min-w-0"
        >
          <div className="relative shrink-0">
            <img src={participant.avatar} alt={participant.name} className="w-8 h-8 rounded-full object-cover" />
            {conversation.isOnline && (
              <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 rounded-full border-2 border-white dark:border-[#242526]" />
            )}
          </div>
          <div className="min-w-0">
            <span className="font-bold text-xs text-slate-900 dark:text-white block truncate hover:underline">
              {participant.banglaName || participant.name}
            </span>
            <span className="text-[10px] text-slate-500 dark:text-slate-400 block truncate">
              {conversation.isOnline ? 'এখন সক্রিয়' : conversation.lastActive || 'সক্রিয় ছিলেন'}
            </span>
          </div>
        </div>

        {/* Call Triggers & Window Controls */}
        <div className="flex items-center gap-0.5 text-rose-600 dark:text-rose-400">
          <button
            onClick={() => onStartCall(participant, 'audio')}
            title="অডিও কল করুন"
            className="w-7 h-7 rounded-full hover:bg-slate-100 dark:hover:bg-zinc-700 flex items-center justify-center transition-colors"
          >
            <Phone className="w-4 h-4" />
          </button>

          <button
            onClick={() => onStartCall(participant, 'video')}
            title="ভিডিও কল করুন"
            className="w-7 h-7 rounded-full hover:bg-slate-100 dark:hover:bg-zinc-700 flex items-center justify-center transition-colors"
          >
            <Video className="w-4 h-4" />
          </button>

          <button
            onClick={() => setIsMinimized(true)}
            title="মিনিমাইজ"
            className="w-7 h-7 rounded-full hover:bg-slate-100 dark:hover:bg-zinc-700 flex items-center justify-center text-slate-500 dark:text-slate-400 transition-colors"
          >
            <Minus className="w-4 h-4" />
          </button>

          <button
            onClick={onClose}
            title="বন্ধ করুন"
            className="w-7 h-7 rounded-full hover:bg-slate-100 dark:hover:bg-zinc-700 flex items-center justify-center text-slate-500 dark:text-slate-400 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* MESSAGES SCROLL AREA */}
      <div className="flex-1 overflow-y-auto p-3 space-y-2.5 bg-slate-50/50 dark:bg-zinc-900/30 text-xs">
        
        {/* Intro greeting bubble */}
        <div className="text-center py-2 text-slate-400 text-[11px]">
          <p className="font-semibold text-slate-600 dark:text-slate-300">
            {participant.banglaName || participant.name}
          </p>
          <p>মানবতার ফেরিওয়ালা এনক্রিপ্টেড চ্যাট</p>
        </div>

        {conversation.messages.map((msg) => {
          const isMe = msg.senderId === currentUser.id || msg.senderId === 'current_user';

          return (
            <div
              key={msg.id}
              className={`flex items-end gap-1.5 ${isMe ? 'justify-end' : 'justify-start'}`}
            >
              {!isMe && (
                <img
                  src={participant.avatar}
                  alt={participant.name}
                  className="w-6 h-6 rounded-full object-cover shrink-0 mb-1"
                />
              )}

              <div className={`max-w-[78%] rounded-2xl p-2.5 ${
                isMe
                  ? 'bg-rose-600 text-white rounded-br-xs'
                  : 'bg-white dark:bg-[#3a3b3c] text-slate-900 dark:text-white rounded-bl-xs border border-slate-200/80 dark:border-zinc-700 shadow-2xs'
              }`}>
                <p className="leading-relaxed whitespace-pre-wrap">{msg.text}</p>
                <div className={`flex items-center justify-end gap-1 text-[9px] mt-1 ${isMe ? 'text-white/75' : 'text-slate-400'}`}>
                  <span>{msg.timestamp}</span>
                  {isMe && (
                    <span>
                      {msg.isSeen ? <CheckCheck className="w-3 h-3 text-cyan-200" /> : <Check className="w-3 h-3 text-white/70" />}
                    </span>
                  )}
                </div>
              </div>
            </div>
          );
        })}

        {/* Simulated typing indicator */}
        {conversation.isTyping && (
          <div className="flex items-center gap-1.5 text-slate-400 text-[11px] italic">
            <img src={participant.avatar} alt="avatar" className="w-5 h-5 rounded-full object-cover" />
            <span>লিখছেন...</span>
            <span className="w-1.5 h-1.5 bg-rose-500 rounded-full animate-bounce" />
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* QUICK EMOJI STRIP */}
      <div className="px-3 py-1 bg-white dark:bg-[#242526] border-t border-slate-100 dark:border-zinc-800 flex items-center justify-between text-sm">
        <div className="flex items-center gap-1">
          {quickEmojis.map(emoji => (
            <button
              key={emoji}
              onClick={() => onSendMessage(conversation.id, emoji)}
              className="hover:scale-125 transition-transform p-1 text-sm"
            >
              {emoji}
            </button>
          ))}
        </div>
        <span className="text-[10px] text-slate-400">হেল্পলাইন: 01825986764</span>
      </div>

      {/* INPUT AREA */}
      <div className="p-2.5 bg-white dark:bg-[#242526] border-t border-slate-200 dark:border-zinc-700">
        {isRecordingVoice ? (
          <div className="flex items-center justify-between bg-rose-50 dark:bg-rose-950/40 p-2 rounded-xl text-rose-600 dark:text-rose-400 text-xs">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-600 animate-ping" />
              <span>রেকর্ড হচ্ছে: {voiceSeconds} সে...</span>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsRecordingVoice(false)}
                className="text-slate-500 hover:text-slate-700 text-xs"
              >
                বাতিল
              </button>
              <button
                onClick={handleSendVoice}
                className="bg-rose-600 text-white px-2.5 py-1 rounded-lg text-xs font-bold"
              >
                পাঠান
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSend} className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={() => setIsRecordingVoice(true)}
              title="ভয়েস রেকর্ড করুন"
              className="text-slate-500 hover:text-rose-600 p-1 rounded-full hover:bg-slate-100 dark:hover:bg-zinc-700"
            >
              <Mic className="w-4 h-4" />
            </button>

            <input
              type="text"
              placeholder="একটি বার্তা লিখুন..."
              value={inputText}
              onChange={e => setInputText(e.target.value)}
              className="flex-1 bg-[#f0f2f5] dark:bg-[#3a3b3c] rounded-full px-3 py-1.5 text-xs text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none"
            />

            <button
              type="submit"
              disabled={!inputText.trim()}
              className="text-rose-600 hover:text-rose-700 disabled:opacity-40 p-1.5"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        )}
      </div>

    </div>
  );
};
