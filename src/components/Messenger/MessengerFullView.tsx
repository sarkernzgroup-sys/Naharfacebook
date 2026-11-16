import React, { useState, useRef, useEffect } from 'react';
import { 
  Phone, 
  Video, 
  Send, 
  Mic, 
  Image, 
  Search, 
  MoreVertical, 
  Check, 
  CheckCheck, 
  CheckCircle2,
  PhoneCall,
  Heart
} from 'lucide-react';
import { User, Conversation } from '../../types';
import { sounds } from '../../utils/soundEffects';

interface MessengerFullViewProps {
  conversations: Conversation[];
  currentUser: User;
  onSendMessage: (conversationId: string, text: string) => void;
  onStartCall: (participant: User, type: 'audio' | 'video') => void;
  onSelectUserToView: (user: User) => void;
  language: 'bn' | 'en';
}

export const MessengerFullView: React.FC<MessengerFullViewProps> = ({
  conversations,
  currentUser,
  onSendMessage,
  onStartCall,
  onSelectUserToView,
  language
}) => {
  const [selectedConvId, setSelectedConvId] = useState<string>(conversations[0]?.id || '');
  const [inputText, setInputText] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [recordSec, setRecordSec] = useState(0);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const activeConversation = conversations.find(c => c.id === selectedConvId) || conversations[0];

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [activeConversation?.messages]);

  useEffect(() => {
    let timer: number;
    if (isRecording) {
      timer = window.setInterval(() => setRecordSec(s => s + 1), 1000);
    } else {
      setRecordSec(0);
    }
    return () => clearInterval(timer);
  }, [isRecording]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim() || !activeConversation) return;
    onSendMessage(activeConversation.id, inputText.trim());
    sounds.playMessagePop();
    setInputText('');
  };

  const handleSendVoice = () => {
    if (!activeConversation) return;
    setIsRecording(false);
    onSendMessage(activeConversation.id, `🎙️ ভয়েস মেসেজ (${recordSec} সেকেন্ড)`);
    sounds.playMessagePop();
  };

  const filteredConversations = conversations.filter(c => 
    c.participant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.participant.banglaName.includes(searchQuery)
  );

  return (
    <div className="max-w-6xl mx-auto h-[calc(100vh-4.5rem)] bg-white dark:bg-[#242526] rounded-3xl border border-slate-200 dark:border-zinc-800 shadow-md overflow-hidden flex flex-col md:flex-row my-2">
      
      {/* LEFT COLUMN: CONVERSATION LIST */}
      <div className="w-full md:w-80 lg:w-96 border-r border-slate-200 dark:border-zinc-800 flex flex-col h-full bg-slate-50/50 dark:bg-zinc-900/30">
        
        {/* Header & Search */}
        <div className="p-4 border-b border-slate-200 dark:border-zinc-800 space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <span>{language === 'bn' ? 'মেসেঞ্জার' : 'Messenger'}</span>
              <span className="text-xs bg-rose-100 text-rose-700 dark:bg-rose-950/60 dark:text-rose-300 px-2 py-0.5 rounded-full font-bold">
                ফ্রি
              </span>
            </h2>
          </div>

          <div className="flex items-center bg-white dark:bg-[#3a3b3c] rounded-xl px-3 py-2 border border-slate-200 dark:border-zinc-700">
            <Search className="w-4 h-4 text-slate-400 mr-2 shrink-0" />
            <input
              type="text"
              placeholder={language === 'bn' ? 'বন্ধুদের খুঁজুন...' : 'Search chats...'}
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full bg-transparent text-xs text-slate-800 dark:text-white placeholder-slate-400 focus:outline-none"
            />
          </div>
        </div>

        {/* Conversation List */}
        <div className="flex-1 overflow-y-auto p-2 space-y-1">
          {filteredConversations.map(conv => {
            const isSelected = conv.id === activeConversation?.id;
            const lastMsg = conv.messages[conv.messages.length - 1];

            return (
              <button
                key={conv.id}
                onClick={() => setSelectedConvId(conv.id)}
                className={`w-full flex items-center gap-3 p-3 rounded-2xl transition-all text-left ${
                  isSelected 
                    ? 'bg-rose-50 dark:bg-rose-950/30 border border-rose-200/80 dark:border-rose-900/40 shadow-2xs' 
                    : 'hover:bg-slate-100 dark:hover:bg-[#3a3b3c]'
                }`}
              >
                <div className="relative shrink-0">
                  <img
                    src={conv.participant.avatar}
                    alt={conv.participant.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  {conv.isOnline && (
                    <span className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-emerald-500 rounded-full border-2 border-white dark:border-[#242526]" />
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <span className={`text-sm truncate font-bold ${isSelected ? 'text-rose-700 dark:text-rose-400' : 'text-slate-900 dark:text-white'}`}>
                      {conv.participant.banglaName || conv.participant.name}
                    </span>
                    <span className="text-[10px] text-slate-400 shrink-0">
                      {lastMsg?.timestamp || ''}
                    </span>
                  </div>

                  <p className={`text-xs truncate mt-0.5 ${conv.unreadCount > 0 ? 'font-bold text-slate-900 dark:text-white' : 'text-slate-500 dark:text-slate-400'}`}>
                    {lastMsg?.text || 'ছবি বা বার্তা'}
                  </p>
                </div>

                {conv.unreadCount > 0 && (
                  <span className="w-2.5 h-2.5 rounded-full bg-rose-600 shrink-0" />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* RIGHT COLUMN: ACTIVE CHAT SCREEN */}
      {activeConversation ? (
        <div className="flex-1 flex flex-col h-full bg-white dark:bg-[#242526]">
          
          {/* Active Chat Header */}
          <div className="p-3.5 px-5 border-b border-slate-200 dark:border-zinc-800 flex items-center justify-between shadow-2xs">
            <div 
              onClick={() => onSelectUserToView(activeConversation.participant)}
              className="flex items-center gap-3 cursor-pointer"
            >
              <div className="relative">
                <img
                  src={activeConversation.participant.avatar}
                  alt={activeConversation.participant.name}
                  className="w-10 h-10 rounded-full object-cover"
                />
                {activeConversation.isOnline && (
                  <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 rounded-full border-2 border-white dark:border-[#242526]" />
                )}
              </div>
              <div>
                <div className="flex items-center gap-1 font-bold text-sm sm:text-base text-slate-900 dark:text-white">
                  <span>{activeConversation.participant.banglaName || activeConversation.participant.name}</span>
                  {activeConversation.participant.isVerified && (
                    <CheckCircle2 className="w-4 h-4 text-blue-500 fill-blue-500" />
                  )}
                </div>
                <span className="text-xs text-slate-500 dark:text-slate-400 block">
                  {activeConversation.isOnline ? 'সক্রিয় আছেন (Active Now)' : 'সক্রিয় ছিলেন'}
                </span>
              </div>
            </div>

            {/* Audio & Video Call buttons */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => onStartCall(activeConversation.participant, 'audio')}
                className="w-10 h-10 rounded-full bg-rose-50 hover:bg-rose-100 dark:bg-rose-950/40 dark:hover:bg-rose-900/50 text-rose-600 dark:text-rose-400 flex items-center justify-center transition-colors"
                title="অডিও কল করুন"
              >
                <Phone className="w-5 h-5" />
              </button>

              <button
                onClick={() => onStartCall(activeConversation.participant, 'video')}
                className="w-10 h-10 rounded-full bg-rose-50 hover:bg-rose-100 dark:bg-rose-950/40 dark:hover:bg-rose-900/50 text-rose-600 dark:text-rose-400 flex items-center justify-center transition-colors"
                title="ভিডিও কল করুন"
              >
                <Video className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Messages Scroll Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-slate-50/50 dark:bg-zinc-900/30 text-xs sm:text-sm">
            
            <div className="text-center py-4">
              <img
                src={activeConversation.participant.avatar}
                alt="Avatar"
                className="w-16 h-16 rounded-full object-cover mx-auto ring-4 ring-rose-500/20"
              />
              <h3 className="font-bold text-slate-900 dark:text-white text-base mt-2">
                {activeConversation.participant.banglaName || activeConversation.participant.name}
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                {activeConversation.participant.bio}
              </p>
              <div className="mt-2 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-100 dark:bg-rose-950/50 text-rose-700 dark:text-rose-300 text-xs font-semibold">
                <Heart className="w-3.5 h-3.5 fill-rose-600" />
                <span>মানবতার বন্ধনে আমরা এক সাথে</span>
              </div>
            </div>

            {activeConversation.messages.map(msg => {
              const isMe = msg.senderId === currentUser.id || msg.senderId === 'current_user';

              return (
                <div
                  key={msg.id}
                  className={`flex items-end gap-2 ${isMe ? 'justify-end' : 'justify-start'}`}
                >
                  {!isMe && (
                    <img
                      src={activeConversation.participant.avatar}
                      alt="Avatar"
                      className="w-7 h-7 rounded-full object-cover shrink-0 mb-1"
                    />
                  )}

                  <div className={`max-w-[70%] rounded-2xl p-3 ${
                    isMe
                      ? 'bg-rose-600 text-white rounded-br-xs'
                      : 'bg-white dark:bg-[#3a3b3c] text-slate-900 dark:text-white rounded-bl-xs border border-slate-200 dark:border-zinc-700 shadow-2xs'
                  }`}>
                    <p className="leading-relaxed whitespace-pre-wrap">{msg.text}</p>
                    <div className={`flex items-center justify-end gap-1 text-[10px] mt-1 ${isMe ? 'text-white/70' : 'text-slate-400'}`}>
                      <span>{msg.timestamp}</span>
                      {isMe && (
                        <span>
                          {msg.isSeen ? <CheckCheck className="w-3.5 h-3.5 text-cyan-200" /> : <Check className="w-3.5 h-3.5 text-white/70" />}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}

            {activeConversation.isTyping && (
              <div className="flex items-center gap-2 text-slate-400 text-xs italic">
                <img src={activeConversation.participant.avatar} alt="Avatar" className="w-6 h-6 rounded-full object-cover" />
                <span>টাইপ করছেন...</span>
                <span className="w-2 h-2 rounded-full bg-rose-500 animate-bounce" />
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input Box */}
          <div className="p-3 bg-white dark:bg-[#242526] border-t border-slate-200 dark:border-zinc-800">
            {isRecording ? (
              <div className="flex items-center justify-between bg-rose-50 dark:bg-rose-950/40 p-3 rounded-2xl text-rose-600 text-sm">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-rose-600 animate-ping" />
                  <span>ভয়েস রেকর্ড হচ্ছে: {recordSec} সেকেন্ড</span>
                </div>
                <div className="flex items-center gap-2">
                  <button onClick={() => setIsRecording(false)} className="text-slate-500 text-xs hover:underline">
                    বাতিল
                  </button>
                  <button onClick={handleSendVoice} className="bg-rose-600 text-white px-4 py-1.5 rounded-xl font-bold text-xs">
                    পাঠান
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSend} className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setIsRecording(true)}
                  className="p-2 text-slate-500 hover:text-rose-600 rounded-full hover:bg-slate-100 dark:hover:bg-zinc-700"
                >
                  <Mic className="w-5 h-5" />
                </button>

                <input
                  type="text"
                  placeholder="একটি মানবিক বার্তা লিখুন..."
                  value={inputText}
                  onChange={e => setInputText(e.target.value)}
                  className="flex-1 bg-[#f0f2f5] dark:bg-[#3a3b3c] rounded-full px-4 py-2.5 text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none"
                />

                <button
                  type="submit"
                  disabled={!inputText.trim()}
                  className="p-2.5 rounded-full bg-rose-600 hover:bg-rose-700 text-white disabled:opacity-40 transition-colors"
                >
                  <Send className="w-5 h-5" />
                </button>
              </form>
            )}
          </div>

        </div>
      ) : (
        <div className="flex-1 flex items-center justify-center text-slate-400">
          একটি চ্যাট নির্বাচন করুন
        </div>
      )}

    </div>
  );
};
