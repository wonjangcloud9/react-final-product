import { useQuery } from "@tanstack/react-query";
import { IAPIResponse, getNowPlaying } from "../../../api";
import { motion } from "framer-motion";
import styled from "styled-components";

const Container = styled.div`
  padding: 10px 20px;
  background-color: black;
`;

const CardContainer = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  justify-content: center;
  gap: 50px;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const Card = styled(motion.div)`
  width: 100%;
  height: 100%;
  background-color: #fff;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 20px;
  border: none;
  background-color: black;
  position: relative;
  z-index: 1;
  cursor: pointer;
  &:hover {
    z-index: 2;
    transform: scale(1.05);
  }
  &:active {
    transform: scale(0.9);
  }
  transition: transform 0.3s, z-index 0s;
`;

const CardImage = styled(motion.img)`
  width: 100%;
  object-fit: cover;
  border-radius: 20px;
  border: none;
`;

const CardTitle = styled.div`
  color: white;
  font-size: 20px;
  font-weight: 600;
  padding: 20px;
  text-align: center;
`;

const cardContainerVariants = {
  hidden: {
    opacity: 0,
    scale: 0.5,
    transition: {
      type: "spring",
      bounce: 0,
      duration: 0.3,
    },
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      type: "spring",
      bounce: 0,
      duration: 0.7,
      delayChildren: 0.1,
      staggerChildren: 0.1,
    },
  },
};

const cardVariants = {
  hover: {
    scale: 1.05,
    zIndex: 2,
  },
  tap: {
    scale: 0.95,
  },
  hidden: {
    opacity: 0,
    transition: { duration: 0.2 },
  },
  visible: {
    opacity: 1,
    transition: { type: "spring", stiffness: 300, damping: 24 },
  },
};

export const ContentList = () => {
  const { isLoading, error, data } = useQuery<IAPIResponse>(
    ["allCharacters"],
    getNowPlaying
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
    <>
      <Container>
        <CardContainer
          variants={cardContainerVariants}
          initial="hidden"
          animate="visible"
        >
          {data.results.map((movie) => (
            <Card key={movie.id} variants={cardVariants}>
              <CardImage
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
              />
              <CardTitle>{movie.title}</CardTitle>
            </Card>
          ))}
        </CardContainer>
      </Container>
    </>
  );
};

const SwiperSkeleton = () => {
  return (
    <Container>
      <CardContainer>
        {[...Array(10)].map((_, index) => (
          <Card key={index}>
            <img
              src="https://via.placeholder.com/750"
              alt="placeholder"
              style={{ width: "100%" }}
            />
          </Card>
        ))}
      </CardContainer>
    </Container>
  );
};
