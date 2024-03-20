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

import styled from "styled-components";
import { motion } from "framer-motion";

const BackgroundImage = styled(motion.img)`
  width: 100%;
  object-fit: cover;
`;

const ContentContainer = styled(motion.div)`
  position: absolute;
  top: 25%;
  left: 20%;
  transform: translate(-40%, -20%);
  color: white;
  text-align: center;
  width: 25%;
  background-color: rgba(0, 0, 0, 0.3);
  padding: 1rem;
  border-radius: 10px;
`;

const ContentTitle = styled(motion.div)`
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 1rem;
`;

const ContentDescription = styled(motion.div)`
  font-size: 1rem;
  font-weight: lighter;
  margin-bottom: 1rem;
`;

const ContentFowardButton = styled(motion.div)`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: white;
  color: rgba(0, 0, 0, 0.8);
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-weight: bold;
  font-size: 0.8rem;
`;

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
          <BackgroundImage
            src={makeBgPath(movie.backdrop_path)}
            alt={movie.title}
          />
          <ContentContainer>
            <ContentTitle>{movie.title}</ContentTitle>
            <ContentDescription>
              {movie.overview.slice(0, 100) + "..."}
            </ContentDescription>
            <ContentFowardButton
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.9 }}
            >
              보러가기
              <RightIcon />
            </ContentFowardButton>
          </ContentContainer>
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
        backgroundColor: "rgba(0, 0, 0, 0.3)",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: "10%",
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
            marginBottom: "1rem",
            backgroundColor: "rgba(0, 0, 0, 0.3)",
            width: "100%",
            height: "1.5rem",
          }}
        />
        <div
          style={{
            marginBottom: "1rem",
            backgroundColor: "rgba(0, 0, 0, 0.3)",
            width: "100%",
            height: "1.5rem",
          }}
        />
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "white",
            color: "rgba(0, 0, 0, 0.8)",
            padding: "0.5rem 1rem",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            fontWeight: "bold",
            fontSize: "0.8rem",
          }}
        />
      </div>
    </div>
  );
};
