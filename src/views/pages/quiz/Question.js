import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Input, Label } from "reactstrap";
import { getOptionsForQuizById } from "../../../@core/api/common_api";
import { notification } from "../../../@core/constants/notification";

const Question = ({ question, currentQuestion, handleAnswer, ansList }) => {
  // console.log("question", question);
  const [optionsList, setOptionsList] = useState([]);

  useEffect(() => {
    // console.log("@@@@@@@@@@@@@@@@@@@@@@@@@@@");
    getOptionsList();
  }, [currentQuestion]);

  const getOptionsList = async () => {
    let resp = await getOptionsForQuizById(question?.q_id);
    // console.log(resp);
    if (resp?.status == 1) {
      setOptionsList(resp?.data);
    } else {
      notification({
        type: "error",
        message: resp?.message,
      });
    }
  };

  return (
    <div>
      <div className="d-flex justify-content-between mb-1">
        <h5>Question{currentQuestion + 1}</h5>1 Mark
      </div>
      <div className="d-flex justify-content-between mb-1">
        <h4>{question?.question}</h4>
      </div>
      <div className="mb-1">
        {optionsList &&
          optionsList?.map((option) => (
            <div className="form-check m-1">
              {/* {console.log(
                "ansList[currentQuestion]?.option == option?.o_id",
                ansList[currentQuestion]?.option,
                option?.o_id
              )} */}
              <Input
                type="radio"
                id={option?.o_id}
                name={question?.q_id}
                value={option?.o_id}
                checked={ansList[currentQuestion]?.answer == option?.o_id}
                onChange={(e) =>
                  handleAnswer(question?.q_id, e.target.value, currentQuestion)
                }
              />
              <Label className="form-check-label" for={option?.o_id}>
                {option?.name}
              </Label>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Question;
