import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { useRef, useState, useEffect } from 'react';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import Task from '../cards/Task';
import { getTodaysTasksApi } from '../../api/apiService';

const TimeLimit = () => {
  const [todaysTasks, setTodaysTasks] = useState([]);
  const [slidesToShow, setSlidesToShow] = useState(3);

  useEffect(() => {
    const fetchTasks = async () => {
      const date = new Date();

      const todaysDate = `${date.getFullYear()}-${String(
        date.getUTCMonth() + 1
      ).padStart(2, '0')}-${date.getDate()}`;
      const tasks = await getTodaysTasksApi(todaysDate);
      setTodaysTasks(tasks);

      const slidesToShow = tasks.length <= 3 ? tasks.length : 3;
      setSlidesToShow(slidesToShow);
    };
    fetchTasks();
  }, []);

  const settings = {
    dots: false,
    arrows: false,
    infinite: true,
    speed: 500,
    slidesToShow: slidesToShow,
    slidesToScroll: 1,
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
          Time Limit
        </p>
        <div className="flex">
          <ArrowBackIosIcon onClick={goToPrev} className="cursor-pointer" />
          <ArrowForwardIosIcon onClick={goToNext} className="cursor-pointer" />
        </div>
      </div>
      <div className="">
        <div className="slider-container w-[calc(100vw-335px)]">
          <Slider ref={sliderRef} {...settings} className="">
            {todaysTasks.length !== 0 &&
              todaysTasks.map((task, index) => {
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

export default TimeLimit;
