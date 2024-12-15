import Carousel from "../../Components/Slider/Carousel";
import PopularClasses from "../../Components/popularClasses/PopularClasses";
import PopularInstructor from "../../Components/popularInstructor/PopularInstructor";
import Accordion from "../../Components/accordian/Accordion";

const Home = () => {
  return (
    <>
      <Carousel />
      <PopularClasses />
      <PopularInstructor />
      <Accordion />
    </>
  );
};

export default Home;
