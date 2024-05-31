import React, { useState } from "react";
import { Carousel } from "react-bootstrap";
// import SkeletonElement from "../Skeletons/SkeletonElement";
// import { Carousel } from 'react-responsive-carousel';
import { useMediaQuery } from "@mui/material";
import { Link } from "react-router-dom";
import homepagebanner2 from "../assets/homepagebanne2.png";
import homepagebanne3 from "../assets/homepagebanne3.png";
import homepagebanner from "../assets/homepagebanner.png";
import homepagebanner1 from "../assets/homepagebanner1.png";

function Section1() {
  const isMobile = useMediaQuery("(max-width:568px)");

  //   const [carouselData, setCarouselData] = useState();

  const carouselData = [
    {
      title: "this is 1 ",
      imgUrl: homepagebanner,
    },
    {
      title: "this is 1 ",
      imgUrl: homepagebanner2,
    },
    {
      title: "this is 1 ",
      imgUrl: homepagebanne3,
    },
    {
      title: "this is 1 ",
      imgUrl: homepagebanner1,
    },
  ];
  //   useEffect(() => {
  //     setCarouselData();
  //   }, []);

  return (
    <div>
      <div className="section1_contianer">
        {carouselData?.length > 0 && (
          <Carousel interval={5000} className="w-100">
            {/* marginTop: ` ${isMobile && "30px"}` */}
            {carouselData?.map((item, index) => (
              <Carousel.Item key={index}>
                {/* style={{ height: "300px" }} */}
                {item.imgUrl.split(".").pop() !== "mp4" ? (
                  <Link to={item.targetUrl}>
                    <div className="all-categories-banner">
                      {/* style={{ height: `${isMobile && "150px"}` }} */}
                      <img src={item.imgUrl} alt={item.title} loading="lazy" style={{ width: "100%", height: "100%", objectFit: `${isMobile && "cover"}`, minHeight: "100px", maxWeight: "450px" }} />
                    </div>
                  </Link>
                ) : (
                  <div className="video-container" style={{ height: "300px" }}>
                    <video controls autoPlay loop playsInline muted className="carousel_video">
                      <source src={item.imgUrl} type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                  </div>
                )}
              </Carousel.Item>
            ))}
          </Carousel>
        )}
      </div>
    </div>
  );
}

export default Section1;
