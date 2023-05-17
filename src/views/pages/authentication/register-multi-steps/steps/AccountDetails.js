// ** React Imports
import { Fragment, useEffect, useState } from "react";

// ** Third Party Components
import * as yup from "yup";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Check, ChevronLeft, ChevronRight } from "react-feather";
import Select from "react-select";
import classnames from "classnames";

// ** Reactstrap Imports
import { Form, Label, Input, Row, Col, Button, FormFeedback } from "reactstrap";

// ** Custom Components
import InputPasswordToggle from "@components/input-password-toggle";
import "@styles/react/libs/react-select/_react-select.scss";
import { getAttributeById } from "../../../../../@core/api/common_api";

const defaultValues = {
  qualification: "",
  specialty: "",
  other_specialty: "",
  type_of_work: "",
  area_of_work: "",
  other_area_of_work: "",
  exact_area_of_work: "",
  other_exact_area_of_work: "",
  member_of: "",
  name_of_organization: "",
  year_of_exp: "",
  kmc: "",
  kmc_work_area: "",
  kmc_years: "",
  kmc_to_children: "",
};

const AccountDetails = ({
  stepper,
  onHandleChange,
  registerData,
  registrationSubmit,
  // defaultValues,
}) => {
  // console.log("defaultValues", defaultValues);
  const [specialtyOptions, setSpecialtyOptions] = useState([]);
  const [workTypeOptions, setWorkTypeOptions] = useState([]);
  const [workAreaOptions, setWorkAreaOptions] = useState([]);
  const [exactWorkAreaOptions, setExactWorkAreaOptions] = useState([]);
  const [memberOptions, setMemberOptions] = useState([]);

  // useEffect(async () => {
  //   setSpecialtyOptions(await getAttributeById(1));
  //   setWorkTypeOptions(await getAttributeById(2));
  //   setWorkAreaOptions(await getAttributeById(3));
  //   setExactWorkAreaOptions(await getAttributeById(4));
  //   setMemberOptions(await getAttributeById(5));
  // }, []);

  useEffect(() => {
    const asyncFetchData = async () => {
      setSpecialtyOptions(await getAttributeById(1));
      setWorkTypeOptions(await getAttributeById(2));
      setWorkAreaOptions(await getAttributeById(3));
      setExactWorkAreaOptions(await getAttributeById(4));
      setMemberOptions(await getAttributeById(5));
    };

    asyncFetchData();
  }, []);

  const SignupSchema = yup.object().shape({
    qualification: yup.string().required("Qualification is Required"),
    specialty: yup.string().required("Please select Specialty"),
    other_specialty: yup
      .string()
      .when(["specialty"], (specialty, schema) =>
        specialty == 0 ? schema.required("Other Specialty is Required") : schema
      ),
    type_of_work: yup.string().required("Please select Type of Work"),
    area_of_work: yup.string().required("Please select Area of Work"),
    other_area_of_work: yup
      .string()
      .when(["area_of_work"], (area_of_work, schema) =>
        area_of_work == 0
          ? schema.required("Other Area of Work is Required")
          : schema
      ),
    exact_area_of_work: yup
      .string()
      .required("Please select Exact Area of Work"),
    other_exact_area_of_work: yup
      .string()
      .when(["exact_area_of_work"], (exact_area_of_work, schema) =>
        exact_area_of_work == 0
          ? schema.required("Other Exact Area of Work is Required")
          : schema
      ),
    member_of: yup.string().required("Please select Member"),
    name_of_organization: yup
      .string()
      .required("Name of Organization is Required"),
    year_of_exp: yup.string().required("Year of Experience is Required "),
    kmc: yup.string().required("KMC is Required"),
    kmc_work_area: yup.string().required("KMC Work area is Required"),
    kmc_years: yup
      .string()
      .when(["kmc_work_area"], (kmc_work_area, schema) =>
        kmc_work_area == 1
          ? schema.required("KMC Work Area is Required")
          : schema
      ),
    kmc_to_children: yup.string("KMC to Children is Required").required(),
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues,
    resolver: yupResolver(SignupSchema),
  });

  const onSubmit = (data) => {
    // console.log("dataaaa", data);
    if (Object.keys(errors)?.length == 0) {
      registrationSubmit();
    }
  };

  return (
    <Fragment>
      <div className="content-header mb-2">
        <h2 className="fw-bolder mb-75">Account Information</h2>
        <span>Enter your username password details</span>
      </div>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Row>
          <Col md="6" className="mb-1">
            <Label className="form-label" for="qualification">
              Qualification
            </Label>
            <Controller
              control={control}
              id="qualification"
              name="qualification"
              render={({ field }) => (
                <Input
                  id="qualification"
                  name="qualification"
                  placeholder="Enter Qualification"
                  invalid={errors?.qualification && true}
                  {...field}
                  onChange={(e) => {
                    field?.onChange(e.target?.value);
                    onHandleChange(e.target?.value, e.target?.name);
                  }}
                />
              )}
            />
            {errors?.qualification && (
              <FormFeedback>{errors?.qualification?.message}</FormFeedback>
            )}
          </Col>
          <Col md="6" className="mb-1">
            <Label className="form-label" for={`specialty`}>
              Specialty
            </Label>
            <Controller
              control={control}
              id="specialty"
              name="specialty"
              render={({ field }) => (
                <Select
                  id="specialty"
                  name="specialty"
                  options={[
                    ...(specialtyOptions &&
                      specialtyOptions?.map((s) => {
                        return { value: s?.attribute_id, label: s?.name };
                      })),
                    { value: 0, label: "Other" },
                  ]}
                  classNamePrefix="select"
                  className={classnames("react-select", {
                    "is-invalid": errors?.specialty ? true : false,
                  })}
                  // invalid={errors.specialty && true}
                  {...field}
                  value={
                    specialtyOptions &&
                    specialtyOptions?.map((s) => {
                      if (s?.attribute_id == registerData?.specialty) {
                        // console.log("s.name ", s?.name);
                        return { label: s?.name, value: s?.attribute_id };
                      } else if (registerData?.specialty === 0) {
                        return { value: 0, label: "Other" };
                      } else return null;
                    })
                  }
                  onChange={(e) => {
                    field.onChange(e?.value);
                    onHandleChange(e?.value, "specialty");
                  }}
                />
              )}
            />
            {errors?.specialty && (
              <FormFeedback>{errors?.specialty?.message}</FormFeedback>
            )}
          </Col>

          {registerData?.specialty === 0 && (
            <Col md="6" className="mb-1">
              <Label className="form-label" for="other_specialty">
                Other Specialty
              </Label>
              <Controller
                control={control}
                id="other_specialty"
                name="other_specialty"
                render={({ field }) => (
                  <Input
                    id="other_specialty"
                    name="other_specialty"
                    placeholder="Enter specialty"
                    invalid={errors?.other_specialty && true}
                    {...field}
                    onChange={(e) => {
                      field.onChange(e?.target?.value);
                      onHandleChange(e.target?.value, e.target?.name);
                    }}
                  />
                )}
              />
              {errors?.other_specialty && (
                <FormFeedback>{errors?.other_specialty?.message}</FormFeedback>
              )}
            </Col>
          )}

          <Col md="6" className="mb-1">
            <Label className="form-label" for="type_of_work">
              Type of work
            </Label>
            <Controller
              control={control}
              id="type_of_work"
              name="type_of_work"
              render={({ field }) => (
                <Select
                  id="type_of_work"
                  name="type_of_work"
                  options={
                    workTypeOptions &&
                    workTypeOptions?.map((s) => {
                      return { value: s?.attribute_id, label: s?.name };
                    })
                  }
                  classNamePrefix="select"
                  // theme={selectThemeColors}
                  className={classnames("react-select", {
                    "is-invalid": errors?.type_of_work ? true : false,
                  })}
                  // invalid={errors.type_of_work && true}
                  {...field}
                  value={
                    workTypeOptions &&
                    workTypeOptions?.map((s) => {
                      if (s?.attribute_id == registerData?.type_of_work) {
                        // console.log("s.name ", s?.name);
                        return { label: s?.name, value: s?.attribute_id };
                      }
                    })
                  }
                  onChange={(e) => {
                    field.onChange(e?.value);
                    onHandleChange(e?.value, "type_of_work");
                  }}
                />
              )}
            />
            {errors?.type_of_work && (
              <FormFeedback>{errors?.type_of_work?.message}</FormFeedback>
            )}
          </Col>

          <Col md="6" className="mb-1">
            <Label className="form-label" for="area_of_work">
              Area of work
            </Label>
            <Controller
              control={control}
              id="area_of_work"
              name="area_of_work"
              render={({ field }) => (
                <Select
                  id="area_of_work"
                  name="area_of_work"
                  options={[
                    ...(workAreaOptions &&
                      workAreaOptions?.map((s) => {
                        return { value: s?.attribute_id, label: s?.name };
                      })),
                    { value: 0, label: "Other" },
                  ]}
                  classNamePrefix="select"
                  // theme={selectThemeColors}
                  className={classnames("react-select", {
                    "is-invalid": errors?.area_of_work ? true : false,
                  })}
                  // invalid={errors.area_of_work && true}
                  {...field}
                  value={
                    workAreaOptions &&
                    workAreaOptions?.map((s) => {
                      if (s?.attribute_id == registerData?.area_of_work) {
                        // console.log("s.name ", s?.name);
                        return { label: s?.name, value: s?.attribute_id };
                      } else if (registerData?.area_of_work === 0) {
                        return { value: 0, label: "Other" };
                      } else return null;
                    })
                  }
                  onChange={(e) => {
                    field.onChange(e?.value);
                    onHandleChange(e?.value, "area_of_work");
                  }}
                />
              )}
            />
            {errors?.area_of_work && (
              <FormFeedback>{errors?.area_of_work?.message}</FormFeedback>
            )}
          </Col>

          {registerData?.area_of_work === 0 && (
            <Col md="6" className="mb-1">
              <Label className="form-label" for="other_area_of_work">
                Other Area
              </Label>
              <Controller
                control={control}
                id="other_area_of_work"
                name="other_area_of_work"
                render={({ field }) => (
                  <Input
                    id="other_area_of_work"
                    name="other_area_of_work"
                    placeholder="Enter Area of Work"
                    invalid={errors?.other_area_of_work && true}
                    {...field}
                    onChange={(e) => {
                      field.onChange(e?.target?.value);
                      onHandleChange(e?.target?.value, e?.target?.name);
                    }}
                  />
                )}
              />
              {errors?.other_area_of_work && (
                <FormFeedback>
                  {errors?.other_area_of_work?.message}
                </FormFeedback>
              )}
            </Col>
          )}

          <Col md="6" className="mb-1">
            <Label className="form-label" for="exact_area_of_work">
              Those who work in Hospital please specify exact area of work
            </Label>
            <Controller
              control={control}
              id="exact_area_of_work"
              name="exact_area_of_work"
              render={({ field }) => (
                <Select
                  id="exact_area_of_work"
                  name="exact_area_of_work"
                  options={[
                    ...(exactWorkAreaOptions &&
                      exactWorkAreaOptions?.map((s) => {
                        return { value: s?.attribute_id, label: s?.name };
                      })),
                    { value: 0, label: "Any others area" },
                  ]}
                  classNamePrefix="select"
                  // theme={selectThemeColors}
                  className={classnames("react-select", {
                    "is-invalid": errors?.exact_area_of_work ? true : false,
                  })}
                  // invalid={errors.exact_area_of_work && true}
                  {...field}
                  value={
                    // exactWorkAreaOptions &&
                    // exactWorkAreaOptions?.find(
                    //   (option) => option.value === field.value
                    // )
                    exactWorkAreaOptions &&
                    exactWorkAreaOptions?.map((s) => {
                      if (s?.attribute_id == registerData?.exact_area_of_work) {
                        // console.log("s.name ", s?.name);
                        return { label: s?.name, value: s?.attribute_id };
                      } else if (registerData?.exact_area_of_work === 0) {
                        return { value: 0, label: "Any others area" };
                      } else return null;
                    })
                  }
                  onChange={(e) => {
                    field.onChange(e?.value);
                    onHandleChange(e?.value, "exact_area_of_work");
                  }}
                />
              )}
            />
            {errors?.exact_area_of_work && (
              <FormFeedback>{errors?.exact_area_of_work?.message}</FormFeedback>
            )}
          </Col>

          {registerData?.exact_area_of_work === 0 && (
            <Col md="6" className="mb-1">
              <Label className="form-label" for="other_exact_area_of_work">
                Any others area
              </Label>
              <Controller
                control={control}
                id="other_exact_area_of_work"
                name="other_exact_area_of_work"
                render={({ field }) => (
                  <Input
                    id="other_exact_area_of_work"
                    name="other_exact_area_of_work"
                    placeholder="Enter any others area"
                    invalid={errors?.other_exact_area_of_work && true}
                    {...field}
                    onChange={(e) => {
                      field.onChange(e?.target?.value);
                      onHandleChange(e?.target?.value, e?.target?.name);
                    }}
                  />
                )}
              />
              {errors?.other_exact_area_of_work && (
                <FormFeedback>
                  {errors?.other_exact_area_of_work?.message}
                </FormFeedback>
              )}
            </Col>
          )}

          <Col md="6" className="mb-1">
            <Label className="form-label" for={"member_of"}>
              Member of
            </Label>
            <Controller
              control={control}
              id="member_of"
              name="member_of"
              render={({ field }) => (
                <Select
                  id="member_of"
                  name="member_of"
                  options={
                    memberOptions &&
                    memberOptions?.map((s) => {
                      return { value: s?.attribute_id, label: s?.name };
                    })
                  }
                  classNamePrefix="select"
                  // theme={selectThemeColors}
                  className={classnames("react-select", {
                    "is-invalid": errors?.member_of ? true : false,
                  })}
                  // invalid={errors.member_of && true}
                  {...field}
                  value={
                    // memberOptions &&
                    // memberOptions?.find(
                    //   (option) => option.value === field.value
                    // )
                    memberOptions &&
                    memberOptions?.map((s) => {
                      if (s?.attribute_id == registerData?.member_of) {
                        // console.log("s.name ", s?.name);
                        return { label: s?.name, value: s?.attribute_id };
                      }
                    })
                  }
                  onChange={(e) => {
                    field.onChange(e?.value);
                    onHandleChange(e?.value, "member_of");
                  }}
                />
              )}
            />
            {errors?.member_of && (
              <FormFeedback>{errors?.member_of?.message}</FormFeedback>
            )}
          </Col>

          <Col md="6" className="mb-1">
            <Label className="form-label" for="name_of_organization">
              Name of working organization
            </Label>
            <Controller
              control={control}
              id="name_of_organization"
              name="name_of_organization"
              render={({ field }) => (
                <Input
                  id="name_of_organization"
                  name="name_of_organization"
                  placeholder="Enter Name of working organization"
                  invalid={errors?.name_of_organization && true}
                  {...field}
                  onChange={(e) => {
                    field.onChange(e?.target?.value);
                    onHandleChange(e?.target?.value, e?.target?.name);
                  }}
                />
              )}
            />
            {errors?.name_of_organization && (
              <FormFeedback>
                {errors?.name_of_organization?.message}
              </FormFeedback>
            )}
          </Col>

          <Col md="6" className="mb-1">
            <Label className="form-label" for="year_of_exp">
              Years of experience
            </Label>
            <Controller
              control={control}
              id="year_of_exp"
              name="year_of_exp"
              render={({ field }) => (
                <Input
                  id="year_of_exp"
                  name="year_of_exp"
                  type="number"
                  placeholder="Enter Name of working organization"
                  invalid={errors?.year_of_exp && true}
                  {...field}
                  onChange={(e) => {
                    field.onChange(e?.target?.value);
                    onHandleChange(e?.target?.value, e?.target?.name);
                  }}
                />
              )}
            />
            {errors?.year_of_exp && (
              <FormFeedback>{errors?.year_of_exp?.message}</FormFeedback>
            )}
          </Col>

          <Col md="6" className="mb-1">
            <Label className="form-label" for="kmc">
              Have you received any formal/informal training for Kangaroo Mother
              Care (KMC)?
            </Label>
            <Controller
              id="kmc"
              name="kmc"
              control={control}
              render={({ field }) => (
                <div className="demo-inline-spacing">
                  <div
                    className="form-check"
                    style={{ marginTop: "5px !important" }}
                  >
                    <Input
                      id="kmc_yes"
                      type="radio"
                      name="kmc"
                      invalid={errors?.kmc && true}
                      {...field}
                      value="1"
                      onChange={(e) => {
                        field.onChange(e?.target?.value);
                        onHandleChange(e?.target?.value, e?.target?.name);
                      }}
                    />
                    <Label className="form-check-label" for="kmc_yes">
                      Yes
                    </Label>
                  </div>
                  <div
                    className="form-check"
                    style={{ marginTop: "5px !important" }}
                  >
                    <Input
                      type="radio"
                      id="kmc_no"
                      name="kmc"
                      invalid={errors?.kmc && true}
                      {...field}
                      value="0"
                      onChange={(e) => {
                        field.onChange(e?.target?.value);
                        onHandleChange(e?.target?.value, e?.target?.name);
                      }}
                    />
                    <Label className="form-check-label" for="kmc_no">
                      No
                    </Label>
                  </div>
                </div>
              )}
            />
            {errors?.kmc && <FormFeedback>{errors?.kmc?.message}</FormFeedback>}
          </Col>

          <Col md="6" className="mb-1">
            <Label className="form-label" for="kmc_work_area">
              Do you practice KMC in your area of work?
            </Label>
            <Controller
              id="kmc_work_area"
              name="kmc_work_area"
              control={control}
              render={({ field }) => (
                <div className="demo-inline-spacing">
                  <div
                    className="form-check"
                    style={{ marginTop: "5px !important" }}
                  >
                    <Input
                      type="radio"
                      id="kmc_work_area_yes"
                      name="kmc_work_area"
                      invalid={errors?.kmc_work_area && true}
                      {...field}
                      value="1"
                      onChange={(e) => {
                        field.onChange(e?.target?.value);
                        onHandleChange(e?.target?.value, e?.target?.name);
                      }}
                    />
                    <Label className="form-check-label" for="kmc_work_area_yes">
                      Yes
                    </Label>
                  </div>
                  <div
                    className="form-check"
                    style={{ marginTop: "5px !important" }}
                  >
                    <Input
                      id="kmc_work_area_no"
                      type="radio"
                      name="kmc_work_area"
                      invalid={errors?.kmc_work_area && true}
                      {...field}
                      value="0"
                      onChange={(e) => {
                        field.onChange(e?.target?.value);
                        onHandleChange(e?.target?.value, e?.target?.name);
                      }}
                    />
                    <Label className="form-check-label" for="kmc_work_area_no">
                      No
                    </Label>
                  </div>
                </div>
              )}
            />
            {errors?.kmc_work_area && (
              <FormFeedback>{errors?.kmc_work_area?.message}</FormFeedback>
            )}
          </Col>

          {registerData?.kmc_work_area == 1 && (
            <Col md="6" className="mb-1">
              <Label className="form-label" for="kmc_years">
                If yes, since how many years you practice KMC?
              </Label>
              <Controller
                control={control}
                id="kmc_years"
                name="kmc_years"
                render={({ field }) => (
                  <Input
                    id="kmc_years"
                    name="kmc_years"
                    type="number"
                    placeholder="Enter Name of working organization"
                    invalid={errors?.kmc_years && true}
                    {...field}
                    onChange={(e) => {
                      field.onChange(e?.target?.value);
                      onHandleChange(e?.target?.value, e?.target?.name);
                    }}
                  />
                )}
              />
              {errors?.kmc_years && (
                <FormFeedback>{errors?.kmc_years?.message}</FormFeedback>
              )}
            </Col>
          )}
          <Col md="6" className="mb-1">
            <Label className="form-label" for="kmc_to_children">
              Have you provided KMC to your children?
            </Label>
            <Controller
              id="kmc_to_children"
              name="kmc_to_children"
              control={control}
              render={({ field }) => (
                <div className="demo-inline-spacing">
                  <div
                    className="form-check"
                    style={{ marginTop: "5px !important" }}
                  >
                    <Input
                      id="kmc_to_children_yes"
                      type="radio"
                      name="kmc_to_children"
                      invalid={errors?.kmc_to_children && true}
                      {...field}
                      value="1"
                      onChange={(e) => {
                        field.onChange(e?.target?.value);
                        onHandleChange(e?.target?.value, e?.target?.name);
                      }}
                    />
                    <Label
                      className="form-check-label"
                      for="kmc_to_children_yes"
                    >
                      Yes
                    </Label>
                  </div>
                  <div
                    className="form-check"
                    style={{ marginTop: "5px !important" }}
                  >
                    <Input
                      id="kmc_to_children_no"
                      type="radio"
                      name="kmc_to_children"
                      invalid={errors?.kmc_to_children && true}
                      {...field}
                      value="0"
                      onChange={(e) => {
                        field.onChange(e?.target?.value);
                        onHandleChange(e?.target?.value, e?.target?.name);
                      }}
                    />
                    <Label
                      className="form-check-label"
                      for="kmc_to_children_no"
                    >
                      No
                    </Label>
                  </div>
                  <div
                    className="form-check"
                    style={{ marginTop: "5px !important" }}
                  >
                    <Input
                      id="not_applicable"
                      type="radio"
                      name="kmc_to_children"
                      invalid={errors?.kmc_to_children && true}
                      {...field}
                      value="2"
                      onChange={(e) => {
                        field.onChange(e?.target?.value);
                        onHandleChange(e?.target?.value, e?.target?.name);
                      }}
                    />
                    <Label className="form-check-label" for="not_applicable">
                      Not applicable
                    </Label>
                  </div>
                </div>
              )}
            />
            {errors?.kmc_to_children && (
              <FormFeedback>{errors?.kmc_to_children?.message}</FormFeedback>
            )}
          </Col>
        </Row>
        <Row>
          {/* <Col sm={12} className="mb-1">
            <div className="form-check form-check-inline">
              <Input type="checkbox" id="remember-me" />
              <Label for="remember-me" className="form-check-label">
                Remember Me
              </Label>
            </div>
          </Col> */}
        </Row>
        <div className="d-flex justify-content-between mt-2">
          <Button
            color="secondary"
            className="btn-prev"
            outline
            onClick={() => stepper?.previous()}
          >
            <ChevronLeft
              size={14}
              className="align-middle me-sm-25 me-0"
            ></ChevronLeft>
            <span className="align-middle d-sm-inline-block d-none">
              Previous
            </span>
          </Button>
          <Button type="submit" color="success" className="btn-next">
            <span className="align-middle d-sm-inline-block d-none">
              Submit
            </span>
            <Check size={14} className="align-middle ms-sm-25 ms-0"></Check>
          </Button>
        </div>
      </Form>
    </Fragment>
  );
};

export default AccountDetails;
