import React, { Suspense, useEffect, useState } from "react";
import { Box, Button, Card, Container, Grid } from "@mantine/core";
import Amenities from "../../components/Amenities";
import { useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";
import BookingDetails from "../../components/BookingDetails";
import { getAmenityByHotelId } from '../../services/AmenityService';
import BookingDetailsRoom from "../../components/BookingDetailsRoom";
import SummaryBill from "../../components/SummaryBill";
import { useMutation } from "react-query";
import { createBookings } from "../../services/BookingService";
import { showNotification } from "@mantine/notifications";

export function BookingSummary() {

  const cartData = useSelector(state => state.persistedReducer.booking);
  const [amenityData, setAmenityData] = useState([])
  const bookings = cartData[0].data;

  const login = useSelector((state) => state.persistedReducer.login);

  const navigate = useNavigate();

  const createBookingMutation = useMutation(createBookings);

  console.log("bookings  ", bookings);
  useEffect(() => {
    async function fetchData() {
      console.log('calling fetch data ')
      const response = await getAmenityByHotelId();
      console.log('response = ', response)
      if (response.data.length > 0) {
        console.log(' if response = ', response.data)

        setAmenityData(response.data.map((e) => { return { ...e, id: '' + e.id } }));
      }
    }
    fetchData();
  }, []);

  let bookingRooms = [];
  //check if rooms are already configured in state
  //if yes retrieve them
  //else create
  for (let i = 0; i < bookings.room; i++) {
    bookingRooms.push({
      roomId: i,
      selectedAmenities: [],
    });
  }
  console.log(bookingRooms);
  let [amprice, setAmprice] = useState(0);
  function changeRoomAmenities(roomid, amenities) {
    console.log(roomid + " room ", amenities);
    bookingRooms[roomid].selectedAmenities = amenities;
    calculateAmenities(bookingRooms);
  }
  function calculateAmenities(bookingRooms) {
    let prices = 0;
    let amenities_all = [];
    for (let bookingRoom of bookingRooms) {
      console.log('updated ', bookingRoom.selectedAmenities);
      amenities_all = [...amenities_all, ...(bookingRoom.selectedAmenities)];

    }
    for (let i = 0; i < amenities_all.length; i++) {
      let amend = amenityData.findIndex(e => e.id == amenities_all[i]);

      prices += parseInt(amenityData[amend].price);
    }
    console.log("new amen prices", prices);
    setAmprice(prices);
  }
 
  function bookNow() {

    if (login.status == "unauth") {
      showNotification({
        title: "Please Auth",
        message: 'Please login to create booking!',
        color: 'red',
      });
    } else {
      let amens = bookingRooms.map(e => {
        return { roomId: e.roomId, amenities: e.selectedAmenities.map(t => parseInt(t)) };
      });
      let payload = {
        "bookingToDate": bookings.date.to,
        "bookingFromDate": bookings.date.from,
        "roomId": parseInt(bookings.roomID),
        "hotelId": parseInt(bookings.hotelID),
        "amenities": amens,
        "noOfRooms": parseInt(bookings.room)
      };
      console.log("booking payload", JSON.stringify(payload));
      createBookings({
        data: payload,
        token: login.data.jwt.token
      }).then((e) => {
        showNotification({
          title: "Success",
          message: 'Your Booking is created Successfully',
          color: "green"
        });
        navigate('/mybooking');
      }).catch(err => {
        console.log(err);
        showNotification({
          title: "Failure",
          message: 'Booking Failed',
          color: "red"
        })
      });

    }

  }

  /*
   
  */
  return (
    <>
      <Container>
        <BookingDetails bookings={bookings} />
        <Grid mb={20}>
          {bookingRooms.length > 0 && bookingRooms.map((room) => {
            return <BookingDetailsRoom key={room.roomIndex} amenities={amenityData} details={room} changeRoomAmenities={changeRoomAmenities} />
          })}
        </Grid>
        {/* {bookingRooms.length > 0 && bookingRooms.map((room) => {

        return <BookingDetailsRoom key={room.roomIndex} amenities={amenityData} details={room} changeRoomAmenities={changeRoomAmenities} />
      })} */}
        <SummaryBill bookings={bookings} rooms={bookingRooms} amprice={amprice} />
        <Button mt={30} onClick={bookNow}>Confirm Booking</Button>
      </Container>
    </>

  );
}
