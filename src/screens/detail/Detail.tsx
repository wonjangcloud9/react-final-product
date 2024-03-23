import { AnimatePresence, motion } from "framer-motion";
import styled from "styled-components";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { IMovieDetail, getMovie } from "../../api";

const DetailContainer = styled(motion.div)`
  position: fixed;
  width: 70vw;
  height: 80vh;
  background-color: red;
  z-index: 10;
  border-radius: 20px;
`;

const Backdrop = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 5;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Detail = ({ layoutId }: { layoutId: string }) => {
  const { id: movieId } = useParams();
  const navigate = useNavigate();

  const { isLoading, error, data } = useQuery<IMovieDetail>(
    ["character", movieId],
    getMovie
  );

  if (isLoading || !data || !data || error) {
    return <DetailSkeleton />;
  }

  const closeModal = () => {
    navigate(-1);
  };

  return (
    <AnimatePresence>
      <Backdrop onClick={closeModal}>
        <DetailContainer
          layoutId={layoutId}
          onClick={(e) => e.stopPropagation()}
        >
          <div>{data.title}</div>
          <div>{data.overview}</div>
        </DetailContainer>
      </Backdrop>
    </AnimatePresence>
  );
};

const DetailSkeleton = () => {
  const navigate = useNavigate();

  const closeModal = () => {
    navigate(-1);
  };

  return (
    <Backdrop onClick={closeModal}>
      <DetailContainer>
        <div>Loading...</div>
      </DetailContainer>
    </Backdrop>
  );
};
