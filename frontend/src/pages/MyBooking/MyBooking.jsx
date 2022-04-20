import React from 'react';
import { createStyles, Image, Group, Text, Container, Box } from '@mantine/core';
import TopBar from "../../components/TopBar";
import MyHotelBooking from '../../components/MyHotelBooking'
import hotel1 from '../../media/hotel1.jpg';

const useStyles = createStyles((theme) => ({
  card: {
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
  },

  title: {
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
  },

  footer: {
    padding: `${theme.spacing.xs}px ${theme.spacing.lg}px`,
    marginTop: theme.spacing.md,
    borderTop: `1px solid ${
      theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[2]
    }`,
  },
}));

export function MyBooking() {
  const { classes, theme } = useStyles();
  const links = [
    {
      link: "/",
      label: "Home",
    },
    {
      link: "/listing",
      label: "Listing",
    },
    {
      link: "/hotel",
      label: "Hotel",
    },
  ];

  return (
        <>
            <TopBar links={links} />
            <Box>
                <Image src={hotel1} height={300} width='lg' mb={30} />
                <Container>
                    <MyHotelBooking />
                </Container>
            </Box>
        </>
        
  );
}