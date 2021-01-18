import React from "react";
import { Container } from "react-bootstrap";
import { StyleSheet, css } from "aphrodite";
import { useSetRecoilState } from "recoil";
import {
  isCuratedVideoPlayingAtom,
  curatedVideoInfoAtom,
} from "../lib/AppAtoms";

const VideoThumbnail = ({ videoID, title }) => {
  const setIsCuratedVideoPlaying = useSetRecoilState(isCuratedVideoPlayingAtom);

  const setCuratedVideoInfo = useSetRecoilState(curatedVideoInfoAtom);

  function clickHandler() {
    setCuratedVideoInfo({ videoID, title });
    setIsCuratedVideoPlaying(true);
  }

  return (
    <img
      onClick={clickHandler}
      role="button"
      className={css(styles.videoThumbnail)}
      alt={title}
      src={`https://img.youtube.com/vi/${videoID}/maxresdefault.jpg`}
    />
  );
};

type Props = Readonly<{
  curated: ReadonlyArray<Readonly<{ title: string; videoID: string }>>;
}>;

const Curated = ({ curated }: Props) => (
  <Container className={css(styles.container)}>
    <h2>Community Curated Videos</h2>
    <div className={css(styles.contentRow)}>
      {curated.map((node) => (
        <VideoThumbnail
          key={node.videoID}
          videoID={node.videoID}
          title={node.title}
        />
      ))}
    </div>
  </Container>
);

const styles = StyleSheet.create({
  container: {
    marginTop: "1vh",
    marginBottom: "1vh",
  },
  contentRow: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    flexWrap: "nowrap",
    whiteSpace: "nowrap",
    overflowY: "hidden",
    overflowX: "auto",
    scrollbarWidth: "none",
    "::-webkit-scrollbar": {
      display: "none",
    },
  },
  videoThumbnail: {
    cursor: "url(assets/play-cursor.svg) 60 60, auto",
    marginRight: "2vw",
    flex: "0 0 auto",
    width: "500px",
    height: "300px",
  },
});

export default Curated;
