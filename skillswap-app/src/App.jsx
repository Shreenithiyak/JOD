import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import LandingPage from './pages/LandingPage';
import FestivalSlider from './pages/FestivalSlider';
import Workshops from './pages/Workshops';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';
import Community from './pages/Community';

function App() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50 text-gray-900 font-sans">
      <Routes>
        {/* Auth Routes without standard Navbar/Footer */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/profile" element={<Profile />} />
        
        {/* Main App Routes */}
        <Route path="/*" element={
          <>
            <Navbar />
            <main className="flex-grow">
              <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/festivals" element={<FestivalSlider />} />
                <Route path="/workshops" element={<Workshops />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/community" element={<Community />} />
              </Routes>
            </main>
            <Footer />
          </>
        } />
      </Routes>
    </div>
  );
}

export default App;
