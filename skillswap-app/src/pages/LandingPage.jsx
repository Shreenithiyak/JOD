import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  FaMapMarkerAlt, FaCalendarAlt, FaSearch, FaChevronLeft, FaChevronRight,
  FaLaptopCode, FaRobot, FaCamera, FaPalette, FaUtensils, FaMusic, FaBriefcase, FaDumbbell,
  FaMapMarkedAlt, FaGlobe, FaUsers, FaChalkboardTeacher
} from 'react-icons/fa';

const LandingPage = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const heroImages = [
    '/hero-banner.jpg', // Main stage
    'https://images.unsplash.com/photo-1470229722913-7c090be5c520?auto=format&fit=crop&q=80&w=2000', // Crowd at festival
    'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&q=80&w=2000', // Festival lights
  ];

  // Auto-slider effect
  useEffect(() => {
    const slideInterval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroImages.length);
    }, 5000); // 5 seconds

    return () => clearInterval(slideInterval);
  }, [heroImages.length]);

  return (
    <div className="pt-16 pb-20 bg-gray-50">
      
      {/* 1. Hero Banner with Auto-Slider */}
      <div className="relative h-[80vh] min-h-[600px] w-full bg-black overflow-hidden">
        {heroImages.map((img, index) => (
          <div 
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${index === currentSlide ? 'opacity-100' : 'opacity-0'}`}
          >
            <div 
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url(${img})` }}
            ></div>
            {/* Simple neutral overlay for text readability */}
            <div className="absolute inset-0 bg-black/30"></div>
          </div>
        ))}
        
        {/* Static Content Overlay */}
        <div className="absolute inset-0 flex flex-col justify-center items-start px-4 sm:px-8 lg:px-16 max-w-7xl mx-auto z-10">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-white mb-6 leading-tight max-w-3xl drop-shadow-lg">
            One Festival. Endless<br/>Skills. <span className="text-blue-200">New City Every<br/>Time.</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-100 max-w-2xl mb-12 drop-shadow-md font-medium">
            Discover SkillSwap festivals happening across different cities. Learn from experts, join hands-on workshops, and unlock new crafts.
          </p>
          
          {/* Search/Filter Bar */}
          <div className="bg-white/90 backdrop-blur-md p-2 rounded-full shadow-2xl flex flex-col sm:flex-row items-center gap-2 w-full max-w-3xl border border-white/50">
            <div className="flex items-center flex-1 w-full px-4 py-2 border-b sm:border-b-0 sm:border-r border-gray-200">
              <FaMapMarkerAlt className="text-primary-500 mr-3" />
              <select className="w-full bg-transparent border-none text-gray-700 outline-none text-sm font-semibold cursor-pointer">
                <option value="">Select City</option>
                <option value="bangalore">Bangalore</option>
                <option value="chennai">Chennai</option>
                <option value="hyderabad">Hyderabad</option>
              </select>
            </div>
            <div className="flex items-center flex-1 w-full px-4 py-2 border-b sm:border-b-0 sm:border-r border-gray-200">
              <FaCalendarAlt className="text-primary-500 mr-3" />
              <select className="w-full bg-transparent border-none text-gray-700 outline-none text-sm font-semibold cursor-pointer">
                <option value="">Select Date</option>
                <option value="nov">November 2024</option>
                <option value="dec">December 2024</option>
              </select>
            </div>
            <button className="bg-primary-600 hover:bg-primary-700 text-white font-bold py-3 px-8 rounded-full transition-colors w-full sm:w-auto shadow-md">
              Search
            </button>
          </div>
        </div>
      </div>

      {/* 2. Upcoming Festivals */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-24">
        <div className="flex justify-between items-end mb-10">
          <div>
            <h2 className="text-3xl font-bold text-primary-700 mb-2">Upcoming Festivals</h2>
            <p className="text-gray-500 text-sm">The new wave of innovations coming to these cities.</p>
          </div>
          <div className="hidden sm:flex gap-2">
            <button className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-gray-100 transition-colors"><FaChevronLeft size={12} /></button>
            <button className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-gray-100 transition-colors"><FaChevronRight size={12} /></button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <FestivalCard 
            city="Chennai" date="Oct 24" loc="ECR Coastal Grounds" 
            upcoming="45+" mentors="12" img="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=80&w=600" 
            tag="HOT EVENT" path="/festivals" 
          />
          <FestivalCard 
            city="Bangalore" date="Nov 05" loc="Electronic City" 
            upcoming="60+" mentors="25" img="https://images.unsplash.com/photo-1459749411175-04bf5292ceea?auto=format&fit=crop&q=80&w=600" 
            tag="FILLING FAST" path="/festivals" 
          />
          <FestivalCard 
            city="Hyderabad" date="Nov 22" loc="Hitex Exhibition" 
            upcoming="30+" mentors="15" img="https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&q=80&w=600" 
            tag="PREMIUM" path="/festivals" 
          />
        </div>
      </div>

      {/* 3. Map Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-32">
        <div className="bg-white rounded-3xl p-12 shadow-sm border border-primary-50 flex flex-col md:flex-row items-center gap-12">
          <div className="w-full md:w-1/3">
            <h2 className="text-2xl font-bold text-primary-700 mb-6">We're Spreading Everywhere</h2>
            <p className="text-gray-500 mb-8 text-sm leading-relaxed">SkillSwap is a nomad festival. Each month, we pick a new city, transform it into a hub of learning, and move on. Is your city next?</p>
            
            <ul className="space-y-4 mb-8">
              <li className="flex items-center gap-4 text-sm text-gray-700 font-medium">
                <div className="bg-primary-50 p-2 rounded-full text-primary-600"><FaMapMarkedAlt /></div>
                5+ Indian Cities visited so far
              </li>
              <li className="flex items-center gap-4 text-sm text-gray-700 font-medium">
                <div className="bg-primary-50 p-2 rounded-full text-primary-600"><FaGlobe /></div>
                Local mentors in every location
              </li>
              <li className="flex items-center gap-4 text-sm text-gray-700 font-medium">
                <div className="bg-primary-50 p-2 rounded-full text-primary-600"><FaUsers /></div>
                Hybrid networking opportunities
              </li>
            </ul>
            <button className="border border-primary-300 text-primary-700 font-bold py-2.5 px-6 rounded-full hover:bg-primary-50 transition-colors text-sm">
              Nominate Your City
            </button>
          </div>
          <div className="w-full md:w-2/3 flex justify-center">
            {/* Map Placeholder Image */}
            <img src="https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&q=80&w=800" alt="Map" className="rounded-2xl shadow-md w-full max-w-lg object-cover h-80 opacity-90" />
          </div>
        </div>
      </div>

      {/* 4. Categories */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-32 text-center">
        <h2 className="text-3xl font-bold text-primary-700 mb-2">What do you want to learn?</h2>
        <p className="text-gray-500 mb-12 text-sm">Dive deep into these topics with hands-on sessions led by industry pioneers.</p>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <CategoryCard icon={<FaLaptopCode size={24} />} title="Programming" count="45 Workshops" />
          <CategoryCard icon={<FaRobot size={24} />} title="AI & ML" count="30 Workshops" />
          <CategoryCard icon={<FaCamera size={24} />} title="Photography" count="25 Workshops" />
          <CategoryCard icon={<FaPalette size={24} />} title="Graphic Design" count="40 Workshops" />
          <CategoryCard icon={<FaUtensils size={24} />} title="Cooking" count="15 Workshops" />
          <CategoryCard icon={<FaMusic size={24} />} title="Music" count="20 Workshops" />
          <CategoryCard icon={<FaBriefcase size={24} />} title="Business" count="55 Workshops" />
          <CategoryCard icon={<FaDumbbell size={24} />} title="Wellness" count="20 Workshops" />
        </div>
      </div>

      {/* 5. Featured Workshops Bento Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-32">
        <h2 className="text-3xl font-bold text-primary-700 mb-10 text-center">Featured Workshops</h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-auto">
          {/* Row 1 */}
          <div className="lg:col-span-2 relative rounded-3xl overflow-hidden group shadow-lg h-80 lg:h-96 cursor-pointer">
            <img src="https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&q=80&w=1200" alt="Workshop" className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent flex flex-col justify-end p-8">
              <span className="bg-primary-600 text-white text-[10px] font-bold px-2 py-1 rounded w-fit mb-3 uppercase tracking-wider">Masterclass</span>
              <h3 className="text-3xl font-bold text-white mb-2">Practical Cinematic Filmmaking</h3>
              <p className="text-gray-300 text-sm mb-6 max-w-md">Learn storyboarding, lighting, and camera techniques from industry professionals.</p>
              <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                <button className="bg-primary-600 text-white font-bold py-2.5 px-6 rounded-full w-fit hover:bg-primary-700 transition-colors">Register Now</button>
                <div className="flex -space-x-3">
                  <img className="w-10 h-10 rounded-full border-2 border-gray-900 object-cover" src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=100" alt="User" />
                  <img className="w-10 h-10 rounded-full border-2 border-gray-900 object-cover" src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=100" alt="User" />
                  <img className="w-10 h-10 rounded-full border-2 border-gray-900 object-cover" src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=100" alt="User" />
                </div>
              </div>
            </div>
          </div>
          
          <div className="lg:col-span-1 relative rounded-3xl overflow-hidden group shadow-lg h-80 lg:h-96 cursor-pointer">
            <img src="https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&q=80&w=600" alt="Culinary" className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex flex-col justify-end p-8">
               <h4 className="text-2xl font-bold text-white mb-2">Gourmet Baking</h4>
               <p className="text-gray-300 text-sm mb-6">Master the art of pastries.</p>
               <button className="bg-white text-primary-700 font-bold py-2 px-6 rounded-full text-sm w-full hover:bg-gray-100 transition-colors">Reserve Spot</button>
            </div>
          </div>

          {/* Row 2 */}
          <div className="lg:col-span-1 relative rounded-3xl overflow-hidden group shadow-lg h-80 lg:h-96 cursor-pointer">
            <img src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=600" alt="Tech" className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex flex-col justify-end p-8">
               <h4 className="text-2xl font-bold text-white mb-2">Generative AI Basics</h4>
               <p className="text-gray-300 text-sm mb-6">Build your first LLM app.</p>
               <button className="bg-white text-primary-700 font-bold py-2 px-6 rounded-full text-sm w-full hover:bg-gray-100 transition-colors">Reserve Spot</button>
            </div>
          </div>

          <div className="lg:col-span-2 relative rounded-3xl overflow-hidden group shadow-lg h-80 lg:h-96 cursor-pointer">
            <img src="https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&q=80&w=1200" alt="DJing" className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent flex flex-col justify-end p-8">
              <span className="bg-primary-600 text-white text-[10px] font-bold px-2 py-1 rounded w-fit mb-3 uppercase tracking-wider">Masterclass</span>
              <h3 className="text-3xl font-bold text-white mb-2">Advanced DJing and Mixing</h3>
              <p className="text-gray-300 text-sm mb-6 max-w-md">Learn live mixing techniques and sound engineering from top DJs at the festival.</p>
              <button className="bg-white text-primary-700 font-bold py-2.5 px-6 rounded-full w-fit hover:bg-gray-100 transition-colors">Read More Details</button>
            </div>
          </div>
        </div>
      </div>

      {/* 6. Stats Section */}
      <div className="bg-white mt-32 py-12 border-y border-primary-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-around items-center divide-x divide-gray-100">
             <StatBox icon={<FaChalkboardTeacher />} num="1k+" text="Global Creators" />
             <StatBox icon={<FaBriefcase />} num="12" text="Crafting Categories" />
             <StatBox icon={<FaUsers />} num="5.4k+" text="Active Learners" />
          </div>
        </div>
      </div>

      {/* 7. Mentors */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
        <div className="flex justify-between items-end mb-10">
          <div>
            <h2 className="text-3xl font-bold text-primary-700 mb-2">Learn from the Best</h2>
            <p className="text-gray-500 text-sm max-w-xl">Industry leaders, award winners, and global experts who don't just teach - but do.</p>
          </div>
          <button className="text-primary-600 font-bold text-sm hover:text-primary-700">View all Mentors →</button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <MentorCard img="https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=400" name="Aditya Rao" role="National Geographic Photographer" />
          <MentorCard img="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=400" name="Sneha Gupta" role="Sr. Product Designer, Google" />
          <MentorCard img="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400" name="Chef Antonio" role="Michelin Star Restaurateur" />
          <MentorCard img="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=400" name="Arjun Mehta" role="Creative Audio Producer" />
        </div>
      </div>

    </div>
  );
};

export default LandingPage;

// Helper Components
const FestivalCard = ({ city, date, loc, upcoming, mentors, img, tag, path }) => (
  <div className="bg-white rounded-3xl p-4 shadow-sm border border-gray-100 hover:shadow-lg transition-shadow group">
    <div className="relative h-48 rounded-2xl overflow-hidden mb-4 cursor-pointer">
      <Link to={path}>
        <img src={img} alt={city} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
        <div className="absolute top-4 right-4 bg-primary-600 text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-md">
          {tag}
        </div>
      </Link>
    </div>
    <div className="px-2">
      <div className="flex justify-between items-center mb-1">
        <h3 className="text-xl font-bold text-gray-900">{city}</h3>
        <span className="text-primary-600 font-bold">{date}</span>
      </div>
      <p className="text-xs text-gray-400 mb-4 flex items-center gap-1"><FaMapMarkerAlt /> {loc}</p>
      <div className="flex gap-4">
        <div className="bg-primary-50 rounded-xl p-3 flex-1">
          <p className="text-[10px] text-gray-500 font-semibold uppercase mb-1">Upcoming Events</p>
          <p className="font-bold text-primary-900">{upcoming}</p>
        </div>
        <div className="bg-primary-50 rounded-xl p-3 flex-1">
          <p className="text-[10px] text-gray-500 font-semibold uppercase mb-1">Mentors</p>
          <p className="font-bold text-primary-900">{mentors}</p>
        </div>
      </div>
      <div className="mt-4 flex justify-between items-center border-t border-gray-50 pt-4">
        <span className="text-xs text-red-500 font-medium">Only 12 tickets left!</span>
        <Link to="/login" className="text-sm font-bold text-primary-600 hover:text-primary-700 flex items-center gap-1">
          Explore →
        </Link>
      </div>
    </div>
  </div>
);

const CategoryCard = ({ icon, title, count }) => (
  <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-all hover:-translate-y-1 cursor-pointer flex flex-col items-center justify-center gap-3">
    <div className="bg-primary-50 p-4 rounded-2xl text-primary-600">
      {icon}
    </div>
    <h4 className="font-bold text-gray-800 text-sm md:text-base">{title}</h4>
    <p className="text-xs text-gray-400">{count}</p>
  </div>
);

const StatBox = ({ icon, num, text }) => (
  <div className="flex-1 text-center py-4">
    <div className="text-primary-500 flex justify-center mb-3 text-3xl">
      {icon}
    </div>
    <h4 className="text-2xl font-extrabold text-gray-900 mb-1">{num}</h4>
    <p className="text-xs text-gray-500 uppercase font-bold tracking-widest">{text}</p>
  </div>
);

const MentorCard = ({ img, name, role }) => (
  <div className="group cursor-pointer">
    <div className="relative h-72 rounded-3xl overflow-hidden mb-4 shadow-md">
      <img src={img} alt={name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
    </div>
    <h4 className="text-lg font-bold text-gray-900">{name}</h4>
    <p className="text-sm text-primary-600 font-medium">{role}</p>
  </div>
);
