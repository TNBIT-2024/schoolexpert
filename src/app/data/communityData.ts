export interface Comment {
  id: string;
  author: {
    name: string;
    role: string;
    avatar?: string;
  };
  content: string;
  timestamp: string;
}

export interface ChatMessage {
  id: string;
  user_id: string | null;
  user_name: string;
  user_role: string;
  user_avatar: string;
  content: string;
  created_at: string;
}

export interface ForumPost {
  id: string;
  title: string;
  content: string;
  author: {
    name: string;
    role: string;
    avatar?: string;
  };
  category: 'Admissions' | 'CBSE vs ICSE' | 'Syllabus' | 'Extracurriculars' | 'General';
  likes: number;
  likedByMe?: boolean;
  comments: Comment[];
  timestamp: string;
}

export const initialPosts: ForumPost[] = [
  {
    id: 'post-1',
    title: 'CBSE vs ICSE for primary school in Bangalore?',
    content: 'We are moving to Bangalore next month and looking for a primary school for our 6-year-old. I am confused between CBSE and ICSE boards. CBSE seems better for future national competitive exams, but ICSE focuses heavily on English language and literature. Any suggestions based on your experiences?',
    author: {
      name: 'Rohan Sharma',
      role: 'Parent of 1 child',
      avatar: 'RS',
    },
    category: 'CBSE vs ICSE',
    likes: 24,
    likedByMe: false,
    timestamp: '2 hours ago',
    comments: [
      {
        id: 'c-1',
        author: {
          name: 'Anjali Hegde',
          role: 'Parent of 2 children',
          avatar: 'AH',
        },
        content: 'I had the same confusion. We chose ICSE for primary years. The focus on analytical thinking and language development is outstanding. You can always switch to CBSE in 8th/9th grade if they want to focus heavily on IIT-JEE prep!',
        timestamp: '1 hour ago',
      },
      {
        id: 'c-2',
        author: {
          name: 'Dr. Vivek Verma',
          role: 'Education Consultant',
          avatar: 'VV',
        },
        content: 'Both have merits. CBSE syllabus is more aligned with NCERT, which directly maps to JEE/NEET. ICSE has a broader range of subjects and builds stronger communication skills. Choose based on your child’s learning style.',
        timestamp: '45 mins ago',
      },
    ],
  },
  {
    id: 'post-2',
    title: 'Greenwood High vs Jain International - Admission feedback?',
    content: 'Has anyone secured admission at Jain International for 2026? Wanted to check how the interview process works for Grade 5, and if they place heavy emphasis on extracurricular portfolios during entry assessment.',
    author: {
      name: 'Meera Deshmukh',
      role: 'Parent of Grade 5 student',
      avatar: 'MD',
    },
    category: 'Admissions',
    likes: 12,
    likedByMe: false,
    timestamp: '5 hours ago',
    comments: [
      {
        id: 'c-3',
        author: {
          name: 'Karthik Rao',
          role: 'Parent of Grade 6 student',
          avatar: 'KR',
        },
        content: 'Jain International focuses a lot on overall personality. The test covers basic math and language skill metrics, followed by a friendly chat with the principal. They definitely look at sporting or cultural interests positively!',
        timestamp: '3 hours ago',
      },
    ],
  },
  {
    id: 'post-3',
    title: 'Importance of sports infrastructure in school decision',
    content: 'Is a 5-acre sports ground really a necessity? Some schools in central cities have very small playgrounds but claim to have top academic tie-ups. How much should we prioritize physical sports space in primary years?',
    author: {
      name: 'Suresh Menon',
      role: 'Parent of 2 boys',
      avatar: 'SM',
    },
    category: 'Extracurriculars',
    likes: 18,
    likedByMe: true,
    timestamp: '1 day ago',
    comments: [
      {
        id: 'c-4',
        author: {
          name: 'Priyanka Sen',
          role: 'Physical Educator',
          avatar: 'PS',
        },
        content: 'Playgrounds build social skills, physical health, and teamwork. For primary students, running space is highly critical. Academic results are important, but don’t compromise entirely on physical movement!',
        timestamp: '18 hours ago',
      },
    ],
  },
];
