import React, { useState, useRef, useEffect } from "react";
import {
  Select,
  Grid,
  Center,
  Container,
  InputWrapper,
  Group,
  ActionIcon,
  NumberInput,
  Button
} from "@mantine/core";
import { useQuery } from "react-query";
import { getLocations } from "../../services/LocationService";
import { DateRangePicker } from "@mantine/dates";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";
import { searchState } from '../../features/search/searchSlice';
import { useDispatch, useSelector } from 'react-redux';

export function Search({ componentName }) {
    
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const searchData = useSelector((state) => state.search.data);
    console.log(searchData)
    const containerStyle = {
        position: 'relative',
        padding: '1.6em'
    };

  let todate = new Date();
  todate.setDate(todate.getDate() + 7);

  const personHandler = useRef();
  const roomHandler = useRef();

  // States for the whole Search
  // If data is set then this is the value of the location
  const [location, setLocation] = useState(null);
  const [person, setPerson] = useState(1);
  const [room, setRoom] = useState(1);
  const [date, setDate] = useState({
    from: new Date(),
    to: todate,
  });

  // Error States
  const [locationError, setLocationError] = useState(null);
  const [dateError, setDateError] = useState(null);

  // If there is a server error then will disable the location field.
  const [disableLocationField, setDisableLocationField] = useState(false);

  // Getting the Location Data
  const {
    data,
    isLoading,
    isError: isErrorLocation,
  } = useQuery("location", getLocations, { suspense: true });

  if (isErrorLocation) {
    setLocationError("Server Error!");
    setDisableLocationField(true);
  }

  // When the Date changes please do check that it is valid date according to our logic
  function changeDate(values) {
    setDate({ from: values[0], to: values[1] });
    dispatch(searchState({date: { from: values[0], to: values[1] }}))

    if (values[0] === null && values[1] === null) {
      setDateError(null);
    }
    if (values[0] === null) {
      setDateError(null);
    }

    if (
      values[0] &&
      values[1] &&
      dayjs(values[1]).diff(dayjs(values[0]), "day") > 7
    ) {
      setDateError("Maximum stay is for 7 days");
      // Console Logging error for its difference
      //console.log(dayjs(values[1]).diff(dayjs(values[0]), 'day'));
    }
  }

  function search(){
    if(!location || location == ""){
        setLocationError("Select a Location!");
        return;
    }

    // Setting the state for the search
    dispatch(searchState({
        location: location,
        date: date,
        person: person,
        room: room
    }))
    
    if(componentName == "Home"){
    navigate(`location/${location}`);
  }

  }


  return (
    <Container size="xl">
      <Grid>
        { componentName === "Booking" ? <></> : 
        <Grid.Col span={3}>
          <Select
            value={location}
            onChange={setLocation}
            data={data}
            label="Select Location"
            error={locationError}
            disabled={disableLocationField}
            placeholder="Select Location"
            searchable
            clearable
            required
          />
        </Grid.Col>
        }
        <Grid.Col span={3}>
          <DateRangePicker
            label="Book your Stay"
            placeholder="Pick dates range"
            value={searchData != null ? [searchData.date.from, searchData.date.to] : [date.from, date.to]}
            onChange={(e) => changeDate(e)}
            minDate={dayjs(new Date()).toDate()}
            error={dateError}
            required
          />
        </Grid.Col>
        <Grid.Col span={2}>
          <InputWrapper label="Persons">
            <Center>
              <Group spacing={5}>
                <ActionIcon
                  size={36}
                  variant="default"
                  onClick={() => personHandler.current.decrement()}
                  disabled={person === 1}
                  onMouseDown={(event) => event.preventDefault()}
                >
                  –
                </ActionIcon>
                <NumberInput
                  hideControls
                  value={searchData != null ? searchData.person : person}
                  placeholder={person}
                  onChange={setPerson}
                  handlersRef={personHandler}
                  max={10}
                  min={1}
                  step={1}
                  styles={{ input: { width: 54, textAlign: "center" } }}
                  required
                />

                <ActionIcon
                  size={36}
                  variant="default"
                  onClick={() => personHandler.current.increment()}
                  disabled={person === 10}
                  onMouseDown={(event) => event.preventDefault()}
                >
                  +
                </ActionIcon>
              </Group>
            </Center>
          </InputWrapper>
        </Grid.Col>
        <Grid.Col span={2}>
          <InputWrapper label="Rooms">
            <Center>
              <Group spacing={5}>
                <ActionIcon
                  size={36}
                  variant="default"
                  onClick={() => roomHandler.current.decrement()}
                  disabled={room === 1}
                  onMouseDown={(event) => event.preventDefault()}
                >
                  –
                </ActionIcon>
                <NumberInput
                  hideControls
                  value={ searchData != null ? searchData.room : room}
                  placeholder={room}
                  onChange={setRoom}
                  handlersRef={roomHandler}
                  max={10}
                  min={1}
                  step={1}
                  styles={{ input: { width: 54, textAlign: "center" } }}
                  required
                />

                <ActionIcon
                  size={36}
                  variant="default"
                  onClick={() => roomHandler.current.increment()}
                  disabled={room === 10}
                  onMouseDown={(event) => event.preventDefault()}
                >
                  +
                </ActionIcon>
              </Group>
            </Center>
          </InputWrapper>
        </Grid.Col>
        <Grid.Col span={2}>
        <Container style={containerStyle} >
        <Button variant="gradient" color="dark" onClick={(e) => search()}>Search</Button>
        </Container>
        </Grid.Col>
      </Grid>
    </Container>
  );
}
