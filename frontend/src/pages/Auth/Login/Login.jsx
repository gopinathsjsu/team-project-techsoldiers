import React from "react";
import TopBar from "../../../components/TopBar";
import { Center } from "@mantine/core";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { Button } from "@mantine/core";

export function Login() {

const navigate = useNavigate();
const dispatch = useDispatch();


  const links = [
    {
      link: "/about",
      label: "Features",
    },
    {
      link: "/pricing",
      label: "Pricing",
    },
    {
      link: "/learn",
      label: "Learn",
    },
    {
      link: "/community",
      label: "Community",
    },
  ];

  return (
    <>
      <TopBar links={links} />
      {/* Search Bar for location and initial data will go here. */}
      <Center>
        <div>Login: Click Here to login</div>
      </Center>
    </>
  );
}
