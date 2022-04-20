import React, { useState } from "react";
import {
  List,
  Button,
  Text,
  Group,
  Modal,
  ListItem,
  Skeleton,
} from "@mantine/core";
import { useQuery } from "react-query";
import { getAmenityByHotelId } from "../../services/AmenityService";
import { useNavigate } from "react-router-dom";
import { showNotification } from "@mantine/notifications";
import { useDispatch } from "react-redux";
import {searchState} from "../../features/search/searchSlice";


export const ModalPopup = (props) => {
  const [opened, setOpened] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { data, isError, isLoading, isFetching } = useQuery(
    "amenityByHotel",
    getAmenityByHotelId,
    { suspense: true }
  );

  if (isLoading || isFetching) {
    return (
      <Skeleton visible={true}>
        <Modal
          size="50%"
          transition="fade"
          transitionDuration={600}
          transitionTimingFunction="ease"
        >
          {/* Modal content */}
          <Text size="sm" mb={20}>
          </Text>
          <Text size="md" borderBottom="1px solid rgb(233, 236, 239)" mb={20}>
          </Text>
          <Button
            variant="gradient"
            gradient={{ from: "teal", to: "blue", deg: 60 }}
          >
          </Button>
          <Group>
          </Group>
        </Modal>
      </Skeleton>
    );
  }

  return (
    <>
      <Group
        withBorder
        p={10}
        noWrap
        spacing={0}
        style={{
          display: "block",
          textAlign: "right",
          borderTop: "1px solid #e9ecef",
        }}
      >
        <Text>
          <Button
            onClick={() => setOpened(true)}
            variant="gradient"
            gradient={{ from: "teal", to: "blue", deg: 60 }}
          >
            Details
          </Button>
        </Text>
      </Group>
      <Modal
        opened={opened}
        onClose={() => setOpened(false)}
        title={props.links.name}
        size="50%"
        transition="fade"
        transitionDuration={600}
        transitionTimingFunction="ease"
      >
        {/* Modal content */}
        <Text size="sm" mb={20}>
          {props.links.description}
        </Text>
        <Text size="md" borderBottom="1px solid rgb(233, 236, 239)" mb={10}>
          Amenities
        </Text>

        <Group>
          <List>
            {data.data.map((item, key) => (
              <ListItem key={key}>{item.name}</ListItem>
            ))}
          </List>
        </Group>
        <Button
          mt={40}
          variant="gradient"
          gradient={{ from: "teal", to: "blue", deg: 60 }}
          onClick={() => {
             
            showNotification({
                title: 'Select a room',
                message: 'Select a room for you want',
            })
            
            dispatch(searchState({
                hotelID:props.links.id,
                hotelName: props.links.name
            }))

            setTimeout(() =>{
                navigate(`/hotel/${props.links.id}/rooms`);
            }, 600)
          }}
        >
          View Rates
        </Button>
      </Modal>
    </>
  );
};
