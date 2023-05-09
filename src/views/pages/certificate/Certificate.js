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
      console.log("resp", resp);

      if (resp?.certificate_status == 1) {
        const context = myCanvas?.current?.getContext("2d");
        let canvas = qrRef?.current?.querySelector("canvas");
        let image = canvas?.toDataURL("image/png");
        var sources = {
          // image1: image,
          image2: certificate,
        };
        loadImages(sources, function (images) {
          context.drawImage(images.image2, 0, 0, 1100, 631);
          context.font = " bold 20px Verdana";
          context.textAlign = "center";
          context.fillText(resp?.name, 550, 315);
          context.font = "small-caps bold 16px serif";
          context.fillText(resp?.certificate_name, 855, 395);
          context.fillText(
            moment(resp?.created_timestamp).format("DD-MM-YYYY"),
            660,
            445
          );
          setImagePreview(myCanvas?.current?.toDataURL("image/png"));
          // if (localStorage.getItem("counter") !== "1") {
          //   if (myCanvas?.current?.toDataURL("image/png")) {
          //     let downloadLink = document.createElement("a");
          //     downloadLink.setAttribute("download", "CanvasAsImage.png");
          //     let canvas1 = myCanvas.current;
          //     let dataURL = canvas1?.toDataURL("image/png");
          //     let url = dataURL?.replace(
          //       /^data:image\/png/,
          //       "data:application/octet-stream"
          //     );
          //     downloadLink.setAttribute("href", url);
          //     downloadLink.click();
          //     localStorage.setItem("counter", 1);
          //   }
          // }
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
          ref={myCanvas}
          width={1100}
          height={631}
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
              <img src={imagePreview} alt="Registration Pass" />
              <div
                style={{
                  marginBottom: "5px",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <Button
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
