import React, { useEffect, useState } from "react";
import { useMediaQuery } from "@mui/material";
import { Link } from "react-router-dom";
import homepagebanner2 from "../assets/homepagebanne2.png";
import homepagebanne3 from "../assets/homepagebanne3.png";
import homepagebanner from "../assets/homepagebanner.png";
import homepagebanner1 from "../assets/homepagebanner1.png";
import "tw-elements-react/dist/css/tw-elements-react.min.css";
import { RxDotFilled } from "react-icons/rx";
import { BsChevronCompactLeft, BsChevronCompactRight } from "react-icons/bs";
function Section1() {
  //   const [carouselData, setCarouselData] = useState();

  // const carouselData = [
  //   {
  //     title: "this is 1 ",
  //     imgUrl: homepagebanner,
  //   },
  //   {
  //     title: "this is 1 ",
  //     imgUrl: homepagebanner2,
  //   },
  //   {
  //     title: "this is 1 ",
  //     imgUrl: homepagebanne3,
  //   },
  //   {
  //     title: "this is 1 ",
  //     imgUrl: homepagebanner1,
  //   },
  // ];

  const slides = [
    {
      url: homepagebanner,
    },
    {
      url: homepagebanner2,
    },
    {
      url: homepagebanne3,
    },

    {
      url: homepagebanner1,
    },
  ];

  //   useEffect(() => {
  //     setCarouselData();
  //   }, []);

  const [currentIndex, setCurrentIndex] = useState(0);

  const prevSlide = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? slides.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const nextSlide = () => {
    const isLastSlide = currentIndex === slides.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  const goToSlide = (slideIndex) => {
    setCurrentIndex(slideIndex);
  };
  useEffect(() => {
    const intervalId = setInterval(() => {
      nextSlide();
    }, 5000); // Change slide every 5000ms (5 seconds)

    // Cleanup interval on component unmount
    return () => clearInterval(intervalId);
  }, [currentIndex]);

  return (
    <div>
      <div className="section1_contianer">
        {/* {carouselData?.length > 0 && (
          <Carousel className="rounded-xl " style={{ height: "200px" }}>
            {carouselData?.map((item, index) => (
              <div>
                <Link to={item.targetUrl}>
                  style={{ position: "absolute" }}
                  <img src={item.imgUrl} alt={item.title} className="object-contain" />
                </Link>
              </div>
            ))}
          </Carousel>
        )} */}
        <div className="max-w-[1600px] h-[250px] w-full m-auto relative group">
          <div style={{ backgroundImage: `url(${slides[currentIndex].url})` }} className="w-full h-full  bg-center bg-cover duration-500"></div>
          {/* Left Arrow */}
          <div className="hidden group-hover:block absolute top-[50%] -translate-x-0 translate-y-[-50%] left-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer">
            <BsChevronCompactLeft onClick={prevSlide} size={30} />
          </div>
          {/* Right Arrow */}
          <div className="hidden group-hover:block absolute top-[50%] -translate-x-0 translate-y-[-50%] right-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer">
            <BsChevronCompactRight onClick={nextSlide} size={30} />
          </div>
          <div className="flex top-4 justify-center py-2">
            {slides.map((slide, slideIndex) => (
              <div key={slideIndex} onClick={() => goToSlide(slideIndex)} className="text-2xl cursor-pointer">
                <RxDotFilled />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Section1;
