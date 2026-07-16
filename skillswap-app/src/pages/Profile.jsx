import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUserAlt, FaCog, FaBell, FaShieldAlt, FaEnvelope, FaPhone, FaCheckCircle, FaArrowLeft, FaUndo } from 'react-icons/fa';

const Profile = () => {
  const navigate = useNavigate();
  
  // State for user
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('user');
    return saved ? JSON.parse(saved) : { name: 'Alex Rivers', email: 'alex.rivers@design.co' };
  });

  // State for toggles
  const [emailAlerts, setEmailAlerts] = useState(true);
  const [pushNotifs, setPushNotifs] = useState(true);
  const [smsAlerts, setSmsAlerts] = useState(false);

  return (
    <div className="min-h-screen bg-indigo-50/30 flex flex-col md:flex-row relative font-sans">
      
      {/* Absolute Back Button */}
      <button 
        onClick={() => navigate(-1)}
        className="absolute top-6 left-6 z-50 flex items-center gap-2 text-gray-500 hover:text-gray-900 font-semibold transition-colors bg-white/80 backdrop-blur-md px-4 py-2 rounded-full shadow-sm border border-gray-100"
      >
        <FaArrowLeft size={14} /> Back
      </button>

      {/* Sidebar */}
      <aside className="w-full md:w-72 bg-indigo-50 p-8 border-r border-indigo-100 flex-shrink-0 min-h-screen pt-24 md:pt-12">
        <div className="flex flex-col items-center mb-8 mt-12">
          <img 
            src="https://images.unsplash.com/photo-1599566150163-29194dcaad36?auto=format&fit=crop&q=80&w=150" 
            alt="Alex Rivers" 
            className="w-20 h-20 rounded-full object-cover mb-4 shadow-sm border-2 border-white"
          />
          <h2 className="text-xl font-bold text-gray-900 capitalize">{user.name}</h2>
          <p className="text-primary-600 text-sm font-semibold mb-4">Premium Member</p>
          <button className="w-full bg-indigo-100 text-indigo-700 font-bold py-2.5 rounded-lg hover:bg-indigo-200 transition-colors text-sm">
            Upgrade to VIP
          </button>
        </div>

        <nav className="space-y-2 mt-8">
          <button className="w-full flex items-center gap-3 bg-primary-600 text-white px-4 py-3 rounded-xl font-semibold shadow-sm transition-colors text-sm">
            <FaUserAlt size={16} /> Profile
          </button>
          <button className="w-full flex items-center gap-3 text-gray-600 hover:bg-white hover:shadow-sm px-4 py-3 rounded-xl font-semibold transition-colors text-sm">
            <FaCog size={16} /> Account
          </button>
          <button className="w-full flex items-center gap-3 text-gray-600 hover:bg-white hover:shadow-sm px-4 py-3 rounded-xl font-semibold transition-colors text-sm">
            <FaBell size={16} /> Notifications
          </button>
          <button className="w-full flex items-center gap-3 text-gray-600 hover:bg-white hover:shadow-sm px-4 py-3 rounded-xl font-semibold transition-colors text-sm">
            <FaShieldAlt size={16} /> Security
          </button>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 md:p-12 lg:p-16 max-h-screen overflow-y-auto pt-24 md:pt-12">
        
        <div className="max-w-4xl mx-auto">
          <div className="mb-10 mt-12">
            <h1 className="text-4xl font-extrabold text-gray-900 mb-2">Profile Settings</h1>
            <p className="text-gray-500 font-medium">Manage your digital presence and account preferences.</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Left Column (Wider) */}
            <div className="lg:col-span-2 space-y-8">
              
              {/* Profile Details Card */}
              <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
                <div className="flex flex-col sm:flex-row gap-6 items-start sm:items-center mb-8">
                  <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-white shadow-md shrink-0">
                    <img 
                      src="https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&q=80&w=200" 
                      alt="Profile" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-1">Profile Photo</h3>
                    <p className="text-sm text-gray-500 font-medium mb-4">Update your profile picture to help people recognize you.</p>
                    <div className="flex gap-3">
                      <button className="bg-primary-600 text-white font-semibold py-2 px-5 rounded-full text-sm hover:bg-primary-700 transition-colors shadow-sm">
                        Upload New
                      </button>
                      <button className="border border-gray-300 text-gray-700 font-semibold py-2 px-5 rounded-full text-sm hover:bg-gray-50 transition-colors">
                        Remove
                      </button>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Full Name</label>
                    <input type="text" defaultValue={user.name} className="w-full bg-gray-50/50 border border-transparent focus:bg-white focus:border-primary-300 px-4 py-3 rounded-xl outline-none text-gray-900 font-medium transition-all capitalize" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Professional Headline</label>
                    <input type="text" defaultValue="UI/UX Designer & Content Strategist" className="w-full bg-gray-50/50 border border-transparent focus:bg-white focus:border-primary-300 px-4 py-3 rounded-xl outline-none text-gray-900 font-medium transition-all" />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Bio</label>
                  <textarea rows="4" defaultValue="Passionate about bridging the gap between design and development. I've been attending SkillSwap for 3 years and love mentoring junior designers on creative workflow optimization." className="w-full bg-gray-50/50 border border-transparent focus:bg-white focus:border-primary-300 px-4 py-3 rounded-xl outline-none text-gray-900 font-medium transition-all resize-none"></textarea>
                </div>
              </div>

              {/* Security Settings Card */}
              <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
                <div className="flex items-center gap-3 mb-8">
                  <div className="p-2 bg-red-50 text-red-500 rounded-lg">
                    <FaUndo size={20} />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900">Security Settings</h3>
                </div>

                <div className="mb-6">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Current Password</label>
                  <input type="password" defaultValue="••••••••" className="w-full bg-gray-50/50 border border-transparent focus:bg-white focus:border-primary-300 px-4 py-3 rounded-xl outline-none text-gray-900 font-medium transition-all" />
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">New Password</label>
                    <input type="password" placeholder="Min. 8 characters" className="w-full bg-gray-50/50 border border-transparent focus:bg-white focus:border-primary-300 px-4 py-3 rounded-xl outline-none text-gray-900 font-medium transition-all" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Confirm New Password</label>
                    <input type="password" placeholder="Repeat new password" className="w-full bg-gray-50/50 border border-transparent focus:bg-white focus:border-primary-300 px-4 py-3 rounded-xl outline-none text-gray-900 font-medium transition-all" />
                  </div>
                </div>

                <button className="bg-gray-100 text-gray-800 font-bold py-3 px-6 rounded-full text-sm hover:bg-gray-200 transition-colors">
                  Update Password
                </button>
              </div>

            </div>

            {/* Right Column (Narrower) */}
            <div className="space-y-8">
              
              {/* Contact Card */}
              <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Contact</h3>
                
                <div className="mb-6">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Email Address</label>
                  <div className="relative">
                    <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-primary-500" />
                    <input type="email" defaultValue={user.email} className="w-full bg-gray-50/50 border border-transparent focus:bg-white focus:border-primary-300 pl-11 pr-4 py-3 rounded-xl outline-none text-gray-900 font-medium transition-all" />
                  </div>
                </div>

                <div className="mb-8">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Phone Number</label>
                  <div className="relative">
                    <FaPhone className="absolute left-4 top-1/2 -translate-y-1/2 text-primary-500" />
                    <input type="tel" defaultValue="+1 (555) 000-1234" className="w-full bg-gray-50/50 border border-transparent focus:bg-white focus:border-primary-300 pl-11 pr-4 py-3 rounded-xl outline-none text-gray-900 font-medium transition-all" />
                  </div>
                </div>

                <div className="bg-indigo-50 border border-indigo-100 p-5 rounded-2xl">
                  <div className="flex items-center gap-2 text-primary-700 font-bold text-xs mb-2 uppercase tracking-wider">
                    <FaCheckCircle /> Identity Verified
                  </div>
                  <p className="text-[11px] text-gray-600 font-medium leading-relaxed">
                    Your identity has been verified through LinkedIn. This builds trust within the SkillSwap ecosystem.
                  </p>
                </div>
              </div>

              {/* Notification Preferences Card */}
              <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
                <div className="flex items-center gap-3 mb-8">
                  <div className="p-2 bg-teal-50 text-teal-600 rounded-lg">
                    <FaBell size={20} />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 leading-tight">Notification Preferences</h3>
                </div>

                <div className="space-y-8">
                  {/* Toggle 1 */}
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex gap-3">
                      <FaEnvelope className="text-primary-600 mt-0.5 shrink-0" size={14} />
                      <div>
                        <h4 className="text-sm font-bold text-gray-900">Email Alerts</h4>
                        <p className="text-[11px] font-medium text-gray-500 mt-1 leading-tight">Daily digest of community messages and event news.</p>
                      </div>
                    </div>
                    <button 
                      onClick={() => setEmailAlerts(!emailAlerts)}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors shrink-0 ${emailAlerts ? 'bg-primary-600' : 'bg-gray-300'}`}
                    >
                      <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${emailAlerts ? 'translate-x-6' : 'translate-x-1'}`} />
                    </button>
                  </div>

                  {/* Toggle 2 */}
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex gap-3">
                      <FaBell className="text-primary-600 mt-0.5 shrink-0" size={14} />
                      <div>
                        <h4 className="text-sm font-bold text-gray-900">Push Notifications</h4>
                        <p className="text-[11px] font-medium text-gray-500 mt-1 leading-tight">Instant alerts for scheduling updates.</p>
                      </div>
                    </div>
                    <button 
                      onClick={() => setPushNotifs(!pushNotifs)}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors shrink-0 ${pushNotifs ? 'bg-primary-600' : 'bg-gray-300'}`}
                    >
                      <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${pushNotifs ? 'translate-x-6' : 'translate-x-1'}`} />
                    </button>
                  </div>

                  {/* Toggle 3 */}
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex gap-3">
                      <div className="text-primary-600 mt-0.5 shrink-0 text-sm font-bold">💬</div>
                      <div>
                        <h4 className="text-sm font-bold text-gray-900">SMS Alerts</h4>
                        <p className="text-[11px] font-medium text-gray-500 mt-1 leading-tight">Critical event alerts sent directly to your phone.</p>
                      </div>
                    </div>
                    <button 
                      onClick={() => setSmsAlerts(!smsAlerts)}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors shrink-0 ${smsAlerts ? 'bg-primary-600' : 'bg-gray-300'}`}
                    >
                      <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${smsAlerts ? 'translate-x-6' : 'translate-x-1'}`} />
                    </button>
                  </div>
                </div>
              </div>

            </div>
          </div>
          
          {/* Action Bar */}
          <div className="mt-12 flex flex-col sm:flex-row justify-end items-center gap-4 border-t border-gray-200/50 pt-8">
            <button className="text-gray-900 font-bold py-3 px-6 rounded-full hover:bg-gray-100 transition-colors w-full sm:w-auto text-sm">
              Discard Changes
            </button>
            <button className="bg-primary-600 text-white font-bold py-3 px-8 rounded-full hover:bg-primary-700 transition-colors shadow-md hover:shadow-lg w-full sm:w-auto text-sm">
              Save Profile Changes
            </button>
          </div>

        </div>
      </main>
    </div>
  );
};

export default Profile;
