import React from "react";
import { Fragment } from "react";
import ReactPlayer from "react-player";
import {
  Card,
  CardBody,
  CardImg,
  CardLink,
  CardText,
  CardTitle,
  Col,
  ListGroup,
  ListGroupItem,
  Row,
} from "reactstrap";
import {
  countPassingScore,
  format,
} from "../../../@core/components/common/Common";
import PerfectScrollbar from "react-perfect-scrollbar";
import {
  CheckCircle,
  FileText,
  Lock,
  Percent,
  PlayCircle,
  Unlock,
} from "react-feather";
import secureLocalStorage from "react-secure-storage";
import { updateVideoPercentage } from "../../../@core/api/common_api";

function Videos({
  videoList,
  handleChangeVideo,
  handleChangeStep,
  preResult,
  postResult,
  handleQuizResult,
  // changeVideo,
}) {
  let user = JSON.parse(secureLocalStorage.getItem("userData"));
  // const config = {
  //   file: {
  //     attributes: {
  //       disablePictureInPicture: true,
  //       controlsList: "nodownload",
  //     },
  //   },
  //   youtube: {
  //     playerVars: {
  //       disablekb: 1, // disable keyboard controls
  //     },
  //   },
  //   disableClick: true, // disable click event
  // };

  const changeVideo = async (video, index) => {
    if (
      index == 0 ||
      (index != 0 &&
        countPassingScore(videoList[index - 1]?.total_question, 70) <=
          videoList[index - 1]?.total_correct_ans)
    ) {
      if (index == 0 && video?.percentage == null) {
        let resp = await updateVideoPercentage({
          v_id: video.v_id,
          percentage: 0,
          u_id: user?.u_id,
        });
      }
      console.log(preResult, "preResulfggggggggggggd");
      await handleChangeVideo(index);
      let pre = await handleQuizResult(video?.v_id, 0);
      let post = await handleQuizResult(video?.v_id, 1);
      console.log(preResult, pre, "preResultttttttttttttttttttttttt");
      if (Object?.keys(pre)?.length != 0) {
        console.log("ifffffffffff");
        await handleChangeStep(3);
      } else if (Object?.keys(post)?.length != 0) {
        console.log("elseeeeeeeeeeeeeee");
        await handleChangeStep(5);
      } else if (index == 0) {
        await handleChangeStep(1);
      } else {
        handleChangeStep(2);
      }
    }
  };

  return (
    <Fragment>
      <div className="email-app-list cursor-pointer">
        <PerfectScrollbar className="" options={{ wheelPropagation: false }}>
          <Row>
            {videoList &&
              videoList?.map((video, index) => {
                return (
                  <Col md="6" lg="3">
                    <Card
                      onClick={async () => {
                        await changeVideo(video, index);
                      }}
                    >
                      <CardImg top src={video?.v_img} alt="Card cap" />
                      {/* <ReactPlayer
                    url={video?.v_link}
                    // controls
                    alt="Card cap"
                    height="100%"
                    width="100%"
                    // disableClick={true}
                    config={config}
                    // pip={true}
                    // onDisablePIP={handleDisablePIP}
                    // onDuration={handleDuration}
                  /> */}
                      <CardBody>
                        <CardTitle tag="h4">{video?.v_name}</CardTitle>
                        <CardText>
                          <div>
                            {video?.total_question &&
                            video?.total_correct_ans &&
                            countPassingScore(video?.total_question, 70) <=
                              video?.total_correct_ans ? (
                              <CheckCircle
                                size={20}
                                className="me-75"
                                color="green"
                              />
                            ) : countPassingScore(video?.total_question, 70) >
                              video?.total_correct_ans ? (
                              <PlayCircle size={20} className="me-75" />
                            ) : index == 0 ||
                              (index != 0 &&
                                countPassingScore(
                                  videoList[index - 1]?.total_question,
                                  70
                                ) <=
                                  videoList[index - 1]?.total_correct_ans) ? (
                              <Unlock size={20} className="me-75" />
                            ) : (
                              <Lock size={20} className="me-75" />
                            )}
                            Duration : {format(video?.v_duration)}
                          </div>
                          <div className="mt-2">
                            {video?.total_correct_ans && video?.total_question && (
                              <>
                                <FileText size={18} className="me-75" />
                                Score :{" "}
                                {video?.total_correct_ans +
                                  " / " +
                                  video?.total_question}
                              </>
                            )}
                          </div>
                        </CardText>
                      </CardBody>
                    </Card>
                  </Col>
                );
              })}
          </Row>
        </PerfectScrollbar>
      </div>
    </Fragment>
  );
}

export default Videos;
