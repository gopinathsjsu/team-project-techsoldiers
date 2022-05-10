import React, { useState, useRef } from 'react';
import hotel3 from '../../media/hotel3.jpg';
import { Link } from "react-router-dom";
import { createStyles, Paper, Text, CheckboxGroup, Checkbox, Grid } from '@mantine/core';
import { useQuery } from "react-query";
import { getAmenityByHotelId } from '../../services/AmenityService';

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

    const { data, isError, isLoading, isFetching } = useQuery('amenityByHotel',getAmenityByHotelId);
  console.log(data);

  if(isFetching || isLoading){
    return(
      <Grid>
        <Grid.Col span={6}>
          <Checkbox
            label="Amenities"
          />
        </Grid.Col>
      </Grid>
    );
  }

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
                            {
                              data.data.map((item, key) => (
                                <Grid.Col span={6}><Checkbox value={item.name} label={item.name} /></Grid.Col>
                              ))
                            }
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