import React, { useEffect } from 'react';

import dayjs from 'dayjs';
import { useState, useRef } from 'react';

import { Button, NumberInput, Group, ActionIcon, InputWrapper, Center, Grid, Container, Select } from '@mantine/core';
import { DateRangePicker } from '@mantine/dates';
import axios from 'axios';
import { useQuery } from 'react-query'
import { useNavigate } from 'react-router-dom';
import { locationHotelState } from '../../features/locationhotel/locationHotelSlice';
import { useDispatch } from 'react-redux';

const sdata = [
    { value: 'LAX', label: 'Los Angeles' },
    { value: 'SFO', label: 'San Francisco' },
    { value: 'DEL', label: 'New Delhi' },
];
function getLocations(){
    return new Promise((resolve,reject)=>{
            axios.get("/api/location").then((res)=>
            resolve(res.data)).catch((err)=>reject(err));
    });
}

export  function SearchComponent() {
    const containerStyle = {
        position: 'relative',
        padding: '1.6em'
    };
    
    const navigate = useNavigate();
    const dispatch = useDispatch();

  /*  locdata=locdata.map((e)=>
     {
         return {"value":""+e.id,"label":""+e.name};
    });*/
    let [locations, setLocations] = useState(sdata);
    let {data: locdata,error,isLoading}=useQuery('locations',getLocations,{suspense:true});
    useEffect(function(){
           // console.log(locdata);
            locdata=locdata.map((e)=>{
                return {
                    value:e.id,
                    label:e.city+", "+e.country
                }
            });
            setLocations(locdata);
    },[isLoading]);

    let [selLocation, setSelLocation] = useState('');
    let [locationErr,setLocationErr]=useState(null);
    const [dateErr, setDateErr] = useState();
    let todate = new Date();
    todate.setDate(todate.getDate() + 7);
   
    let [search, setSearch] = useState(
        {
            location: "",
            persons: 1,
            date: {
                from: new Date(),
                to: todate
            }
        }
    );
    let setLoc = (value) => {
        if(!value)
            setLocationErr("Select Location");
        else{
            if(locationErr)
                setLocationErr(null);
        }
        setSelLocation(value);
        setSearch({ ...search, location: value });
    }
    let dateChanged = (dates) => {

        setSearch({ ...search, date: { from: dates[0], to: dates[1] } });
        if (dates[0] == null && dates[1] == null) {
            setDateErr(null);
        }
        if (dates[0] == null) {
            setDateErr(null);
        }
        if (dates[0] && dates[1] && dayjs(dates[1]).diff(dayjs(dates[0]), 'day') > 7) {
            setDateErr('Maximum stay is for 7 days');
            console.log(dayjs(dates[1]).diff(dayjs(dates[0]), 'day'));
        }
    }
   
    let searchHotels = function () {
        //validate search object
        if(!search.location||search.location==""){
            setLocationErr("Select Location");
            return;
        }
        console.log(search);
        dispatch(locationHotelState({
            date: search.date,
            person: search.persons
        }));
        navigate(`location/${search.location}`);
    }


    let setPersonCount = function (value) {
        setSearch({ ...search, persons: value });
    }
    const countHandlers = useRef(null);
    const locationRef = useRef(null);
    return (
        <GridAsymmetrical>
           <Select
                label="Location"
                placeholder="Select Location"
                searchable
                clearable
                nothingFound="No Locations"
                data={locations}
                value={selLocation}
                error={locationErr}
                onChange={(e)=>setLoc(e)}
            />
            {/*
            <NativeSelect
                data={location}
                
                label="Location"
                styles={{
                    input: {
                        fontWeight: 500,
                        borderTopLeftRadius: 0,
                        borderBottomLeftRadius: 0,
                    },
                }}
                onChange={(e)=>setLoc(e.target.value)}
            />*/}
            <DateRangePicker
                label="Book hotel"
                placeholder="Pick dates range"
                value={[search.date.from, search.date.to]}
                onChange={(e) => dateChanged(e)}
                minDate={dayjs(new Date()).toDate()}
                error={dateErr}
            />
            <InputWrapper label="Persons">
                <Center>
                    <Group spacing={5}>
                        <ActionIcon size={36} variant="default" onClick={() => countHandlers.current.decrement()}>
                            –
                        </ActionIcon>

                        <NumberInput
                            hideControls
                            value={search.persons}
                            onChange={(val) => setPersonCount(val)}
                            handlersRef={countHandlers}
                            max={10}
                            min={1}
                            step={1}
                            styles={{ input: { width: 54, textAlign: 'center' } }}
                        />

                        <ActionIcon size={36} variant="default" onClick={() => countHandlers.current.increment()}>
                            +
                        </ActionIcon>
                    </Group>
                </Center>
            </InputWrapper>
            <Container style={containerStyle} >
                <Button radius="lg" onClick={(e) => searchHotels()} >
                    Search Hotels
                </Button>
            </Container>
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