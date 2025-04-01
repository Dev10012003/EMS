import { toast } from "react-toastify";

export const handleAxiosError = (error: unknown) => {
  const axiosError = error as {
    data?: { error?: string; success?: boolean }; // RTK Query format
    response?: { data?: { error?: string; success?: boolean } }; // Axios format
  };

  // RTK Query format
  if (axiosError.data?.success === false) {
    toast.error(axiosError.data.error || "An unexpected error occurred.");
  }
  // Axios format
  else if (axiosError.response?.data?.success === false) {
    toast.error(
      axiosError.response.data.error || "An unexpected error occurred."
    );
  } else {
    toast.error("An unexpected error occurred.");
  }
};
