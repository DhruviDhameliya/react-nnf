import React from "react";
import { useState, useEffect } from "react";
import { ChevronDown, Download } from "react-feather";
import DataTable from "react-data-table-component";
import {
  Button,
  Input,
  Row,
  Col,
  Card,
  CardHeader,
  CardTitle,
  Spinner,
} from "reactstrap";
import "@styles/react/apps/app-invoice.scss";
import "@styles/react/libs/tables/react-dataTable-component.scss";
import {
  downloadExcelOfQuizReport,
  getExcelOfQuizReport,
  getOverallQuizReport,
  getQuizReportOfUser,
  getQuizUsers,
} from "../../../@core/api/common_api";
import { notification } from "../../../@core/constants/notification";

const QuizReport = () => {
  const [quizReportData, setQuizReportData] = useState([]);
  const [value, setValue] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [totalQuizReportData, setTotalQuizReportData] = useState(0);
  const [preLoading, setPreLoading] = useState(false);
  const [postLoading, setPostLoading] = useState(false);

  useEffect(() => {
    getQuizReportData(value, currentPage, rowsPerPage);
  }, []);

  const downloadUserQuizReport = async (type) => {
    let resp = await getQuizReportOfUser(type);
    await getExcelOfQuizReport(resp?.u_id);
  };
  const downloadOverallQuizReport = async (row) => {
    row == 0 ? setPreLoading(true) : setPostLoading(true)
    await getOverallQuizReport(row);
    await downloadExcelOfQuizReport(row);
    row == 0 ? setPreLoading(false) : setPostLoading(false)
  };

  const getQuizReportData = async (val, page, perPage) => {
    let data = { u_name: val, page: page, perPage: perPage };

    let resp = await getQuizUsers(data);
    if (resp?.status == 1) {
      setQuizReportData(resp?.data);
      setTotalQuizReportData(resp?.total_user);
    } else {
      notification({
        type: "error",
        message: resp?.message,
      });
      setQuizReportData([]);
      setTotalQuizReportData(0);
    }
  };

  const handleFilter = (val) => {
    setValue(val);
    setCurrentPage(1);
    getQuizReportData(val, 1, rowsPerPage);
  };

  const handlePerPage = (newPerPage) => {
    // console.log("new", newPerPage);
    setRowsPerPage(newPerPage);
    setCurrentPage(1);
    getQuizReportData(value, 1, newPerPage);
  };

  const handlePagination = (page) => {
    // console.log("new", page);
    setCurrentPage(page);
    getQuizReportData(value, page, rowsPerPage);
  };

  const columns = [
    {
      name: "No.",
      cell: (row, index) =>
        parseInt(currentPage - 1) * parseInt(rowsPerPage) + parseInt(index + 1),
      width: "70px",
    },
    {
      name: "User name",
      selector: (row) => row.name,
    },
    {
      name: "Mobile",
      selector: (row) => row.mobile,
    },
    {
      name: "Email",
      selector: (row) => row.u_email,
    },
    {
      name: "Actions",
      allowOverflow: true,
      cell: (row) => {
        return (
          <div>
            <span title="Download Quiz Report">
              <Download
                size={18}
                style={{ marginRight: "5px", cursor: "pointer" }}
                color="green"
                onClick={() => {
                  downloadUserQuizReport(row);
                }}
              />
            </span>
          </div>
        );
      },
    },
  ];

  return (
    <div className="invoice-list-wrapper">
      <Card>
        <CardHeader className="flex-md-row flex-column align-md-items-center align-items-center border-bottom">
          <CardTitle tag="h4">User Quiz Report</CardTitle>
        </CardHeader>
        <div className="invoice-list-table-header w-100 p-2">
          <Row>
            <Col
              lg="6"
              className="actions-right d-flex align-items-center justify-content-lg-start flex-lg-nowrap flex-wrap mt-lg-0 mt-1 pe-lg-1 p-0 px-2"
            >
              <div className="d-flex align-items-center">
                <label htmlFor="search-invoice">Search</label>
                <Input
                  id="search-invoice"
                  className="ms-50 me-2 w-100"
                  type="text"
                  value={value}
                  onChange={(e) => handleFilter(e.target.value)}
                  placeholder="Search Name or Mobile or Email"
                />
              </div>
            </Col>
            <Col
              lg="6"
              className="actions-right d-flex align-items-center justify-content-lg-end flex-lg-nowrap flex-wrap mt-lg-0 mt-1 pe-lg-1 p-0 px-2"
            >
              <div className="d-flex align-items-center">
                <Button
                  className="me-1"
                  color="primary"
                  type="button"
                  onClick={() => {
                    downloadOverallQuizReport(0);
                  }}
                >
                  {preLoading && <Spinner color="white" size="sm" />} Export Pre
                  Quiz Report
                </Button>
                <Button
                  className="me-1"
                  color="primary"
                  type="button"
                  onClick={() => {
                    downloadOverallQuizReport(1);
                  }}
                >
                  {postLoading && <Spinner color="white" size="sm" />} Export Post Quiz Report
                </Button>
              </div>
            </Col>
          </Row>
        </div>
        <div className="invoice-list-dataTable react-dataTable">
          <DataTable
            title="User Quiz Report"
            noHeader
            highlightOnHover
            pagination
            paginationServer
            columns={columns}
            paginationTotalRows={totalQuizReportData}
            onChangeRowsPerPage={handlePerPage}
            onChangePage={handlePagination}
            paginationDefaultPage={currentPage}
            className="react-dataTable"
            sortIcon={<ChevronDown size={10} />}
            expandOnRowClicked
            data={quizReportData}
          />
        </div>
      </Card>
    </div>
  );
};

export default QuizReport;
