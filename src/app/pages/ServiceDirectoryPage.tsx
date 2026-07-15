import { useState } from 'react';
import { useParams, Link } from 'react-router';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Laptop, Database, BookOpen, GraduationCap, TrendingUp, Globe, Building, Compass, Heart, Award,
  Search, MapPin, Star, CheckCircle, ArrowRight, X, Phone, Mail, Clock, Calendar, ShieldCheck, Play
} from 'lucide-react';
import { Button } from '../components/ui/button';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';

// Icons mapping for categories
const iconMap: Record<string, any> = {
  'edtech-companies': Laptop,
  'school-erp-providers': Database,
  'educational-publishers': BookOpen,
  'teacher-training-companies': GraduationCap,
  'skill-development-providers': TrendingUp,
  'international-education-consultants': Globe,
  'infrastructure-vendors': Building,
  'career-coaching': Compass,
  'mental-health-professionals': Heart,
  'individual-course-providers': Award,
};

// Colors mapping for category accents
const colorMap: Record<string, string> = {
  'edtech-companies': 'from-blue-500 to-indigo-600',
  'school-erp-providers': 'from-purple-500 to-indigo-600',
  'educational-publishers': 'from-amber-500 to-orange-600',
  'teacher-training-companies': 'from-emerald-500 to-teal-600',
  'skill-development-providers': 'from-rose-500 to-pink-600',
  'international-education-consultants': 'from-cyan-500 to-blue-600',
  'infrastructure-vendors': 'from-stone-500 to-slate-600',
  'career-coaching': 'from-orange-500 to-amber-600',
  'mental-health-professionals': 'from-red-400 to-pink-500',
  'individual-course-providers': 'from-amber-600 to-yellow-500',
};

interface Provider {
  id: string;
  name: string;
  desc: string;
  rating: number;
  reviews: number;
  location: string;
  features: string[];
  contactEmail: string;
  contactPhone: string;
  website: string;
  verified: boolean;
  // Specific to individual course providers:
  academy?: string;
  skills?: string;
  mode?: string;
  classesPerWeek?: number;
  fees?: string;
  videoUrl?: string;
}

// Directory-specific placeholder data
const directoryData: Record<string, { title: string; subtitle: string; desc: string; providers: Provider[] }> = {
  'edtech-companies': {
    title: 'EdTech Companies',
    subtitle: 'Digital Classroom & LMS Solutions',
    desc: 'Explore verified EdTech partners providing Learning Management Systems, digital classrooms, AI analytics, and online portals.',
    providers: [
      {
        id: 'edtech-1',
        name: 'LearnSphere Solutions',
        desc: 'All-in-one interactive LMS platforms, homework planners, and school portal integrations for primary and secondary schools.',
        rating: 4.8,
        reviews: 24,
        location: 'Bangalore, Karnataka',
        features: ['LMS Integration', 'Virtual Labs', 'AI Progress Reports', 'Parent Portal'],
        contactEmail: 'partner@learnsphere.io',
        contactPhone: '+91 80 4918 2001',
        website: 'https://learnsphere.io',
        verified: true
      },
      {
        id: 'edtech-2',
        name: 'EduFuture AI',
        desc: 'Advanced customized learning pathways, automated grading software, and teacher dashboards for CBSE/ICSE schools.',
        rating: 4.6,
        reviews: 18,
        location: 'Hyderabad, Telangana',
        features: ['Adaptive Assessments', 'Auto Grading', 'Curriculum Mapping', 'Multi-school support'],
        contactEmail: 'schools@edufuture.ai',
        contactPhone: '+91 40 6822 4110',
        website: 'https://edufuture.ai',
        verified: true
      },
      {
        id: 'edtech-3',
        name: 'CurioQuest STEM',
        desc: 'Virtual interactive science simulation engines and game-based mathematics tools mapped to national curriculum frameworks.',
        rating: 4.7,
        reviews: 12,
        location: 'Mumbai, Maharashtra',
        features: ['3D Simulations', 'Math Gamification', 'Lab Worksheets', 'Offline Mode Support'],
        contactEmail: 'contact@curioquest.com',
        contactPhone: '+91 22 2684 9912',
        website: 'https://curioquest.com',
        verified: false
      }
    ]
  },
  'school-erp-providers': {
    title: 'School ERP Providers',
    subtitle: 'Campus Operations & Administrative Systems',
    desc: 'Find premium campus ERP solutions covering fee collection, biometric attendance, transport tracking, and secure gradebook databases.',
    providers: [
      {
        id: 'erp-1',
        name: 'CampusFlow ERP',
        desc: 'Cloud-native database system covering automated invoicing, online payment gateways, and staff payroll schedules.',
        rating: 4.7,
        reviews: 32,
        location: 'Mumbai, Maharashtra',
        features: ['Fee Gateways', 'Staff Payroll', 'Biometric Sync', 'WhatsApp API Alerts'],
        contactEmail: 'sales@campusflow.in',
        contactPhone: '+91 22 4001 8892',
        website: 'https://campusflow.in',
        verified: true
      },
      {
        id: 'erp-2',
        name: 'SmartSchool Sync',
        desc: 'Mobile-first school operations management including real-time bus GPS tracking and interactive teacher-parent messaging cards.',
        rating: 4.9,
        reviews: 41,
        location: 'Delhi NCR',
        features: ['Bus GPS Tracking', 'Secure Gradebooks', 'App Store Apps', 'Admission Funnel'],
        contactEmail: 'info@smartschoolsync.com',
        contactPhone: '+91 11 4983 2341',
        website: 'https://smartschoolsync.com',
        verified: true
      }
    ]
  },
  'educational-publishers': {
    title: 'Educational Publishers',
    subtitle: 'NEP Mapped Textbooks & Reading Resources',
    desc: 'Connect with established educational publishing houses offering textbooks, supplementary reading collections, and interactive ebooks.',
    providers: [
      {
        id: 'pub-1',
        name: 'Orient Books',
        desc: 'Curator of highly engaging textbooks and digital assessment assets mapped completely to the National Education Policy (NEP 2020).',
        rating: 4.5,
        reviews: 15,
        location: 'Kolkata, West Bengal',
        features: ['NEP 2020 Compliant', 'Worksheet Bundles', 'Animated E-books', 'Teacher Handbooks'],
        contactEmail: 'support@orientbooks.co.in',
        contactPhone: '+91 33 2212 9901',
        website: 'https://orientbooks.co.in',
        verified: true
      },
      {
        id: 'pub-2',
        name: 'Beacon Press Education',
        desc: 'Premium activity books, bilingual phonics cards, and mathematics lab resource kits for foundational stage schools.',
        rating: 4.7,
        reviews: 9,
        location: 'Chennai, Tamil Nadu',
        features: ['Foundational Phonics', 'Bilingual Materials', 'Math Lab Kits', 'Teacher Training Webinars'],
        contactEmail: 'orders@beaconpress.in',
        contactPhone: '+91 44 2841 8003',
        website: 'https://beaconpress.in',
        verified: false
      }
    ]
  },
  'teacher-training-companies': {
    title: 'Teacher Training Companies',
    subtitle: 'Professional Development & NEP Compliance',
    desc: 'Empower your teaching staff with verified workshops covering modern pedagogy, educational tech tools, and student behavioral strategies.',
    providers: [
      {
        id: 'train-1',
        name: 'Educator Academy India',
        desc: 'Certified educator workshops focusing on experiential learning strategies, assessment design, and inclusive classroom setups.',
        rating: 4.8,
        reviews: 29,
        location: 'Pune, Maharashtra',
        features: ['Experiential Learning', 'Assessment Workshops', 'Inclusion Seminars', 'Certificates Issued'],
        contactEmail: 'trainings@educatoracademy.in',
        contactPhone: '+91 20 6609 1123',
        website: 'https://educatoracademy.in',
        verified: true
      },
      {
        id: 'train-2',
        name: 'LearnTeach International',
        desc: 'Official IB and Cambridge curriculum mapping coaching for educators looking to refine advanced instructional styles.',
        rating: 4.9,
        reviews: 14,
        location: 'Bangalore, Karnataka',
        features: ['IB Curriculum Prep', 'Cambridge Mapping', 'Executive Leadership', 'Peer Groups'],
        contactEmail: 'leads@learnteach.org',
        contactPhone: '+91 80 4015 8899',
        website: 'https://learnteach.org',
        verified: true
      }
    ]
  },
  'skill-development-providers': {
    title: 'Skill Development Providers',
    subtitle: 'Co-Curricular & Vocational Training programs',
    desc: 'Explore partners offering robotics setups, coding curriculums, financial literacy workshops, and personality development programs.',
    providers: [
      {
        id: 'skill-1',
        name: 'CodeKids Academy',
        desc: 'Hands-on programming modules in Python, Scratch, and LEGO robotics kits setup in school labs with dedicated instructors.',
        rating: 4.8,
        reviews: 35,
        location: 'Mumbai, Maharashtra',
        features: ['Coding Labs Setup', 'LEGO Robotics Kits', 'Vetted Mentors', 'Hackathon Access'],
        contactEmail: 'hello@codekids.co.in',
        contactPhone: '+91 22 2849 5501',
        website: 'https://codekids.co.in',
        verified: true
      },
      {
        id: 'skill-2',
        name: 'Eloquence Speech Lab',
        desc: 'Interactive public speaking, argumentative debate coaching, and expressive storytelling syllabus for middle and high schools.',
        rating: 4.7,
        reviews: 22,
        location: 'Hyderabad, Telangana',
        features: ['Debate Tournaments', 'Storytelling Syllabus', 'Soft Skills Audits', 'Speech Certificates'],
        contactEmail: 'contact@eloquence.in',
        contactPhone: '+91 40 2341 8900',
        website: 'https://eloquence.in',
        verified: false
      }
    ]
  },
  'international-education-consultants': {
    title: 'International Education Consultants',
    subtitle: 'Study Abroad Counseling & Exchange Programs',
    desc: 'Find counseling experts guiding students through college applications, SAT/ACT test prep, profile building, and global university admissions.',
    providers: [
      {
        id: 'intl-1',
        name: 'GlobalPath Admissions',
        desc: 'Ivy League and top UK/European college admission counselors offering comprehensive profile audits and SOP review workshops.',
        rating: 4.9,
        reviews: 58,
        location: 'Bangalore, Karnataka',
        features: ['Ivy League Advisory', 'SOP Workshops', 'SAT/ACT Coaching', 'Visa Concierge'],
        contactEmail: 'admissions@globalpath.edu',
        contactPhone: '+91 80 4882 1212',
        website: 'https://globalpath.edu',
        verified: true
      },
      {
        id: 'intl-2',
        name: 'UnivEdge Consulting',
        desc: 'Comprehensive profiles mapping, student exchange opportunities, and global scholarship search directories.',
        rating: 4.8,
        reviews: 43,
        location: 'Chennai, Tamil Nadu',
        features: ['Scholarship Mapping', 'Exchange Programs', 'Resume Building', 'Interview Prep'],
        contactEmail: 'info@univedge.com',
        contactPhone: '+91 44 4922 1004',
        website: 'https://univedge.com',
        verified: true
      }
    ]
  },
  'infrastructure-vendors': {
    title: 'Infrastructure & Equipment Vendors',
    subtitle: 'Classroom Furnishings, Gyms & Science Labs',
    desc: 'Verify top vendors delivering smartboards, ergonomic classroom desks, science lab equipment, playground systems, and gymnasium turf.',
    providers: [
      {
        id: 'infra-1',
        name: 'Nexus School Furnishings',
        desc: 'Custom wooden and composite desk configurations, collaborative library furniture, and complete laboratory counter fixtures.',
        rating: 4.6,
        reviews: 21,
        location: 'Ahmedabad, Gujarat',
        features: ['Ergonomic Desks', 'Lab Counters', 'Library Assembly', '5-Year Warranty'],
        contactEmail: 'sales@nexusfurnitures.com',
        contactPhone: '+91 79 2649 1109',
        website: 'https://nexusfurnitures.com',
        verified: true
      },
      {
        id: 'infra-2',
        name: 'GreenPlay Sports Turf',
        desc: 'High-durability playground turf, safety surfacing installations, outdoor play structures, and indoor sports hall assembly.',
        rating: 4.7,
        reviews: 17,
        location: 'Bangalore, Karnataka',
        features: ['Playground Turf', 'Safety Grass Fit', 'Outdoor Slides', 'Sports Equipment'],
        contactEmail: 'turf@greenplaysports.com',
        contactPhone: '+91 80 6602 4432',
        website: 'https://greenplaysports.com',
        verified: true
      }
    ]
  },
  'career-coaching': {
    title: 'Career Coaching & Counselling',
    subtitle: 'Psychometric Testing & Future Planning',
    desc: 'Connect with career counseling networks utilizing scientific psychometric profiles to guide secondary school streams and degree mapping.',
    providers: [
      {
        id: 'career-1',
        name: 'Pathfinder Careers',
        desc: 'Scientific stream selector psychometric testing and one-on-one professional guidance sessions for class 8-12 students.',
        rating: 4.8,
        reviews: 50,
        location: 'Mumbai, Maharashtra',
        features: ['Psychometric Test Suite', 'One-on-One Counseling', 'Parent Alignment Panels', 'Stream Selection'],
        contactEmail: 'counseling@pathfinder.org.in',
        contactPhone: '+91 22 2541 3321',
        website: 'https://pathfinder.org.in',
        verified: true
      },
      {
        id: 'career-2',
        name: 'FutureLaunch Career Lab',
        desc: 'Interactive virtual internships and stream discovery projects allowing high schoolers to experience real-world roles.',
        rating: 4.7,
        reviews: 31,
        location: 'Delhi NCR',
        features: ['Virtual Internships', 'Alumni Mentorship', 'Stream Worksheets', 'College Maps'],
        contactEmail: 'hello@futurelaunch.co',
        contactPhone: '+91 11 4110 9988',
        website: 'https://futurelaunch.co',
        verified: false
      }
    ]
  },
  'mental-health-professionals': {
    title: 'Mental Health Professionals',
    subtitle: 'Student Counseling & Psychological Support',
    desc: 'Verify clinical child psychologists, special education behavioral therapists, school counselors, and wellness program leads.',
    providers: [
      {
        id: 'mental-1',
        name: 'WellMind Student Counselling',
        desc: 'On-campus counseling program deployments, stress management workshops, and student mental health training kits.',
        rating: 4.9,
        reviews: 45,
        location: 'Bangalore, Karnataka',
        features: ['On-campus Counselors', 'Anxiety Workshops', 'Teacher Sensitivity Kits', 'Parent Helpline'],
        contactEmail: 'connect@wellmindcounseling.org',
        contactPhone: '+91 80 4919 5500',
        website: 'https://wellmindcounseling.org',
        verified: true
      },
      {
        id: 'mental-2',
        name: 'Insight Special Therapy Group',
        desc: 'Remedial education support, behavioral profiling, speech therapy assistance, and personalized study designs for neurodivergent children.',
        rating: 4.8,
        reviews: 28,
        location: 'Pune, Maharashtra',
        features: ['Behavioral Profiling', 'Speech Therapy', 'Remedial Education', 'ADHD Support'],
        contactEmail: 'support@insighttherapy.in',
        contactPhone: '+91 20 6820 4410',
        website: 'https://insighttherapy.in',
        verified: true
      }
    ]
  },
  'individual-course-providers': {
    title: 'Individual Course Providers',
    subtitle: 'Verified Independent Skill Instructors',
    desc: 'Browse certified independent educators teaching music, classical dance, painting, pottery, crochet, baking, and academic subjects.',
    providers: [
      {
        id: 'indiv-1',
        name: 'Aarav Mehta',
        academy: 'Aarav Mehta Music Studio',
        desc: 'Professional violinist and classical guitar instructor offering custom examination prep syllabus for Trinity and Royal College certifications.',
        rating: 4.9,
        reviews: 19,
        location: 'Bangalore, Karnataka',
        features: ['Trinity Exam Prep', 'Vetted Studio Space', 'Acoustic Science Basics', 'Monthly Recitals'],
        contactEmail: 'aarav.guitarist@gmail.com',
        contactPhone: '+91 98450 12003',
        website: 'https://aaravmehtamusic.com',
        verified: true,
        skills: 'Violin, Classical Guitar, Music Theory',
        mode: 'Hybrid (Online & Bangalore Studio)',
        classesPerWeek: 2,
        fees: '₹2,500 / Month (8 sessions)',
        videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-hand-playing-guitar-chords-close-up-34346-large.mp4'
      },
      {
        id: 'indiv-2',
        name: 'Meera Nair',
        academy: 'Nair School of Bharatanatyam',
        desc: 'Bharatanatyam expert and Kathak performer providing detailed kids choreography, facial expression training, and Arangetram preparation.',
        rating: 4.8,
        reviews: 22,
        location: 'Kochi, Kerala',
        features: ['Arangetram Guidance', 'Flexible Timings', 'Classical Theory Notes', 'Annual Stage Showcase'],
        contactEmail: 'meera.nair.dance@outlook.com',
        contactPhone: '+91 99460 38221',
        website: 'https://nairdanceacademy.org',
        verified: true,
        skills: 'Bharatanatyam, Kathak, Folk Dance',
        mode: 'Online only',
        classesPerWeek: 3,
        fees: '₹1,800 / Month (12 sessions)',
        videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-woman-dancing-in-a-studio-41586-large.mp4'
      },
      {
        id: 'indiv-3',
        name: 'Rohan Das',
        academy: 'Earth & Fire Pottery Studio',
        desc: 'Traditional clay shaping artist offering watercolor landscapes, clay sculpting, and wheel pottery courses from a custom studio setup.',
        rating: 4.7,
        reviews: 12,
        location: 'Kolkata, West Bengal',
        features: ['Pottery Wheel Access', 'Kiln Baking Included', 'Art Gallery Exposures', 'Vibrant Sand Palette'],
        contactEmail: 'rohan.sculpts@yahoo.com',
        contactPhone: '+91 98300 24891',
        website: 'https://earthandfirepottery.com',
        verified: true,
        skills: 'Pottery, Clay Sculpting, Watercolors',
        mode: 'Offline only (Kolkata Studio)',
        classesPerWeek: 1,
        fees: '₹3,000 / Month (includes materials)',
        videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-hands-shaping-a-pot-on-potters-wheel-close-40348-large.mp4'
      }
    ]
  }
};

export function ServiceDirectoryPage() {
  const { type } = useParams<{ type: string }>();
  const activeSlug = type || 'edtech-companies';
  
  const directory = directoryData[activeSlug] || directoryData['edtech-companies'];
  const AccentIcon = iconMap[activeSlug] || iconMap['edtech-companies'];
  const gradientColor = colorMap[activeSlug] || colorMap['edtech-companies'];

  const [activeVideoUrl, setActiveVideoUrl] = useState<string | null>(null);
  const [activeVideoName, setActiveVideoName] = useState('');

  const providers = directory.providers;

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-zinc-950 font-geist">
      <Navbar />
      {/* Directory Hero Section */}
      <div className="pt-32 pb-16 bg-gradient-to-b from-[#FAF6F0] to-slate-50 dark:from-zinc-900/40 dark:to-zinc-950 border-b border-slate-200/50 dark:border-zinc-900 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMxNTEyMTAiIGZpbGwtb3BhY2l0eT0iMC4wMSI+PHBhdGggZD0iTTM2IDM0djEyaC0xMlYzNGgxMnptMC0xNnYxMmgtMTJWMThoMTJ6bS-xNiAxNnYxMkg4VjM0aDEyem0wLTE2djEySDhWMThoMTJ6bTE2LTE2djEyaC0xMlYyaDEyem0tMTYgMHYxMkg4VjIdMTJ6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-40 dark:opacity-10" />
        
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center text-center gap-6"
          >
            <div className="space-y-3 flex flex-col items-center text-center">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-700 dark:text-amber-400 text-[10px] font-black uppercase tracking-wider">
                <AccentIcon className="w-3.5 h-3.5" />
                Verified Directory
              </div>
              <h1 className="text-4xl sm:text-5xl font-black text-slate-900 dark:text-slate-100 tracking-tight">
                {directory.title}
              </h1>
              <p className="text-slate-500 dark:text-slate-400 font-medium text-base sm:text-lg max-w-3xl leading-relaxed mx-auto">
                {directory.desc}
              </p>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Directory Listings Grid */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {providers.length > 0 ? (
            providers.map((provider) => (
              <motion.div
                key={provider.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-3xl p-6 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div className="space-y-4">
                  {/* Card Header */}
                  <div className="flex items-start justify-between">
                    <div className="space-y-0.5">
                      {provider.academy && (
                        <div className="text-[10px] font-bold text-amber-600 uppercase tracking-wider">
                          {provider.academy}
                        </div>
                      )}
                      <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 leading-tight">
                        {provider.name}
                      </h3>
                    </div>
                    {provider.verified && (
                      <span className="inline-flex items-center gap-1 bg-green-500/10 border border-green-500/20 text-green-600 dark:text-green-400 text-[9px] px-2 py-0.5 rounded-full font-black uppercase tracking-wider">
                        Vetted
                      </span>
                    )}
                  </div>

                  {/* Location */}
                  <div className="flex items-center gap-4 text-xs font-semibold text-slate-500 dark:text-slate-400">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-slate-400" />
                      {provider.location}
                    </span>
                  </div>

                  {/* Description */}
                  <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed font-medium min-h-[50px]">
                    {provider.desc}
                  </p>

                  {/* Special fields for individual course providers */}
                  {activeSlug === 'individual-course-providers' && (
                    <div className="bg-[#FAF6F0] dark:bg-zinc-950 border border-amber-500/10 rounded-2xl p-3.5 space-y-2 text-xs font-semibold text-slate-700 dark:text-slate-350">
                      {provider.skills && (
                        <div>
                          <span className="text-slate-400 font-bold block text-[10px] uppercase">Skills Offered:</span>
                          <span className="text-slate-900 dark:text-slate-200">{provider.skills}</span>
                        </div>
                      )}
                      <div className="grid grid-cols-2 gap-2 border-t border-slate-200/50 dark:border-zinc-900 pt-2 mt-2">
                        <div>
                          <span className="text-slate-400 font-bold block text-[10px] uppercase">Mode:</span>
                          <span>{provider.mode}</span>
                        </div>
                        <div>
                          <span className="text-slate-400 font-bold block text-[10px] uppercase">Classes:</span>
                          <span>{provider.classesPerWeek} per week</span>
                        </div>
                      </div>
                      <div className="border-t border-slate-200/50 dark:border-zinc-900 pt-2 mt-2">
                        <span className="text-slate-400 font-bold block text-[10px] uppercase">Fee Details:</span>
                        <span className="text-amber-700 dark:text-amber-400">{provider.fees}</span>
                      </div>
                    </div>
                  )}

                  {/* Feature Tags */}
                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {provider.features.map((f, i) => (
                      <span key={i} className="text-[10px] bg-slate-100 dark:bg-zinc-800 text-slate-600 dark:text-slate-400 px-2.5 py-1 rounded-lg font-bold">
                        {f}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Card Actions */}
                <div className="flex gap-2 pt-6 mt-4 border-t border-slate-100 dark:border-zinc-800">
                  {provider.videoUrl && (
                    <button
                      onClick={() => {
                        setActiveVideoUrl(provider.videoUrl || null);
                        setActiveVideoName(provider.name);
                      }}
                      className="flex items-center justify-center gap-1.5 px-3 bg-amber-600/10 border border-amber-600/20 text-amber-700 hover:bg-amber-600 hover:text-white rounded-xl text-xs font-bold transition-all"
                    >
                      <Play className="w-3.5 h-3.5 fill-current" />
                      Sample
                    </button>
                  )}
                  <a href={`mailto:${provider.contactEmail}`} className="flex-1">
                    <Button variant="outline" className="w-full border-2 border-slate-200 text-xs font-bold rounded-xl h-[38px]">
                      Contact Partner
                    </Button>
                  </a>
                  <a href={provider.website} target="_blank" rel="noopener noreferrer" className="flex-1">
                    <Button className="w-full bg-slate-900 hover:bg-slate-800 text-xs font-bold rounded-xl text-white h-[38px]">
                      Visit Site
                    </Button>
                  </a>
                </div>
              </motion.div>
            ))
          ) : (
            <div className="col-span-1 md:col-span-3 text-center py-20 bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-[2rem]">
              <X className="w-12 h-12 mx-auto text-slate-350 mb-3" />
              <h3 className="text-lg font-bold text-slate-800 dark:text-slate-200 mb-1">No Listings Match</h3>
              <p className="text-slate-500 text-sm">Try adjusting your filters or search keywords.</p>
            </div>
          )}
        </div>
      </div>


      {/* Interactive Video Playback Modal */}
      <AnimatePresence>
        {activeVideoUrl && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            {/* Modal backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveVideoUrl(null)}
              className="absolute inset-0 bg-slate-950"
            />
            
            {/* Modal content */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-[2rem] overflow-hidden max-w-2xl w-full shadow-2xl relative z-10"
            >
              <div className="flex items-center justify-between p-5 border-b border-slate-100 dark:border-zinc-800">
                <div className="space-y-0.5">
                  <div className="text-[10px] font-bold text-amber-600 uppercase tracking-widest flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-amber-600" />
                    Verified Skill Demonstration
                  </div>
                  <h4 className="text-sm font-bold text-slate-900 dark:text-slate-100">
                    Sample Video - {activeVideoName}
                  </h4>
                </div>
                <button
                  onClick={() => setActiveVideoUrl(null)}
                  className="p-1.5 hover:bg-slate-100 dark:hover:bg-zinc-800 rounded-full text-slate-400 hover:text-slate-600 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Video Player */}
              <div className="aspect-video bg-black flex items-center justify-center">
                <video
                  src={activeVideoUrl}
                  controls
                  autoPlay
                  className="w-full h-full object-contain"
                />
              </div>

              {/* Note */}
              <div className="p-4 bg-slate-50 dark:bg-zinc-950 text-[10px] text-slate-400 text-center border-t border-slate-150 dark:border-zinc-800">
                This skill demonstration video was uploaded by the provider and approved by our quality compliance team.
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <Footer />
    </div>
  );
}
