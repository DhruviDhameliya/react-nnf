import React, { Fragment, useState } from "react";

import * as yup from "yup";
import toast from "react-hot-toast";
import { Check, Edit, Plus } from "react-feather";
import { useForm, Controller, useFieldArray } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
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
  getCourses,
  getVideos,
  insertVideo,
  updateVideo,
} from "../../../@core/api/common_api";
import { notification } from "../../../@core/constants/notification";
import DataTable from "react-data-table-component";
import { useEffect } from "react";
import Select from "react-select";
import ReactPlayer from "react-player";
import classnames from "classnames";

const defaultValues = {
  v_name: "",
  v_link: "",
  c_id: "",
};

function Video() {
  const [videoData, setVideoData] = useState(defaultValues);
  const [step, setStep] = useState(0);
  const [videoList, setVideoList] = useState([]);
  const [courseList, setCourseList] = useState([]);
  const [isVideoLoading, setIsVideoLoading] = useState(false);
  const SignupSchema = yup.object().shape({
    c_id: yup.string().required("Please Select Category"),
    v_link: yup.string().required("Video Link is Required"),
    v_name: yup.string().required("Video Name is Required "),
  });

  const [v_img, setV_img] = useState("");

  const {
    setValue,
    reset,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    defaultValues,
    resolver: yupResolver(SignupSchema),
  });

  useEffect(() => {
    getVideoList();
    getCourseList();
  }, []);

  const onHandleChange = (e, name) => {
    setVideoData((prevState) => ({
      ...prevState,
      [name]: e,
    }));
  };

  const onSubmit = async (data) => {
    if (Object.keys(errors).length == 0) {
      console.log("datttt", data, videoData);
      let resp;
      console.log("v_duration: v_duration,v_img: v_img,", videoData, v_img);
      if (step == 1) {
        resp = await insertVideo({
          ...videoData,
          v_img: v_img,
        });
      } else {
        resp = await updateVideo({
          ...videoData,
          v_img: v_img,
        });
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
  };

  const handleReset = () => {
    reset(defaultValues);
    setVideoData(defaultValues);
    setStep(0);
    getVideoList();
  };

  const getCourseList = async () => {
    let resp = await getCourses();
    console.log(resp);
    if (resp?.status == 1) {
      setCourseList(resp?.data);
    // } else {
    //   notification({
    //     type: "error",
    //     message: resp?.message,
    //   });
    }
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

  const handleDuration = async (duration) => {
    console.log("onDuration", duration);
    setVideoData({ ...videoData, v_duration: duration });
  };

  const details = navigator.userAgent;
  const regExp = /android|iphone/i;
  const isMobileDevice = regExp.test(details);

  const handlePlayerReady = async (player) => {
    const videoUrl = player.getInternalPlayer().getVideoUrl();
    const videoId = videoUrl.match(/v=([^&]+)/)[1];
    const thumbnailUrl = `https://img.youtube.com/vi/${videoId}/0.jpg`;
    console.log(thumbnailUrl, "thumbnailUrl");
    // setVideoData({
    //   ...videoData,
    //   v_img: `https://img.youtube.com/vi/${videoId}/0.jpg`,
    // });
    setV_img(thumbnailUrl);
    // v_img = thumbnailUrl; // setThumbnail(thumbnailUrl);
  };

  const column = [
    {
      name: "No.",
      selector: (row) => row?.row_no,
      // cell: (row, index) => index,
      sortable: true,
      width: "70px",
    },
    {
      name: "Name",
      selector: (row) => row?.v_name,
    },
    {
      name: "Link",
      selector: (row) => row?.v_link,
    },
    {
      name: "Category Name",
      selector: (row) => row?.course_name,
    },
    {
      name: "Actions",
      allowOverflow: true,
      cell: (row) => {
        return (
          <div>
            <span title="Edit Video">
              <Edit
                size={15}
                style={{ marginRight: "5px", cursor: "pointer" }}
                color="orange"
                onClick={() => {
                  setStep(2);
                  setVideoData(row);
                  console.log("rowwwww", row);
                  const fields = ["v_name", "v_link","c_id"];
                  fields.forEach((field) => setValue(field, row[field]));
                }}
              />
            </span>
          </div>
        );
      },
    },
  ];

  return (
    <Fragment>
      {step == 0 ? (
        <Card>
          <CardHeader className="flex-md-row flex-column align-md-items-center align-items-center border-bottom">
            <CardTitle tag="h4">Video List</CardTitle>
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
                Add Video
              </Button>
            </div>
            {isVideoLoading ? (
              <div style={{ height: "100px" }}>
                <ComponentSpinner />
              </div>
            ) : (
              <div className="react-dataTable">
                <DataTable
                  noHeader
                  pagination
                  columns={column}
                  // paginationPerPage={10}
                  // className="react-dataTable"
                  // sortIcon={<ChevronDown size={10} />}
                  // paginationDefaultPage={currentPage + 1}
                  // paginationComponent={CustomPagination}
                  data={videoList}
                  // selectableRowsComponent={BootstrapCheckbox}
                  className="react-dataTable"
                />
              </div>
            )}
          </CardBody>
        </Card>
      ) : (
        <Card>
          <CardHeader>
            <CardTitle tag="h4">
              {step == 1 ? "Add Video" : "Edit Video"}
            </CardTitle>
          </CardHeader>
          <CardBody>
            <Form onSubmit={handleSubmit(onSubmit)}>
              <div className="mb-1">
                <Label className="form-label" for="c_id">
                  Category
                </Label>
                <Controller
                  control={control}
                  id="c_id"
                  name="c_id"
                  render={({ field }) => (
                    <Select
                      id="c_id"
                      name="c_id"
                      options={
                        courseList &&
                        courseList?.map((s) => {
                          return { value: s?.c_id, label: s?.course_name };
                        })
                      }
                      autoFocus
                      classNamePrefix="select"
                      className={classnames("react-select", {
                        "is-invalid": errors?.c_id ? true : false,
                      })}
                      // invalid={errors.type_of_work && true}
                      {...field}
                      value={
                        courseList &&
                        courseList?.map((s) => {
                          if (s?.c_id == videoData?.c_id) {
                            console.log("s.name ", s?.course_name);
                            return { label: s?.course_name, value: s?.c_id };
                          }
                        })
                      }
                      onChange={(e) => {
                        field.onChange(e?.value);
                        onHandleChange(e?.value, "c_id");
                      }}
                    />
                  )}
                />
                {errors?.c_id && (
                  <FormFeedback>{errors?.c_id?.message}</FormFeedback>
                )}
              </div>
              <div className="mb-1">
                <Label className="form-label" for="v_name">
                  Video Name
                </Label>
                <Controller
                  id="v_name"
                  name="v_name"
                  control={control}
                  render={({ field }) => (
                    <Input
                      {...field}
                      id="v_name"
                      name="v_name"
                      // autoFocus
                      placeholder="Enter Video Name"
                      invalid={errors.v_name && true}
                      // value={videoData?.name}
                      onChange={(e) => {
                        field.onChange(e.target?.value);
                        onHandleChange(e.target?.value, e.target?.name);
                      }}
                    />
                  )}
                />
                {errors.v_name && (
                  <FormFeedback>{errors.v_name.message}</FormFeedback>
                )}
              </div>
              <div className="mb-1">
                <Label className="form-label" for="v_link">
                  Video Link
                </Label>
                <Controller
                  id="v_link"
                  name="v_link"
                  defaultValue=""
                  control={control}
                  render={({ field }) => (
                    <Input
                      {...field}
                      id="v_link"
                      name="v_link"
                      placeholder="Enter Video Link"
                      invalid={errors.v_link && true}
                      // value={videoData?.name}
                      onChange={(e) => {
                        field.onChange(e.target?.value);
                        onHandleChange(e.target?.value, e.target?.name);
                      }}
                    />
                  )}
                />
                {errors.v_link && (
                  <FormFeedback>{errors.v_link.message}</FormFeedback>
                )}
              </div>
              {console.log(isMobileDevice, "isMobileDevice")}
              <div
                className="d-flex mb-1"
                style={{
                  width: isMobileDevice ? "100%" : "35%",
                }}
              >
                <ReactPlayer
                  url={videoData?.v_link}
                  controls
                  onReady={handlePlayerReady}
                  height={videoData?.v_link != "" ? "250px" : "0px"}
                  onDuration={handleDuration}
                />
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

export default Video;
