
import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../components/Button';

const OrderSuccessPage: React.FC = () => {
  const orderId = Math.random().toString(36).substr(2, 9).toUpperCase();

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
      <svg className="mx-auto h-12 w-12 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
      <h1 className="mt-4 text-3xl font-extrabold text-neutral-900">Thank you for your order!</h1>
      <p className="mt-2 text-base text-neutral-600">Your order has been placed successfully.</p>
      <div className="mt-6 bg-neutral-100 p-4 rounded-lg">
        <p className="text-sm text-neutral-600">Your Order ID is:</p>
        <p className="text-lg font-mono font-semibold text-primary">{orderId}</p>
      </div>
      <p className="mt-4 text-sm text-neutral-500">You will receive an email confirmation shortly.</p>
      <div className="mt-8">
        <Link to="/shop">
          <Button>Continue Shopping</Button>
        </Link>
      </div>
    </div>
  );
};

export default OrderSuccessPage;
