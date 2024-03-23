import { AnimatePresence, motion } from "framer-motion";
import styled from "styled-components";
import { useNavigate, useParams } from "react-router-dom";
import { useFetchData } from "../../hooks/useQueryMovie";
import { makeBgPath, makeImagePath } from "../../api";

const DetailContainer = styled(motion.div)`
  position: fixed;
  width: 70vw;
  height: 80vh;
  background-color: black;
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

const XBtnContainer = styled.div`
  position: relative;
  z-index: 1;
`;

const XBtn = styled.button`
  position: absolute;
  top: 1rem;
  right: 1rem;
  color: white;
  background-color: transparent;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
`;

const BackImageContainer = styled.div`
  width: 100%;
  height: 50%;
  overflow: hidden;
  border-radius: 20px;
`;

const BackImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 20px;
  opacity: 0.5;
`;

const CotentContainer = styled.div`
  display: flex;
  gap: 1rem;
  padding: 1rem;
`;

const ContentImage = styled.img`
  width: 20%;
  height: 100%;
  object-fit: cover;
  border-radius: 10px;
`;

const ContentDescriptionContainer = styled.div`
  padding: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  width: 100%;
  color: white;
`;

const ContentDescriptionTitle = styled.h1`
  font-size: 2rem;
  margin-bottom: 1rem;
`;

const ContentDescription = styled.p`
  font-size: 1rem;
  margin-bottom: 1rem;
  overflow: hidden;
  color: grey;
`;

export const Detail = ({ layoutId }: { layoutId: string }) => {
  const { id: movieId } = useParams();
  const navigate = useNavigate();

  const { isLoading, hasError, hasData, data } = useFetchData("movie", movieId);

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
          <XBtnContainer onClick={closeModal}>
            <XBtn>X</XBtn>
          </XBtnContainer>
          <BackImageContainer>
            <BackImage src={makeBgPath(data.backdrop_path)} alt={data.title} />
          </BackImageContainer>
          <CotentContainer>
            <ContentImage
              src={makeImagePath(data.poster_path)}
              alt={data.title}
            />
            <ContentDescriptionContainer>
              <ContentDescriptionTitle>{data.title}</ContentDescriptionTitle>
              <ContentDescription>{data.overview}</ContentDescription>
            </ContentDescriptionContainer>
          </CotentContainer>
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
