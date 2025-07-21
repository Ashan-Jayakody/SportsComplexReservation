import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import sport1 from "../../assets/sport1.jpg";
import sport2 from "../../assets/sport2.jpg";
import sport3 from "../../assets/sport3.jpg";
import sport6 from "../../assets/sport6.jpg";
import sport5 from "../../assets/sport5.jpg";



{
  /*images that changes in the slide show */
}
const images = [sport1, sport2, sport3, sport6, sport5];

export default function Hero() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 5000); //this change image every 3 s
    return () => clearInterval(interval);
  }, []);

  //handling the navigation of the Booking button
  const handleBookClick = () => {
    const token = localStorage.getItem("token");

    if (token){ //user logged in
        navigate("/booking");

    }else{  //not logged in
        navigate("/login");
    }
};


  return (
    <section
      className="relative w-full h-[650px] bg-cover bg -center transition-all duration-1000 ease-in-out"
      style={{
        backgroundImage: `url(${images[currentIndex]})`,
      }}
    >
      <div className="absolute insert-0 bg-black bg-opacity-80"></div>
      <div className="relative z-10 h-full flex flex-col justify-center items-center text-white px-6 bg-black/40">
        <h1 className="text-4xl md:text-6xl font-bold mb-4 drop-shadow-xl">
          Play. Train. Compete.
        </h1>
        <p className="text-lg mb-6 drop-shadow-xl">
          Book your favourite sports facilities and join the action today.
        </p>
        <div className="flex gap-4">
          <button
            onClick={handleBookClick}
            className="inline-block bg-red-700 hover:bg-red-800 text-white px-6 py-3 rounded-md text-lg font-bold transition"
          >
            Book Now
          </button>

          <Link
            to="/membershipReg"
            className="inline-block bg-red-700 hover:bg-red-800 text-white px-6 py-3 rounded-md text-lg font-bold transition"
          >
            Membership
          </Link>
        </div>
      </div>

      {/*floating infomation cards */}
      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2  translate-y-1/2 z-30 flex flex-col md:flex-row gap-4">
        <div className="bg-zinc-900 text-white p-4 rounded-xl shadow-lg w72 backdrop-blur-sm border border-red-700">
          <h3 className="font-semibold text-lg mb-1">⚽Book Courts</h3>
          <p className="text-sm">
            Reserve indoor and outdoor arenas in seconds.
          </p>
        </div>
        <div className="bg-zinc-900 text-white p-4 rounded-xl shadow-lg w72 backdrop-blur-sm border border-red-700">
          <h3 className="font-semibold text-lg mb-1">📅Manage Bookings</h3>
          <p className="text-sm">Track and update your reservations easily.</p>
        </div>
        <div className="bg-zinc-900 text-white p-4 rounded-xl shadow-lg w72 backdrop-blur-sm border border-red-700">
          <h3 className="font-semibold text-lg mb-1">💳Easy payments</h3>
          <p className="text-sm">
            Pay securely and instantly confirm your slots.
          </p>
        </div>
      </div>
    </section>
  );
}
