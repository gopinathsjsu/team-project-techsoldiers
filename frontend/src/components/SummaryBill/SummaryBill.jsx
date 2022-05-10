import { createStyles, Text, Box } from '@mantine/core';
import { getRoomPriceFinal } from "../../services/RoomService";
import { useLazyQuery, useMutation, useQuery } from "react-query";
import { useState } from 'react';

const useStyles = createStyles((theme) => ({
    card: {
      backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
    },
  
    title: {
      fontWeight: 700,
      fontSize: 20,
      fontFamily: `Greycliff CF, ${theme.fontFamily}`,
      lineHeight: 1.2,
    },
  
    body: {
      padding: theme.spacing.md,
    },

    border: {
        borderTop: '1px #000 solid',
    },
}));

const RoomRow=(props)=>{
    return <>
    <div>{props.roomType}</div>
    </>
}


export const SummaryBill = (props) => {
    const { classes } = useStyles();
    let {  hotelName, person, room, roomType } = props.bookings;
    const { data: roomPrice , error, isError, isLoading } = useQuery(['getRoomPrice', props.bookings.roomID],() => getRoomPriceFinal(props.bookings.hotelID, props.bookings.roomID, props.bookings.date.from, props.bookings.date.to), {
        suspense: true
    });

    if(isLoading){
        <Text>Loading...</Text>
    }
    
    return (
    <>
        <Box className={classes.border}>
            <Text className={classes.title} mt={20} mb={20} transform="uppercase">Total Bill</Text>
            <Text className={classes.title} mt={20} mb={20}>Total Base Price: {(parseInt(roomPrice.data.basePrice) * 7)* room}</Text>
            {/* {props.rooms&&props.rooms.map((room)=>{
                return <RoomRow {...room}/>
            })} */}
        </Box>
    </>
    )
}