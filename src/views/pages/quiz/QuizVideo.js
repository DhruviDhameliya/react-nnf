// ** React Imports
import { Fragment, useEffect, useRef, useState } from "react";
import { findDOMNode } from "react-dom";
// ** Mail Components Imports
// import MailCard from "./MailCard";
// import MailDetails from "./MailDetails";
// import ComposePopUp from "./ComposePopup";

// ** Utils
import { formatDateToMonthShort } from "@utils";

// ** Third Party Components
import PerfectScrollbar from "react-perfect-scrollbar";
import {
  Menu,
  Search,
  Folder,
  Tag,
  Mail,
  Trash,
  Edit2,
  Info,
  ArrowRight,
  ArrowLeft,
  Maximize,
} from "react-feather";

// ** Reactstrap Imports
import {
  Input,
  Label,
  InputGroup,
  DropdownMenu,
  DropdownItem,
  InputGroupText,
  DropdownToggle,
  UncontrolledDropdown,
  Row,
  Col,
  Card,
  CardImg,
  Button,
  Progress,
} from "reactstrap";
import {
  getVideos,
  updateVideoPercentage,
} from "../../../@core/api/common_api";
import MailCard from "./MailCard";
import ReactPlayer from "react-player";
import secureLocalStorage from "react-secure-storage";
import { countPassingScore } from "../../../@core/components/common/Common";

const QuizVideo = (props) => {
  // ** Props
  const {
    setSidebarOpen,
    video,
    videoList,
    handleChangeVideo,
    handleChangeStep,
  } = props;

  let user = JSON.parse(secureLocalStorage.getItem("userData"));
  const [watchedPercentage, setWatchedPercentage] = useState(0);
  const [played, setPlayed] = useState(0);

  const playerRef = useRef(null);
  const handleFullScreen = () => {
    const player = findDOMNode(playerRef.current);
    if (player.requestFullscreen) {
      player.requestFullscreen();
    } else if (player.mozRequestFullScreen) {
      player.mozRequestFullScreen();
    } else if (player.webkitRequestFullscreen) {
      player.webkitRequestFullscreen();
    } else if (player.msRequestFullscreen) {
      player.msRequestFullscreen();
    }
  };

  const handleProgress = async (progress) => {
    console.log("progress: ", progress);
    const newWatchedPercentage = Math.floor(progress.played * 100);
    console.log("newWatchedPercentage :", newWatchedPercentage);
    setPlayed(progress.played);
    setWatchedPercentage(newWatchedPercentage);

    // If video is watched completely, update database with percentage watched
    if (newWatchedPercentage >= 95) {
      console.log("$$$$$$$$$$$$$$$$$$$");
      let resp = await updateVideoPercentage({
        v_id: video.v_id,
        percentage: newWatchedPercentage,
        u_id: user?.u_id,
      });

      // axios
      //   .post(`/api/videos/${videoId}/percentage`, {
      //     percentage: newWatchedPercentage,
      //   })
      //   .then((response) => {
      //     console.log(response.data);x
      //   })
      //   .catch((error) => {
      //     console.error(error);
      //   });
    }
  };

  const handleVideoEnd = () => {
    // Advance to next video
    console.log("handleVideoEnd", handleVideoEnd);
    // setCurrentVideoIndex(currentVideoIndex + 1);
    // setWatchedPercentage(0);
  };
  return (
    <Fragment>
      <div className="app-action" style={{ height: "100%" }}>
        <Card className="mb-3 m-2">
          <ReactPlayer
            ref={playerRef}
            url={video?.v_link}
            playing
            config={{
              youtube: {
                playerVars: {
                  modestbranding: 1,
                  rel: 0,
                  showinfo: 1,
                },
              },
            }}
            width="100%"
            onProgress={handleProgress}
            onEnded={handleVideoEnd}
          />
          <Progress value={played} max={1}>
            {watchedPercentage}%
          </Progress>
        </Card>
        <div className="d-flex align-content-center justify-content-between w-100 p-1">
          {countPassingScore(video?.total_question, 70) <=
          video?.total_correct_ans ? (
            <Button
              color="primary"
              disabled={
                countPassingScore(video?.total_question, 70) >
                video?.total_correct_ans
              }
              onClick={() => handleChangeStep(2)}
            >
              <ArrowRight
                size={14}
                className="rotate-rtl align-middle ms-sm-50 ms-0"
              />
              <div className="align-middle d-sm-inline-block d-none">Next</div>
            </Button>
          ) : (
            <Button
              color="primary"
              onClick={() => handleChangeStep(4)}
              disabled={
                video?.total_question == null &&
                video?.total_correct_ans == null &&
                watchedPercentage < 95
              }
            >
              <ArrowRight
                size={14}
                className="rotate-rtl align-middle ms-sm-50 ms-0"
              />
              <div className="align-middle d-sm-inline-block d-none">
                Start Quiz
              </div>
            </Button>
          )}

          <button
            style={{
              padding: "6px 0px 6px 6px !important",
              cursor: "pointer",
              backgroundColor: "#7367f0",
              color: "white",
              border: "none",
              borderRadius: "4px",
              padding: "5px 0px 5px 6px",
            }}
            color="primary"
            onClick={handleFullScreen}
          >
            <Maximize
              size={20}
              className="rotate-rtl align-middle me-sm-50 me-0"
            />
          </button>
        </div>
      </div>
    </Fragment>
  );
};

export default QuizVideo;
