import toast from "react-hot-toast";

const useToast = () => {
  const showToast = (message: string, type: "success" | "error") => {
    if (type === "success") {
      toast.success(message);
    } else if (type === "error") {
      toast.error(message);
    }
  };
  return { showToast };
};

export default useToast;
