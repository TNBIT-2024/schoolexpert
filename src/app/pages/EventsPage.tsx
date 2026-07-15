import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Calendar, 
  MapPin, 
  Clock, 
  Ticket, 
  CheckCircle2, 
  ArrowLeft,
  Sparkles,
  Check,
  Building
} from 'lucide-react';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';

interface Event {
  id: string;
  title: string;
  speaker: string;
  speakerTitle: string;
  date: string;
  time: string;
  mode: 'Online' | 'Offline' | 'Hybrid';
  location: string;
  desc: string;
  details: string[];
}

const UPCOMING_EVENT: Event = {
  id: 'ev-shalini-schools-vendors',
  title: 'Choosing the Right School & Selecting Quality Educational Vendors',
  speaker: 'Shalini Santhosh',
  speakerTitle: 'Education Specialist & Director of Academics',
  date: 'Wednesday, August 12, 2026',
  time: '10:00 AM - 12:30 PM IST',
  mode: 'Hybrid',
  location: 'School Expert Campus, Bangalore & Zoom Live Stream',
  desc: 'An exclusive masterclass and workshop tailored for school administrators, educators, and parents. Discover verified frameworks to evaluate school academic curriculums and select top-tier educational vendors—ranging from ERP systems and digital publishers to infrastructure suppliers.',
  details: [
    'Evaluating academic curriculum frameworks',
    'Selecting reliable school ERP & management systems',
    'Quality standards for educational publishers & content',
    'Procurement criteria for lab and classroom vendors',
    'Q&A Session directly with Shalini Santhosh'
  ]
};

export function EventsPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    school: '',
    mode: 'Online'
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [registeredTicket, setRegisteredTicket] = useState<{
    ticketId: string;
    eventTitle: string;
    speaker: string;
    date: string;
    time: string;
    mode: string;
    location: string;
    attendeeName: string;
    attendeeSchool: string;
  } | null>(null);

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.phone) return;

    setIsSubmitting(true);
    setTimeout(() => {
      const ticketId = `TSE-EV-${Math.floor(100000 + Math.random() * 900000)}`;
      setRegisteredTicket({
        ticketId,
        eventTitle: UPCOMING_EVENT.title,
        speaker: UPCOMING_EVENT.speaker,
        date: UPCOMING_EVENT.date,
        time: UPCOMING_EVENT.time,
        mode: formData.mode,
        location: UPCOMING_EVENT.location,
        attendeeName: formData.name,
        attendeeSchool: formData.school || 'Independent Educator'
      });
      setIsSubmitting(false);
      setFormData({
        name: '',
        email: '',
        phone: '',
        school: '',
        mode: 'Online'
      });
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-[#FAF9F6] text-[#2C2621] font-geist selection:bg-amber-100">
      <Navbar />

      <main className="max-w-4xl mx-auto px-6 pt-44 pb-32">
        <AnimatePresence mode="wait">
          {!registeredTicket ? (
            <motion.div
              key="event-details-view"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="space-y-16"
            >
              {/* Centered Header Section */}
              <div className="text-center space-y-6">
                <div className="inline-flex items-center gap-2 text-amber-700 font-extrabold text-[10px] tracking-[0.25em] uppercase">
                  <Sparkles className="w-3.5 h-3.5 fill-amber-700/10" />
                  <span>August Masterclass</span>
                </div>
                <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight leading-tight max-w-3xl mx-auto">
                  {UPCOMING_EVENT.title}
                </h1>
                
                {/* Speaker Info */}
                <div className="flex items-center justify-center gap-3 pt-2">
                  <div className="w-10 h-10 rounded-full bg-amber-500/10 border border-amber-550/10 flex items-center justify-center font-bold text-amber-800 text-xs">
                    SS
                  </div>
                  <div className="text-left">
                    <p className="text-[9px] text-slate-400 font-black uppercase tracking-wider">Speaker</p>
                    <h4 className="text-xs font-black text-slate-800 leading-none">{UPCOMING_EVENT.speaker}</h4>
                    <p className="text-[9px] text-slate-500 font-semibold">{UPCOMING_EVENT.speakerTitle}</p>
                  </div>
                </div>
              </div>

              {/* Grid of logistics and details */}
              <div className="grid md:grid-cols-12 gap-10 pt-4 border-t border-slate-200/60">
                {/* Left Column: Description & Highlights (7 columns) */}
                <div className="md:col-span-7 space-y-6">
                  <p className="text-slate-650 text-sm sm:text-base leading-relaxed font-semibold">
                    {UPCOMING_EVENT.desc}
                  </p>

                  <div className="space-y-3.5 pt-4">
                    <h5 className="text-[10px] font-black uppercase tracking-wider text-slate-400">Key Takeaways</h5>
                    <ul className="space-y-3">
                      {UPCOMING_EVENT.details.map((detail, idx) => (
                        <li key={idx} className="flex gap-3 text-xs text-slate-600 font-bold">
                          <Check className="w-4 h-4 text-amber-700 flex-shrink-0 mt-0.5" />
                          <span>{detail}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Right Column: Logistics (5 columns) */}
                <div className="md:col-span-5 bg-white border border-[#E6E1DA] rounded-[2rem] p-8 space-y-6 shadow-sm self-start">
                  <h4 className="text-xs font-black uppercase tracking-widest text-slate-400 border-b border-slate-100 pb-3">Event Details</h4>
                  
                  <div className="space-y-4">
                    <div className="flex gap-3 items-start">
                      <Calendar className="w-4 h-4 text-amber-700 mt-1 flex-shrink-0" />
                      <div>
                        <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block">Date</span>
                        <span className="text-xs font-black text-slate-850">{UPCOMING_EVENT.date.split(', ')[1]}</span>
                      </div>
                    </div>

                    <div className="flex gap-3 items-start">
                      <Clock className="w-4 h-4 text-amber-700 mt-1 flex-shrink-0" />
                      <div>
                        <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block">Time</span>
                        <span className="text-xs font-black text-slate-855">{UPCOMING_EVENT.time}</span>
                      </div>
                    </div>

                    <div className="flex gap-3 items-start">
                      <MapPin className="w-4 h-4 text-amber-700 mt-1 flex-shrink-0" />
                      <div>
                        <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block">Location / Venue</span>
                        <span className="text-xs font-black text-slate-855 block leading-tight">{UPCOMING_EVENT.mode} Format</span>
                        <span className="text-[10px] text-slate-500 font-semibold block mt-0.5 leading-tight">{UPCOMING_EVENT.location}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Centered Registration Area */}
              <div className="pt-12 border-t border-slate-200/60 max-w-xl mx-auto w-full">
                <div className="text-center space-y-2 mb-10">
                  <h3 className="text-xl font-black text-slate-900">Request Invitation</h3>
                  <p className="text-xs text-slate-500 font-semibold">Please fill out the details below to generate your event access pass.</p>
                </div>

                <form onSubmit={handleRegister} className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="space-y-1 relative">
                      <label className="text-[9px] font-black text-slate-450 uppercase tracking-wider block">Full Name</label>
                      <Input
                        type="text"
                        required
                        placeholder="e.g. Shalini Santhosh"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="bg-transparent border-0 border-b-2 border-[#E6E1DA] focus:border-amber-600 rounded-none px-0 py-2.5 text-xs font-bold w-full focus-visible:ring-0 focus-visible:ring-offset-0 placeholder:text-slate-300"
                      />
                    </div>

                    <div className="space-y-1 relative">
                      <label className="text-[9px] font-black text-slate-450 uppercase tracking-wider block">School or Affiliation</label>
                      <Input
                        type="text"
                        placeholder="e.g. DPS Bangalore"
                        value={formData.school}
                        onChange={(e) => setFormData({ ...formData, school: e.target.value })}
                        className="bg-transparent border-0 border-b-2 border-[#E6E1DA] focus:border-amber-600 rounded-none px-0 py-2.5 text-xs font-bold w-full focus-visible:ring-0 focus-visible:ring-offset-0 placeholder:text-slate-300"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="space-y-1 relative">
                      <label className="text-[9px] font-black text-slate-450 uppercase tracking-wider block">Email Address</label>
                      <Input
                        type="email"
                        required
                        placeholder="e.g. name@school.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="bg-transparent border-0 border-b-2 border-[#E6E1DA] focus:border-amber-600 rounded-none px-0 py-2.5 text-xs font-bold w-full focus-visible:ring-0 focus-visible:ring-offset-0 placeholder:text-slate-300"
                      />
                    </div>

                    <div className="space-y-1 relative">
                      <label className="text-[9px] font-black text-slate-450 uppercase tracking-wider block">Phone Number</label>
                      <Input
                        type="tel"
                        required
                        placeholder="e.g. +91 98765 43210"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="bg-transparent border-0 border-b-2 border-[#E6E1DA] focus:border-amber-600 rounded-none px-0 py-2.5 text-xs font-bold w-full focus-visible:ring-0 focus-visible:ring-offset-0 placeholder:text-slate-300"
                      />
                    </div>
                  </div>

                  <div className="space-y-1 relative">
                    <label className="text-[9px] font-black text-slate-450 uppercase tracking-wider block">Attendance Format</label>
                    <select
                      value={formData.mode}
                      onChange={(e) => setFormData({ ...formData, mode: e.target.value })}
                      className="w-full bg-transparent border-0 border-b-2 border-[#E6E1DA] focus:border-amber-600 rounded-none px-0 py-2.5 text-xs font-bold text-slate-700 focus:outline-none focus-visible:ring-0 focus-visible:ring-offset-0"
                    >
                      <option value="Online">Online Live Stream (Zoom/Teams)</option>
                      <option value="Offline">Offline Attendance (At Location)</option>
                    </select>
                  </div>

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-[#1C1714] hover:bg-[#2C2621] text-white font-extrabold py-5 rounded-xl transition-all uppercase text-[10px] tracking-wider pt-3.5 pb-3 cursor-pointer shadow-md hover:shadow-lg mt-4"
                  >
                    {isSubmitting ? 'Submitting Details...' : 'Request Invitation Pass'}
                  </Button>
                </form>
              </div>

            </motion.div>
          ) : (
            /* Centered Editorial Ticket Confirmation */
            <motion.div
              key="registered-success-view"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="max-w-xl mx-auto space-y-8 text-center"
            >
              <div className="space-y-2">
                <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto stroke-[1.5]" />
                <h2 className="text-2xl font-black text-slate-900 tracking-tight">Your invitation has been requested</h2>
                <p className="text-xs text-slate-500 font-semibold max-w-sm mx-auto">
                  A verification email has been sent. Your custom ticket pass has been generated below.
                </p>
              </div>

              {/* Digital Tear-Off Ticket Stub */}
              <div className="relative bg-white border border-[#E6E1DA] rounded-3xl p-8 space-y-6 shadow-lg overflow-hidden text-left font-geist">
                
                {/* Circle Cutouts for Tear-Off Stub */}
                <div className="absolute top-1/2 -translate-y-1/2 -left-4 w-8 h-8 rounded-full bg-[#FAF9F6] border border-[#E6E1DA] z-10" />
                <div className="absolute top-1/2 -translate-y-1/2 -right-4 w-8 h-8 rounded-full bg-[#FAF9F6] border border-[#E6E1DA] z-10" />

                {/* Header */}
                <div className="flex justify-between items-center pb-4 border-b border-dashed border-slate-200">
                  <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">TICKET PASS</span>
                  <span className="text-xs font-mono font-black text-amber-700">{registeredTicket.ticketId}</span>
                </div>

                {/* Event Info */}
                <div className="space-y-1">
                  <span className="text-[8px] font-black text-slate-400 uppercase tracking-widest">EVENT</span>
                  <h4 className="text-sm font-black text-slate-900 leading-snug">{registeredTicket.eventTitle}</h4>
                  <p className="text-[10px] text-slate-500 font-semibold">Led by {registeredTicket.speaker}</p>
                </div>

                {/* Logistics */}
                <div className="grid grid-cols-2 gap-4 text-[11px] font-bold text-slate-650 pt-2">
                  <div>
                    <span className="text-[8px] font-black text-slate-450 uppercase tracking-widest block">DATE & TIME</span>
                    <div className="text-slate-850 font-black">{registeredTicket.date.split(', ')[1]}</div>
                    <div className="text-slate-500 font-semibold">{registeredTicket.time}</div>
                  </div>
                  <div>
                    <span className="text-[8px] font-black text-slate-450 uppercase tracking-widest block">VENUE FORMAT</span>
                    <div className="text-slate-850 font-black">{registeredTicket.mode} Format</div>
                    <div className="truncate text-slate-500 font-semibold leading-tight">{registeredTicket.location.split(' & ')[0]}</div>
                  </div>
                </div>

                <div className="h-px border-t border-dashed border-slate-200 my-2" />

                {/* Attendee info */}
                <div className="space-y-1">
                  <span className="text-[8px] font-black text-slate-450 uppercase tracking-widest">ATTENDEE</span>
                  <div className="text-xs font-black text-slate-950">{registeredTicket.attendeeName}</div>
                  <div className="text-[10px] text-slate-500 font-bold">{registeredTicket.attendeeSchool}</div>
                </div>

              </div>

              {/* Actions */}
              <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2 max-w-sm mx-auto">
                <Button 
                  onClick={() => window.print()}
                  className="w-full bg-[#1C1714] hover:bg-[#2C2621] text-white font-extrabold py-5 rounded-xl text-[10px] tracking-wider uppercase flex items-center justify-center gap-1.5 pt-3.5 pb-3 cursor-pointer"
                >
                  <Ticket className="w-3.5 h-3.5" />
                  Print Ticket
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setRegisteredTicket(null)}
                  className="w-full border-2 border-slate-200 hover:border-slate-800 text-[#2C2621] font-bold py-5 rounded-xl text-[10px] tracking-wider uppercase flex items-center justify-center gap-1.5 pt-3.5 pb-3 cursor-pointer bg-transparent"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  Back to Event
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <Footer />
    </div>
  );
}
