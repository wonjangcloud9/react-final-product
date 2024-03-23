import { AnimatePresence, motion } from "framer-motion";
import styled from "styled-components";
import { useNavigate, useParams } from "react-router-dom";
import { useFetchMovie } from "../../hooks/useQueryMovie";

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

  const { isLoading, hasError, hasData, data } = useFetchMovie(
    movieId as string
  );

  if (isLoading || !hasData || hasError || !data) {
    return (
      <DetailSkeleton layoutId={layoutId} closeModal={() => navigate(-1)} />
    );
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

const DetailSkeleton = ({
  layoutId,
  closeModal,
}: {
  layoutId: string;
  closeModal: () => void;
}) => {
  return (
    <Backdrop onClick={closeModal}>
      <DetailContainer layoutId={layoutId}></DetailContainer>
    </Backdrop>
  );
};
