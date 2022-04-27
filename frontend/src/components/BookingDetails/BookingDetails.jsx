import React, { useEffect, useState } from 'react';
import { createStyles, Card, Image, Text, Group, Skeleton, Box, Container } from '@mantine/core';

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
}));
export const BookingDetails = (props) => {
    const { classes } = useStyles();
    let {  hotelName, person, room, roomType } = props.bookings;
    return (
        <>
        
        <Box mb={20}>
            <Container>
                <Text className={classes.title} mb={20} transform="uppercase">{hotelName}</Text>
                <Text><b>Room Type:</b> <span>{roomType}</span></Text>
                <Text><b>No of rooms:</b> <span>{room}</span></Text>
                <Text><b>No of persons:</b> <span>{person}</span></Text>
            </Container>
        </Box>
        </>
    )
}