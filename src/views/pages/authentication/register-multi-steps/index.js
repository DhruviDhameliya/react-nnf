// ** React Imports
import { Link, useNavigate } from "react-router-dom";
import { useRef, useState } from "react";

// ** Custom Components
import Wizard from "@components/wizard";

// ** Reactstrap Imports
import { Row, Col } from "reactstrap";

// ** Third Party Components
import { Home, User, FileText } from "react-feather";
import themeConfig from "@configs/themeConfig";

// ** Steps
import PersonalInfo from "./steps/PersonalInfo";
import ExtraDetails from "./steps/ExtraDetails";

// ** Styles
import "@styles/react/pages/page-authentication.scss";
import { registerUser } from "../../../../@core/api/common_api";
import { notification } from "../../../../@core/constants/notification";

const RegisterMultiSteps = () => {
  const ref = useRef(null);
  const navigate = useNavigate();

  const personalInfoDefaultValue = {
    name: "",
    age: "",
    address: "",
    no_of_children: "",
    city: "",
    pincode: "",
    u_email: "",
    mobile: "",
    password: "",
    confirmPassword: "",
  };

  const accountInfoDefaultValue = {
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

  // ** State
  const [stepper, setStepper] = useState(null);
  const [registerData, setRegisterData] = useState({
    ...personalInfoDefaultValue,
    ...accountInfoDefaultValue,
  });
  const details = navigator.userAgent;
  const regExp = /android|iphone/i;
  const isMobileDevice = regExp.test(details);
  const onHandleChange = (e, name) => {
    // console.log(e, name, "!!!!!!!!!!");
    setRegisterData((prevState) => ({
      ...prevState,
      [name]: e,
    }));
  };

  const registrationSubmit = async () => {
    // console.log("registerDataaaaa", registerData);
    let resp = await registerUser(registerData);
    // console.log("resspp", resp);
    if (resp?.status == 1) {
      notification({
        type: "success",
        position: "top-right",
        message: resp?.message,
      });
      // setRegisterData({
      //   ...personalInfoDefaultValue,
      //   ...accountInfoDefaultValue,
      // });
      // console.log("$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$");
      navigate("/login");
    } else {
      notification({
        type: "error",
        position: "top-right",
        message: resp?.message,
      });
    }
  };

  const steps = [
    {
      id: "personal-info",
      title: "Personal",
      subtitle: "Enter Information",
      icon: <User size={18} />,
      content: (
        <PersonalInfo
          stepper={stepper}
          onHandleChange={onHandleChange}
          registerData={registerData}
          registrationSubmit={registrationSubmit}
          defaultValues={personalInfoDefaultValue}
        />
      ),
    },
    {
      id: "account-details",
      title: "Extra Information",
      subtitle: "Enter Information",
      icon: <FileText size={18} />,
      content: (
        <ExtraDetails
          stepper={stepper}
          onHandleChange={onHandleChange}
          registerData={registerData}
          registrationSubmit={registrationSubmit}
          defaultValues={accountInfoDefaultValue}
        />
      ),
    },
  ];
  const source = require("@src/assets/images/pages/create-account.svg").default;
  const registerImage = require(`@src/assets/images/logo/register.png`).default;

  return (
    <div className="auth-wrapper auth-cover">
      <Row className="auth-inner m-0">
        {isMobileDevice && (
          <Link className="brand-logo" to="/">
            <img
              src={themeConfig.app.registrationLogoImage}
              width="325px"
              alt="logo"
            />
            {/* <svg viewBox="0 0 139 95" version="1.1" height="28">
            <defs>
              <linearGradient
                x1="100%"
                y1="10.5120544%"
                x2="50%"
                y2="89.4879456%"
                id="linearGradient-1"
              >
                <stop stopColor="#000000" offset="0%"></stop>
                <stop stopColor="#FFFFFF" offset="100%"></stop>
              </linearGradient>
              <linearGradient
                x1="64.0437835%"
                y1="46.3276743%"
                x2="37.373316%"
                y2="100%"
                id="linearGradient-2"
              >
                <stop stopColor="#EEEEEE" stopOpacity="0" offset="0%"></stop>
                <stop stopColor="#FFFFFF" offset="100%"></stop>
              </linearGradient>
            </defs>
            <g
              id="Page-1"
              stroke="none"
              strokeWidth="1"
              fill="none"
              fillRule="evenodd"
            >
              <g id="Artboard" transform="translate(-400.000000, -178.000000)">
                <g id="Group" transform="translate(400.000000, 178.000000)">
                  <path
                    d="M-5.68434189e-14,2.84217094e-14 L39.1816085,2.84217094e-14 L69.3453773,32.2519224 L101.428699,2.84217094e-14 L138.784583,2.84217094e-14 L138.784199,29.8015838 C137.958931,37.3510206 135.784352,42.5567762 132.260463,45.4188507 C128.736573,48.2809251 112.33867,64.5239941 83.0667527,94.1480575 L56.2750821,94.1480575 L6.71554594,44.4188507 C2.46876683,39.9813776 0.345377275,35.1089553 0.345377275,29.8015838 C0.345377275,24.4942122 0.230251516,14.560351 -5.68434189e-14,2.84217094e-14 Z"
                    id="Path"
                    className="text-primary"
                    style={{ fill: "currentColor" }}
                  ></path>
                  <path
                    d="M69.3453773,32.2519224 L101.428699,1.42108547e-14 L138.784583,1.42108547e-14 L138.784199,29.8015838 C137.958931,37.3510206 135.784352,42.5567762 132.260463,45.4188507 C128.736573,48.2809251 112.33867,64.5239941 83.0667527,94.1480575 L56.2750821,94.1480575 L32.8435758,70.5039241 L69.3453773,32.2519224 Z"
                    id="Path"
                    fill="url(#linearGradient-1)"
                    opacity="0.2"
                  ></path>
                  <polygon
                    id="Path-2"
                    fill="#000000"
                    opacity="0.049999997"
                    points="69.3922914 32.4202615 32.8435758 70.5039241 54.0490008 16.1851325"
                  ></polygon>
                  <polygon
                    id="Path-2"
                    fill="#000000"
                    opacity="0.099999994"
                    points="69.3922914 32.4202615 32.8435758 70.5039241 58.3683556 20.7402338"
                  ></polygon>
                  <polygon
                    id="Path-3"
                    fill="url(#linearGradient-2)"
                    opacity="0.099999994"
                    points="101.428699 0 83.0667527 94.1480575 130.378721 47.0740288"
                  ></polygon>
                </g>
              </g>
            </g>
          </svg>
          <h2 className="brand-text text-primary ms-1">Vuexy</h2> */}
          </Link>
        )}

        <Col lg="3" className="d-none d-lg-flex align-items-center p-0">
          <div className="w-100 d-lg-flex align-items-center justify-content-center">
            <img
              // className="img-fluid w-100"
              src={registerImage}
              alt="Register Cover"
              style={{ maxWidth: "85%", height: "auto" }}
            />
          </div>
        </Col>
        <Col
          lg="9"
          className="d-flex align-items-center auth-bg px-2 px-sm-3 px-lg-5 pt-3"
        >
          <div className="width-700 mx-auto" style={{ marginTop: "30px" }}>
            {/* {console.log("stepp", stepper)} */}
            <Wizard
              ref={ref}
              steps={steps}
              instance={(el) => setStepper(el)}
              headerClassName="px-0"
              contentWrapperClassName="px-0 mt-4"
              className="register-multi-steps-wizard shadow-none"
            />
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default RegisterMultiSteps;
