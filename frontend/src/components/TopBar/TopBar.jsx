import React from 'react';
import { createStyles, Header, Group, Button, Menu, Text, useMantineTheme, Badge } from '@mantine/core';
import { useDispatch, useSelector } from 'react-redux';
import { modalOpen } from '../../features/modal/modalSlice';

const useStyles = createStyles((theme) => ({
  header: {
    paddingLeft: theme.spacing.md,
    paddingRight: theme.spacing.md,
  },

  inner: {
    height: 56,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  links: {
    [theme.fn.smallerThan('md')]: {
      display: 'none',
    },
  },

  search: {
    [theme.fn.smallerThan('xs')]: {
      display: 'none',
    },
  },

  link: {
    display: 'block',
    lineHeight: 1,
    padding: '8px 12px',
    borderRadius: theme.radius.sm,
    textDecoration: 'none',
    color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.colors.gray[7],
    fontSize: theme.fontSizes.sm,
    fontWeight: 500,

    '&:hover': {
      backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
    },
  },
}));

export function TopBar() {
  const { classes } = useStyles();
  const dispatch = useDispatch();
  const theme = useMantineTheme();
  const bookings = useSelector((state) => state.persistedReducer.booking);
  const login = useSelector((state) => state.persistedReducer.login);
  return (
    <Header height={56} className={classes.header}>
      <div className={classes.inner}>
        <Group>
          <h2>Hotel Management System</h2>
        </Group>

        <Group>
          <Group ml={50} spacing={5} className={classes.links}>
            {login.status == 'unauth' && <Button onClick={() => dispatch(modalOpen())}>Login</Button>}
            {login.status == 'auth' && login.data.jwt.payload.name}
            <Group position="center">
              <Menu withArrow size={300} placement="center" transition="pop">
                {
                  bookings.map((item, key) => (
                    <Menu.Item key={key}>
                      <Group>
                        <div>
                          <Text weight={500}>{item.data.roomType}</Text>
                          <Text size="xs" color="dimmed">
                            No. of Person: {item.data.person}, No. of Room: {item.data.room}
                          </Text>
                          <Text size="xs" color="dimmed">
                            Hotel: {item.data.hotelName}
                          </Text>
                        </div>
                      </Group>
                    </Menu.Item>
                  ))
                }
              </Menu>
            </Group>
          </Group>
        </Group>
      </div>

    </Header>
  );
}