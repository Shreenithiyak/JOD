import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { FaMapMarkerAlt, FaCalendarAlt, FaSun, FaTicketAlt, FaMap, FaClock, FaChevronLeft, FaChevronRight, FaCheckCircle, FaUserAlt } from 'react-icons/fa';
import PassBookingCard from '../components/PassBookingCard';

const FestivalSlider = () => {
  const [activeSlide, setActiveSlide] = useState(0);
  const location = useLocation();
  
  // Slides data
  const slides = [
    { id: 'bangalore', title: 'Bangalore Skill Festival 2024' },
    { id: 'chennai', title: 'Chennai Skill Festival 2024' },
    { id: 'hyderabad', title: 'Hyderabad Skill Festival 2024' },
    { id: 'mumbai', title: 'Mumbai Skill Festival 2024' },
    { id: 'delhi', title: 'Delhi Skill Festival 2024' }
  ];

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const city = searchParams.get('city');
    if (city) {
      const index = slides.findIndex(s => s.id === city);
      if (index !== -1) {
        setActiveSlide(index);
      }
    }
  }, [location.search]);

  const nextSlide = () => setActiveSlide((prev) => (prev + 1) % slides.length);
  const prevSlide = () => setActiveSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));

  // Swipe navigation state
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  
  const minSwipeDistance = 50;

  const onDragStart = (clientX) => {
    setTouchEnd(null);
    setTouchStart(clientX);
    setIsDragging(true);
  };

  const onDragMove = (clientX) => {
    if (isDragging) {
      setTouchEnd(clientX);
    }
  };

  const onDragEnd = () => {
    if (!touchStart || !touchEnd) {
      setIsDragging(false);
      return;
    }
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;
    
    if (isLeftSwipe) nextSlide();
    if (isRightSwipe) prevSlide();
    
    setIsDragging(false);
    setTouchStart(null);
    setTouchEnd(null);
  };

  const dragOffset = isDragging && touchEnd ? touchEnd - touchStart : 0;

  // Pass data based on the city
  const bangalorePasses = [
    { id: 'exp', name: 'Explorer Pass', description: 'General access to main stage & food zone', price: 1499 },
    { id: 'pro', name: 'Pro Pass', description: 'Explore + All Workshops + AI Lab priority', price: 4999, popular: true },
    { id: 'vip', name: 'VIP Pass', description: 'Pro + Mentor Lounge + After-party access', price: 12499 }
  ];

  return (
    <div 
      className="pt-16 pb-20 select-none overflow-hidden touch-pan-y"
      onTouchStart={(e) => onDragStart(e.targetTouches[0].clientX)}
      onTouchMove={(e) => onDragMove(e.targetTouches[0].clientX)}
      onTouchEnd={onDragEnd}
      onMouseDown={(e) => onDragStart(e.clientX)}
      onMouseMove={(e) => onDragMove(e.clientX)}
      onMouseUp={onDragEnd}
      onMouseLeave={onDragEnd}
    >
      
      {/* Main Content Area based on slide */}
      <div 
        className={`flex w-full ${isDragging ? '' : 'transition-transform duration-500 ease-out'}`}
        style={{ transform: `translateX(calc(-${activeSlide * 100}% + ${dragOffset}px))` }}
      >
        <div className="w-full shrink-0">
          <BangaloreSlide passes={bangalorePasses} />
        </div>
        <div className="w-full shrink-0">
          <ChennaiSlide />
        </div>
        <div className="w-full shrink-0">
          <HyderabadSlide />
        </div>
        <div className="w-full shrink-0">
          <MumbaiSlide />
        </div>
        <div className="w-full shrink-0">
          <DelhiSlide />
        </div>
      </div>

      {/* Slide Indicators */}
      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-40 flex gap-3 bg-white/80 backdrop-blur-md px-6 py-3 rounded-full shadow-lg">
        {slides.map((slide, index) => (
          <button 
            key={slide.id}
            onClick={() => setActiveSlide(index)}
            className={`transition-all rounded-full ${activeSlide === index ? 'w-8 h-2.5 bg-primary-600' : 'w-2.5 h-2.5 bg-gray-300 hover:bg-gray-400'}`}
            aria-label={`Go to ${slide.title}`}
          />
        ))}
      </div>
    </div>
  );
};

export default FestivalSlider;


// FESTIVAL SLIDE TEMPLATE
const FestivalSlideTemplate = ({ 
  themeColors, 
  heroBg, 
  location, 
  title, 
  description, 
  stats, 
  intro, 
  schedules, 
  zones, 
  passes 
}) => {
  const [activeDay, setActiveDay] = useState(1);
  const routerLocation = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(routerLocation.search);
    const event = params.get('event');
    if (event) {
      for (const [day, daySchedules] of Object.entries(schedules)) {
        if (daySchedules.some(s => s.title.toLowerCase().includes(event.toLowerCase()))) {
          setActiveDay(Number(day));
          break;
        }
      }
    }
  }, [routerLocation.search, schedules]);

  return (
    <div className="animate-fade-in">
      {/* Hero */}
      <div className={`relative h-[60vh] bg-gradient-to-br ${themeColors} text-white`}>
        <div className="absolute inset-0 mix-blend-overlay opacity-40 object-cover bg-center" style={{ backgroundImage: `url('${heroBg}')` }}></div>
        
        <div className="absolute inset-0 flex flex-col justify-center px-4 sm:px-8 lg:px-16 max-w-7xl mx-auto">
          <span className="inline-block bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-xs font-semibold tracking-wider mb-4 w-fit border border-white/30 uppercase">
            <FaMapMarkerAlt className="inline mr-1 -mt-0.5" /> {location}
          </span>
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold mb-6 leading-tight max-w-3xl">
            {title}
          </h1>
          <p className="text-lg md:text-xl text-gray-200 max-w-2xl mb-12">
            {description}
          </p>

          {/* Stats Bar */}
          <div className="flex flex-wrap gap-4 mt-auto mb-[-40px] z-10 relative">
            {stats.map((stat, i) => (
              <div key={i} className="bg-white text-gray-900 rounded-2xl shadow-xl p-5 flex items-center gap-4 border border-gray-100 cursor-pointer hover:border-primary-300 transition-colors">
                <div className={`${stat.iconBg} p-3 rounded-full`}>
                  {stat.icon}
                </div>
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-wider font-semibold">{stat.label}</p>
                  <p className={`text-xl font-bold ${stat.mainColor || ''}`}>
                    {stat.main} {stat.sub && <span className="text-sm font-normal text-gray-500">{stat.sub}</span>}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-24">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          
          <div className="lg:col-span-2 space-y-16">
            
            {/* Intro text */}
            <section>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">{intro.title}</h2>
              <div className="grid md:grid-cols-2 gap-8 text-gray-600 leading-relaxed">
                <p>{intro.p1}</p>
                <p>{intro.p2}</p>
              </div>
            </section>

            {/* Schedule */}
            <section>
              <div className="flex justify-between items-end mb-8">
                <h2 className="text-3xl font-bold text-gray-900">Daily Schedule</h2>
                <div className="flex bg-gray-100 rounded-full p-1">
                  {[1, 2, 3].map(day => (
                    <button 
                      key={day}
                      onClick={() => setActiveDay(day)} 
                      className={`px-5 py-1.5 ${activeDay === day ? 'bg-primary-600 text-white shadow-sm' : 'text-gray-600 hover:text-gray-900'} text-sm font-semibold rounded-full transition-colors`}
                    >
                      Day {day}
                    </button>
                  ))}
                </div>
              </div>
              
              <div className="space-y-4">
                {schedules[activeDay].map((s, i) => (
                  <ScheduleItem key={i} time={s.time} title={s.title} subtitle={s.subtitle} />
                ))}
              </div>
            </section>
            
            {/* Special Zones */}
            <section>
              <h2 className="text-3xl font-bold text-gray-900 mb-8">Special Zones</h2>
              <div className="grid sm:grid-cols-2 gap-6">
                {zones?.map((zone, i) => (
                  <ZoneCard key={i} title={zone.title} desc={zone.desc} img={zone.img} tag={zone.tag} />
                ))}
              </div>
            </section>

          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 relative">
            <PassBookingCard passes={passes} />
          </div>
          
        </div>
      </div>
    </div>
  );
};

// BANGALORE SLIDE
const BangaloreSlide = ({ passes }) => {
  const schedules = {
    1: [
      { time: "10:00 AM", title: "The Future of Generative UI", subtitle: "Main Stage • Keynote Session" },
      { time: "12:30 PM", title: "Interactive Prototyping Workshop", subtitle: "Lab Alpha • 50 Slots Available" },
      { time: "04:00 PM", title: "Networking Mix: Founders & Creators", subtitle: "Special Zone: Networking Lounge" }
    ],
    2: [
      { time: "09:30 AM", title: "Advanced Design Systems", subtitle: "Main Stage • Deep Dive" },
      { time: "01:00 PM", title: "WebAssembly for Designers", subtitle: "Lab Beta • Hands-on" },
      { time: "03:30 PM", title: "Pitching to VCs", subtitle: "Startup Lounge" }
    ],
    3: [
      { time: "10:00 AM", title: "Closing Keynote: AI in 2025", subtitle: "Main Stage" },
      { time: "12:00 PM", title: "Award Ceremony", subtitle: "Main Stage" },
      { time: "05:00 PM", title: "Farewell Party", subtitle: "Outdoor Arena" }
    ]
  };

  const stats = [
    { icon: <FaSun size={24} />, iconBg: 'bg-blue-50 text-blue-500', label: 'Local Weather', main: '24°C', sub: '/ Clear Sky' },
    { icon: <FaMap size={24} />, iconBg: 'bg-purple-50 text-purple-500', label: 'Venue Map', main: 'Explore Layout', sub: '' },
    { icon: <FaTicketAlt size={24} />, iconBg: 'bg-red-50 text-red-500', label: 'Ticket Status', main: '85% Sold Out', mainColor: 'text-red-600' }
  ];

  const intro = {
    title: "A Festival for the Modern Traveler",
    p1: "SkillSwap Bangalore is designed for the \"Skill Traveler\" — individuals who move between disciplines, cultures, and technologies. Unlike traditional conferences, this festival is a living laboratory where curiosity is the only currency.",
    p2: "Experience high-fidelity workshops, intimate mentor sessions, and vibrant networking zones nestled in the tech-lush landscape of Electronic City. Discover your next pivot here."
  };

  const zones = [
    { title: "AI Discovery Lab", desc: "Get hands-on with the latest LLMs and creative AI tools with live demos.", img: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=800", tag: "HOT ZONE" },
    { title: "Culinary Courtyard", desc: "Curated Bangalore flavors & artisanal coffee.", img: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&q=80&w=800", tag: "" }
  ];

  return <FestivalSlideTemplate 
    themeColors="from-indigo-900 via-primary-800 to-purple-900"
    heroBg="https://images.unsplash.com/photo-1540039155733-d7696d4eb98e?auto=format&fit=crop&q=80&w=2000"
    location="Electronic City, Bangalore"
    title="Bangalore Skill Festival 2024"
    description="Join the largest gathering of creators, tech pioneers, and industry mentors. Elevate your craft in the silicon heart of India."
    stats={stats}
    intro={intro}
    schedules={schedules}
    zones={zones}
    passes={passes}
  />;
};

// CHENNAI SLIDE
const ChennaiSlide = () => {
  const schedules = {
    1: [
      { time: "09:00 AM", title: "Opening Keynote", subtitle: "The Future of Human-Centric AI by Dr. Rajesh Kumar" },
      { time: "11:30 AM", title: "Coastal Composition Masterclass", subtitle: "Outdoor session at the South Pavilion" },
      { time: "02:00 PM", title: "Robotics Workshop", subtitle: "Building Autonomous Navigators with LiDAR" }
    ],
    2: [
      { time: "08:30 AM", title: "Morning Yoga & Mindfulness", subtitle: "Beachfront Area" },
      { time: "11:00 AM", title: "Hardware Hackathon Starts", subtitle: "Innovation Lab" },
      { time: "04:30 PM", title: "Panel: Scaling Deep Tech", subtitle: "Main Pavilion" }
    ],
    3: [
      { time: "10:30 AM", title: "Creator Economy Deep Dive", subtitle: "Main Pavilion" },
      { time: "01:00 PM", title: "Hackathon Demos & Judging", subtitle: "Innovation Lab" },
      { time: "06:00 PM", title: "Festival Wrap-up Concert", subtitle: "Main Stage" }
    ]
  };

  const passes = [
    { id: 'std', name: 'Standard Pass', description: '3-Day General Access', price: 2499 },
    { id: 'pro', name: 'Pro Experience', description: 'Includes 2 Workshops', price: 4999, popular: true },
    { id: 'vip', name: 'VIP Elite', description: 'Front row + Meetups', price: 12499 }
  ];

  const stats = [
    { icon: <FaClock size={24} />, iconBg: 'bg-blue-50 text-blue-500', label: 'Countdown', main: '22 Days Left' },
    { icon: <FaSun size={24} />, iconBg: 'bg-yellow-50 text-yellow-500', label: 'Weather', main: '28°C', sub: '/ Sunny' },
    { icon: <FaMap size={24} />, iconBg: 'bg-teal-50 text-teal-500', label: 'Ground Map', main: 'View Layout' }
  ];

  const intro = {
    title: "Annual Skill Summit by the Coast",
    p1: "Chennai Skill Festival brings together the brightest minds in hardware, AI, and creative arts. Feel the ocean breeze as you network with industry veterans and ambitious founders.",
    p2: "Immerse yourself in deeply technical workshops, explore sustainable tech exhibitions, and witness the incredible maker culture of South India come alive."
  };

  const zones = [
    { title: "Robotics & AI", desc: "Hands-on drone piloting and neural network workshops.", img: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&q=80&w=800", tag: "SPECIAL EVENT" },
    { title: "Coastal Photography", desc: "Master the golden hour with renowned travel photographers.", img: "https://images.unsplash.com/photo-1454496522488-7a8e488e8606?auto=format&fit=crop&q=80&w=800", tag: "CREATIVE TRACK" }
  ];

  return <FestivalSlideTemplate 
    themeColors="from-teal-900 via-cyan-900 to-blue-900"
    heroBg="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=80&w=2000"
    location="ECR Coastal Grounds, Chennai"
    title="Chennai Skill Festival 2024"
    description="Discover the intersection of hardware innovation and creative arts right by the ocean. Engage in hands-on masterclasses and build the future."
    stats={stats}
    intro={intro}
    schedules={schedules}
    zones={zones}
    passes={passes}
  />;
};

// HYDERABAD SLIDE
const HyderabadSlide = () => {
  const schedules = {
    1: [
      { time: "09:00 AM", title: "Opening Keynote: The Future of Skills", subtitle: "Join global thought leaders at the Main Pavilion." },
      { time: "11:30 AM", title: "Workshop Session Alpha", subtitle: "Concurrent sessions across 12 zones focusing on Digital Literacy." },
      { time: "03:00 PM", title: "Networking Hi-Tea", subtitle: "Culinary Courtyard" }
    ],
    2: [
      { time: "10:00 AM", title: "Panel: Scaling SaaS in India", subtitle: "Main Pavilion • Industry Leaders" },
      { time: "01:00 PM", title: "Fireside Chat: AI Regulations", subtitle: "Ethics Zone" },
      { time: "04:00 PM", title: "Pitch Competition Semi-Finals", subtitle: "Innovation Stage" }
    ],
    3: [
      { time: "10:30 AM", title: "Tech Showcase & Startup Expo", subtitle: "Exhibition Hall B" },
      { time: "02:00 PM", title: "Pitch Competition Finals", subtitle: "Main Pavilion" },
      { time: "04:00 PM", title: "Closing Remarks & Grand Finale", subtitle: "Main Pavilion" }
    ]
  };

  const passes = [
    { id: 'std', name: 'Standard', description: 'Full 3-day access to all main pavilions', price: 2499 },
    { id: 'pro', name: 'Pro', description: 'Includes 2 reserved workshops daily', price: 5999 },
    { id: 'vip', name: 'VIP', description: 'Priority seating & 1-on-1 mentor meetups', price: 12499, popular: true }
  ];

  // We are importing FaUserAlt directly into the file at the top.
  const stats = [
    { icon: <FaSun size={24} />, iconBg: 'bg-orange-50 text-orange-500', label: 'Weather', main: '22°C', sub: '/ Clear Sky' },
    { icon: <FaClock size={24} />, iconBg: 'bg-indigo-50 text-indigo-500', label: 'Starts In', main: '14 Days' },
    { icon: <FaCheckCircle size={24} />, iconBg: 'bg-rose-50 text-rose-500', label: 'Mentors', main: '500+', mainColor: 'text-rose-600' }
  ];

  const intro = {
    title: "Premium Experience in the Pearl City",
    p1: "Hyderabad Skill Festival blends the rich cultural heritage of the Nizams with cutting-edge technology. Experience a three-day intensive journey into design, tech, and enterprise.",
    p2: "From Michelin-star culinary arts to deep-tech SaaS scaling, this premium event is curated for professionals looking to accelerate their growth and build a global network."
  };

  const zones = [
    { title: "Culinary Arts Zone", desc: "Dive into the rich flavors of Nizami cuisine. Learn from Michelin-star chefs.", img: "https://images.unsplash.com/photo-1556910103-1c02745a872f?auto=format&fit=crop&q=80&w=800", tag: "SPECIAL HIGHLIGHT" },
    { title: "Heritage Design", desc: "Explore the intersection of timeless craft and futuristic technology.", img: "https://images.unsplash.com/photo-1606744888044-6720fbc8c19a?auto=format&fit=crop&q=80&w=800", tag: "SPECIAL HIGHLIGHT" }
  ];

  return <FestivalSlideTemplate 
    themeColors="from-orange-900 via-red-900 to-rose-900"
    heroBg="https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&q=80&w=2000"
    location="Hitex Exhibition Center, Hyderabad"
    title="Hyderabad Skill Festival 2024"
    description="Immerse yourself in a premium skill-building experience where tradition meets tomorrow's technology."
    stats={stats}
    intro={intro}
    schedules={schedules}
    zones={zones}
    passes={passes}
  />;
};

// MUMBAI SLIDE
const MumbaiSlide = () => {
  const schedules = {
    1: [
      { time: "09:00 AM", title: "Fintech Innovations Keynote", subtitle: "Main Stage" },
      { time: "11:00 AM", title: "Film & Media Tech Masterclass", subtitle: "Creative Pavilion" },
      { time: "03:00 PM", title: "Startup Ecosystem in Mumbai", subtitle: "Networking Zone" }
    ],
    2: [
      { time: "10:00 AM", title: "Advanced Stock Modeling", subtitle: "Trading Floor Labs" },
      { time: "01:30 PM", title: "Blockchain for Enterprises", subtitle: "Tech Annex" },
      { time: "06:00 PM", title: "Networking Dinner", subtitle: "Sea View Lounge" }
    ],
    3: [
      { time: "09:30 AM", title: "VC Pitch Day", subtitle: "Main Stage" },
      { time: "02:00 PM", title: "Closing Keynote: Economy 2030", subtitle: "Main Stage" },
      { time: "05:00 PM", title: "Grand Finale", subtitle: "Main Stage" }
    ]
  };

  const passes = [
    { id: 'std', name: 'Standard', description: 'General Access', price: 1999 },
    { id: 'pro', name: 'Pro', description: 'Includes 2 Workshops', price: 4499, popular: true },
    { id: 'vip', name: 'VIP', description: 'Backstage Pass', price: 9999 }
  ];

  const stats = [
    { icon: <FaSun size={24} />, iconBg: 'bg-red-50 text-red-500', label: 'Weather', main: '30°C', sub: '/ Humid' },
    { icon: <FaClock size={24} />, iconBg: 'bg-rose-50 text-rose-500', label: 'Starts In', main: '45 Days' },
    { icon: <FaTicketAlt size={24} />, iconBg: 'bg-pink-50 text-pink-500', label: 'Tickets', main: 'Selling Fast', mainColor: 'text-pink-600' }
  ];

  const intro = {
    title: "Where Finance Meets Creativity",
    p1: "Mumbai Skill Festival brings together the bustling energy of the financial capital with the vibrant world of media and film.",
    p2: "Dive into cutting edge financial modeling, scale operations with blockchain, and network with leading VCs and founders."
  };

  const zones = [
    { title: "Trading Floor Labs", desc: "Real-time stock simulation and algorithmic trading.", img: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&q=80&w=800", tag: "FINANCE ZONE" },
    { title: "Media Production", desc: "Hands on green-screen and VFX editing bays.", img: "https://images.unsplash.com/photo-1594909122845-11baa439b7bf?auto=format&fit=crop&q=80&w=800", tag: "CREATIVE ZONE" }
  ];

  return <FestivalSlideTemplate 
    themeColors="from-red-900 via-rose-900 to-pink-900"
    heroBg="https://images.unsplash.com/photo-1522204657746-fccce0824cfd?auto=format&fit=crop&q=80&w=2000"
    location="Jio World Centre, Mumbai"
    title="Mumbai Skill Festival 2024"
    description="The financial capital meets the creative economy. Dive into fin-tech, film, and massive scale operations."
    stats={stats}
    intro={intro}
    schedules={schedules}
    zones={zones}
    passes={passes}
  />;
};

// DELHI SLIDE
const DelhiSlide = () => {
  const schedules = {
    1: [
      { time: "09:00 AM", title: "GovTech & Public Policy", subtitle: "Main Auditorium" },
      { time: "11:30 AM", title: "Cybersecurity Masterclass", subtitle: "Tech Wing A" },
      { time: "02:00 PM", title: "Fireside Chat with Policy Makers", subtitle: "Diplomatic Lounge" }
    ],
    2: [
      { time: "10:00 AM", title: "Smart City Infrastructure", subtitle: "Innovation Hub" },
      { time: "01:00 PM", title: "CleanTech Startups", subtitle: "Green Pavilion" },
      { time: "04:30 PM", title: "Defense & Aerospace Innovators", subtitle: "Main Auditorium" }
    ],
    3: [
      { time: "09:30 AM", title: "Youth & Future Skills", subtitle: "Main Auditorium" },
      { time: "12:00 PM", title: "Policy Hackathon Presentations", subtitle: "Innovation Hub" },
      { time: "04:00 PM", title: "Closing Ceremony", subtitle: "Main Auditorium" }
    ]
  };

  const passes = [
    { id: 'std', name: 'Visitor', description: 'General Access', price: 1499 },
    { id: 'pro', name: 'Delegate', description: 'All Sessions + Workshops', price: 3999, popular: true },
    { id: 'vip', name: 'Diplomat', description: 'Lounge Access + Dinner', price: 8999 }
  ];

  const stats = [
    { icon: <FaSun size={24} />, iconBg: 'bg-amber-50 text-amber-500', label: 'Weather', main: '18°C', sub: '/ Cool' },
    { icon: <FaMap size={24} />, iconBg: 'bg-orange-50 text-orange-500', label: 'Venue', main: 'Pragati Maidan' },
    { icon: <FaUserAlt size={24} />, iconBg: 'bg-yellow-50 text-yellow-500', label: 'Attendees', main: '10,000+', mainColor: 'text-yellow-600' }
  ];

  const intro = {
    title: "Policy meets Innovation",
    p1: "Delhi Skill Festival is the intersection of government technology and vibrant startup culture. Engage with leaders shaping the nation's future.",
    p2: "Discover how policies are molded alongside new technologies. Join discussions on Smart Cities, CleanTech, and National Security."
  };

  const zones = [
    { title: "Smart City Labs", desc: "Prototypes for the urban landscapes of tomorrow.", img: "https://images.unsplash.com/photo-1573804633927-bfcbcd909acd?auto=format&fit=crop&q=80&w=800", tag: "INNOVATION ZONE" },
    { title: "CleanTech Pavilion", desc: "Green energy solutions and sustainable products.", img: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?auto=format&fit=crop&q=80&w=800", tag: "GREEN ZONE" }
  ];

  return <FestivalSlideTemplate 
    themeColors="from-amber-900 via-orange-900 to-yellow-900"
    heroBg="https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&q=80&w=2000"
    location="Pragati Maidan, New Delhi"
    title="Delhi Skill Festival 2024"
    description="Policy meets innovation in the heart of the capital. Discover the intersection of government tech and startup culture."
    stats={stats}
    intro={intro}
    schedules={schedules}
    zones={zones?.map(z => ({ ...z }))}
    passes={passes}
  />;
};

// Helper Components
const ScheduleItem = ({ time, title, subtitle }) => (
  <div className="flex flex-col sm:flex-row gap-4 sm:gap-8 bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:border-primary-200 transition-colors cursor-pointer group">
    <div className="sm:w-24 shrink-0 font-bold text-primary-600 mt-1">{time}</div>
    <div>
      <h3 className="text-xl font-bold text-gray-900 group-hover:text-primary-600 transition-colors">{title}</h3>
      <p className="text-gray-500 mt-2 font-medium">{subtitle}</p>
    </div>
  </div>
);

const ZoneCard = ({ title, desc, img, tag }) => (
  <div className="group relative overflow-hidden rounded-3xl h-[250px] shadow-sm border border-gray-100 hover:shadow-xl transition-all cursor-pointer">
    <div className="absolute inset-0 bg-gray-900">
      <img 
        src={img} 
        alt={title} 
        onError={(e) => { e.target.onerror = null; e.target.src = 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=800'; }}
        className="w-full h-full object-cover opacity-60 group-hover:opacity-40 transition-opacity duration-500 group-hover:scale-105" 
      />
    </div>
    <div className="relative h-full flex flex-col justify-end p-6 bg-gradient-to-t from-gray-900 via-gray-900/60 to-transparent">
      {tag && (
        <span className="bg-primary-600 text-white text-[9px] font-bold px-2 py-1 rounded-md uppercase tracking-wider w-fit mb-3">
          {tag}
        </span>
      )}
      <h3 className="text-2xl font-bold text-white mb-2">{title}</h3>
      <p className="text-gray-300 text-sm font-medium line-clamp-2">{desc}</p>
    </div>
  </div>
);
