import { useQuery } from "@tanstack/react-query";
import {
  IAPIResponse,
  IMovieDetail,
  getComingSoon,
  getMovie,
  getNowPlaying,
  getPopular,
} from "../api";

export const useFetchData = (
  type: "nowPlaying" | "popular" | "comingSoon" | "movie",
  id?: string
) => {
  const queryKey = type === "movie" && id ? ["movie", id] : [type];

  const getFunction = () => {
    switch (type) {
      case "nowPlaying":
        return getNowPlaying;
      case "popular":
        return getPopular;
      case "comingSoon":
        return getComingSoon;
      case "movie":
        if (!id) {
          throw new Error("Invalid id");
        }
        return () => getMovie(id);
      default:
        throw new Error("Invalid type");
    }
  };

  const { isLoading, error, data } = useQuery<IAPIResponse & IMovieDetail>(
    queryKey,
    getFunction(),
    {
      enabled:
        type === "nowPlaying" ||
        type === "popular" ||
        type === "comingSoon" ||
        (type === "movie" && !!id),
    }
  );

  const hasError = error != null;

  let hasData = false as boolean | undefined;

  if (type === "movie") {
    hasData = data && "id" in data && data.id === Number(id);
  } else {
    hasData = data && "results" in data && data.results.length > 0;
  }

  return { isLoading, hasError, hasData, data };
};
