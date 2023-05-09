import React from "react";
import { useState } from "react";
import { Fragment } from "react";
import { useNavigate } from "react-router-dom";
import secureLocalStorage from "react-secure-storage";
import { Card, Nav, NavItem, NavLink, TabContent, TabPane } from "reactstrap";
import PersonalUpdate from "./PersonalUpdate";
import AccountUpdate from "./ExtraUpdate";
import UpdatePassword from "./UpdatePassword";
import { useEffect } from "react";

const ProfileUpdate = () => {
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

  let user = JSON.parse(secureLocalStorage.getItem("userData"));
  const [active, setActive] = useState("1");
  const [registerData, setRegisterData] = useState(user);

  useEffect(() => {
    getUserData();
  }, []);

  const toggle = (tab) => {
    setActive(tab);
  };

  const getUserData = () => {
    console.log("user", user);
    setRegisterData(user);
  };

  const onHandleChange = (e, name) => {
    console.log(e, name, "!!!!!!!!!!");
    setRegisterData((prevState) => ({
      ...prevState,
      [name]: e,
    }));
  };

  return (
    <Fragment>
      <Card title="Profile" className="p-2">
        <Nav className="justify-content-end" pills>
          <NavItem>
            <NavLink
              active={active === "1"}
              onClick={() => {
                toggle("1");
              }}
            >
              Personal
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              active={active === "2"}
              onClick={() => {
                toggle("2");
              }}
            >
              Extra
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              active={active === "3"}
              onClick={() => {
                toggle("3");
              }}
            >
              Password
            </NavLink>
          </NavItem>
        </Nav>
        <TabContent className="py-50" activeTab={active}>
          {active == 1 && (
            <TabPane tabId="1">
              {console.log("refister", registerData)}
              <PersonalUpdate
                onHandleChange={onHandleChange}
                registerData={registerData}
              />
            </TabPane>
          )}
          {active == 2 && (
            <TabPane tabId="2">
              <AccountUpdate
                onHandleChange={onHandleChange}
                registerData={registerData}
              />
            </TabPane>
          )}
          {active == 3 && (
            <TabPane tabId="3">
              <UpdatePassword registerData={registerData} toggle={toggle} />
            </TabPane>
          )}
        </TabContent>
      </Card>
    </Fragment>
  );
};

export default ProfileUpdate;
