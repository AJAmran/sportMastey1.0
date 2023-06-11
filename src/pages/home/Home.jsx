import { useContext } from 'react';
import Carousel from "../../Components/Slider/Carousel";
import PopularClasses from "../../Components/popularClasses/PopularClasses";
import PopularInstructor from "../../Components/popularInstructor/PopularInstructor";
import { ThemeContext } from '../../contexts/ThemeContext';

const Home = () => {
  const { isDarkMode } = useContext(ThemeContext);

  return (
    <div className={`container mx-auto px-4 ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
      <Carousel />
      <PopularClasses />
      <PopularInstructor />
    </div>
  );
};

export default Home;
