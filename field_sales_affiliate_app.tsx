import React, { useState, useEffect } from 'react';
import { 
  Home, Wallet, Users, Plus, Camera, MapPin, 
  CheckCircle, Smartphone, Globe, QrCode, 
  ChevronRight, Star, Clock, AlertTriangle, Check
} from 'lucide-react';

export default function App() {
  // App State
  const [currentScreen, setCurrentScreen] = useState('dashboard');
  const [isLoading, setIsLoading] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [dashboardTab, setDashboardTab] = useState('leads');
  
  // Lead Data State
  const [leadData, setLeadData] = useState({
    name: '',
    category: 'food',
    phone: '',
    photoTaken: false
  });

  // Navigation Helper
  const navigateTo = (screen) => {
    setCurrentScreen(screen);
    window.scrollTo(0, 0);
  };

  // Mock Loading & Transition
  const handleGeneratePreviews = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      navigateTo('preview');
    }, 1500);
  };

  // Reset Lead Data on Submit
  const handleSubmitBuild = () => {
    setLeadData({ name: '', category: 'food', phone: '', photoTaken: false });
    setPaymentSuccess(false);
    navigateTo('dashboard');
  };

  // --- Screens ---

  const renderDashboard = () => (
    <div className="pb-24">
      <div className="p-5 bg-white border-b border-gray-200">
        <h1 className="text-2xl font-bold text-[#111111]">Hola, Agent</h1>
        <p className="text-gray-500 text-sm mt-1">Ready to close some deals?</p>
      </div>

      <div className="p-5 grid grid-cols-2 gap-4">
        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex flex-col">
          <span className="text-xs text-gray-500 font-semibold uppercase">Balance</span>
          <span className="text-xl font-bold text-[#25D366] mt-1">$2,500 MXN</span>
        </div>
        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex flex-col">
          <span className="text-xs text-gray-500 font-semibold uppercase">Active Builds</span>
          <span className="text-xl font-bold text-[#FF6700] mt-1">4 Sites</span>
        </div>
      </div>

      <div className="px-5 mt-2">
        <div className="flex space-x-2 border-b border-gray-200 pb-2">
          {['leads', 'progress', 'completed'].map((tab) => (
            <button 
              key={tab}
              onClick={() => setDashboardTab(tab)}
              className={`pb-2 px-3 text-sm font-semibold capitalize transition-colors ${
                dashboardTab === tab 
                ? 'text-[#FF6700] border-b-2 border-[#FF6700]' 
                : 'text-gray-400'
              }`}
            >
              {tab === 'progress' ? 'In Progress' : tab}
            </button>
          ))}
        </div>

        <div className="mt-4 space-y-3">
          {dashboardTab === 'leads' && (
            <>
              <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 flex justify-between items-center">
                <div>
                  <h3 className="font-bold text-[#111111]">Tacos El Tío</h3>
                  <p className="text-xs text-gray-500">Visited 2 days ago</p>
                </div>
                <button className="text-[#FF6700] text-sm font-bold flex items-center">Resume <ChevronRight size={16} /></button>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 flex justify-between items-center">
                <div>
                  <h3 className="font-bold text-[#111111]">Lavandería Blanca</h3>
                  <p className="text-xs text-gray-500">Visited 5 days ago</p>
                </div>
                <button className="text-[#FF6700] text-sm font-bold flex items-center">Resume <ChevronRight size={16} /></button>
              </div>
            </>
          )}
          {dashboardTab === 'progress' && (
            <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
              <h3 className="font-bold text-[#111111]">Boutique Maya</h3>
              <div className="w-full bg-gray-200 rounded-full h-2 mt-3 mb-1">
                <div className="bg-[#FF6700] h-2 rounded-full w-1/2"></div>
              </div>
              <p className="text-xs text-gray-500 text-right">Step 2: Verification</p>
            </div>
          )}
          {dashboardTab === 'completed' && (
            <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 flex justify-between items-center">
              <div>
                <h3 className="font-bold text-[#111111]">Café Centro</h3>
                <p className="text-xs text-[#25D366] font-semibold flex items-center mt-1"><CheckCircle size={12} className="mr-1"/> Live</p>
              </div>
              <button className="bg-gray-100 text-gray-700 px-3 py-1 rounded text-xs font-bold">Share Referral</button>
            </div>
          )}
        </div>
      </div>

      {/* FAB - Fixed near bottom above nav */}
      <div className="absolute bottom-20 left-0 right-0 px-5">
        <button 
          onClick={() => navigateTo('capture')}
          className="w-full bg-[#FF6700] hover:bg-[#e55d00] text-white py-4 rounded-xl font-bold text-lg shadow-lg flex justify-center items-center transition-all"
        >
          <Plus size={24} className="mr-2" />
          Pitch New Business
        </button>
      </div>
    </div>
  );

  const renderCapture = () => (
    <div className="flex flex-col h-full bg-white">
      <div className="p-5 border-b border-gray-200 flex items-center bg-[#F4F5F7]">
        <button onClick={() => navigateTo('dashboard')} className="text-gray-500 mr-3">
          <ChevronRight size={24} className="rotate-180" />
        </button>
        <h1 className="text-xl font-bold text-[#111111]">New Client Setup</h1>
      </div>

      <div className="p-5 space-y-6 flex-1 overflow-y-auto pb-24">
        {/* Photo Box */}
        <div 
          onClick={() => setLeadData({...leadData, photoTaken: true})}
          className={`w-full h-48 rounded-xl flex flex-col justify-center items-center border-2 cursor-pointer transition-all ${
            leadData.photoTaken 
            ? 'border-[#25D366] bg-green-50 bg-[url("https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=400&q=80")] bg-cover bg-center' 
            : 'border-dashed border-gray-300 bg-[#F4F5F7]'
          }`}
        >
          {!leadData.photoTaken ? (
            <>
              <Camera size={40} className="text-gray-400 mb-2" />
              <p className="text-sm text-gray-500 font-semibold">Tap to snap storefront photo</p>
            </>
          ) : (
            <div className="bg-black/50 p-2 rounded text-white font-bold flex items-center">
               <CheckCircle size={16} className="mr-2 text-[#25D366]" /> Photo Captured
            </div>
          )}
        </div>

        {/* Inputs */}
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1">Business Name</label>
            <input 
              type="text" 
              placeholder="e.g. Tacos Don Chuy"
              value={leadData.name}
              onChange={(e) => setLeadData({...leadData, name: e.target.value})}
              className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:border-[#FF6700] focus:ring-1 focus:ring-[#FF6700] bg-white text-[#111111]"
            />
          </div>
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1">Category</label>
            <select 
              value={leadData.category}
              onChange={(e) => setLeadData({...leadData, category: e.target.value})}
              className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:border-[#FF6700] focus:ring-1 focus:ring-[#FF6700] bg-white text-[#111111]"
            >
              <option value="food">Food & Beverage (Restaurant, Tacos)</option>
              <option value="retail">Retail (Tienda, Boutique)</option>
              <option value="service">Service (Laundry, Mechanic)</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1">WhatsApp Number</label>
            <input 
              type="tel" 
              placeholder="+52 984..."
              value={leadData.phone}
              onChange={(e) => setLeadData({...leadData, phone: e.target.value})}
              className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:border-[#FF6700] focus:ring-1 focus:ring-[#FF6700] bg-white text-[#111111]"
            />
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 p-5 bg-white border-t border-gray-200 z-10">
        <button 
          onClick={handleGeneratePreviews}
          disabled={isLoading || !leadData.name}
          className="w-full bg-[#111111] hover:bg-gray-800 disabled:bg-gray-300 text-white py-4 rounded-xl font-bold text-lg transition-all flex justify-center items-center"
        >
          {isLoading ? (
            <span className="flex items-center">
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Building mockups...
            </span>
          ) : 'Generate Previews'}
        </button>
      </div>
    </div>
  );

  const renderPreview = () => (
    <div className="flex flex-col h-full bg-[#F4F5F7] pb-24 overflow-y-auto">
      <div className="p-5 bg-[#111111] text-white">
        <h1 className="text-xl font-bold mb-1">Previews Generated</h1>
        <p className="text-gray-400 text-sm">Showing mockups for <span className="text-[#FF6700] font-bold">{leadData.name || 'Your Client'}</span></p>
      </div>

      <div className="p-4 space-y-4">
        {/* Map Mockup */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-200">
          <div className="bg-gray-200 h-24 relative overflow-hidden flex justify-center items-center">
             <div className="absolute inset-0 bg-blue-100 opacity-50"></div>
             <MapPin size={32} className="text-red-500 z-10" />
             <div className="absolute w-full h-full bg-[url('https://maps.googleapis.com/maps/api/staticmap?center=Playa+del+Carmen&zoom=14&size=400x150&sensor=false')] bg-cover opacity-30"></div>
          </div>
          <div className="p-4">
            <div className="flex items-center space-x-2">
              <MapPin size={18} className="text-[#FF6700]" />
              <h3 className="font-bold text-[#111111] text-lg">Google Maps Profile</h3>
            </div>
            <div className="flex items-center mt-1 text-sm text-gray-600">
              <span className="text-yellow-400 flex"><Star size={14} fill="currentColor"/><Star size={14} fill="currentColor"/><Star size={14} fill="currentColor"/><Star size={14} fill="currentColor"/><Star size={14} fill="currentColor"/></span>
              <span className="ml-2">(12 reviews) • Verified</span>
            </div>
          </div>
        </div>

        {/* WhatsApp Mockup */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-200">
          <div className="bg-[#25D366]/10 h-24 flex justify-center items-center relative overflow-hidden">
            <div className="w-48 h-32 bg-white rounded-t-2xl shadow-lg border-t-4 border-[#25D366] flex flex-col items-center pt-2 mt-10">
              <div className="w-16 h-2 bg-gray-200 rounded-full mb-2"></div>
              <div className="w-3/4 h-3 bg-gray-100 rounded"></div>
            </div>
          </div>
          <div className="p-4">
            <div className="flex items-center space-x-2">
              <Smartphone size={18} className="text-[#25D366]" />
              <h3 className="font-bold text-[#111111] text-lg">WhatsApp Storefront</h3>
            </div>
            <p className="text-sm text-gray-500 mt-1">Digital Menu & Direct Ordering system.</p>
          </div>
        </div>

        {/* Web Mockup */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-200">
          <div className="bg-gradient-to-r from-blue-500 to-purple-600 h-24 flex justify-center items-center">
            <Globe size={40} className="text-white/50" />
          </div>
          <div className="p-4">
            <div className="flex items-center space-x-2">
              <Globe size={18} className="text-blue-500" />
              <h3 className="font-bold text-[#111111] text-lg">Mobile Website</h3>
            </div>
            <p className="text-sm text-gray-500 mt-1">Modern, SEO-friendly landing page.</p>
          </div>
        </div>
      </div>

      <div className="fixed bottom-0 left-0 right-0 max-w-md mx-auto p-4 bg-white border-t shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]">
        <button 
          onClick={() => navigateTo('checkout')}
          className="w-full bg-[#FF6700] hover:bg-[#e55d00] text-white py-4 rounded-xl font-bold text-lg transition-all shadow-lg flex justify-center items-center"
        >
          Lock in Deposit 1 ($500 MXN)
        </button>
      </div>
    </div>
  );

  const renderCheckout = () => (
    <div className="flex flex-col h-full bg-white pb-24 overflow-y-auto">
      <div className="p-5 border-b border-gray-200 bg-[#F4F5F7] sticky top-0 z-10 flex items-center justify-between">
         <h1 className="text-xl font-bold text-[#111111]">Secure Deposit</h1>
         <button onClick={() => setPaymentSuccess(false)} className="text-xs text-gray-500 underline">Reset Test</button>
      </div>

      {!paymentSuccess ? (
        <div className="p-8 flex flex-col items-center text-center animate-in fade-in slide-in-from-bottom-4 duration-500">
          <h2 className="text-2xl font-bold text-[#111111] mb-2">Scan to Pay</h2>
          <p className="text-gray-500 mb-8">Have the owner scan this to pay the $500 MXN initial deposit securely via Stripe.</p>
          
          <div className="bg-white p-6 rounded-3xl shadow-xl border border-gray-100 mb-8 w-64 h-64 flex justify-center items-center relative overflow-hidden">
            {/* Dummy QR styling */}
            <div className="absolute inset-0 opacity-10 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI4IiBoZWlnaHQ9IjgiPgo8cmVjdCB3aWR0aD0iOCIgaGVpZ2h0PSI4IiBmaWxsPSIjZmZmIj48L3JlY3Q+CjxwYXRoIGQ9Ik0wIDBMODg2IiBzdHJva2U9IiNlNWU3ZWIiIHN0cm9rZS13aWR0aD0iMSI+PC9wYXRoPgo8L3N2Zz4=')]"></div>
            <QrCode size={180} className="text-[#111111]" strokeWidth={1.5} />
            <div className="absolute center bg-white p-2 rounded-lg shadow-sm border border-gray-200">
              <span className="font-bold text-[#FF6700] text-sm">PAY</span>
            </div>
          </div>

          <button 
            onClick={() => setPaymentSuccess(true)}
            className="w-full bg-[#25D366] text-white py-4 rounded-xl font-bold text-lg transition-all flex justify-center items-center shadow-lg hover:shadow-xl transform hover:-translate-y-1"
          >
            <Check size={20} className="mr-2" />
            Simulate Payment Success
          </button>
        </div>
      ) : (
        <div className="p-5 animate-in fade-in slide-in-from-right-8 duration-500">
          <div className="bg-[#25D366]/10 text-[#25D366] p-4 rounded-xl flex items-center mb-6 border border-[#25D366]/20">
            <CheckCircle size={28} className="mr-3 flex-shrink-0" />
            <div>
              <h3 className="font-bold text-lg leading-tight">Deposit Secured</h3>
              <p className="text-sm opacity-90">Now, ask these 3 questions to start the build.</p>
            </div>
          </div>

          <div className="space-y-5">
            <div className="bg-[#F4F5F7] p-4 rounded-xl">
              <label className="block text-sm font-bold text-[#111111] mb-2 flex items-center">
                <Clock size={16} className="mr-2 text-[#FF6700]"/> 1. Opening Hours?
              </label>
              <textarea placeholder="e.g. Mon-Sat: 9am - 8pm" className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:border-[#FF6700]"></textarea>
            </div>

            <div className="bg-[#F4F5F7] p-4 rounded-xl">
              <label className="block text-sm font-bold text-[#111111] mb-2 flex items-center">
                <Wallet size={16} className="mr-2 text-[#FF6700]"/> 2. Accepted Payments?
              </label>
              <div className="flex space-x-2">
                <label className="flex-1 bg-white border border-gray-200 p-3 rounded-lg flex items-center justify-center space-x-2 font-semibold text-sm">
                  <input type="checkbox" className="accent-[#FF6700]" defaultChecked /> <span>Cash</span>
                </label>
                <label className="flex-1 bg-white border border-gray-200 p-3 rounded-lg flex items-center justify-center space-x-2 font-semibold text-sm">
                  <input type="checkbox" className="accent-[#FF6700]" /> <span>Card</span>
                </label>
              </div>
            </div>

            <div className="bg-[#F4F5F7] p-4 rounded-xl">
              <label className="block text-sm font-bold text-[#111111] mb-2 flex items-center">
                <Star size={16} className="mr-2 text-[#FF6700]"/> 3. Top 3 Best Sellers?
              </label>
              <textarea placeholder="e.g. 1. Tacos al Pastor, 2. Quesadillas, 3. Horchata" className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:border-[#FF6700] min-h-[80px]"></textarea>
            </div>
          </div>

          <button 
            onClick={handleSubmitBuild}
            className="w-full bg-[#111111] text-white py-4 rounded-xl font-bold text-lg mt-8 shadow-lg flex justify-center items-center"
          >
            Submit & Start Build
          </button>
        </div>
      )}
    </div>
  );

  const renderWallet = () => (
    <div className="pb-24 bg-gray-50 h-full overflow-y-auto">
      <div className="bg-[#111111] p-6 text-white text-center pb-12 rounded-b-[40px] shadow-md">
        <h1 className="text-xl font-semibold opacity-90 mb-1">Available Balance</h1>
        <div className="text-5xl font-bold tracking-tight text-[#25D366]">$2,500 <span className="text-xl opacity-80">MXN</span></div>
        <button className="mt-6 bg-white/10 hover:bg-white/20 text-white border border-white/20 px-8 py-3 rounded-full font-bold text-sm transition-colors">
          Request Payout
        </button>
      </div>

      <div className="px-5 -mt-6 relative z-10">
        {/* Conditional Alert */}
        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-xl shadow-sm flex items-start mb-6">
          <AlertTriangle size={20} className="text-yellow-500 mr-3 flex-shrink-0 mt-0.5" />
          <div>
            <h4 className="font-bold text-yellow-800 text-sm">Action Required</h4>
            <p className="text-xs text-yellow-700 mt-1">Upload RFC / Tax Info to unlock cash payouts to your bank account.</p>
          </div>
        </div>

        <h3 className="font-bold text-[#111111] text-lg mb-3 flex items-center"><Users size={20} className="mr-2 text-[#FF6700]"/> My Team & Network</h3>
        <div className="grid grid-cols-2 gap-3 mb-8">
          <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
            <div className="text-xs text-gray-500 font-semibold mb-1">Direct Sales</div>
            <div className="text-2xl font-bold text-[#111111]">12</div>
          </div>
          <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
            <div className="text-xs text-gray-500 font-semibold mb-1">Sub-Affiliate Sales</div>
            <div className="text-2xl font-bold text-[#FF6700]">3</div>
          </div>
        </div>

        <h3 className="font-bold text-[#111111] text-lg mb-3">Recent Earnings</h3>
        <div className="space-y-3 bg-white p-2 rounded-xl shadow-sm border border-gray-100">
          <div className="p-3 border-b border-gray-100 flex justify-between items-center last:border-0">
            <div className="flex items-center space-x-3">
              <div className="bg-green-100 p-2 rounded-full">
                <Plus size={16} className="text-green-600" />
              </div>
              <div>
                <p className="font-bold text-sm text-[#111111]">Deposit 1: Mariscos Rey</p>
                <p className="text-xs text-gray-500">Direct Sale (30%)</p>
              </div>
            </div>
            <span className="font-bold text-[#25D366]">+$900</span>
          </div>
          
          <div className="p-3 border-b border-gray-100 flex justify-between items-center last:border-0">
            <div className="flex items-center space-x-3">
              <div className="bg-blue-100 p-2 rounded-full">
                <Users size={16} className="text-blue-600" />
              </div>
              <div>
                <p className="font-bold text-sm text-[#111111]">Deposit 2: Tacos el Paisa</p>
                <p className="text-xs text-gray-500">Passive (10%) from Store Owner</p>
              </div>
            </div>
            <span className="font-bold text-[#25D366]">+$150</span>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-200 flex items-center justify-center p-0 md:p-4">
      {/* Mobile Wrapper (Simulates a phone screen on desktop) */}
      <div className="w-full max-w-md bg-white md:rounded-[40px] md:shadow-2xl overflow-hidden h-screen md:h-[850px] relative font-sans flex flex-col md:border-[8px] border-gray-800">
        
        {/* Render Active Screen */}
        <div className="flex-1 h-full overflow-hidden relative">
          {currentScreen === 'dashboard' && renderDashboard()}
          {currentScreen === 'capture' && renderCapture()}
          {currentScreen === 'preview' && renderPreview()}
          {currentScreen === 'checkout' && renderCheckout()}
          {currentScreen === 'wallet' && renderWallet()}
        </div>

        {/* Bottom Navigation */}
        {['dashboard', 'wallet'].includes(currentScreen) && (
          <div className="absolute bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-6 py-3 flex justify-between items-center z-50">
            <button 
              onClick={() => navigateTo('dashboard')}
              className={`flex flex-col items-center w-20 transition-colors ${currentScreen === 'dashboard' ? 'text-[#FF6700]' : 'text-gray-400 hover:text-gray-600'}`}
            >
              <Home size={24} className={currentScreen === 'dashboard' ? 'fill-current' : ''} />
              <span className="text-[10px] font-bold mt-1">Home</span>
            </button>
            <button 
              onClick={() => navigateTo('wallet')}
              className={`flex flex-col items-center w-20 transition-colors ${currentScreen === 'wallet' ? 'text-[#FF6700]' : 'text-gray-400 hover:text-gray-600'}`}
            >
              <Wallet size={24} className={currentScreen === 'wallet' ? 'fill-current' : ''} />
              <span className="text-[10px] font-bold mt-1">Wallet</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}