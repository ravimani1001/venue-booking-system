// src/pages/user/VenueDetails.jsx

import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import API from '../../services/api';
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import Slider from "react-slick";

export default function VenueDetails() {
  const { id } = useParams();
  const [venue, setVenue] = useState(null);
  const [bookedDates, setBookedDates] = useState([]);
  const [selectedDates, setSelectedDates] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch venue details and future booked dates
  useEffect(() => {
    const fetchVenueDetails = async () => {
      try {
        const venueRes = await API.get(`/venues/${id}`);
        setVenue(venueRes.data.venue);

        const bookedRes = await API.get(`/venue/${id}/future-dates`);
        const dates = bookedRes.data.futureDates.map((d) => new Date(d));
        setBookedDates(dates);
      } catch (err) {
        console.error("Failed to load venue details", err);
      } finally {
        setLoading(false);
      }
    };

    fetchVenueDetails();
  }, [id]);

  const isDateSelected = (date) =>
    selectedDates.some((d) => d.toDateString() === date.toDateString());

  const toggleDate = (date) => {
    if (isDateSelected(date)) {
      setSelectedDates((prev) =>
        prev.filter((d) => d.toDateString() !== date.toDateString())
      );
    } else {
      setSelectedDates((prev) => [...prev, date]);
    }
  };

  if (loading) return <> <Header /><p className="text-center py-10">Loading...</p><Footer /></>;
  if (!venue) return <> <Header /><p className="text-center text-red-500">Venue not found.</p><Footer /></>;
//   if (!venue) return <p className="text-center text-red-500">Venue not found.</p>;

  return (
    <>
        <Header />
            <div className="max-w-6xl mx-auto px-4 py-5">
            {/* Venue Images */}
            {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                {venue.images?.map((img, idx) => (
                <img
                    key={idx}
                    src={img.url}
                    alt={`Venue ${idx + 1}`}
                    className="w-full h-64 object-cover rounded-lg"
                />
                ))}
            </div> */}
            <Slider
                dots={true}
                infinite={true}
                speed={3200}
                // fade={true}
                cssEase="ease-in-out"
                slidesToShow={1}
                slidesToScroll={1}
                autoplay={true}
                autoplaySpeed={2000}
                className="mb-10"
                >
                {venue.images?.map((img, idx) => (
                    <div key={idx} className="py-5 border-none outline-none w-full">
                    <img
                        src={img.url}
                        alt={`Venue ${idx + 1}`}
                        className="mx-auto h-[400px] object-cover rounded-lg hover:scale-105 hover:shadow-lg hover:shadow-gray-700 transition duration-300"
                    />
                    </div>
                ))}
            </Slider>


            {/* Venue Info */}
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-indigo-700 mb-2">{venue.name}</h1>
                <p className="text-gray-600 mb-1">📍 {venue.location}</p>
                <p className="text-gray-600 mb-1">👥 Capacity: {venue.capacity}</p>
                <p className="text-gray-600 mb-1">💰 ₹{venue.price.toLocaleString()} / day</p>
                <p className="text-gray-700 mt-4">{venue.description}</p>
            </div>

            {/* Booking Section */}
            <div className="bg-white border rounded-lg shadow-md p-6">
                <h2 className="text-xl font-semibold mb-4">Select Your Booking Dates</h2>

                <DatePicker
                selected={null}
                onChange={toggleDate}
                inline
                minDate={new Date()}
                highlightDates={selectedDates}
                excludeDates={bookedDates}
                dayClassName={(date) => {
                    const isSelected = isDateSelected(date);
                    const isBooked = bookedDates.some(
                    (d) => d.toDateString() === date.toDateString()
                    );
                    if (isSelected) return "bg-indigo-600 text-white";
                    if (isBooked) return "bg-red-500 text-white cursor-not-allowed";
                    return "";
                }}
                />

                {/* Selected Dates */}
                {selectedDates.length > 0 && (
                <div className="mt-4 text-sm text-gray-700">
                    <strong>Selected Dates:</strong>{" "}
                    {selectedDates
                    .map((d) =>
                        d.toLocaleDateString("en-IN", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                        })
                    )
                    .join(" , ")}
                </div>
                )}

                {/* Already Booked Dates */}
                {bookedDates.length > 0 && (
                <div className="mt-4 text-sm text-red-600">
                    <strong>Booked Dates:</strong>{" "}
                    {bookedDates
                    .map((d) =>
                        d.toLocaleDateString("en-IN", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                        })
                    )
                    .join(" , ")}
                </div>
                )}
            </div>
            <div>
                {/* Book Button */}
                <button
                className="mt-6 bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-md transition"
                disabled={selectedDates.length === 0}
                onClick={() => {
                    // In next phase: payment + booking call
                    console.log("Proceed to payment for dates:", selectedDates);
                }}
                >
                Proceed to Payment
                </button>
            </div>
            </div>
        <Footer />
    </>
  );
}
