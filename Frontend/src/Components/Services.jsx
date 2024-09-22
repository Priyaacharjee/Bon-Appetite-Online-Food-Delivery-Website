import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import { fetchAllRestaurent } from "../utils/utils";

const Services = () => {
  function SampleNextArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{ ...style, display: "block", background: "#E5E7E9" }}
        onClick={onClick}
      />
    );
  }
  function SamplePrevArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{ ...style, display: "block", background: "#E5E7E9" }}
        onClick={onClick}
      />
    );
  }

  const [restaurents, setrestaurents] = useState([]);

  // Card Slider(For xl)----------------------
  const sliderSettings_xl = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow:
      Array.isArray(restaurents) && restaurents.length < 9
        ? restaurents.length
        : 9,
    slidesToScroll:
      Array.isArray(restaurents) && restaurents.length < 9
        ? restaurents.length
        : 9,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
  };
  // Card Slider(For lg)----------------------
  const sliderSettings_lg = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 6,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
  };
  // Card Slider(For md)----------------------
  const sliderSettings_md = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
  };
  // Card Slider(For sm)----------------------
  const sliderSettings_sm = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
  };

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAllRestaurent().then((response) => {
      setrestaurents(response);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className="col-lg-12 pt-1 pl-5 pr-5 d-none d-xl-block pb-2">
        <Slider {...sliderSettings_xl}>
          {Array.isArray(restaurents) &&
            restaurents.map((card) => (
              <div
                key={card.id}
                className="pt-3"
                style={{ height: "130px", width: "50%" }}
              >
                <div
                  className="m-0 ml-2 mr-2"
                  style={{
                    boxShadow:
                      "rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px",
                  }}
                >
                  <div className="m-0 p-0" style={{ color: "black" }}>
                    <div
                      className="justify-center items-center pt-2"
                      style={{ height: "132px", width: "100%" }}
                    >
                      <img
                        src={`restaurentPictures/${card.image}`}
                        alt=""
                        style={{
                          height: "100%",
                          width: "80%",
                          margin: "auto",
                          borderRadius: "50% 20% / 10% 40%",
                        }}
                      ></img>
                    </div>

                    <div
                      className="flex flex-col justify-center items-center m-0 p-0 pt-2 pb-2"
                      style={{ height: "30%" }}
                    >
                      <h6 className="mt-1" style={{ fontSize: "100%" }}>
                        {card.name}
                      </h6>
                    </div>
                  </div>
                </div>
              </div>
            ))}
        </Slider>
      </div>

      <div
        className="col-lg-12 pt-1 pl-5 pr-5 d-none d-xl-none d-lg-block pb-2"
        style={{ backgroundColor: "#fff" }}
      >
        <Slider {...sliderSettings_lg}>
          {Array.isArray(restaurents) &&
            restaurents.map((card) => (
              <div
                key={card.id}
                className="pt-3"
                style={{ height: "110px", width: "40%" }}
              >
                <div
                  className="m-0 ml-2 mr-2"
                  style={{
                    boxShadow:
                      "rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px",
                  }}
                >
                  <div className="m-0 p-0" style={{ color: "black" }}>
                    <div
                      className="justify-center items-center m-auto"
                      style={{ height: "100px", width: "90%" }}
                    >
                      <img
                        src={`restaurentPictures/${card.image}`}
                        alt=""
                        style={{
                          height: "100%",
                          width: "80%",
                          margin: "auto",
                          borderRadius: "50% 20% / 10% 40%",
                        }}
                      ></img>
                    </div>

                    <div
                      className="flex flex-col justify-center items-center m-0 p-0 pt-2 pb-2"
                      style={{ height: "30%" }}
                    >
                      <h6 className="mt-1" style={{ fontSize: "100%" }}>
                        {card.name}
                      </h6>
                    </div>
                  </div>
                </div>
              </div>
            ))}
        </Slider>
      </div>

      <div
        className="col-lg-12 pt-1 pl-5 pr-5 d-none d-xl-none d-lg-none d-md-block pb-2"
        style={{ backgroundColor: "#fff" }}
      >
        <Slider {...sliderSettings_md}>
          {Array.isArray(restaurents) &&
            restaurents.map((card) => (
              <div
                key={card.id}
                className="pt-3"
                style={{ height: "100px", width: "50%" }}
              >
                <div
                  className="m-0 ml-2 mr-2"
                  style={{
                    boxShadow:
                      "rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px",
                  }}
                >
                  <div className="m-0 p-0" style={{ color: "black" }}>
                    <div
                      className="justify-center items-center m-auto"
                      style={{ height: "100px", width: "90%" }}
                    >
                      <img
                        src={`restaurentPictures/${card.image}`}
                        alt=""
                        style={{
                          height: "100%",
                          width: "80%",
                          margin: "auto",
                          borderRadius: "50% 20% / 10% 40%",
                        }}
                      ></img>
                    </div>

                    <div
                      className="flex flex-col justify-center items-center m-0 p-0 pt-2 pb-2"
                      style={{ height: "30%" }}
                    >
                      <h6 className="mt-1" style={{ fontSize: "100%" }}>
                        {card.name}
                      </h6>
                    </div>
                  </div>
                </div>
              </div>
            ))}
        </Slider>
      </div>

      <div
        className="col-lg-12 pt-1 pl-5 pr-5 d-none d-xl-none d-lg-none d-md-none d-sm-block pb-2"
        style={{ backgroundColor: "#fff" }}
      >
        <Slider {...sliderSettings_sm}>
          {Array.isArray(restaurents) &&
            restaurents.map((card) => (
              <div
                key={card.id}
                className="pt-3"
                style={{ height: "90px", width: "50%" }}
              >
                <div
                  className="m-0 ml-2 mr-2"
                  style={{
                    boxShadow:
                      "rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px",
                  }}
                >
                  <div className="m-0 p-0" style={{ color: "black" }}>
                    <div
                      className="justify-center items-center m-auto"
                      style={{ height: "90px", width: "70%" }}
                    >
                      <img
                        src={`restaurentPictures/${card.image}`}
                        alt=""
                        style={{
                          height: "100%",
                          width: "100%",
                          margin: "auto",
                          borderRadius: "50% 20% / 10% 40%",
                        }}
                      ></img>
                    </div>

                    <div
                      className="flex flex-col justify-center items-center m-0 p-0 pt-2 pb-2"
                      style={{ height: "30%" }}
                    >
                      <h6 className="mt-1" style={{ fontSize: "100%" }}>
                        {card.name}
                      </h6>
                    </div>
                  </div>
                </div>
              </div>
            ))}
        </Slider>
      </div>
    </>
  );
};

export default Services;
