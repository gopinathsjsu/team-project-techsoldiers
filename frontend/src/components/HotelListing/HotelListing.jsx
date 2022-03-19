import React, { useState } from 'react';
// use it when there is no image provided from the database
// import placeholder from '../../placeholder.png';   Using this image for dummy placements
import hotel2 from '../../media/hotel2.jpg'
import logo from '../../logo.svg';
import { createStyles, Card, Image, Button, Text, Group, Modal } from '@mantine/core';
import ModalPopup from "../ModalPopup";

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

// interface ArticleCardVerticalProps {
//   image: string;
//   category: string;
//   title: string;
//   date: string;
//   author: {
//     name: string;
//     avatar: string;
//   };
// }
export const HotelListing =  () => {
  const [opened, setOpened] = useState(false);
  const { classes } = useStyles();
  const links = [
    {
      label: "Check-in: 04:00 PM",
    },
    {
      label: "High-Speed Internet Access",
    },
    {
      label: "On-site parking",
    },
    {
      label: "17 meeting rooms",
    },
    {
      label: "41 floors , 762 rooms , 12 suites",
    },
    {
      label: "All public areas non-smoking",
    },
    {
      label: "Air conditioning",
    },
    {
      label: "Coffee maker/tea service",
    },
  ];
  return (
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
      <ModalPopup links={links}></ModalPopup>
    </Card>
  );
}