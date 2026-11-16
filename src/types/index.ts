export type ReactionType = 'like' | 'love' | 'care' | 'haha' | 'wow' | 'sad' | 'angry';

export interface User {
  id: string;
  name: string;
  banglaName: string;
  email: string;
  avatar: string;
  coverPhoto: string;
  bio: string;
  role: 'founder' | 'superadmin' | 'admin' | 'moderator' | 'support' | 'user';
  isVerified: boolean;
  location: string;
  phone: string;
  joinedDate: string;
  followersCount: number;
  followingCount: number;
  friendsCount: number;
  work?: string;
  education?: string;
  bloodGroup?: string;
}

export interface Comment {
  id: string;
  author: User;
  text: string;
  timestamp: string;
  likes: number;
  userLiked?: boolean;
  replies?: Comment[];
}

export interface PollOption {
  id: string;
  text: string;
  votes: number;
}

export interface Post {
  id: string;
  author: User;
  timestamp: string;
  content: string;
  banglaContent?: string;
  images?: string[];
  videoUrl?: string;
  isHumanityEmergency?: boolean;
  emergencyDetails?: {
    category: 'blood' | 'medical' | 'relief' | 'education' | 'other';
    title: string;
    bloodGroup?: string;
    location: string;
    patientInfo?: string;
    contactNumber: string;
    urgency: 'medium' | 'high' | 'critical';
    targetAmount?: string;
    raisedAmount?: string;
  };
  reactions: Record<ReactionType, number>;
  userReaction?: ReactionType;
  commentsCount: number;
  sharesCount: number;
  viewsCount: number;
  comments: Comment[];
  poll?: {
    question: string;
    options: PollOption[];
    userVoteId?: string;
    totalVotes: number;
  };
  tags?: string[];
}

export interface Story {
  id: string;
  author: User;
  mediaUrl: string;
  caption?: string;
  timestamp: string;
  isSeen: boolean;
  type: 'image' | 'video' | 'text';
  backgroundColor?: string;
}

export interface Reel {
  id: string;
  creator: User;
  videoTitle: string;
  videoUrl: string;
  thumbnail: string;
  likesCount: number;
  commentsCount: number;
  sharesCount: number;
  audioTitle: string;
  isLiked?: boolean;
}

export interface ChatMessage {
  id: string;
  senderId: string;
  text?: string;
  mediaUrl?: string;
  voiceDuration?: number;
  timestamp: string;
  isDelivered: boolean;
  isSeen: boolean;
}

export interface Conversation {
  id: string;
  participant: User;
  messages: ChatMessage[];
  unreadCount: number;
  isOnline: boolean;
  lastActive?: string;
  isTyping?: boolean;
}

export interface NotificationItem {
  id: string;
  type: 'reaction' | 'comment' | 'friend_req' | 'emergency' | 'admin' | 'payout';
  actor: User;
  title: string;
  description: string;
  timestamp: string;
  isRead: boolean;
  targetId?: string;
}

export interface FriendRequest {
  id: string;
  user: User;
  mutualFriends: number;
  timestamp: string;
}

export interface PayoutRequest {
  id: string;
  creator: User;
  amount: number;
  method: 'bKash' | 'Nagad' | 'Rocket' | 'Bank';
  accountNumber: string;
  requestDate: string;
  status: 'pending' | 'approved' | 'rejected';
}

export interface UserReport {
  id: string;
  reporter: User;
  targetType: 'post' | 'user' | 'video' | 'comment';
  targetTitle: string;
  reason: string;
  timestamp: string;
  status: 'pending' | 'investigating' | 'resolved' | 'dismissed';
}
