import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { useRef } from 'react';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import Mentor from '../cards/Mentor';
import PropTypes from 'prop-types';

const MonthlyMentors = ({ monthlyMentors }) => {
  const settings = {
    dots: false,
    arrows: false,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
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
      <div className="flex justify-between px-4">
        <p className="text-2xl font-semibold leading-[1.5] text-[#141522] mb-[18px]">
          Monthly Mentors
        </p>
        <div className="flex">
          <ArrowBackIosIcon onClick={goToPrev} className="cursor-pointer" />
          <ArrowForwardIosIcon onClick={goToNext} className="cursor-pointer" />
        </div>
      </div>
      <div className="">
        <div className="slider-container w-[calc(100vw-755px)]">
          <Slider ref={sliderRef} {...settings} className="">
            {monthlyMentors.map((mentor, index) => (
              <div className="px-4" key={index}>
                <Mentor mentor={mentor} comments={false} />
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </section>
  );
};

MonthlyMentors.propTypes = {
  monthlyMentors: PropTypes.array.isRequired,
};

export default MonthlyMentors;
