
import { toast } from 'react-toastify'

const showErrorToast = message => {
  toast.error(message, {
    position: toast.POSITION.BOTTOM_RIGHT
  });
};

const showSuccessToast = message => {
  toast.success(message, {
    position: toast.POSITION.BOTTOM_RIGHT
  });
};

const showInfoToast = message => {
  toast.info(message, {
    position: toast.POSITION.BOTTOM_RIGHT
  });
};

export {
  showInfoToast,
  showErrorToast,
  showSuccessToast
}