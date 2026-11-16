/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { SidebarLeft } from './components/SidebarLeft';
import { SidebarRight } from './components/SidebarRight';
import { StoriesTray } from './components/Feed/StoriesTray';
import { StoryViewerModal } from './components/Feed/StoryViewerModal';
import { CreatePostBox } from './components/Feed/CreatePostBox';
import { PostCard } from './components/Feed/PostCard';
import { ChatWindow } from './components/Messenger/ChatWindow';
import { MessengerFullView } from './components/Messenger/MessengerFullView';
import { CallModal } from './components/Messenger/CallModal';
import { ReelsViewer } from './components/Reels/ReelsViewer';
import { WatchView } from './components/Videos/WatchView';
import { ProfileView } from './components/Profile/ProfileView';
import { FriendsView } from './components/Friends/FriendsView';
import { HumanityDeskModal } from './components/HumanityDesk/HumanityDeskModal';
import { SuperAdminPanel } from './components/Admin/SuperAdminPanel';
import { AuthModal } from './components/Auth/AuthModal';

import { 
  User, 
  Post, 
  Story, 
  Reel, 
  Conversation, 
  NotificationItem, 
  FriendRequest, 
  PayoutRequest, 
  UserReport, 
  ReactionType 
} from './types';

import { 
  FOUNDER_USER, 
  MOCK_USERS, 
  INITIAL_POSTS, 
  MOCK_STORIES, 
  MOCK_REELS, 
  MOCK_CONVERSATIONS, 
  MOCK_NOTIFICATIONS, 
  MOCK_FRIEND_REQUESTS, 
  MOCK_PAYOUTS, 
  MOCK_REPORTS 
} from './data/mockData';

export default function App() {
  // Theme & Language
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [language, setLanguage] = useState<'bn' | 'en'>('bn');

  // Navigation
  const [activeTab, setActiveTab] = useState<'feed' | 'watch' | 'reels' | 'friends' | 'profile' | 'admin' | 'humanity' | 'messenger'>('feed');

  // Users & Profile
  const [currentUser, setCurrentUser] = useState<User>(FOUNDER_USER);
  const [allUsers, setAllUsers] = useState<User[]>(MOCK_USERS);
  const [userToView, setUserToView] = useState<User>(FOUNDER_USER);

  // Feed Data
  const [posts, setPosts] = useState<Post[]>(INITIAL_POSTS);
  const [stories, setStories] = useState<Story[]>(MOCK_STORIES);
  const [reels, setReels] = useState<Reel[]>(MOCK_REELS);

  // Messenger & Calling
  const [conversations, setConversations] = useState<Conversation[]>(MOCK_CONVERSATIONS);
  const [dockedChatUser, setDockedChatUser] = useState<User | null>(null);
  const [activeCall, setActiveCall] = useState<{ participant: User; type: 'audio' | 'video' } | null>(null);

  // Notifications & Friend Requests
  const [notifications, setNotifications] = useState<NotificationItem[]>(MOCK_NOTIFICATIONS);
  const [friendRequests, setFriendRequests] = useState<FriendRequest[]>(MOCK_FRIEND_REQUESTS);

  // Admin Data
  const [payouts, setPayouts] = useState<PayoutRequest[]>(MOCK_PAYOUTS);
  const [reports, setReports] = useState<UserReport[]>(MOCK_REPORTS);

  // Modals
  const [activeStoryId, setActiveStoryId] = useState<string | null>(null);
  const [isHumanityDeskOpen, setIsHumanityDeskOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isCreatePostModalOpen, setIsCreatePostModalOpen] = useState(false);

  // Sync Dark mode with HTML class for Tailwind v4 @custom-variant dark
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      document.documentElement.classList.remove('light');
    } else {
      document.documentElement.classList.remove('dark');
      document.documentElement.classList.add('light');
    }
  }, [isDarkMode]);

  // Post Actions
  const handleAddPost = (newPost: Post) => {
    setPosts(prev => [newPost, ...prev]);
  };

  const handleReaction = (postId: string, reaction: ReactionType) => {
    setPosts(prev => prev.map(p => {
      if (p.id !== postId) return p;
      const prevReaction = p.userReaction;
      const updatedReactions = { ...p.reactions };

      if (prevReaction === reaction) {
        // Toggle off
        updatedReactions[reaction] = Math.max(0, updatedReactions[reaction] - 1);
        return { ...p, reactions: updatedReactions, userReaction: undefined };
      }

      if (prevReaction) {
        updatedReactions[prevReaction] = Math.max(0, updatedReactions[prevReaction] - 1);
      }
      updatedReactions[reaction] = (updatedReactions[reaction] || 0) + 1;

      return {
        ...p,
        reactions: updatedReactions,
        userReaction: reaction
      };
    }));
  };

  const handleAddComment = (postId: string, text: string) => {
    const newComment = {
      id: 'c_' + Date.now(),
      author: currentUser,
      text,
      timestamp: 'এইমাত্র',
      likes: 0
    };

    setPosts(prev => prev.map(p => {
      if (p.id !== postId) return p;
      return {
        ...p,
        commentsCount: p.commentsCount + 1,
        comments: [newComment, ...p.comments]
      };
    }));
  };

  const handleVotePoll = (postId: string, optionId: string) => {
    setPosts(prev => prev.map(p => {
      if (p.id !== postId || !p.poll) return p;
      if (p.poll.userVoteId === optionId) return p; // already voted this option

      const prevVote = p.poll.userVoteId;
      const updatedOptions = p.poll.options.map(opt => {
        if (opt.id === optionId) return { ...opt, votes: opt.votes + 1 };
        if (opt.id === prevVote) return { ...opt, votes: Math.max(0, opt.votes - 1) };
        return opt;
      });

      return {
        ...p,
        poll: {
          ...p.poll,
          options: updatedOptions,
          userVoteId: optionId,
          totalVotes: prevVote ? p.poll.totalVotes : p.poll.totalVotes + 1
        }
      };
    }));
  };

  // Messenger Actions
  const handleOpenChatWithUser = (user: User) => {
    let conv = conversations.find(c => c.participant.id === user.id);
    if (!conv) {
      conv = {
        id: 'conv_' + user.id,
        participant: user,
        messages: [],
        unreadCount: 0,
        isOnline: true
      };
      setConversations(prev => [conv!, ...prev]);
    }
    setDockedChatUser(user);
  };

  const handleSendMessage = (conversationId: string, text: string) => {
    const newMsg = {
      id: 'm_' + Date.now(),
      senderId: currentUser.id,
      text,
      timestamp: 'এইমাত্র',
      isDelivered: true,
      isSeen: false
    };

    setConversations(prev => prev.map(c => {
      if (c.id !== conversationId) return c;
      return {
        ...c,
        messages: [...c.messages, newMsg]
      };
    }));

    // Trigger realistic friendly simulated reply after 2.5 seconds
    setTimeout(() => {
      const friendlyReplies = [
        'জি, আপনার বার্তাটি পেয়েছি। মানবতার সেবায় আমরা নিবেদিত। ❤️',
        'অনেক ধন্যবাদ আপনার যোগাযোগের জন্য। শুভকামনা রইল!',
        'জি ভাইয়া, আমি অবিলম্বে বিষয়টি দেখছি।',
        'আল্লাহ আপনার ভালো করুন। যেকোনো প্রয়োজনে জানাবেন।'
      ];
      const randomReply = friendlyReplies[Math.floor(Math.random() * friendlyReplies.length)];

      setConversations(prev => prev.map(c => {
        if (c.id !== conversationId) return c;
        return {
          ...c,
          isTyping: false,
          messages: [
            ...c.messages,
            {
              id: 'm_reply_' + Date.now(),
              senderId: c.participant.id,
              text: randomReply,
              timestamp: 'এইমাত্র',
              isDelivered: true,
              isSeen: true
            }
          ]
        };
      }));
    }, 2500);
  };

  // Friend Requests Actions
  const handleConfirmFriend = (requestId: string) => {
    const req = friendRequests.find(r => r.id === requestId);
    if (req) {
      setFriendRequests(prev => prev.filter(r => r.id !== requestId));
      setCurrentUser(prev => ({ ...prev, friendsCount: prev.friendsCount + 1 }));
      alert(`${req.user.banglaName || req.user.name} এখন আপনার বন্ধু!`);
    }
  };

  const handleDeleteFriendRequest = (requestId: string) => {
    setFriendRequests(prev => prev.filter(r => r.id !== requestId));
  };

  // Admin Actions
  const handleToggleUserBan = (userId: string) => {
    alert(`ইউজার ID: ${userId} কে সাময়িকভাবে নিষিদ্ধ (Ban) করা হয়েছে।`);
  };

  const handleVerifyUser = (userId: string) => {
    setAllUsers(prev => prev.map(u => u.id === userId ? { ...u, isVerified: !u.isVerified } : u));
    if (currentUser.id === userId) {
      setCurrentUser(prev => ({ ...prev, isVerified: !prev.isVerified }));
    }
  };

  const handleDeletePost = (postId: string) => {
    setPosts(prev => prev.filter(p => p.id !== postId));
  };

  const handleApprovePayout = (payoutId: string) => {
    setPayouts(prev => prev.map(p => p.id === payoutId ? { ...p, status: 'approved' } : p));
  };

  const handleRejectPayout = (payoutId: string) => {
    setPayouts(prev => prev.map(p => p.id === payoutId ? { ...p, status: 'rejected' } : p));
  };

  const dockedConversation = dockedChatUser 
    ? conversations.find(c => c.participant.id === dockedChatUser.id) || {
        id: 'conv_' + dockedChatUser.id,
        participant: dockedChatUser,
        messages: [],
        unreadCount: 0,
        isOnline: true
      }
    : null;

  return (
    <div className="min-h-screen bg-[#f0f2f5] dark:bg-[#18191a] text-slate-900 dark:text-slate-100 flex flex-col font-['Hind_Siliguri',sans-serif] transition-colors duration-200">
      
      {/* TOP NAVIGATION BAR */}
      <Navbar
        currentUser={currentUser}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        isDarkMode={isDarkMode}
        setIsDarkMode={setIsDarkMode}
        language={language}
        setLanguage={setLanguage}
        notifications={notifications}
        markNotificationRead={(id) => setNotifications(prev => prev.map(n => n.id === id ? { ...n, isRead: true } : n))}
        conversations={conversations}
        openChatWithUser={handleOpenChatWithUser}
        onOpenCreatePost={() => setIsCreatePostModalOpen(true)}
        onOpenAuthModal={() => setIsAuthModalOpen(true)}
        onOpenHumanityDesk={() => setIsHumanityDeskOpen(true)}
        onSelectUserToView={(u) => {
          setUserToView(u);
          setActiveTab('profile');
        }}
        allUsers={allUsers}
      />

      {/* MAIN CONTAINER LAYOUT */}
      <main className="flex-1 w-full max-w-[1920px] mx-auto flex justify-center">
        
        {/* LEFT SIDEBAR (Hidden on small screens) */}
        <SidebarLeft
          currentUser={currentUser}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          onSelectUserToView={(u) => {
            setUserToView(u);
            setActiveTab('profile');
          }}
          onOpenHumanityDesk={() => setIsHumanityDeskOpen(true)}
          language={language}
        />

        {/* CENTER VIEWPORT STAGE */}
        <section className="flex-1 max-w-2xl px-2 sm:px-4 py-4 min-h-[calc(100vh-3.5rem)] pb-20 sm:pb-6">
          
          {/* TAB 1: NEWS FEED */}
          {activeTab === 'feed' && (
            <div className="space-y-4">
              
              {/* Stories Tray */}
              <StoriesTray
                stories={stories}
                currentUser={currentUser}
                onOpenStory={(s) => setActiveStoryId(s.id)}
                onCreateStory={() => alert('নতুন স্টোরি যুক্ত করার ফিচার উন্মুক্ত')}
              />

              {/* Create Post Box */}
              <CreatePostBox
                currentUser={currentUser}
                onAddPost={handleAddPost}
              />

              {/* Feed Posts */}
              <div className="space-y-4">
                {posts.map(post => (
                  <PostCard
                    key={post.id}
                    post={post}
                    currentUser={currentUser}
                    onReaction={handleReaction}
                    onAddComment={handleAddComment}
                    onVotePoll={handleVotePoll}
                    onSelectUserToView={(u) => {
                      setUserToView(u);
                      setActiveTab('profile');
                    }}
                    onOpenChatWithUser={handleOpenChatWithUser}
                  />
                ))}
              </div>

            </div>
          )}

          {/* TAB 2: WATCH (VIDEOS) */}
          {activeTab === 'watch' && (
            <WatchView
              reels={reels}
              currentUser={currentUser}
              onSelectUserToView={(u) => {
                setUserToView(u);
                setActiveTab('profile');
              }}
              language={language}
            />
          )}

          {/* TAB 3: REELS */}
          {activeTab === 'reels' && (
            <ReelsViewer
              reels={reels}
              currentUser={currentUser}
              onSelectUserToView={(u) => {
                setUserToView(u);
                setActiveTab('profile');
              }}
              language={language}
            />
          )}

          {/* TAB 4: FRIENDS */}
          {activeTab === 'friends' && (
            <FriendsView
              friendRequests={friendRequests}
              allUsers={allUsers}
              currentUser={currentUser}
              onConfirmFriend={handleConfirmFriend}
              onDeleteFriendRequest={handleDeleteFriendRequest}
              onOpenChatWithUser={handleOpenChatWithUser}
              onSelectUserToView={(u) => {
                setUserToView(u);
                setActiveTab('profile');
              }}
              language={language}
            />
          )}

          {/* TAB 5: PROFILE VIEW */}
          {activeTab === 'profile' && (
            <ProfileView
              userToView={userToView}
              currentUser={currentUser}
              posts={posts}
              onReaction={handleReaction}
              onAddComment={handleAddComment}
              onOpenChatWithUser={handleOpenChatWithUser}
              onStartCall={(u, type) => setActiveCall({ participant: u, type })}
              onUpdateCurrentUser={(updated) => {
                setCurrentUser(updated);
                setUserToView(updated);
                setAllUsers(prev => prev.map(u => u.id === updated.id ? updated : u));
              }}
              onSelectUserToView={(u) => setUserToView(u)}
              language={language}
            />
          )}

          {/* TAB 6: DEDICATED MESSENGER FULL VIEW */}
          {activeTab === 'messenger' && (
            <MessengerFullView
              conversations={conversations}
              currentUser={currentUser}
              onSendMessage={handleSendMessage}
              onStartCall={(u, type) => setActiveCall({ participant: u, type })}
              onSelectUserToView={(u) => {
                setUserToView(u);
                setActiveTab('profile');
              }}
              language={language}
            />
          )}

          {/* TAB 7: SUPER ADMIN DASHBOARD */}
          {activeTab === 'admin' && (
            <SuperAdminPanel
              currentUser={currentUser}
              allUsers={allUsers}
              posts={posts}
              payouts={payouts}
              reports={reports}
              onToggleUserBan={handleToggleUserBan}
              onVerifyUser={handleVerifyUser}
              onDeletePost={handleDeletePost}
              onApprovePayout={handleApprovePayout}
              onRejectPayout={handleRejectPayout}
              language={language}
            />
          )}

        </section>

        {/* RIGHT SIDEBAR (Hidden on mobile & tablets) */}
        <SidebarRight
          onlineUsers={allUsers.filter(u => u.id !== currentUser.id)}
          friendRequests={friendRequests}
          onConfirmFriend={handleConfirmFriend}
          onDeleteFriendRequest={handleDeleteFriendRequest}
          openChatWithUser={handleOpenChatWithUser}
          onSelectUserToView={(u) => {
            setUserToView(u);
            setActiveTab('profile');
          }}
          onOpenHumanityDesk={() => setIsHumanityDeskOpen(true)}
          language={language}
        />

      </main>

      {/* FLOATING DOCKED MESSENGER CHAT WINDOW (Facebook Chat Tab at Bottom Right) */}
      {dockedConversation && (
        <div className="fixed bottom-0 right-4 sm:right-20 z-40">
          <ChatWindow
            conversation={dockedConversation}
            currentUser={currentUser}
            onSendMessage={handleSendMessage}
            onClose={() => setDockedChatUser(null)}
            onStartCall={(u, type) => setActiveCall({ participant: u, type })}
            onSelectUserToView={(u) => {
              setUserToView(u);
              setActiveTab('profile');
            }}
          />
        </div>
      )}

      {/* CALL MODAL (Audio & Video Calling) */}
      {activeCall && (
        <CallModal
          participant={activeCall.participant}
          callType={activeCall.type}
          onEndCall={() => setActiveCall(null)}
        />
      )}

      {/* STORY VIEWER MODAL */}
      {activeStoryId && (
        <StoryViewerModal
          stories={stories}
          initialStoryId={activeStoryId}
          onClose={() => setActiveStoryId(null)}
          onSendReply={(storyId, reply) => {
            // send reply to story author
            const st = stories.find(s => s.id === storyId);
            if (st) {
              handleOpenChatWithUser(st.author);
            }
          }}
        />
      )}

      {/* HUMANITARIAN EMERGENCY DESK MODAL */}
      <HumanityDeskModal
        isOpen={isHumanityDeskOpen}
        onClose={() => setIsHumanityDeskOpen(false)}
        allUsers={allUsers}
        onOpenChatWithUser={handleOpenChatWithUser}
      />

      {/* USER AUTH & ACCOUNT SWITCHER MODAL */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        currentUser={currentUser}
        allUsers={allUsers}
        onSwitchUser={(u) => {
          setCurrentUser(u);
          setUserToView(u);
        }}
        onRegisterUser={(newU) => {
          setAllUsers(prev => [newU, ...prev]);
          setCurrentUser(newU);
          setUserToView(newU);
        }}
      />

      {/* CREATE POST MODAL (TRIGGERED FROM NAVBAR OR FLOATING CTA) */}
      {isCreatePostModalOpen && (
        <CreatePostBox
          currentUser={currentUser}
          onAddPost={handleAddPost}
          isOpenModalDirectly={true}
          onCloseModalDirectly={() => setIsCreatePostModalOpen(false)}
        />
      )}

    </div>
  );
}
