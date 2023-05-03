import React, { useEffect, useState } from "react";
import { Fragment } from "react";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  CardTitle,
  Progress,
} from "reactstrap";
import {
  getQuestionsForQuiz,
  getQuizResult,
  insertQuiz,
} from "../../../@core/api/common_api";
import secureLocalStorage from "react-secure-storage";
import { notification } from "../../../@core/constants/notification";
import Question from "./Question";
import { ArrowLeft, ArrowRight } from "react-feather";
import QuizPagination from "./QuizPagination";

const Quiz = ({ video, step, handleChangeStep }) => {
  let user = JSON.parse(secureLocalStorage.getItem("userData"));
  const [questionList, setQuestionList] = useState([]);
  const [TotalQuestions, setTotalQuestions] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answerList, setAnswerList] = useState({
    ansList: {},
    u_id: user?.u_id,
    v_id: 0,
    quiz_type: -1,
  });
  const [result, setResult] = useState({});
  const [attempt, setAttempt] = useState({});

  useEffect(() => {
    handleQuizResult();
    getQuestionsList();
  }, []);

  const handleQuizResult = async () => {
    let resp = await getQuizResult(user?.u_id, video?.v_id, step == 2 ? 0 : 1);
    console.log(resp);
    if (resp?.status == 1) {
      setResult(resp?.data);
      setAttempt(parseInt(resp?.data[0]?.attempt) + 1);
    } else {
      setAttempt(1);
      // notification({
      //   type: "error",
      //   message: resp?.message,
      // });
    }
  };

  const getQuestionsList = async () => {
    let resp = await getQuestionsForQuiz(video?.v_id);
    console.log(resp);
    if (resp?.status == 1) {
      setQuestionList(resp?.data);
      setTotalQuestions(resp?.total_question);
      // setCurrentQuestion(1);
    } else {
      notification({
        type: "error",
        message: resp?.message,
      });
    }
  };

  const handleAnswer = async (question, answer, i) => {
    console.log("question, answer, i", question, answer, i);
    // if (answerList[i]) {
    //   let items = [...answerList];
    //   let item = {
    //     ...items[i],
    //     question_id: question,
    //     answer: answer,
    //   };
    //   items[i] = item;
    //   console.log("item", item, items);
    //   setAnswerList(items);
    // } else {
    setAnswerList({
      ...answerList,
      ansList: {
        ...answerList?.ansList,
        [i]: { question_id: question, answer: answer },
      },
    });
    // }
  };

  const handlePageChange = async (index) => {
    console.log(index, "1111111111111111111");
    setCurrentQuestion(index);
  };
  const handleSubmitQuiz = async () => {
    if (TotalQuestions > Object.keys(answerList?.ansList).length) {
      notification({
        type: "error",
        message: "All Questions are mandatory",
      });
    } else {
      console.log("answerListttttttttttttttt", answerList);
      // let data = answerList;
      const entries = Object.values(answerList?.ansList);
      console.log("entries", entries);
      let data = {
        ...answerList,
        u_id: user?.u_id,
        v_id: video?.v_id,
        quiz_type: step == 2 ? 0 : 1,
        total_question: TotalQuestions,
        attempt: attempt,
        ansList: Object.values(answerList?.ansList),
      };
      console.log("data", data);
      let resp = await insertQuiz(data);
      console.log("resspp", resp);
      if (resp?.status == 1) {
        notification({
          type: "success",
          message: resp?.message,
        });
        if (step == 2) {
          handleQuizResult(video?.v_id, 0);
          handleChangeStep(3);
        } else {
          handleQuizResult(video?.v_id, 1);
          handleChangeStep(5);
        }
      } else {
        notification({
          type: "error",
          message: resp?.message,
        });
      }
    }
  };

  return (
    <Fragment>
      <div
        className="app-action pb-3"
        style={{ height: "80%", overflow: "scroll" }}
      >
        <Card className="">
          <CardHeader className="flex-md-row flex-column align-md-items-center align-items-center border-bottom">
            <CardTitle tag="h5">Quiz</CardTitle>
          </CardHeader>
          {console.log(
            "questionList[currentQuestion]",
            questionList[currentQuestion]
          )}
          <CardBody className="m-1">
            {questionList[currentQuestion] && (
              <Question
                question={questionList[currentQuestion]}
                currentQuestion={currentQuestion}
                handleAnswer={handleAnswer}
                ansList={answerList?.ansList}
              />
            )}
            <div className="d-flex align-content-center justify-content-between w-100 p-1">
              <Button
                color="primary"
                disabled={currentQuestion == 0}
                onClick={() => handlePageChange(currentQuestion - 1)}
              >
                <ArrowLeft
                  size={14}
                  className="rotate-rtl align-middle me-sm-50 me-0"
                />
                <div className="align-middle d-sm-inline-block d-none">
                  Previous
                </div>
              </Button>
              {currentQuestion != TotalQuestions - 1 ? (
                <Button
                  color="primary"
                  disabled={currentQuestion == TotalQuestions - 1}
                  onClick={() => handlePageChange(currentQuestion + 1)}
                >
                  <ArrowRight
                    size={14}
                    className="rotate-rtl align-middle ms-sm-50 ms-0"
                  />
                  <div className="align-middle d-sm-inline-block d-none">
                    Next
                  </div>
                </Button>
              ) : (
                <Button color="primary" onClick={() => handleSubmitQuiz()}>
                  {/* <ArrowRight
                    size={14}
                    className="rotate-rtl align-middle ms-sm-50 ms-0"
                  /> */}
                  <div className="align-middle d-sm-inline-block d-none">
                    Submit
                  </div>
                </Button>
              )}
            </div>
          </CardBody>

          <CardFooter className="flex-md-row flex-column align-md-items-center align-items-center border-bottom">
            <div className="d-flex justify-content-between">
              <div>
                {Object.keys(answerList?.ansList).length} / {TotalQuestions}{" "}
                Questions attempted
                <Progress
                  value={
                    (Object.keys(answerList?.ansList).length * 100) /
                    parseInt(TotalQuestions)
                  }
                />
              </div>
              <div>
                <QuizPagination
                  currentQuestion={currentQuestion}
                  TotalQuestions={TotalQuestions}
                  handlePageChange={handlePageChange}
                />
              </div>
            </div>
          </CardFooter>
        </Card>
      </div>
    </Fragment>
  );
};

export default Quiz;
