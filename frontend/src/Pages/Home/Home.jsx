import React from "react";
import TopBar from "../../components/TopBar";
import { Center } from "@mantine/core";
import { Link } from "react-router-dom";
export function Home() {
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
      <SearchComponent/>
        <div>All elements inside Center are centered</div>
        <Link to="/listing">Listing</Link>
      </Center>
    </>
  );
}
