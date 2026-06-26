import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router';
import { motion, AnimatePresence } from 'motion/react';
import {
  Heart,
  MessageCircle,
  Share2,
  Bookmark,
  Search,
  TrendingUp,
  Users,
  BookOpen,
  Star,
  MoreHorizontal,
  Image as ImageIcon,
  Smile,
  Send,
  Award,
  Flame,
  Hash,
  PenSquare,
  X,
  Check,
  ArrowLeft,
  HomeIcon,
  Trash2,
  Flag,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { initialPosts, type ForumPost, type Comment, type ChatMessage } from '../data/communityData';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { supabase } from '../../lib/supabase';
import { toast } from 'sonner';

const logoImg = '/schoolexpert_logo.png';

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

// ── Helpers ────────────────────────────────────────────────────────────────────
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

function formatRelativeTime(timestampStr: string) {
  const date = new Date(timestampStr);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffSec = Math.floor(diffMs / 1000);
  const diffMin = Math.floor(diffSec / 60);
  const diffHr = Math.floor(diffMin / 60);
  const diffDays = Math.floor(diffHr / 24);

  if (diffSec < 60) return 'Just now';
  if (diffMin < 60) return `${diffMin}m ago`;
  if (diffHr < 24) return `${diffHr}h ago`;
  if (diffDays === 1) return 'Yesterday';
  if (diffDays < 7) return `${diffDays}d ago`;
  return date.toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' });
}

// ── Micro Components ──────────────────────────────────────────────────────────
function AvatarBadge({
  initials,
  gradient,
  size = 'md',
  avatarUrl,
}: {
  initials: string;
  gradient?: string;
  size?: 'sm' | 'md' | 'lg';
  avatarUrl?: string;
}) {
  const sz = { sm: 'w-8 h-8 text-[10px]', md: 'w-10 h-10 text-xs', lg: 'w-12 h-12 text-sm' }[size];
  if (avatarUrl) {
    return (
      <img
        src={avatarUrl}
        alt="Avatar"
        className={`${sz} rounded-full object-cover flex-shrink-0 border border-slate-200/50`}
      />
    );
  }
  return (
    <div className={`${sz} rounded-full bg-gradient-to-br ${gradient ?? avatarGradient(initials)} flex items-center justify-center text-white font-bold flex-shrink-0`}>
      {initials}
    </div>
  );
}

// ── Helpers for checking URL ──────────────────────────────────────────────────
const isAvatarUrl = (str?: string) => str?.startsWith('http://') || str?.startsWith('https://');

// ── Comment Item ──────────────────────────────────────────────────────────────
function CommentItem({ comment }: { comment: Comment }) {
  return (
    <div className="flex gap-2.5 py-2.5 border-b border-slate-50 last:border-0">
      <AvatarBadge 
        initials={isAvatarUrl(comment.author.avatar) ? getInitials(comment.author.name) : (comment.author.avatar ?? getInitials(comment.author.name))} 
        avatarUrl={isAvatarUrl(comment.author.avatar) ? comment.author.avatar : undefined}
        size="sm" 
      />
      <div className="flex-1 min-w-0">
        <div className="flex items-baseline gap-1.5 flex-wrap">
          <span className="text-xs font-bold text-slate-800">{comment.author.name}</span>
          <span className="text-[10px] text-slate-400">{comment.author.role}</span>
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
  onComment,
  onDelete,
  currentUser,
}: {
  post: ForumPost & { liked: boolean; likeCount: number; authorId?: string };
  onLike: (id: string) => void;
  onComment: (postId: string, content: string) => Promise<void>;
  onDelete: (id: string) => void;
  currentUser: any;
}) {
  const [bookmarked, setBookmarked]         = useState(false);
  const [showComments, setShowComments]     = useState(false);
  const [comment, setComment]               = useState('');
  const [localComments, setLocalComments]   = useState<Comment[]>(post.comments);
  const [showDropdown, setShowDropdown]     = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const [isExpanded, setIsExpanded]         = useState(false);

  const isLongContent = post.content.length > 250 || post.content.split('\n').length > 3;

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
      }
    }
    if (showDropdown) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showDropdown]);

  useEffect(() => {
    setLocalComments(post.comments);
  }, [post.comments]);

  const handleComment = async () => {
    if (!comment.trim()) return;
    if (!currentUser) {
      alert('You must be signed in to join the conversation.');
      return;
    }
    const commentText = comment.trim();
    setComment('');

    // Optimistic comment insert
    const tempComment: Comment = {
      id: `temp-${Date.now()}`,
      author: {
        name: currentUser.displayName || currentUser.email || 'You',
        role: currentUser.user_metadata?.user_type || 'Parent',
        avatar: getInitials(currentUser.displayName || currentUser.email || 'U'),
      },
      content: commentText,
      timestamp: 'Just now',
    };
    setLocalComments((prev) => [...prev, tempComment]);

    try {
      await onComment(post.id, commentText);
    } catch (err) {
      // Revert if error
      setLocalComments((prev) => prev.filter((c) => c.id !== tempComment.id));
    }
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-card/80 backdrop-blur-md rounded-2xl border border-slate-200/50 shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden"
    >
      <div className="p-5">
        {/* Author + Category */}
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-3">
            <AvatarBadge
              initials={isAvatarUrl(post.author.avatar) ? getInitials(post.author.name) : (post.author.avatar ?? getInitials(post.author.name))}
              avatarUrl={isAvatarUrl(post.author.avatar) ? post.author.avatar : undefined}
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
          <div className="flex items-center gap-2 relative">
            <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full border ${CATEGORY_COLORS[post.category]}`}>
              {post.category}
            </span>
            <button
              onClick={() => setShowDropdown(!showDropdown)}
              className="text-slate-300 hover:text-slate-500 p-0.5 transition-colors cursor-pointer"
            >
              <MoreHorizontal className="w-4 h-4" />
            </button>
            {showDropdown && (
              <div
                ref={dropdownRef}
                className="absolute right-0 top-7 w-36 bg-white border border-slate-200 rounded-xl shadow-lg z-50 py-1 px-1.5 animate-in fade-in duration-100"
              >
                {currentUser && post.authorId === currentUser.id ? (
                  <button
                    onClick={() => {
                      setShowDropdown(false);
                      onDelete(post.id);
                    }}
                    className="w-full flex items-center gap-2 px-2.5 py-2 rounded-lg text-xs font-bold text-red-650 hover:bg-red-50 transition-all duration-150 text-left cursor-pointer text-red-600 hover:text-red-700 hover:bg-red-50"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    Delete Post
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      setShowDropdown(false);
                      alert('Thank you for reporting. Our moderation team will review this post.');
                    }}
                    className="w-full flex items-center gap-2 px-2.5 py-2 rounded-lg text-xs font-semibold text-slate-650 hover:bg-slate-50 transition-all duration-150 text-left cursor-pointer text-slate-600"
                  >
                    <Flag className="w-3.5 h-3.5 text-slate-400" />
                    Report Post
                  </button>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Title + Content */}
        <h3 className="font-bold text-slate-900 text-sm mb-1.5 leading-snug">{post.title}</h3>
        <p className={`text-slate-600 text-sm leading-relaxed whitespace-pre-line ${isExpanded ? '' : 'line-clamp-3'}`}>{post.content}</p>
        {isLongContent && (
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-amber-600 hover:text-amber-700 text-xs font-bold mt-1.5 mb-1 transition-colors focus:outline-none cursor-pointer"
          >
            {isExpanded ? 'See less' : 'See more'}
          </button>
        )}

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
                {currentUser?.avatarUrl ? (
                  <img
                    src={currentUser.avatarUrl}
                    alt="Profile"
                    className="w-7 h-7 rounded-full object-cover flex-shrink-0 border border-slate-200/50"
                  />
                ) : (
                  <div className="w-7 h-7 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                    {currentUser ? getInitials(currentUser.displayName || currentUser.email) : 'G'}
                  </div>
                )}
                <div className="flex-1 flex items-center gap-2 bg-slate-50 rounded-xl px-3 py-2 border border-slate-200 focus-within:border-amber-300 transition-colors">
                  <input
                    value={comment}
                    disabled={!currentUser}
                    onChange={(e) => setComment(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleComment()}
                    placeholder={currentUser ? "Add a comment…" : "Sign in to reply"}
                    className="flex-1 bg-transparent text-xs text-slate-700 focus:outline-none placeholder:text-slate-400 disabled:cursor-not-allowed"
                  />
                  <button
                    onClick={handleComment}
                    disabled={!comment.trim() || !currentUser}
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
  avatarUrl,
  onSubmit,
  disabled = false,
}: {
  userInitials: string;
  avatarUrl?: string;
  onSubmit: (content: string, category: ForumPost['category'], title: string) => void;
  disabled?: boolean;
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
      className={`bg-card/80 backdrop-blur-md rounded-2xl border transition-all duration-300 shadow-sm ${
        expanded ? 'border-amber-500/55 shadow-amber-500/5' : 'border-slate-200/50'
      }`}
    >
      {/* Collapsed trigger */}
      {!expanded && (
        <div
          className="flex items-center gap-3 p-4 cursor-text"
          onClick={() => !disabled && setExpanded(true)}
        >
          {avatarUrl ? (
            <img
              src={avatarUrl}
              alt="Avatar"
              className="w-10 h-10 rounded-full object-cover flex-shrink-0 border border-slate-200/50"
            />
          ) : (
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center text-white text-sm font-bold flex-shrink-0">
              {userInitials}
            </div>
          )}
          <div className="flex-1 bg-slate-50 rounded-xl px-4 py-2.5 text-sm text-slate-400 border border-slate-100 select-none">
            {disabled ? 'Sign in to share your experience or ask a question…' : 'Share your school experience or ask a question…'}
          </div>
          <div className="flex flex-col items-center gap-1 flex-shrink-0">
            <button
              disabled={disabled}
              className="p-2.5 rounded-full bg-amber-500 hover:bg-amber-600 text-white transition-colors shadow-sm disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
            >
              <PenSquare className="w-4 h-4" />
            </button>
            <span className="text-[10px] font-bold text-amber-500 select-none">New Post</span>
          </div>
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
                {avatarUrl ? (
                  <img
                    src={avatarUrl}
                    alt="Avatar"
                    className="w-10 h-10 rounded-full object-cover flex-shrink-0 border border-slate-200/50"
                  />
                ) : (
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center text-white text-sm font-bold flex-shrink-0">
                    {userInitials}
                  </div>
                )}
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
              className="w-full text-sm text-slate-700 placeholder:text-slate-400 bg-slate-100/50 focus:bg-white rounded-xl px-4 py-3 focus:outline-none border border-slate-200/50 focus:border-amber-500/35 transition-all duration-200 resize-none"
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

// ── Gemini Content Moderation ──────────────────────────────────────────────────
const moderateContent = async (text: string, title?: string, toastId?: string | number): Promise<boolean> => {
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY || '';
  if (!apiKey) {
    console.warn("⚠️ VITE_GEMINI_API_KEY is not configured. Content moderation is bypassed.");
    return true;
  }
  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1/models/gemini-2.5-flash:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: `You are a strict content moderation system for a parent education community platform. Analyze the following user input for harmful, hateful, abusive, offensive, profane, cyberbullying, or highly inappropriate language.

${title ? `Input Title: "${title}"` : ''}
Input Content: "${text}"

If the input contains harmful, hateful, or abusive language, respond with exactly "BLOCKED". If the input is safe and appropriate for a helpful community of parents, respond with exactly "ALLOWED". Respond with ONLY one of these two words, with no markdown, punctuation, or other explanation.`
            }]
          }],
          generationConfig: {
            temperature: 0,
            maxOutputTokens: 200
          }
        })
      }
    );
    const data = await response.json();
    
    if (data.error) {
      console.error('Gemini API Error:', data.error);
      const errMsg = `Moderation check failed: ${data.error.message}`;
      if (toastId) {
        toast.error(errMsg, { id: toastId });
      } else {
        toast.error(errMsg);
      }
      return false; // Block on API errors
    }
    
    const resultText = data.candidates?.[0]?.content?.parts?.[0]?.text?.trim() || 'ALLOWED';
    console.log('Gemini Moderation Result:', resultText);
    
    const isSafe = !resultText.toUpperCase().includes('BLOCKED');
    if (!isSafe) {
      const blockedMsg = title
        ? 'Post blocked: Your content was flagged for harmful, hateful, or abusive language.'
        : 'Comment blocked: Your content was flagged for harmful, hateful, or abusive language.';
      if (toastId) {
        toast.error(blockedMsg, { id: toastId });
      } else {
        toast.error(blockedMsg);
      }
    }
    return isSafe;
  } catch (err: any) {
    console.error('Moderation API error:', err);
    const connErrMsg = `Moderation connection error: ${err.message}`;
    if (toastId) {
      toast.error(connErrMsg, { id: toastId });
    } else {
      toast.error(connErrMsg);
    }
    return false; // Block on network/connection errors
  }
};

// ── Main Page ─────────────────────────────────────────────────────────────────
export function CommunityPage() {
  const { currentUser } = useAuth();

  const [activeTab,    setActiveTab]    = useState<Tab>('trending');
  const [searchQuery,  setSearchQuery]  = useState('');
  const [loading,      setLoading]      = useState(true);
  const [error,        setError]        = useState<string | null>(null);
  const [posts,        setPosts]        = useState<(ForumPost & { liked: boolean; likeCount: number; authorId?: string })[]>([]);
  


  const userName    = currentUser?.displayName || currentUser?.email || 'Guest';
  const userInitials = getInitials(userName);

  // Fetch posts from Supabase (with joined comments and likes)
  const fetchPosts = async () => {
    try {
      const { data, error: postErr } = await supabase
        .from('forum_posts')
        .select(`
          id,
          title,
          content,
          category,
          author_id,
          author_name,
          author_role,
          author_avatar,
          created_at,
          profiles (
            avatar_url,
            name,
            user_type
          ),
          forum_likes (user_id),
          forum_comments (
            id,
            content,
            created_at,
            author_id,
            author_name,
            author_role,
            author_avatar,
            profiles (
              avatar_url,
              name,
              user_type
            )
          )
        `)
        .order('created_at', { ascending: false });

      if (postErr) throw postErr;

      if (data) {
        const mappedPosts = data.map((post: any) => {
          const likes = post.forum_likes || [];
          const comments = post.forum_comments || [];
          const likedByMe = currentUser ? likes.some((l: any) => l.user_id === currentUser.id) : false;
          
          const postProfile = (post.profiles as any) || {};
          const postAvatar = postProfile.avatar_url || post.author_avatar || getInitials(post.author_name);
          const postName = postProfile.name || post.author_name;
          const postRole = postProfile.user_type || post.author_role || 'Parent';

          return {
            id: post.id,
            title: post.title,
            content: post.content,
            category: post.category as ForumPost['category'],
            authorId: post.author_id,
            author: {
              name: postName,
              role: postRole,
              avatar: postAvatar,
            },
            likes: likes.length,
            likedByMe,
            liked: likedByMe,
            likeCount: likes.length,
            timestamp: formatRelativeTime(post.created_at),
            comments: comments.map((c: any) => {
              const cProfile = (c.profiles as any) || {};
              const cAvatar = cProfile.avatar_url || c.author_avatar || getInitials(c.author_name);
              const cName = cProfile.name || c.author_name;
              const cRole = cProfile.user_type || c.author_role || 'Community Member';
              return {
                id: c.id,
                author: {
                  name: cName,
                  role: cRole,
                  avatar: cAvatar,
                },
                content: c.content,
                timestamp: formatRelativeTime(c.created_at),
                created_at: c.created_at,
              };
            }).sort((a: any, b: any) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime()),
          };
        });
        setPosts(mappedPosts);
      }
      setError(null);
    } catch (err: any) {
      console.error('Error fetching posts:', err);
      setError(err.message || 'Failed to load posts.');
    } finally {
      setLoading(false);
    }
  };

  // Listen to Postgres real-time events for Posts, Likes, Comments
  useEffect(() => {
    fetchPosts();

    const channel = supabase
      .channel('forum-realtime')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'forum_posts' }, () => {
        fetchPosts();
      })
      .on('postgres_changes', { event: '*', schema: 'public', table: 'forum_likes' }, () => {
        fetchPosts();
      })
      .on('postgres_changes', { event: '*', schema: 'public', table: 'forum_comments' }, () => {
        fetchPosts();
      })
      .subscribe();

    return () => {
      channel.unsubscribe();
    };
  }, [currentUser]);

  // Create a new Post in Supabase
  const handleNewPost = async (content: string, category: ForumPost['category'], title: string) => {
    if (!currentUser) {
      alert('You must be signed in to post in the community.');
      return;
    }

    const toastId = toast.loading('Verifying post safety...');
    const isSafe = await moderateContent(content, title, toastId);
    
    if (!isSafe) {
      return;
    }
    
    try {
      const { error: insertErr } = await supabase
        .from('forum_posts')
        .insert({
          title,
          content,
          category,
          author_id: currentUser.id,
          author_name: currentUser.displayName || currentUser.email || 'Anonymous',
          author_role: currentUser.user_metadata?.user_type || 'Parent',
          author_avatar: currentUser.avatarUrl || getInitials(currentUser.displayName || currentUser.email || 'A')
        });

      if (insertErr) throw insertErr;
      toast.success('Post published successfully!', { id: toastId });
      fetchPosts();
    } catch (err: any) {
      console.error('Error creating post:', err);
      toast.error(err.message || 'Failed to create post', { id: toastId });
    }
  };

  // Toggle Post Like
  const handleLike = async (id: string) => {
    if (!currentUser) {
      alert('You must be signed in to like posts.');
      return;
    }

    const post = posts.find((p) => p.id === id);
    if (!post) return;

    const liked = post.liked;

    // Optimistic Update
    setPosts((prev) =>
      prev.map((p) =>
        p.id === id
          ? { ...p, liked: !liked, likeCount: liked ? p.likeCount - 1 : p.likeCount + 1 }
          : p
      )
    );

    try {
      if (liked) {
        const { error: deleteErr } = await supabase
          .from('forum_likes')
          .delete()
          .match({ post_id: id, user_id: currentUser.id });
        if (deleteErr) throw deleteErr;
      } else {
        const { error: insertErr } = await supabase
          .from('forum_likes')
          .insert({ post_id: id, user_id: currentUser.id });
        if (insertErr) throw insertErr;
      }
    } catch (err: any) {
      console.error('Error toggling like:', err);
      // Revert Optimistic Update
      setPosts((prev) =>
        prev.map((p) =>
          p.id === id
            ? { ...p, liked, likeCount: liked ? p.likeCount + 1 : p.likeCount - 1 }
            : p
        )
      );
    }
  };

  // Add Comment to Post in Supabase
  const handleNewComment = async (postId: string, content: string) => {
    if (!currentUser) {
      alert('You must be signed in to reply.');
      return;
    }

    const toastId = toast.loading('Verifying reply safety...');
    const isSafe = await moderateContent(content, undefined, toastId);
    
    if (!isSafe) {
      throw new Error('Comment content blocked');
    }

    try {
      const { error: commentErr } = await supabase
        .from('forum_comments')
        .insert({
          post_id: postId,
          content,
          author_id: currentUser.id,
          author_name: currentUser.displayName || currentUser.email || 'Anonymous',
          author_role: currentUser.user_metadata?.user_type || 'Parent',
          author_avatar: currentUser.avatarUrl || getInitials(currentUser.displayName || currentUser.email || 'A')
        });

      if (commentErr) throw commentErr;
      toast.success('Reply posted successfully!', { id: toastId });
      fetchPosts();
    } catch (err: any) {
      console.error('Error adding comment:', err);
      toast.error(err.message || 'Failed to add comment', { id: toastId });
      throw err;
    }
  };

  // Delete Post from Supabase
  const handleDeletePost = async (postId: string) => {
    if (!currentUser) {
      alert('You must be signed in to delete posts.');
      return;
    }

    if (!window.confirm('Are you sure you want to delete this post? This will also remove all its comments and likes.')) {
      return;
    }

    try {
      const { error: deleteErr } = await supabase
        .from('forum_posts')
        .delete()
        .match({ id: postId, author_id: currentUser.id });

      if (deleteErr) throw deleteErr;

      // Update local state
      setPosts((prev) => prev.filter((p) => p.id !== postId));
      alert('Post deleted successfully!');
    } catch (err: any) {
      console.error('Error deleting post:', err);
      alert(err.message || 'Failed to delete post.');
    }
  };



  // Filter posts based on Search Query
  const filteredPosts = posts.filter(
    (p) =>
      !searchQuery ||
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Sort posts depending on selected tab
  const sortedPosts =
    activeTab === 'trending'
      ? [...filteredPosts].sort((a, b) => b.likeCount - a.likeCount)
      : activeTab === 'latest'
      ? [...filteredPosts]
      : filteredPosts; // 'following' - placeholder matching

  return (
    <div className="min-h-screen bg-transparent flex flex-col justify-between">
      {/* Simplified Top Navigation Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-card/85 backdrop-blur-lg border-b border-slate-200/50 shadow-sm">
        <div className="max-w-[1600px] w-full mx-auto px-6 md:px-12 lg:px-16 flex items-center justify-between h-24">
          {/* Logo */}
          <div className="flex-1 flex justify-start">
            <Link to="/" className="flex items-center">
              <img 
                src={logoImg} 
                alt="The School Expert" 
                className="h-16 md:h-20 w-auto object-contain transition-transform duration-300 hover:scale-105" 
                style={{ filter: 'url(#remove-white)' }} 
              />
            </Link>
          </div>
          
          {/* Go back to Home */}
          <div className="flex-1 flex justify-end items-center gap-3">
            <Link
              to="/get-started?type=school"
              state={{ userType: 'school' }}
              className="inline-flex items-center gap-2 text-xs font-bold text-slate-100 bg-amber-500 hover:bg-amber-600 px-4 py-2.5 rounded-full transition-all duration-200 cursor-pointer shadow-sm"
            >
              <Users className='w-4 h-4' />
              Add your child's school to our Database
            </Link>
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-xs font-bold text-amber-700 bg-amber-600/10 hover:bg-amber-600/20 px-4 py-2.5 rounded-full border border-amber-600/20 transition-all duration-200 cursor-pointer shadow-sm"
            >
              <HomeIcon className="w-4 h-4" />
              Go back to Home
            </Link>
          </div>
        </div>
      </header>

      {/* ── Body ────────────────────────────────────────────────── */}
      <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-16 flex-grow">

        <div className="flex gap-6 items-start">

          {/* ── Left Sidebar ──────────────────────────────────── */}
          <aside className="hidden lg:flex flex-col gap-4 w-64 flex-shrink-0">

            {/* Profile Card */}
            <div className="bg-card/85 backdrop-blur-md rounded-2xl border border-slate-200/50 shadow-sm overflow-hidden">
              <div className="h-16 bg-gradient-to-r from-amber-500 via-primary to-amber-600" />
              <div className="px-4 pb-4 -mt-7">
                {currentUser?.avatarUrl ? (
                  <img
                    src={currentUser.avatarUrl}
                    alt="Profile"
                    className="w-14 h-14 rounded-2xl object-cover border-4 border-white shadow-md mb-2 flex-shrink-0"
                  />
                ) : (
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center text-white text-lg font-bold border-4 border-white shadow-md mb-2">
                    {userInitials}
                  </div>
                )}
                <div className="font-bold text-slate-900 text-sm">
                  {currentUser ? (currentUser.displayName || 'Community Member') : 'Guest User'}
                </div>
                <div className="text-xs text-slate-400 mb-3 truncate">
                  {currentUser?.email || 'Sign in to join the conversation'}
                </div>
                {!currentUser && (
                  <Link to="/signin">
                    <button className="w-full py-2 bg-amber-500 hover:bg-amber-600 text-white text-xs font-bold rounded-xl transition-colors shadow-sm cursor-pointer">
                      Join Community
                    </button>
                  </Link>
                )}
              </div>
            </div>

            {/* Navigation */}
            <div className="bg-card/85 backdrop-blur-md rounded-2xl border border-slate-200/50 shadow-sm p-3.5 space-y-1">
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider px-3 mb-2">Explore</p>
              {(
                [
                  { icon: Flame,         label: 'Trending',         tab: 'trending'  },
                  { icon: TrendingUp,    label: 'Latest',           tab: 'latest'    },
                  { icon: Users,         label: 'Following',        tab: 'following' },
                  { icon: BookOpen,      label: 'School Reviews',   tab: null        },
                  { icon: Award,         label: 'Top Contributors', tab: null        },
                ] as const
              ).map(({ icon: Icon, label, tab }) => (
                <button
                  key={label}
                  onClick={() => tab && setActiveTab(tab)}
                  className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 cursor-pointer ${
                    tab === activeTab
                      ? 'bg-amber-600/10 text-amber-700 font-bold'
                      : 'text-slate-600 hover:bg-amber-600/5 hover:text-slate-900'
                  }`}
                >
                  <Icon className="w-4 h-4 text-amber-600" />
                  {label}
                </button>
              ))}
            </div>

            {/* Popular Tags */}
            <div className="bg-card/85 backdrop-blur-md rounded-2xl border border-slate-200/50 shadow-sm p-4">
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Popular Tags</p>
              <div className="flex flex-wrap gap-2">
                {['CBSE', 'ICSE', 'Delhi', 'Mumbai', 'Bangalore', 'Admissions', 'Fees', 'Teachers'].map((tag) => (
                  <button
                    key={tag}
                    onClick={() => {
                      setSearchQuery(tag);
                    }}
                    className="text-xs font-bold text-amber-700 bg-amber-600/10 px-2.5 py-1 rounded-full border border-amber-600/20 hover:bg-amber-600/20 cursor-pointer transition-all duration-200"
                  >
                    #{tag}
                  </button>
                ))}
              </div>
            </div>
          </aside>

          {/* ── Main Feed ─────────────────────────────────────── */}
          <main className="flex-1 min-w-0 space-y-4">

            {/* Search Bar */}
            <div className="relative bg-card/85 backdrop-blur-md rounded-2xl border border-slate-200/50 shadow-sm p-3.5 flex items-center gap-3 animate-element">
              <Search className="w-4 h-4 text-slate-400 flex-shrink-0" />
              <input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search discussions by topic, tags, or content..."
                className="flex-1 bg-transparent border-0 text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-0"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="p-1 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-700 transition-colors cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Tab Bar */}
            <div className="bg-card/85 backdrop-blur-md rounded-2xl border border-slate-200/50 shadow-sm p-1.5 flex gap-1">
              {(['trending', 'latest', 'following'] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`flex-1 py-2 text-xs font-bold rounded-xl capitalize transition-all duration-200 flex items-center justify-center gap-1.5 cursor-pointer ${
                    activeTab === tab
                      ? 'bg-amber-600 text-white shadow-sm'
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

            {/* Create Post Box */}
            <CreatePostBox
              userInitials={userInitials}
              avatarUrl={currentUser?.avatarUrl}
              onSubmit={handleNewPost}
              disabled={!currentUser}
            />

            {/* Posts Feed or Loader */}
            {loading ? (
              <div className="flex flex-col items-center justify-center py-20 text-slate-400 text-sm gap-2 bg-card/85 backdrop-blur-md rounded-2xl border border-slate-200/50 shadow-sm animate-element">
                <div className="w-7 h-7 border-2 border-amber-500 border-t-transparent rounded-full animate-spin" />
                Loading community discussions...
              </div>
            ) : error ? (
              <div className="p-8 text-center bg-red-50 text-red-650 rounded-2xl border border-red-200 animate-element">
                <p className="font-semibold text-sm">Failed to load discussions</p>
                <p className="text-xs text-red-500 mt-1">{error}</p>
                <button
                  onClick={fetchPosts}
                  className="mt-3 text-xs font-bold text-amber-700 bg-amber-600/10 px-3.5 py-1.5 rounded-full border border-amber-600/20 hover:bg-amber-600/20 transition-all cursor-pointer"
                >
                  Try Again
                </button>
              </div>
            ) : activeTab === 'following' && !currentUser ? (
              <motion.div
                key="signin-prompt"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="bg-card/85 backdrop-blur-md rounded-2xl border border-slate-200/50 shadow-sm p-12 text-center animate-element"
              >
                <Users className="w-12 h-12 text-slate-300 mx-auto mb-4" />
                <h3 className="font-bold text-slate-700 text-lg mb-2">Sign in to see your feed</h3>
                <p className="text-slate-500 text-sm mb-5">
                  Follow other parents and schools to personalise your community feed.
                </p>
                <Link to="/signin">
                  <button className="px-6 py-2.5 bg-amber-500 hover:bg-amber-600 text-white text-sm font-bold rounded-xl transition-colors shadow-sm cursor-pointer">
                    Sign In
                  </button>
                </Link>
              </motion.div>
            ) : sortedPosts.length === 0 ? (
              <motion.div
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="bg-card/85 backdrop-blur-md rounded-2xl border border-slate-200/50 shadow-sm p-12 text-center animate-element"
              >
                <Search className="w-10 h-10 text-slate-300 mx-auto mb-3" />
                <p className="text-slate-500 text-sm">No discussions matched your search.</p>
                <button onClick={() => setSearchQuery('')} className="mt-3 text-xs text-amber-600 font-bold hover:underline cursor-pointer">
                  Clear search
                </button>
              </motion.div>
            ) : (
              <AnimatePresence mode="popLayout">
                {sortedPosts.map((post) => (
                  <PostCard
                    key={post.id}
                    post={post}
                    onLike={handleLike}
                    onComment={handleNewComment}
                    onDelete={handleDeletePost}
                    currentUser={currentUser}
                  />
                ))}
              </AnimatePresence>
            )}

            {/* Load More */}
            {/* {!loading && !error && sortedPosts.length > 0 && (
              <button
                onClick={fetchPosts}
                className="w-full py-3 bg-card/80 backdrop-blur-md rounded-2xl border border-slate-200/50 shadow-sm text-sm font-bold text-slate-500 hover:text-amber-650 hover:border-amber-500/40 hover:bg-card/95 transition-all duration-200 cursor-pointer text-center"
              >
                Refresh discussions ↺
              </button>
            )} */}
          </main>

        </div>
      </div>
      <Footer />
    </div>
  );
}
