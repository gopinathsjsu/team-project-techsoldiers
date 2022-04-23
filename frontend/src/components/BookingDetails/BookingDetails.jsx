import { createStyles, Card, Image, Text, Group, Skeleton } from '@mantine/core';
export const BookingDetails = (props) => {
    let {  hotelName, person, room, roomType } = props.bookings;
    return (<>
        <Card withBorder radius="md" p={0} mb="md">
            <h1>{hotelName}</h1>
            <p>Room Type: {roomType} </p>
            <span>No of rooms {room}</span>
            <span>No of persons {person}</span>
        </Card>
    </>)
}