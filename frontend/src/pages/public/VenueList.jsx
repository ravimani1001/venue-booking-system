import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import venueListBg from "../../assets/hero.jpg"
import hero from "../../assets/hero.jpg"
import Header from '../../components/Header.jsx'
import Footer from '../../components/Footer.jsx'
import API from '../../services/api.js'

const dummyVenues = [
  {
    id: 1,
    name: "Grand Palace",
    location: "New Delhi",
    price: 45000,
    image: "https://source.unsplash.com/800x600/?wedding-hall",
  },
  {
    id: 2,
    name: "Sunset Gardens",
    location: "Mumbai",
    price: 30000,
    image: "https://source.unsplash.com/800x600/?garden,venue",
  },
  {
    id: 3,
    name: "Royal Banquet",
    location: "Bangalore",
    price: 50000,
    image: "https://source.unsplash.com/800x600/?banquet",
  },
];

export default function VenuesPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({
    location: "",
    price: "",
    capacity: "",
    name: "",
  });

  const [venues, setVenues] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error , setError] = useState("");

  useEffect(() => {
    const getVenues = async () => {
      try {
        setLoading(true)
        const res = await API.get('/venues')
        setVenues(res.data.venues);
      } catch (error) {
        setError("Error : ", error.message);
      }
      finally{
        setLoading(false)
      }
    }

    getVenues();
  }, [])
  

  const applyFilters = async () => {
    setLoading(true);
    try {
      const res = await API.get("/venues", {
        params: {
          location: filters.location,
          price: filters.price,
          capacity: filters.capacity,
          name : filters.name,
        },
        // withCredentials: true, // only if needed
      });

      setVenues(res.data.venues); // assuming backend returns { venues: [...] }
    } catch (err) {
      console.error("Error fetching filtered venues", err);
      setError("Error :", err.message || err)
    } finally {
      setLoading(false);
    }
  };

  const removeFilters = async () => {
    setLoading(true);
    try {
      let n = filters.name;
      setFilters({
        location: "",
        price: "",
        capacity: "",
        name : n
        
      })

      let res;
      if(filters.name === "")
      res = await API.get("/venues");
      else
      res = await API.get("/venues" , {
        params : {
          name : filters.name
        }
      });

      setVenues(res.data.venues); // assuming backend returns { venues: [...] }
    } catch (err) {
      console.error("Error fetching filtered venues", err);
      setError("Error :", err.message || err)
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
    <Header />
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative h-[400px] w-full">
        <img
          // src="https://source.unsplash.com/1600x900/?event,venue"
          src={venueListBg}
          alt="Hero"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col items-center justify-center text-white text-center px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-8">
            Find Your Perfect Venue
          </h1>
          <div className="w-full max-w-lg bg-white flex rounded-full">
          <input
            type="text"
            placeholder="Search by venue name"
            className="w-full max-w-lg px-8 py-4 rounded-full text-black outline-none"
            value={filters.name}
            onChange={(e) =>
              setFilters((prev) => ({ ...prev, name: e.target.value }))
            }
          />
          <button onClick={applyFilters} className="text-black rounded-full hover:shadow-lg outline-none px-4">
            🔍
          </button>
          </div>
        </div>
      </div>

      {/* Filters Section */}
      <div className="max-w-6xl mx-auto px-4 mt-8 grid sm:grid-cols-4 gap-4">
        <input
          type="text"
          placeholder="Location (e.g. Delhi)"
          className="p-3 rounded-lg border border-gray-300 shadow-lg"
          value={filters.location}
          onChange={(e) =>
            setFilters((prev) => ({ ...prev, location: e.target.value }))
          }
        />
        <input
          type="number"
          placeholder="Max Price"
          className="p-3 rounded-lg border border-gray-300 shadow-lg"
          value={filters.price}
          onChange={(e) =>
            setFilters((prev) => ({ ...prev, price: e.target.value }))
          }
        />
        <input
          type="number"
          placeholder="Min Capacity"
          className="p-3 rounded-lg border border-gray-300 shadow-lg"
          value={filters.capacity}
          onChange={(e) =>
            setFilters((prev) => ({ ...prev, capacity: e.target.value }))
          }
        />
        <div className="grid grid-cols-2 gap-2">
            <button
            onClick={applyFilters}
            className="p-3 rounded-lg bg-indigo-600 text-white text-sm hover:bg-indigo-700 transition"
          >
            Apply Filters
          </button>

          <button
            onClick={removeFilters}
            className="p-3 rounded-lg bg-indigo-600 text-white text-sm hover:bg-indigo-700 transition"
          >
            Remove Filters
          </button>
        </div>
        </div>

      {/* Venues Grid */}
      <div className="max-w-6xl mx-auto px-4 mt-10 mb-16">
        <div>
          {
            loading ? <p>Loading Venues</p> : error!=="" ? <p className="text-red-600">Error : {error}</p> : <></>
          }
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {venues.length == 0 && !loading ? <p>No Venue Found</p> : venues.map((venue) => (
            <div
              key={venue._id}
              className="bg-white rounded-xl shadow-md overflow-hidden transition hover:shadow-lg border"
            >
              <img
                src={venue.images[0].url}
                alt={venue.name}
                className="h-48 w-full object-cover"
              />
              <div className="p-4">
                <h2 className="text-lg font-bold text-indigo-700">
                  {venue.name}
                </h2>
                <p className="text-sm text-gray-500">{venue.location}</p>
                <p className="text-sm mt-1 text-gray-600">
                  Starting at ₹{venue.price.toLocaleString()}
                </p>
                <Link
                  to={`/venues/${venue.id}`}
                  className="inline-block mt-4 px-4 py-2 bg-indigo-600 text-white text-sm rounded-md hover:bg-indigo-700 transition"
                >
                  View Details
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      {/* <footer className="bg-gray-800 text-white py-6 text-center text-sm">
        &copy; {new Date().getFullYear()} VenueBooking. All rights reserved.
      </footer> */}
    </div>
    <Footer />
    </>
  );
}
