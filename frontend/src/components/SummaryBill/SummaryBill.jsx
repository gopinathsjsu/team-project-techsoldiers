import { createStyles, Text, Box } from '@mantine/core';

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
    
    return (
    <>
        <Box className={classes.border}>
            <Text className={classes.title} mt={20} mb={20} transform="uppercase">Total Bill</Text>
            {props.rooms&&props.rooms.map((room)=>{
                return <RoomRow {...room}/>
            })}
        </Box>
    </>
    )
}