import { useQuery } from "@tanstack/react-query";
import { Category } from "./Category";
import { IAPIResponse, getNowPlaying } from "../../../api";
import { motion } from "framer-motion";
import styled from "styled-components";

const Container = styled.div`
  padding: 20px;
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
`;

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
      <Category />
      <Container>
        <CardContainer
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          {data.results.map((movie) => (
            <Card key={movie.id}>
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
                style={{ width: "100%" }}
              />
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
