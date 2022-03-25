import React, { useState } from 'react';
import placeholder from '../../placeholder.png';
import logo from '../../logo.svg';
import { createStyles, List, Image, Button, Text, Group, Modal, ListItem } from '@mantine/core';

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
export const ModalPopup =  ({ links }) => {
  const [opened, setOpened] = useState(false);
  const { classes } = useStyles();

  const items = links.map((link) => (
    <span
      key={link.label}
      className={classes.link}
    >
      {link.label}
    </span>
  ));

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
                title="Overview"
                size='80%'
                transition="fade"
                transitionDuration={600}
                transitionTimingFunction="ease"
            >
                {/* Modal content */}
                <Text size="sm" mb={20}>
                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. 
                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
                </Text>
                <Text size='md' borderBottom='1px solid rgb(233, 236, 239)' mb={20}>
                    Amenities
                </Text>
                <Group>
                    <List>
                        {
                            links.map((item, key) => (
                                <ListItem key={key}>{item.label}</ListItem>
                            ))
                        }
                    </List>

                </Group>
            </Modal>
        </>
    );
}