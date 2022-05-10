import React, { Suspense, useEffect, useState } from "react";
import { Box, Button, Card, Container, Grid } from "@mantine/core";
import Amenities from "../../components/Amenities";
import { useSelector } from 'react-redux';

import BookingDetails from "../../components/BookingDetails";
import { getAmenityByHotelId } from '../../services/AmenityService';
import BookingDetailsRoom from "../../components/BookingDetailsRoom";
import SummaryBill from "../../components/SummaryBill";

export function BookingSummary() {

  const cartData = useSelector(state => state.persistedReducer.booking);
  const [amenityData, setAmenityData] = useState([])
  const bookings = cartData[0].data;

  console.log("bookings  ", bookings);
  useEffect(() => {
    async function fetchData() {
      console.log('calling fetch data ')
      const response = await getAmenityByHotelId();
      console.log('response = ', response)
      if (response.data.length > 0) {
        console.log(' if response = ', response.data)

        setAmenityData(response.data.map((e) => {return {...e, id: '' + e.id}}));
}
    }
fetchData();
  }, []);
  const auth = useSelector(state => state.login);

let bookingRooms = [];
//check if rooms are already configured in state
//if yes retrieve them
//else create
for (let i = 0; i < bookings.room; i++) {
  bookingRooms.push({
    roomIndex: i,
    roomType: bookings.roomType,
    selectedAmenities: [],
  });
}
console.log(bookingRooms);
function changeRoomAmenities(roomid, amenities) {
  console.log(roomid + " ", amenities);
  bookingRooms[roomid].selectedAmenities=amenities;
}
function bookNow(){
  console.log(bookingRooms);
}

/*
 
*/
return (
  <>
    <Container>
      <BookingDetails bookings={bookings} />
      <Grid mb={20}>
      {bookingRooms.length > 0 && bookingRooms.map((room) => {
          return <Grid.Col span={6}><BookingDetailsRoom key={room.roomIndex} amenities={amenityData} details={room} changeRoomAmenities={changeRoomAmenities} /></Grid.Col>
      })}
      </Grid>
      {/* {bookingRooms.length > 0 && bookingRooms.map((room) => {

        return <BookingDetailsRoom key={room.roomIndex} amenities={amenityData} details={room} changeRoomAmenities={changeRoomAmenities} />
      })} */}
      <SummaryBill  bookings={bookings} rooms={bookingRooms} />
      <Button mt={30} onClick={bookNow}>Confirm Booking</Button>
    </Container>
  </>

);
}
