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
  insertCourse,
  updateCourse,
} from "../../../@core/api/common_api";
import { notification } from "../../../@core/constants/notification";
import DataTable from "react-data-table-component";
import { useEffect } from "react";
import ReactPlayer from "react-player";

const defaultValues = {
  course_name: "",
};

function Course() {
  const [courseData, setCourseData] = useState(defaultValues);
  const [step, setStep] = useState(0);
  const [courseList, setCourseList] = useState([]);
  const [isCourseLoading, setIsCourseLoading] = useState(false);
  const SignupSchema = yup.object().shape({
    course_name: yup.string().required("Category Name is Required "),
  });

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
    getCourseList();
  }, []);

  const onHandleChange = (e, name) => {
    setCourseData((prevState) => ({
      ...prevState,
      [name]: e,
    }));
  };

  const onSubmit = async (data) => {
    if (Object.keys(errors).length == 0) {
      console.log("datttt", data, courseData);
      let resp;
      console.log("v_duration: v_duration,v_img: v_img,", courseData);
      if (step == 1) {
        resp = await insertCourse(courseData);
      } else {
        resp = await updateCourse(courseData);
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
    setCourseData(defaultValues);
    setStep(0);
    getCourseList();
  };

  const getCourseList = async () => {
    let resp = await getCourses();
    console.log(resp);
    if (resp?.status == 1) {
      setCourseList(resp?.data);
    } else {
      notification({
        type: "error",
        message: resp?.message,
      });
    }
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
      selector: (row) => row?.course_name,
    },
    {
      name: "Actions",
      allowOverflow: true,
      cell: (row) => {
        return (
          <div>
            <span title="Edit Category">
              <Edit
                size={15}
                style={{ marginRight: "5px", cursor: "pointer" }}
                color="orange"
                onClick={() => {
                  setStep(2);
                  setCourseData(row);
                  console.log("rowwwww", row);
                  const fields = ["course_name"];
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
            <CardTitle tag="h4">Category List</CardTitle>
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
                Add Category
              </Button>
            </div>
            {isCourseLoading ? (
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
                data={courseList}
                // selectableRowsComponent={BootstrapCheckbox}
              />
            )}
          </CardBody>
        </Card>
      ) : (
        <Card>
          <CardHeader>
            <CardTitle tag="h4">
              {step == 1 ? "Add Category" : "Edit Category"}
            </CardTitle>
          </CardHeader>
          <CardBody>
            <Form onSubmit={handleSubmit(onSubmit)}>
              <div className="mb-1">
                <Label className="form-label" for="course_name">
                  Category Name
                </Label>
                <Controller
                  id="course_name"
                  name="course_name"
                  control={control}
                  render={({ field }) => (
                    <Input
                      {...field}
                      id="course_name"
                      name="course_name"
                      autoFocus
                      placeholder="Enter Category Name"
                      invalid={errors.course_name && true}
                      // value={courseData?.name}
                      onChange={(e) => {
                        field.onChange(e.target?.value);
                        onHandleChange(e.target?.value, e.target?.name);
                      }}
                    />
                  )}
                />
                {errors.course_name && (
                  <FormFeedback>{errors.course_name.message}</FormFeedback>
                )}
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

export default Course;
