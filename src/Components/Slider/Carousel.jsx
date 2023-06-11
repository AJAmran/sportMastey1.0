import { useEffect, useState } from 'react';
import { GrPrevious } from 'react-icons/gr';
import { GrNext } from 'react-icons/gr';
import s1 from '../../assets/slider/athlet.jpg';
import s2 from '../../assets/slider/basketball.jpg';
import s3 from '../../assets/slider/bollyball.jpg';
import s4 from '../../assets/slider/football.jpg';
import s5 from '../../assets/slider/spring.jpg';
import s6 from '../../assets/slider/tannis.jpg';

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

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPhotoIndex((prevIndex) => (prevIndex + 1) % photos.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const goToPrevSlide = () => {
    setCurrentPhotoIndex((prevIndex) => (prevIndex - 1 + photos.length) % photos.length);
  };

  const goToNextSlide = () => {
    setCurrentPhotoIndex((prevIndex) => (prevIndex + 1) % photos.length);
  };

  const truncateText = (text, maxLength) => {
    if (text.length <= maxLength) {
      return text;
    }
    return text.slice(0, maxLength) + "...";
  };

  const getFontSize = () => {
    const screenWidth = window.innerWidth;
    if (screenWidth <= 640) {
      return "14px"; // Font size for mobile devices
    } else if (screenWidth <= 1024) {
      return "18px"; // Font size for tablet devices
    } else {
      return "20px"; // Font size for large devices
    }
  };

  return (
    <div className="carousel relative min-h-full-w-full max-h-[800px]">
      <img
        src={photos[currentPhotoIndex].image}
        alt={`Slide ${currentPhotoIndex + 1}`}
        className="slide max-h-[800]"
      />

      <div className="gradient-overlay absolute inset-0 bg-gradient-to-b from-transparent to-black"></div>

      <div className="text-white absolute top-3/4 left-1/2 transform -translate-y-1/2 -translate-x-1/2 text-center">
        <h2 className="text-2xl font-bold mb-4" style={{ transition: "opacity 0.3s ease" }}>
          {truncateText(photos[currentPhotoIndex].text, 40)}
        </h2>
        <p
          className="text-opacity-0 transition-opacity duration-500"
          style={{
            opacity: 1,
            transition: "opacity 0.3s ease",
            fontSize: getFontSize(),
            padding: "0 10px",
            margin: "0 auto",
          }}
        >
          A thrilling symphony of athleticism, passion, and triumph. From the thunderous roars of stadiums to the graceful dance of champions. Victory hangs in the air, where legends are born and dreams take flight.
        </p>
      </div>

      <div
        className="absolute left-0 top-1/2 transform -translate-y-1/2"
        onClick={goToPrevSlide}
      >
        <GrPrevious size={26} />
      </div>

      <div
        className="absolute right-0 top-1/2 transform -translate-y-1/2"
        onClick={goToNextSlide}
      >
        <GrNext size={26} />
      </div>
    </div>
  );
};

export default Carousel;
