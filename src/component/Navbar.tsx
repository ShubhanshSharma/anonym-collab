'use client';

import { AppBar, Avatar, Box, Button, Container, Toolbar, Typography } from "@mui/material";
import Link from "next/link";
import { useEffect, useState } from "react";

// Navbar Component
export default function Navbar()  {
  const [token, setToken] = useState<string | null>('');

  if (typeof window !== "undefined") {
    const stored = localStorage.getItem("token");
    setToken(stored);
  }


  return (
    <AppBar 
      position="static" 
      elevation={0}
      sx={{ 
        backgroundColor: 'white', 
        borderBottom: '1px solid #e0e0e0',
        color: 'text.primary'
      }}
    >
      <Container maxWidth="lg">
        <Toolbar sx={{ justifyContent: 'space-between', px: { xs: 0, sm: 2 } }}>
          {/* Logo Section */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Avatar
              src="https://placehold.co/40x40"
              alt="MiddleLink Logo"
              sx={{ 
                width: 40, 
                height: 40,
                backgroundColor: '#000000'
              }}
            >
              ML
            </Avatar>
            <Typography
              variant="h6" 
              component="div"
              sx={{ 
                fontWeight: 700,
                color: '#000000',
                display: { xs: 'none', sm: 'block' }
              }}
            >
              MiddleLink
            </Typography>
          </Box>

          {/* Sign In Button - Only show if no token */}
          {!token && (
            <Link href={'/sign-in'}>
            <Button
              variant="contained"
              sx={{
                backgroundColor: '#ffffff',
                boxShadow: 'none' ,
                color: 'black',
                border: 1,
                borderColor: "#b4b4b4",
                px: 3,
                py: 1,
                borderRadius: 2,
                textTransform: 'none',
                fontWeight: 600,
                '&:hover': {
                    boxShadow: 0
                }
              }}
            >
              Sign In
            </Button>
            </Link>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
};