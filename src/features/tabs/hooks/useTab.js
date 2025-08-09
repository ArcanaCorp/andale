import { useContext } from "react";
import TabContext from "../context/TabContext";

export const useTab = () => useContext(TabContext)