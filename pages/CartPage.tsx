import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAppContext } from '../hooks/useAppContext';
import { ICONS } from '../constants';
import Button from '../components/Button';

const CartPage: React.FC = () => {
  const { cart, removeFromCart, updateCartQuantity, getCartTotal } = useAppContext();
  const navigate = useNavigate();

  const handleCheckout = () => {
    navigate('/checkout');
  };

  const subtotal = getCartTotal();
  const shipping = 50; // Dummy value
  const tax = subtotal * 0.18; // Dummy 18% tax
  const total = subtotal + shipping + tax;

  if (cart.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
        <h1 className="text-3xl font-bold">Your Cart is Empty</h1>
        <p className="mt-4 text-neutral-600">Looks like you haven't added anything to your cart yet.</p>
        <div className="mt-6">
            <Link to="/shop">
                <Button>Continue Shopping</Button>
            </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold mb-8">Your Cart</h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white p-6 rounded-lg shadow-md">
          <ul role="list" className="divide-y divide-neutral-200">
            {cart.map(item => (
              <li key={item.id} className="flex py-6">
                <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-neutral-200">
                  <img src={item.image} alt={item.name} className="h-full w-full object-cover object-center" />
                </div>
                <div className="ml-4 flex flex-1 flex-col">
                  <div>
                    <div className="flex justify-between text-base font-medium text-neutral-900">
                      <h3><Link to={`/product/${item.id}`}>{item.name}</Link></h3>
                      <p className="ml-4">₹{(item.price * item.quantity).toLocaleString()}</p>
                    </div>
                  </div>
                  <div className="flex flex-1 items-end justify-between text-sm">
                    <div className="flex items-center border rounded">
                      <button onClick={() => updateCartQuantity(item.id, item.quantity - 1)} className="px-2 py-1">-</button>
                      <span className="px-3">{item.quantity}</span>
                      <button onClick={() => updateCartQuantity(item.id, item.quantity + 1)} className="px-2 py-1">+</button>
                    </div>
                    <div className="flex">
                      <button onClick={() => removeFromCart(item.id)} type="button" className="font-medium text-primary hover:text-primary-700 flex items-center gap-1">
                        {ICONS.trash} Remove
                      </button>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Order summary */}
        <div className="bg-white p-6 rounded-lg shadow-md h-fit">
          <h2 className="text-lg font-medium text-neutral-900">Order summary</h2>
          <div className="mt-6 space-y-4">
            <div className="flex items-center justify-between">
              <p className="text-sm text-neutral-600">Subtotal</p>
              <p className="text-sm font-medium text-neutral-900">₹{subtotal.toLocaleString()}</p>
            </div>
            <div className="flex items-center justify-between">
              <p className="text-sm text-neutral-600">Shipping estimate</p>
              <p className="text-sm font-medium text-neutral-900">₹{shipping.toLocaleString()}</p>
            </div>
            <div className="flex items-center justify-between">
              <p className="text-sm text-neutral-600">Tax estimate</p>
              <p className="text-sm font-medium text-neutral-900">₹{tax.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
            </div>
            <div className="flex items-center justify-between border-t border-neutral-200 pt-4">
              <p className="text-base font-medium text-neutral-900">Order total</p>
              <p className="text-base font-medium text-neutral-900">₹{total.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
            </div>
          </div>
          <div className="mt-6">
            <Button onClick={handleCheckout} className="w-full">Checkout</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;