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
    content: {
        fontWeight: 400,
        fontSize: 12,
        fontFamily: `Greycliff CF, ${theme.fontFamily}`,
        lineHeight: 1,
    },
    body: {
        padding: theme.spacing.md,
    },

    border: {
        borderTop: '1px #000 solid',
    },
}));

const RoomRow = (props) => {
    return <>
        <div>{props.roomType}</div>
    </>
}


export const SummaryBill = (props) => {
    const { classes } = useStyles();
    let { hotelName, person, room, roomType } = props.bookings;
    console.log('rooms props ', props.rooms);
    const { data: roomPrice, error, isError, isLoading } = useQuery(['getRoomPrice', props.bookings.roomID], () => getRoomPriceFinal(props.bookings.hotelID, props.bookings.roomID, props.bookings.date.from, props.bookings.date.to), {
        suspense: true
    });

    if (isLoading) {
        <Text>Loading...</Text>
    }
    if(roomPrice){
        console.log(roomPrice)
    }

    return (
        <>
            <Box className={classes.border}>
                <Text className={classes.title} mt={20} mb={20} transform="uppercase">Total Bill</Text>
                <Text className={classes.content} mt={20} mb={20}>Base Price Per Room for given day: {(parseInt(roomPrice.data.basePrice) )}</Text>
                <Text className={classes.content} mt={20} mb={20}>Total Dynamic Price Per Room for all days: {(parseInt(roomPrice.data.finalSurgePrice) )}</Text>
                <Text className={classes.content} mt={20} mb={20}>Total Dynamic Price: {(parseInt(roomPrice.data.finalSurgePrice) ) * room}</Text>
                <Text className={classes.content} mt={20} mb={20}>Amenities Price: {props.amprice}</Text>
                <Text className={classes.title} mt={20} mb={20}>Final Price: {((parseInt(roomPrice.data.finalSurgePrice) ) * room)+props.amprice}</Text>
              
        
            </Box>
        </>
    )
}