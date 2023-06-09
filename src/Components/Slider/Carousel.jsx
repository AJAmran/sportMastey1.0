import  { useEffect, useState } 
from 'react';
import { GrPrevious } from 'react-icons/gr';
import { GrNext } from 'react-icons/gr';
import s1 from '../../assets/slider/athlet.jpg'
import s2 from '../../assets/slider/basketball.jpg'
import s3 from '../../assets/slider/bollyball.jpg'
import s4 from '../../assets/slider/football.jpg'
import s5 from '../../assets/slider/spring.jpg'
import s6 from '../../assets/slider/tannis.jpg'

const Carousel = () => {
  const photos = [
   s1,
   s2,
   s3,
   s4,
   s5,
   s6,
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

  return (
    <div className="carousel relative min-h-full-w-full max-h-[800px]">
      <img
        src={photos[currentPhotoIndex]}
        alt={`Slide ${currentPhotoIndex + 1}`}
        className="slide max-h-[800]"
      />

      <div
        className="absolute left-0 top-1/2 transform -translate-y-1/2"
        onClick={goToPrevSlide}
      >
        <GrPrevious size={26}/>
      </div>

      <div
        className="absolute right-0 top-1/2 transform -translate-y-1/2"
        onClick={goToNextSlide}
      >
        <GrNext size={26}/>
      </div>
    </div>
  );
};

export default Carousel;
