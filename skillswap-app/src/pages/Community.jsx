import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  FaMapMarkerAlt, FaCube, FaCheckCircle, FaCoffee, FaGlobe, FaLeaf, 
  FaWifi, FaCrown, FaWrench, FaArrowRight, FaChartLine, FaUsers 
} from 'react-icons/fa';
import FeedbackModal from '../components/FeedbackModal';

const Community = () => {
  const [isFeedbackOpen, setIsFeedbackOpen] = useState(false);
  const [showInquiryToast, setShowInquiryToast] = useState(false);
  const navigate = useNavigate();

  const handleInquirySubmit = (e) => {
    e.preventDefault();
    setShowInquiryToast(true);
    setTimeout(() => setShowInquiryToast(false), 4000);
  };

  return (
    <div className="bg-[#FAFAFA] min-h-screen font-sans overflow-x-hidden pt-16">
      
      {/* 1. Hero Section */}
      <section className="pt-20 pb-20 px-4 md:px-8 max-w-5xl mx-auto text-center">
        <span className="text-primary-600 font-bold tracking-widest text-[10px] uppercase mb-4 block">Organizer Portal</span>
        <h1 className="text-5xl md:text-7xl font-extrabold text-gray-900 mb-6 tracking-tight">
          Elevate Your <span className="text-primary-600">Vision</span>.
        </h1>
        <p className="text-gray-500 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed font-medium">
          Comprehensive logistics, premium facilities, and a global audience for the next generation of creators.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button className="bg-primary-600 text-white font-bold py-3.5 px-8 rounded-full shadow-lg shadow-primary-500/30 hover:bg-primary-700 transition-colors text-sm">
            Explore Venues
          </button>
          <button 
            onClick={() => navigate('/dashboard')}
            className="bg-white text-primary-600 border border-gray-200 font-bold py-3.5 px-8 rounded-full hover:border-gray-300 hover:bg-gray-50 transition-colors text-sm shadow-sm"
          >
            Download Guide
          </button>
          <button 
            onClick={() => setIsFeedbackOpen(true)}
            className="bg-indigo-50 text-indigo-700 border border-indigo-200 font-bold py-3.5 px-8 rounded-full hover:bg-indigo-100 transition-colors text-sm shadow-sm"
          >
            Share Experience
          </button>
        </div>
      </section>
      
      <FeedbackModal isOpen={isFeedbackOpen} onClose={() => setIsFeedbackOpen(false)} />

      {/* 2. Event Logistics */}
      <section className="py-16 px-4 md:px-8 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-10">
          <div>
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-2">Event Logistics</h2>
            <p className="text-gray-500 font-medium">Real-time facility management and participant allocation for organizers.</p>
          </div>
          <div className="mt-4 md:mt-0 flex items-center gap-2 bg-indigo-50 border border-indigo-100 text-primary-700 px-3 py-1.5 rounded-full text-xs font-bold tracking-wide">
            <span className="w-2 h-2 rounded-full bg-primary-600 animate-pulse"></span> Live Map
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Left block - 2 columns */}
          <div className="lg:col-span-2 flex flex-col gap-6">
            
            {/* Top row of cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Card 1 */}
              <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm relative overflow-hidden group hover:shadow-md transition-shadow">
                <div className="absolute top-6 right-6 bg-gray-100 text-gray-600 text-[10px] font-bold px-2 py-1 rounded-md uppercase tracking-wider">Occupied 85%</div>
                <div className="w-12 h-12 rounded-xl bg-indigo-50 flex items-center justify-center text-primary-500 mb-6 group-hover:scale-110 transition-transform">
                  <FaCube size={20} />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Innovation Hall</h3>
                <p className="text-sm text-gray-500 mb-6 font-medium leading-relaxed">Home to Tech Startups, AI workshops, and Robotics demonstrations.</p>
                <ul className="space-y-3">
                  <li className="flex items-center gap-3 text-xs font-bold text-gray-700">
                    <FaUsers className="text-primary-500" /> 24 Participant Teams
                  </li>
                  <li className="flex items-center gap-3 text-xs font-bold text-gray-700">
                    <FaMapMarkerAlt className="text-primary-500" /> Dedicated High-Voltage Grid
                  </li>
                </ul>
              </div>
              
              {/* Card 2 */}
              <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm relative overflow-hidden group hover:shadow-md transition-shadow">
                <div className="absolute top-6 right-6 bg-gray-100 text-gray-600 text-[10px] font-bold px-2 py-1 rounded-md uppercase tracking-wider">Reserved</div>
                <div className="w-12 h-12 rounded-xl bg-purple-50 flex items-center justify-center text-purple-500 mb-6 group-hover:scale-110 transition-transform">
                  <FaCheckCircle size={20} />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Creative Studio</h3>
                <p className="text-sm text-gray-500 mb-6 font-medium leading-relaxed">Artistic installations, digital painting, and multi-media exhibitions.</p>
                <ul className="space-y-3">
                  <li className="flex items-center gap-3 text-xs font-bold text-gray-700">
                    <FaCube className="text-purple-500" /> 12 Interactive Canvas Units
                  </li>
                  <li className="flex items-center gap-3 text-xs font-bold text-gray-700">
                    <FaCheckCircle className="text-purple-500" /> Natural Diffusion Lighting
                  </li>
                </ul>
              </div>
            </div>

            {/* Map Image Card */}
            <div className="bg-white rounded-3xl border border-gray-100 shadow-sm relative overflow-hidden h-64 group cursor-pointer">
              <img 
                src="https://images.unsplash.com/photo-1519567241046-7f570eee3ce6?auto=format&fit=crop&q=80&w=1200" 
                alt="Event Mall Campus" 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                style={{ objectPosition: 'center 40%' }}
                onError={(e) => { 
                  e.target.onerror = null; 
                  e.target.src = 'https://placehold.co/1200x600/e2e8f0/64748b?text=Event+Mall+Campus'; 
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary-900/90 via-primary-900/30 to-transparent flex flex-col justify-end p-8">
                <div className="bg-white/20 backdrop-blur-md w-fit px-3 py-1 rounded-md text-[10px] text-white font-bold tracking-widest uppercase mb-3 border border-white/20">Location Details</div>
                <h3 className="text-2xl font-bold text-white mb-2">Main Campus Map</h3>
                <p className="text-primary-50 text-sm font-medium">Interactive real-time routing for all participants.</p>
              </div>
            </div>

            {/* Small 3-col feature cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-4 hover:border-primary-200 transition-colors cursor-pointer">
                <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-500 shrink-0">
                  <FaWifi />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-gray-900">Gigabit Connectivity</h4>
                  <p className="text-[10px] text-gray-500 mt-1 font-medium leading-tight">Dedicated low-latency lines for live streaming.</p>
                </div>
              </div>
              <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-4 hover:border-primary-200 transition-colors cursor-pointer">
                <div className="w-10 h-10 rounded-full bg-indigo-50 flex items-center justify-center text-primary-500 shrink-0">
                  <FaCrown />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-gray-900">VIP Lounges</h4>
                  <p className="text-[10px] text-gray-500 mt-1 font-medium leading-tight">Quiet zones for meetings and partner negotiations.</p>
                </div>
              </div>
              <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-4 hover:border-primary-200 transition-colors cursor-pointer">
                <div className="w-10 h-10 rounded-full bg-purple-50 flex items-center justify-center text-purple-500 shrink-0">
                  <FaWrench />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-gray-900">Pro Equipment</h4>
                  <p className="text-[10px] text-gray-500 mt-1 font-medium leading-tight">On-site technical support and hardware rentals.</p>
                </div>
              </div>
            </div>

          </div>

          {/* Right block - Tall Card */}
          <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm flex flex-col h-full hover:shadow-md transition-shadow">
            <div className="w-12 h-12 rounded-xl bg-teal-50 flex items-center justify-center text-teal-600 mb-6">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-3">The Sky Deck</h3>
            <p className="text-sm text-gray-500 mb-10 font-medium leading-relaxed">Centralized catering and refreshment hub with panoramic festival views.</p>
            
            <div className="mb-4 text-[10px] font-bold text-primary-600 tracking-widest uppercase">Premium Vendors</div>
            
            <ul className="space-y-5 flex-grow">
              <li className="flex items-center gap-4 bg-gray-50 p-4 rounded-2xl hover:bg-gray-100 transition-colors cursor-pointer border border-transparent hover:border-gray-200">
                <div className="bg-white p-2.5 rounded-lg shadow-sm text-gray-700"><FaCoffee size={14}/></div>
                <span className="font-bold text-sm text-gray-900">Artisan Coffee Hub</span>
              </li>
              <li className="flex items-center gap-4 bg-gray-50 p-4 rounded-2xl hover:bg-gray-100 transition-colors cursor-pointer border border-transparent hover:border-gray-200">
                <div className="bg-white p-2.5 rounded-lg shadow-sm text-gray-700"><FaGlobe size={14}/></div>
                <span className="font-bold text-sm text-gray-900">Global Street Food</span>
              </li>
              <li className="flex items-center gap-4 bg-gray-50 p-4 rounded-2xl hover:bg-gray-100 transition-colors cursor-pointer border border-transparent hover:border-gray-200">
                <div className="bg-white p-2.5 rounded-lg shadow-sm text-gray-700"><FaLeaf size={14}/></div>
                <span className="font-bold text-sm text-gray-900">Eco-Gourmet Salads</span>
              </li>
            </ul>

            <button className="w-full mt-8 bg-white border border-gray-200 text-gray-700 font-bold py-3.5 rounded-xl hover:border-primary-200 hover:text-primary-700 hover:bg-gray-50 transition-colors flex justify-center items-center gap-2 text-sm shadow-sm">
              <FaCoffee /> View Full Menu
            </button>
          </div>
          
        </div>
      </section>

      {/* 3. Global Reach */}
      <section className="py-24 px-4 md:px-8 max-w-7xl mx-auto flex flex-col lg:flex-row gap-16 lg:gap-20 items-center">
        
        {/* Left Image */}
        <div className="w-full lg:w-1/2 relative">
          <div className="rounded-[2.5rem] overflow-hidden shadow-2xl relative z-10 aspect-[4/5] lg:aspect-square">
            <img 
              src="https://images.unsplash.com/photo-1540317580384-e5d43616b9aa?auto=format&fit=crop&q=80&w=1000" 
              alt="Workshop Attendees" 
              className="w-full h-full object-cover" 
              onError={(e) => { 
                e.target.onerror = null; 
                e.target.src = 'https://placehold.co/1000x1000/e2e8f0/64748b?text=Workshop+Attendees'; 
              }}
            />
          </div>
          
          {/* Floating Card */}
          <div className="absolute -bottom-8 lg:-right-8 right-4 z-20 bg-white/95 backdrop-blur-xl p-8 rounded-3xl shadow-2xl border border-white min-w-[240px]">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-green-50 flex items-center justify-center text-green-500">
                <FaChartLine />
              </div>
              <span className="font-bold text-gray-900 text-lg">Impact</span>
            </div>
            <h4 className="text-5xl font-extrabold text-primary-600 mb-2">50k+</h4>
            <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mb-6">Annual Attendees</p>
            <div className="w-full h-px bg-gray-100 mb-5"></div>
            <p className="text-sm font-extrabold text-gray-900">2.4M <span className="text-gray-500 font-semibold ml-1">Social Reach</span></p>
          </div>
        </div>

        {/* Right Content */}
        <div className="w-full lg:w-1/2 pt-12 lg:pt-0">
          <span className="text-primary-600 font-bold tracking-widest text-[10px] uppercase mb-4 block">Global Reach</span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 mb-8 leading-tight">
            Where Ideas Transform Into <span className="text-primary-600">Legacy</span>.
          </h2>
          <p className="text-gray-500 text-lg mb-12 font-medium leading-relaxed">
            SkillSwap Festival isn't just an event; it's a global platform. We provide the infrastructure, the audience, and the prestige to turn your workshop or exhibition into a world-class experience.
          </p>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mb-12">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <div className="p-1.5 rounded-full bg-primary-50 text-primary-600"><FaCheckCircle size={14}/></div>
                <h4 className="font-bold text-gray-900">Elite Media Coverage</h4>
              </div>
              <p className="text-sm text-gray-500 font-medium">Partnerships with top-tier tech and lifestyle publications.</p>
            </div>
            <div>
              <div className="flex items-center gap-2 mb-3">
                <div className="p-1.5 rounded-full bg-primary-50 text-primary-600"><FaGlobe size={14}/></div>
                <h4 className="font-bold text-gray-900">Global Visibility</h4>
              </div>
              <p className="text-sm text-gray-500 font-medium">Live-streaming reach across 40+ countries and major hubs.</p>
            </div>
          </div>

          <button className="bg-primary-600 text-white font-bold py-4 px-10 rounded-full shadow-lg shadow-primary-500/30 hover:bg-primary-700 transition-colors flex items-center gap-3 text-sm">
            Partner With Us <FaArrowRight size={14} />
          </button>
        </div>
      </section>

      {/* 4. CTA / Form Banner */}
      <section className="py-16 px-4 md:px-8 max-w-7xl mx-auto mb-20">
        <div className="bg-gradient-to-br from-[#3b23b1] via-primary-700 to-primary-900 rounded-[2.5rem] p-10 md:p-16 lg:p-20 flex flex-col lg:flex-row gap-16 items-center shadow-2xl relative overflow-hidden">
          
          {/* Background Decoration */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary-400/30 rounded-full blur-3xl translate-y-1/2 -translate-x-1/4 pointer-events-none"></div>

          {/* Left Content */}
          <div className="w-full lg:w-1/2 relative z-10 text-white">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6 leading-tight">
              Ready to host your next <span className="italic font-serif text-primary-200">breakthrough?</span>
            </h2>
            <p className="text-primary-100 text-lg mb-10 max-w-md font-medium leading-relaxed">
              Our curatorial team is currently reviewing applications for the Summer Season. Secure your space in the future of skills.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="bg-white text-gray-900 font-extrabold py-4 px-8 rounded-full hover:bg-gray-50 transition-colors shadow-lg text-sm text-center">
                Apply to Organize
              </button>
              <button className="bg-transparent border-2 border-white/30 text-white font-bold py-4 px-8 rounded-full hover:bg-white/10 hover:border-white/50 transition-colors text-sm text-center">
                Schedule a Call
              </button>
            </div>
          </div>

          {/* Right Form Card */}
          <div className="w-full lg:w-1/2 relative z-10 flex lg:justify-end">
            <div className="bg-white/95 backdrop-blur-2xl p-8 rounded-3xl shadow-2xl w-full max-w-md relative overflow-hidden">
              
              {showInquiryToast && (
                <div className="absolute top-0 left-0 w-full bg-green-500 text-white text-sm font-bold py-3 px-4 text-center z-20 transition-all shadow-md">
                  Inquiry submitted! Our team will connect with you shortly.
                </div>
              )}

              <h3 className="text-lg font-bold text-gray-900 mb-6 mt-2">Quick Inquiry</h3>
              <form className="space-y-5" onSubmit={handleInquirySubmit}>
                <div>
                  <label className="block text-[10px] font-bold text-gray-600 mb-2 uppercase tracking-wide">Organization Name</label>
                  <input type="text" placeholder="e.g. FutureTech Academics" className="w-full bg-white border border-gray-200 focus:border-primary-500 focus:ring-1 focus:ring-primary-500 px-4 py-3.5 rounded-xl outline-none text-gray-900 text-sm font-medium transition-all shadow-sm" />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-gray-600 mb-2 uppercase tracking-wide">Event Type</label>
                  <select className="w-full bg-white border border-gray-200 focus:border-primary-500 focus:ring-1 focus:ring-primary-500 px-4 py-3.5 rounded-xl outline-none text-gray-900 text-sm font-medium transition-all appearance-none cursor-pointer shadow-sm">
                    <option>Workshop / Tutorial</option>
                    <option>Keynote Presentation</option>
                    <option>Exhibition</option>
                    <option>Hackathon</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-gray-600 mb-2 uppercase tracking-wide">Expected Attendees</label>
                  <input type="text" defaultValue="50 - 5000" className="w-full bg-gray-50 border border-gray-200 focus:border-primary-500 focus:ring-1 focus:ring-primary-500 px-4 py-3.5 rounded-xl outline-none text-gray-900 text-sm font-medium transition-all shadow-sm" />
                </div>
                <button type="submit" className="w-full bg-primary-600 text-white font-bold py-4 px-6 rounded-xl hover:bg-primary-700 transition-colors shadow-md mt-4 text-sm">
                  Submit Interest
                </button>
              </form>
            </div>
          </div>
          
        </div>
      </section>

    </div>
  );
};

export default Community;
