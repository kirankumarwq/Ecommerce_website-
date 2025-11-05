import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../hooks/useAppContext';
import Button from '../components/Button';

const CheckoutPage: React.FC = () => {
  const { cart, getCartTotal, clearCart } = useAppContext();
  const navigate = useNavigate();
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');

  const subtotal = getCartTotal();
  const shipping = 50;
  const tax = subtotal * 0.18;
  const total = subtotal + shipping + tax;

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, you would process payment here
    clearCart();
    navigate('/order-success');
  };

  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value.replace(/\s+/g, '');
    const formatted = rawValue.replace(/\D/g, '')
        .replace(/(\d{4})/g, '$1 ')
        .trim();
    if (formatted.length <= 19) {
        setCardNumber(formatted);
    }
  };

  const handleExpiryDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      let value = e.target.value.replace(/\D/g, '');
      if (value.length > 4) {
          value = value.slice(0, 4);
      }
      if (value.length > 2) {
          value = value.slice(0, 2) + ' / ' + value.slice(2);
      }
      setExpiryDate(value);
  };
  
  if (cart.length === 0) {
      setTimeout(() => navigate('/shop'), 0);
      return null;
  }
  
  const inputStyles = "w-full p-3 bg-white border border-neutral-300 rounded-md text-neutral-900 placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent";

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold mb-8 text-center">Checkout</h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <form onSubmit={handlePlaceOrder} className="lg:col-span-2 space-y-8 bg-white p-8 rounded-lg shadow-md">
          {/* Shipping Information */}
          <div>
            <h2 className="text-xl font-semibold mb-4">Shipping Information</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input type="text" placeholder="First Name" required className={inputStyles} autoComplete="given-name" />
              <input type="text" placeholder="Last Name" required className={inputStyles} autoComplete="family-name" />
              <input type="email" placeholder="Email Address" required className={`${inputStyles} sm:col-span-2`} autoComplete="email" />
              <input type="text" placeholder="Address" required className={`${inputStyles} sm:col-span-2`} autoComplete="street-address" />
              <input type="text" placeholder="City" required className={inputStyles} autoComplete="address-level2" />
              <input type="text" placeholder="State / Province" required className={inputStyles} autoComplete="address-level1" />
              <input type="text" placeholder="Postal Code" required className={inputStyles} autoComplete="postal-code" />
              <input type="text" placeholder="Country" required className={inputStyles} autoComplete="country-name" />
            </div>
          </div>

          {/* Payment Details */}
          <div>
            <h2 className="text-xl font-semibold mb-4">Payment Details</h2>
            <div className="grid grid-cols-1 gap-4">
              <input
                type="text"
                placeholder="Card Number"
                required
                className={inputStyles}
                value={cardNumber}
                onChange={handleCardNumberChange}
                maxLength={19}
                inputMode="numeric"
                autoComplete="cc-number"
              />
              <input type="text" placeholder="Name on Card" required className={inputStyles} autoComplete="cc-name" />
              <div className="grid grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="MM / YY"
                  required
                  className={inputStyles}
                  value={expiryDate}
                  onChange={handleExpiryDateChange}
                  maxLength={7}
                  inputMode="numeric"
                  autoComplete="cc-exp"
                />
                <input type="text" placeholder="CVC" required className={inputStyles} maxLength={4} inputMode="numeric" autoComplete="cc-csc" />
              </div>
            </div>
          </div>
          
          <Button type="submit" className="w-full py-3 text-lg">Place Order</Button>
        </form>

        {/* Order Summary */}
        <div className="bg-white p-8 rounded-lg shadow-md h-fit">
          <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
          <div className="space-y-4">
            {cart.map(item => (
              <div key={item.id} className="flex justify-between items-start">
                  <div className="flex items-start gap-4">
                    <img src={item.image} alt={item.name} className="w-16 h-16 rounded-md object-cover" />
                    <div>
                        <p className="font-medium">{item.name}</p>
                        <p className="text-sm text-neutral-500">Qty: {item.quantity}</p>
                    </div>
                  </div>
                <p className="text-neutral-800">₹{(item.price * item.quantity).toLocaleString()}</p>
              </div>
            ))}
          </div>
          <div className="mt-6 pt-6 border-t space-y-2">
            <div className="flex justify-between"><p>Subtotal</p><p>₹{subtotal.toLocaleString()}</p></div>
            <div className="flex justify-between"><p>Shipping</p><p>₹{shipping.toLocaleString()}</p></div>
            <div className="flex justify-between"><p>Tax</p><p>₹{tax.toFixed(2)}</p></div>
            <div className="flex justify-between font-bold text-lg pt-2 mt-2 border-t"><p>Total</p><p>₹{total.toFixed(2)}</p></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;