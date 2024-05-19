import { Box } from "@mui/material";
import React from "react";
import Sidebar from "./Sidebar";
import Expermint from "../scenes/Expermint";
import Models from "../scenes/Models";
import SubExpermints from "../scenes/Subexpermint";

export default function Content() {
  return (
    <Box bgcolor="blue" display="flex">
      <Sidebar />
      <SubExpermints />
    </Box>
  );
}