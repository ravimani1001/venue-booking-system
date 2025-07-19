import React from "react";
import heroImage from "../assets/hero2.jpg"; // use a placeholder for now

const Hero = () => {
  return (
    // <section className="bg-white py-12 ">
    //   <div className="container mx-auto flex flex-col-reverse md:flex-row items-center gap-10">
    //     {/* Text Content */}
    //     <div className="flex-1 text-center md:text-left">
    //       <h1 className="text-4xl md:text-5xl font-bold text-darkText leading-tight mb-4">
    //         {/* Book Stunning Venues for Every Occasion */}
    //         Book <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-pink-400">Stunning Venues</span> for Every Occasion
    //       </h1>
    //       <p className="text-lg text-lightText mb-6">
    //         Discover the perfect venue for weddings, parties, and corporate events — all in one place.
    //       </p>
    //       <a
    //         href="#venues"
    //         className="inline-block bg-primary text-white px-6 py-3 rounded-lg text-lg hover:bg-accent transition"
    //       >
    //         Browse Venues
    //       </a>
    //     </div>

    //     {/* Image */}
    //     <div className="flex-1">
    //       <img
    //         src={heroImage}
    //         alt="Beautiful event venue"
    //         className="w-full rounded-xl shadow-lg hover:scale-105 transition-transform duration-500"
    //       />
    //     </div>
    //   </div>
    // </section>
    // <section
    //   className="relative h-[80vh] bg-cover bg-center"
    //   style={{ backgroundImage: `url(${heroImage})` }}
    // >
    //   <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-black/20" />
    //   <div className="relative z-10 text-white flex items-center justify-center h-full text-center px-4">
    //     <div>
    //       <h1 className="text-5xl font-bold mb-4">Book <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-pink-400">Stunning Venues</span> for Every Occasion</h1>
    //       <p className="text-lg mb-6">Discover the perfect venue for weddings, parties, and corporate events — all in one place.</p>
    //       <a href="#venues"
    //         className="inline-block bg-primary text-white px-6 py-3 rounded-lg text-lg hover:bg-accent transition">Browse Venues</a>
    //     </div>
    //   </div>
    // </section>

    <section
      className="relative h-screen bg-cover bg-center mx-auto"
      style={{ backgroundImage: `url(${heroImage})` }}
    >
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-black/70 to-black/30 z-10" />

      {/* Text Content */}
      <div className="relative z-20 h-full flex flex-col justify-center items-center text-center px-4">
        {/* <p className="bg-primary text-white text-sm px-4 py-1 rounded-full mb-4 shadow-lg">
          Trusted by 10,000+ Event Planners
        </p> */}
        <h1 className="text-white text-2xl md:text-6xl font-extrabold leading-tight mb-6 max-w-3xl">
          Book <span className="text-primary">Stunning Venues</span> for Every Occasion
        </h1>
        <p className="text-white text-sm md:text-xl mb-8 max-w-xl">
          Discover and book the perfect venue for weddings, parties, and business events — all in one place.
        </p>
        <a
          href="#venues"
          className="inline-flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-lg text-lg hover:bg-accent transition shadow-lg"
        >
          Browse Venues
          {/* <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
          </svg> */}
        </a>
      </div>
    </section>
  );
};

export default Hero;
