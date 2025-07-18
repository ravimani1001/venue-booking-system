import React from 'react';
import VenueCard from './VenueCard';
import hero from '../assets/hero.jpg'

// Placeholder images from Unsplash
const venues = [
  {
    name: 'Grand Royal Banquet',
    location: 'Delhi, India',
    image: hero,
  },
  {
    name: 'The Vintage Courtyard',
    location: 'Jaipur, Rajasthan',
    image: hero,
  },
  {
    name: 'Skyline Rooftop',
    location: 'Mumbai, Maharashtra',
    image: hero,
  },
  {
    name: 'Palm Tree Resort',
    location: 'Goa, India',
    image: hero,
  },
  {
    name: 'Heritage Palace Venue',
    location: 'Udaipur, Rajasthan',
    image: hero,
  },
  {
    name: 'Modern Art Convention Hall',
    location: 'Bangalore, Karnataka',
    image: hero,
  },
];

const ExploreVenues = () => {
  return (
    <section className="py-16 bg-secondary">
      <div className="container">
        <h2 className="text-3xl md:text-4xl font-bold text-darkText text-center mb-10">
          Explore Popular Venues
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {venues.map((venue, index) => (
            <VenueCard
              key={index}
              name={venue.name}
              location={venue.location}
              image={venue.image}
            />
          ))}
        </div>

        <div className="text-center mt-10">
          <a
            href="#venues"
            className="inline-block bg-primary text-white px-6 py-3 rounded-lg text-lg hover:bg-accent transition shadow"
          >
            View All Venues
          </a>
        </div>
      </div>
    </section>
  );
};

export default ExploreVenues;
