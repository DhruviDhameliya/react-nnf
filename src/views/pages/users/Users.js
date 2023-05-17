import { Fragment, useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { Card, CardBody, CardHeader, CardTitle } from "reactstrap";
import { getAllUsers } from "../../../@core/api/common_api";
import { notification } from "../../../@core/constants/notification";

function Users() {
  const [userList, setUserList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [totalUserData, setTotalUserData] = useState(0);

  useEffect(() => {
    getAllUser(currentPage, rowsPerPage);
  }, []);

  const getAllUser = async (page, perPage) => {
    let resp = await getAllUsers(page, perPage);
    // console.log(resp);
    if (resp?.status == 1) {
      setUserList(resp?.data);
      setTotalUserData(resp?.total_users);
    } else {
      notification({
        type: "error",
        message: resp?.message,
      });
      setUserList([]);
      setTotalUserData(0);
    }
  };

  const handlePerPage = (newPerPage) => {
    // console.log("new", newPerPage);
    setRowsPerPage(newPerPage);
    setCurrentPage(1);
    getAllUser(currentPage, newPerPage);
  };

  const handlePagination = (page) => {
    // console.log("new", page);
    setCurrentPage(page);
    getAllUser(page, rowsPerPage);
  };

  const column = [
    {
      name: "No.",
      selector: (row) => row?.row_no,
      //   cell: (row, index) => index,
      sortable: true,
      width: "70px",
    },
    {
      name: "Name",
      selector: (row) => row?.name,
    },
    {
      name: "Mobile",
      selector: (row) => row?.mobile,
    },
    {
      name: "Email",
      selector: (row) => row?.u_email,
      width: "250px",
    },
    {
      name: "Address",
      selector: (row) => row?.address,
    },
    {
      name: "City",
      selector: (row) => row?.city,
    },
    {
      name: "PinCode",
      selector: (row) => row?.pincode,
    },
    {
      name: "Qualification",
      selector: (row) => row?.qualification,
    },
  ];

  const ExpandableRow = ({ data }) => {
    return (
      <>
        <div className="expandable-content p-2">
          <p>
            <span>
              <b>Age :</b> {data?.age}
            </span>
          </p>
          <p>
            <span>
              <b>Marital Status :</b>
              {data?.marital_status == 0 ? "Unmarried" : "Married"}
            </span>
          </p>
          <p>
            <span>
              <b>No of Children :</b> {data?.no_of_children}
            </span>
          </p>
          <p>
            <span>
              <b>Specialty :</b>
              {data?.specialty != null
                ? data?.specialty
                : data?.other_specialty}
            </span>
          </p>
          <p>
            <span>
              <b>Type of Work :</b> {data?.type_of_work}
            </span>
          </p>
          <p>
            <span>
              <b>Area of Work :</b>
              {data?.area_of_work != null
                ? data?.area_of_work
                : data?.other_area_of_work}
            </span>
          </p>
          <p>
            <span>
              <b>Exact Area of Work :</b>
              {data?.exact_area_of_work != null
                ? data?.exact_area_of_work
                : data?.other_exact_area_of_work}
            </span>
          </p>
          <p>
            <span>
              <b>Member Of :</b>
              {data?.member_of}
            </span>
          </p>
        </div>
      </>
    );
  };
  return (
    <Fragment>
      <Card>
        <CardHeader className="flex-md-row flex-column align-md-items-center align-items-center border-bottom">
          <CardTitle tag="h4">Users List</CardTitle>
        </CardHeader>
        <CardBody>
          <div className="react-dataTable">
            <DataTable
              // title="Users List"s
              highlightOnHover
              pagination
              paginationServer
              columns={column}
              data={userList}
              paginationTotalRows={totalUserData}
              onChangeRowsPerPage={handlePerPage}
              onChangePage={handlePagination}
              paginationDefaultPage={currentPage}
              expandableRows
              expandableRowsComponent={ExpandableRow}
              className="react-dataTable"
            />
          </div>
        </CardBody>
      </Card>
    </Fragment>
  );
}

export default Users;
