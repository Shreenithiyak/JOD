import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaStar, FaBuilding, FaUtensils, FaLightbulb, FaPaperPlane, FaTimes, FaCheckCircle } from 'react-icons/fa';

const FeedbackModal = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const [overall, setOverall] = useState('Amazing');
  const [mentorQuality, setMentorQuality] = useState(4);
  const [contentRelevance, setContentRelevance] = useState(5);
  const [layout, setLayout] = useState(80);
  const [accessibility, setAccessibility] = useState(80);
  const [food, setFood] = useState('Premium');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      onClose();
      navigate('/community');
    }, 60000); // 1 minute
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] bg-[#FDFCFE] overflow-y-auto font-sans animate-fade-in">
      
      <button 
        onClick={onClose}
        className="absolute top-6 right-6 lg:top-10 lg:right-10 text-gray-400 hover:text-gray-900 bg-white hover:bg-gray-100 rounded-full p-3 shadow-sm border border-gray-100 transition-colors z-10"
      >
        <FaTimes size={18} />
      </button>

      <div className="max-w-2xl mx-auto px-4 py-16">
        
        {/* Header */}
        <div className="text-center mb-12 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
          <div className="inline-flex items-center gap-2 bg-primary-50 text-primary-600 px-4 py-1.5 rounded-full text-xs font-bold tracking-wide mb-6">
            <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2L15 8L21 9L16.5 14L18 20L12 17L6 20L7.5 14L3 9L9 8L12 2Z" />
            </svg>
            Festival Pulse 2024
          </div>
          <h1 className="text-3xl font-extrabold text-gray-900 mb-3">Share Your <span className="text-primary-600">Festival Story</span></h1>
          <p className="text-gray-500 font-medium max-w-md mx-auto text-sm">
            Thank you for being part of the SkillSwap community. Your insights help us shape the future of collaborative learning.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="max-w-2xl mx-auto space-y-6">
          
          {/* Overall Experience */}
          <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-gray-100 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            <div className="flex items-center gap-4 mb-8">
              <div className="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center text-primary-500 shrink-0">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <h3 className="font-bold text-gray-900 text-sm">Overall Experience</h3>
                <p className="text-xs text-gray-500 font-medium">How was your time at SkillSwap Festival?</p>
              </div>
            </div>

            <div className="flex justify-between sm:justify-center sm:gap-12 items-end">
              {['Terrible', 'Okay', 'Great', 'Amazing'].map((feeling) => (
                <div key={feeling} className="flex flex-col items-center gap-3 cursor-pointer group" onClick={() => setOverall(feeling)}>
                  <div className={`text-4xl transition-all duration-300 ${overall === feeling ? 'scale-125 filter-none' : 'grayscale opacity-50 group-hover:grayscale-0 group-hover:opacity-100'}`}>
                    {feeling === 'Terrible' && '😫'}
                    {feeling === 'Okay' && '😐'}
                    {feeling === 'Great' && '😊'}
                    {feeling === 'Amazing' && '🤩'}
                  </div>
                  <span className={`text-xs font-bold transition-colors ${overall === feeling ? 'text-primary-600' : 'text-gray-400'}`}>
                    {feeling}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            
            {/* Workshops Card */}
            <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-gray-100 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
              <div className="flex items-center gap-3 mb-8">
                <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center text-blue-500 shrink-0">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
                <h3 className="font-bold text-gray-900 text-sm">Workshops</h3>
              </div>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-2">Mentor Quality</label>
                  <div className="flex gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <FaStar 
                        key={star} 
                        size={18} 
                        className={`cursor-pointer transition-colors ${star <= mentorQuality ? 'text-primary-600' : 'text-gray-200 hover:text-primary-300'}`}
                        onClick={() => setMentorQuality(star)}
                      />
                    ))}
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-2">Content Relevance</label>
                  <div className="flex gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <FaStar 
                        key={star} 
                        size={18} 
                        className={`cursor-pointer transition-colors ${star <= contentRelevance ? 'text-primary-600' : 'text-gray-200 hover:text-primary-300'}`}
                        onClick={() => setContentRelevance(star)}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Venues Card */}
            <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-gray-100 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
              <div className="flex items-center gap-3 mb-8">
                <div className="w-8 h-8 rounded-lg bg-purple-50 flex items-center justify-center text-purple-500 shrink-0">
                  <FaBuilding size={14} />
                </div>
                <h3 className="font-bold text-gray-900 text-sm">Venues</h3>
              </div>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-3">Innovation Hall Layout</label>
                  <input 
                    type="range" 
                    min="0" max="100" 
                    value={layout} 
                    onChange={(e) => setLayout(e.target.value)}
                    className="w-full h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary-600"
                  />
                  <div className="flex justify-between mt-2">
                    <span className="text-[10px] font-medium text-gray-400">Poor</span>
                    <span className="text-[10px] font-medium text-gray-400">Excellent</span>
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-3">Accessibility</label>
                  <input 
                    type="range" 
                    min="0" max="100" 
                    value={accessibility} 
                    onChange={(e) => setAccessibility(e.target.value)}
                    className="w-full h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary-600"
                  />
                  <div className="flex justify-between mt-2">
                    <span className="text-[10px] font-medium text-gray-400">Low</span>
                    <span className="text-[10px] font-medium text-gray-400">Seamless</span>
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* Food & Catering */}
          <div className="bg-white p-6 sm:p-8 rounded-[2rem] shadow-sm border border-gray-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 animate-fade-in-up" style={{ animationDelay: '0.5s' }}>
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-teal-50 flex items-center justify-center text-teal-600 shrink-0">
                <FaUtensils size={14} />
              </div>
              <div>
                <h3 className="font-bold text-gray-900 text-sm">Food & Catering</h3>
                <p className="text-xs text-gray-500 font-medium">Quality and variety of the Food Court selection</p>
              </div>
            </div>
            <div className="flex bg-gray-50 p-1.5 rounded-2xl border border-gray-100 w-full sm:w-auto">
              {['Poor', 'Good', 'Premium'].map((option) => (
                <button
                  key={option}
                  onClick={() => setFood(option)}
                  className={`flex-1 sm:flex-none px-6 py-2 rounded-xl text-xs font-bold transition-all ${food === option ? 'bg-white text-primary-600 shadow-sm' : 'text-gray-500 hover:text-gray-900'}`}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>

          {/* Detailed Insights */}
          <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-gray-100 animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
            <div className="flex items-center gap-3 mb-6">
              <div className="text-primary-500 shrink-0">
                <FaLightbulb size={16} />
              </div>
              <h3 className="font-bold text-gray-900 text-sm">Detailed Insights</h3>
            </div>
            
            <div className="space-y-6">
              <div>
                <label className="block text-xs font-medium text-gray-900 mb-2">
                  What was your breakthrough moment? <span className="text-red-500">*</span>
                </label>
                <textarea 
                  required
                  rows="3" 
                  placeholder="Tell us about a specific talk or interaction that inspired you..."
                  className="w-full bg-white border border-gray-200 rounded-2xl p-4 text-sm focus:border-primary-500 focus:ring-1 focus:ring-primary-500 outline-none transition-all resize-none text-gray-900 placeholder:text-gray-300 font-medium"
                ></textarea>
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-900 mb-2">
                  How can we improve for 2025? <span className="text-red-500">*</span>
                </label>
                <textarea 
                  required
                  rows="3" 
                  placeholder="Suggestions on scheduling, logistics, or new themes..."
                  className="w-full bg-white border border-gray-200 rounded-2xl p-4 text-sm focus:border-primary-500 focus:ring-1 focus:ring-primary-500 outline-none transition-all resize-none text-gray-900 placeholder:text-gray-300 font-medium"
                ></textarea>
              </div>
            </div>
          </div>

          {/* Submit */}
          <div className="text-center pt-4 animate-fade-in-up" style={{ animationDelay: '0.7s' }}>
            <button 
              type="submit"
              disabled={isSubmitted}
              className={`inline-flex items-center justify-center gap-3 text-white font-bold py-3.5 px-12 rounded-full shadow-lg transition-all text-sm ${isSubmitted ? 'bg-green-500 hover:bg-green-600 shadow-green-500/30' : 'bg-primary-600 hover:bg-primary-700 shadow-primary-500/30'}`}
            >
              {isSubmitted ? 'Feedback Received' : 'Submit Feedback'} 
              {isSubmitted ? <FaCheckCircle size={14} /> : <FaPaperPlane size={14} />}
            </button>
            {isSubmitted ? (
              <p className="mt-4 text-[11px] font-extrabold text-green-600 uppercase tracking-widest animate-fade-in">
                Thank you for your valuable feedback!
              </p>
            ) : (
              <p className="mt-4 text-[11px] font-medium text-gray-400">Estimated completion time: 3 minutes</p>
            )}
          </div>

        </form>
      </div>
    </div>
  );
};

export default FeedbackModal;
