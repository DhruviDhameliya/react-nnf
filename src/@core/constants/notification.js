import { toast, Slide } from "react-toastify";
import { Fragment } from "react";
import "react-toastify/dist/ReactToastify.css";
toast.configure();
export function notification(
  obj = {
    type: "info",
    title: "title",
    message: "Message",
    icon: "",
    position: "right",
  }
) {
  const ToastContent = ({ title, message }) => (
    <Fragment>
      <div className="toastify-header">
        <div className="title-wrapper">
          <h6 className="toastify-title font-weight-bold text-white">
            {title}
          </h6>
        </div>
      </div>
      <div className="toastify-body">
        <span>{message} </span>
      </div>
    </Fragment>
  );

  const notify = () => {
    const ob = { icon: obj.icon, position: toast.POSITION.BOTTOM_RIGHT };

    if (obj.position === "left") {
      ob["position"] = toast.POSITION.BOTTOM_LEFT;
    }
    if (obj.position === "bottom") {
      ob["position"] = toast.POSITION.BOTTOM_CENTER;
    }
    if (obj.type === "info") {
      toast.info(<ToastContent title={obj.title} message={obj.message} />, {
        transition: Slide,
        hideProgressBar: true,
        autoClose: 2000,
      });
    }
    if (obj.type === "error") {
      toast.error(<ToastContent title={obj.title} message={obj.message} />, {
        transition: Slide,
        hideProgressBar: true,
        autoClose: 2000,
      });
    }
    if (obj.type === "success") {
      toast.success(<ToastContent title={obj.title} message={obj.message} />, {
        transition: Slide,
        hideProgressBar: true,
        autoClose: 2000,
      });
    }
    if (obj.type === "warn") {
      toast.warn(<ToastContent title={obj.title} message={obj.message} />, {
        transition: Slide,
        hideProgressBar: true,
        autoClose: 2000,
      });
    }
  };
  notify();
}
