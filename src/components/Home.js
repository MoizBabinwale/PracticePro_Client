import React, { useDebugValue, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { resetResult } from "../actions/testAction";
import axios from "axios";
import { TEST_API } from "../actions/api";
// import { useDispatch, useSelector } from "react-redux";
function Home() {
  // const { isNavOpen } = useNavigation();
  const [testData, setTestData] = useState([]);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(resetResult());
    getAllTests();
  }, []);

  const getAllTests = async () => {
    try {
      const response = await axios.get(TEST_API + "/getAllTest"); // Await the axios request
      if (response) {
        console.log("res", response);
        setTestData(response.data.Tests);
      }
    } catch (error) {
      console.log("error ", error);
    }
  };

  return (
    <div className="container ">
      <div className="mx-16">
        <div className="flex flex-col">
          <div className="flex flex-col md:flex-row items-end sec-head">
            <h2 className="float-left text-f49 text-44 font-semibold mb-0 col-span-8 px-0 md:col-span-8">
              Practise karo, Pro Bano<span className="text-e60">&nbsp;</span>
            </h2>
            {/* <a className=" md:inline-block mt-1 md:mt-0 ml-auto link" href="https://testfunda.com/all-programs/" previewlistener="true">
              View all programs
            </a> */}
          </div>
        </div>

        <div className="col-span-12 mt-4">
          <div className="programs-card-list programs-card-list--bg grid grid-cols-1 md:grid-cols-3 gap-4 mx-3">
            {/* <!-- Each program card starts here --> */}
            <div className={`slick-slide px-2 md:w-[380px] felx   md:rounded-md md:col-span-1 h-mb-100 `}>
              <div className="popular-card flex flex-col relative h-full" style={{ boxShadow: "0 10px 15px 0 rgba(49,45,43,.1)" }}>
                <div className="popular-card__head bg-orange-200" style={{ padding: "13px 30px 10px" }}>
                  <div className="line bg-[#f98d49] h-1 w-full absolute top-0 left-0"></div>
                </div>
                <div className="popular-card__body" style={{ padding: "24px 30px" }}>
                  <h3 className="text-24 text-f49 font-semibold">MHT CET Pack - 2024 </h3>
                  <p className="mb-4 md:mb-3 text-16 text-888">Mocks (MHCET – 30 | CMAT – 12 ) Sectionals (MHCET – 40 | CMAT – 15) Area Tests ( MHCET – 100 | CMAT – 60) 80+ E-books with Solved Examples for MHCET</p>
                  <p className="mb-0 text-14 text-f49"></p>
                </div>
                <div className="popular-card__footer !mt-auto" style={{ padding: "14px 30px 40px" }}>
                  <div className="flex items-center flex-wrap mb-3 md:pb-1">
                    <h4 className="mb-0 inline-block text-22 text-f49 font-semibold">Rs.2800/-</h4>
                    <span className="text-sm text-888 ml-2">Customizable</span>
                  </div>
                  <div className="flex md:justify-between clearfix card-btn md:mx-[-5px]">
                    <Link to="/buyPremium">
                      <a target="_blank" className="float-left rounded-md border-[#4a398d] cursor-pointer text-white items-center font-normal uppercase px-3 py-2 bg-[#4a398d]    md:ml-auto md:float-left ml-auto mr-auto">
                        personalize &amp; buy
                      </a>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            {testData.map((item, index) => (
              <div key={index} className={`slick-slide px-2 md:w-[380px] felx   md:rounded-md md:col-span-1 h-mb-100 `}>
                <div className="popular-card flex flex-col relative h-full " style={{ boxShadow: "0 10px 15px 0 rgba(49,45,43,.1)" }}>
                  <div className="popular-card__head bg-orange-200" style={{ padding: "13px 30px 10px" }}>
                    <div className="line bg-[#f98d49] h-1 w-full absolute top-0 left-0"></div>
                  </div>
                  <div className="popular-card__body" style={{ padding: "24px 30px" }}>
                    <h3 className="text-24 text-f49 font-semibold">{item.testName}</h3>
                    <div className="h-full mb-4 md:mb-3 text-16 text-888 h-full">
                      {item.subjectIds.map((data, i) => (
                        <span>{data.name}</span>
                      ))}
                    </div>
                    <p className="mb-0 text-14 text-f49"></p>
                  </div>
                  <div className="popular-card__footer !mt-auto" style={{ padding: "14px 30px 40px" }}>
                    <div className="flex items-center flex-wrap mb-3 md:pb-1">
                      <h4 className="mb-0 inline-block text-22 text-f49 font-semibold">Rs.2800/-</h4>
                      <span className="text-sm text-888 ml-2">Customizable</span>
                    </div>
                    <div className="flex md:justify-between clearfix card-btn md:mx-[-5px]">
                      <Link to="/buyPremium">
                        <a target="_blank" className="float-left rounded-md border-[#4a398d] cursor-pointer text-white items-center font-normal uppercase px-3 py-2 bg-[#4a398d]    md:ml-auto md:float-left ml-auto mr-auto">
                          personalize &amp; buy
                        </a>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {/* <!-- Each program card ends here --> */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
