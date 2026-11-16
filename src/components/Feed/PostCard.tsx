import React, { useState } from 'react';
import { 
  ThumbsUp, 
  Heart, 
  MessageCircle, 
  Share2, 
  MoreHorizontal, 
  CheckCircle2, 
  PhoneCall, 
  MapPin, 
  Send, 
  Bookmark, 
  Flag, 
  Check, 
  Copy,
  AlertCircle
} from 'lucide-react';
import { Post, User, ReactionType, Comment } from '../../types';
import { sounds } from '../../utils/soundEffects';

interface PostCardProps {
  post: Post;
  currentUser: User;
  onReaction: (postId: string, reaction: ReactionType) => void;
  onAddComment: (postId: string, commentText: string) => void;
  onVotePoll?: (postId: string, optionId: string) => void;
  onSelectUserToView: (user: User) => void;
  onOpenChatWithUser?: (user: User) => void;
}

const REACTIONS: { type: ReactionType; label: string; icon: string; color: string }[] = [
  { type: 'like', label: 'লাইক', icon: '👍', color: 'text-blue-600' },
  { type: 'love', label: 'ভালোবাসা', icon: '❤️', color: 'text-rose-600' },
  { type: 'care', label: 'কেয়ার', icon: '🥰', color: 'text-amber-500' },
  { type: 'haha', label: 'হাহা', icon: '😆', color: 'text-yellow-500' },
  { type: 'wow', label: 'ওয়াও', icon: '😮', color: 'text-yellow-500' },
  { type: 'sad', label: 'স্যাড', icon: '😢', color: 'text-yellow-600' },
  { type: 'angry', label: 'অ্যাংরি', icon: '😡', color: 'text-orange-600' },
];

export const PostCard: React.FC<PostCardProps> = ({
  post,
  currentUser,
  onReaction,
  onAddComment,
  onVotePoll,
  onSelectUserToView,
  onOpenChatWithUser
}) => {
  const [showReactionPicker, setShowReactionPicker] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [commentInput, setCommentInput] = useState('');
  const [showShareModal, setShowShareModal] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);

  const totalReactionsCount = Object.values(post.reactions).reduce((a, b) => a + b, 0);

  const handleReact = (type: ReactionType) => {
    sounds.playReactionPop();
    onReaction(post.id, type);
    setShowReactionPicker(false);
  };

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentInput.trim()) return;
    onAddComment(post.id, commentInput.trim());
    sounds.playMessagePop();
    setCommentInput('');
    setShowComments(true);
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  // Find active reaction config
  const currentReactionConfig = REACTIONS.find(r => r.type === post.userReaction);

  return (
    <article className="bg-white dark:bg-[#242526] rounded-2xl border border-slate-200 dark:border-zinc-800 shadow-xs overflow-hidden transition-colors">
      
      {/* CARD HEADER */}
      <div className="p-3.5 sm:p-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img
            src={post.author.avatar}
            alt={post.author.name}
            onClick={() => onSelectUserToView(post.author)}
            className="w-10 h-10 rounded-full object-cover cursor-pointer ring-2 ring-rose-500/20 hover:ring-rose-500 transition-all"
          />
          <div>
            <div className="flex items-center gap-1.5 flex-wrap">
              <span
                onClick={() => onSelectUserToView(post.author)}
                className="font-bold text-sm text-slate-900 dark:text-white hover:underline cursor-pointer"
              >
                {post.author.banglaName || post.author.name}
              </span>
              {post.author.isVerified && (
                <CheckCircle2 className="w-4 h-4 text-blue-500 fill-blue-500 shrink-0" />
              )}
              {post.author.role === 'founder' && (
                <span className="text-[10px] bg-rose-100 text-rose-700 dark:bg-rose-950/60 dark:text-rose-300 px-1.5 py-0.2 rounded-full font-bold">
                  প্রতিষ্ঠাতা
                </span>
              )}
            </div>
            <div className="flex items-center gap-1 text-[11px] text-slate-500 dark:text-slate-400">
              <span>{post.timestamp}</span>
              <span>·</span>
              <span>🌐 সবার জন্য উন্মুক্ত</span>
            </div>
          </div>
        </div>

        {/* Options button */}
        <div className="relative group">
          <button
            onClick={() => setIsSaved(!isSaved)}
            title={isSaved ? 'সংরক্ষিত পোস্ট' : 'পোস্ট সংরক্ষণ করুন'}
            className="w-8 h-8 rounded-full hover:bg-slate-100 dark:hover:bg-zinc-700 flex items-center justify-center text-slate-500 dark:text-slate-400 transition-colors"
          >
            <Bookmark className={`w-4 h-4 ${isSaved ? 'fill-rose-600 text-rose-600' : ''}`} />
          </button>
        </div>
      </div>

      {/* EMERGENCY HUMANITARIAN HIGHLIGHT BANNER */}
      {post.isHumanityEmergency && post.emergencyDetails && (
        <div className="mx-3.5 sm:mx-4 mb-3 p-3.5 rounded-2xl bg-gradient-to-r from-red-600 to-rose-700 text-white shadow-md shadow-rose-600/20">
          <div className="flex items-start justify-between gap-2">
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded-md bg-white text-red-700 text-[11px] font-black uppercase tracking-wider animate-pulse">
                জরুরি আবেদন
              </span>
              {post.emergencyDetails.bloodGroup && (
                <span className="text-base font-black bg-black/30 px-2.5 py-0.5 rounded-lg border border-white/20">
                  গ্রুপ: {post.emergencyDetails.bloodGroup}
                </span>
              )}
            </div>

            <a
              href={`tel:${post.emergencyDetails.contactNumber || '01825986764'}`}
              className="px-3 py-1.5 rounded-xl bg-white text-rose-700 hover:bg-rose-50 text-xs font-bold flex items-center gap-1.5 shadow-sm active:scale-95 transition-all"
            >
              <PhoneCall className="w-3.5 h-3.5 animate-bounce" />
              <span>সরাসরি কল দিন</span>
            </a>
          </div>

          <div className="mt-2.5 space-y-1 text-xs">
            <div className="flex items-center gap-1.5 font-semibold">
              <MapPin className="w-3.5 h-3.5 shrink-0 opacity-80" />
              <span className="truncate">{post.emergencyDetails.location}</span>
            </div>
            {post.emergencyDetails.patientInfo && (
              <p className="text-white/90 text-[11px] line-clamp-2">
                রোগীর বিবরণ: {post.emergencyDetails.patientInfo}
              </p>
            )}
            <div className="text-[11px] text-rose-100 flex items-center justify-between pt-1 border-t border-white/20">
              <span>জরুরি হটলাইন: <b>{post.emergencyDetails.contactNumber || '01825986764'}</b></span>
              <span className="underline">মানবতার ফেরিওয়ালা জরুরি সেবা</span>
            </div>
          </div>
        </div>
      )}

      {/* POST CONTENT TEXT */}
      <div className="px-3.5 sm:px-4 pb-3">
        <p className="text-sm sm:text-[15px] text-slate-800 dark:text-slate-100 leading-relaxed whitespace-pre-line">
          {post.content}
        </p>

        {/* Tags */}
        {post.tags && post.tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mt-2.5">
            {post.tags.map((tag, idx) => (
              <span
                key={idx}
                className="text-xs font-medium text-blue-600 dark:text-blue-400 hover:underline cursor-pointer"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* POLL VOTING BLOCK */}
      {post.poll && (
        <div className="mx-3.5 sm:mx-4 mb-3 p-3.5 rounded-2xl bg-slate-50 dark:bg-zinc-800/60 border border-slate-200 dark:border-zinc-700 space-y-2.5">
          <h4 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white">
            📊 {post.poll.question}
          </h4>

          <div className="space-y-2">
            {post.poll.options.map((opt) => {
              const isSelected = post.poll?.userVoteId === opt.id;
              const percent = post.poll?.totalVotes 
                ? Math.round((opt.votes / post.poll.totalVotes) * 100) 
                : 0;

              return (
                <div
                  key={opt.id}
                  onClick={() => onVotePoll && onVotePoll(post.id, opt.id)}
                  className={`p-2.5 rounded-xl border relative overflow-hidden cursor-pointer transition-all ${
                    isSelected 
                      ? 'border-rose-500 bg-rose-50/50 dark:bg-rose-950/20' 
                      : 'border-slate-200 dark:border-zinc-700 hover:bg-slate-100 dark:hover:bg-zinc-700/50'
                  }`}
                >
                  {/* Percentage fill bar */}
                  <div
                    className="absolute inset-y-0 left-0 bg-rose-500/15 dark:bg-rose-500/20 transition-all duration-500"
                    style={{ width: `${percent}%` }}
                  />
                  <div className="relative z-10 flex items-center justify-between text-xs">
                    <span className="font-semibold text-slate-800 dark:text-slate-200">
                      {opt.text}
                    </span>
                    <span className="font-bold text-slate-600 dark:text-slate-300 ml-2">
                      {percent}% ({opt.votes})
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="text-[11px] text-slate-500 dark:text-slate-400 flex justify-between">
            <span>মোট ভোট: {post.poll.totalVotes}</span>
            <span>১টি নির্বাচন করুন</span>
          </div>
        </div>
      )}

      {/* POST MEDIA / IMAGES */}
      {post.images && post.images.length > 0 && (
        <div className={`mt-1 overflow-hidden bg-black/5 ${
          post.images.length === 1 ? 'max-h-[500px]' : 'grid grid-cols-2 gap-1 max-h-[440px]'
        }`}>
          {post.images.map((img, i) => (
            <div
              key={i}
              onClick={() => setLightboxImage(img)}
              className="relative overflow-hidden cursor-pointer group"
            >
              <img
                src={img}
                alt="Post content"
                className="w-full h-full object-cover max-h-[500px] group-hover:scale-102 transition-transform duration-300"
              />
            </div>
          ))}
        </div>
      )}

      {/* METRICS ROW (Reaction count & Comments count) */}
      <div className="px-3.5 sm:px-4 py-2 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 border-b border-slate-100 dark:border-zinc-800">
        <div className="flex items-center gap-1.5 cursor-pointer">
          <div className="flex -space-x-1">
            <span className="w-5 h-5 rounded-full bg-rose-500 text-white flex items-center justify-center text-[10px] ring-2 ring-white dark:ring-[#242526]">
              ❤️
            </span>
            <span className="w-5 h-5 rounded-full bg-blue-500 text-white flex items-center justify-center text-[10px] ring-2 ring-white dark:ring-[#242526]">
              👍
            </span>
            <span className="w-5 h-5 rounded-full bg-amber-500 text-white flex items-center justify-center text-[10px] ring-2 ring-white dark:ring-[#242526]">
              🥰
            </span>
          </div>
          <span className="hover:underline font-medium">
            {totalReactionsCount > 0 ? totalReactionsCount.toLocaleString() : '১'}
          </span>
        </div>

        <div className="flex items-center gap-3">
          <span 
            onClick={() => setShowComments(!showComments)}
            className="hover:underline cursor-pointer"
          >
            {post.commentsCount || post.comments.length} টি মন্তব্য
          </span>
          <span>·</span>
          <span 
            onClick={() => setShowShareModal(true)}
            className="hover:underline cursor-pointer"
          >
            {post.sharesCount} টি শেয়ার
          </span>
        </div>
      </div>

      {/* ACTIONS BAR (Like with Popover, Comment, Share) */}
      <div className="px-2 py-1 flex items-center justify-between relative border-b border-slate-100 dark:border-zinc-800">
        
        {/* Reaction Button & Floating Reaction Bar */}
        <div 
          className="relative flex-1"
          onMouseEnter={() => setShowReactionPicker(true)}
          onMouseLeave={() => setShowReactionPicker(false)}
        >
          {/* Reaction Picker Bar (Facebook Style) */}
          {showReactionPicker && (
            <div className="absolute -top-12 left-0 z-30 bg-white dark:bg-[#3a3b3c] rounded-full p-1.5 shadow-2xl border border-slate-200 dark:border-zinc-700 flex items-center gap-1.5 animate-reaction-pop">
              {REACTIONS.map((r) => (
                <button
                  key={r.type}
                  onClick={() => handleReact(r.type)}
                  title={r.label}
                  className="w-9 h-9 rounded-full flex items-center justify-center text-xl hover:scale-130 transition-transform active:scale-95 duration-150"
                >
                  {r.icon}
                </button>
              ))}
            </div>
          )}

          <button
            onClick={() => handleReact(post.userReaction ? 'like' : 'love')}
            className={`w-full py-2 rounded-xl flex items-center justify-center gap-2 hover:bg-slate-100 dark:hover:bg-[#3a3b3c] text-xs sm:text-sm font-semibold transition-colors ${
              currentReactionConfig ? currentReactionConfig.color : 'text-slate-600 dark:text-slate-300'
            }`}
          >
            {currentReactionConfig ? (
              <>
                <span className="text-base">{currentReactionConfig.icon}</span>
                <span>{currentReactionConfig.label}</span>
              </>
            ) : (
              <>
                <ThumbsUp className="w-4 h-4" />
                <span>লাইক</span>
              </>
            )}
          </button>
        </div>

        {/* Comment Trigger */}
        <button
          onClick={() => setShowComments(!showComments)}
          className="flex-1 py-2 rounded-xl flex items-center justify-center gap-2 hover:bg-slate-100 dark:hover:bg-[#3a3b3c] text-slate-600 dark:text-slate-300 text-xs sm:text-sm font-semibold transition-colors"
        >
          <MessageCircle className="w-4 h-4" />
          <span>মন্তব্য</span>
        </button>

        {/* Share Trigger */}
        <button
          onClick={() => setShowShareModal(true)}
          className="flex-1 py-2 rounded-xl flex items-center justify-center gap-2 hover:bg-slate-100 dark:hover:bg-[#3a3b3c] text-slate-600 dark:text-slate-300 text-xs sm:text-sm font-semibold transition-colors"
        >
          <Share2 className="w-4 h-4" />
          <span>শেয়ার</span>
        </button>
      </div>

      {/* COMMENTS SECTION */}
      {showComments && (
        <div className="p-3.5 sm:p-4 bg-slate-50/60 dark:bg-zinc-900/40 space-y-3">
          
          {/* Comment input box */}
          <form onSubmit={handleCommentSubmit} className="flex items-center gap-2">
            <img
              src={currentUser.avatar}
              alt={currentUser.name}
              className="w-8 h-8 rounded-full object-cover shrink-0"
            />
            <div className="flex-1 flex items-center bg-white dark:bg-[#242526] rounded-full px-3 py-1.5 border border-slate-200 dark:border-zinc-700">
              <input
                type="text"
                placeholder="একটি মানবিক মন্তব্য লিখুন..."
                value={commentInput}
                onChange={e => setCommentInput(e.target.value)}
                className="w-full bg-transparent text-xs sm:text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none"
              />
              <button
                type="submit"
                disabled={!commentInput.trim()}
                className="text-rose-600 hover:text-rose-700 disabled:opacity-40 p-1"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </form>

          {/* Comment list */}
          <div className="space-y-3 pt-1">
            {post.comments.map((comment) => (
              <div key={comment.id} className="flex items-start gap-2.5">
                <img
                  src={comment.author.avatar}
                  alt={comment.author.name}
                  onClick={() => onSelectUserToView(comment.author)}
                  className="w-8 h-8 rounded-full object-cover shrink-0 cursor-pointer"
                />
                <div className="flex-1">
                  <div className="inline-block bg-white dark:bg-[#242526] p-2.5 rounded-2xl border border-slate-200/80 dark:border-zinc-700 shadow-2xs">
                    <div className="flex items-center gap-1">
                      <span 
                        onClick={() => onSelectUserToView(comment.author)}
                        className="font-bold text-xs text-slate-900 dark:text-white hover:underline cursor-pointer"
                      >
                        {comment.author.banglaName || comment.author.name}
                      </span>
                      {comment.author.isVerified && (
                        <CheckCircle2 className="w-3 h-3 text-blue-500 fill-blue-500" />
                      )}
                    </div>
                    <p className="text-xs text-slate-700 dark:text-slate-200 mt-0.5">
                      {comment.text}
                    </p>
                  </div>

                  <div className="flex items-center gap-3 text-[10px] text-slate-500 dark:text-slate-400 mt-1 pl-2">
                    <span>{comment.timestamp}</span>
                    <button className="hover:underline font-semibold">লাইক ({comment.likes})</button>
                    <button 
                      onClick={() => setCommentInput(`@${comment.author.banglaName || comment.author.name} `)}
                      className="hover:underline font-semibold"
                    >
                      উত্তর
                    </button>
                  </div>

                  {/* Replies if any */}
                  {comment.replies && comment.replies.length > 0 && (
                    <div className="pl-4 mt-2 space-y-2 border-l-2 border-slate-200 dark:border-zinc-700">
                      {comment.replies.map((reply) => (
                        <div key={reply.id} className="flex items-start gap-2">
                          <img
                            src={reply.author.avatar}
                            alt={reply.author.name}
                            className="w-6 h-6 rounded-full object-cover shrink-0"
                          />
                          <div className="inline-block bg-white dark:bg-[#242526] p-2 rounded-xl text-xs">
                            <span className="font-bold text-slate-900 dark:text-white block">
                              {reply.author.banglaName || reply.author.name}
                            </span>
                            <span className="text-slate-700 dark:text-slate-200">
                              {reply.text}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

        </div>
      )}

      {/* SHARE MODAL */}
      {showShareModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="w-full max-w-sm bg-white dark:bg-[#242526] rounded-3xl p-5 shadow-2xl border border-slate-200 dark:border-zinc-700 space-y-4 animate-in fade-in">
            <h3 className="font-bold text-base text-slate-900 dark:text-white">
              পোস্টটি শেয়ার করুন
            </h3>

            <div className="space-y-2 text-sm">
              <button
                onClick={() => {
                  alert('আপনার টাইমলাইনে সফলভাবে শেয়ার করা হয়েছে!');
                  setShowShareModal(false);
                }}
                className="w-full p-2.5 rounded-xl hover:bg-slate-100 dark:hover:bg-[#3a3b3c] flex items-center gap-3 text-left font-medium"
              >
                <div className="w-8 h-8 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center">
                  <Share2 className="w-4 h-4" />
                </div>
                <span>এখনই ফিডে শেয়ার করুন (Share to Feed)</span>
              </button>

              <button
                onClick={handleCopyLink}
                className="w-full p-2.5 rounded-xl hover:bg-slate-100 dark:hover:bg-[#3a3b3c] flex items-center gap-3 text-left font-medium"
              >
                <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center">
                  {copiedLink ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                </div>
                <span>{copiedLink ? 'লিঙ্ক কপি হয়েছে!' : 'পোস্ট লিঙ্ক কপি করুন'}</span>
              </button>

              <a
                href={`https://wa.me/?text=${encodeURIComponent(post.content.slice(0, 100) + '... মানবতার ফেরিওয়ালা প্ল্যাটফর্মে দেখুন। হেল্পলাইন: 01825986764')}`}
                target="_blank"
                rel="noreferrer"
                className="w-full p-2.5 rounded-xl hover:bg-slate-100 dark:hover:bg-[#3a3b3c] flex items-center gap-3 text-left font-medium block"
              >
                <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center">
                  <PhoneCall className="w-4 h-4" />
                </div>
                <span>হোয়াটসঅ্যাপে পাঠান (WhatsApp)</span>
              </a>
            </div>

            <button
              onClick={() => setShowShareModal(false)}
              className="w-full py-2.5 rounded-xl bg-slate-100 dark:bg-zinc-700 text-slate-700 dark:text-slate-200 text-xs font-bold"
            >
              বাতিল
            </button>
          </div>
        </div>
      )}

      {/* FULL MEDIA LIGHTBOX */}
      {lightboxImage && (
        <div 
          onClick={() => setLightboxImage(null)}
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 cursor-pointer"
        >
          <img
            src={lightboxImage}
            alt="Full preview"
            className="max-w-full max-h-[90vh] object-contain rounded-2xl shadow-2xl"
          />
        </div>
      )}

    </article>
  );
};
