import { Fragment, useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  Col,
  Input,
  Row,
  Spinner,
} from "reactstrap";
import { getAllUsers, getExcelUsers } from "../../../@core/api/common_api";
import { notification } from "../../../@core/constants/notification";
import Select from "react-select";
import moment from "moment";
// import ReactExport from "react-data-export";
import XLSX from "sheetjs-style";
import * as FileSaver from "file-saver";

function Users() {
  const [userList, setUserList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [totalUserData, setTotalUserData] = useState(0);
  const [filterData, setFilterData] = useState({ search: "", type: 0 });
  const courseType = [
    { value: 1, label: "Course Completed" },
    { value: 2, label: "Course Pending" },
  ];

  const handleFilter = (val) => {
    setFilterData({ ...filterData, search: val });
    setCurrentPage(1);
    getAllUser({ ...filterData, search: val }, 1, rowsPerPage);
  };

  useEffect(() => {
    getAllUser(filterData, currentPage, rowsPerPage);
  }, []);

  const exportData = async () => {
    setLoading(true);
    let resp = await getExcelUsers(filterData);
    if (resp?.status == 1) {
      let newArray = [];
      resp?.data &&
        resp?.data?.map((row, i) => {
          newArray.push({
            "Registered Date": moment(row.created_timestamp).format(
              "DD-MM-YYYY"
            ),
            "Full Name": row.name,
            "Email Address": row.u_email,
            "Mobile Number": row.mobile,
            Address: row?.address,
            City: row?.city,
            PinCode: row?.pincode,
            Gender: row.gender == 0 ? "Male" : "Female",
            Age: row.age,
            Sex: row?.gender == 0 ? "Male" : "Female",
            "Marital Status": row.marital_status == 0 ? "Unmarried" : "Married",
            "No. of Children": row.no_of_children,
            Qualification: row.qualification,
            Specialty:
              row.specialty != 0 ? row.specialty_name : row.other_specialty,
            "Name of Organization": row.name_of_organization,
            "Type of work": row.type_of_work,
            "Area of Work":
              row?.area_of_work != null
                ? row?.area_of_work
                : row?.other_area_of_work,
            "Exact Area of Work":
              row?.exact_area_of_work != null
                ? row?.exact_area_of_work
                : row?.other_exact_area_of_work,
            "Member Of": row?.member_of,
            "Year of Experience": row.year_of_exp,
            "Certificate Date":
              row.certificate_status == 1
                ? moment(row?.certificateDate).format("DD-MM-YYYY")
                : "-",
            "Have you received any formal/informal training for Kangaroo Mother Care (KMC)?":
              row?.kmc == 1 ? "Yes" : "No",
            "Do you practice KMC in your area of work?":
              row?.kmc_work_area_yes == 1 ? "Yes" : "No",
            "If yes, since how many years you practice KMC?":
              row?.kmc_years || "-",
            "Have you provided KMC to your children?":
              row?.kmc_to_children_yes == 1
                ? "Yes"
                : row?.kmc_to_children_yes == 2
                ? "Not applicable"
                : "No",
          });
        });
      const fileType =
        "application/vnd.openxmlformates-officedocument.spreadsheetmlsheet;charset=UTF-8";
      const fileExtension = ".xlsx";
      const exportToExcel = async () => {
        const ws = XLSX.utils.json_to_sheet(newArray);
        const columnWidths = [
          { wch: 20 },
          { wch: 25 },
          { wch: 35 },
          { wch: 20 },
          { wch: 25 },
          { wch: 15 },
          { wch: 15 },
          { wch: 10 },
          { wch: 10 },
          { wch: 10 },
          { wch: 10 },
          { wch: 15 },
          { wch: 30 },
          { wch: 35 },
          { wch: 35 },
          { wch: 10 },
          { wch: 35 },
          { wch: 30 },
          { wch: 30 },
          { wch: 30 },
          { wch: 15 },
          { wch: 30 },
          { wch: 30 },
          { wch: 30 },
          { wch: 30 },
          { wch: 30 },
          { wch: 30 },
        ];

        ws["!cols"] = columnWidths;

        const headerStyle = {
          font: { bold: true },
        };

        const range = XLSX.utils.decode_range(ws["!ref"]);
        for (let col = range.s.c; col <= range.e.c; col++) {
          const cellAddress = XLSX.utils.encode_cell({ r: 0, c: col });
          if (!ws[cellAddress]) continue;
          ws[cellAddress].s = headerStyle;
          const cell = ws[cellAddress];

          if (cell && cell.t !== "z") {
            // Exclude empty and date cells
            if (!cell.s) cell.s = {}; // Initialize styles object if not already present
            cell.s.alignment = { horizontal: "center", vertical: "center" }; // Center-align content
          }
        }

        const wb = { Sheets: { data: ws }, SheetNames: ["data"] };
        const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
        const data = new Blob([excelBuffer], { type: fileType });
        FileSaver.saveAs(data, "Report" + fileExtension);
      };
      exportToExcel();
    } else {
      notification({
        type: "error",
        message: resp?.message,
      });
    }
    setLoading(false);
  };
  const getAllUser = async (filter, page, perPage) => {
    let data = { ...filter, page: page, perPage: perPage };
    let resp = await getAllUsers(data);
    if (resp?.status == 1) {
      setUserList(resp?.data);
      setTotalUserData(resp?.total_users);
    } else {
      setUserList([]);
      setTotalUserData(0);
    }
  };
  const handleFilterClear = async () => {
    setFilterData({ search: "" });
    getAllUser({ search: "" }, 1, rowsPerPage);
  };

  const handlePerPage = (newPerPage) => {
    setRowsPerPage(newPerPage);
    setCurrentPage(1);
    getAllUser(filterData, currentPage, newPerPage);
  };

  const handlePagination = (page) => {
    setCurrentPage(page);
    getAllUser(filterData, page, rowsPerPage);
  };

  const column = [
    {
      name: "No.",
      cell: (row, index) =>
        parseInt(currentPage - 1) * parseInt(rowsPerPage) + parseInt(index + 1),
      // selector: (row) => row?.row_no,
      sortable: true,
      width: "70px",
    },
    {
      name: "Register Date",
      selector: (row) => moment(row?.created_timestamp).format("DD-MM-YYYY"),
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
      width: "270px",
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
              <b>Sex :</b> {data?.gender == 0 ? "Male" : "Female"}
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
              {data.specialty != 0 ? data.specialty_name : data.other_specialty}
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
          <p>
            <span>
              <b>Name of Organization :</b>
              {data?.name_of_organization}
            </span>
          </p>
          <p>
            <span>
              <b>Year of Experience :</b>
              {data?.year_of_exp}
            </span>
          </p>
          <p>
            <span>
              <b>
                Have you received any formal/informal training for Kangaroo
                Mother Care (KMC)? :
              </b>
              {data?.kmc == 1 ? "Yes" : "No"}
            </span>
          </p>
          <p>
            <span>
              <b>Do you practice KMC in your area of work? :</b>
              {data?.kmc_work_area_yes == 1 ? "Yes" : "No"}
            </span>
          </p>
          <p>
            <span>
              <b>If yes, since how many years you practice KMC? :</b>
              {data?.kmc_work_area_yes || "-"}
            </span>
          </p>
          <p>
            <span>
              <b>Have you provided KMC to your children? :</b>
              {data?.kmc_to_children_yes == 1
                ? "Yes"
                : data?.kmc_to_children_yes == 2
                ? "Not applicable"
                : "No"}
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
        <Row className="m-1 d-flex justify-content-end">
          <Col md="3" sm="3" className="mb-1">
            <Select
              id="type"
              placeholder="Select Course Type"
              name="type"
              isClearable={true}
              options={
                courseType &&
                courseType?.map((s) => {
                  return { value: s?.value, label: s?.label };
                })
              }
              value={
                courseType &&
                courseType?.map((s) => {
                  if (s?.value == filterData?.type) {
                    return { label: s?.label, value: s?.value };
                  }
                })
              }
              onChange={(e) => {
                setFilterData({ ...filterData, type: e?.value || 0 });
                getAllUser(
                  { ...filterData, type: e?.value || 0 },
                  1,
                  rowsPerPage
                );
                setCurrentPage(1);
              }}
              classNamePrefix="select"
              className="react-select"
            />
          </Col>
          <Col md="3" sm="3" className="mb-1">
            <Input
              id="search-invoice"
              className="ms-50 me-2 w-100"
              type="text"
              value={filterData?.search}
              onChange={(e) => handleFilter(e.target.value)}
              placeholder="Search Name/Mobile/Email"
            />
          </Col>
          <Col md="2" sm="2" className="mb-1">
            <Button
              className="clearBtn"
              color="dark"
              onClick={handleFilterClear}
            >
              Clear
            </Button>
          </Col>
          <Col md="2" sm="2" className="mb-1">
            <Button
              color="primary"
              type="button"
              onClick={() => {
                exportData();
              }}
            >
              {loading && <Spinner color="white" size="sm" />} Export
            </Button>
          </Col>
        </Row>
        <CardBody>
          <div className="react-dataTable">
            <DataTable
              // title="Users List"s
              highlightOnHover
              pagination
              paginationServer
              paginationRowsPerPageOptions={[10, 25, 50, 75, 100, 200]}
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
