import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { useRef, useState, useEffect } from 'react';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import Task from '../cards/Task';
import { getAllTasksApi } from '../../api/apiService';

const AllTasks = () => {
  const [allTasks, setAllTasks] = useState([]);

  useEffect(() => {
    const fetchTasks = async () => {
      const tasks = await getAllTasksApi();
      setAllTasks(tasks);
    };
    fetchTasks();
  }, []);

  const settings = {
    dots: false,
    arrows: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1080,
        settings: {
          slidesToShow: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  const sliderRef = useRef(null);

  const goToNext = () => {
    sliderRef.current.slickNext();
  };

  const goToPrev = () => {
    sliderRef.current.slickPrev();
  };

  return (
    <section className="">
      <div className="flex justify-between">
        <p className="text-2xl font-semibold leading-[1.5] text-[#141522] mb-[18px]">
          New Tasks
        </p>
        <div className="flex">
          <ArrowBackIosIcon onClick={goToPrev} className="cursor-pointer" />
          <ArrowForwardIosIcon onClick={goToNext} className="cursor-pointer" />
        </div>
      </div>
      <div className="">
        <div className="slider-container w-[calc(100vw-335px)]">
          <Slider ref={sliderRef} {...settings} className="">
            {allTasks.length !== 0 &&
              allTasks.map((task, index) => {
                return (
                  <div className="px-4" key={index}>
                    <Task task={task} />
                  </div>
                );
              })}
          </Slider>
        </div>
      </div>
    </section>
  );
};

export default AllTasks;
