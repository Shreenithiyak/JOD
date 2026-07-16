import { useState, useEffect } from 'react';
import { FaMapMarkerAlt, FaTicketAlt, FaStar, FaHandsHelping, FaGraduationCap, FaTrophy } from 'react-icons/fa';

const Dashboard = () => {
  const [user, setUser] = useState({ name: 'Alex' });

  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  return (
    <div className="min-h-screen pt-20 pb-16 bg-[#F8F9FB]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Welcome Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 gap-4">
          <div>
            <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-2 capitalize">Welcome back, {user.name}!</h1>
            <p className="text-gray-600 max-w-xl">
              You've got 2 upcoming workshops this week. Your creative journey at SkillSwap Festival continues in 4 days.
            </p>
          </div>
          <div className="flex gap-3">
            <button className="bg-primary-50 text-primary-700 hover:bg-primary-100 font-semibold py-2.5 px-6 rounded-full transition-colors text-sm">
              My Calendar
            </button>
            <button className="bg-primary-600 text-white hover:bg-primary-700 font-bold py-2.5 px-6 rounded-full transition-colors text-sm shadow-sm">
              Browse More
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Main Left Column */}
          <div className="lg:col-span-2 space-y-10">
            
            {/* Upcoming Festival Ticket */}
            <section>
              <h2 className="text-xl font-bold text-gray-900 mb-4">Upcoming Festival Ticket</h2>
              <div className="bg-white rounded-3xl overflow-hidden shadow-sm border border-gray-100 flex flex-col md:flex-row">
                
                {/* Ticket Image Side */}
                <div className="md:w-1/2 relative h-64 md:h-auto">
                  <img src="https://images.unsplash.com/photo-1459749411175-04bf5292ceea?auto=format&fit=crop&q=80&w=800" alt="Festival" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex flex-col justify-end p-6">
                    <span className="bg-white/20 backdrop-blur border border-white/30 text-white text-[10px] font-bold px-2 py-1 rounded w-fit uppercase mb-2">Main Event</span>
                    <h3 className="text-2xl font-bold text-white leading-tight mb-1">SkillSwap Tech & Arts 2024</h3>
                    <p className="text-gray-300 text-xs flex items-center gap-1"><FaMapMarkerAlt /> Central Park Amphitheater</p>
                  </div>
                </div>

                {/* Ticket Details Side */}
                <div className="md:w-1/2 p-8 flex flex-col justify-between">
                  <div className="flex justify-between items-start mb-6">
                    <div>
                      <p className="text-[10px] text-gray-400 font-bold tracking-widest uppercase mb-1">Date & Time</p>
                      <h4 className="text-xl font-extrabold text-gray-900">Oct 24 - 26</h4>
                      <p className="text-sm text-gray-500">Starts at 09:00 AM</p>
                    </div>
                    <div className="bg-primary-50 p-3 rounded-xl text-primary-600">
                      <FaTicketAlt size={20} />
                    </div>
                  </div>
                  
                  <div>
                    <p className="text-[10px] text-gray-400 font-bold tracking-widest uppercase mb-2">Gate Access QR</p>
                    <div className="border-2 border-dashed border-gray-200 rounded-xl p-4 flex justify-center items-center h-24 mb-6 relative overflow-hidden bg-gray-50">
                       <img src="https://api.qrserver.com/v1/create-qr-code/?size=100x100&data=SkillSwapFestivalTicket12345" alt="QR Code" className="h-16 mix-blend-multiply opacity-50" />
                    </div>
                  </div>

                  <button className="w-full border border-primary-600 text-primary-600 hover:bg-primary-50 font-bold py-2.5 rounded-xl transition-colors text-sm">
                    Download PDF
                  </button>
                </div>
              </div>
            </section>

            {/* Recommended for You */}
            <section>
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-gray-900">Recommended for You</h2>
                <a href="#" className="text-primary-600 text-sm font-bold hover:text-primary-700">View All</a>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <RecommendedCard 
                  img="https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&q=80&w=600"
                  tag="PHOTOGRAPHY" time="3.5 Hours"
                  title="Cinematic Lighting for Solo Creators"
                  desc="Master the art of 3-point lighting using minimal gear and natural elements."
                />
                <RecommendedCard 
                  img="https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&q=80&w=600"
                  tag="DEVELOPMENT" time="5.0 Hours"
                  title="Interactive UI with Framer Motion"
                  desc="Build buttery smooth animations that feel native and premium for your SaaS..."
                />
              </div>
            </section>
          </div>

          {/* Right Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            
            {/* Learning Tracks */}
            <div className="bg-primary-50 rounded-3xl p-6 border border-primary-100">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Learning Tracks</h3>
              <div className="space-y-6">
                <TrackBar title="UX Strategy Workshop" progress={78} next="Next: 'User Flow Mapping'" color="bg-primary-600" />
                <TrackBar title="Advanced React Patterns" progress={42} next="Next: 'Custom Hooks Mastery'" color="bg-primary-500" />
                <TrackBar title="Modern Architecture" progress={15} color="bg-teal-600" />
              </div>
            </div>

            {/* Achievements */}
            <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Achievements</h3>
              <div className="grid grid-cols-3 gap-2">
                 <Badge icon={<FaStar />} label="EARLY BIRD" active color="text-blue-600" bg="bg-blue-50" />
                 <Badge icon={<FaHandsHelping />} label="INFLUENCER" active color="text-purple-600" bg="bg-purple-50" />
                 <Badge icon={<FaGraduationCap />} label="ACADEMIC" active color="text-teal-600" bg="bg-teal-50" />
                 <Badge icon={<FaTrophy />} label="LOCKED" active={false} />
              </div>
            </div>

            {/* Saved */}
            <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold text-gray-900">Saved</h3>
                <span className="bg-primary-100 text-primary-700 text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider">4 items</span>
              </div>
              <div className="space-y-4">
                <SavedItem 
                  img="https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&q=80&w=150"
                  title="Tactile Ceramics & Glazing" date="Sat, 14:00 • Hall B"
                />
                <SavedItem 
                  img="https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&q=80&w=150"
                  title="Plant-Based Fine Dining" date="Sun, 11:30 • Stage 2"
                />
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

// Helper Components
const RecommendedCard = ({ img, tag, time, title, desc }) => (
  <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 group cursor-pointer hover:shadow-md transition-shadow flex flex-col">
    <div className="h-48 overflow-hidden relative">
      <img src={img} alt={title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
    </div>
    <div className="p-6 flex-1 flex flex-col">
      <div className="flex items-center gap-2 mb-2">
        <span className="bg-primary-50 text-primary-700 text-[9px] font-bold px-2 py-0.5 rounded uppercase tracking-wider">{tag}</span>
        <span className="text-xs text-gray-500 font-medium">• {time}</span>
      </div>
      <h3 className="font-bold text-gray-900 text-lg mb-2 leading-tight">{title}</h3>
      <p className="text-sm text-gray-500 line-clamp-2 mt-auto">{desc}</p>
    </div>
  </div>
);

const TrackBar = ({ title, progress, next, color }) => (
  <div>
    <div className="flex justify-between items-end mb-1">
      <h4 className="font-bold text-gray-900 text-sm">{title}</h4>
      <span className="text-primary-600 font-bold text-xs">{progress}%</span>
    </div>
    <div className="w-full bg-primary-100 rounded-full h-1.5 mb-1.5 overflow-hidden">
      <div className={`${color} h-1.5 rounded-full`} style={{ width: `${progress}%` }}></div>
    </div>
    {next && <p className="text-[10px] text-gray-500 font-medium italic">{next}</p>}
  </div>
);

const Badge = ({ icon, label, active, color, bg }) => (
  <div className="flex flex-col items-center">
    <div className={`w-14 h-14 rounded-full flex items-center justify-center text-2xl mb-2 ${active ? `${bg} ${color}` : 'bg-gray-50 text-gray-300'}`}>
      {icon}
    </div>
    <span className={`text-[9px] font-bold uppercase tracking-wider ${active ? 'text-gray-600' : 'text-gray-400'}`}>{label}</span>
  </div>
);

const SavedItem = ({ img, title, date }) => (
  <div className="flex gap-4 items-center group cursor-pointer">
    <div className="w-12 h-12 rounded-lg overflow-hidden shrink-0">
      <img src={img} alt={title} className="w-full h-full object-cover group-hover:scale-110 transition-transform" />
    </div>
    <div>
      <h4 className="font-bold text-gray-900 text-sm group-hover:text-primary-600 transition-colors line-clamp-1">{title}</h4>
      <p className="text-xs text-gray-500">{date}</p>
    </div>
  </div>
);
