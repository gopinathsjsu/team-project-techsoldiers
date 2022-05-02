import React from "react";
import { Box, Container, Grid } from "@mantine/core";
import Amenities from "../../components/Amenities";
import { useSelector } from 'react-redux';


export function BookingSummary() {
  const auth = useSelector(state => state.login);

  
  const hotels = [
    {
      roomtype: "Royal Suite",
      roomNum: "2",
      cost: "290",
    },
    {
      roomtype: "Luxury",
      roomNum: "1",
      cost: "390",
    },
    {
      roomtype: "Regular",
      roomNum: "4",
      cost: "400",
    },
  ];


  return (
    <Box>
      <Container>
        <Grid mb={30} mt={30}>
          <Grid.Col span={6}>
          </Grid.Col>
        </Grid>
        <Amenities links={hotels} />
      </Container>
    </Box>
  );
}
