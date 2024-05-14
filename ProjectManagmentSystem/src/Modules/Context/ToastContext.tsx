import React, { createContext, useContext } from "react";
import { toast } from "react-toastify";

// type ToastValue = {
//   type: ;
// };

type ToastProps = {
  message: string;
  type: string;
  getToast: (
    type: "success" | "error" | "warning" | "info",
    message: string
  ) => void;
};

const ToastContext = createContext<ToastProps | any>("");

type ToastContextProviderProps = {
  children: React.ReactNode;
};

export const useToast = () => {
  return useContext(ToastContext);
};

export default function ToastContextProvider({
  children,
}: ToastContextProviderProps) {
  const getToast = (
    type: "success" | "error" | "warning" | "info",
    message: string
  ) => {
    return toast[type](message, {
      autoClose: 1500,
    });
  };
  return (
    <ToastContext.Provider value={{ getToast }}>
      {children}
    </ToastContext.Provider>
  );
}
