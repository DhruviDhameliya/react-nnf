import React from "react";
import { Fragment } from "react";
import { ChevronRight } from "react-feather";
import { Form, Row, Col, Label, Button, Input, FormFeedback } from "reactstrap";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, Controller } from "react-hook-form";
import { useEffect } from "react";
import { updatePassword, updateProfile } from "../../../@core/api/common_api";
import secureLocalStorage from "react-secure-storage";
import { notification } from "../../../@core/constants/notification";
import InputPasswordToggle from "@components/input-password-toggle";

const PersonalUpdate = (props) => {
  const { registerData, toggle } = props;

  const defaultValues = {
    o_password: "",
    n_password: "",
    confirmPassword: "",
  };
  const SignupSchema = yup.object().shape({
    o_password: yup.string().required("Password is Required"),
    n_password: yup.string().required("Password is Required"),
    confirmPassword: yup
      .string()
      .required("Confirm Password is Required")
      .oneOf([yup.ref(`n_password`), null], "Passwords must match"),
  });

  const {
    setValue,
    control,
    setError,
    handleSubmit,
    register,
    clearErrors,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    defaultValues,
    resolver: yupResolver(SignupSchema),
  });

  const onSubmit = async (data) => {
    // console.log("data", data);
    // console.log("errorsssssssssssss", errors);
    // await checkMail(data?.u_email);
    // await checkMobileNumber(data?.mobile);
    // if (Object.values(data).every((field) => field.length > 0)) {
    let passwordData = { ...data, u_id: registerData?.u_id };
    if (Object.keys(errors).length == 0) {
      let resp = await updatePassword(passwordData);
      // console.log("resspp", resp);
      if (resp?.status == 1) {
        notification({
          type: "success",
          position: "top-right",
          message: resp?.message,
        });
        toggle("1");
        // secureLocalStorage.setItem("userData", JSON.stringify(registerData));
      } else {
        notification({
          type: "error",
          position: "top-right",
          message: resp?.message,
        });
      }
    }
  };

  return (
    <Fragment>
      <div className="content-header mb-2">
        <h2 className="fw-bolder mb-75">Password</h2>
      </div>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Row>
          <Col md="6" className="mb-1">
            <Controller
              id="o_password"
              name="o_password"
              control={control}
              render={({ field }) => (
                <InputPasswordToggle
                  autoFocus
                  id="o_password"
                  name="o_password"
                  label="Old Password"
                  htmlFor="o_password"
                  className="input-group-merge"
                  invalid={errors?.o_password && true}
                  {...field}
                  onChange={(e) => {
                    field.onChange(e.target?.value);
                    // onHandleChange(e.target?.value, e.target?.name);
                  }}
                />
              )}
            />
            {errors?.o_password && (
              <FormFeedback>{errors?.o_password?.message}</FormFeedback>
            )}
          </Col>
          <Col md="6" className="mb-1">
            <Controller
              id="n_password"
              name="n_password"
              control={control}
              render={({ field }) => (
                <InputPasswordToggle
                  id="n_password"
                  name="n_password"
                  label="New Password"
                  htmlFor="n_password"
                  className="input-group-merge"
                  invalid={errors?.n_password && true}
                  {...field}
                  onChange={(e) => {
                    field.onChange(e.target?.value);
                    // onHandleChange(e.target?.value, e.target?.name);
                  }}
                />
              )}
            />
            {errors?.n_password && (
              <FormFeedback>{errors?.n_password?.message}</FormFeedback>
            )}
          </Col>
          <Col md="6" className="mb-1">
            <Controller
              control={control}
              id="confirmPassword"
              name="confirmPassword"
              render={({ field }) => (
                <InputPasswordToggle
                  id="confirmPassword"
                  name="confirmPassword"
                  label="Confirm Password"
                  htmlFor="confirmPassword"
                  className="input-group-merge"
                  invalid={errors?.confirmPassword && true}
                  {...field}
                  onChange={(e) => {
                    field.onChange(e.target?.value);
                    // onHandleChange(e.target?.value, e.target?.name);
                  }}
                />
              )}
            />
            {errors?.confirmPassword && (
              <FormFeedback>{errors?.confirmPassword?.message}</FormFeedback>
            )}
          </Col>
        </Row>
        <div className="d-flex justify-content-between mt-2">
          <Button type="submit" color="primary" className="btn-next">
            Submit
          </Button>
        </div>
      </Form>
    </Fragment>
  );
};

export default PersonalUpdate;
