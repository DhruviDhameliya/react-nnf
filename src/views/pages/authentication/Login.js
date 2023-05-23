// ** React Imports
import { useContext, useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";

// ** Custom Hooks
import { useSkin } from "@hooks/useSkin";
import useJwt from "@src/auth/jwt/useJwt";
import themeConfig from "@configs/themeConfig";
// ** Third Party Components
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { useForm, Controller } from "react-hook-form";
import {
  Facebook,
  Twitter,
  Mail,
  GitHub,
  HelpCircle,
  Coffee,
  X,
} from "react-feather";

// ** Actions
// import { handleLogin } from "@store/authentication";

// ** Context
import { AbilityContext } from "@src/utility/context/Can";

// ** Custom Components
import Avatar from "@components/avatar";
import InputPasswordToggle from "@components/input-password-toggle";

// ** Utils
import { getHomeRouteForLoggedInUser, isObjEmpty, handleLogin } from "@utils";

import { LoginRequest } from "../../../@core/api/auth";
import "./login.css";

// ** Reactstrap Imports
import {
  Row,
  Col,
  Form,
  Input,
  Label,
  Alert,
  Button,
  CardText,
  CardTitle,
  UncontrolledTooltip,
  FormFeedback,
} from "reactstrap";

// ** Styles
import "@styles/react/pages/page-authentication.scss";
import { notification } from "../../../@core/constants/notification";
import { useEffect } from "react";
import secureLocalStorage from "react-secure-storage";
import { isUserLoggedIn } from "../../../utility/Utils";

const ToastContent = ({ t, name, role }) => {
  return (
    <div className="d-flex">
      <div className="me-1">
        <Avatar size="sm" color="success" icon={<Coffee size={12} />} />
      </div>
      <div className="d-flex flex-column">
        <div className="d-flex justify-content-between">
          <h6>{name}</h6>
          <X
            size={12}
            className="cursor-pointer"
            onClick={() => toast.dismiss(t.id)}
          />
        </div>
        <span>
          You have successfully logged in as an {role} user to Vuexy. Now you
          can start to explore. Enjoy!
        </span>
      </div>
    </div>
  );
};

const defaultValues = {
  u_email: "",
  password: "",
};

const Login = () => {
  // console.log("#################");
  // ** Hooks
  const { skin } = useSkin();
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const ability = useContext(AbilityContext);
  const {
    control,
    setError,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues });
  const illustration = skin === "dark" ? "login-v2-dark.svg" : "login-v2.svg",
    source = require(`@src/assets/images/pages/${illustration}`).default;
  let loginImage = require(`@src/assets/images/logo/login.png`).default;

  const onSubmit = async (data) => {
    if (!loading) {
      if (Object.values(data).every((field) => field.length > 0)) {
        // useJwt
        //   .login({ email: data.loginEmail, password: data.password })
        //   .then((res) => {
        //     const data = {
        //       ...res.data.userData,
        //       accessToken: res.data.accessToken,
        //       refreshToken: res.data.refreshToken,
        //     };
        //     dispatch(handleLogin(data));
        //     ability.update(res.data.userData.ability);
        //     navigate(getHomeRouteForLoggedInUser(data.role));
        //     toast((t) => (
        //       <ToastContent
        //         t={t}
        //         role={data.role || "admin"}
        //         name={data.fullName || data.username || "John Doe"}
        //       />
        //     ));
        //   })
        //   .catch((err) => console.log(err));
        // console.log("data", data);
        setLoading(true);
        const response = await LoginRequest(data);
        // console.log(response, "response");
        if (response?.status === 1) {
          await handleLogin(response?.data);
          if (response?.data.type == 0) {
            window.location.href = `${getHomeRouteForLoggedInUser("admin")}`;
          } else {
            window.location.href = `${getHomeRouteForLoggedInUser("client")}`;
          }
          notification({
            type: "success",
            // title: "Login Successfully",
            message: response.message,
          });
          setLoading(false);
          // navigate("/register");
        } else {
          setLoading(false);
          notification({
            type: "error",
            title: "Login Unsuccessful",
            message: response.message,
          });
        }
      } else {
        for (const key in data) {
          if (data[key]?.length === 0) {
            setError(key, {
              type: "manual",
            });
          }
        }
      }
    }
  };
  const logo = require("@src/assets/images/logo/logo1.jpeg").default;

  return (
    <>
      <div className="auth-wrapper auth-cover ">
        <Row className="auth-inner m-0">
          <Link
            className="brand-logo"
            to="/"
            onClick={(e) => e.preventDefault()}
          >
            {/* <span className="brand-logo"> */}
            {/* <img src={loginImage} alt="Login Cover" style={{ width: "50%" }} /> */}
            {/* <img src={themeConfig.app.appLogoImage} width="110px" alt="logo" /> */}
            {/* </span> */}
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
          </svg> */}
            {/* <h2 className="brand-text text-primary ms-1">Vuexy</h2> */}
          </Link>
          <Col
            className="d-none d-lg-flex align-items-center justify-content-center flex-direction-column"
            lg="8"
            sm="12"
            style={{ flexDirection: "column" }}
          >
            {/* <div align="center d-lg-flex align-items-center justify-content-center"> */}
            <img
              src={loginImage}
              alt="Login Cover"
              style={{ width: "60%", height: "auto" }}
            />
            {/* </div> */}
          </Col>
          <Col
            className="d-flex align-items-center auth-bg px-2 p-lg-5"
            lg="4"
            sm="12"
            style={{ height: "93vh" }}
          >
            <Col className="px-xl-2 mx-auto" sm="8" md="6" lg="12">
              <div className="d-flex justify-content-center mb-2 ">
                <img src={logo} width="130px" alt="logo" />
              </div>

              <CardTitle
                tag="h2"
                className="fw-bold mb-1"
                style={{ textAlign: "center" }}
              >
                Welcome to Online Kangaroo Mother Care Self Learning Module
              </CardTitle>
              {/* <CardText className="mb-2">Please sign-in to your account</CardText> */}
              <Form
                className="auth-login-form mt-2"
                onSubmit={handleSubmit(onSubmit)}
              >
                <div className="mb-1">
                  <Label className="form-label" for="u_email">
                    Email / Mobile
                  </Label>
                  <Controller
                    id="u_email"
                    name="u_email"
                    control={control}
                    render={({ field }) => (
                      <Input
                        autoFocus
                        id="u_email"
                        name="u_email"
                        type=""
                        placeholder="Enter Mobile Number or Email"
                        invalid={errors.u_email && true}
                        {...field}
                        // onChange={(e) => {
                        //   field.onChange(e.target?.value);
                        //   onHandleChange(e.target?.value, e.target?.name);
                        // }}
                      />
                    )}
                  />
                  {errors?.u_email && (
                    <FormFeedback>{errors?.u_email?.message}</FormFeedback>
                  )}
                </div>
                <div className="mb-1">
                  <div className="d-flex justify-content-between">
                    <Label className="form-label" for="password">
                      Password
                    </Label>
                    <Link to="/forgot-password">
                      <small>Forgot Password?</small>
                    </Link>
                  </div>
                  <Controller
                    id="password"
                    name="password"
                    control={control}
                    render={({ field }) => (
                      <InputPasswordToggle
                        id="password"
                        name="password"
                        className="input-group-merge"
                        invalid={errors.password && true}
                        {...field}
                      />
                    )}
                  />
                  {errors?.password && (
                    <FormFeedback>{errors?.password?.message}</FormFeedback>
                  )}
                </div>
                {/* <div className="form-check mb-1">
                <Input type="checkbox" id="remember-me" />
                <Label className="form-check-label" for="remember-me">
                  Remember Me
                </Label>
              </div> */}
                {console.log(loading, "loading")}
                <Button type="submit" color="primary" block disabled={loading}>
                  Sign in
                </Button>
              </Form>
              <p className="text-center mt-2">
                <span className="me-25">Don't have an account? </span>
                <Link to="/register">
                  <span>Create an account</span>
                </Link>
              </p>
              {/* <div className="divider my-2">
              <div className="divider-text">or</div>
            </div>
            <div className="auth-footer-btn d-flex justify-content-center">
              <Button color="facebook">
                <Facebook size={14} />
              </Button>
              <Button color="twitter">
                <Twitter size={14} />
              </Button>
              <Button color="google">
                <Mail size={14} />
              </Button>
              <Button className="me-0" color="github">
                <GitHub size={14} />
              </Button>
            </div> */}
            </Col>
          </Col>
          <div
            className="w-100 d-lg-flex align-items-end justify-content-end mb-0 p-0"
            style={{ overflow: "hidden" }}
          >
            <div className="bar">
              <span className="bar_content">
                કાંગારૂ મઘર કેર ફાઉન્ડેશન ઓફ ઈન્ડિયા પ્રેરિત અને એન. એન. એફ.
                ગુજરાત અને યુનિસેફના સહયોગથી આયોજિત કાંગારૂ માતા સંભાળ તાલીમ
                કાયૅક્રમ
              </span>
            </div>
            {/* <img className="img-fluid" src={source} alt="Login Cover" /> */}
          </div>
        </Row>
      </div>
    </>
  );
};

const CheckLogin = () => {
  console.log("isUserLoggedIn() ");
  return isUserLoggedIn() ? <Navigate to="/" /> : <Login />;
};

export default CheckLogin;
