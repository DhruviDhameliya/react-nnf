import React, { useEffect, useState } from "react";
import { Fragment } from "react";
import secureLocalStorage from "react-secure-storage";
import {
  Badge,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  CardTitle,
} from "reactstrap";
import {
  getQuizResult,
  updateCertificateStatus,
} from "../../../@core/api/common_api";
import { notification } from "../../../@core/constants/notification";
import { countPassingScore } from "../../../@core/components/common/Common";
import { ArrowLeft } from "react-feather";

const QuizResult = ({
  video,
  step,
  videoList,
  currentVideo,
  handleChangeStep,
  preResult,
  postResult,
  handleQuizResult,
  handleNext,
  courseList,
  currentCourse,
}) => {
  let user = JSON.parse(secureLocalStorage.getItem("userData"));
  // const [preResult, setPreResult] = useState({});
  // const [postResult, setPostResult] = useState({});

  useEffect(() => {
    // const newFunction = async () => {
    handleQuizResult(video?.v_id, 0);
    handleQuizResult(video?.v_id, 1);

    // console.log(
    //   "|videoList?.length - 1 === currentVideo",
    //   videoList?.length,
    //   currentVideo
    // );
    if (videoList?.length - 1 === currentVideo) {
      // console.log("₹₹₹₹₹₹₹₹₹₹₹₹", postResult);
      if (
        countPassingScore(postResult?.total_question, 70) <=
        postResult?.total_correct_ans
      ) {
        console.log("₹₹₹₹₹₹₹₹₹₹₹₹############");
      }
    }

    // };
    // newFunction();
  }, []);

  useEffect(() => {
    // console.log(
    //   "|videoList?.length - 1 === currentVideo",
    //   videoList?.length,
    //   currentVideo
    // );
    if (
      videoList?.length - 1 === currentVideo &&
      currentCourse == courseList?.length - 1
    ) {
      // console.log("₹₹₹₹₹₹₹₹₹₹₹₹", postResult);
      if (
        countPassingScore(postResult?.total_question, 70) <=
        postResult?.total_correct_ans
      ) {
        updateCertificateStatus(user?.u_id);
        // console.log("₹₹₹₹₹₹₹₹₹₹₹₹############");
      }
    }
  }, [postResult]);

  // console.log("%%%%%%%%%%%", postResult);

  // const handleQuizResult = async (type) => {
  //   let resp = await getQuizResult(user?.u_id, video?.v_id, type);
  //   console.log(resp);
  //   if (resp?.status == 1) {
  //     return resp?.data[0];
  //   } else {
  //     notification({
  //       type: "error",
  //       message: resp?.message,
  //     });
  //   }
  // };

  return (
    <Fragment>
      <div
        className="app-action pb-3"
        style={{ height: "80%", overflow: "scroll" }}
      >
        <Card className="">
          <CardHeader className="flex-md-row flex-column align-md-items-center align-items-center border-bottom">
            <CardTitle tag="h5">Pre Quiz Result</CardTitle>
          </CardHeader>
          <CardBody className="m-1">
            {/* {console.log(
              "countPassingScore(preResult?.total_question, 70)",
              countPassingScore(preResult?.total_question, 70),
              countPassingScore(preResult?.total_question, 70) <=
                preResult?.total_correct_ans
            )} */}
            <div className="m-1" align="center">
              {
                // Math.ceil((parseInt(preResult?.total_question) * 70) / 100)
                countPassingScore(preResult?.total_question, 70) <=
                preResult?.total_correct_ans ? (
                  <Badge color="light-success">Passed</Badge>
                ) : (
                  <Badge color="light-danger">Failed</Badge>
                )
              }
            </div>
            <div className="m-1" align="center">
              Your Score : <b> {preResult?.total_correct_ans}</b>
            </div>

            <div
              className="my-2 p-1 border d-flex align-md-items-center align-items-center justify-content-around"
              align="center"
            >
              <div>
                <div>Total Questions </div>
                <b>{preResult?.total_question}</b>
              </div>
              <div>
                <div>Passing Score </div>
                <b>
                  {/* {Math.ceil((parseInt(preResult?.total_question) * 70) / 100)} */}
                  {countPassingScore(preResult?.total_question, 70)}
                </b>
              </div>
            </div>
          </CardBody>
        </Card>

        <Card className="">
          <CardHeader className="flex-md-row flex-column align-md-items-center align-items-center border-bottom">
            <CardTitle tag="h5">Post Quiz Result</CardTitle>
          </CardHeader>
          <CardBody className="m-1">
            {/* {console.log(
              "countPassingScore(postResult?.total_question, 70)",
              countPassingScore(postResult?.total_question, 70),
              countPassingScore(postResult?.total_question, 70) <=
                postResult?.total_correct_ans
            )} */}
            <div className="m-1" align="center">
              {
                // Math.ceil((parseInt(preResult?.total_question) * 70) / 100)
                countPassingScore(postResult?.total_question, 70) <=
                postResult?.total_correct_ans ? (
                  // countPassingScore(postResult?.total_question, 70)
                  <Badge color="light-success">Passed </Badge>
                ) : (
                  <Badge color="light-danger">Failed</Badge>
                )
              }
            </div>
            <div className="m-1" align="center">
              Your Score : <b> {postResult?.total_correct_ans}</b>
            </div>

            <div
              className="my-2 p-1 border d-flex align-md-items-center align-items-center justify-content-around"
              align="center"
            >
              <div>
                <div>Total Questions </div>
                <b>{postResult?.total_question}</b>
              </div>
              <div>
                <div>Passing Score </div>
                <b>
                  {countPassingScore(postResult?.total_question, 70)}
                  {/* {Math.ceil((parseInt(postResult?.total_question) * 70) / 100)} */}
                </b>
              </div>
            </div>
          </CardBody>

          <CardFooter>
            <div className="d-flex align-content-center justify-content-between w-100 p-1">
              <Button
                color="primary"
                // disabled={currentQuestion == 0}
                onClick={() => handleChangeStep(3)}
              >
                {/* <ArrowLeft
                  size={14}
                  className="rotate-rtl align-middle me-sm-50 me-0"
                /> */}
                <div className="align-middle d-sm-inline-block d-none">
                  Replay
                </div>
              </Button>
              <Button
                color="primary"
                disabled={
                  countPassingScore(postResult?.total_question, 70) >
                  postResult?.total_correct_ans
                }
                onClick={() => {
                  // console.log("currentVideo", currentVideo);
                  handleNext(currentVideo + 1);
                }}
              >
                {/* <ArrowRight
                  size={14}
                  className="rotate-rtl align-middle ms-sm-50 ms-0"
                /> */}
                <div className="align-middle d-sm-inline-block d-none">
                  Next
                </div>
              </Button>
            </div>
          </CardFooter>
        </Card>
      </div>
    </Fragment>
  );
};

export default QuizResult;
