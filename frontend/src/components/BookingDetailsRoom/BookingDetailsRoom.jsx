import { createStyles, Card, CheckboxGroup, Checkbox, Text, Grid, Paper, Container } from '@mantine/core';
import React, { useState } from 'react';

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

export const BookingDetailsRoom = (props) => {
    const { classes } = useStyles();
    let { roomType, roomIndex, selectedAmenities } = props.details;
    
    console.log('BookingDetailsRoom', props.amenities);
   
    const [checks, setChecks] = useState(selectedAmenities);
    function onChange(selected){

        console.log('selected - ', selected);
        console.log('checks - ', checks);
      setChecks(selected);
      props.changeRoomAmenities(roomIndex,selected);
    }
    return (
        <>
            <Paper
                shadow="md"
                p="xl"
                radius="md"
                sx={{background: '#e3e3e3'}}
                className={classes.card}
                mb={20}
                >
                <div>
                        <Text order={3} className={classes.textp}><b>Room Type:</b> {roomType} {roomIndex + 1}</Text>
                </div>
                <div>
                    <Text mb={10}><b>Amenities</b></Text>
                    <CheckboxGroup value={checks} onChange={onChange}>
                        {props.amenities?.length>0&&
                            props.amenities.map((amen)=>{
                            return   <Checkbox value={amen.id} key={amen.id} label={amen.name} />
                        })}
                    </CheckboxGroup>
                </div>
            </Paper>
        </>
    )
}