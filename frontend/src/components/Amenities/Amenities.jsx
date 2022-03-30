import React, { useState, useRef } from 'react';
import hotel3 from '../../media/hotel3.jpg';
import { Link } from "react-router-dom";
import { createStyles, Paper, Text, CheckboxGroup, Checkbox, Grid } from '@mantine/core';

const useStyles = createStyles((theme) => ({
  card: {
    height: 340,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },

  textp: {
    fontFamily: `Greycliff CF ${theme.fontFamily}`,
    fontWeight: 400,
    color: theme.black,
    lineHeight: 1.2,
    fontSize: 16,
    marginTop: theme.spacing.xs,
  },
}));


export function Amenities(props) {
  const { classes } = useStyles();
    console.log(props.links);

  return (
    <>
    <Grid mb={30} mt={30}>
        {
            props.links.map((item, key) => (
                <Grid.Col key={key} span={6}>
                    <Paper
                        shadow="md"
                        p="xl"
                        radius="md"
                        sx={{background: '#e3e3e3'}}
                        className={classes.card}
                        >
                        <div>
                                
                                <Text order={3} className={classes.textp}><b>Room Type:</b> {item.roomtype}</Text>
                                <Text order={3} className={classes.textp}><b>Cost</b> ${item.cost}</Text>
                                <Text order={3} className={classes.textp}><b>No. of Rooms:</b> {item.roomNum}</Text> 
                        </div>
                        <div>
                            <Text><b>Amenities</b></Text>
                            <Grid mt={10}>
                            <Grid.Col span={6}><Checkbox value="amenities 1" label="Amenities 1" /></Grid.Col>
                            <Grid.Col span={6}><Checkbox value="amenities 2" label="Amenities 2" /></Grid.Col>
                            <Grid.Col span={6}><Checkbox value="amenities 3" label="Amenities 3" /></Grid.Col>
                            <Grid.Col span={6}><Checkbox value="amenities 4" label="Amenities 4" /></Grid.Col>
                            </Grid>
                        </div>
                    </Paper>
                </Grid.Col>
            ))
        }
    </Grid>
    <Link
    to={{
        pathname: "/summary",
        // state: roomtypes // your data array of objects
    }}
    >CONFIRM BOOKING</Link>
    </>
  );
}