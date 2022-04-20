import React, { useState, useRef } from 'react';
import hotel4 from '../../media/hotel4.jpg';
import { useDispatch } from 'react-redux';
import ModalPopup from '../../components/ModalPopup'
import { getMyBookings } from '../../services/BookingService';
import { useQuery } from "react-query";
import { createStyles, Card, Image, Group, Text, Checkbox, Center, Button, Skeleton, Grid, Modal, InputWrapper, Input } from '@mantine/core';
import { getAmenityByHotelId } from '../../services/AmenityService';

const useStyles = createStyles((theme) => ({
  card: {
    position: 'relative',
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
  },

  rating: {
    position: 'absolute',
    top: theme.spacing.xs,
    right: theme.spacing.xs + 2,
    pointerEvents: 'none',
  },

  title: {
    display: 'block',
    marginTop: theme.spacing.md,
    fontSize: 22,
    marginBottom: theme.spacing.xs / 2,
  },

  action: {
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.colors.gray[0],
  },

  footer: {
    marginTop: theme.spacing.md,
  },
}));


export function MyHotelBooking(props) {
  const { classes } = useStyles();
  const [opened, setOpened] = useState(false);

  const { data, isError, isLoading, isFetching } = useQuery('mybookings', getMyBookings);
  console.log(data);

  const { data:dataAmenity, isError:isErrorAmenity, isLoading:isLoadingAmenity, isFetching:isFetchingAmenity } = useQuery('amenityByHotel', getAmenityByHotelId);

  if(isLoading || isFetching){
    return (
      <Skeleton visible={isLoading}>
        <Card withBorder radius="md" className={classes.card} >
          <Card.Section>
            <a>
              <Image src={hotel4} height={180} />
            </a>
          </Card.Section>

          <Text className={classes.title} weight={500} component="a" >
            Hotel Name
          </Text>

          <Text size="sm" color="dimmed" lineClamp={4}>
            Descriptions
          </Text>

          <Group position="apart" className={classes.footer}>
            <Center>
              <Button variant="gradient" gradient={{ from: 'teal', to: 'blue', deg: 60 }}>Update Booking</Button>
            </Center>
          </Group>
        </Card>
      </Skeleton>
    );
  }

  if(isFetchingAmenity || isLoadingAmenity){
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
    <Grid mb={30} mt={30}>
      {
        data.data.map((item, key) => (
          <Grid.Col span={4}>
            <Card withBorder radius="md" className={classes.card} >
              <Card.Section>
                <a>
                  <Image src={hotel4} height={180} />
                </a>
              </Card.Section>

              <Text className={classes.title} weight={500} component="a" >
                Hotel Name {item.hotelId}
              </Text>
              <Text size="sm" color="dimmed" lineClamp={4}>
                Booking Dates: {item.bookingFromDate} - {item.bookingToDate}
              </Text>
              <Text size="sm" color="dimmed" lineClamp={4}>
                Status: {item.status}
              </Text>
              <Text size="sm" color="dimmed" lineClamp={4}>
                Total Cost: {item.totalPrice}
              </Text>

              <Group position="apart" className={classes.footer}>
                <Center>
                  <Button onClick={() => setOpened(true)} variant="gradient" gradient={{ from: 'teal', to: 'blue', deg: 60 }}>Update Booking</Button>
                </Center>
                <Modal
                    opened={opened}
                    onClose={() => setOpened(false)}
                    title="Hotel Name"
                    size='50%'
                    transition="fade"
                    transitionDuration={600}
                    transitionTimingFunction="ease"
                >
                  <Text size="sm" mb={20}>
                    <Grid>
                      <Grid.Col span={6}>
                        <InputWrapper label="Booking From">
                          <Input 
                            variant="default"
                            label="Booking From"
                            value={item.bookingFromDate}
                            placeholder="From Date" />
                        </InputWrapper>
                      </Grid.Col>
                      <Grid.Col span={6}>
                        <InputWrapper label="Booking To">
                          <Input 
                            variant="default"
                            label="Booking To"
                            value={item.bookingToDate}
                            placeholder="To Date" />
                        </InputWrapper>
                      </Grid.Col>
                    </Grid>
                  </Text>
                  <Text size='md' borderBottom='1px solid rgb(233, 236, 239)' mb={5}>
                      Amenities
                  </Text>
                  <Grid mb={30}>
                    {
                      dataAmenity.data.map((item, key) => (
                        <Grid.Col span={6}>
                          <Checkbox
                            label={item.name}
                            value={item.name}
                          />
                        </Grid.Col>
                      ))
                    }
                  </Grid>
                  <Button variant="gradient" gradient={{ from: 'teal', to: 'blue', deg: 60 }}>Update</Button>
                </Modal>
              </Group>
            </Card>  
          </Grid.Col>
        ))
      }
    </Grid> 
  );
}