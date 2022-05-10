import React, { useState, useRef } from 'react';
import hotel4 from '../../media/hotel4.jpg';
import { getMyBookings, updateMyBooking } from '../../services/BookingService';
import { useQuery, useMutation } from "react-query";
import axiosClient from "../../services/axios";
import { useForm } from '@mantine/form';
import { DatePicker } from '@mantine/dates';
import { DateRangePicker } from "@mantine/dates";
import dayjs from "dayjs";
import { createStyles, Card, Image, Group, Text, Checkbox, Center, Button, Skeleton, Grid, Modal, InputWrapper, Input, TextInput } from '@mantine/core';
// import { getAmenityByHotelId } from '../../services/AmenityService';

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
  const bookingMutation = useMutation(updateMyBooking);

  // const updateBooking = useMutation(['cancelBooking', id],() => updateMyBooking(id));


  let todate = new Date();
  todate.setDate(todate.getDate() + 7);

  const [date, setDate] = useState({
    from: new Date(),
    to: todate,
  });

  const [dateError, setDateError] = useState(null);

  function changeDate(values) {
    setDate({ from: values[0], to: values[1] });

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

  const { data, isError, isLoading, isFetching } = useQuery('mybookings', getMyBookings);
  console.log(data);

  // const { data:dataAmenity, isError:isErrorAmenity, isLoading:isLoadingAmenity, isFetching:isFetchingAmenity } = useQuery('amenityByHotel', getAmenityByHotelId);

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
                <b>Booking Dates:</b> {item.bookingFromDate} - {item.bookingToDate}
              </Text>
              <Text size="sm" color="dimmed" lineClamp={4}>
                <b>Status:</b> {item.status}
              </Text>
              <Text size="sm" color="dimmed" lineClamp={4}>
                <b>Total Cost: $</b> {item.totalPrice}
              </Text>

              <Group position="apart" className={classes.footer}>
                <Center>
                  <Button
                  onClick={() => setOpened(true)}
                  variant="gradient"
                  style={{fontSize: 12, paddingLeft: 12, paddingRight: 12}}
                  mr={20}
                  gradient={{ from: 'teal', to: 'blue', deg: 60 }}>
                    Update Booking
                  </Button>
                  <Button 
                    onClick={() => axiosClient.put('api/booking/' + item.id).then((res) => {
                    console.log(res);
                    alert("Booking Cancelled!!");
                    window.location.reload(false);
                    }).catch((err) => {
                      console.log(err);
                      alert("Booking Cancellation Failed!!");
                    })} 
                    variant="gradient" 
                    style={{fontSize: 12, paddingLeft: 12, paddingRight: 12}} 
                    gradient={{ from: 'teal', to: 'blue', deg: 60 }}>
                      Cancel Booking
                    </Button>
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
                  <form>
                    <Grid>
                      <Grid.Col span={8}>
                        <DateRangePicker
                          label="Book your Stay"
                          placeholder="Pick dates range"
                          value={[item.bookingFromDate, item.bookingToDate]}
                          onChange={(e) => changeDate(e)}
                          minDate={dayjs(new Date()).toDate()}
                          error={dateError}
                          required
                        />
                      </Grid.Col>
                    </Grid>
                    <Button type='submit' variant="gradient" gradient={{ from: 'teal', to: 'blue', deg: 60 }}>Update</Button>
                  </form>
                </Modal>
              </Group>
            </Card>  
          </Grid.Col>
        ))
      }
    </Grid> 
  );
}