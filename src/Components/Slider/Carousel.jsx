import { useEffect, useState } from "react";
import { GrPrevious, GrNext } from "react-icons/gr";
import s1 from "../../assets/slider/athlet.jpg";
import s2 from "../../assets/slider/basketball.jpg";
import s3 from "../../assets/slider/bollyball.jpg";
import s4 from "../../assets/slider/football.jpg";
import s5 from "../../assets/slider/spring.jpg";
import s6 from "../../assets/slider/tannis.jpg";

const Carousel = () => {
  const photos = [
    { image: s1, text: "The Thrill of Sprinting" },
    { image: s2, text: "The Power of Volleyball" },
    { image: s3, text: "The Intensity of Handball" },
    { image: s4, text: "The Beautiful Game of Football" },
    { image: s5, text: "Dive into Greatness: The Aquatic World of Swimming" },
    { image: s6, text: "Courtside Brilliance: Mastering the Art of Tennis" },
  ];

  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (!isHovered) {
      const interval = setInterval(() => {
        setCurrentPhotoIndex((prevIndex) => (prevIndex + 1) % photos.length);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [isHovered, photos.length]);

  const goToPrevSlide = () => {
    setCurrentPhotoIndex(
      (prevIndex) => (prevIndex - 1 + photos.length) % photos.length
    );
  };

  const goToNextSlide = () => {
    setCurrentPhotoIndex((prevIndex) => (prevIndex + 1) % photos.length);
  };

  return (
    <div
      className="relative w-full h-[400px] md:h-[600px] lg:h-[800px] overflow-hidden bg-background"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Slide */}
      <div className="absolute inset-0">
        <img
          src={photos[currentPhotoIndex].image}
          alt={`Slide ${currentPhotoIndex + 1}`}
          className="w-full h-full object-cover transition-opacity duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-black/80"></div>
      </div>

      {/* Slide Content */}
      <div className="absolute inset-0 flex flex-col justify-center items-center text-center text-white px-4">
        <h2 className="text-xl md:text-2xl lg:text-3xl font-bold mb-4">
          {photos[currentPhotoIndex].text}
        </h2>
        <p className="text-sm md:text-base lg:text-lg max-w-lg md:max-w-2xl">
          A thrilling symphony of athleticism, passion, and triumph. From the
          thunderous roars of stadiums to the graceful dance of champions.
          Victory hangs in the air, where legends are born and dreams take
          flight.
        </p>
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={goToPrevSlide}
        className="absolute top-1/2 left-4 md:left-8 transform -translate-y-1/2 text-white bg-black/50 p-2 rounded-full hover:bg-black/70 transition"
      >
        <GrPrevious size={20} className="md:w-6 md:h-6" />
      </button>
      <button
        onClick={goToNextSlide}
        className="absolute top-1/2 right-4 md:right-8 transform -translate-y-1/2 text-white bg-black/50 p-2 rounded-full hover:bg-black/70 transition"
      >
        <GrNext size={20} className="md:w-6 md:h-6" />
      </button>

      {/* Progress Indicators */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
        {photos.map((_, index) => (
          <span
            key={index}
            className={`h-2 w-2 md:h-3 md:w-3 rounded-full ${
              index === currentPhotoIndex ? "bg-accent" : "bg-mutedText"
            } transition-colors`}
          />
        ))}
      </div>
    </div>
  );
};

export default Carousel;
