import { RegisterUserContext } from "@/Contexts/RegisterUserContext/RegisterUserContext";
import { useContext } from "react";

export const useRegisterUserContext = () => useContext(RegisterUserContext)