import React from 'react';
import { Link } from "react-router-dom";

const VenueCard = ({ name, location, image, vid }) => {
  return (
    <div className="bg-white rounded-xl overflow-hidden shadow hover:shadow-lg transition group">
      <div className="h-48 overflow-hidden">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>
      <div className="p-4">
        <h3 className="text-xl font-semibold text-darkText mb-1">{name}</h3>
        <p className="text-lightText text-sm mb-4">{location}</p>
        <Link to={`/venues/${vid}`} className="bg-primary text-white px-4 py-3 rounded hover:bg-accent transition text-sm">
          View Details
        </Link>
      </div>
    </div>
  );
};

export default VenueCard;
