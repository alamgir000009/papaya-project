import { showToast } from "@/ui-components/Toast/Toast";
import axiosInstance from "./axiosInstance";

export const flattenedErrors = (errors) => {
  if (Array.isArray(errors)) {
    errors.forEach((error) => {
      showToast(error, "error");
    });
  } else {
    showToast("An unexpected error occurred.", "error");
  }
};

export const showObjectErrors = (objectItem) => {
  if (objectItem && Object.keys(objectItem).length > 0) {
    Object.entries(objectItem).forEach(([field, message]) => {
      showToast(message, "error");
    });
  }
};
export const showObjectSuccess = (objectItem) => {
  if (objectItem && Object.keys(objectItem).length > 0) {
    Object.entries(objectItem).forEach(([field, message]) => {
      showToast(message, "success");
    });
  }
};

export const logout = async () => {
  localStorage.removeItem("token");

  localStorage.removeItem("user");
  window.location.href = "/admin/login";
  await axiosInstance
    .post("api/user/logout")
    .then(() => {})
    .catch((error) => {});
};
