import React from 'react';

const steps = [
  {
    title: 'Browse Venues',
    description:
      'Explore hundreds of stunning venues with rich images, pricing, and amenities. Use filters to narrow down your perfect match.',
  },
  {
    title: 'Check Availability',
    description:
      'Pick your desired date and instantly see if the venue is available. Avoid conflicts and secure your ideal slot in seconds.',
  },
  {
    title: 'Book Instantly',
    description:
      'Complete your booking with one click. Get instant confirmation and be ready for your event — stress-free!',
  },
];

const HowItWorks = () => {
  return (
    <section className="bg-white py-16">
      <div className="container">
        <h2 className="text-3xl md:text-4xl font-bold text-darkText text-center mb-12">
          How It Works
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <div
              key={index}
              className="bg-secondary rounded-xl p-6 shadow-sm hover:shadow-md hover:translate-y-[-4px] transition-all duration-300 text-center"
            >
              <div className="text-primary text-5xl font-bold mb-4">
                {index + 1 < 10 ? `0${index + 1}` : index + 1}
              </div>
              <h3 className="text-xl font-semibold mb-2 text-darkText">
                {step.title}
              </h3>
              <p className="text-lightText text-sm">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
