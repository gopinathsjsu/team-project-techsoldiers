import React, { useState } from "react";
import TopBar from "../../components/TopBar";
import { Center } from "@mantine/core";
import SearchComponent  from "../../components/SearchComponent";
import AuthModal from "../../components/AuthModal";

import { Button,Group} from '@mantine/core';

export function Home() {
  const links = [
  
  ];
  const[openAuthModal, setOpenAuthModal] = useState(false);

  return (
    <>
      <TopBar links={links} />
      <SearchComponent/>
      <Center>

      { /* <Link to="/listing">Listing</Link>Search Bar for location and initial data will go here. */}
      <Group position="center">
        <Button onClick={() => setOpenAuthModal(true)}>Open Drawer</Button>
      </Group>
      </Center>
      <AuthModal state={openAuthModal} setState={setOpenAuthModal} />
    </>
  );
}
