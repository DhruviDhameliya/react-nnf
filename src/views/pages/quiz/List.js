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
import {
  checkCourseAccess,
  getVideos,
  getVideosWithPercentage,
  updateVideoPercentage,
} from "../../../@core/api/common_api";

function List({
  getVideoList,
  courseList,
  handleChangeCourse,
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

  const getCourseAccess = async (c_id) => {
    let resp = await getVideosWithPercentage(user?.u_id, c_id);
    if (resp?.status == 1) {
      return resp?.data;
    }
  };

  const changeCourse = async (course, index) => {
    let accessResp = [];
    let obj;
    let access = false;
    if (index != 0) {
      accessResp = await getCourseAccess(courseList[index - 1]?.c_id);
      console.log("accessResp", accessResp);
      if (accessResp && accessResp?.length > 0) {
        obj = accessResp.filter(
          (o) =>
            o.percentage == null ||
            o.total_question == null ||
            o.total_correct_ans == null
        );
      }

      if (
        obj.length == 0 &&
        countPassingScore(
          accessResp[accessResp?.length - 1]?.total_question,
          70
        ) <= accessResp[accessResp?.length - 1]?.total_correct_ans
      ) {
        access = true;
      }
    }
    console.log("obj", obj, access);

    if (index == 0 || access == true) {
      handleChangeCourse(index);
      let videos = await getVideoList(index);
      console.log("videoList", videoList, videos);

      if (videos && videos?.length > 0) {
        let newObj = videos.filter(
          (o) =>
            o.percentage == null ||
            o.total_question == null ||
            o.total_correct_ans == null ||
            (o.total_question != null &&
              o.total_correct_ans != null &&
              countPassingScore(o?.total_question, 70) > o?.total_correct_ans)
        );
        let video = newObj?.length == 0 ? videos[0] : newObj[0];

        console.log("video", video, newObj);
        if (video?.percentage == null) {
          let resp = await updateVideoPercentage({
            v_id: video.v_id,
            percentage: 0,
            u_id: user?.u_id,
          });
        }

        let i = videos.findIndex((x) => x?.v_id == video?.v_id);
        await handleChangeVideo(i);
        let pre = await handleQuizResult(video?.v_id, 0);
        let post = await handleQuizResult(video?.v_id, 1);
        console.log(preResult, pre, "preResultttttttttttttttttttttttt");
        if (Object?.keys(pre)?.length != 0) {
          console.log("ifffffffffff");
          await handleChangeStep(3);
        } else if (Object?.keys(post)?.length != 0) {
          console.log("elseeeeeeeeeeeeeee");
          await handleChangeStep(5);
        } else if (i == 0) {
          await handleChangeStep(1);
        } else {
          handleChangeStep(2);
        }
      }
    }

    // if (index == 0 && video?.percentage == null) {
    //   let resp = await updateVideoPercentage({
    //     v_id: video.v_id,
    //     percentage: 0,
    //     u_id: user?.u_id,
    //   });
    // }

    // if (
    //   index == 0 ||
    //   (index != 0 &&
    //     countPassingScore(videoList[index - 1]?.total_question, 70) <=
    //       videoList[index - 1]?.total_correct_ans)
    // ) {
    //   if (index == 0 && video?.percentage == null) {
    //     let resp = await updateVideoPercentage({
    //       v_id: video.v_id,
    //       percentage: 0,
    //       u_id: user?.u_id,
    //     });
    //   }
    //   console.log(preResult, "preResulfggggggggggggd");
    //   await handleChangeVideo(index);
    //   let pre = await handleQuizResult(video?.v_id, 0);
    //   let post = await handleQuizResult(video?.v_id, 1);
    //   console.log(preResult, pre, "preResultttttttttttttttttttttttt");
    //   if (Object?.keys(pre)?.length != 0) {
    //     console.log("ifffffffffff");
    //     await handleChangeStep(3);
    //   } else if (Object?.keys(post)?.length != 0) {
    //     console.log("elseeeeeeeeeeeeeee");
    //     await handleChangeStep(5);
    //   } else if (index == 0) {
    //     await handleChangeStep(1);
    //   } else {
    //     handleChangeStep(2);
    //   }
    // }
  };

  return (
    <Fragment>
      <div className="email-app-list cursor-pointer w-100">
        <PerfectScrollbar className="" options={{ wheelPropagation: false }}>
          <Row>
            {courseList &&
              courseList?.map((course, index) => {
                let obj;
                let obj1;
                let access = false;
                if (index != 0) {
                  if (
                    courseList[index - 1]?.videoList &&
                    courseList[index - 1]?.videoList?.length > 0
                  ) {
                    obj1 = courseList[index - 1]?.videoList.filter(
                      (o) =>
                        o.percentage == null ||
                        o.total_question == null ||
                        o.total_correct_ans == null
                    );
                  }

                  if (
                    obj1.length == 0 &&
                    countPassingScore(
                      courseList[index - 1]?.videoList[
                        courseList[index - 1]?.videoList?.length - 1
                      ]?.total_question,
                      70
                    ) <=
                      courseList[index - 1]?.videoList[
                        courseList[index - 1]?.videoList?.length - 1
                      ]?.total_correct_ans
                  ) {
                    access = true;
                  }
                  console.log("accesssssss33333333", access);

                  if (course?.videoList && course?.videoList?.length > 0) {
                    obj = course?.videoList.filter(
                      (o) =>
                        o.percentage == null ||
                        o.total_question == null ||
                        o.total_correct_ans == null
                    );
                  }
                  if (
                    obj.length == 0 &&
                    countPassingScore(
                      course?.videoList[course?.videoList?.length - 1]
                        ?.total_question,
                      70
                    ) <=
                      course?.videoList[course?.videoList?.length - 1]
                        ?.total_correct_ans
                  ) {
                    access = access == true && "complete";
                  } else if (obj.length == 0) {
                    access = access == true && "playing";
                  }
                  console.log("accesssssss1111111111", access);
                } else {
                  if (course?.videoList && course?.videoList?.length > 0) {
                    obj = course?.videoList.filter(
                      (o) =>
                        o.percentage == null ||
                        o.total_question == null ||
                        o.total_correct_ans == null
                    );
                  }
                  if (
                    obj.length == 0 &&
                    countPassingScore(
                      course?.videoList[course?.videoList?.length - 1]
                        ?.total_question,
                      70
                    ) <=
                      course?.videoList[course?.videoList?.length - 1]
                        ?.total_correct_ans
                  ) {
                    access = "complete";
                  } else {
                    access = true;
                  }
                }
                console.log("access", access);

                return (
                  <Col md="6" lg="3">
                    <Card
                      onClick={async () => {
                        await changeCourse(course, index);
                      }}
                    >
                      <CardImg top src={course?.v_img} alt="Card cap" />
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
                        <CardTitle tag="h4">{course?.course_name}</CardTitle>
                        <CardText>
                          <div>
                            {access == "complete" ? (
                              <CheckCircle
                                size={20}
                                className="me-75"
                                color="green"
                              />
                            ) : access == true ? (
                              <Unlock size={20} className="me-75" />
                            ) : access == "playing" ? (
                              <PlayCircle size={20} className="me-75" />
                            ) : (
                              <Lock size={20} className="me-75" />
                            )}
                            {/* {course?.total_question &&
                            course?.total_correct_ans &&
                            countPassingScore(course?.total_question, 70) <=
                            course?.total_correct_ans ? (
                              <CheckCircle
                                size={20}
                                className="me-75"
                                color="green"
                              />
                            ) : countPassingScore(course?.total_question, 70) >
                            course?.total_correct_ans ? (
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
                            )} */}
                            Total Videos : {course?.total_videos}
                          </div>
                          {/* <div className="mt-2">
                            {video?.total_correct_ans && video?.total_question && (
                              <>
                                <FileText size={18} className="me-75" />
                                Score :{" "}
                                {video?.total_correct_ans +
                                  " / " +
                                  video?.total_question}
                              </>
                            )}
                          </div> */}
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

export default List;
