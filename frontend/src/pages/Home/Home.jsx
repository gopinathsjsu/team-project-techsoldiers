import React, { useState } from "react";
import TopBar from "../../components/TopBar";
import { Center } from "@mantine/core";
import AuthModal from "../../components/AuthModal";
import { getLocations } from "../../services/LocationService";

import { Button,Group} from '@mantine/core';
import Search from "../../components/Search";

export function Home() {
  return (
    <>
      <Search componentName="Home"/>
      { /* <Link to="/listing">Listing</Link>Search Bar for location and initial data will go here. */}
      {/* <Group position="center">
        <Button onClick={() => setOpenAuthModal(true)}>Open Drawer</Button>
      </Group>
      <AuthModal state={openAuthModal} setState={setOpenAuthModal} /> */}
    </>
  );
}
