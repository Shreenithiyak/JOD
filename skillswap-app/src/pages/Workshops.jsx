import { useState } from 'react';
import { FaSearch, FaMapMarkerAlt, FaCubes, FaCalendarAlt, FaSlidersH, FaClock, FaUserAlt, FaTicketAlt } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';

const workshopsData = [
  {
    id: 1,
    img: "https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&q=80&w=800",
    festival: "Chennai Skill Festival", price: "$149",
    date: "Oct 24, 2024 • 02:00 PM",
    title: "Robotics Workshop",
    mentorImg: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=100",
    mentorName: "Dr. Elena Thorne", mentorRole: "Senior Robotics Engineer",
    seats: "5 Seats Left", isWaitlist: false,
    city: "Chennai"
  },
  {
    id: 2,
    img: "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?auto=format&fit=crop&q=80&w=800",
    festival: "Hyderabad Skill Festival", price: "$89",
    date: "Nov 23, 2024 • 10:00 AM",
    title: "Scaling SaaS in India",
    mentorImg: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=100",
    mentorName: "Arjun Rao", mentorRole: "Industry Leader",
    seats: "12 Spots Left", isWaitlist: false,
    city: "Hyderabad"
  },
  {
    id: 3,
    img: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=80&w=800",
    festival: "Bangalore Skill Festival", price: "$120",
    date: "Dec 15, 2024 • 12:30 PM",
    title: "Interactive Prototyping Workshop",
    mentorImg: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=100",
    mentorName: "Julian Rivera", mentorRole: "Lead UX Designer",
    seats: "2 Seats Left", isWaitlist: false,
    city: "Bangalore"
  },
  {
    id: 4,
    img: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&q=80&w=800",
    festival: "Chennai Skill Festival", price: "$75",
    date: "Oct 24, 2024 • 11:30 AM",
    title: "Coastal Composition Masterclass",
    mentorImg: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=100",
    mentorName: "Sana Kapoor", mentorRole: "Travel Photographer",
    seats: "15 Spots Left", isWaitlist: false,
    city: "Chennai"
  },
  {
    id: 5,
    img: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&q=80&w=800",
    festival: "Hyderabad Skill Festival", price: "$110",
    date: "Nov 24, 2024 • 02:00 PM",
    title: "Pitch Competition Finals",
    mentorImg: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=100",
    mentorName: "Marco Viti", mentorRole: "VC Partner",
    seats: "8 Spots Left", isWaitlist: false,
    city: "Hyderabad"
  },
  {
    id: 6,
    img: "https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&q=80&w=800",
    festival: "Bangalore Skill Festival", price: "$135",
    date: "Dec 16, 2024 • 01:00 PM",
    title: "WebAssembly for Designers",
    mentorImg: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=100",
    mentorName: "Liam Chen", mentorRole: "Core Developer",
    seats: "Fully Booked", isWaitlist: true,
    city: "Bangalore"
  },
  {
    id: 7,
    img: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&q=80&w=800",
    festival: "Mumbai Skill Festival", price: "$199",
    date: "Jan 10, 2025 • 09:00 AM",
    title: "Fintech Innovations Keynote",
    mentorImg: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=100",
    mentorName: "Rohan Desai", mentorRole: "Fintech Founder",
    seats: "20 Spots Left", isWaitlist: false,
    city: "Mumbai"
  },
  {
    id: 8,
    img: "https://images.unsplash.com/photo-1573804633927-bfcbcd909acd?auto=format&fit=crop&q=80&w=800",
    festival: "Delhi Skill Festival", price: "$150",
    date: "Feb 22, 2025 • 11:30 AM",
    title: "Cybersecurity Masterclass",
    mentorImg: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=100",
    mentorName: "Aarti Singh", mentorRole: "Chief Security Officer",
    seats: "4 Spots Left", isWaitlist: false,
    city: "Delhi"
  },
  {
    id: 9,
    img: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?auto=format&fit=crop&q=80&w=800",
    festival: "Delhi Skill Festival", price: "$125",
    date: "Feb 23, 2025 • 10:00 AM",
    title: "Smart City Infrastructure",
    mentorImg: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=100",
    mentorName: "Karan Verma", mentorRole: "Urban Planner",
    seats: "10 Spots Left", isWaitlist: false,
    city: "Delhi"
  }
];

const Workshops = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [cityFilter, setCityFilter] = useState('City: All Cities');
  const [dateFilter, setDateFilter] = useState('Select Date');

  // Filter logic
  const filteredWorkshops = workshopsData.filter(workshop => {
    const matchesSearch = workshop.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          workshop.mentorName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          workshop.mentorRole.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCity = cityFilter === 'City: All Cities' || workshop.city === cityFilter;
    
    // Simplistic date filtering just for demonstration
    let matchesDate = true;
    if (dateFilter !== 'Select Date') {
      if (dateFilter === 'This Week') {
        matchesDate = workshop.date.includes('Oct 24'); // Mocking "this week"
      } else if (dateFilter === 'Next Month') {
        matchesDate = workshop.date.includes('Nov'); // Mocking "next month"
      }
    }
    
    return matchesSearch && matchesCity && matchesDate;
  });

  return (
    <div className="pt-24 pb-20 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* 1. Hero Section */}
        <div className="relative w-full h-[400px] rounded-3xl overflow-hidden shadow-xl mb-12">
          {/* We use an inline style to ensure Tailwind renders the dynamic background */}
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url('https://images.unsplash.com/photo-1459749411175-04bf5292ceea?auto=format&fit=crop&q=80&w=2000')` }}
          ></div>
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent"></div>
          
          <div className="relative h-full flex flex-col justify-center px-10 md:px-16 lg:px-20 max-w-3xl">
            <div className="bg-white/20 backdrop-blur-md border border-white/30 text-white text-[10px] font-bold px-3 py-1 rounded-full w-fit uppercase tracking-wider mb-6">
              Curated Experiences
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-4 leading-tight drop-shadow-lg">
              Explore Upcoming<br/>Workshops
            </h1>
            <p className="text-gray-200 text-sm md:text-base font-medium max-w-xl leading-relaxed drop-shadow-md">
              Master new crafts from world-class industry leaders... Join a global community of innovators, designers, and tech enthusiasts.
            </p>
          </div>
        </div>

        {/* 2. Filter Bar */}
        <div className="bg-white p-3 rounded-2xl shadow-sm border border-gray-100 flex flex-col md:flex-row gap-3 mb-12">
          <div className="flex-1 relative">
            <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            <input 
              type="text" 
              placeholder="Search workshops by title, mentor, or role..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-gray-50 pl-10 pr-4 py-3 rounded-xl border border-transparent focus:bg-white focus:border-primary-300 focus:ring-2 focus:ring-primary-100 outline-none text-sm transition-all"
            />
          </div>
          
          <div className="flex gap-3 overflow-x-auto pb-2 md:pb-0">
            <div className="flex items-center gap-2 bg-gray-50 px-4 py-3 rounded-xl min-w-[140px] border border-transparent hover:border-gray-200 cursor-pointer transition-colors">
              <FaMapMarkerAlt className="text-primary-500" />
              <select 
                value={cityFilter}
                onChange={(e) => setCityFilter(e.target.value)}
                className="bg-transparent border-none outline-none text-sm font-semibold text-gray-700 w-full cursor-pointer"
              >
                <option>City: All Cities</option>
                <option>Bangalore</option>
                <option>Chennai</option>
                <option>Hyderabad</option>
                <option>Mumbai</option>
                <option>Delhi</option>
              </select>
            </div>
            <div className="flex items-center gap-2 bg-gray-50 px-4 py-3 rounded-xl min-w-[140px] border border-transparent hover:border-gray-200 cursor-pointer transition-colors">
              <FaCalendarAlt className="text-primary-500" />
              <select 
                value={dateFilter}
                onChange={(e) => setDateFilter(e.target.value)}
                className="bg-transparent border-none outline-none text-sm font-semibold text-gray-700 w-full cursor-pointer"
              >
                <option>Select Date</option>
                <option>This Week</option>
                <option>Next Month</option>
              </select>
            </div>
            <button 
              onClick={() => { setSearchQuery(''); setCityFilter('City: All Cities'); setDateFilter('Select Date'); }}
              title="Clear Filters"
              className="bg-primary-50 text-primary-600 p-3 rounded-xl hover:bg-primary-100 transition-colors shrink-0"
            >
              <FaSlidersH />
            </button>
          </div>
        </div>

        {/* 3. Workshops Grid */}
        {filteredWorkshops.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-3xl shadow-sm border border-gray-100 mb-16">
            <h3 className="text-2xl font-bold text-gray-900 mb-2">No workshops found</h3>
            <p className="text-gray-500">Try adjusting your filters to find what you're looking for.</p>
            <button 
              onClick={() => { setSearchQuery(''); setCityFilter('City: All Cities'); setDateFilter('Select Date'); }}
              className="mt-6 text-primary-600 font-bold hover:underline"
            >
              Clear all filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {filteredWorkshops.map(workshop => (
              <WorkshopCard 
                key={workshop.id}
                img={workshop.img}
                festival={workshop.festival} price={workshop.price}
                date={workshop.date}
                title={workshop.title}
                mentorImg={workshop.mentorImg}
                mentorName={workshop.mentorName} mentorRole={workshop.mentorRole}
                seats={workshop.seats} isWaitlist={workshop.isWaitlist}
              />
            ))}
          </div>
        )}

        <div className="flex justify-center mb-24">
          <button className="border-2 border-primary-100 text-primary-600 hover:bg-primary-50 font-bold py-3 px-8 rounded-full transition-colors">
            Discover More Workshops
          </button>
        </div>

        {/* 4. Newsletter */}
        <div className="bg-primary-600 rounded-3xl p-10 md:p-16 flex flex-col md:flex-row items-center justify-between shadow-2xl relative overflow-hidden">
          {/* Background decoration */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
          
          <div className="mb-8 md:mb-0 relative z-10 max-w-lg">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Don't miss a beat.</h2>
            <p className="text-primary-100">
              Get notified when new workshops, festivals, and expert mentors are announced in your city.
            </p>
          </div>
          <div className="w-full md:w-auto relative z-10 flex-shrink-0">
            <div className="bg-white/10 p-1.5 rounded-full flex items-center w-full md:w-[350px] border border-white/20 backdrop-blur-md">
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="bg-transparent border-none text-white placeholder-primary-200 outline-none px-4 py-2 w-full text-sm"
              />
              <button className="bg-white text-primary-700 font-bold py-2.5 px-6 rounded-full text-sm hover:bg-gray-50 transition-colors shadow-sm">
                Subscribe
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Workshops;

// Helper Component
const WorkshopCard = ({ img, festival, price, date, title, mentorImg, mentorName, mentorRole, seats, isWaitlist }) => {
  const navigate = useNavigate();
  
  const handleNavigate = () => {
    const city = festival.toLowerCase().split(' ')[0]; // e.g. 'chennai', 'hyderabad', 'bangalore'
    navigate(`/festivals?city=${city}&event=${encodeURIComponent(title)}`);
  };

  return (
    <div 
      onClick={handleNavigate}
      className="bg-white rounded-3xl p-4 shadow-sm border border-gray-100 hover:shadow-xl transition-all duration-300 group flex flex-col h-full cursor-pointer"
    >
      
      {/* Image Container */}
      <div className="relative h-48 rounded-2xl overflow-hidden mb-5">
        <img 
          src={img} 
          alt={title} 
          onError={(e) => { e.target.onerror = null; e.target.src = 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=800'; }}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
        />
        
        {/* Badges */}
        <div className="absolute top-3 left-3 bg-primary-600/90 backdrop-blur-sm text-white text-[9px] font-bold px-3 py-1.5 rounded-lg uppercase tracking-wider shadow-sm">
          {festival}
        </div>
        <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm text-gray-900 font-extrabold px-3 py-1.5 rounded-lg shadow-sm">
          {price}
        </div>
      </div>
      
      {/* Content */}
      <div className="px-2 flex-grow flex flex-col">
        <div className="flex items-center gap-2 text-xs text-primary-600 font-bold mb-2">
          <FaClock />
          <span>{date}</span>
        </div>
        
        <h3 className="text-xl font-bold text-gray-900 leading-tight mb-4">{title}</h3>
        
        <div className="bg-gray-50 rounded-xl p-3 flex items-center gap-3 mb-6 mt-auto">
          <img 
            src={mentorImg} 
            alt={mentorName} 
            onError={(e) => { e.target.onerror = null; e.target.src = 'https://ui-avatars.com/api/?name=' + encodeURIComponent(mentorName) + '&background=random'; }}
            className="w-10 h-10 rounded-full border border-gray-200 object-cover" 
          />
          <div>
            <h4 className="text-xs font-bold text-gray-900">{mentorName}</h4>
            <p className="text-[10px] text-gray-500 font-semibold uppercase tracking-wider">{mentorRole}</p>
          </div>
        </div>
        
        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          <div className={`flex items-center gap-1.5 text-xs font-bold ${isWaitlist ? 'text-gray-500' : 'text-red-500'}`}>
            <FaUserAlt size={10} />
            {seats}
          </div>
          <button 
            onClick={(e) => { e.stopPropagation(); handleNavigate(); }}
            className={`font-bold py-2 px-5 rounded-full text-xs transition-colors shadow-sm ${
              isWaitlist 
                ? 'bg-gray-100 text-gray-600 hover:bg-gray-200' 
                : 'bg-primary-600 text-white hover:bg-primary-700'
            }`}
          >
            {isWaitlist ? 'Waitlist' : 'Secure Spot'}
          </button>
        </div>
      </div>
    </div>
  );
};
