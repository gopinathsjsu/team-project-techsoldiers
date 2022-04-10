import React from "react";
import { Box, Container, Image, Text } from "@mantine/core";
import { useParams } from "react-router-dom";
import TopBar from "../../components/TopBar";
import HotelListing from "../../components/HotelListing";
import hotel1 from '../../media/hotel1.jpg';


export function Listing() {

  const { locationID } = useParams();

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

if(locationID){
  return (
    <>
    <TopBar links={links} />
    {/* <SearchComponent></SearchComponent> */}
    <Box>
      <Image src={hotel1} height={300} width='lg' mb={30} />
      <Container>
          <HotelListing location={locationID} />  
      </Container>
    </Box>
    </>
  );
}else {
  return (
    <>
      <TopBar links={links} />
      <Box>
        <Container>
          <Text>No Hotels found at this location!!</Text>
        </Container>
      </Box>
    </>
  )}
}

