import React, { useState, useRef } from "react";
import hotel3 from "../../media/hotel3.jpg";
import { useDispatch } from "react-redux";
import { bookingStatus } from "../../features/booking/bookingSlice";
import {
  createStyles,
  Paper,
  Image,
  Button,
  Text,
  Title,
  Grid,
  Center,
  Group,
  ActionIcon,
  NumberInput,
  InputWrapper,
  Skeleton,
} from "@mantine/core";
import { useQuery } from "react-query";
import { getRoomsByHotel } from "../../services/RoomService";

const useStyles = createStyles((theme) => ({
  card: {
    height: 440,
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "flex-start",
    backgroundSize: "cover",
    backgroundPosition: "center",
  },

  title: {
    fontFamily: `Greycliff CF ${theme.fontFamily}`,
    fontWeight: 900,
    color: theme.white,
    lineHeight: 1.2,
    fontSize: 22,
    marginTop: theme.spacing.xs,
  },

  category: {
    color: theme.white,
    opacity: 0.7,
    fontWeight: 700,
    textTransform: "uppercase",
  },
}));

export function HotelBooking(props) {
  const { classes } = useStyles();

  const countHandlers = useRef(null);

  const dispatch = useDispatch();

  let [roomcount, setRoomCount] = useState(1);
  
  let setCount = function (value) {
    setRoomCount(value);
  };

  const { data, isLoading, isError, isFetching } = useQuery(
    ["roomByHotel", props.hotel],
    () => getRoomsByHotel(props.hotel),
    {
      suspense: true,
    }
  );


  if (isLoading) {
    return (
      <Skeleton visible={true}>
        <Paper
          shadow="md"
          p="xl"
          radius="md"
          sx={{ backgroundImage: `url(${hotel3})` }}
          className={classes.card}
        >
          <div>
            <Title order={3} className={classes.title}>
              {props.links}
            </Title>
            <InputWrapper mt={30}>
              <Center>
                <Group spacing={5}>
                  <Text style={{ color: "#fff", fontWeight: "bold" }}>
                    No. of Rooms
                  </Text>
                  <ActionIcon
                    size={36}
                    variant="default"
                    onClick={() => countHandlers.current.decrement()}
                  >
                    –
                  </ActionIcon>
                  <NumberInput
                    hideControls
                    value={roomcount}
                    onChange={(val) => setCount(val)}
                    handlersRef={countHandlers}
                    max={10}
                    min={1}
                    step={1}
                    styles={{ input: { width: 54, textAlign: "center" } }}
                  />
                  <ActionIcon
                    size={36}
                    variant="default"
                    onClick={() => countHandlers.current.increment()}
                  >
                    +
                  </ActionIcon>
                </Group>
              </Center>
            </InputWrapper>
          </div>
          <Button
            variant="white"
            color="dark"
            onClick={() => {
              dispatch(
                bookingStatus({
                  data: {
                    roomtype: props.links,
                    roomCount: roomcount,
                  },
                  status: "inProgress",
                })
              );
            }}
          >
            BOOK NOW
          </Button>
        </Paper>
      </Skeleton>
    );
  }
  return data.data.map((item, key) => (
    <Grid.Col span={4}>
      <Paper
        shadow="md"
        p="xl"
        radius="md"
        sx={{ backgroundImage: `url(${hotel3})` }}
        className={classes.card}
        key={key}
      >
        <div>
          <Title order={3} className={classes.title}>
            {item.room.roomName}
          </Title>
          <InputWrapper mt={30}>
            <Center>
              <Group spacing={5}>
                <Text style={{ color: "#fff", fontWeight: "bold" }}>
                  No. of Rooms
                </Text>
                <ActionIcon
                  size={36}
                  variant="default"
                  onClick={() => countHandlers.current.decrement()}
                >
                  –
                </ActionIcon>
                <NumberInput
                  hideControls
                  value={roomcount}
                  onChange={(val) => setCount(val)}
                  handlersRef={countHandlers}
                  max={10}
                  min={1}
                  step={1}
                  styles={{ input: { width: 54, textAlign: "center" } }}
                />
                <ActionIcon
                  size={36}
                  variant="default"
                  onClick={() => countHandlers.current.increment()}
                >
                  +
                </ActionIcon>
              </Group>
            </Center>
          </InputWrapper>
          <Group>
            <Text style={{ color: "#fff", fontWeight: "bold" }}>
              Price: ${item.pricePerRoom}
            </Text>
          </Group>
        </div>
        <Button
          variant="white"
          color="dark"
          onClick={() => {
            dispatch(
              bookingStatus({
                data: {
                  roomtype: props.links,
                  roomCount: roomcount,
                },
                status: "inProgress",
              })
            );
          }}
        >
          BOOK NOW
        </Button>
      </Paper>
    </Grid.Col>
  ));
}