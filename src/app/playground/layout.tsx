'use client';
import * as React from 'react';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import { createTheme } from '@mui/material/styles';
import PersonIcon from '@mui/icons-material/Person';
import CallIcon from '@mui/icons-material/Call';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import CallMadeIcon from '@mui/icons-material/CallMade';
import CallReceivedIcon from '@mui/icons-material/CallReceived';
import { AppProvider, type Navigation } from '@toolpad/core/AppProvider';
import { useDemoRouter } from '@toolpad/core/internal';
import { DashboardLayout } from '@toolpad/core';
import { AccountBox, Dashboard, MarkChatRead, MarkChatUnread, MarkUnreadChatAlt, Settings } from '@mui/icons-material';
import { useRouter } from 'next/router';

const demoTheme = createTheme({
  cssVariables: {
    colorSchemeSelector: 'data-toolpad-color-scheme',
  },
  colorSchemes: { light: true, dark: true },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 600,
      lg: 1200,
      xl: 1536,
    },
  },
});


const CHATS_NAVIGATION: Navigation = [
  {
    segment: 'unread',
    title: 'New',
    icon: <MarkChatUnread />,
    action: <Chip label={12} color="success" size="small" />,
  },
  {
    segment: 'received',
    title: 'Received',
    icon: <MarkChatRead />,
    action: <Chip label={4} color="error" size="small" />,
  },
];


export default function DashboardLayoutNavigationActions({children,}: {children: React.ReactNode;}) {
  

  const router = useRouter;

  const [popoverAnchorEl, setPopoverAnchorEl] =
    React.useState<HTMLButtonElement | null>(null);

  const isPopoverOpen = Boolean(popoverAnchorEl);
  const popoverId = isPopoverOpen ? 'simple-popover' : undefined;

  const handlePopoverButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    setPopoverAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation();
    setPopoverAnchorEl(null);
  };


  const popoverMenuAction = (
    <React.Fragment>
      <IconButton aria-describedby={popoverId} onClick={handlePopoverButtonClick}>
        <MoreHorizIcon />
      </IconButton>
      <Menu
        id={popoverId}
        open={isPopoverOpen}
        anchorEl={popoverAnchorEl}
        onClose={handlePopoverClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        disableAutoFocus
        disableAutoFocusItem
      >
        <MenuItem onClick={handlePopoverClose}>New call</MenuItem>
        <MenuItem onClick={handlePopoverClose}>Mark all as read</MenuItem>
      </Menu>
    </React.Fragment>
  );

  return (
    
      <AppProvider
        navigation={[
          {
            segment: 'playground/dashboard',
            title: 'Dashboard',
            icon: <Dashboard />,
            // action: <Chip label={7} color="primary" size="small" />,
          },
          {
            segment: 'chat',
            title: 'Rooms',
            icon: <PersonIcon />,
            // action: <Chip label={7} color="primary" size="small" />,
          },
          {
            segment: 'playground/settings',
            title: 'Settings',
            icon: <Settings />,
            // action: <Chip label={7} color="primary" size="small" />,
          },
            {
            segment: 'playground/profile',
            title: 'Profile',
            icon: <AccountBox />,
            // action: <Chip label={7} color="primary" size="small" />,
          },
          {
            segment: 'playground/chats',
            title: 'Chats',
            icon: <CallIcon />,
            action: popoverMenuAction,
            children: CHATS_NAVIGATION,
          },
        ]}
        
        theme={demoTheme}
      >
        <DashboardLayout>
          {children}
        </DashboardLayout>
      </AppProvider>
  );
}
