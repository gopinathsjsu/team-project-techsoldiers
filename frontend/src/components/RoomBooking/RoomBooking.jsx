import React, {  } from "react";
import hotel3 from "../../media/hotel3.jpg";
import { useDispatch, useSelector } from "react-redux";
import { bookingStatus } from "../../features/booking/bookingSlice";
import {
  createStyles,
  Paper,
  Button,
  Text,
  Title,
  Grid,
  Group,
  Skeleton,
} from "@mantine/core";
import { useQuery } from "react-query";
import { getRoomsByHotel } from "../../services/RoomService";
import { useNavigate } from "react-router-dom";

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

export function RoomBooking(props) {
  const { classes } = useStyles();

  const search = useSelector((state) => state.search.data);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  if(search === null){
    navigate('/');
  }

  const { data, isLoading, isError, isFetching } = useQuery(
    ["roomByHotel", props.hotel],
    () => getRoomsByHotel(props.hotel),
    {
      suspense: true,
    }
  );

  function bookRoom(roomID, price, roomType){
    dispatch(bookingStatus({
      status: "inProgress",
      data: {
      location: search.location,
      date: search.date,
      person: search.person,
      room: search.room,
      price: price,
      roomType: roomType,
      hotelID: search.hotelID,
      roomID: roomID,
      hotelName: search.hotelName
      },
      confirm: false
    }))

    navigate('/summary');

  }

  if (isLoading) {
    return (
      <Skeleton visible={true}>
        <Paper>
            <Title>
            </Title>
          <Button>
          </Button>
        </Paper>
      </Skeleton>
    );
  }

  if(isError){
    return (
      <Skeleton visible={true} animate={true}>
        <Paper>
            <Title>
            </Title>
          <Button>
          </Button>
        </Paper>
      </Skeleton>
    )
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
          <Group>
            <Text style={{ color: "#fff", fontWeight: "bold" }}>
              Price: ${item.pricePerRoom} / night
            </Text>
          </Group>
        </div>
        <Button
          variant="white"
          color="dark"
          onClick={() => {
            bookRoom(item.id, item.pricePerRoom, item.room.roomName);
          }}
        >
        Book Now
        </Button>
      </Paper>
    </Grid.Col>
  ));
}
