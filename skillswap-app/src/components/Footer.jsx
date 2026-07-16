import { FaPaperPlane } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-100 pt-16 pb-8 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          
          <div className="col-span-1 md:col-span-1">
            <h3 className="text-xl font-bold text-primary-600 mb-4">SkillSwap</h3>
            <p className="text-gray-500 text-sm leading-relaxed">
              Connecting the world's brightest minds through shared learning experiences.
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold text-gray-900 mb-4">Quick Links</h4>
            <ul className="space-y-3">
              <li><a href="#" className="text-sm text-gray-500 hover:text-primary-600 transition-colors">About Us</a></li>
              <li><a href="#" className="text-sm text-gray-500 hover:text-primary-600 transition-colors">Press Kits</a></li>
              <li><a href="#" className="text-sm text-gray-500 hover:text-primary-600 transition-colors">Contact</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-gray-900 mb-4">Legal</h4>
            <ul className="space-y-3">
              <li><a href="#" className="text-sm text-gray-500 hover:text-primary-600 transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="text-sm text-gray-500 hover:text-primary-600 transition-colors">Terms of Service</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-gray-900 mb-4">Newsletter</h4>
            <div className="flex">
              <input 
                type="email" 
                placeholder="Email address" 
                className="w-full px-4 py-2 border border-gray-200 rounded-l-md focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500 text-sm"
              />
              <button className="bg-primary-600 text-white px-4 py-2 rounded-r-md hover:bg-primary-700 transition-colors flex items-center justify-center">
                <FaPaperPlane size={14} />
              </button>
            </div>
          </div>

        </div>
        
        <div className="border-t border-gray-100 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-gray-400">
            © {new Date().getFullYear()} SkillSwap Festival. All rights reserved.
          </p>
          <p className="text-xs text-gray-400 font-medium bg-gray-50 px-3 py-1.5 rounded-full border border-gray-100">
            {new Date().toLocaleDateString('en-US', { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' })}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
