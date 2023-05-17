import React from "react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

// ** Table Columns
// import { columns } from "./columns";

// ** Third Party Components
import ReactPaginate from "react-paginate";
import { ChevronDown } from "react-feather";
import DataTable from "react-data-table-component";

// ** Reactstrap Imports
import {
  Button,
  Input,
  Row,
  Col,
  Card,
  CardHeader,
  CardTitle,
} from "reactstrap";

// ** Store & Actions
// import { getData } from "../store";
// import { useDispatch, useSelector } from "react-redux";
import "@styles/react/apps/app-invoice.scss";
import "@styles/react/libs/tables/react-dataTable-component.scss";
import {
  getExcelQuizReport,
  getQuizReport,
} from "../../../@core/api/common_api";
import { notification } from "../../../@core/constants/notification";
import ReactExport from "react-data-export";
import XLSX from "sheetjs-style";
import * as FileSaver from "file-saver";

const QuizReport = () => {
  //   const dispatch = useDispatch();
  //   const store = useSelector((state) => state.invoice);

  // ** States
  const [quizReportData, setQuizReportData] = useState([]);
  const [value, setValue] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [totalQuizReportData, setTotalQuizReportData] = useState(0);
  const [excelQuizReportData, setExcelQuizReportData] = useState([]);

  const ExcelFile = ReactExport.ExcelFile;
  const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
  const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;

  useEffect(() => {
    getQuizReportData(value, currentPage, rowsPerPage);
  }, []);

  const getQuizReportData = async (val, page, perPage) => {
    let data = { u_name: val, page: page, perPage: perPage };

    let resp = await getQuizReport(data);
    // console.log("resp", resp);
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

  const exportData = async () => {
    let resp = await getExcelQuizReport({ u_name: value });
    // console.log("resp", resp);
    if (resp?.status == 1) {
      setExcelQuizReportData(resp?.data);
    } else {
      notification({
        type: "error",
        message: resp?.message,
      });
      setExcelQuizReportData([]);
    }

    // var newobj = [];

    // resp?.data?.map((row, i) => {
    //   newobj = [
    //     ...newobj,
    //     [
    //
    //     ],
    //   ];
    // });

    // setExcelQuizReportData([
    //   {
    //     columns: [
    //       { title: "User Name", width: { wpx: 150 } },
    //       { title: "Video", width: { wpx: 150 } },
    //       { title: "Total", width: { wpx: 150 } },
    //       { title: "Pre Result", width: { wpx: 150 } },
    //       { title: "Post Result", width: { wpx: 150 } },
    //       { title: "Total Attempt", width: { wpx: 150 } },
    //     ],
    //     data: newobj,
    //   },
    // ]);
    let newArray = [];
    resp?.data?.map((row, i) => {
      newArray.push({
        "User Name": row.u_name,
        Video: row.v_name,
        Total: row.total_question,
        "Pre Result ": row.pre_correct_ans,
        "Post Result": row.post_correct_ans,
        "Total Attempt": row.attempt,
      });
    });
    const fileType =
      "application/vnd.openxmlformates-officedocument.spreadsheetmlsheet;charset=UTF-8";
    const fileExtension = ".xlsx";
    const exportToExcel = async () => {
      const ws = XLSX.utils.json_to_sheet(newArray);
      const wb = { Sheets: { data: ws }, SheetNames: ["data"] };
      const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
      const data = new Blob([excelBuffer], { type: fileType });
      FileSaver.saveAs(data, "Report" + fileExtension);
    };
    exportToExcel();
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

  const CustomPagination = () => {
    return (
      <ReactPaginate
        previousLabel=""
        nextLabel=""
        forcePage={currentPage}
        onPageChange={(page) => handlePagination(page)}
        pageCount={20 / 10}
        breakLabel="..."
        pageRangeDisplayed={2}
        marginPagesDisplayed={2}
        activeClassName="active"
        pageClassName="page-item"
        breakClassName="page-item"
        breakLinkClassName="page-link"
        nextLinkClassName="page-link"
        nextClassName="page-item next"
        previousClassName="page-item prev"
        previousLinkClassName="page-link"
        pageLinkClassName="page-link"
        // breakClassName='page-item'
        // breakLinkClassName='page-link'
        containerClassName="pagination react-paginate separated-pagination pagination-sm justify-content-end pr-1 mt-1"
      />
    );
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
      selector: (row) => row.u_name,
    },
    {
      name: "Video",
      selector: (row) => row.v_name,
    },
    {
      name: "Total",
      selector: (row) => row.total_question,
    },
    {
      name: "Pre Result",
      selector: (row) => row.pre_correct_ans,
    },
    {
      name: "Post Result",
      selector: (row) => row.post_correct_ans,
    },
    {
      name: "Total Attempt",
      selector: (row) => row.attempt,
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
                  placeholder="Search Name or Video"
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
                    exportData();
                  }}
                >
                  Export
                </Button>
                {/* {excelData && excelData?.length > 0 && ( */}

                {/* <ExcelFile
                  filename={`abc`}
                  //   element={
                  //     <button className="btn btn-primary">Export Excel</button>
                  //   }
                >
                  <ExcelSheet
                    dataSet={excelQuizReportData}
                    name="Organization"
                  />
                </ExcelFile> */}

                {/* )} */}
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
            // paginationComponent={CustomPagination}
            // expandableRows
            expandOnRowClicked
            data={quizReportData}
          />
        </div>
      </Card>
    </div>
  );
};

export default QuizReport;
