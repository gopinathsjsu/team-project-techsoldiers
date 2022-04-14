import React, { useState } from 'react';
import placeholder from '../../placeholder.png';
import logo from '../../logo.svg';
import { createStyles, List, Image, Button, Text, Group, Modal, ListItem, Skeleton } from '@mantine/core';
import { useQuery } from "react-query";
import { getAmenityByHotelId } from '../../services/AmenityService';
import { useNavigate } from 'react-router-dom';

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
export const ModalPopup =  (props) => {
  const [opened, setOpened] = useState(false);
  const { classes } = useStyles();
  const navigate = useNavigate();

  const { data, isError, isLoading, isFetching } = useQuery('amenityByHotel',getAmenityByHotelId);
console.log(data);
//   data.data.map((item, key) => (
//     console.log(item);
//   ));

if(isLoading || isFetching){
    return(
        <Skeleton visible={true}>
            <Modal
                    opened={opened}
                    onClose={() => setOpened(false)}
                    title={props.links.name}
                    size='50%'
                    transition="fade"
                    transitionDuration={600}
                    transitionTimingFunction="ease"
                >
                    {/* Modal content */}
                    <Text size="sm" mb={20}>
                        {props.links.description}
                    </Text>
                    <Text size='md' borderBottom='1px solid rgb(233, 236, 239)' mb={20}>
                        Amenities
                    </Text>
                    <Button variant="gradient" gradient={{ from: 'teal', to: 'blue', deg: 60 }}>Book Hotel</Button>
                    <Group>
                        {/* <List>
                            {
                                data.map((item, key) => (
                                    <ListItem key={key}>{item.name}</ListItem>
                                ))
                            }
                        </List> */}

                    </Group>
                </Modal>
        </Skeleton>
    )
}

  return (
        <>
            <Group withBorder p={10} noWrap spacing={0} style={{display: 'block', textAlign: 'right', borderTop: '1px solid #e9ecef'}}>
                <Text>
                    <Button onClick={() => setOpened(true)} variant="gradient" gradient={{ from: 'teal', to: 'blue', deg: 60 }}>Details</Button>
                </Text>
            </Group>
            <Modal
                opened={opened}
                onClose={() => setOpened(false)}
                title={props.links.name}
                size='50%'
                transition="fade"
                transitionDuration={600}
                transitionTimingFunction="ease"
            >
                {/* Modal content */}
                <Text size="sm" mb={20}>
                    {props.links.description}
                </Text>
                <Text size='md' borderBottom='1px solid rgb(233, 236, 239)' mb={10}>
                    Amenities
                </Text>
                
                <Group>
                    <List>
                        {
                            data.data.map((item, key) => (
                                <ListItem key={key}>{item.name}</ListItem>
                            ))
                        }
                    </List>
                </Group>
                <Button mt={40} variant="gradient" gradient={{ from: 'teal', to: 'blue', deg: 60 }} onClick={ () => { navigate(`/hotel/${props.links.id}/rooms`); }}>Book Hotel</Button>
            </Modal>
        </>
    );
}