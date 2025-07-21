import react from "react";
import Hero from "../../components/user/hero";

export default function Home() {
  return (
    <div>
      <Hero />
      <div className="flex bg-white shadow-md  overflow-hidden ml-24 mr-24 mt-32  mb-32 p-2 rounded-xl">
        {/* Left color bar */}
        <div className="w-3 bg-red-700 "></div>

        {/* Content */}
        <div className="p-8 mx-2  bg-zinc-900 text-white">
          <h2 className="text-2xl font-bold mb-2">
            Welcome to Champion’s Court Complex – Where Every Player Becomes a
            Champion!
          </h2>
          <p className="t text-md ">
            Step into a world of energy, passion, and top-tier facilities
            designed for athletes of all levels. Whether you're here to train,
            compete, or simply enjoy the game, Champion’s Court offers
            state-of-the-art courts, modern amenities, and a vibrant sporting
            community. Join us and experience the perfect blend of
            professionalism, excitement, and sportsmanship – your journey to
            greatness starts here!
          </p>
        </div>
      </div>

      <div className=" flex flex-col mx-auto bg-black items-center  ">
        <div className="bg-gradient-to-br from-black via-red-700 to-black text-white rounded-xl mb-20 mt-20 p-5 w-1/3 shadow-lg transform hover:scale-105 transition-all duration-300 text-white max-w-xl mx-auto">
          <h2 className="font-semibold text-lg text-center">Indoor Games</h2>
          <p className="mt-4 text-center ">
            Enjoy a variety of indoor games designed for fun and focus. Perfect
            for all ages, rain or shine — including badminton, table tennis,
            chess, and more.
          </p>
          <button className="bg-red-600 hover:bg-zinc-900 transition text-white font-semibold px-4 py-2 rounded mx-auto block my-4">
            More
          </button>
        </div>
        <div className="bg-gradient-to-br from-black via-red-700 to-black text-white rounded-xl mb-20 p-5 w-1/3 shadow-lg transform hover:scale-105 transition-all duration-300 text-white max-w-xl mx-auto">
          <h2 className="font-semibold text-lg text-center">Outdoor Games</h2>
          <p className="mt-4 text-center ">
            Experience the thrill of outdoor sports in open-air courts and
            fields. From cricket to basketball, stay active and energized under
            the sun.
          </p>
          <button className="bg-red-600 hover:bg-zinc-900 transition text-white font-semibold px-4 py-2 rounded mx-auto block my-4">
            More
          </button>
        </div>
        <div className="bg-gradient-to-br from-black via-red-700 to-black text-white rounded-xl mb-20 p-5 w-1/3 shadow-lg transform hover:scale-105 transition-all duration-300 text-white max-w-xl mx-auto ">
          <h2 className="font-semibold text-lg text-center">Aquatic Games</h2>
          <p className="mt-4 text-center ">
            Dive into excitement with aquatic sports like swimming, water polo,
            and aqua aerobics. A refreshing way to stay fit and have fun.
          </p>
          <button className="bg-red-600 hover:bg-zinc-900 transition text-white font-semibold px-4 py-2 rounded mx-auto block my-4 ">
            More
          </button>
        </div>

      </div>

      
    </div>
  );
}
