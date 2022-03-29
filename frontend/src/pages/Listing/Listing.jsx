import React from "react";
import { Box, Center, Container, Image } from "@mantine/core";
import { Link } from "react-router-dom";
import TopBar from "../../components/TopBar";
import HotelListing from "../../components/HotelListing";
import hotel1 from '../../media/hotel1.jpg';


export function Listing() {
  const links = [
    {
      link: "/",
      label: "Home",
    },
    {
      link: "/listing",
      label: "Listing",
    },
    {
      link: "/hotel",
      label: "Hotel",
    },
  ];

  return (
    <>
    <TopBar links={links} />
    {/* <SearchComponent></SearchComponent> */}
    <Box>
      <Image src={hotel1} height={300} width='lg' mb={30} />
      <Container>
        <HotelListing />
      </Container>
    </Box>
    </>
  );
}
