import React from "react";
import TopBar from "../../components/TopBar";
import { Center } from "@mantine/core";
import { Link } from "react-router-dom";
import SearchComponent  from "../../components/SearchComponent";
export function Home() {
  const links = [
  
  ];

  return (
    <>
      <TopBar links={links} />
      <SearchComponent/>
      <Center>
      
      { /* <Link to="/listing">Listing</Link>Search Bar for location and initial data will go here. */}
        
      </Center>
    </>
  );
}
