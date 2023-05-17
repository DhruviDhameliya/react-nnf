// ** React Imports
import { Fragment } from "react";

// ** Third Party Components
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, Controller } from "react-hook-form";
import { ChevronLeft, ChevronRight } from "react-feather";

// ** Reactstrap Imports
import { Form, Label, Input, Row, Col, Button, FormFeedback } from "reactstrap";
import InputPasswordToggle from "@components/input-password-toggle";
import { checkEmail, checkMobile } from "../../../../../@core/api/common_api";
import { useNavigate } from "react-router-dom";

// const personalInfoDefaultValue = {
//   name: "",
//   age: "",
//   address: "",
//   no_of_children: "",
//   city: "",
//   pincode: "",
//   u_email: "",
//   mobile: "",
//   password: "",
//   confirmPassword: "",
// };

const PersonalInfo = ({
  stepper,
  onHandleChange,
  registerData,
  defaultValues,
}) => {
  const navigate = useNavigate();

  const SignupSchema = yup.object().shape({
    name: yup.string().required("Name is Required"),
    age: yup.string().required("Age is Required"),
    u_email: yup
      .string()
      .email("Please enter valid Email")
      .required("Email is Required"),
    password: yup.string().required("Password is Required"),
    confirmPassword: yup
      .string()
      .required("Confirm Password is Required")
      .oneOf([yup.ref(`password`), null], "Passwords must match"),
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
    control,
    setError,
    handleSubmit,
    register,
    clearErrors,
    formState: { errors },
  } = useForm({
    defaultValues,
    resolver: yupResolver(SignupSchema),
  });

  const checkMail = async (mail) => {
    let resp = await checkEmail({ u_email: mail });
    // console.log("resp", resp);
    if (resp?.status === 1) {
      clearErrors("u_email");
    } else {
      setError("u_email", {
        type: "custom",
        message: resp?.message,
      });
    }
  };

  const checkMobileNumber = async (mail) => {
    let resp = await checkMobile({ mobile: mail });
    // console.log("resp", resp);
    if (resp?.status === 1) {
      clearErrors("mobile");
    } else {
      setError("mobile", {
        type: "custom",
        message: resp?.message,
      });
    }
  };

  const onSubmit = async (data) => {
    // console.log("data", data);
    // console.log("errorsssssssssssss", errors);
    await checkMail(data?.u_email);
    await checkMobileNumber(data?.mobile);
    // if (Object.values(data).every((field) => field.length > 0)) {
    if (Object.keys(errors).length == 0) {
      stepper?.next();
      // } else {
      //   for (const key in data) {
      //     console.log(
      //       "data[key]",
      //       data[key],
      //       typeof data[key],
      //       typeof data[key] == "undefined",
      //       data[key]?.length === 0,
      //       typeof data[key] == "undefined" || data[key]?.length === 0
      //     );
      //     if (typeof data[key] == "undefined" || data[key]?.length === 0) {
      //       setError(key, {
      //         type: "manual",
      //         message: `Please enter a valid ${key}`,
      //       });
      //     }
      //   }
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
                      onChange={(e) => {
                        // console.log("e.target.value", e.target?.value);
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
                      id="female"
                      value="1"
                      name="gender"
                      onChange={(e) => {
                        // console.log("e.target.value", e.target?.value);
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
                  pattern="[0-9]*"
                  inputProps={{ inputMode: "numeric" }}
                  invalid={errors?.no_of_children && true}
                  {...field}
                  placeholder="Enter no of children"
                  onChange={(e) => {
                    field.onChange(
                      e.target.value.replace(/[^0-9]/g, "").toString()
                    );
                    onHandleChange(
                      e.target.value.replace(/[^0-9]/g, "").toString(),
                      e.target?.name
                    );
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
                      // console.log("ifffff");
                      setError("pincode", {
                        type: "custom",
                        message: "PIN Code Must be 6 character long",
                      });
                    } else {
                      // console.log("elseeeeeeeee");
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
                    if (e.target?.value && e.target?.value?.length == 10) {
                      console.log("else");
                      checkMobileNumber(e.target?.value);
                      // clearErrors("mobile");
                    } else {
                      console.log("ifff");
                      setError("mobile", {
                        type: "custom",
                        message: "Mobile Number Must be 10 character long",
                      });
                    }
                  }}
                />
              )}
            />
            {errors?.mobile && (
              <FormFeedback>{errors?.mobile?.message}</FormFeedback>
            )}
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
                    if (e.target?.value != "") {
                      field.onChange(e.target?.value);
                      onHandleChange(e.target?.value, e.target?.name);
                      checkMail(e.target?.value);
                    }
                  }}
                />
              )}
            />
            {errors?.u_email && (
              <FormFeedback>{errors?.u_email?.message}</FormFeedback>
            )}
          </Col>

          <Col md="6" className="mb-1">
            {/* <div className="form-password-toggle col-md-6 mb-1"> */}
            <Controller
              id="password"
              name="password"
              control={control}
              render={({ field }) => (
                <InputPasswordToggle
                  id="password"
                  name="password"
                  label="Password"
                  htmlFor="password"
                  className="input-group-merge"
                  invalid={errors?.password && true}
                  {...field}
                  onChange={(e) => {
                    field.onChange(e.target?.value);
                    onHandleChange(e.target?.value, e.target?.name);
                  }}
                />
              )}
            />
            {errors?.password && (
              <FormFeedback>{errors?.password?.message}</FormFeedback>
            )}
            {/* </div> */}
          </Col>
          <Col md="6" className="mb-1">
            {/* <div className="form-password-toggle col-md-6 mb-1"> */}
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
                    onHandleChange(e.target?.value, e.target?.name);
                  }}
                />
              )}
            />
            {errors?.confirmPassword && (
              <FormFeedback>{errors?.confirmPassword?.message}</FormFeedback>
            )}
            {/* </div> */}
          </Col>

          {/* <Col md="6" className="mb-1">
            <Label className="form-label" for="town-city">
              Town/City
            </Label>
            <Input id="town-city" name="town-city" placeholder="Town/City" />
          </Col>
          <Col md="6" className="mb-1">
            <Label className="form-label" for="country">
              Country
            </Label>
            <Input
              type="number"
              id="country"
              name="country"
              placeholder="United Kingdom"
            />
          </Col> */}
        </Row>
        <div className="d-flex justify-content-between mt-2">
          <Button
            color="secondary"
            className="btn-prev"
            outline
            onClick={() => {
              navigate("/login");
            }}
          >
            <ChevronLeft
              size={14}
              className="align-middle me-sm-25 me-0"
            ></ChevronLeft>
            <span className="align-middle d-sm-inline-block d-none">
              Back to login
            </span>
          </Button>
          <Button type="submit" color="primary" className="btn-next">
            <span className="align-middle d-sm-inline-block d-none">Next</span>
            <ChevronRight
              size={14}
              className="align-middle ms-sm-25 ms-0"
            ></ChevronRight>
          </Button>
        </div>
      </Form>
    </Fragment>
  );
};

export default PersonalInfo;
