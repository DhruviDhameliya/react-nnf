// step-0 : videos List
// step-1 : Instructions
// step-2 : Pre Quiz
// step-3 : Play video
// step-4 : post Quiz
// step-5 : Quiz Result

// ** React Imports
import { useParams } from "react-router-dom";
import { Fragment, useEffect, useState } from "react";

// ** Email App Component Imports
// import Mails from './Mails'
import Sidebar from "./Sidebar";

// ** Third Party Components
import classnames from "classnames";

// ** Store & Actions
import { useDispatch, useSelector } from "react-redux";
// import {
//   getMails,
//   selectMail,
//   updateMails,
//   paginateMail,
//   selectAllMail,
//   updateMailLabel,
//   resetSelectedMail,
//   selectCurrentMail
// } from './store'

// ** Styles
import "@styles/react/apps/app-email.scss";
import QuizVideo from "./QuizVideo";
import Videos from "./Videos";
import {
  getQuizResult,
  getVideosWithPercentage,
} from "../../../@core/api/common_api";
import { notification } from "../../../@core/constants/notification";
import secureLocalStorage from "react-secure-storage";
import Instruction from "./Instruction";
import Quiz from "./Quiz";
import { Menu } from "react-feather";
import QuizResult from "./QuizResult";
import { countPassingScore } from "../../../@core/components/common/Common";

const QuizApp = () => {
  // ** States

  let user = JSON.parse(secureLocalStorage.getItem("userData"));
  const [query, setQuery] = useState("");
  const [openMail, setOpenMail] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [composeOpen, setComposeOpen] = useState(false);
  const [videoList, setVideoList] = useState([]);
  const [step, setStep] = useState(0);
  const [video, setVideo] = useState(0);
  const [preResult, setPreResult] = useState({});
  const [postResult, setPostResult] = useState({});

  // ** Toggle Compose Function
  const toggleCompose = () => setComposeOpen(!composeOpen);

  // ** Store Variables
  const dispatch = useDispatch();
  const store = useSelector((state) => state.email);

  // ** Vars
  const params = useParams();

  useEffect(() => {
    getVideoList();
  }, []);

  useEffect(() => {
    getVideoList();
  }, [preResult, postResult]);

  const handleChangeVideo = (video) => {
    setVideo(video);
    // handleQuizResult(video?.v_id, 0);
    // handleQuizResult(video?.v_id, 1);
  };

  // const changeVideo = async (video, index) => {
  //   if (
  //     index == 0 ||
  //     (index != 0 &&
  //       countPassingScore(videoList[index - 1]?.total_question, 70) <=
  //         videoList[index - 1]?.total_correct_ans)
  //   ) {
  //     if (index == 0 && video?.percentage == null) {
  //       let resp = await updateVideoPercentage({
  //         v_id: video.v_id,
  //         percentage: 0,
  //         u_id: user?.u_id,
  //       });
  //     }
  //     console.log(preResult, "preResulfggggggggggggd");
  //     await handleChangeVideo(video);
  //     let pre = await handleQuizResult(video?.v_id, 0);
  //     let post = await handleQuizResult(video?.v_id, 1);
  //     console.log(preResult, pre, "preResultttttttttttttttttttttttt");
  //     if (Object?.keys(pre)?.length != 0) {
  //       console.log("ifffffffffff");
  //       await handleChangeStep(3);
  //     } else if (Object?.keys(post)?.length != 0) {
  //       console.log("elseeeeeeeeeeeeeee");
  //       await handleChangeStep(5);
  //     } else if (index == 0) {
  //       await handleChangeStep(1);
  //     } else {
  //       handleChangeStep(2);
  //     }
  //   }
  // };

  const handleChangeStep = (step) => {
    setStep(step);
  };

  const getVideoList = async () => {
    let resp = await getVideosWithPercentage(user?.u_id);
    console.log(resp);
    if (resp?.status == 1) {
      setVideoList(resp?.data);
    } else {
      notification({
        type: "error",
        message: resp?.message,
      });
    }
  };

  const handleQuizResult = async (v_id, type) => {
    let resp = await getQuizResult(user?.u_id, v_id, type);
    console.log(resp);
    if (resp?.status == 1) {
      if (type == 0) {
        setPreResult(resp?.data[0]);
        return resp?.data[0];
      } else {
        setPostResult(resp?.data[0]);
        return resp?.data[0];
      }
    } else {
      setPreResult({});
      setPostResult({});
      // notification({
      //   type: "error",
      //   message: resp?.message,
      // });
      return {};
    }
  };

  // ** UseEffect: GET initial data on Mount
  // useEffect(() => {
  //   dispatch(getMails({ q: query || '', folder: params.folder || 'inbox', label: params.label || '' }))
  // }, [query, params.folder, params.label])

  return (
    <Fragment>
      {step == 0 ? (
        <Videos
          videoList={videoList}
          handleChangeVideo={handleChangeVideo}
          handleChangeStep={handleChangeStep}
          handleQuizResult={handleQuizResult}
          preResult={preResult}
          postResult={postResult}
          // changeVideo={changeVideo}
        />
      ) : (
        <>
          <Sidebar
            video={video}
            videoList={videoList}
            handleChangeVideo={handleChangeVideo}
            handleChangeStep={handleChangeStep}
            handleQuizResult={handleQuizResult}
            // changeVideo={changeVideo}
            // store={store}
            // dispatch={dispatch}
            // getMails={getMails}
            setOpenMail={setOpenMail}
            sidebarOpen={sidebarOpen}
            toggleCompose={toggleCompose}
            setSidebarOpen={setSidebarOpen}
            preResult={preResult}
            postResult={postResult}
            // resetSelectedMail={resetSelectedMail}
          />
          <div className="content-right">
            <div className="content-body">
              <div
                className={classnames("body-content-overlay", {
                  show: sidebarOpen,
                })}
                onClick={() => setSidebarOpen(false)}
              ></div>
              <div className="" style={{ height: "100vh", overflow: "scroll" }}>
                <div className="app-fixed-search d-flex align-items-center">
                  <div
                    className="sidebar-toggle d-block d-lg-none ms-1"
                    onClick={() => setSidebarOpen(true)}
                  >
                    <Menu size="21" />
                  </div>
                  <div className="d-flex align-content-center justify-content-between w-100 p-1">
                    <h5>{video?.v_name}</h5>
                  </div>
                </div>
                {step == 1 && (
                  <Instruction
                    video={video}
                    videoList={videoList}
                    handleChangeVideo={handleChangeVideo}
                    handleChangeStep={handleChangeStep}
                    setSidebarOpen={setSidebarOpen}
                    handleQuizResult={handleQuizResult}
                  />
                )}
                {(step == 2 || step == 4) && (
                  <Quiz
                    video={video}
                    videoList={videoList}
                    handleChangeVideo={handleChangeVideo}
                    handleChangeStep={handleChangeStep}
                    setSidebarOpen={setSidebarOpen}
                    handleQuizResult={handleQuizResult}
                    step={step}
                    // changeVideo={changeVideo}
                  />
                )}
                {step == 3 && (
                  <QuizVideo
                    video={video}
                    videoList={videoList}
                    handleChangeVideo={handleChangeVideo}
                    handleChangeStep={handleChangeStep}
                    setSidebarOpen={setSidebarOpen}
                    handleQuizResult={handleQuizResult}
                    // changeVideo={changeVideo}
                  />
                )}
                {step == 5 && (
                  <QuizResult
                    video={video}
                    videoList={videoList}
                    handleChangeVideo={handleChangeVideo}
                    handleChangeStep={handleChangeStep}
                    setSidebarOpen={setSidebarOpen}
                    handleQuizResult={handleQuizResult}
                    preResult={preResult}
                    postResult={postResult}
                    // changeVideo={changeVideo}
                  />
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </Fragment>
  );
};

export default QuizApp;
