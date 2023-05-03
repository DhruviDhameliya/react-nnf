import React, { Fragment, useState } from "react";

import * as yup from "yup";
import toast from "react-hot-toast";
import { Check, Edit, Plus, X } from "react-feather";
import { useForm, Controller, useFieldArray } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Select from "react-select";
import classnames from "classnames";
import {
  Card,
  CardHeader,
  CardTitle,
  CardBody,
  Button,
  Form,
  Label,
  Input,
  FormFeedback,
  Row,
  Col,
} from "reactstrap";
import {
  getOptionsById,
  getQuestions,
  getVideos,
  insertQuestion,
  insertVideo,
  updateVideo,
} from "../../../@core/api/common_api";
import { notification } from "../../../@core/constants/notification";
import DataTable from "react-data-table-component";
import { useEffect } from "react";
import { SlideDown } from "react-slidedown";
import Repeater from "@components/repeater";

const defaultValues = {
  question: "",
  options: [],
};

function Question() {
  const [questionData, setQuestionData] = useState(defaultValues);
  const [options, setOptions] = useState([]);
  const [step, setStep] = useState(0);
  const [questionList, setQuestionList] = useState([]);
  const [videoList, setVideoList] = useState([]);
  const [isQuestionLoading, setIsQuestionLoading] = useState(false);
  const SignupSchema = yup.object().shape({
    v_id: yup.string().required("Please Select Video"),
    question: yup.string().required("Question is Required "),
  });

  const [ans, setAns] = useState(0);

  const [count, setCount] = useState(1);

  const {
    setValue,
    reset,
    control,
    register,
    handleSubmit,
    getValues,
    watch,
    fields,
    append,
    prepend,
    remove,
    swap,
    move,
    insert,
    replace,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    defaultValues,
    resolver: yupResolver(SignupSchema),
    name: "test",
  });

  useEffect(() => {
    getVideoList();
    getQuestionsList();
  }, []);

  const onHandleChange = (e, name) => {
    console.log("e, name", e, name);
    setQuestionData((prevState) => ({
      ...prevState,
      [name]: e,
    }));
  };

  const onSubmit = async (data) => {
    console.log("daattttttttttttt", data, errors);
    if (Object.keys(errors).length == 0) {
      if (ans == 0) {
        notification({
          type: "error",
          message: "please select Answer",
        });
      } else {
        console.log("datttt", data);
        data.options = options;
        if (data?.options[ans]) {
          data.options[ans].ans = 1;
        }
        console.log("datttt$$$$$", data);
        data.options = Object.values(data.options);
        let resp;
        if (step == 1) {
          resp = await insertQuestion(data);
        } else {
          resp = await updateVideo(questionData);
        }
        console.log("resspp", resp);
        if (resp?.status == 1) {
          notification({
            type: "success",
            message: resp?.message,
          });
          handleReset();
        } else {
          notification({
            type: "error",
            message: resp?.message,
          });
        }
      }
    }
  };

  const handleReset = () => {
    reset(defaultValues);
    setQuestionData(defaultValues);
    setStep(0);
    getQuestionsList();
  };

  const getVideoList = async () => {
    let resp = await getVideos();
    console.log(resp);
    if (resp?.status == 1) {
      setVideoList(resp?.data);
    } else {
      notification({
        type: "error",
        message: resp?.message,
      });
    }
  };

  const getQuestionsList = async () => {
    let resp = await getQuestions();
    console.log(resp);
    if (resp?.status == 1) {
      setQuestionList(resp?.data);
    } else {
      notification({
        type: "error",
        message: resp?.message,
      });
    }
  };
  const getOptionsList = async (id) => {
    let resp = await getOptionsById(id);
    console.log(resp);
    if (resp?.status == 1) {
      setOptions(resp?.data);
    } else {
      notification({
        type: "error",
        message: resp?.message,
      });
    }
  };

  const deleteForm = (e) => {
    e.preventDefault();
    const slideDownWrapper = e.target.closest(".react-slidedown"),
      form = e.target.closest("form");
    let key = e.target
      .closest("form")
      .querySelector("input")
      .getAttribute("id");
    console.log(
      e.target.closest("form").querySelector("input").getAttribute("id"),
      "$$$$$$$$$$$$$$"
    );
    if (ans && ans == key) {
      setAns(0);
    }

    // let x = Object?.keys(options)?.map((k) => {
    //   console.log("kkkkk", k, key);
    //   if (k != key) {
    //     return options[k];
    //   }
    //   return;
    // });
    // console.log(
    //   "x",
    //   x?.filter((i) => i != undefined)
    // );

    delete options[key];
    // console.log("options", options);
    // const newOPtions = options;
    // console.log("newOPtions", newOPtions);
    // setOptions(newOPtions);

    // Reflect.deleteProperty(options, key);

    if (slideDownWrapper) {
      console.log("!!!!!!!!!!!!");
      slideDownWrapper.remove();

      //   setCount(count - 1);
    } else {
      console.log("weerfserf!!");

      form.remove();
      //   setCount(0);
    }
    console.log("form", form);
  };

  const increaseCount = () => {
    setCount(count + 1);
    console.log("count", count);
  };

  const column = [
    {
      name: "No.",
      // selector: (row) => row.row_no,
      cell: (row, index) => index,
      sortable: true,
    },
    {
      name: "Name",
      selector: (row) => row.question,
    },
    {
      name: "Answer",
      selector: (row) => row.c_answer,
    },
    {
      name: "Video",
      selector: (row) => row.v_name,
    },
    {
      name: "Actions",
      allowOverflow: true,
      cell: (row) => {
        return (
          <div>
            <span title="Edit Question">
              <Edit
                size={15}
                style={{ marginRight: "5px", cursor: "pointer" }}
                color="orange"
                onClick={() => {
                  setStep(2);
                  setQuestionData(row);
                  const fields = ["question", "v_id"];
                  fields.forEach((field) => setValue(field, row[field]));
                  setCount(row?.option_name?.split(",")?.length);
                  getOptionsList(row?.q_id);
                }}
              />
            </span>
          </div>
        );
      },
    },
  ];

  const ExpandableRow = ({ data }) => {
    return (
      <>
        <div className="expandable-content p-2">
          {data?.option_name?.split(",")?.map((option, index) => (
            <div>
              <p>
                {index}. : {option}
              </p>
            </div>
          ))}
        </div>
      </>
    );
  };

  console.log("error", errors);
  return (
    <Fragment>
      {step == 0 ? (
        <Card>
          <CardHeader className="flex-md-row flex-column align-md-items-center align-items-center border-bottom">
            <CardTitle tag="h4">Questions List</CardTitle>
          </CardHeader>
          <CardBody>
            <div className="d-flex mt-1">
              <Button
                className="me-1"
                color="primary"
                type="button"
                onClick={() => {
                  setStep(1);
                }}
              >
                <Plus size={15} />
                Add Questions
              </Button>
            </div>
            {isQuestionLoading ? (
              <div style={{ height: "100px" }}>
                <ComponentSpinner />
              </div>
            ) : (
              <DataTable
                noHeader
                pagination
                columns={column}
                // paginationPerPage={10}
                // className="react-dataTable"
                // sortIcon={<ChevronDown size={10} />}
                // paginationDefaultPage={currentPage + 1}
                // paginationComponent={CustomPagination}
                data={questionList}
                expandableRows
                expandableRowsComponent={ExpandableRow}
                // selectableRowsComponent={BootstrapCheckbox}
              />
            )}
          </CardBody>
        </Card>
      ) : (
        <Card>
          <CardHeader>
            <CardTitle tag="h4">
              {" "}
              {step == 1 ? "Add Questions" : "Edit Questions"}
            </CardTitle>
          </CardHeader>
          <CardBody>
            <Form onSubmit={handleSubmit(onSubmit)}>
              <div className="mb-1">
                <Label className="form-label" for="question">
                  Question
                </Label>
                <Controller
                  id="question"
                  name="question"
                  control={control}
                  render={({ field }) => (
                    <Input
                      {...field}
                      id="question"
                      name="question"
                      autoFocus
                      placeholder="Enter Question"
                      invalid={errors.question && true}
                      // value={questionData?.name}
                      onChange={(e) => {
                        field.onChange(e.target?.value);
                        onHandleChange(e.target?.value, e.target?.name);
                      }}
                    />
                  )}
                />
                {errors.question && (
                  <FormFeedback>{errors.question.message}</FormFeedback>
                )}
              </div>
              <div className="mb-1">
                <Label className="form-label" for="v_id">
                  Video
                </Label>
                <Controller
                  control={control}
                  id="v_id"
                  name="v_id"
                  render={({ field }) => (
                    <Select
                      id="v_id"
                      name="v_id"
                      options={
                        videoList &&
                        videoList?.map((s) => {
                          return { value: s?.v_id, label: s?.v_name };
                        })
                      }
                      classNamePrefix="select"
                      className={classnames("react-select", {
                        "is-invalid": errors?.v_id ? true : false,
                      })}
                      // invalid={errors.v_id && true}
                      {...field}
                      value={
                        videoList &&
                        videoList?.map((s) => {
                          if (s?.v_id == questionData?.v_id) {
                            console.log("s.name ", s?.v_name);
                            return { label: s?.v_name, value: s?.v_id };
                          } else return null;
                        })
                      }
                      onChange={(e) => {
                        field.onChange(e?.value);
                        onHandleChange(e?.value, "v_id");
                      }}
                    />
                  )}
                />
                {errors.v_id && (
                  <FormFeedback>{errors.v_id.message}</FormFeedback>
                )}
              </div>
              <div className="mb-1">
                <Label className="form-label" for="option">
                  Options
                </Label>

                <Repeater count={count}>
                  {(i) => {
                    const Tag = i === 0 ? "div" : SlideDown;
                    console.log(count, "count");
                    console.log("i", i);
                    console.log("option", options);
                    return (
                      <Tag key={i}>
                        <Form>
                          <Row className="justify-content-between align-items-center">
                            <Col md={4} className="mb-md-0 mb-1">
                              {/* <Label className="form-label" for={`option-${i}`}>
                                Option
                              </Label> */}
                              <Controller
                                id={`options.${i}.name`}
                                name={`options.${i}.name`}
                                control={control}
                                rules={{ required: true }}
                                render={({
                                  field: { value, onChange, ...field },
                                }) => {
                                  console.log("fdsdf", getValues());
                                  return (
                                    <Input
                                      {...field}
                                      id={`option-${i}`}
                                      name={`option-${i}`}
                                      autoFocus
                                      placeholder="Enter Option"
                                      // invalid={errors?.v_name && true}
                                      // value={questionData?.name}
                                      onChange={(e) => {
                                        onChange(e.target?.value);

                                        setOptions({
                                          ...options,
                                          [`option-${i}`]: {
                                            ...options?.i,
                                            name: e.target?.value,
                                            ans: 0,
                                          },
                                        });
                                      }}
                                    />
                                  );
                                }}
                              />
                            </Col>
                            <Col md={4} className="mb-md-0 mb-1">
                              <Label className="form-label mx-1" for="question">
                                Correct Answer
                              </Label>
                              <Controller
                                id={`options.${i}.ans`}
                                name={`options.${i}.ans`}
                                control={control}
                                render={({
                                  field: { value, onChange, ...field },
                                }) => {
                                  console.log("fdsdf", getValues());
                                  return (
                                    <Input
                                      type="radio"
                                      id={i}
                                      name="ans"
                                      checked={`option-${i}` == ans}
                                      onChange={(e) => {
                                        // onChange(
                                        //   e.target?.checked == true ? 1 : 0
                                        // );
                                        setAns(`option-${i}`);
                                      }}
                                    />
                                  );
                                }}
                              />
                            </Col>

                            <Col md={2}>
                              <Button
                                color="danger"
                                className="text-nowrap px-1"
                                onClick={deleteForm}
                                outline
                              >
                                <X size={14} className="me-50" />
                                <span>Delete</span>
                              </Button>
                            </Col>
                            <Col sm={12}>
                              <hr />
                            </Col>
                          </Row>
                        </Form>
                      </Tag>
                    );
                  }}
                </Repeater>

                <Button
                  className="btn-icon"
                  color="primary"
                  onClick={increaseCount}
                >
                  <Plus size={14} />
                  <span className="align-middle ms-25">Add Option</span>
                </Button>
              </div>

              {/* <div className="mb-1">
                {console.log("OPTION", options)}
                <Select
                  id="ans"
                  name="ans"
                  options={
                    options &&
                    Object.keys(options)?.map((s) => {
                      return { value: s, label: options[s]?.name };
                    })
                    //   options?.map((s) => {
                    //     return { value: s?.attribute_id, label: s?.name };
                    //   }),
                  }
                  classNamePrefix="select"
                  className={classnames("react-select", {
                    "is-invalid": errors?.ans ? true : false,
                  })}
                  // invalid={errors.ans && true}
                  //   {...field}
                  value={ 
                    options &&
                    Object.keys(options)?.map((s) => {
                      if (s == questionData?.ans) {
                        return { label: options[s]?.name, value: s };
                      } else return null;
                    })
                  }
                  onChange={(e) => {
                    // field.onChange(e?.value);
                    onHandleChange(e?.value, "ans");
                  }}
                />
              </div> */}
              <div className="d-flex">
                <Button className="me-1" color="primary" type="submit">
                  {step == 1 ? "Submit" : "Update"}
                </Button>
                <Button
                  outline
                  color="secondary"
                  // type="reset"
                  onClick={handleReset}
                >
                  Cancel
                </Button>
              </div>
            </Form>
          </CardBody>
        </Card>
      )}
    </Fragment>
  );
}

export default Question;
