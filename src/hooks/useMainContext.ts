import { MainContext } from "@/Contexts/MainContext/MainContext";
import { useContext } from "react";

export const useMainContext = () => useContext(MainContext)