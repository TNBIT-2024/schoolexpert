import { useState } from 'react';
import { Link, useParams } from 'react-router';
import { motion } from 'motion/react';
import {
  MapPin, Calendar, Users, Award, CheckCircle, Star, Phone, Mail,
  Globe, Building, GraduationCap, Trophy, Music, Palette, Microscope,
  BookOpen, Lock, ChevronLeft, Languages, Map, Image
} from 'lucide-react';
import { Button } from '../components/ui/button';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';

export function SchoolDetail() {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState('overview');
  const [isPaidUser] = useState(false);

  const school = {
    id: 1,
    name: 'Delhi Public School',
    location: 'Mysore, Karnataka',
    address: '123 Education Street, Vijayanagar, Mysore - 570017, Karnataka, India',
    board: 'CBSE',
    founded: 1998,
    students: 1200,
    rating: 4.8,
    reviews: 156,
    verified: true,
    infrastructureScore: 92,
    phone: '+91 821 2345678',
    email: 'info@dpsmysore.edu.in',
    website: 'www.dpsmysore.edu.in',

    management: {
      type: 'CBSE Affiliated',
      affiliationNumber: '123456',
      principal: 'Dr. Rajesh Kumar',
      establishedBy: 'Delhi Public School Society',
    },

    syllabus: {
      board: 'CBSE',
      curriculum: 'National Curriculum Framework',
      subjects: ['English', 'Hindi', 'Mathematics', 'Science', 'Social Studies', 'Computer Science', 'Physical Education'],
      streams: ['Science', 'Commerce', 'Humanities'],
    },

    languages: ['English', 'Hindi', 'Kannada', 'Sanskrit', 'French'],

    facilities: {
      sports: {
        ground: 'Yes - 5 acres',
        facilities: ['Cricket Ground', 'Football Field', 'Basketball Courts (2)', 'Tennis Courts (2)', 'Swimming Pool', 'Indoor Sports Complex', 'Athletics Track'],
      },
      infrastructure: {
        classrooms: '60 Smart Classrooms',
        labs: ['Physics Lab', 'Chemistry Lab', 'Biology Lab', 'Computer Lab (50 systems)', 'Math Lab', 'Language Lab'],
        library: 'Yes - 15,000+ books',
        auditorium: 'Yes - 500 seating capacity',
        cafeteria: 'Yes - Hygienic food court',
        medical: 'Yes - 24/7 Medical room with qualified nurse',
        transport: 'Yes - 25 buses covering entire city',
        security: '24/7 CCTV surveillance with trained guards',
      },
    },

    activities: {
      curricular: ['Music', 'Dance', 'Drama', 'Art & Craft', 'Debate', 'Public Speaking'],
      clubs: ['Robotics Club', 'Science Club', 'Eco Club', 'Quiz Club', 'Literary Club', 'Math Club'],
      sports: ['Cricket', 'Football', 'Basketball', 'Swimming', 'Tennis', 'Badminton', 'Athletics', 'Yoga'],
    },

    gallery: [
      'https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=800&q=80',
      'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=800&q=80',
      'https://images.unsplash.com/photo-1599809275671-b5942cabc7a2?w=800&q=80',
      'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=800&q=80',
      'https://images.unsplash.com/photo-1541829070764-84a7d30dd3f3?w=800&q=80',
      'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&q=80',
    ],

  };

  const tabs = [
    { id: 'overview', label: 'Overview', icon: Building },
    { id: 'academics', label: 'Academics', icon: GraduationCap },
    { id: 'facilities', label: 'Facilities', icon: Trophy },
    { id: 'activities', label: 'Activities', icon: Music },
    { id: 'gallery', label: 'Gallery', icon: Image, locked: !isPaidUser },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <Navbar />

      {/* Hero Section */}
      <div className="pt-32 pb-8 bg-gradient-to-br from-slate-100/80 via-slate-50/80 to-white/80 border-b border-slate-200/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link to="/schools" className="inline-flex items-center space-x-2 text-slate-500 hover:text-slate-900 mb-6 transition-colors font-semibold">
            <ChevronLeft className="w-5 h-5" />
            <span>Back to directory</span>
          </Link>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Info */}
            <div className="lg:col-span-2 text-slate-900">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-4">
                    {school.verified && (
                      <div className="inline-flex items-center space-x-1 bg-green-500 text-white px-3 py-1 rounded-full text-sm">
                        <CheckCircle className="w-4 h-4" />
                        <span>Verified</span>
                      </div>
                    )}
                    <div className="inline-flex items-center space-x-1 bg-amber-500 text-slate-900 px-3 py-1 rounded-full text-sm font-semibold">
                      <Award className="w-4 h-4" />
                      <span>{school.board}</span>
                    </div>
                  </div>
                  <h1 className="text-4xl lg:text-5xl mb-4 text-slate-900 font-extrabold">{school.name}</h1>
                  {/* Removed Star Rating Block */}
                  <div className="flex items-center space-x-2 text-slate-600 font-medium">
                    <MapPin className="w-5 h-5 text-slate-400" />
                    <span>{school.address}</span>
                  </div>
                </div>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-3 gap-4 mt-6">
                <div className="bg-white/80 border border-slate-200/60 rounded-xl p-4 shadow-sm">
                  <Calendar className="w-6 h-6 text-amber-600 mb-2" />
                  <div className="text-2xl font-bold text-slate-900 mb-1">{school.founded}</div>
                  <div className="text-sm text-slate-500 font-semibold">Founded</div>
                </div>
                <div className="bg-white/80 border border-slate-200/60 rounded-xl p-4 shadow-sm">
                  <Users className="w-6 h-6 text-amber-600 mb-2" />
                  <div className="text-2xl font-bold text-slate-900 mb-1">{school.students}</div>
                  <div className="text-sm text-slate-500 font-semibold">Students</div>
                </div>
                <div className="bg-white/80 border border-slate-200/60 rounded-xl p-4 shadow-sm">
                  <Trophy className="w-6 h-6 text-amber-600 mb-2" />
                  <div className="text-2xl font-bold text-slate-900 mb-1">{school.infrastructureScore}%</div>
                  <div className="text-sm text-slate-500 font-semibold">Infrastructure</div>
                </div>
              </div>
            </div>

            {/* Contact Card */}
            <div className="bg-white rounded-2xl p-6 shadow-xl h-fit">
              <h3 className="text-xl mb-4 text-slate-900">Contact Information</h3>
              <div className="space-y-4">
                <a href={`tel:${school.phone}`} className="flex items-center space-x-3 text-slate-700 hover:text-amber-600 transition-colors">
                  <Phone className="w-5 h-5" />
                  <span>{school.phone}</span>
                </a>
                <a href={`mailto:${school.email}`} className="flex items-center space-x-3 text-slate-700 hover:text-amber-600 transition-colors">
                  <Mail className="w-5 h-5" />
                  <span className="break-all">{school.email}</span>
                </a>
                <a href={`https://${school.website}`} target="_blank" rel="noopener noreferrer" className="flex items-center space-x-3 text-slate-700 hover:text-amber-600 transition-colors">
                  <Globe className="w-5 h-5" />
                  <span>{school.website}</span>
                </a>
              </div>
              <div className="mt-6 space-y-3">
                <Button className="w-full bg-amber-500 hover:bg-amber-600 text-slate-900">
                  Schedule Visit
                </Button>
                <Button variant="outline" className="w-full border-2 border-slate-300">
                  Download Brochure
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs Navigation */}
      <div className="sticky top-20 z-40 bg-white border-b border-slate-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8 overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => !tab.locked && setActiveTab(tab.id)}
                className={`flex items-center space-x-2 py-4 border-b-2 transition-colors whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'border-amber-500 text-slate-900'
                    : 'border-transparent text-slate-600 hover:text-slate-900'
                } ${tab.locked ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                <tab.icon className="w-5 h-5" />
                <span>{tab.label}</span>
                {tab.locked && <Lock className="w-4 h-4" />}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {activeTab === 'overview' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8"
          >
            {/* Management */}
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-slate-200">
              <h2 className="text-2xl mb-6 flex items-center space-x-2">
                <Building className="w-6 h-6 text-amber-500" />
                <span>Management & Affiliation</span>
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <div className="text-sm text-slate-500 mb-1">Board of Affiliation</div>
                  <div className="text-lg">{school.management.type}</div>
                </div>
                <div>
                  <div className="text-sm text-slate-500 mb-1">Affiliation Number</div>
                  <div className="text-lg">{school.management.affiliationNumber}</div>
                </div>
                <div>
                  <div className="text-sm text-slate-500 mb-1">Principal</div>
                  <div className="text-lg">{school.management.principal}</div>
                </div>
                <div>
                  <div className="text-sm text-slate-500 mb-1">Established By</div>
                  <div className="text-lg">{school.management.establishedBy}</div>
                </div>
              </div>
            </div>

            {/* Languages */}
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-slate-200">
              <h2 className="text-2xl mb-6 flex items-center space-x-2">
                <Languages className="w-6 h-6 text-amber-500" />
                <span>Languages Offered</span>
              </h2>
              <div className="flex flex-wrap gap-3">
                {school.languages.map((lang) => (
                  <div key={lang} className="px-6 py-3 bg-slate-100 text-slate-900 rounded-xl font-medium">
                    {lang}
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {activeTab === 'academics' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8"
          >
            {/* Syllabus */}
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-slate-200">
              <h2 className="text-2xl mb-6 flex items-center space-x-2">
                <GraduationCap className="w-6 h-6 text-amber-500" />
                <span>Curriculum & Syllabus</span>
              </h2>
              <div className="space-y-6">
                <div>
                  <div className="text-sm text-slate-500 mb-2">Board</div>
                  <div className="text-lg font-semibold">{school.syllabus.board}</div>
                </div>
                <div>
                  <div className="text-sm text-slate-500 mb-2">Curriculum Framework</div>
                  <div className="text-lg">{school.syllabus.curriculum}</div>
                </div>
                <div>
                  <div className="text-sm text-slate-500 mb-2">Core Subjects</div>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {school.syllabus.subjects.map((subject) => (
                      <div key={subject} className="flex items-center space-x-2 px-4 py-2 bg-slate-50 rounded-lg">
                        <BookOpen className="w-4 h-4 text-amber-500" />
                        <span>{subject}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <div className="text-sm text-slate-500 mb-2">Streams Available (11th & 12th)</div>
                  <div className="flex flex-wrap gap-3">
                    {school.syllabus.streams.map((stream) => (
                      <div key={stream} className="px-6 py-3 bg-amber-100 text-amber-900 rounded-xl font-medium">
                        {stream}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {activeTab === 'facilities' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8"
          >
            {/* Sports Facilities */}
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-slate-200">
              <h2 className="text-2xl mb-6 flex items-center space-x-2">
                <Trophy className="w-6 h-6 text-amber-500" />
                <span>Sports & Ground Facilities</span>
              </h2>
              <div className="mb-4">
                <div className="text-sm text-slate-500 mb-2">Ground Size</div>
                <div className="text-lg font-semibold">{school.facilities.sports.ground}</div>
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {school.facilities.sports.facilities.map((facility) => (
                  <div key={facility} className="flex items-center space-x-2 px-4 py-3 bg-slate-50 rounded-lg">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span>{facility}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Infrastructure */}
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-slate-200">
              <h2 className="text-2xl mb-6 flex items-center space-x-2">
                <Building className="w-6 h-6 text-amber-500" />
                <span>Infrastructure & Amenities</span>
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                {Object.entries(school.facilities.infrastructure).map(([key, value]) => (
                  <div key={key}>
                    <div className="text-sm text-slate-500 mb-1 capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</div>
                    {Array.isArray(value) ? (
                      <div className="space-y-2">
                        {value.map((item) => (
                          <div key={item} className="flex items-center space-x-2">
                            <CheckCircle className="w-4 h-4 text-green-500" />
                            <span>{item}</span>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-lg">{value}</div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {activeTab === 'activities' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8"
          >
            {/* Extra-Curricular */}
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-slate-200">
              <h2 className="text-2xl mb-6 flex items-center space-x-2">
                <Palette className="w-6 h-6 text-amber-500" />
                <span>Extra-Curricular Activities</span>
              </h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {school.activities.curricular.map((activity) => (
                  <div key={activity} className="flex items-center space-x-2 px-4 py-3 bg-amber-50 rounded-lg">
                    <Music className="w-5 h-5 text-amber-600" />
                    <span>{activity}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Clubs */}
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-slate-200">
              <h2 className="text-2xl mb-6 flex items-center space-x-2">
                <Microscope className="w-6 h-6 text-amber-500" />
                <span>Clubs & Societies</span>
              </h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {school.activities.clubs.map((club) => (
                  <div key={club} className="flex items-center space-x-2 px-4 py-3 bg-slate-50 rounded-lg">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span>{club}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Sports */}
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-slate-200">
              <h2 className="text-2xl mb-6 flex items-center space-x-2">
                <Trophy className="w-6 h-6 text-amber-500" />
                <span>Sports Activities</span>
              </h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                {school.activities.sports.map((sport) => (
                  <div key={sport} className="flex items-center space-x-2 px-4 py-3 bg-slate-50 rounded-lg">
                    <Trophy className="w-5 h-5 text-amber-600" />
                    <span>{sport}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {activeTab === 'gallery' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8"
          >
            {!isPaidUser ? (
              <div className="bg-white rounded-2xl p-12 shadow-lg border border-slate-200 text-center">
                <Lock className="w-16 h-16 text-slate-400 mx-auto mb-4" />
                <h3 className="text-2xl mb-3">Premium Content</h3>
                <p className="text-slate-600 mb-6 max-w-md mx-auto">
                  School gallery is available for verified premium members only.
                </p>
                <Button className="bg-amber-500 hover:bg-amber-600 text-slate-900 px-8 py-6 text-lg">
                  Upgrade to Premium Access
                </Button>
              </div>
            ) : (
              <div className="bg-white rounded-2xl p-8 shadow-lg border border-slate-200">
                <h2 className="text-2xl mb-6">School Gallery</h2>
                <div className="grid md:grid-cols-3 gap-4">
                  {school.gallery.map((image, i) => (
                    <ImageWithFallback
                      key={i}
                      src={image}
                      alt={`Gallery ${i + 1}`}
                      className="rounded-xl h-64 object-cover w-full"
                    />
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        )}
      </div>

      <Footer />
    </div>
  );
}
