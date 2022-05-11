import React, { useState } from "react";
import TopBar from "../../components/TopBar";
import { Center } from "@mantine/core";
import AuthModal from "../../components/AuthModal";
import { getLocations } from "../../services/LocationService";
import { Box, Container, Image, Text } from "@mantine/core";
import { Button,Group} from '@mantine/core';
import Search from "../../components/Search";
import hotel1 from '../../media/hotel1.jpg';
export function Home() {
  return (
    <>
    <Image src={hotel1} height={300} width='lg' mb={30} />
      <Search componentName="Home"/>
      { /* <Link to="/listing">Listing</Link>Search Bar for location and initial data will go here. */}
      {/* <Group position="center">
        <Button onClick={() => setOpenAuthModal(true)}>Open Drawer</Button>
      </Group>
      <AuthModal state={openAuthModal} setState={setOpenAuthModal} /> */}
    </>
  );
}
