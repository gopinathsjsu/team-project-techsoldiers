import React, { useEffect, useState } from 'react';
// use it when there is no image provided from the database
// import placeholder from '../../placeholder.png';   Using this image for dummy placements
import hotel2 from '../../media/hotel2.jpg'
import { createStyles, Card, Image, Text, Group, Skeleton } from '@mantine/core';
import { useQuery } from "react-query";
import ModalPopup from "../ModalPopup";
import { getHotelsByLocationId } from '../../services/HotelService';
import { getRoomsByHotel } from '../../services/RoomService';

const useStyles = createStyles((theme) => ({
  card: {
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
  },

  title: {
    fontWeight: 700,
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    lineHeight: 1.2,
  },

  body: {
    padding: theme.spacing.md,
  },
}));

export const HotelListing = (props) => {
  const { classes } = useStyles();
  const { data, isError, isLoading, isFetching } = useQuery(['hotelByLocation', props.location],() => getHotelsByLocationId(props.location), { suspense: true});
  console.log(data);

  // const { data:dataRoomtype, isErrorRoomtype, isLoadingRoomtype, isFetchingRoomtype } = useQuery(['roomTypeByHotel', 1],() => getRoomsByHotel(1));

  // console.log(dataRoomtype);



  //   setHotelData(data);
  //   console.log(data);
  // }, [isLoading])

  if (isLoading || isFetching) {
    return (
      <Skeleton visible={isLoading}>
        <Card withBorder radius="md" p={0} className={classes.card} mb="md">
          <Group noWrap spacing={0}>
            <Image src={hotel2} height={170} width={300} p={20} />
            <div className={classes.body}>
              <Text className={classes.title} transform="uppercase">
                Hotel Name
              </Text>
              <Text color="dimmed" weight={700} size="xs" mb="md">
                Address
              </Text>
              <Group noWrap spacing="xs" pb={10}>
                <Group spacing="xs" noWrap>
                  <Text size="xs">Room Type:</Text><Text size="xs" color="dimmed">Luxury</Text>
                </Group>
                <Text size="xs" color="dimmed">
                  |
                </Text>
                <Text size="xs">Price:</Text><Text size="xs" color="dimmed">$<span>45</span>/night</Text>
              </Group>
              <Text size="sm">
                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
              </Text>
            </div>
          </Group>
        </Card>
      </Skeleton>
    );
  }

  return (
    data.data.map((item, key) => (
      <Card key={key} withBorder radius="md" p={0} className={classes.card} mb="md">
        <Group noWrap spacing={0}>
          <Image src={hotel2} height={170} width={300} p={20} />
          <div className={classes.body}>
            <Text className={classes.title} transform="uppercase">
              {item.name}
            </Text>
            <Text color="dimmed" weight={700} size="xs" mb="md">
                {item.location.address},{item.location.city},{item.location.country} 
            </Text>
              <Group noWrap spacing="xs" pb={10}>
                <Group spacing="xs" noWrap>
                  <Text size="xs">Room Type:</Text><Text size="xs" color="dimmed">{item.hotelRooms[0].room.roomName}</Text>
                </Group>
                <Text size="xs" color="dimmed">
                    |
                </Text>
                <Text size="xs">Price:</Text><Text size="xs" color="dimmed">$<span>{item.hotelRooms[0].pricePerRoom}</span>/night</Text>
              </Group>
            <Text size="sm">
              {item.description}
            </Text>
          </div>
        </Group>
        <ModalPopup links={item}></ModalPopup>
      </Card>
    ))
  );
}