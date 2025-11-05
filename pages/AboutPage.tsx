
import React from 'react';

const AboutPage: React.FC = () => {
  return (
    <div className="bg-white">
      <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:py-24 lg:px-8">
        <div className="text-center">
          <h2 className="text-base font-semibold text-primary tracking-wide uppercase">About Us</h2>
          <p className="mt-1 text-4xl font-extrabold text-neutral-900 sm:text-5xl sm:tracking-tight lg:text-6xl">
            Our Mission is to Curate Quality.
          </p>
          <p className="max-w-xl mt-5 mx-auto text-xl text-neutral-500">
            At ShopVerse, we believe in the power of great products to enhance everyday life. We meticulously select each item in our collection to ensure it meets our high standards of quality, design, and functionality.
          </p>
        </div>
        <div className="mt-20">
            <div className="lg:grid lg:grid-cols-2 lg:gap-8 lg:items-center">
                <div>
                    <h3 className="text-2xl font-extrabold text-neutral-900 sm:text-3xl">
                        Our Story
                    </h3>
                    <p className="mt-3 max-w-3xl text-lg text-neutral-500">
                        Founded in 2023, ShopVerse started as a small passion project to bring hard-to-find, high-quality tech and accessories to a wider audience. We saw a gap in the market for a retailer that not only sells products but also tells the story behind them, focusing on craftsmanship and innovation.
                    </p>
                    <p className="mt-4 text-lg text-neutral-500">
                        Today, we've grown into a trusted destination for consumers who value quality and design. Our commitment remains the same: to offer an exceptional selection of products backed by outstanding customer service.
                    </p>
                </div>
                <div className="mt-8 grid grid-cols-2 gap-4 sm:gap-6 lg:mt-0">
                    <div className="pt-6">
                        <img className="rounded-lg shadow-xl" src="https://picsum.photos/seed/about1/500/500" alt="Team member" />
                    </div>
                    <div className="pt-6">
                        <img className="rounded-lg shadow-xl" src="https://picsum.photos/seed/about2/500/500" alt="Office" />
                    </div>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
