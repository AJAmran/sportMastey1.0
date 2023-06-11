import { useContext } from 'react';
import Carousel from "../../Components/Slider/Carousel";
import PopularClasses from "../../Components/popularClasses/PopularClasses";
import PopularInstructor from "../../Components/popularInstructor/PopularInstructor";
import { ThemeContext } from '../../contexts/ThemeContext';
import Accordion from '../../Components/accordian/Accordion';

const Home = () => {
  const { isDarkMode } = useContext(ThemeContext);

  return (
    <div className={`container mx-auto px-4 ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
      <Carousel />
      <PopularClasses />
      <PopularInstructor />
      <Accordion></Accordion>
    </div>
  );
};

export default Home;
