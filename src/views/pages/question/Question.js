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
  deleteOption,
  getCourses,
  getOptionsById,
  getQuestions,
  // getVideos,
  insertQuestion,
  insertVideo,
  updateQuestion,
  updateVideo,
} from "../../../@core/api/common_api";
import { notification } from "../../../@core/constants/notification";
import DataTable from "react-data-table-component";
import { useEffect } from "react";
import { SlideDown } from "react-slidedown";
import Repeater from "@components/repeater";
import {
  getVideos,
  getVideosByCourse,
} from "../../../@core/api/service/VideoService";

const defaultValues = {
  question: "",
  v_id: "",
  options: [],
};

function Question() {
  const [questionData, setQuestionData] = useState(defaultValues);
  const [options, setOptions] = useState([]);
  const [step, setStep] = useState(0);
  const [questionList, setQuestionList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [totalQuestions, setTotalQuestions] = useState(0);
  const [videoList, setVideoList] = useState([]);
  const [courseList, setCourseList] = useState([]);
  const [courseVideoList, setCourseVideoList] = useState([]);
  const [isQuestionLoading, setIsQuestionLoading] = useState(false);
  const [ans, setAns] = useState(-1);
  const [count, setCount] = useState(2);
  const [filterData, setFilterData] = useState({});

  useEffect(() => {
    getVideoList();
    // getQuestionsList(currentPage, rowsPerPage);
    getCourseList();
  }, []);

  useEffect(() => {
    // console.log("!!!!!!!!!!!!!!");
    getQuestionsList(currentPage, rowsPerPage);
  }, [filterData]);

  const onHandleChange = (e, name) => {
    // console.log("e, name", e, name);
    setQuestionData((prevState) => ({
      ...prevState,
      [name]: e,
    }));
  };

  const onSubmit = async (e) => {
    e?.preventDefault();
    // console.log("daattttttttttttt", data);
    // if (Object.keys(errors).length == 0) {
    // console.log("ans111111", ans);
    // console.log("x", questionData?.options?.length);
    if (ans == -1) {
      notification({
        type: "error",
        message: "Please select Answer",
      });
    } else if (questionData?.options?.length < 2) {
      notification({
        type: "error",
        message: "Please enter at least 2 Options",
      });
    } else {
      // console.log("datttt", questionData?.options);
      // console.log("ans", ans);
      if (questionData?.options[ans]) {
        questionData.options[ans].ans = 1;
      }

      // questionData?.options?.map(
      //   (o, index) =>
      //     o?.ans &&
      //     (index == ans
      //       ? (questionData.options[index].ans = 1)
      //       : (questionData.options[index].ans = 0))
      // );

      questionData.options = questionData?.options?.filter(
        (o) => o != undefined || o != null
      );
      // console.log("question ", questionData);
      if (questionData?.options?.length < 2) {
        notification({
          type: "error",
          message: "Please enter at least 2 Options",
        });
      } else {
        let resp;
        if (step == 1) {
          resp = await insertQuestion(questionData);
        } else {
          resp = await updateQuestion(questionData);
        }
        // console.log("resspp", resp);
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
    // }
  };

  const handleReset = () => {
    setQuestionData(defaultValues);
    setStep(0);
    getQuestionsList(currentPage, rowsPerPage);
    setCount(2);
    setAns(-1);
  };

  const getVideoList = async () => {
    let resp = await getVideos();
    // console.log(resp);
    if (resp?.status == 1) {
      setVideoList(resp?.data);
    } else {
      notification({
        type: "error",
        message: resp?.message,
      });
      setVideoList([]);
    }
  };

  const getVideoListByCourse = async (c_id) => {
    let resp = await getVideosByCourse(c_id);
    // console.log(resp);
    if (resp?.status == 1) {
      setCourseVideoList(resp?.data);
    } else {
      setCourseVideoList([]);
    }
  };

  const getCourseList = async () => {
    let resp = await getCourses();
    // console.log(resp);
    if (resp?.status == 1) {
      setCourseList(resp?.data);
    } else {
      setCourseList([]);
    }
  };

  // const handleFilterQuestionData = async()=>{
  //   let formData = {...filterData}
  //   let resp = await getQuestions(formData);
  //   console.log(resp);
  //   if (resp?.status == 1) {
  //     setCourseList(resp?.data);
  //   } else {
  //     setCourseList([]);
  //   }
  // }

  const handleFilterClear = async () => {
    setFilterData({
      c_id: 0,
      v_id: 0,
    });
  };

  const getQuestionsList = async (page, perPage) => {
    let formData = {};
    formData = { ...filterData, page: page, perPage: perPage };
    let resp = await getQuestions(formData);
    // console.log(resp);
    if (resp?.status == 1) {
      setQuestionList(resp?.data);
      setTotalQuestions(resp?.t_rows);
    } else {
      notification({
        type: "error",
        message: resp?.message,
      });
      setQuestionList([]);
      setTotalQuestions(0);
    }
  };
  const getOptionsList = async (id) => {
    let resp = await getOptionsById(id);
    // console.log(resp);
    if (resp?.status == 1) {
      // console.log("questionData");
      // setQuestionData({ ...questionData, options: resp?.data });

      // setOptions(resp?.data);
      return resp?.data;
    } else {
      notification({
        type: "error",
        message: resp?.message,
      });
    }
  };

  const deleteForm = async (e, index) => {
    e.preventDefault();
    // console.log(
    //   "questionData?.options[index]?.o_id",
    //   questionData?.options[index]?.o_id
    // );
    if (step == 2 && questionData?.options[index]?.o_id) {
      let id = questionData?.options[index]?.o_id;
      let resp = await deleteOption(id);
      // console.log("resp", resp);
      if (resp?.status == 1) {
        const slideDownWrapper = e.target.closest(".react-slidedown"),
          form = e.target.closest("form");
        let key = e.target
          .closest("form")
          .querySelector("input")
          .getAttribute("id");
        // console.log("anssss", ans);
        if (ans != -1 && ans == key) {
          // console.log("iffans", ans);
          setAns(-1);
        }
        delete questionData?.options[key];
        if (slideDownWrapper) {
          slideDownWrapper.remove();
        } else {
          form.remove();
        }
      } else {
        notification({
          type: "error",
          message: resp?.message,
        });
      }
    } else {
      const slideDownWrapper = e.target.closest(".react-slidedown"),
        form = e.target.closest("form");
      let key = e.target
        .closest("form")
        .querySelector("input")
        .getAttribute("id");
      // console.log("ans", ans);
      if (ans && ans == key) {
        setAns(-1);
      }
      delete questionData?.options[key];
      if (slideDownWrapper) {
        slideDownWrapper.remove();
      } else {
        form.remove();
      }
    }
  };

  const increaseCount = () => {
    setCount(count + 1);
  };

  const handlePerPage = (newPerPage) => {
    // console.log("new", newPerPage);
    setRowsPerPage(newPerPage);
    setCurrentPage(1);
    getQuestionsList(currentPage, newPerPage);
  };

  const handlePagination = (page) => {
    // console.log("new", page);
    setCurrentPage(page);
    getQuestionsList(page, rowsPerPage);
  };

  const column = [
    {
      name: "No.",
      selector: (row) => row.row_no,
      // cell: (row, index) => index,
      sortable: true,
      width: "70px",
    },
    {
      name: "Name",
      selector: (row) => row?.question,
    },
    {
      name: "Answer",
      selector: (row) => row?.c_answer,
    },
    {
      name: "Video",
      selector: (row) => row?.v_name,
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
                onClick={async () => {
                  setStep(2);

                  // const fields = ["question", "v_id"];
                  // fields.forEach((field) => setValue(field, row[field]));
                  // setCount(row?.option_name?.split(",")?.length);
                  let options = await getOptionsList(row?.q_id);
                  // console.log(
                  //   "op",
                  //   options,
                  //   options?.findIndex((o) => o?.ans == 1)
                  // );
                  setCount(options?.length);
                  let index = options?.findIndex((o) => o?.ans == 1);
                  // console.log("index1", index);
                  setAns(index);
                  if (index != -1) {
                    options[index].ans = 0;
                  }
                  setQuestionData({ ...row, options: options });
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
          {data?.option_name?.split(";")?.map((option, index) => (
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

  return (
    <Fragment>
      {step == 0 ? (
        <Card>
          <CardHeader className="flex-md-row flex-column align-md-items-center align-items-center border-bottom">
            <CardTitle tag="h4">Questions List</CardTitle>
          </CardHeader>
          <CardBody>
            <div className="d-flex mt-1 mb-1">
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
            <Row className="d-flex justify-content-end">
              <Col md="4" sm="4" className="mb-1">
                <Select
                  id="c_id"
                  name="c_id"
                  options={
                    courseList &&
                    courseList?.map((s) => {
                      return { value: s?.c_id, label: s?.course_name };
                    })
                  }
                  classNamePrefix="select"
                  className="react-select"
                  value={
                    courseList &&
                    courseList?.map((s) => {
                      if (s?.c_id == filterData?.c_id) {
                        // console.log("s.name ", s?.course_name);
                        return { label: s?.course_name, value: s?.c_id };
                      }
                    })
                  }
                  onChange={(e) => {
                    setFilterData({ ...filterData, c_id: e?.value, v_id: 0 });
                    getVideoListByCourse(e?.value);
                  }}
                />
              </Col>
              <Col md="4" sm="4" className="mb-1">
                <Select
                  id="v_id"
                  name="v_id"
                  options={
                    courseVideoList &&
                    courseVideoList?.map((s) => {
                      return { value: s?.v_id, label: s?.v_name };
                    })
                  }
                  isDisabled={courseVideoList && courseVideoList?.length <= 0}
                  classNamePrefix="select"
                  className="react-select"
                  value={
                    courseVideoList &&
                    courseVideoList?.map((s) => {
                      if (s?.v_id == filterData?.v_id) {
                        // console.log("s.name ", s?.v_name);
                        return { label: s?.v_name, value: s?.v_id };
                      } else return null;
                    })
                  }
                  onChange={(e) => {
                    setFilterData({ ...filterData, v_id: e?.value });
                    // handleFilterQuestionData()
                  }}
                />
              </Col>
              <Col md="2" sm="2" className="mb-1">
                <Button
                  className=" clearBtn"
                  color="dark"
                  onClick={handleFilterClear}
                >
                  Clear
                </Button>
              </Col>
            </Row>

            {isQuestionLoading ? (
              <div style={{ height: "100px" }}>
                <ComponentSpinner />
              </div>
            ) : (
              <div className="react-dataTable">
                <DataTable
                  // noHeader
                  title="Questions List"
                  columns={column}
                  data={questionList}
                  expandableRows
                  expandableRowsComponent={ExpandableRow}
                  // paginationPerPage={10}
                  // className="react-dataTable"
                  // sortIcon={<ChevronDown size={10} />}
                  // paginationDefaultPage={currentPage + 1}
                  // paginationComponent={CustomPagination}
                  // selectableRowsComponent={BootstrapCheckbox}
                  className="react-dataTable"
                  pagination
                  paginationServer
                  paginationTotalRows={totalQuestions}
                  onChangeRowsPerPage={handlePerPage}
                  onChangePage={handlePagination}
                  paginationDefaultPage={currentPage}
                />
              </div>
            )}
          </CardBody>
        </Card>
      ) : (
        <Card>
          <CardHeader>
            <CardTitle tag="h4">
              {step == 1 ? "Add Questions" : "Edit Questions"}
            </CardTitle>
          </CardHeader>
          <CardBody>
            {/* {console.log("sdsdfsdf", questionData)} */}
            <Form onSubmit={onSubmit}>
              <div className="mb-1">
                <Label className="form-label" for="question">
                  Question
                </Label>
                <Input
                  type='textarea'
                  id="question"
                  name="question"
                  autoFocus
                  placeholder="Enter Question"
                  value={questionData?.question}
                  onChange={(e) => {
                    onHandleChange(e.target?.value, e.target?.name);
                  }}
                />
              </div>
              <div className="mb-1">
                <Label className="form-label" for="v_id">
                  Video
                </Label>
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
                  className="react-select"
                  value={
                    videoList &&
                    videoList?.map((s) => {
                      if (s?.v_id == questionData?.v_id) {
                        // console.log("s.name ", s?.v_name);
                        return { label: s?.v_name, value: s?.v_id };
                      } else return null;
                    })
                  }
                  onChange={(e) => {
                    onHandleChange(e?.value, "v_id");
                  }}
                />
              </div>
              <div className="mb-1">
                <Label className="form-label" for="option">
                  Options
                </Label>

                <Repeater count={count}>
                  {
                    (i) => {
                      {
                        /* {Array.from(Array(count), (e, i) => { */
                      }
                      const Tag = i === 0 ? "div" : SlideDown;
                      return (
                        <Tag key={i}>
                          <Form>
                            <Row className="justify-content-between align-items-center">
                              <Col md={4} className="mb-md-0 mb-1">
                                <Input
                                  id={i}
                                  name={i}
                                  // autoFocus
                                  placeholder="Enter Option"
                                  value={questionData?.options[i]?.name}
                                  onChange={(e) => {
                                    // setOptions({
                                    //   ...options,
                                    //   [i]: {
                                    //     ...options?.i,
                                    //     name: e.target?.value,
                                    //     ans: 0,
                                    //   },
                                    // });
                                    // console.log(
                                    //   "e.target?.value",
                                    //   e.target?.value
                                    // );
                                    questionData.options[i] = {
                                      ...questionData?.options[i],
                                      name: e.target?.value,
                                    };
                                    if (questionData.options[i]) {
                                      let items = [...questionData.options];
                                      let item = {
                                        ...items[i],
                                        name: e.target?.value,
                                      };
                                      items[i] = item;
                                      // console.log("item", item, items);
                                      setQuestionData({
                                        ...questionData,
                                        options: items,
                                      });
                                    } else {
                                      setQuestionData({
                                        ...questionData,
                                        options: [
                                          ...options,
                                          { name: e.target.value, ans: 0 },
                                        ],
                                      });
                                    }
                                    // console.log(
                                    //   "questionData",
                                    //   questionData?.options
                                    // );
                                  }}
                                />
                              </Col>
                              <Col md={4} className="mb-md-0 mb-1">
                                <Label
                                  className="form-label mx-1"
                                  for="question"
                                >
                                  Correct Answer
                                </Label>

                                <Input
                                  type="radio"
                                  id={i}
                                  name="ans"
                                  checked={i == ans}
                                  onChange={(e) => {
                                    setAns(i);
                                  }}
                                />
                              </Col>

                              <Col md={2}>
                                <Button
                                  color="danger"
                                  className="text-nowrap px-1"
                                  onClick={(e) => deleteForm(e, i)}
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
                    }
                    // )
                  }
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
