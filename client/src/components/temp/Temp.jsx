import React from "react";
import { Button } from "@mui/material";

import { useController } from "react-hook-form";

const Temp = ({ name, control }) => {
  const RHFController = useController({
    name: name,
    control: control,
  });
  return (
    <>
      <Button variant="contained" color="primary">
        Temp
      </Button>
    </>
  );
};

export default Temp;
