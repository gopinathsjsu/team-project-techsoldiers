import React from "react";
import { Center } from "@mantine/core";
import { Link } from "react-router-dom";
export function Listing() {


  return (
    <>
      <Center>
        <div>This is listing component</div>
        <Link to="/hotel">Hotel</Link>
      </Center>
    </>
  );
}
