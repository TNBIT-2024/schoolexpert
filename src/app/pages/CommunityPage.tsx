import { useState } from 'react';
import { Link } from 'react-router';
import { motion, AnimatePresence } from 'motion/react';
import {
  Heart,
  MessageCircle,
  Share2,
  Bookmark,
  Search,
  Bell,
  TrendingUp,
  Users,
  BookOpen,
  Star,
  MoreHorizontal,
  Image as ImageIcon,
  Smile,
  Send,
  ChevronRight,
  Award,
  Flame,
  Hash,
  ArrowLeft,
  PenSquare,
  X,
  Check,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { initialPosts, type ForumPost, type Comment } from '../data/communityData';
import logoImg from '../../../public/schoolexpert_logo.png';

// ── Types ─────────────────────────────────────────────────────────────────────
type Tab = 'trending' | 'latest' | 'following';

// ── Constants ─────────────────────────────────────────────────────────────────
const TRENDING_TOPICS = [
  { tag: 'Admissions2025', posts: '12.4K posts' },
  { tag: 'CBSE vs ICSE', posts: '8.1K posts' },
  { tag: 'DelhiSchools', posts: '6.7K posts' },
  { tag: 'OnlineEducation', posts: '5.2K posts' },
  { tag: 'SchoolFees', posts: '4.8K posts' },
];

const SUGGESTED_USERS = [
  { name: 'Meera Iyer',    handle: '@meera_i',  avatar: 'MI', color: 'from-violet-500 to-purple-500', role: 'Mumbai Parent' },
  { name: 'Suresh Pillai', handle: '@suresh_p', avatar: 'SP', color: 'from-blue-500 to-indigo-500',   role: 'Chennai Parent' },
  { name: 'Kavita Joshi',  handle: '@kavita_j', avatar: 'KJ', color: 'from-rose-500 to-pink-500',     role: 'Pune Parent' },
];

const CATEGORY_COLORS: Record<ForumPost['category'], string> = {
  'Admissions':     'text-blue-700 bg-blue-50 border-blue-200/60',
  'CBSE vs ICSE':   'text-purple-700 bg-purple-50 border-purple-200/60',
  'Syllabus':       'text-green-700 bg-green-50 border-green-200/60',
  'Extracurriculars': 'text-orange-700 bg-orange-50 border-orange-200/60',
  'General':        'text-slate-700 bg-slate-100 border-slate-200/60',
};

// ── Helper ────────────────────────────────────────────────────────────────────
function getInitials(nameOrEmail: string) {
  const name = nameOrEmail.split('@')[0];
  if (name.length <= 1) return name.toUpperCase();
  return (name[0] + name[name.length - 1]).toUpperCase();
}

function avatarGradient(initials: string) {
  const palettes = [
    'from-purple-500 to-pink-500',
    'from-blue-500 to-cyan-500',
    'from-amber-500 to-orange-500',
    'from-green-500 to-teal-500',
    'from-rose-500 to-red-500',
    'from-indigo-500 to-violet-500',
  ];
  const idx = (initials.charCodeAt(0) + (initials.charCodeAt(1) || 0)) % palettes.length;
  return palettes[idx];
}

// ── Micro Components ──────────────────────────────────────────────────────────
function AvatarBadge({
  initials,
  gradient,
  size = 'md',
}: {
  initials: string;
  gradient?: string;
  size?: 'sm' | 'md' | 'lg';
}) {
  const sz = { sm: 'w-8 h-8 text-xs', md: 'w-10 h-10 text-sm', lg: 'w-12 h-12 text-base' }[size];
  return (
    <div className={`${sz} rounded-full bg-gradient-to-br ${gradient ?? avatarGradient(initials)} flex items-center justify-center text-white font-bold flex-shrink-0`}>
      {initials}
    </div>
  );
}

// ── Comment Item ──────────────────────────────────────────────────────────────
function CommentItem({ comment }: { comment: Comment }) {
  return (
    <div className="flex gap-2.5 py-2.5 border-b border-slate-50 last:border-0">
      <AvatarBadge initials={comment.author.avatar ?? getInitials(comment.author.name)} size="sm" />
      <div className="flex-1 min-w-0">
        <div className="flex items-baseline gap-1.5 flex-wrap">
          <span className="text-xs font-bold text-slate-800">{comment.author.name}</span>
          <span className="text-xs text-slate-400">{comment.author.role}</span>
          <span className="text-xs text-slate-300">·</span>
          <span className="text-xs text-slate-400">{comment.timestamp}</span>
        </div>
        <p className="text-xs text-slate-600 leading-relaxed mt-0.5">{comment.content}</p>
      </div>
    </div>
  );
}

// ── Post Card ─────────────────────────────────────────────────────────────────
function PostCard({
  post,
  onLike,
}: {
  post: ForumPost & { liked: boolean; likeCount: number };
  onLike: (id: string) => void;
}) {
  const [bookmarked, setBookmarked]         = useState(false);
  const [showComments, setShowComments]     = useState(false);
  const [comment, setComment]               = useState('');
  const [localComments, setLocalComments]   = useState<Comment[]>(post.comments);

  const handleComment = () => {
    if (!comment.trim()) return;
    const newComment: Comment = {
      id: `local-${Date.now()}`,
      author: { name: 'You', role: 'Community Member', avatar: 'U' },
      content: comment.trim(),
      timestamp: 'Just now',
    };
    setLocalComments([...localComments, newComment]);
    setComment('');
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-2xl border border-slate-200/70 shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden"
    >
      <div className="p-5">
        {/* Author + Category */}
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-3">
            <AvatarBadge
              initials={post.author.avatar ?? getInitials(post.author.name)}
              size="md"
            />
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-bold text-slate-900 text-sm">{post.author.name}</span>
                <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
              </div>
              <div className="text-xs text-slate-400">{post.author.role} · {post.timestamp}</div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full border ${CATEGORY_COLORS[post.category]}`}>
              {post.category}
            </span>
            <button className="text-slate-300 hover:text-slate-500 p-0.5 transition-colors">
              <MoreHorizontal className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Title + Content */}
        <h3 className="font-bold text-slate-900 text-sm mb-1.5 leading-snug">{post.title}</h3>
        <p className="text-slate-600 text-sm leading-relaxed line-clamp-3">{post.content}</p>

        {/* Divider */}
        <div className="border-t border-slate-100 my-3" />

        {/* Actions */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-0.5">
            {/* Like */}
            <button
              onClick={() => onLike(post.id)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all duration-200 ${
                post.liked
                  ? 'text-red-600 bg-red-50'
                  : 'text-slate-500 hover:bg-slate-100 hover:text-slate-700'
              }`}
            >
              <Heart className={`w-4 h-4 ${post.liked ? 'fill-red-500 text-red-500' : ''}`} />
              <span>{post.likeCount}</span>
            </button>

            {/* Comment */}
            <button
              onClick={() => setShowComments(!showComments)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all duration-200 ${
                showComments ? 'text-amber-600 bg-amber-50' : 'text-slate-500 hover:bg-slate-100 hover:text-slate-700'
              }`}
            >
              <MessageCircle className="w-4 h-4" />
              <span>{localComments.length}</span>
            </button>

            {/* Share */}
            <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold text-slate-500 hover:bg-slate-100 hover:text-slate-700 transition-all duration-200">
              <Share2 className="w-4 h-4" />
            </button>
          </div>

          {/* Bookmark */}
          <button
            onClick={() => setBookmarked(!bookmarked)}
            className={`p-1.5 rounded-xl transition-all duration-200 ${
              bookmarked ? 'text-amber-600 bg-amber-50' : 'text-slate-400 hover:bg-slate-100 hover:text-slate-600'
            }`}
          >
            <Bookmark className={`w-4 h-4 ${bookmarked ? 'fill-amber-500' : ''}`} />
          </button>
        </div>

        {/* Comments Section */}
        <AnimatePresence>
          {showComments && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden"
            >
              <div className="mt-3 pt-3 border-t border-slate-100 space-y-0">
                {localComments.map((c) => (
                  <CommentItem key={c.id} comment={c} />
                ))}
              </div>

              {/* Comment Input */}
              <div className="mt-2 flex gap-2 items-center">
                <div className="w-7 h-7 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                  U
                </div>
                <div className="flex-1 flex items-center gap-2 bg-slate-50 rounded-xl px-3 py-2 border border-slate-200 focus-within:border-amber-300 transition-colors">
                  <input
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleComment()}
                    placeholder="Add a comment…"
                    className="flex-1 bg-transparent text-xs text-slate-700 focus:outline-none placeholder:text-slate-400"
                  />
                  <button
                    onClick={handleComment}
                    disabled={!comment.trim()}
                    className="text-amber-500 disabled:text-slate-300 hover:text-amber-600 transition-colors"
                  >
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

// ── Create Post Box ───────────────────────────────────────────────────────────
function CreatePostBox({
  userInitials,
  onSubmit,
}: {
  userInitials: string;
  onSubmit: (content: string, category: ForumPost['category'], title: string) => void;
}) {
  const [expanded, setExpanded] = useState(false);
  const [title,    setTitle]    = useState('');
  const [content,  setContent]  = useState('');
  const [category, setCategory] = useState<ForumPost['category']>('General');
  const [done,     setDone]     = useState(false);

  const categories: ForumPost['category'][] = ['General', 'Admissions', 'CBSE vs ICSE', 'Syllabus', 'Extracurriculars'];

  const handleSubmit = () => {
    if (!content.trim()) return;
    onSubmit(content.trim(), category, title.trim() || 'New Discussion');
    setTitle(''); setContent(''); setCategory('General');
    setDone(true);
    setTimeout(() => { setDone(false); setExpanded(false); }, 1800);
  };

  return (
    <div
      className={`bg-white rounded-2xl border shadow-sm transition-all duration-300 ${
        expanded ? 'border-amber-300 shadow-amber-50' : 'border-slate-200/70'
      }`}
    >
      {/* Collapsed trigger */}
      {!expanded && (
        <div
          className="flex items-center gap-3 p-4 cursor-text"
          onClick={() => setExpanded(true)}
        >
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center text-white text-sm font-bold flex-shrink-0">
            {userInitials}
          </div>
          <div className="flex-1 bg-slate-50 rounded-xl px-4 py-2.5 text-sm text-slate-400 border border-slate-100 select-none">
            Share your school experience or ask a question…
          </div>
          <button className="p-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-white transition-colors shadow-sm">
            <PenSquare className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Expanded form */}
      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="p-5"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center text-white text-sm font-bold flex-shrink-0">
                  {userInitials}
                </div>
                <div>
                  <div className="text-sm font-bold text-slate-800">You</div>
                  <div className="text-xs text-slate-400">Community Member</div>
                </div>
              </div>
              <button onClick={() => setExpanded(false)} className="text-slate-300 hover:text-slate-600 transition-colors">
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Category selector */}
            <div className="flex flex-wrap gap-2 mb-3">
              {categories.map((c) => (
                <button
                  key={c}
                  onClick={() => setCategory(c)}
                  className={`text-xs font-semibold px-3 py-1 rounded-full border transition-all duration-150 ${
                    category === c
                      ? 'bg-amber-500 text-white border-amber-500'
                      : 'text-slate-600 border-slate-200 hover:border-amber-300 hover:text-amber-700'
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>

            {/* Title */}
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Give your post a title (optional)"
              className="w-full text-sm font-semibold text-slate-800 placeholder:text-slate-300 placeholder:font-normal bg-transparent focus:outline-none mb-2 border-b border-slate-100 pb-2"
            />

            {/* Body */}
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Share your experience, ask a question, or give advice to the community…"
              rows={4}
              className="w-full text-sm text-slate-700 placeholder:text-slate-400 bg-slate-50 rounded-xl px-4 py-3 focus:outline-none focus:bg-white border border-slate-100 focus:border-amber-200 transition-all duration-200 resize-none"
            />

            {/* Bottom toolbar */}
            <div className="flex items-center justify-between mt-3 pt-3 border-t border-slate-100">
              <div className="flex items-center gap-1">
                <button className="p-2 text-slate-400 hover:text-amber-600 hover:bg-amber-50 rounded-lg transition-colors">
                  <ImageIcon className="w-4 h-4" />
                </button>
                <button className="p-2 text-slate-400 hover:text-amber-600 hover:bg-amber-50 rounded-lg transition-colors">
                  <Smile className="w-4 h-4" />
                </button>
                <button className="p-2 text-slate-400 hover:text-amber-600 hover:bg-amber-50 rounded-lg transition-colors">
                  <Hash className="w-4 h-4" />
                </button>
              </div>
              <button
                disabled={!content.trim()}
                onClick={handleSubmit}
                className={`flex items-center gap-2 px-5 py-2 text-xs font-bold rounded-xl transition-all duration-200 shadow-sm ${
                  done
                    ? 'bg-green-500 text-white'
                    : 'bg-amber-500 hover:bg-amber-600 disabled:bg-slate-200 disabled:text-slate-400 text-white disabled:cursor-not-allowed'
                }`}
              >
                {done ? <><Check className="w-3.5 h-3.5" /> Posted!</> : 'Post to Community'}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ── Main Page ─────────────────────────────────────────────────────────────────
export function CommunityPage() {
  const { currentUser, logOut } = useAuth();

  const [activeTab,    setActiveTab]    = useState<Tab>('trending');
  const [searchQuery,  setSearchQuery]  = useState('');
  const [followed,     setFollowed]     = useState<Record<string, boolean>>({});
  const [posts,        setPosts]        = useState<(ForumPost & { liked: boolean; likeCount: number })[]>(
    initialPosts.map((p) => ({ ...p, liked: p.likedByMe ?? false, likeCount: p.likes }))
  );

  const userName    = currentUser?.displayName || currentUser?.email || 'Guest';
  const userInitials = getInitials(userName);

  // Add a new post to the top of the feed
  const handleNewPost = (content: string, category: ForumPost['category'], title: string) => {
    const newPost: ForumPost & { liked: boolean; likeCount: number } = {
      id: `user-${Date.now()}`,
      title,
      content,
      author: {
        name: currentUser?.displayName || 'You',
        role: 'Community Member',
        avatar: userInitials,
      },
      category,
      likes: 0,
      likedByMe: false,
      liked: false,
      likeCount: 0,
      comments: [],
      timestamp: 'Just now',
    };
    setPosts([newPost, ...posts]);
  };

  // Toggle like on a post
  const handleLike = (id: string) => {
    setPosts((prev) =>
      prev.map((p) =>
        p.id === id
          ? { ...p, liked: !p.liked, likeCount: p.liked ? p.likeCount - 1 : p.likeCount + 1 }
          : p
      )
    );
  };

  // Filter by search
  const filteredPosts = posts.filter(
    (p) =>
      !searchQuery ||
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.content.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Sort
  const sortedPosts =
    activeTab === 'trending'
      ? [...filteredPosts].sort((a, b) => b.likeCount - a.likeCount)
      : activeTab === 'latest'
      ? [...filteredPosts]
      : filteredPosts; // 'following' — same for now

  return (
    <div className="min-h-screen bg-[#FAF6F0]">

      {/* ── Sticky Navbar ───────────────────────────────────────── */}
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-slate-200/60 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 gap-4">

            {/* Left */}
            <div className="flex items-center gap-3 flex-shrink-0">
              <Link to="/" className="flex items-center gap-1.5 text-slate-500 hover:text-amber-600 transition-colors">
                <ArrowLeft className="w-4 h-4" />
                <span className="text-xs font-semibold hidden sm:block">Home</span>
              </Link>
              <div className="w-px h-5 bg-slate-200" />
              <Link to="/">
                <img src={logoImg} alt="SchoolExpert" className="h-9 w-auto" style={{ filter: 'url(#remove-white)' }} />
              </Link>
              <span className="text-sm font-bold text-slate-800 hidden sm:block">Community</span>
            </div>

            {/* Search */}
            <div className="flex-1 max-w-sm hidden md:block">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search discussions…"
                  className="w-full pl-9 pr-4 py-2 bg-slate-100 rounded-xl text-sm text-slate-700 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-400/50 focus:bg-white transition-all"
                />
              </div>
            </div>

            {/* Right */}
            <div className="flex items-center gap-2 flex-shrink-0">
              <button className="p-2 rounded-xl text-slate-500 hover:bg-amber-50 hover:text-amber-600 transition-colors relative">
                <Bell className="w-5 h-5" />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full" />
              </button>

              {currentUser ? (
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center text-white text-xs font-bold">
                    {userInitials}
                  </div>
                  <button
                    onClick={() => logOut()}
                    className="hidden sm:block text-xs font-semibold text-slate-500 hover:text-red-600 transition-colors px-2 py-1 rounded-lg hover:bg-red-50"
                  >
                    Sign Out
                  </button>
                </div>
              ) : (
                <Link to="/signin">
                  <button className="px-4 py-1.5 bg-amber-500 hover:bg-amber-600 text-white text-xs font-bold rounded-xl transition-colors shadow-sm">
                    Sign In
                  </button>
                </Link>
              )}
            </div>

          </div>
        </div>
      </header>

      {/* ── Body ────────────────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex gap-6">

          {/* ── Left Sidebar ──────────────────────────────────── */}
          <aside className="hidden lg:flex flex-col gap-4 w-64 flex-shrink-0">

            {/* Profile Card */}
            <div className="bg-white rounded-2xl border border-slate-200/70 shadow-sm overflow-hidden">
              <div className="h-16 bg-gradient-to-r from-amber-400 via-orange-400 to-amber-500" />
              <div className="px-4 pb-4 -mt-7">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center text-white text-lg font-bold border-4 border-white shadow-md mb-2">
                  {userInitials}
                </div>
                <div className="font-bold text-slate-900 text-sm">
                  {currentUser ? (currentUser.displayName || 'Community Member') : 'Guest User'}
                </div>
                <div className="text-xs text-slate-400 mb-3 truncate">
                  {currentUser?.email || 'Sign in to join the conversation'}
                </div>
                {!currentUser && (
                  <Link to="/signin">
                    <button className="w-full py-2 bg-amber-500 hover:bg-amber-600 text-white text-xs font-bold rounded-xl transition-colors">
                      Join Community
                    </button>
                  </Link>
                )}
              </div>
            </div>

            {/* Navigation */}
            <div className="bg-white rounded-2xl border border-slate-200/70 shadow-sm p-3">
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider px-3 mb-2">Explore</p>
              {(
                [
                  { icon: Flame,      label: 'Trending',         tab: 'trending'  },
                  { icon: TrendingUp, label: 'Latest',           tab: 'latest'    },
                  { icon: Users,      label: 'Following',        tab: 'following' },
                  { icon: BookOpen,   label: 'School Reviews',   tab: null        },
                  { icon: Award,      label: 'Top Contributors', tab: null        },
                ] as const
              ).map(({ icon: Icon, label, tab }) => (
                <button
                  key={label}
                  onClick={() => tab && setActiveTab(tab)}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 ${
                    tab === activeTab
                      ? 'bg-amber-50 text-amber-700'
                      : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {label}
                </button>
              ))}
            </div>

            {/* Popular Tags */}
            <div className="bg-white rounded-2xl border border-slate-200/70 shadow-sm p-4">
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Popular Tags</p>
              <div className="flex flex-wrap gap-2">
                {['CBSE', 'ICSE', 'Delhi', 'Mumbai', 'Bangalore', 'Admissions', 'Fees', 'Teachers'].map((tag) => (
                  <button
                    key={tag}
                    onClick={() => setSearchQuery(tag)}
                    className="text-xs font-semibold text-amber-700 bg-amber-50 px-2.5 py-1 rounded-full border border-amber-100 hover:bg-amber-100 cursor-pointer transition-colors"
                  >
                    #{tag}
                  </button>
                ))}
              </div>
            </div>
          </aside>

          {/* ── Main Feed ─────────────────────────────────────── */}
          <main className="flex-1 min-w-0 space-y-4">

            {/* Tab Bar */}
            <div className="bg-white rounded-2xl border border-slate-200/70 shadow-sm p-1.5 flex gap-1">
              {(['trending', 'latest', 'following'] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`flex-1 py-2 text-xs font-bold rounded-xl capitalize transition-all duration-200 flex items-center justify-center gap-1.5 ${
                    activeTab === tab
                      ? 'bg-amber-500 text-white shadow-sm'
                      : 'text-slate-500 hover:bg-slate-100 hover:text-slate-700'
                  }`}
                >
                  {tab === 'trending'  && <Flame      className="w-3.5 h-3.5" />}
                  {tab === 'latest'    && <TrendingUp className="w-3.5 h-3.5" />}
                  {tab === 'following' && <Users      className="w-3.5 h-3.5" />}
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              ))}
            </div>

            {/* Create Post */}
            <CreatePostBox userInitials={userInitials} onSubmit={handleNewPost} />

            {/* Posts or sign-in prompt */}
            <AnimatePresence mode="popLayout">
              {activeTab === 'following' && !currentUser ? (
                <motion.div
                  key="signin-prompt"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="bg-white rounded-2xl border border-slate-200/70 shadow-sm p-12 text-center"
                >
                  <Users className="w-12 h-12 text-slate-300 mx-auto mb-4" />
                  <h3 className="font-bold text-slate-700 text-lg mb-2">Sign in to see your feed</h3>
                  <p className="text-slate-500 text-sm mb-5">
                    Follow other parents and schools to personalise your community feed.
                  </p>
                  <Link to="/signin">
                    <button className="px-6 py-2.5 bg-amber-500 hover:bg-amber-600 text-white text-sm font-bold rounded-xl transition-colors shadow-sm">
                      Sign In
                    </button>
                  </Link>
                </motion.div>
              ) : sortedPosts.length === 0 ? (
                <motion.div
                  key="empty"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="bg-white rounded-2xl border border-slate-200/70 shadow-sm p-12 text-center"
                >
                  <Search className="w-10 h-10 text-slate-300 mx-auto mb-3" />
                  <p className="text-slate-500 text-sm">No discussions matched your search.</p>
                  <button onClick={() => setSearchQuery('')} className="mt-3 text-xs text-amber-600 font-semibold hover:underline">
                    Clear search
                  </button>
                </motion.div>
              ) : (
                sortedPosts.map((post) => (
                  <PostCard key={post.id} post={post} onLike={handleLike} />
                ))
              )}
            </AnimatePresence>

            {/* Load More */}
            {sortedPosts.length > 0 && (
              <button className="w-full py-3 bg-white rounded-2xl border border-slate-200/70 shadow-sm text-sm font-semibold text-slate-500 hover:text-amber-600 hover:border-amber-200 transition-all duration-200">
                Load more discussions →
              </button>
            )}
          </main>

        </div>
      </div>
    </div>
  );
}
