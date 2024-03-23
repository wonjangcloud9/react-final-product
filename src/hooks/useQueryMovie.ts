import { useQuery } from "@tanstack/react-query";
import {
  IAPIResponse,
  IMovieDetail,
  getComingSoon,
  getMovie,
  getNowPlaying,
  getPopular,
} from "../api";

export const useFetchNowPlaying = () => {
  const { isLoading, error, data } = useQuery<IAPIResponse>(
    ["nowPlaying"],
    getNowPlaying
  );

  const hasError = error != null;
  const hasData = data && data.results && data.results.length > 0;

  return { isLoading, hasError, hasData, data };
};

export const useFetchPopular = () => {
  const { isLoading, error, data } = useQuery<IAPIResponse>(
    ["popular"],
    getPopular
  );

  const hasError = error != null;
  const hasData = data && data.results && data.results.length > 0;

  return { isLoading, hasError, hasData, data };
};

export const useFetchComingSoon = () => {
  const { isLoading, error, data } = useQuery<IAPIResponse>(
    ["comingSoon"],
    getComingSoon
  );

  const hasError = error != null;
  const hasData = data && data.results && data.results.length > 0;

  return { isLoading, hasError, hasData, data };
};

export const useFetchMovie = (id: string) => {
  const { isLoading, error, data } = useQuery<IMovieDetail>(
    ["movie", id],
    getMovie
  );

  const hasError = error != null;
  const hasData = data && data && data.id === Number(id);

  return { isLoading, hasError, hasData, data };
};
