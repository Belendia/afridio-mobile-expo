import { Image, Track } from "../../types";

export const getPoster = (images: Image[]) => {
  const poster = images?.filter((img) => img.width === 500);
  if (poster && poster.length > 0 && poster[0].image) {
    return { uri: poster[0].image };
  }
  return require("../../assets/images/backdrop.png");
};

export const getTrack = (track: Track[] | undefined, index: number) => {
  if (track && track.length && index > -1 && track[index].file_url) {
    return { uri: track[index].file_url };
  }
  return require("../../assets/videos/no-track.mp4");
};
