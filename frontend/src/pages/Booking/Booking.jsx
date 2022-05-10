import React, {useState} from "react";
import { Box, Center, Container, Button, Grid } from "@mantine/core";
import { Link, useParams } from "react-router-dom";
import TopBar from "../../components/TopBar";
import RoomBooking from "../../components/RoomBooking";
import { DateRangePicker } from '@mantine/dates';
import dayjs from 'dayjs';
import { useQuery } from "react-query";
import Search from "../../components/Search";


export function Booking() {
  
  const { hotelID } = useParams();

  return (
    <>
    <Box>
      <Container>
        <Search componentName="Booking"/>
        <Grid mb={30} mt={30}> 
          <RoomBooking hotel={hotelID} />
        </Grid>
      </Container>
    </Box>
    </>
  );
}
