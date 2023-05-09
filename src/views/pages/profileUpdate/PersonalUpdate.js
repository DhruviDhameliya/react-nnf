import React from "react";
import { Fragment } from "react";
import { ChevronRight } from "react-feather";
import { Form, Row, Col, Label, Button, Input, FormFeedback } from "reactstrap";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, Controller } from "react-hook-form";
import { useEffect } from "react";
import { updateProfile } from "../../../@core/api/common_api";
import secureLocalStorage from "react-secure-storage";
import { notification } from "../../../@core/constants/notification";

const PersonalUpdate = (props) => {
  const {
    onHandleChange,
    registerData,
  } = props;
  const SignupSchema = yup.object().shape({
    name: yup.string().required("Name is Required"),
    age: yup.string().required("Age is Required"),
    u_email: yup
      .string()
      .email("Please enter valid Email")
      .required("Email is Required"),
    address: yup.string().required("Address is Required"),
    no_of_children: yup.string().required("Number of Children is Required"),
    city: yup.string().required("City is Required"),
    mobile: yup
      .string()
      .required("Mobile is Required")
      .length(10, "Mobile Number Must be 10 character long"),
    pincode: yup
      .string()
      .required("PIN Code is Required")
      .length(6, "PIN Code Must be 6 character long"),
    gender: yup.string().required("Gender is Required"),
    marital_status: yup.string().required("Marital Status is Required"),
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
    registerData,
    resolver: yupResolver(SignupSchema),
  });

  useEffect(() => {
    Object?.keys(registerData)?.forEach((field) => {
      console.log("field", field, registerData[field]);
      setValue(field, registerData[field]);
    });
  }, []);

  const onSubmit = async (data) => {
    console.log("data", data);
    console.log("errorsssssssssssss", errors);
    // await checkMail(data?.u_email);
    // await checkMobileNumber(data?.mobile);
    // if (Object.values(data).every((field) => field.length > 0)) {
    if (Object.keys(errors).length == 0) {
      let resp = await updateProfile(registerData);
      console.log("resspp", resp);
      if (resp?.status == 1) {
        notification({
          type: "success",
          position: "top-right",
          message: resp?.message,
        });
        secureLocalStorage.setItem("userData", JSON.stringify(registerData));
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
        <h2 className="fw-bolder mb-75">Personal Information</h2>
        <span>Enter Your Information.</span>
      </div>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Row>
          {/* {console.log("registerData", registerData)} */}
          <Col md="6" className="mb-1">
            <Label className="form-label" for="name">
              Name
            </Label>
            <Controller
              id="name"
              name="name"
              control={control}
              render={({ field }) => (
                <Input
                  id="name"
                  name="name"
                  value={registerData?.name}
                  autoFocus
                  placeholder="Enter Name"
                  {...field}
                  onChange={(e) => {
                    field.onChange(e.target?.value);
                    onHandleChange(e.target?.value, e.target?.name);
                  }}
                  invalid={errors?.name && true}
                />
              )}
            />
            {errors?.name && (
              <FormFeedback>{errors?.name?.message}</FormFeedback>
            )}
          </Col>
          <Col md="6" className="mb-1">
            <Label className="form-label" for="age">
              Age
            </Label>
            <Controller
              id="age"
              name="age"
              control={control}
              render={({ field }) => (
                <Input
                  id="age"
                  name="age"
                  type="number"
                  placeholder="Enter Age"
                  invalid={errors?.age && true}
                  {...field}
                  onChange={(e) => {
                    field.onChange(e.target?.value);
                    onHandleChange(e.target?.value, e.target?.name);
                  }}
                />
              )}
            />
            {errors?.age && <FormFeedback>{errors?.age?.message}</FormFeedback>}
          </Col>

          <Col md="6" className="mb-1">
            <Label className="form-label" for="gender">
              Sex
            </Label>

            <Controller
              id="gender"
              name="gender"
              control={control}
              render={({ field }) => (
                <div className="demo-inline-spacing">
                  <div
                    className="form-check"
                    style={{ marginTop: "5px !important" }}
                  >
                    <Input
                      type="radio"
                      invalid={errors?.gender && true}
                      {...field}
                      id="male"
                      value="0"
                      name="gender"
                      checked={registerData?.gender == 0}
                      onChange={(e) => {
                        console.log("e.target.value", e.target?.value);
                        field.onChange(e.target?.value);
                        onHandleChange(e.target?.value, e.target?.name);
                      }}
                    />
                    <Label className="form-check-label" for="male">
                      Male
                    </Label>
                  </div>
                  <div
                    className="form-check"
                    style={{ marginTop: "5px !important" }}
                  >
                    <Input
                      type="radio"
                      invalid={errors?.gender && true}
                      {...field}
                      checked={registerData?.gender == 1}
                      id="female"
                      value="1"
                      name="gender"
                      onChange={(e) => {
                        console.log("e.target.value", e.target?.value);
                        field.onChange(e.target?.value);
                        onHandleChange(e.target?.value, e.target?.name);
                      }}
                    />
                    <Label className="form-check-label" for="female">
                      Female
                    </Label>
                  </div>
                </div>
              )}
            />

            {errors?.gender && (
              <FormFeedback>{errors?.gender?.message}</FormFeedback>
            )}
          </Col>

          <Col md="6" className="mb-1">
            <Label className="form-label" for="marital_status">
              Marital status
            </Label>
            <Controller
              id="marital_status"
              name="marital_status"
              control={control}
              render={({ field }) => (
                <div className="demo-inline-spacing">
                  <div
                    className="form-check"
                    style={{ marginTop: "5px !important" }}
                  >
                    <Input
                      type="radio"
                      name="marital_status"
                      invalid={errors?.marital_status && true}
                      {...field}
                      id="married"
                      value="1"
                      checked={registerData?.marital_status == 1}
                      onChange={(e) => {
                        field.onChange(e.target?.value);
                        onHandleChange(e.target?.value, e.target?.name);
                      }}
                    />
                    <Label className="form-check-label" for="married">
                      Married
                    </Label>
                  </div>
                  <div
                    className="form-check"
                    style={{ marginTop: "5px !important" }}
                  >
                    <Input
                      type="radio"
                      name="marital_status"
                      invalid={errors?.marital_status && true}
                      {...field}
                      checked={registerData?.marital_status == 0}
                      id="unmarried"
                      value="0"
                      onChange={(e) => {
                        field.onChange(e.target?.value);
                        onHandleChange(e.target?.value, e.target?.name);
                      }}
                    />
                    <Label className="form-check-label" for="unmarried">
                      Unmarried
                    </Label>
                  </div>
                </div>
              )}
            />
            {errors?.marital_status && (
              <FormFeedback>{errors?.marital_status?.message}</FormFeedback>
            )}
          </Col>

          <Col sm="6" className="mb-1">
            <Label className="form-label" for="no_of_children">
              No. of children
            </Label>
            <Controller
              id="no_of_children"
              name="no_of_children"
              control={control}
              render={({ field }) => (
                <Input
                  id="no_of_children"
                  name="no_of_children"
                  type="number"
                  invalid={errors?.no_of_children && true}
                  {...field}
                  placeholder="Enter no of children"
                  onChange={(e) => {
                    field.onChange(e.target?.value);
                    onHandleChange(e.target?.value, e.target?.name);
                  }}
                />
              )}
            />
            {errors?.no_of_children && (
              <FormFeedback>{errors?.no_of_children?.message}</FormFeedback>
            )}
          </Col>

          <Col sm="12" className="mb-1">
            <Label className="form-label" for="address">
              Address
            </Label>
            <Controller
              id="address"
              name="address"
              control={control}
              render={({ field }) => (
                <Input
                  id="address"
                  name="address"
                  invalid={errors?.address && true}
                  {...field}
                  placeholder="Enter Address"
                  onChange={(e) => {
                    field.onChange(e.target?.value);
                    onHandleChange(e.target?.value, e.target?.name);
                  }}
                />
              )}
            />
            {errors?.address && (
              <FormFeedback>{errors?.address?.message}</FormFeedback>
            )}
          </Col>

          <Col md="6" className="mb-1">
            <Label className="form-label" for="city">
              City
            </Label>
            <Controller
              id="city"
              name="city"
              control={control}
              render={({ field }) => (
                <Input
                  id="city"
                  name="city"
                  placeholder="Enter City"
                  invalid={errors.city && true}
                  {...field}
                  onChange={(e) => {
                    field.onChange(e.target?.value);
                    onHandleChange(e.target?.value, e.target?.name);
                  }}
                />
              )}
            />
            {errors?.city && (
              <FormFeedback>{errors?.city?.message}</FormFeedback>
            )}
          </Col>

          <Col md="6" className="mb-1">
            <Label className="form-label" for="pincode">
              PIN code
            </Label>
            <Controller
              id="pincode"
              name="pincode"
              control={control}
              render={({ field }) => (
                <Input
                  id="pincode"
                  name="pincode"
                  type="number"
                  placeholder="Enter PIN Code"
                  invalid={errors.pincode && true}
                  {...field}
                  onChange={(e) => {
                    field.onChange(e.target?.value);
                    onHandleChange(e.target?.value, e.target?.name);
                  }}
                  onBlur={(e) => {
                    field.onChange(e.target?.value);
                    onHandleChange(e.target?.value, e.target?.name);
                    if (e.target?.value && e.target?.value?.length != 6) {
                      console.log("ifffff");
                      setError("pincode", {
                        type: "custom",
                        message: "PIN Code Must be 6 character long",
                      });
                    } else {
                      console.log("elseeeeeeeee");
                      clearErrors("pincode");
                    }
                  }}
                />
              )}
            />
            {errors?.pincode && (
              <FormFeedback>{errors?.pincode?.message}</FormFeedback>
            )}
          </Col>

          <Col md="6" className="mb-1">
            <Label className="form-label" for="mobile">
              Mobile Number
            </Label>
            <Controller
              id="mobile"
              name="mobile"
              control={control}
              render={({ field }) => (
                <Input
                  disabled
                  id="mobile"
                  name="mobile"
                  type="number"
                  placeholder="Enter Mobile Number"
                  invalid={errors.mobile && true}
                  {...field}
                  onChange={(e) => {
                    field.onChange(e.target?.value);
                    onHandleChange(e.target?.value, e.target?.name);
                  }}
                  onBlur={(e) => {
                    field.onChange(e.target?.value);
                    onHandleChange(e.target?.value, e.target?.name);
                    if (e.target?.value && e.target?.value?.length != 10) {
                      setError("mobile", {
                        type: "custom",
                        message: "Mobile Number Must be 10 character long",
                      });
                    } else {
                      checkMobileNumber(e.target?.value);
                      clearErrors("mobile");
                    }
                  }}
                />
              )}
            />
            {/* {errors?.mobile && (
              <FormFeedback>{errors?.mobile?.message}</FormFeedback>
            )} */}
          </Col>

          <Col md="6" className="mb-1">
            <Label className="form-label" for="u_email">
              Email
            </Label>
            <Controller
              id="u_email"
              name="u_email"
              control={control}
              render={({ field }) => (
                <Input
                  disabled
                  id="u_email"
                  name="u_email"
                  type="u_email"
                  placeholder="Enter Email"
                  invalid={errors?.u_email && true}
                  {...field}
                  onChange={(e) => {
                    field.onChange(e.target?.value);
                    onHandleChange(e.target?.value, e.target?.name);
                  }}
                  onBlur={(e) => {
                    field.onChange(e.target?.value);
                    onHandleChange(e.target?.value, e.target?.name);
                    checkMail(e.target?.value);
                  }}
                />
              )}
            />
            {/* {errors?.u_email && (
              <FormFeedback>{errors?.u_email?.message}</FormFeedback>
            )} */}
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
