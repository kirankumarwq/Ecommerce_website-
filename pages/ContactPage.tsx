import React from 'react';
import Button from '../components/Button';

const ContactPage: React.FC = () => {
  const inputStyles = "block w-full shadow-sm py-3 px-4 bg-white border border-neutral-300 rounded-md text-neutral-900 placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent";

  return (
    <div className="bg-white py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-lg mx-auto md:max-w-none md:grid md:grid-cols-2 md:gap-8">
        <div>
          <h2 className="text-2xl font-extrabold text-neutral-900 sm:text-3xl">Get in touch</h2>
          <div className="mt-3">
            <p className="text-lg text-neutral-500">
              Have a question or a comment? Use the form to send us a message or contact us by mail.
            </p>
          </div>
          <div className="mt-9">
            <div className="mt-6 text-neutral-500 space-y-4">
              <p>123 Commerce St.<br />Business City, 12345</p>
              <p>+1 (555) 123-4567</p>
              <p>support@shopverse.com</p>
            </div>
          </div>
        </div>
        <div className="mt-12 sm:mt-16 md:mt-0">
          <form action="#" method="POST" className="grid grid-cols-1 gap-y-6">
            <div>
              <label htmlFor="full-name" className="sr-only">Full name</label>
              <input type="text" name="full-name" id="full-name" autoComplete="name" className={inputStyles} placeholder="Full name" />
            </div>
            <div>
              <label htmlFor="email" className="sr-only">Email</label>
              <input id="email" name="email" type="email" autoComplete="email" className={inputStyles} placeholder="Email" />
            </div>
            <div>
              <label htmlFor="phone" className="sr-only">Phone</label>
              <input type="text" name="phone" id="phone" autoComplete="tel" className={inputStyles} placeholder="Phone" />
            </div>
            <div>
              <label htmlFor="message" className="sr-only">Message</label>
              <textarea id="message" name="message" rows={4} className={inputStyles} placeholder="Message"></textarea>
            </div>
            <div>
              <Button type="submit" className="w-full justify-center py-3 px-6">Submit</Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;