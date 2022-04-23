import { createStyles, Card, Image, Text, Group, Skeleton } from '@mantine/core';
const RoomRow=(props)=>{
    return <>
    <div>{props.roomType}</div>
    </>
}
export const SummaryBill = (props) => {
    let {  hotelName, person, room, roomType } = props.bookings;
    
    return (<>
        <Card withBorder radius="md" p={0} mb="md">
            <h1>Total Bill</h1>
            {props.rooms&&props.rooms.map((room)=>{
                return <RoomRow {...room}/>
            })}
        </Card>
    </>)
}