/* trunk-ignore-all(prettier) */
import {
  Navigation,
  Scrollbar,
  A11y,
  Autoplay,
  EffectFade,
} from "swiper/modules";

import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/bundle";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

import "./DisplayBoard.css";

import { useQuery } from "@tanstack/react-query";
import { IAPIResponse, getPopular, makeBgPath } from "../../../api";
import { IMovie } from "../../../api";
import { RightIcon } from "../../../components/right-icon";

const SWIPER_DELAY = 2.5 * 1000;

export const DisplayBoard = () => {
  const { isLoading, error, data } = useQuery<IAPIResponse>(
    ["allCharacters"],
    getPopular
  );
  if (
    isLoading ||
    !data ||
    !data.results ||
    data.results.length === 0 ||
    error
  ) {
    return <SwiperSkeleton />;
  }

  return (
    <Swiper
      // install Swiper modules
      modules={[Navigation, Scrollbar, A11y, Autoplay, EffectFade]}
      autoplay={{ delay: SWIPER_DELAY, disableOnInteraction: false }}
      spaceBetween={0}
      slidesPerView={1}
      effect="fade"
      navigation
      flipEffect={{ slideShadows: true }}
      scrollbar={{ draggable: true }}
      onSwiper={(swiper) => console.log(swiper)}
      onSlideChange={() => console.log("slide change")}
      style={{
        width: "100%",
        minHeight: "300px",
        maxHeight: "500px",
        backgroundColor: "rgba(0, 0, 0)",
      }}
    >
      {data?.results.slice(1, 6).map((movie: IMovie, index) => (
        <SwiperSlide key={index}>
          <img
            src={makeBgPath(movie.backdrop_path)}
            alt={movie.title}
            style={{
              width: "100%",
              objectFit: "cover",
            }}
          />
          <div
            style={{
              position: "absolute",
              top: "25%",
              left: "20%",
              transform: "translate(-40%, -20%)",
              color: "white",
              textAlign: "center",
              width: "25%",
              backgroundColor: "rgba(0, 0, 0, 0.3)",
              padding: "1rem",
              borderRadius: "10px",
            }}
          >
            <div
              style={{
                fontSize: "1.5rem",
                fontWeight: "bold",
                marginBottom: "1rem",
              }}
            >
              {movie.title}
            </div>
            <p
              style={{
                fontSize: "0.8rem",
                fontWeight: "lighter",
                marginBottom: "1rem",
              }}
            >
              {movie.overview.slice(0, 100) + "..."}
            </p>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "white",
                color: "rgba(0,0,0,0.8)",
                padding: "0.5rem 1rem",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
                fontWeight: "bold",
                fontSize: "0.8rem",
              }}
            >
              <div>보러가기</div>
              <RightIcon />
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

const SwiperSkeleton = () => {
  return (
    <div
      style={{
        width: "100%",
        minHeight: "300px",
        maxHeight: "500px",
        backgroundColor: "rgba(0, 0, 0, 0.1)",
      }}
    ></div>
  );
};
