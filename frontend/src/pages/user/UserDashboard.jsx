import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import Header from "../../components/Header";
import { useAuth } from "../../context/AuthContext";
import Footer from "../../components/Footer";
import mybg from '../../assets/hero.jpg';
import bgworld from '../../assets/bgworld.jpg';
import API from '../../services/api'

// Simulated upcoming bookings — will replace with real data later
const fakeBookings = [
  {
    id: 1,
    venueName: "Grand Palace Banquet Hall",
    location: "New Delhi",
    dates: ["2025-08-25", "2025-08-26"],
    coverImage: "https://plus.unsplash.com/premium_photo-1664530452329-42682d3a73a7?q=80&w=872&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",

  },
  {
    id: 2,
    venueName: "Sunset Garden",
    location: "Mumbai",
    dates: ["2025-09-10"],
    coverImage: "https://plus.unsplash.com/premium_photo-1664530452329-42682d3a73a7?q=80&w=872&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",

  },
  {
    id: 2,
    venueName: "Sunset Garden",
    location: "Mumbai",
    dates: ["2025-09-10"],
    coverImage: "https://plus.unsplash.com/premium_photo-1664530452329-42682d3a73a7?q=80&w=872&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",

  },
  {
    id: 2,
    venueName: "Sunset Garden",
    location: "Mumbai",
    dates: ["2025-09-10"],
    coverImage: "https://plus.unsplash.com/premium_photo-1664530452329-42682d3a73a7?q=80&w=872&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",

  },
];

// Helper: Format YYYY-MM-DD to readable date
const formatDate = (dateStr) =>
  new Date(dateStr).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

const UserDashboard = () => {
  const [today, setToday] = useState("");
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [cities, setCities] = useState(0);

  useEffect(() => {
    const now = new Date();
    setToday(
      now.toLocaleDateString("en-IN", {
        weekday: "short",
        day: "numeric",
        month: "short",
        year: "numeric",
      })
    );
  }, []);

  //Getting actual data using api call
  useEffect(() => {
    const fetchData = async () => {
      try {

        // Fetch user bookings
        const bookingsRes = await API.get('/bookings/me')
        setBookings(bookingsRes.data.bookings || []);
        const allCities = bookingsRes.data.bookings.map(b => b.venueId.location);
        const uniqueCities = new Set(allCities); // ensures uniqueness
        setCities(uniqueCities.size);

      } catch (err) {
        setError("Failed to load dashboard data.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);
  
  // Filter only future bookings
  const futureBookings = bookings.filter((booking) =>
    booking.dates.some((dateStr) => new Date(dateStr) > new Date())
  );

  const { user } = useAuth()
  const username = user.name[0].toUpperCase() + user.name.slice(1)
// max-w-6xl
  
  if(loading){
    return (
      <>
        <Header/>
        <p className="text-center py-10">Loading dashboard...</p>
      </>
    )
  }

  if(error){
    return (
      <>
        <Header/>
        <p className="text-center text-red-500 py-10">{error}</p>
      </>
    )
  }

  return (
    <>
    <Header/>
    <div className="  mx-auto space-y-10 ">
        <div className="relative space-y-10 w-full py-5 px-5 bg-cover bg-center bg-[url('/src/assets/cafeshop.webp')] " >
            <div className="absolute inset-0 bg-gradient-to-br from-black/70 to-black/30 z-10" />
      {/* Section 1: Greeting & Calendar Tile */}
      <div className="relative z-20 flex flex-col md:flex-row items-start md:items-center justify-center md:justify-between gap-6 p-6 rounded-2xl shadow-sm  ">
        {/* Calendar Tile */}
        <div className="bg-indigo-600 text-white rounded-xl p-4 w-full md:w-32 text-center shadow-md">
          <div className="text-2xl font-bold mb-1">📅</div>
          <div className="text-sm font-medium">{today}</div>
        </div>

        {/* Greeting */}
        <div className="text-center md:text-right">
          <h1 className="text-3xl md:text-6xl font-bold text-white">Welcome back, <span>{username}</span>!</h1>
          <p className="text-indigo-600 mt-1">Let’s get you booked for your next celebration!</p>
        </div>
      </div>

      {/* Section 2: Booking Summary Stats */}
      <div className="relative z-20 grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="backdrop-brightness-100 backdrop-blur-sm shadow-sm  rounded-xl p-4 text-center">
          <div className="text-indigo-600 text-3xl mb-2">📆</div>
          <h2 className="text-xl font-semibold text-white">{bookings.length}</h2>
          <p className="text-white text-sm">Total Bookings</p>
        </div>
        <div className="backdrop-brightness-100 backdrop-blur-sm shadow-sm rounded-xl p-4 text-center">
          <div className="text-green-500 text-3xl mb-2">🏠</div>
          <h2 className="text-xl font-semibold text-white">{futureBookings.length}</h2>
          <p className="text-white text-sm">Upcoming Events</p>
        </div>
        <div className="backdrop-brightness-100 backdrop-blur-sm shadow-sm rounded-xl p-4 text-center">
          <div className="text-yellow-500 text-3xl mb-2">📍</div>
          <h2 className="text-xl font-semibold text-white">{cities}</h2>
          <p className="text-white text-sm">Cities Booked</p>
        </div>
      </div>
      

      </div>



        {/* Section 3: Upcoming Bookings */}
<div className="p-6">
  <h2 className="text-xl font-semibold mb-4 text-center">Upcoming Bookings</h2>

  {futureBookings.length === 0 ? (
    <p className="text-gray-500 italic">No upcoming bookings yet.</p>
  ) : (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {futureBookings.map((booking) => (
        <div
          key={booking.id}
          className="bg-white rounded-2xl shadow-md border overflow-hidden transition hover:shadow-lg"
        >
          {/* Venue Image */}
          <img
            src={booking.venueId.images[1].url || mybg}
            alt={booking.venueId.name}
            className="w-full h-40 object-cover"
          />

          {/* Details */}
          <div className="p-4">
            <h3 className="text-lg font-bold text-indigo-700">
              {booking.venueId.name}
            </h3>
            <p className="text-sm text-gray-500">{booking.venueId.location}</p>

            <div className="mt-3">
              <p className="text-sm font-medium mb-1 text-gray-700">
                📅 Booked Dates:
              </p>
              <ul className="text-sm text-gray-600 space-y-1">
                {booking.dates.map((dateStr, idx) => (
                  <li key={idx}>• {formatDate(dateStr)}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      ))}
    </div>
  )}
</div>


      {/* Section 4: CTA */}
      <div className="text-center  mt-6">
        <Link
          to="/venues"
          className="inline-flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white font-semibold rounded-xl shadow hover:bg-indigo-700 transition"
        >
          🔎 Browse New Venues
        </Link>
        <Link
          to="/my-bookings"
          className="ml-5 mt-2 inline-flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white font-semibold rounded-xl shadow hover:bg-indigo-700 transition"
        >
          📜 Go to Bookings
        </Link>
      </div>
    </div>
    <Footer/>
    </>
  );
};

export default UserDashboard;
