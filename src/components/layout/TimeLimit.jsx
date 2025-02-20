import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { useRef, useState, useEffect } from 'react';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import Task from '../cards/Task';
import PropTypes from 'prop-types';
import { getTodaysTasksApi } from '../../api/apiService';

const TimeLimit = () => {
  const [todaysTasks, setTodaysTasks] = useState([]);

  const slidesToShow = todaysTasks.length <= 3 ? todaysTasks.length : 3;

  useEffect(() => {
    const fetchTasks = async () => {
      const date = new Date();

      const todaysDate = `${date.getFullYear()}-${String(
        date.getUTCMonth() + 1
      ).padStart(2, '0')}-${date.getDate()}`;
      const tasks = await getTodaysTasksApi(todaysDate);
      setTodaysTasks(tasks);
      console.log('----------todays tasks------', tasks[0]);
    };
    fetchTasks();
  }, []);

  const settings = {
    dots: false,
    arrows: false,
    infinite: true,
    speed: 500,
    slidesToShow: { slidesToShow },
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
          Time Limit
        </p>
        {todaysTasks.length > 3 && (
          <div className="flex">
            <ArrowBackIosIcon onClick={goToPrev} className="cursor-pointer" />
            <ArrowForwardIosIcon
              onClick={goToNext}
              className="cursor-pointer"
            />
          </div>
        )}
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

TimeLimit.propTypes = {
  todaysTasks: PropTypes.array.isRequired,
};

export default TimeLimit;
