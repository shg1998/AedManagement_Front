import { toast, ToastOptions } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


export const supportsVibrate = "vibrate" in window.navigator;
export const vibrate = (pattern: number | number[]): void => {
  if (supportsVibrate) {
    window.navigator.vibrate(pattern);
  }
};

export enum ToastDurationEnum {
  Short = 2000,
  Medium = 5000,
  Long = 12000,
  VeryLong = 20000,
}

export const ToastVibratePattern = {
  INFO: [300],
  SIMPLE: [200, 200, 200],
  SUCCESS: [500],
  WARN: [300, 250, 500],
  ERROR: [350, 200, 350, 200, 350],
};

export const TOAST_MESSAGE_MAX_LENGTH = 60;

const getAutoClose = (message: string): number => {
  return message.length > TOAST_MESSAGE_MAX_LENGTH
    ? ToastDurationEnum.Long
    : ToastDurationEnum.Medium;
};

export const tSimple = (message = "", options: ToastOptions = {}) => {
  vibrate(ToastVibratePattern.SIMPLE);
  return toast(message, options);
};

export const tInfo = (message = "", options: ToastOptions = {}) => {
  vibrate(ToastVibratePattern.INFO);
  return toast.info(
    <>
      {/* <FontAwesomeIcon icon={faInfoCircle} size="lg" /> */}
      <span className="toast-message">{message}</span>
    </>,
    {
      autoClose: getAutoClose(message),
      ...options,
    }
  );
};

export const tSuccess = (message = "", options: ToastOptions = {}) => {
  vibrate(ToastVibratePattern.SUCCESS);
  return toast.success(
    <>
      {/* <FontAwesomeIcon icon={faCheckCircle} size="lg" /> */}
      <span className="toast-message">{message}</span>
    </>,
    {
      autoClose: getAutoClose(message),
      ...options,
    }
  );
};

export const tWarn = (message = "", options: ToastOptions = {}) => {
  vibrate(ToastVibratePattern.WARN);
  return toast.warn(
    <>
      {/* <FontAwesomeIcon icon={faExclamationCircle} size="lg" /> */}
      <span className="toast-message">{message}</span>
    </>,
    {
      autoClose: getAutoClose(message),
      ...options,
    }
  );
};

export const tError = (message = "", options: ToastOptions = {}) => {
  vibrate(ToastVibratePattern.ERROR);
  if (!toast.isActive("error-toast")) {
    return toast.error(
      <>
        {/* <FontAwesomeIcon icon={faTimesCircle} size="lg" /> */}
        <span className="toast-message">{message}</span>
      </>,
      {
        toastId: "error-toast",
        autoClose: getAutoClose(message),
        ...options,
      }
    );
  }
 
};
