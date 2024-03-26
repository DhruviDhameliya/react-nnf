import React, { Fragment, useEffect, useRef, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { Button, Card, CardBody } from "reactstrap";
import { getUserById } from "../../../@core/api/common_api";
import secureLocalStorage from "react-secure-storage";
import moment from "moment/moment";

const Certificate = () => {
  let user = JSON.parse(secureLocalStorage.getItem("userData"));
  const [imagePreview, setImagePreview] = useState(null);
  const [userData, setUserData] = useState({});
  const navigate = useNavigate();
  const myCanvas = useRef();

  let certificate = require(`@src/assets/images/logo/certificate.jpeg`).default;

  useEffect(() => {
    // console.log(state, "statyhtyte");
    const newFunction = async () => {
      let resp = await getUserDataById();
      // console.log("resp", resp);

      if (resp?.certificate_status == 1) {
        const context = myCanvas?.current?.getContext("2d");
        let canvas = qrRef?.current?.querySelector("canvas");
        let image = canvas?.toDataURL("image/png");
        var sources = {
          // image1: image,
          image2: certificate,
        };
        loadImages(sources, function (images) {
          context.drawImage(images.image2, 0, 0, 918.73, 650);
          context.font = " bold 20px Verdana";
          context.textAlign = "center";
          context.fillText(resp?.name, 465, 325);
          context.font = "small-caps bold 16px serif";
          context.fillText(resp?.certificate_name, 550, 460);
          context.fillText(
            moment(resp?.created_timestamp).format("DD-MM-YYYY"),
            705,
            405
          );
          setImagePreview(myCanvas?.current?.toDataURL("image/png"));
        });
      }
    };
    newFunction();
  }, []);

  const getUserDataById = async () => {
    let resp = await getUserById(user?.u_id);
    if (resp?.status == 1) {
      setUserData(resp?.data[0]);
      return resp?.data[0];
    }
  };

  function loadImages(sources, callback) {
    var images = {};
    var loadedImages = 0;
    var numImages = 0;
    for (var src in sources) {
      numImages++;
    }
    for (var src in sources) {
      images[src] = new Image();
      images[src].crossOrigin = "anonymous";
      images[src].onload = function () {
        if (++loadedImages >= numImages) {
          callback(images);
        }
      };
      images[src].src = sources[src];
    }
  }

  const qrRef = useRef();
  function DownloadCanvasAsImage() {
    let downloadLink = document.createElement("a");
    downloadLink.setAttribute("download", "CanvasAsImage.png");
    let canvas = myCanvas.current;
    let dataURL = canvas.toDataURL("image/png");
    let url = dataURL.replace(
      /^data:image\/png/,
      "data:application/octet-stream"
    );
    downloadLink.setAttribute("href", url);
    downloadLink.click();
  }

  return (
    <Fragment>
      <Card>
        <canvas
          className="certificate"
          ref={myCanvas}
          width={918.73}
          height={650}
          style={{
            //   // border: "2px solid",
            //   backgroundImage: `url(${pass})`,
            //   backgroundSize: "cover",
            //   backgroundRepeat: "no-repeat",
            //   backgroundPosition: "center center",
            height: "100%",
            width: "100%",
            display: "none",
          }}
        />
        {userData?.certificate_status == 1 ? (
          <CardBody
            className="flex-md-row flex-column  align-items-center  border-bottom"
            style={{ display: "flex", justifyContent: "center" }}
          >
            <div>
              <img
                src={imagePreview}
                alt="Certificate"
                style={{ maxWidth: "100%", height: "auto" }}
              />
              <div
                style={{
                  marginBottom: "5px",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <Button
                  className="mt-2"
                  type="submit"
                  color="primary"
                  onClick={DownloadCanvasAsImage}
                >
                  Download
                </Button>
              </div>
            </div>
          </CardBody>
        ) : (
          <CardBody>
            We like your enthusiasm, but you'll have to finish All Videos and
            Quiz to get your Certificate.
          </CardBody>
        )}
      </Card>
    </Fragment>
  );
};

export default Certificate;
