import React, {useState} from "react";
import { Box, Center, Container, Button, Grid } from "@mantine/core";
import { Link, useParams } from "react-router-dom";
import TopBar from "../../components/TopBar";
import HotelBooking from "../../components/HotelBooking";
import { DateRangePicker } from '@mantine/dates';
import dayjs from 'dayjs';
import { useQuery } from "react-query";


export function Booking() {
  const [dateErr, setDateErr] = useState();

  const { hotelID } = useParams();

  let todate = new Date();
  todate.setDate(todate.getDate() + 7);


  
  let [bookDate, setBookDate] = useState(
      {
          date: {
              from: new Date(),
              to: todate
          }
      }
  );
  let dateChanged = (dates) => {
    setBookDate({ ...bookDate, date: { from: dates[0], to: dates[1] } });
    if (dates[0] == null && dates[1] == null) {
        setDateErr(null);
    }
    if (dates[0] == null) {
        setDateErr(null);
    }
    if (dates[0] && dates[1] && dayjs(dates[1]).diff(dayjs(dates[0]), 'day') > 7) {
        setDateErr('Maximum stay is for 7 days');
        console.log(dayjs(dates[1]).diff(dayjs(dates[0]), 'day'));
    }
  }

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

  const roomtypes = [
    {
      roomtype: "Royal Suite",
    },
    {
      roomtype: "Luxury",
    },
    {
      roomtype: "Regular",
    },
  ];

  

  return (
    <>
    <TopBar links={links} />
    {/* <SearchComponent></SearchComponent> */}
    <Box>
      <Container>
        <Grid mb={30} mt={30}>
          <Grid.Col span={6}>
            <DateRangePicker
              label="Hotel Booking Dates"
              placeholder="Pick dates range"
              value={[bookDate.date.from, bookDate.date.to]}
              onChange={(e) => dateChanged(e)}
              minDate={dayjs(new Date()).toDate()}
              error={dateErr}
            />
          </Grid.Col>
        </Grid>
        <Grid mb={30} mt={30}> 
          <HotelBooking hotel={hotelID} />
        </Grid>
      </Container>
    </Box>
    </>
  );
}
