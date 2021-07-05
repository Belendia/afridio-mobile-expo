import { Image, Track } from "../../types";

export const getPoster = (images: Image[]) => {
  const poster = images?.filter((img) => img.width === 500);
  if (poster && poster.length > 0 && poster[0].image) {
    return { uri: poster[0].image };
  }
  return require("../../assets/images/backdrop.png");
};

export const getTrack = (track: Track | undefined) => {
  if (track && track.file_url) {
    return { uri: track.file_url };
  }
  return require("../../assets/videos/no-track.mp4");
};
