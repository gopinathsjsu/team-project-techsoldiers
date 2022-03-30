import React, {useState} from "react";
import { Box, Text, Container, Image, Grid } from "@mantine/core";
import { Link } from "react-router-dom";
import TopBar from "../../components/TopBar";
import Amenities from "../../components/Amenities";
import { DateRangePicker } from '@mantine/dates';
import dayjs from 'dayjs';
import { useSelector } from 'react-redux';


export function BookingSummary() {
  const bookings = useSelector(state => state.booking);

  const [dateErr, setDateErr] = useState();
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
console.log(bookings)
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

  // const bookingPosts = bookings.map(post => (
  //   <div>
  //     <h3>{post.roomtype}</h3>
  //     <p>{post.roomCount}</p>
  //   </div>
  // ))
  

  return (
    <>
    <TopBar links={links} />
    {/* <SearchComponent></SearchComponent> */}
    <Box>
      <Container>
        <Grid mb={30} mt={30}>
          <Grid.Col span={6}>
            <Text><b>Booking Dates:</b> <span>May 6, 2022 – May 13, 2022</span></Text>
          </Grid.Col>
        </Grid>
        <Amenities links={hotels} />
      </Container>
    </Box>
    </>
  );
}
