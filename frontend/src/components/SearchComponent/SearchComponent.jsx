import React from 'react';
import dayjs from 'dayjs';
import { useState, useRef } from 'react';
import { Button, NumberInput, Group, ActionIcon, InputWrapper, Center, Grid, Container, NativeSelect } from '@mantine/core';
import { DateRangePicker } from '@mantine/dates';

const sdata = [
    { value: 'LAX', label: 'Los Angeles' },
    { value: 'SFO', label: 'San Francisco' },
    { value: 'DEL', label: 'New Delhi' },
];

export function DatePicker(props) {
    const [err, setErr] = useState();
    const [value, setValue] = useState([
        props.from,
        props.to,
    ]);
    let dateChanged = (dates) => {
        setValue(dates);
        if (dates[0] == null && dates[1] == null) {
            setErr(null);
        }
        if (dates[0] == null) {
            setErr(null);
        }
        if (dates[0] && dates[1] ) {
            {
                if(dayjs(dates[1]).diff(dayjs(dates[0]),'day')>7){
                    setErr('Maximum stay is for 7 days');
                
                }
                    console.log(dayjs(dates[1]).diff(dayjs(dates[0]),'day'));
            }
        }
    }
    return (
        <DateRangePicker
            label="Book hotel"
            placeholder="Pick dates range"
            value={value}
            onChange={(e) => dateChanged(e)}
            minDate={dayjs(new Date()).toDate()}
            error={err}
        />
    );
}


export function PersonCounter(props) {

    const [value, setValue] = useState(props.count);
    const handlers = useRef(null);
    return (
        <InputWrapper label="Persons">
            <Center>
                <Group spacing={5}>
                    <ActionIcon size={36} variant="default" onClick={() => handlers.current.decrement()}>
                        –
                    </ActionIcon>

                    <NumberInput
                        hideControls
                        value={value}
                        onChange={(val) => setValue(val)}
                        handlersRef={handlers}
                        max={10}
                        min={1}
                        step={1}
                        styles={{ input: { width: 54, textAlign: 'center' } }}
                    />

                    <ActionIcon size={36} variant="default" onClick={() => handlers.current.increment()}>
                        +
                    </ActionIcon>
                </Group>
            </Center>
        </InputWrapper>
    );
}



export function SearchComponent() {
    const containerStyle = {
        position: 'relative',
        padding: '1.6em'
    }
    let [location, setLocation] = useState(sdata);
    let todate = new Date();
    todate.setDate(todate.getDate() + 7)
    let [search, setSearch] = useState(
        {
            location: "SFO",
            persons: 1,
            date: {
                from: new Date(),
                to: todate
            }
        }
    );
    let updateLocation = function (loc) {
        console.log("locartion changed ", loc);
        setSearch({ ...search, location: loc });
    }
    let searchHotels = function () {
        console.log(search);
    }
    return (
        <GridAsymmetrical>
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
                onChange={(e) => updateLocation(e.target.value)}
            />
            <DatePicker from={search.date.from} to={search.date.to} />
            <PersonCounter count={search.persons} />
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