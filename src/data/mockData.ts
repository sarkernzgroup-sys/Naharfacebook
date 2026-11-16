import { User, Post, Story, Reel, Conversation, NotificationItem, FriendRequest, PayoutRequest, UserReport } from '../types';

export const FOUNDER_USER: User = {
  id: 'founder_1',
  name: 'SN Nazmul Sarker',
  banglaName: 'এস এন নাজমুল সরকার',
  email: 'sarkernzgroup@gmail.com',
  avatar: '/src/assets/images/founder_avatar_1794414391981.jpg',
  coverPhoto: '/src/assets/images/humanity_cover_banner_1794414391964.jpg',
  bio: '❤️ মানবতার ফেরিওয়ালা-র প্রতিষ্ঠাতা। মানুষের জন্য, মানুষের পাশে। যে কোনো জরুরি মানবিক সহায়তায় কল করুন: 01825986764 (২৪ ঘণ্টা ফ্রি)।',
  role: 'founder',
  isVerified: true,
  location: 'ঢাকা, বাংলাদেশ',
  phone: '01825986764',
  joinedDate: 'জানুয়ারি ২০২৪',
  followersCount: 184500,
  followingCount: 312,
  friendsCount: 4890,
  work: 'প্রতিষ্ঠাতা ও প্রধান সংগঠক, মানবতার ফেরিওয়ালা ফাউন্ডেশন',
  education: 'ঢাকা বিশ্ববিদ্যালয়',
  bloodGroup: 'O+'
};

export const MOCK_USERS: User[] = [
  FOUNDER_USER,
  {
    id: 'user_dr_arif',
    name: 'Dr. Arif Hossain',
    banglaName: 'ডাঃ আরিফ হোসেন',
    email: 'dr.arif.dmc@gmail.com',
    avatar: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=300&auto=format&fit=crop&q=80',
    coverPhoto: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=1000&auto=format&fit=crop&q=80',
    bio: 'মেডিকেল ভলান্টিয়ার ও রক্তদান সমন্বয়ক। ঢাকা মেডিকেল কলেজ হাসপাতাল। অসহায় মানুষের বিনামূল্যে চিকিৎসা সেবা প্রদানে নিবেদিত।',
    role: 'moderator',
    isVerified: true,
    location: 'ঢাকা মেডিকেল, ঢাকা',
    phone: '01711002233',
    joinedDate: 'মার্চ ২০২৪',
    followersCount: 34200,
    followingCount: 420,
    friendsCount: 2850,
    work: 'সহকারী অধ্যাপক, ঢাকা মেডিকেল কলেজ',
    bloodGroup: 'B+'
  },
  {
    id: 'user_tahmina',
    name: 'Tahmina Akhter',
    banglaName: 'তাহমিনা আক্তার',
    email: 'tahmina.social@gmail.com',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=300&auto=format&fit=crop&q=80',
    coverPhoto: 'https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?w=1000&auto=format&fit=crop&q=80',
    bio: 'সমাজসেবক ও যুব ভলান্টিয়ার লিডার। সুবিধাবঞ্চিত শিশুদের শিক্ষা ও পুষ্টি নিয়ে কাজ করছি।',
    role: 'admin',
    isVerified: true,
    location: 'চট্টগ্রাম, বাংলাদেশ',
    phone: '01833445566',
    joinedDate: 'ফেব্রুয়ারি ২০২৪',
    followersCount: 52100,
    followingCount: 650,
    friendsCount: 3400,
    work: 'প্রজেক্ট ডিরেক্টর, আলো ফাউন্ডেশন',
    bloodGroup: 'A+'
  },
  {
    id: 'user_rakib',
    name: 'Rakibul Hasan',
    banglaName: 'রাকিবুল হাসান',
    email: 'rakibul.hasan@gmail.com',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&auto=format&fit=crop&q=80',
    coverPhoto: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=1000&auto=format&fit=crop&q=80',
    bio: 'স্বেচ্ছাসেবী রক্তদাতা (এখন পর্যন্ত ২৩ বার রক্ত দিয়েছি)। রক্তের যে কোনো প্রয়োজনে মেসেজ দিন।',
    role: 'user',
    isVerified: false,
    location: 'রাজশাহী, বাংলাদেশ',
    phone: '01922334455',
    joinedDate: 'মে ২০২৪',
    followersCount: 8900,
    followingCount: 340,
    friendsCount: 1200,
    work: 'শিক্ষার্থী, রাজশাহী প্রকৌশল ও প্রযুক্তি বিশ্ববিদ্যালয়',
    bloodGroup: 'O-'
  },
  {
    id: 'user_sumaiya',
    name: 'Sumaiya Jannat',
    banglaName: 'সুমাইয়া জান্নাত',
    email: 'sumaiya.jannat@gmail.com',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&auto=format&fit=crop&q=80',
    coverPhoto: 'https://images.unsplash.com/photo-1518495973542-4542c06a5843?w=1000&auto=format&fit=crop&q=80',
    bio: 'শীতবস্ত্র ও খাদ্য সহায়তা কর্মী। মানুষের হাসিমুখেই জীবনের সবচেয়ে বড় প্রাপ্তি। 🌸',
    role: 'user',
    isVerified: false,
    location: 'সিলেট, বাংলাদেশ',
    phone: '01655667788',
    joinedDate: 'জুন ২০২৪',
    followersCount: 14500,
    followingCount: 210,
    friendsCount: 1840,
    work: 'সমাজকল্যাণ কর্মী, সিলেট',
    bloodGroup: 'AB+'
  }
];

export const INITIAL_POSTS: Post[] = [
  {
    id: 'post_founder_welcome',
    author: FOUNDER_USER,
    timestamp: '১০ মিনিট আগে',
    content: '❤️ "মানবতার ফেরিওয়ালা" প্ল্যাটফর্মে সবাইকে স্বাগতম!\n\nআমাদের মূল লক্ষ্য হলো একটি বৈষম্যহীন, ভ্রাতৃত্বপূর্ণ মানবিক সমাজ গড়ে তোলা। যেখানে প্রত্যেকে নিঃসংকোচে কথা বলবে, অসহায় মানুষের সাহায্যে হাত বাড়িয়ে দেবে, বন্ধু বানাবে, সৃজনশীল ভিডিও এবং মানবিক কাজের রিলস প্রকাশ করবে।\n\nএই প্ল্যাটফর্মটি সম্পূর্ণ ফ্রি ও সবার জন্য উন্মুক্ত। যে কোনো প্রকার সহায়তা, অনুদান সমন্বয় বা জরুরি প্রয়োজনে আমার সরাসরি হেল্পলাইন নম্বরে যোগাযোগ করতে পারেন।\n\n📞 হেল্পলাইন: 01825986764 (এস এন নাজমুল সরকার)\n\nচলুন একসাথে মানবতার জয়গান গাই!',
    images: ['/src/assets/images/humanity_cover_banner_1794414391964.jpg'],
    isHumanityEmergency: false,
    reactions: {
      like: 1420,
      love: 3890,
      care: 1205,
      haha: 8,
      wow: 412,
      sad: 2,
      angry: 1
    },
    userReaction: 'love',
    commentsCount: 342,
    sharesCount: 712,
    viewsCount: 28400,
    tags: ['#মানবতার_ফেরিওয়ালা', '#মানুষের_পাশে', '#SocialPlatform', '#FreeService'],
    comments: [
      {
        id: 'c1',
        author: MOCK_USERS[1],
        text: 'অসাধারণ উদ্যোগ নাজমুল ভাই! আমরা চিকিৎসকরা আপনার এই মানবিক প্ল্যাটফর্মে সবসময় আপনাদের সাথে আছি। শুভকামনা রইল!',
        timestamp: '৮ মিনিট আগে',
        likes: 128,
        userLiked: true,
        replies: [
          {
            id: 'c1_r1',
            author: FOUNDER_USER,
            text: 'ধন্যবাদ আরিফ ভাই। আপনার নিঃস্বার্থ চিকিৎসা সেবা আমাদের অনুপ্রেরণা।',
            timestamp: '৫ মিনিট আগে',
            likes: 64
          }
        ]
      },
      {
        id: 'c2',
        author: MOCK_USERS[2],
        text: 'আজ থেকে আমাদের সব ভলান্টিয়ার টিম এই প্ল্যাটফর্মে কানেক্টেড থাকবে। মানবতার জয় হোক!',
        timestamp: '৬ মিনিট আগে',
        likes: 84
      }
    ]
  },
  {
    id: 'post_emergency_blood',
    author: MOCK_USERS[1],
    timestamp: '২৫ মিনিট আগে',
    content: '🚨 জরুরি রক্তদান আবেদন! 🚨\n\nঢাকা মেডিকেল কলেজ হাসপাতালের গাইনি ওয়ার্ডে চিকিৎসাধীন এক প্রসূতি মায়ের জরুরি ভিত্তিতে ২ ব্যাগ "O পজিটিভ (O+)" রক্তের প্রয়োজন। রোগীর অবস্থা আশঙ্কাজনক।\n\nযারা ঢাকায় অবস্থান করছেন এবং গত ৩ মাসের মধ্যে রক্ত দেননি, অনুগ্রহ করে দ্রুত যোগাযোগ করুন। একটি রক্তদানে বেঁচে যেতে পারে দুটি প্রাণ!',
    isHumanityEmergency: true,
    emergencyDetails: {
      category: 'blood',
      title: 'জরুরি O+ রক্তের প্রয়োজন (২ ব্যাগ)',
      bloodGroup: 'O+',
      location: 'ঢাকা মেডিকেল কলেজ হাসপাতাল, ওয়ার্ড নং ৮',
      patientInfo: 'রোগী: নাসিমা বেগম (বয়স ২৭)',
      contactNumber: '01825986764',
      urgency: 'critical'
    },
    reactions: {
      like: 450,
      love: 280,
      care: 890,
      haha: 0,
      wow: 45,
      sad: 630,
      angry: 0
    },
    commentsCount: 94,
    sharesCount: 310,
    viewsCount: 14200,
    tags: ['#BloodNeeded', '#OPositive', '#EmergencyBlood', '#রক্তের_প্রয়োজন'],
    comments: [
      {
        id: 'cb1',
        author: MOCK_USERS[3],
        text: 'আমি ৩০ মিনিটের মধ্যে ঢাকা মেডিকেলে পৌঁছাচ্ছি। আমার রক্ত গ্রুপ O+, আমি রক্ত দিতে প্রস্তুত।',
        timestamp: '১৮ মিনিট আগে',
        likes: 194,
        userLiked: true
      }
    ]
  },
  {
    id: 'post_free_medical_camp',
    author: MOCK_USERS[2],
    timestamp: '১ ঘণ্টা আগে',
    content: 'আজ মানবতার ফেরিওয়ালার উদ্যোগে কুড়িগ্রামের বন্যাদুর্গত এলাকায় অনুষ্ঠিত হলো দিনব্যাপী বিনামূল্যে স্বাস্থ্যসেবা ও ওষুধ বিতরণ ক্যাম্পেইন।\n\n৫০০ জনেরও বেশি শিশু ও বয়োবৃদ্ধদের মাঝে বিনামূল্যে চিকিৎসা ও পুষ্টিকর খাবার তুলে দেওয়া হয়েছে। আপনাদের সবার সহযোগিতায় এই অসম্ভব সম্ভব হয়েছে।',
    images: ['/src/assets/images/feed_humanity_post_1794414393784.jpg'],
    isHumanityEmergency: false,
    reactions: {
      like: 980,
      love: 1540,
      care: 620,
      haha: 3,
      wow: 210,
      sad: 4,
      angry: 1
    },
    commentsCount: 88,
    sharesCount: 165,
    viewsCount: 19200,
    tags: ['#MedicalCamp', '#HumanitarianRelief', '#KurigramRelief'],
    comments: []
  },
  {
    id: 'post_community_poll',
    author: FOUNDER_USER,
    timestamp: '৩ ঘণ্টা আগে',
    content: 'আমাদের পরবর্তী আসন্ন শীত মৌসুমে বিনামূল্যে কম্বল ও শীতবস্ত্র বিতরণ ক্যাম্পেইনে আপনার মূল্যবান মতামত দিন। কোন অঞ্চলটিতে অগ্রাধিকার ভিত্তিতে আমাদের যাওয়া উচিত?',
    isHumanityEmergency: false,
    reactions: {
      like: 340,
      love: 520,
      care: 180,
      haha: 2,
      wow: 40,
      sad: 1,
      angry: 0
    },
    commentsCount: 112,
    sharesCount: 84,
    viewsCount: 11200,
    poll: {
      question: 'শীতবস্ত্র বিতরণ ক্যাম্পেইনের জন্য অগ্রাধিকার প্রাপ্ত অঞ্চল:',
      options: [
        { id: 'opt_1', text: 'উত্তরাঞ্চল (কুড়িগ্রাম, লালমনিরহাট, পঞ্চগড়)', votes: 842 },
        { id: 'opt_2', text: 'হাওর অঞ্চল (সুনামগঞ্জ, কিশোরগঞ্জ)', votes: 318 },
        { id: 'opt_3', text: 'উপকূলীয় চরাঞ্চল (ভোলা, পটুয়াখালী)', votes: 195 },
        { id: 'opt_4', text: 'পার্বত্য অঞ্চল (বান্দরবান, রাঙ্গামাটি)', votes: 140 }
      ],
      userVoteId: 'opt_1',
      totalVotes: 1495
    },
    comments: []
  }
];

export const MOCK_STORIES: Story[] = [
  {
    id: 'story_founder',
    author: FOUNDER_USER,
    mediaUrl: '/src/assets/images/humanity_cover_banner_1794414391964.jpg',
    caption: 'মানবতার সেবাতেই জীবনের স্বার্থকতা ❤️',
    timestamp: '২ ঘণ্টা আগে',
    isSeen: false,
    type: 'image'
  },
  {
    id: 'story_dr_arif',
    author: MOCK_USERS[1],
    mediaUrl: '/src/assets/images/feed_humanity_post_1794414393784.jpg',
    caption: 'আজকের মেডিকেল ক্যাম্প সফলভাবে সম্পন্ন হয়েছে 🩺',
    timestamp: '৪ ঘণ্টা আগে',
    isSeen: false,
    type: 'image'
  },
  {
    id: 'story_reels_preview',
    author: MOCK_USERS[2],
    mediaUrl: '/src/assets/images/reels_video_thumb_1794414392662.jpg',
    caption: 'ছোট্ট বন্ধুদের মুখে হাসি ফোটানোর আনন্দ ✨',
    timestamp: '৫ ঘণ্টা আগে',
    isSeen: false,
    type: 'image'
  },
  {
    id: 'story_rakib',
    author: MOCK_USERS[3],
    mediaUrl: 'https://images.unsplash.com/photo-1615461066841-6116e61058f4?w=600&auto=format&fit=crop&q=80',
    caption: 'রক্তদান করুন, মানুষের প্রাণ বাঁচান 🩸',
    timestamp: '৬ ঘণ্টা আগে',
    isSeen: true,
    type: 'image'
  }
];

export const MOCK_REELS: Reel[] = [
  {
    id: 'reel_1',
    creator: FOUNDER_USER,
    videoTitle: 'অসহায় পরিবারের মুখে হাসি ফোটানোর মুহূর্ত ❤️ মানবতার ফেরিওয়ালা টিম',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-hands-of-people-holding-a-donation-box-49855-large.mp4',
    thumbnail: '/src/assets/images/reels_video_thumb_1794414392662.jpg',
    likesCount: 24800,
    commentsCount: 1420,
    sharesCount: 3100,
    audioTitle: 'মানবতার গান • আসল কণ্ঠ (এস এন নাজমুল সরকার)',
    isLiked: true
  },
  {
    id: 'reel_2',
    creator: MOCK_USERS[2],
    videoTitle: 'বন্যাদুর্গত শিশুদের জন্য পুষ্টিকর দুধ ও বিস্কুট বিতরণ কার্যক্রম 🍼',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-volunteers-giving-supplies-to-people-in-need-48417-large.mp4',
    thumbnail: '/src/assets/images/humanity_cover_banner_1794414391964.jpg',
    likesCount: 18300,
    commentsCount: 890,
    sharesCount: 1950,
    audioTitle: 'মানুষ মানুষের জন্য • ভূপেন হাজারিকা'
  },
  {
    id: 'reel_3',
    creator: MOCK_USERS[1],
    videoTitle: 'জরুরি রক্তদানের নিয়ম ও উপকারিতা সম্পর্কে জেনে নিন 🩸',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-doctor-checking-a-patients-arm-before-blood-donation-43615-large.mp4',
    thumbnail: '/src/assets/images/feed_humanity_post_1794414393784.jpg',
    likesCount: 31500,
    commentsCount: 1840,
    sharesCount: 5200,
    audioTitle: 'স্বাস্থ্য ও সচেতনতা বার্তা • ডাঃ আরিফ হোসেন'
  }
];

export const MOCK_CONVERSATIONS: Conversation[] = [
  {
    id: 'conv_founder',
    participant: FOUNDER_USER,
    isOnline: true,
    unreadCount: 1,
    messages: [
      {
        id: 'm1',
        senderId: 'founder_1',
        text: 'আসসালামু আলাইকুম। মানবতার ফেরিওয়ালা প্ল্যাটফর্মে আপনাকে স্বাগতম!',
        timestamp: 'সকাল ১০:১৫',
        isDelivered: true,
        isSeen: true
      },
      {
        id: 'm2',
        senderId: 'current_user',
        text: 'ওয়ালাইকুম আসসালাম নাজমুল ভাই! আপনার এই মহৎ উদ্যোগের জন্য অনেক ধন্যবাদ।',
        timestamp: 'সকাল ১০:১৮',
        isDelivered: true,
        isSeen: true
      },
      {
        id: 'm3',
        senderId: 'founder_1',
        text: 'যেকোনো মানবিক সেবামূলক কাজ বা রক্তদানের প্রয়োজনে আমাকে নির্দ্বিধায় মেসেজ করবেন। হেল্পলাইন 01825986764 সার্বক্ষণিক চালু আছে।',
        timestamp: 'সকাল ১০:২০',
        isDelivered: true,
        isSeen: false
      }
    ]
  },
  {
    id: 'conv_dr_arif',
    participant: MOCK_USERS[1],
    isOnline: true,
    unreadCount: 0,
    messages: [
      {
        id: 'm4',
        senderId: 'user_dr_arif',
        text: 'আজকের ঢাকা মেডিকেলের রক্তের রিকোয়ারমেন্ট আপডেট পেয়েছিলেন?',
        timestamp: 'দুপুর ১২:৩০',
        isDelivered: true,
        isSeen: true
      },
      {
        id: 'm5',
        senderId: 'current_user',
        text: 'হ্যাঁ ডাক্তার ভাই, ৩ জন রক্তদাতা ইতিমধ্যে হাসপাতালে পৌঁছে গেছেন।',
        timestamp: 'দুপুর ১২:৩২',
        isDelivered: true,
        isSeen: true
      }
    ]
  },
  {
    id: 'conv_tahmina',
    participant: MOCK_USERS[2],
    isOnline: false,
    lastActive: '১৫ মিনিট আগে',
    unreadCount: 0,
    messages: [
      {
        id: 'm6',
        senderId: 'user_tahmina',
        text: 'আগামী শুক্রবারের ভলান্টিয়ার মিটিং-এ আপনি উপস্থিত থাকতে পারবেন?',
        timestamp: 'গতকাল',
        isDelivered: true,
        isSeen: true
      }
    ]
  },
  {
    id: 'conv_rakib',
    participant: MOCK_USERS[3],
    isOnline: true,
    unreadCount: 0,
    messages: [
      {
        id: 'm7',
        senderId: 'user_rakib',
        text: 'ভাইয়া, রাজশাহীর ব্লাড ডোনার ক্লাবের নতুন তালিকা তৈরি করেছি।',
        timestamp: '২ দিন আগে',
        isDelivered: true,
        isSeen: true
      }
    ]
  }
];

export const MOCK_NOTIFICATIONS: NotificationItem[] = [
  {
    id: 'notif_1',
    type: 'emergency',
    actor: MOCK_USERS[1],
    title: 'জরুরি রক্তদানের আবেদন',
    description: 'ঢাকা মেডিকেলে জরুরি O+ রক্তের প্রয়োজন। বিস্তারিত দেখুন।',
    timestamp: '২৫ মিনিট আগে',
    isRead: false,
    targetId: 'post_emergency_blood'
  },
  {
    id: 'notif_2',
    type: 'reaction',
    actor: FOUNDER_USER,
    title: 'এস এন নাজমুল সরকার আপনার পোস্টে Love রিঅ্যাক্ট দিয়েছেন',
    description: '"মানবসেবার কোনো বিকল্প নেই..." পোস্টে প্রতিক্রিয়া জানিয়েছেন।',
    timestamp: '১ ঘণ্টা আগে',
    isRead: false
  },
  {
    id: 'notif_3',
    type: 'friend_req',
    actor: MOCK_USERS[4],
    title: 'সুমাইয়া জান্নাত আপনাকে বন্ধু হওয়ার অনুরোধ পাঠিয়েছেন',
    description: '৮টি সাধারণ বন্ধু রয়েছে।',
    timestamp: '৩ ঘণ্টা আগে',
    isRead: true
  },
  {
    id: 'notif_4',
    type: 'comment',
    actor: MOCK_USERS[2],
    title: 'তাহমিনা আক্তার আপনার মন্তব্যের উত্তর দিয়েছেন',
    description: '"অসংখ্য ধন্যবাদ আপনার আন্তরিক সহযোগিতার জন্য!"',
    timestamp: '৫ ঘণ্টা আগে',
    isRead: true
  }
];

export const MOCK_FRIEND_REQUESTS: FriendRequest[] = [
  {
    id: 'freq_1',
    user: MOCK_USERS[4],
    mutualFriends: 14,
    timestamp: 'আজ সকাল ৮:৩০'
  },
  {
    id: 'freq_2',
    user: {
      id: 'req_hasan',
      name: 'Engr. Hasan Mahmud',
      banglaName: 'প্রকৌশলী হাসান মাহমুদ',
      email: 'hasan.m@gmail.com',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&auto=format&fit=crop&q=80',
      coverPhoto: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1000&auto=format&fit=crop&q=80',
      bio: 'প্রযুক্তিপ্রেমী ও স্বেচ্ছাসেবী রক্তদাতা।',
      role: 'user',
      isVerified: false,
      location: 'গাজীপুর, বাংলাদেশ',
      phone: '01799887766',
      joinedDate: 'এপ্রিল ২০২৪',
      followersCount: 3200,
      followingCount: 150,
      friendsCount: 820
    },
    mutualFriends: 6,
    timestamp: 'গতকাল'
  }
];

export const MOCK_PAYOUTS: PayoutRequest[] = [
  {
    id: 'pay_1',
    creator: MOCK_USERS[2],
    amount: 15400,
    method: 'bKash',
    accountNumber: '01833445566',
    requestDate: '১০ নভেম্বর ২০২৪',
    status: 'pending'
  },
  {
    id: 'pay_2',
    creator: MOCK_USERS[1],
    amount: 22800,
    method: 'Nagad',
    accountNumber: '01711002233',
    requestDate: '০৮ নভেম্বর ২০২৪',
    status: 'approved'
  },
  {
    id: 'pay_3',
    creator: MOCK_USERS[3],
    amount: 8500,
    method: 'Rocket',
    accountNumber: '019223344558',
    requestDate: '০৫ নভেম্বর ২০২৪',
    status: 'approved'
  }
];

export const MOCK_REPORTS: UserReport[] = [
  {
    id: 'rep_1',
    reporter: MOCK_USERS[3],
    targetType: 'post',
    targetTitle: 'ভুয়া আর্থিক সহায়তার পোস্ট রিপোর্ট',
    reason: 'অযাচিত ভুয়া মোবাইল নম্বর দিয়ে টাকা দাবি করা হয়েছে।',
    timestamp: '২ ঘণ্টা আগে',
    status: 'pending'
  },
  {
    id: 'rep_2',
    reporter: MOCK_USERS[2],
    targetType: 'comment',
    targetTitle: 'অশ্লীল ও বিদ্বেষমূলক মন্তব্য',
    reason: 'কমিউনিটি নির্দেশিকা লঙ্ঘনকারী কটূক্তি।',
    timestamp: '৬ ঘণ্টা আগে',
    status: 'resolved'
  }
];
