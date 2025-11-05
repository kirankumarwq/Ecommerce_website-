import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Modal from './Modal'; // Import Modal component
import Button from './Button'; // Assuming Button is also used or will be

const Footer: React.FC = () => {
  const [showSubscriptionSuccessModal, setShowSubscriptionSuccessModal] = useState(false);
  const [emailInput, setEmailInput] = useState('');

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate API call for subscription
    setTimeout(() => {
      setShowSubscriptionSuccessModal(true);
      setEmailInput(''); // Clear the input field
    }, 500); // Simulate a short delay
  };

  const handleCloseModal = () => {
    setShowSubscriptionSuccessModal(false);
  };

  return (
    <footer className="bg-neutral-800 text-neutral-300">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-sm font-semibold text-neutral-100 tracking-wider uppercase">Shop</h3>
            <ul className="mt-4 space-y-2">
              <li><Link to="/shop" className="text-base text-neutral-400 hover:text-white">All Products</Link></li>
              <li><Link to="/shop" className="text-base text-neutral-400 hover:text-white">Electronics</Link></li>
              <li><Link to="/shop" className="text-base text-neutral-400 hover:text-white">Accessories</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-neutral-100 tracking-wider uppercase">About</h3>
            <ul className="mt-4 space-y-2">
              <li><Link to="/about" className="text-base text-neutral-400 hover:text-white">Our Story</Link></li>
              <li><Link to="/contact" className="text-base text-neutral-400 hover:text-white">Contact Us</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-neutral-100 tracking-wider uppercase">Support</h3>
            <ul className="mt-4 space-y-2">
              <li><Link to="#" className="text-base text-neutral-400 hover:text-white">FAQ</Link></li>
              <li><Link to="#" className="text-base text-neutral-400 hover:text-white">Terms of Service</Link></li>
              <li><Link to="#" className="text-base text-neutral-400 hover:text-white">Privacy Policy</Link></li>
            </ul>
          </div>
          <div className="col-span-2 md:col-span-1">
            <h3 className="text-sm font-semibold text-neutral-100 tracking-wider uppercase">Subscribe to our newsletter</h3>
            <p className="mt-4 text-base text-neutral-400">The latest news, articles, and resources, sent to your inbox weekly.</p>
            <form onSubmit={handleSubscribe} className="mt-4 sm:flex sm:max-w-md">
              <label htmlFor="email-address" className="sr-only">Email address</label>
              <input 
                type="email" 
                name="email-address" 
                id="email-address" 
                autoComplete="email" 
                required 
                className="appearance-none min-w-0 w-full bg-neutral-700 border border-transparent rounded-md py-2 px-4 text-base text-white placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-neutral-800 focus:ring-white focus:border-white focus:placeholder-neutral-400" 
                placeholder="Enter your email"
                value={emailInput}
                onChange={(e) => setEmailInput(e.target.value)}
              />
              <div className="mt-3 rounded-md sm:mt-0 sm:ml-3 sm:flex-shrink-0">
                <button type="submit" className="w-full bg-primary border border-transparent rounded-md py-2 px-4 flex items-center justify-center text-base font-medium text-white hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-neutral-800 focus:ring-primary">
                  Subscribe
                </button>
              </div>
            </form>
          </div>
        </div>
        <div className="mt-8 border-t border-neutral-700 pt-8 flex items-center justify-between">
          <p className="text-base text-neutral-400">&copy; {new Date().getFullYear()} ShopVerse. All rights reserved.</p>
          {/* Social Icons would go here */}
        </div>
      </div>

      {/* Subscription Success Modal */}
      <Modal isOpen={showSubscriptionSuccessModal} onClose={handleCloseModal}>
        <div className="p-8 text-center">
          <svg className="mx-auto h-12 w-12 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <h2 className="mt-4 text-2xl font-bold text-neutral-900">Thank you for subscribing!</h2>
          <p className="mt-2 text-neutral-600">You'll receive the latest news and updates directly to your inbox.</p>
          <div className="mt-6">
            <Button onClick={handleCloseModal}>Close</Button>
          </div>
        </div>
      </Modal>
    </footer>
  );
};

export default Footer;