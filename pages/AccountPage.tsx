import React, { useState } from 'react';
import Button from '../components/Button';

// Define consistent input styles for the auth forms
const authInputStyles = "w-full p-3 bg-white border border-neutral-300 rounded-md text-neutral-900 placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent";

const LoginForm: React.FC = () => (
    <form className="space-y-4">
        <input type="email" placeholder="Email Address" required className={authInputStyles} />
        <input type="password" placeholder="Password" required className={authInputStyles} />
        <Button type="submit" className="w-full py-3">Login</Button>
    </form>
);

const SignupForm: React.FC = () => (
    <form className="space-y-4">
        <input type="text" placeholder="Full Name" required className={authInputStyles} />
        <input type="email" placeholder="Email Address" required className={authInputStyles} />
        <input type="password" placeholder="Password" required className={authInputStyles} />
        <Button type="submit" className="w-full py-3">Create Account</Button>
    </form>
);

const AccountPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'login' | 'signup'>('login');

  return (
    <div className="flex items-center justify-center min-h-[60vh] bg-white py-12">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-lg">
        <div>
          <h2 className="text-center text-3xl font-extrabold text-neutral-900">
            {activeTab === 'login' ? 'Sign in to your account' : 'Create a new account'}
          </h2>
        </div>
        <div className="flex border-b">
          <button 
            onClick={() => setActiveTab('login')}
            className={`flex-1 py-2 text-center font-medium ${activeTab === 'login' ? 'border-b-2 border-primary text-primary' : 'text-neutral-500'}`}
          >
            Login
          </button>
          <button
            onClick={() => setActiveTab('signup')}
            className={`flex-1 py-2 text-center font-medium ${activeTab === 'signup' ? 'border-b-2 border-primary text-primary' : 'text-neutral-500'}`}
          >
            Sign Up
          </button>
        </div>
        <div>
          {activeTab === 'login' ? <LoginForm /> : <SignupForm />}
        </div>
      </div>
    </div>
  );
};

export default AccountPage;