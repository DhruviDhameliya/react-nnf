// ** React Imports
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

// ** Third Party Components
import classnames from "classnames";
import PerfectScrollbar from "react-perfect-scrollbar";
import {
  Mail,
  Send,
  Edit2,
  Star,
  Info,
  Trash,
  CheckCircle,
  PlayCircle,
  Lock,
  Unlock,
} from "react-feather";

// ** Reactstrap Imports
import { Button, ListGroup, ListGroupItem, Badge } from "reactstrap";
import { getVideos } from "../../../@core/api/common_api";
import { countPassingScore } from "../../../@core/components/common/Common";

const Sidebar = (props) => {
  // ** Props
  const {
    videoList,
    video,
    handleChangeStep,
    handleChangeVideo,
    sidebarOpen,
    toggleCompose,
    setSidebarOpen,
    setOpenMail,
    preResult,
    postResult,
    handleQuizResult,
    handleNext,
    // changeVideo,
  } = props;

  // const changeVideo = async (v_data, index) => {
  //   if (
  //     index == 0 ||
  //     (index != 0 &&
  //       countPassingScore(videoList[index - 1]?.total_question, 70) <=
  //         videoList[index - 1]?.total_correct_ans)
  //   ) {
  //     await handleChangeVideo(index);
  //     let pre = await handleQuizResult(v_data?.v_id, 0);
  //     let post = await handleQuizResult(v_data?.v_id, 1);
  //     if (Object?.keys(pre)?.length != 0) {
  //       console.log("ifffffffffff");
  //       await handleChangeStep(3);
  //     } else if (Object?.keys(post)?.length != 0) {
  //       await handleChangeStep(5);
  //     } else if (index == 0) {
  //       await handleChangeStep(1);
  //     } else {
  //       handleChangeStep(2);
  //     }
  //   }
  // };

  useEffect(() => {
    // console.log("#######################################");
  }, [props]);

  return (
    <div
      className={classnames("sidebar-left", {
        show: sidebarOpen,
      })}
    >
      <div className="sidebar">
        <div className="sidebar-content email-app-sidebar">
          <div className="email-app-menu">
            <div className="form-group-compose text-center compose-btn">
              <h5>Videos</h5>
            </div>
            <PerfectScrollbar
              className="sidebar-menu-list cursor-pointer"
              options={{ wheelPropagation: false }}
            >
              <ListGroup tag="div" className="list-group-messages">
                {videoList &&
                  videoList?.map((v_data, index) => {
                    return (
                      <ListGroupItem
                        // tag={Link}
                        // to="/apps/email/sent"
                        onClick={() => {
                          // changeVideo(v_data, index);
                          handleNext(index);
                        }}
                        action
                        active={video?.v_id == v_data?.v_id}
                      >
                        {/* {video?.percentage == 100 ? (
                          <CheckCircle size={16} className="me-75"/>
                        ) : video?.percentage < 100 && video?.percentage > 0 ? (
                          <PlayCircle size={16} className="me-75" />
                        ) : (
                          <Lock size={16} className="me-75"  />
                        )} */}
                        {/* {v_data?.percentage == 100 ? (
                          <CheckCircle
                            size={20}
                            className="me-75"
                            color="green"
                          />
                        ) : v_data?.percentage < 100 &&
                          v_data?.percentage > 0 ? (
                          <PlayCircle size={20} className="me-75" />
                        ) : index == 0 ||
                          (index != 0 &&
                            videoList[index - 1]?.percentage == 100) ? (
                          <Unlock size={20} className="me-75" />
                        ) : (
                          <Lock size={20} className="me-75" />
                        )} */}
                        {(v_data?.total_question &&
                          v_data?.total_correct_ans &&
                          countPassingScore(v_data?.total_question, 70) <=
                            v_data?.total_correct_ans) ||
                        (v_data?.total == 0 && v_data?.percentage > 95) ? (
                          <CheckCircle
                            size={20}
                            className="me-75"
                            color="green"
                          />
                        ) : countPassingScore(v_data?.total_question, 70) >
                          v_data?.total_correct_ans ? (
                          <PlayCircle size={20} className="me-75" />
                        ) : index == 0 ||
                          (index != 0 &&
                            (countPassingScore(
                              videoList[index - 1]?.total_question,
                              70
                            ) <= videoList[index - 1]?.total_correct_ans ||
                              (videoList[index - 1]?.total == 0 &&
                                videoList[index - 1]?.percentage > 95))) ? (
                          <Unlock size={20} className="me-75" />
                        ) : (
                          <Lock size={20} className="me-75" />
                        )}
                        <span className="align-middle">{v_data?.v_name}</span>
                      </ListGroupItem>
                    );
                  })}
              </ListGroup>
              {/* <h6 className="section-label mt-3 mb-1 px-2">Labels</h6>
              <ListGroup tag="div" className="list-group-labels">
                <ListGroupItem
                  tag={Link}
                  to="/apps/email/label/personal"
                  onClick={() => handleLabel("personal")}
                  active={handleActiveItem("personal")}
                  action
                >
                  <span className="bullet bullet-sm bullet-success me-1"></span>
                  Personal
                </ListGroupItem>
                <ListGroupItem
                  tag={Link}
                  to="/apps/email/label/company"
                  onClick={() => handleLabel("company")}
                  active={handleActiveItem("company")}
                  action
                >
                  <span className="bullet bullet-sm bullet-primary me-1"></span>
                  Company
                </ListGroupItem>
                <ListGroupItem
                  tag={Link}
                  to="/apps/email/label/important"
                  onClick={() => handleLabel("important")}
                  active={handleActiveItem("important")}
                  action
                >
                  <span className="bullet bullet-sm bullet-warning me-1"></span>
                  Important
                </ListGroupItem>
                <ListGroupItem
                  tag={Link}
                  to="/apps/email/label/private"
                  onClick={() => handleLabel("private")}
                  active={handleActiveItem("private")}
                  action
                >
                  <span className="bullet bullet-sm bullet-danger me-1"></span>
                  Private
                </ListGroupItem>
              </ListGroup> */}
            </PerfectScrollbar>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
