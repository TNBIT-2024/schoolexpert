import { useState } from 'react';
import { Link } from 'react-router';
import { motion } from 'motion/react';
import { Search, MapPin, Filter, SlidersHorizontal, School, CheckCircle, Star, Users, Building, Award, X } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';

const boards = ['All', 'CBSE', 'ICSE', 'State Board'];
const languages = ['English', 'Hindi', 'Kannada', 'Sanskrit', 'French'];
const facilities = ['Sports Ground', 'Swimming Pool', 'Library', 'Lab', 'Auditorium'];

import { schools } from '../data/schools';

export function SchoolDirectory() {
  const [searchQuery, setSearchQuery] = useState('');
  const [location, setLocation] = useState('');
  const [selectedBoard, setSelectedBoard] = useState('All');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>([]);
  const [selectedFacilities, setSelectedFacilities] = useState<string[]>([]);

  const toggleLanguage = (lang: string) => {
    setSelectedLanguages(prev =>
      prev.includes(lang) ? prev.filter(l => l !== lang) : [...prev, lang]
    );
  };

  const toggleFacility = (facility: string) => {
    setSelectedFacilities(prev =>
      prev.includes(facility) ? prev.filter(f => f !== facility) : [...prev, facility]
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <Navbar />

      {/* Hero Section */}
      <div className="pt-32 pb-16 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDM0djEyaC0xMlYzNGgxMnptMC0xNnYxMmgtMTJWMThoMTJ6bS0xNiAxNnYxMkg4VjM0aDEyem0wLTE2djEySDhWMThoMTJ6bTE2LTE2djEyaC0xMlYyaDEyem0tMTYgMHYxMkg4VjJoMTJ6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-30" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center space-x-2 bg-amber-500/20 backdrop-blur-sm px-4 py-2 rounded-full mb-6 border border-amber-500/30">
              <Award className="w-4 h-4 text-amber-400" />
              <span className="text-sm text-amber-200">Mysore pilot | Verified parent intelligence</span>
            </div>

            <h1 className="text-5xl mb-6">
              Find the right school with <span className="text-amber-400">proof, not guesswork</span>
            </h1>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto mb-8">
              SchoolExpert brings verified reviews, quantified infrastructure scores, and live consultation support so families can compare institutions with clarity.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 max-w-2xl mx-auto mb-8">
              <div>
                <div className="text-3xl text-amber-400 mb-1">48</div>
                <div className="text-sm text-slate-400">schools verified</div>
              </div>
              <div>
                <div className="text-3xl text-amber-400 mb-1">Daily</div>
                <div className="text-sm text-slate-400">On-call advisors</div>
              </div>
              <div>
                <div className="text-3xl text-amber-400 mb-1">3+</div>
                <div className="text-sm text-slate-400">CBSE | ICSE | State</div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-amber-500 hover:bg-amber-600 text-slate-900 px-8 py-6 text-lg">
                Get verified access
              </Button>
              <Button size="lg" variant="outline" className="border-2 border-white text-white hover:bg-white/10 px-8 py-6 text-lg">
                Browse directory
              </Button>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Search & Filter Section */}
      <div className="sticky top-20 z-40 bg-white/95 backdrop-blur-lg border-b border-slate-200 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 flex gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search schools..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 border-2 border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                />
              </div>
              <div className="w-48 relative">
                <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  type="text"
                  placeholder="Location"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 border-2 border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Board Filter */}
            <div className="flex gap-2">
              {boards.map((board) => (
                <button
                  key={board}
                  onClick={() => setSelectedBoard(board)}
                  className={`px-6 py-3 rounded-xl font-medium transition-all ${
                    selectedBoard === board
                      ? 'bg-slate-900 text-white shadow-lg'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  {board}
                </button>
              ))}
              <Button
                variant="outline"
                onClick={() => setShowFilters(!showFilters)}
                className="border-2 border-slate-300"
              >
                <SlidersHorizontal className="w-5 h-5 mr-2" />
                Filters
              </Button>
            </div>
          </div>

          {/* Advanced Filters */}
          {showFilters && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="mt-6 p-6 bg-slate-50 rounded-2xl border border-slate-200"
            >
              <div className="grid md:grid-cols-2 gap-6">
                {/* Languages */}
                <div>
                  <h3 className="text-sm font-semibold text-slate-700 mb-3">Languages Offered</h3>
                  <div className="flex flex-wrap gap-2">
                    {languages.map((lang) => (
                      <button
                        key={lang}
                        onClick={() => toggleLanguage(lang)}
                        className={`px-4 py-2 rounded-lg text-sm transition-all ${
                          selectedLanguages.includes(lang)
                            ? 'bg-slate-900 text-white'
                            : 'bg-white text-slate-700 border border-slate-300 hover:border-slate-400'
                        }`}
                      >
                        {lang}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Facilities */}
                <div>
                  <h3 className="text-sm font-semibold text-slate-700 mb-3">Facilities</h3>
                  <div className="flex flex-wrap gap-2">
                    {facilities.map((facility) => (
                      <button
                        key={facility}
                        onClick={() => toggleFacility(facility)}
                        className={`px-4 py-2 rounded-lg text-sm transition-all ${
                          selectedFacilities.includes(facility)
                            ? 'bg-slate-900 text-white'
                            : 'bg-white text-slate-700 border border-slate-300 hover:border-slate-400'
                        }`}
                      >
                        {facility}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {(selectedLanguages.length > 0 || selectedFacilities.length > 0) && (
                <div className="mt-4 flex items-center justify-between">
                  <div className="flex flex-wrap gap-2">
                    {selectedLanguages.map((lang) => (
                      <span key={lang} className="inline-flex items-center space-x-1 bg-slate-900 text-white px-3 py-1 rounded-lg text-sm">
                        <span>{lang}</span>
                        <button onClick={() => toggleLanguage(lang)}>
                          <X className="w-3 h-3" />
                        </button>
                      </span>
                    ))}
                    {selectedFacilities.map((facility) => (
                      <span key={facility} className="inline-flex items-center space-x-1 bg-slate-900 text-white px-3 py-1 rounded-lg text-sm">
                        <span>{facility}</span>
                        <button onClick={() => toggleFacility(facility)}>
                          <X className="w-3 h-3" />
                        </button>
                      </span>
                    ))}
                  </div>
                  <Button
                    variant="ghost"
                    onClick={() => {
                      setSelectedLanguages([]);
                      setSelectedFacilities([]);
                    }}
                    className="text-sm"
                  >
                    Clear all
                  </Button>
                </div>
              )}
            </motion.div>
          )}
        </div>
      </div>

      {/* Schools List */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="mb-8">
          <h2 className="text-2xl mb-2">Verified Schools in Your Area</h2>
          <p className="text-slate-600">Showing {schools.length} schools</p>
        </div>

        <div className="grid gap-8">
          {schools.map((school, index) => (
            <motion.div
              key={school.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-slate-200"
            >
              <div className="grid md:grid-cols-3 gap-6">
                {/* School Image */}
                <div className="relative h-64 md:h-auto">
                  <img
                    src={school.image}
                    alt={school.name}
                    className="w-full h-full object-cover"
                  />
                  {school.verified && (
                    <div className="absolute top-4 right-4 bg-green-500 text-white px-3 py-1 rounded-full text-sm flex items-center space-x-1">
                      <CheckCircle className="w-4 h-4" />
                      <span>Verified</span>
                    </div>
                  )}
                  <div className="absolute bottom-4 left-4 bg-slate-900/90 backdrop-blur-sm text-white px-3 py-1 rounded-lg text-sm font-semibold">
                    Infrastructure: {school.infrastructureScore}%
                  </div>
                </div>

                {/* School Details */}
                <div className="md:col-span-2 p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="text-2xl mb-2">{school.name}</h3>
                      <div className="flex items-center space-x-4 text-sm text-slate-600 mb-4">
                        <span className="flex items-center space-x-1">
                          <MapPin className="w-4 h-4" />
                          <span>{school.location}</span>
                        </span>
                        <span className="inline-flex items-center space-x-1 bg-amber-100 text-amber-900 px-3 py-1 rounded-full font-medium">
                          <span>{school.board}</span>
                        </span>
                      </div>
                      <div className="flex items-center space-x-1 mb-4">
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-5 h-5 ${
                                i < Math.floor(school.rating)
                                  ? 'fill-amber-400 text-amber-400'
                                  : 'text-slate-300'
                              }`}
                            />
                          ))}
                        </div>
                        <span className="text-sm">{school.rating}</span>
                        <span className="text-sm text-slate-500">({school.reviews} reviews)</span>
                      </div>
                    </div>
                  </div>

                  {/* Quick Info Grid */}
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="flex items-center space-x-2 text-sm">
                      <Building className="w-4 h-4 text-slate-400" />
                      <span className="text-slate-600">Founded: <strong>{school.founded}</strong></span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm">
                      <Users className="w-4 h-4 text-slate-400" />
                      <span className="text-slate-600">Students: <strong>{school.students}</strong></span>
                    </div>
                  </div>

                  {/* Tags */}
                  <div className="space-y-3 mb-6">
                    <div>
                      <span className="text-xs text-slate-500 mb-1 block">Languages:</span>
                      <div className="flex flex-wrap gap-2">
                        {school.languages.map((lang) => (
                          <span key={lang} className="px-3 py-1 bg-slate-100 text-slate-700 rounded-lg text-xs">
                            {lang}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div>
                      <span className="text-xs text-slate-500 mb-1 block">Sports:</span>
                      <div className="flex flex-wrap gap-2">
                        {school.sports.slice(0, 3).map((sport) => (
                          <span key={sport} className="px-3 py-1 bg-slate-100 text-slate-700 rounded-lg text-xs">
                            {sport}
                          </span>
                        ))}
                        {school.sports.length > 3 && (
                          <span className="px-3 py-1 bg-slate-100 text-slate-700 rounded-lg text-xs">
                            +{school.sports.length - 3} more
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-3">
                    <Link to={`/schools/${school.id}`} className="flex-1">
                      <Button className="w-full bg-slate-900 hover:bg-slate-800 text-white">
                        View Full Details
                      </Button>
                    </Link>
                    <Button variant="outline" className="border-2 border-slate-300">
                      Book Consultation
                    </Button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
}
