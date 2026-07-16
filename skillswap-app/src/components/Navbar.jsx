import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FaSearch, FaBell } from 'react-icons/fa';
import AuthModal from './AuthModal';
import FeedbackModal from './FeedbackModal';

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const isDashboard = location.pathname === '/dashboard';
  const isLandingPage = location.pathname === '/';
  
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isFeedbackOpen, setIsFeedbackOpen] = useState(false);
  const [authMode, setAuthMode] = useState('login');
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, [location.pathname]); // Update when navigating to dashboard

  const openAuthModal = (mode) => {
    setAuthMode(mode);
    setIsAuthModalOpen(true);
  };

  const handleSignOut = async () => {
    if (user && user.email) {
      try {
        await fetch(`${import.meta.env.VITE_API_URL}/api/auth/signout`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email: user.email })
        });
      } catch (err) {
        console.error('Error deleting user from DB', err);
      }
    }
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    setUser(null);
    navigate('/');
  };

  return (
    <>
      <nav className="fixed w-full z-40 bg-white/80 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Link to="/" className="text-xl font-bold text-primary-600">
                SkillSwap <span className="text-gray-900 font-medium">Festival</span>
              </Link>
            </div>

            {!isLandingPage && (
              <div className="hidden md:flex items-center space-x-8">
                <Link to="/festivals" className={`text-sm font-medium ${location.pathname === '/festivals' ? 'text-primary-600 border-b-2 border-primary-600 px-1 py-5' : 'text-gray-600 hover:text-gray-900'}`}>Festivals</Link>
                <Link to="/workshops" className={`text-sm font-medium ${location.pathname === '/workshops' ? 'text-primary-600 border-b-2 border-primary-600 px-1 py-5' : 'text-gray-600 hover:text-gray-900'}`}>Workshops</Link>
                <Link to="/community" className={`text-sm font-medium ${location.pathname === '/community' ? 'text-primary-600 border-b-2 border-primary-600 px-1 py-5' : 'text-gray-600 hover:text-gray-900'}`}>Community</Link>
              </div>
            )}

            <div className="flex items-center space-x-6">
              {(!isLandingPage && (user || isDashboard)) ? (
                <>
                  <button className="text-gray-500 hover:text-gray-900 transition-colors">
                    <FaSearch size={18} />
                  </button>
                  <div className="relative group flex items-center gap-3 cursor-pointer py-2">
                    <div className="relative w-8 h-8 rounded-full overflow-visible">
                      <div className="w-full h-full rounded-full overflow-hidden border border-gray-200">
                        <img src="https://images.unsplash.com/photo-1599566150163-29194dcaad36?auto=format&fit=crop&q=80&w=150" alt={user?.name || 'Alex'} className="w-full h-full object-cover" />
                      </div>
                      {/* Notification Badge */}
                      <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center border-2 border-white shadow-sm">1</span>
                    </div>
                    <span className="text-sm font-medium text-gray-900 hidden sm:block capitalize">{user?.name || 'Alex'}</span>
                    
                    {/* Hover Dropdown */}
                    <div className="absolute right-0 top-full mt-0 w-56 bg-white rounded-2xl shadow-xl border border-gray-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 flex flex-col py-2 z-50">
                      <div className="px-5 py-3 border-b border-gray-50 mb-1">
                        <p className="text-[10px] text-gray-500 font-bold uppercase tracking-wider mb-1">Signed in as</p>
                        <p className="text-sm font-bold text-gray-900 truncate capitalize">{user?.name || 'Alex Rivers'}</p>
                      </div>
                      <Link to="/profile" className="px-5 py-2.5 text-sm text-gray-700 hover:bg-gray-50 hover:text-primary-600 font-semibold transition-colors flex items-center gap-2">
                        Settings & Profile
                      </Link>
                      <button 
                        onClick={() => setIsFeedbackOpen(true)}
                        className="text-left px-5 py-2.5 text-sm text-gray-700 hover:bg-gray-50 hover:text-primary-600 font-semibold transition-colors flex items-center justify-between gap-2"
                      >
                        <span className="flex items-center gap-2"><FaBell className="text-primary-400"/> Pending Feedback</span>
                        <span className="bg-red-100 text-red-600 text-xs font-bold px-1.5 py-0.5 rounded">1</span>
                      </button>
                      <button onClick={handleSignOut} className="text-left px-5 py-2.5 text-sm text-red-600 hover:bg-red-50 font-semibold transition-colors flex items-center gap-2">
                        Sign Out
                      </button>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <button 
                    onClick={() => openAuthModal('login')} 
                    className="text-sm font-medium text-gray-600 hover:text-gray-900"
                  >
                    Sign In
                  </button>
                  <button 
                    onClick={() => openAuthModal('signup')} 
                    className="px-5 py-2 text-sm font-medium text-white bg-primary-600 rounded-full hover:bg-primary-700 transition-colors shadow-sm hover:shadow-md"
                  >
                    Join Event
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>

      <AuthModal 
        isOpen={isAuthModalOpen} 
        onClose={() => setIsAuthModalOpen(false)} 
        initialMode={authMode} 
      />
      <FeedbackModal
        isOpen={isFeedbackOpen}
        onClose={() => setIsFeedbackOpen(false)}
      />
    </>
  );
};

export default Navbar;
