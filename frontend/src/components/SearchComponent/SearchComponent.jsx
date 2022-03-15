import React from 'react';
import { Grid, Container } from '@mantine/core';
import LocationPicker from './LocationSelector';
import {DatePicker }from './DatePicker';
import{ PersonCounter} from './PersonCounter';
import { Button, } from '@mantine/core';

function SearchHotels() {
    const containerStyle={
        position:'relative',
        padding: '1.6em'
    }

    return (
        <Container style={containerStyle} >
            <Button radius="lg" >
                Search Hotels
            </Button>
        </Container>

    )
}
   /* <HotelDate />
          <PersonCounter />
          */
export  function SearchComponent() {
    return (
        <GridAsymmetrical>
            <LocationPicker />
            <DatePicker/>
            <PersonCounter/>
            <SearchHotels />
        </GridAsymmetrical>
    )
}

function GridAsymmetrical(props) {
    return (
        <Container my="md">
            <Grid>
                <Grid.Col xs={3}>{props.children[0]}</Grid.Col>
                <Grid.Col xs={4}>{props.children[1]}</Grid.Col>
                <Grid.Col xs={2}>{props.children[2]}</Grid.Col>
                <Grid.Col xs={2}>{props.children[3]}</Grid.Col>
            </Grid>
        </Container>
    );
}