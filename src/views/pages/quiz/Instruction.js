import React, { useState } from "react";
import { Fragment } from "react";
import { Menu } from "react-feather";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  Input,
  Label,
} from "reactstrap";

const Instruction = (props) => {
  // ** Props
  const {
    setSidebarOpen,
    video,
    videoList,
    handleChangeVideo,
    handleChangeStep,
  } = props;

  const [conformation, setConformation] = useState(false);

  const startQuiz = () => {
    if (conformation == true) {
      handleChangeStep(2);
    }
  };

  return (
    <Fragment>
      {/* <div className="mb-3" style={{ height: "100vh", overflow: "scroll" }}>
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
        </div> */}
      <div
        className="app-action pb-3"
        style={{ height: "80%", overflow: "scroll" }}
      >
        <Card className="pb-3">
          <CardHeader className="flex-md-row flex-column align-md-items-center align-items-center border-bottom">
            <CardTitle tag="h5">Instructions</CardTitle>
          </CardHeader>
          <CardBody>
            <div className="mt-1">
              Online Consent of Nurse Participants for “Effect of Kangaroo
              Mother Care training using online video-based module in knowledge
              acquisition amongst nurses across Gujarat State” NNF Gujarat and
              KMC Foundation India along with other organizations want to train
              health care workers and nurses across Gujarat state for Kangaroo
              Mother Care by online video-based training module.
            </div>
            <div className="mt-1">
              All the nurses of Gujarat can participate in this module. After
              registering for module and providing your demographic details you
              will have an access to the online videos of KMC. Please complete
              pre-test questionnaire before individual video, then watch the
              video and subsequently answer the post-test questionnaire. At the
              end of the module please provide your valuable feedback. Those who
              will watch all the videos and complete pre-post Tests and feedback
              will be issued with the online certificate of completion of the
              video-based training module for KMC. You will have one month time
              to complete the training at your convenience. But once you have
              completed the training and received online certificate, you will
              be able to watch any KMC video any time without the need of
              answering questions.
            </div>
            <div className="mt-1">
              We hope that the online training will help you to improve your
              knowledge about KMC and will encourage you to practice KMC in your
              setup.
            </div>
            <div className="mt-1">
              We are conducting a research study to see the effect of this
              online KMC training module in knowledge acquisition amongst nurses
              of Gujarat state. The data of your pre and post-test answers as
              well as feedback will be utilized for the analysis in this study.
              Furthermore, results of this study can be utilized to improvise
              the module in future and help in training at various levels. Data
              will remain with the investigators and only the analysis will be
              shared in the form of research paper.
            </div>
            <div className="mt-1">
              Your participation in this research is valuable to us but it is
              entirely voluntary. Please provide consent by clicking checkbox.
            </div>
            <div className="mt-1">
              <div className="form-check form-check-inline">
                <Input
                  type="checkbox"
                  id="conformation"
                  name="conformation"
                  onChange={(e) => {console.log("e.target.checked",e.target.checked); setConformation(e.target.checked)}}
                />

                <Label for="conformation" className="form-check-label">
                  I agree to take part in the above research project.
                </Label>
              </div>
              {/* <div className="demo-inline-spacing">
                
                <div className="form-check">
                  <Input
                    type="radio"
                    id="yes"
                    name="conformation"
                    value={1}
                    onChange={(e) => setConformation(e.target.value)}
                  />
                  <Label className="form-check-label" for="yes">
                    Yes
                  </Label>
                </div>
                <div className="form-check">
                  <Input
                    type="radio"
                    name="conformation"
                    id="no"
                    value={0}
                    onChange={(e) => setConformation(e.target.value)}
                  />
                  <Label className="form-check-label" for="no">
                    No
                  </Label>
                </div>
              </div> */}
            </div>
            <div className="mt-1 d-flex justify-content-center">
              <Button
                color="primary"
                onClick={startQuiz}
                disabled={conformation != true}
              >
                Start Quiz
              </Button>
            </div>
          </CardBody>
        </Card>
      </div>
      {/* </div> */}
    </Fragment>
  );
};

export default Instruction;
