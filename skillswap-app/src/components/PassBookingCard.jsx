import { useState } from 'react';
import { FaMinus, FaPlus, FaCheck, FaInfoCircle } from 'react-icons/fa';

const PassBookingCard = ({ passes }) => {
  const [selectedPass, setSelectedPass] = useState(passes[0].id);
  const [isReserving, setIsReserving] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [toast, setToast] = useState(null);

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const handleIncrement = () => setQuantity(prev => prev + 1);
  const handleDecrement = () => setQuantity(prev => (prev > 1 ? prev - 1 : 1));

  const activePassData = passes.find(p => p.id === selectedPass);
  const total = activePassData ? activePassData.price * quantity : 0;

  const handleReserve = async () => {
    const userStr = localStorage.getItem('user');
    if (!userStr) {
      showToast("Please log in or sign up first to reserve a pass!", 'error');
      return;
    }
    
    const user = JSON.parse(userStr);
    setIsReserving(true);
    
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/bookings/reserve`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userEmail: user.email,
          userName: user.name,
          ticketType: activePassData.name,
          price: total
        })
      });
      
      const data = await res.json();
      if (res.ok) {
        showToast("Pass reserved successfully! A confirmation email will be sent soon with your ticket and details.", 'success');
        if (data.previewUrl) {
          console.log("Email Preview URL:", data.previewUrl);
        }
      } else {
        showToast(data.message || "Failed to reserve pass.", 'error');
      }
    } catch (err) {
      console.error(err);
      showToast("Network error. Please make sure backend is running.", 'error');
    } finally {
      setIsReserving(false);
    }
  };

  return (
    <div className="bg-white rounded-3xl shadow-xl p-8 sticky top-24 border border-gray-100 relative overflow-hidden">
      
      {toast && (
        <div className={`absolute top-0 left-0 w-full py-2 px-4 text-center text-sm font-bold text-white transition-all ${toast.type === 'error' ? 'bg-red-500' : 'bg-green-500'}`}>
          {toast.message}
        </div>
      )}

      <h3 className="text-xl font-bold text-gray-900 mb-6 mt-2">Book Festival Pass</h3>
      
      <div className="space-y-4 mb-8">
        {passes.map((pass) => (
          <div 
            key={pass.id}
            onClick={() => setSelectedPass(pass.id)}
            className={`border-2 rounded-2xl p-4 cursor-pointer transition-all ${
              selectedPass === pass.id 
                ? 'border-primary-600 bg-primary-50/30 shadow-sm' 
                : 'border-gray-100 hover:border-primary-200'
            }`}
          >
            <div className="flex justify-between items-start mb-2">
              <div className="flex items-center gap-2">
                <h4 className={`font-bold ${selectedPass === pass.id ? 'text-primary-700' : 'text-gray-900'}`}>
                  {pass.name}
                </h4>
                {pass.popular && (
                  <span className="bg-primary-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
                    Popular
                  </span>
                )}
              </div>
              <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                selectedPass === pass.id ? 'border-primary-600 bg-primary-600' : 'border-gray-300'
              }`}>
                {selectedPass === pass.id && <div className="w-1.5 h-1.5 bg-white rounded-full"></div>}
              </div>
            </div>
            <p className="text-xs text-gray-500 mb-3">{pass.description}</p>
            <p className="font-semibold text-gray-900">₹{pass.price.toLocaleString('en-IN')}</p>
          </div>
        ))}
      </div>

      <div className="flex justify-between items-center mb-6">
        <span className="text-sm font-medium text-gray-700">Quantity</span>
        <div className="flex items-center gap-4 bg-gray-50 rounded-full px-2 py-1 border border-gray-100">
          <button onClick={handleDecrement} className="w-6 h-6 flex items-center justify-center text-gray-500 hover:text-primary-600 hover:bg-gray-200 rounded-full transition-colors">
            <FaMinus size={10} />
          </button>
          <span className="text-sm font-semibold w-4 text-center">{quantity}</span>
          <button onClick={handleIncrement} className="w-6 h-6 flex items-center justify-center text-gray-500 hover:text-primary-600 hover:bg-gray-200 rounded-full transition-colors">
            <FaPlus size={10} />
          </button>
        </div>
      </div>

      <div className="flex justify-between items-end mb-6">
        <span className="text-lg font-bold text-gray-900">Total</span>
        <span className="text-2xl font-extrabold text-gray-900">₹{total.toLocaleString('en-IN')}</span>
      </div>

      <button 
        onClick={handleReserve}
        disabled={isReserving}
        className="w-full bg-primary-600 hover:bg-primary-700 disabled:bg-primary-400 text-white font-bold py-4 rounded-xl shadow-md hover:shadow-lg transition-all flex justify-center items-center gap-2 mb-4"
      >
        {isReserving ? 'Reserving...' : (
          <>Reserve My Pass <FaCheck size={14} /></>
        )}
      </button>

      <div className="flex gap-2 p-3 bg-blue-50/50 text-blue-800 rounded-xl text-xs">
        <FaInfoCircle className="shrink-0 mt-0.5 text-blue-600" />
        <p>Safe & secure payments with 256-bit encryption. Limited spots available.</p>
      </div>
    </div>
  );
};

export default PassBookingCard;
