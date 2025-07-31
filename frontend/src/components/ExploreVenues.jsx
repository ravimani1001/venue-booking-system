import React, { useEffect, useState } from 'react';
import VenueCard from './VenueCard';
import hero from '../assets/hero.jpg'
import API from '../services/api.js';
import { Link } from 'react-router-dom';

// Placeholder images from Unsplash
// const venues = [
//   {
//     name: 'Grand Royal Banquet',
//     location: 'Delhi, India',
//     image: hero,
//   },
//   {
//     name: 'The Vintage Courtyard',
//     location: 'Jaipur, Rajasthan',
//     image: hero,
//   },
//   {
//     name: 'Skyline Rooftop',
//     location: 'Mumbai, Maharashtra',
//     image: hero,
//   },
//   {
//     name: 'Palm Tree Resort',
//     location: 'Goa, India',
//     image: hero,
//   },
//   {
//     name: 'Heritage Palace Venue',
//     location: 'Udaipur, Rajasthan',
//     image: hero,
//   },
//   {
//     name: 'Modern Art Convention Hall',
//     location: 'Bangalore, Karnataka',
//     image: hero,
//   },
// ];

const ExploreVenues = () => {
  const [venues , setVenues] = useState([]);
  const [loading , setLoading] = useState(false)
  const [error , setError] = useState("")

  useEffect(() => {
    const venuesAtHomePage = async () =>{
      try {
        setLoading(true);
        const res = await API.get('/venues')
        setVenues(res.data.venues);
      } catch (error) {
        setError(error)
      }
      finally{
        setLoading(false)
      }
    }
    venuesAtHomePage()
  }, [])
  
  

  return (
    <section className="py-16 bg-secondary">
      <div className="container">
        <h2 className="text-3xl md:text-4xl font-bold text-darkText text-center mb-10">
          Explore Popular Venues
        </h2>

        {
          loading ? <p>Loading Venues...</p> : error!=="" ? <p>Error : {error}</p> :  
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {
            venues.length > 0 && loading==false ?
            venues.map((venue, index) => {
              if(index<6)
              return(  
              <VenueCard
                key={index}
                name={venue.name}
                location={venue.location}
                image={venue.images[0].url}
                vid = {venue._id}
              />)
            }) :
            <p>No Venues Found</p>
          }
          </div>
        }

        <div className="text-center mt-10">
          <Link
            to="/venues"
            className="inline-block bg-primary text-white px-6 py-3 rounded-lg text-lg hover:bg-accent transition shadow"
          >
            View All Venues
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ExploreVenues;
