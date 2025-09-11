'use client';
import React, { useState, useEffect } from 'react';
import Navbar from '../component/Navbar';
import { 
  AppBar, 
  Toolbar, 
  Typography, 
  Button, 
  Container, 
  Box, 
  Grid, 
  Card, 
  CardContent, 
  Avatar 
} from '@mui/material';
import { 
  Security, 
  Forum, 
  SwapHoriz, 
  VerifiedUser,
  Speed,
  Support
} from '@mui/icons-material';
import Link from 'next/link';



// Main Landing Page Component
const LandingPage = () => {
  const features = [
    {
      icon: <Security sx={{ fontSize: 40, color: '#000000' }} />,
      title: "Complete Anonymity",
      description: "Parties never know each other's identities without middleman's awareness."
    },
    {
      icon: <SwapHoriz sx={{ fontSize: 40, color: '#000000' }} />,
      title: "Seamless Exchange",
      description: "Facilitate smooth communication and deal execution without revealing personal details."
    },
    {
      icon: <VerifiedUser sx={{ fontSize: 40, color: '#000000' }} />,
      title: "Trusted Mediation",
      description: "Professional middleman services ensure both parties feel secure throughout the process."
    },
    {
      icon: <Speed sx={{ fontSize: 40, color: '#000000' }} />,
      title: "Fast Processing",
      description: "Quick setup and efficient communication channels for time-sensitive deals."
    },
    {
      icon: <Forum sx={{ fontSize: 40, color: '#000000' }} />,
      title: "Multi-Mode communication",
      description: "Communication through voice-calls video-calls, confernce calls, chats and media service."
    },
    {
      icon: <Support sx={{ fontSize: 40, color: '#000000' }} />,
      title: "24/7 Support",
      description: "Round-the-clock assistance to ensure smooth transactions and resolve any issues."
    }
  ];

  return (
    <Box sx={{ minHeight: '100vh', minWidth: '100%', backgroundColor: '#fafafa' }}>
      <Navbar />
      
      {/* Hero Section */}
      <Container maxWidth="lg" sx={{ py: { xs: 6, md: 10 } }}>
        <Box sx={{ textAlign: 'center', mb: 8 }}>
          <Typography
            variant="h2"
            component="h1"
            sx={{
              fontWeight: 500,
              my: 5,
              fontSize: { xs: '2.5rem', md: '3.5rem', lg: '5.5rem' },
              background: 'linear-gradient(0deg, #1f1f1f, #0a0a0a)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            Anonymous Communication
          </Typography>
          <Typography
            variant="h5"
            sx={{
              color: 'text.secondary',
              mb: 4,
              maxWidth: 600,
              mx: 'auto',
              fontSize: { xs: '1.1rem', md: '1.25rem' },
              lineHeight: 1.6,
              textAlign: 'justify'
            }}
          >
            Connect parties securely without revealing identities. 
            Professional middleman services for confidential deals and communications.
          </Typography>
          <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href='/playground'>
            <Button
              variant="contained"
              size="large"
              sx={{
                backgroundColor: '#0a0a0a',
                px: 4,
                py: 1.5,
                borderRadius: 3,
                textTransform: 'none',
                fontSize: '1.1rem',
                fontWeight: 600,
                '&:hover': { backgroundColor: '#333333' }
              }}
            >
              Start a Deal
            </Button>
            </Link>
            <Link href={'/chat'}>
            <Button
              variant="outlined"
              size="large"
              sx={{
                borderColor: '#333333',
                color: '#0a0a0a',
                px: 4,
                py: 1.5,
                borderRadius: 3,
                textTransform: 'none',
                fontSize: '1.1rem',
                fontWeight: 600,
                '&:hover': { 
                  borderColor: '#333333',
                  backgroundColor: '#e1e1e1'
                }
              }}
            >
              /chats
            </Button>
            </Link>
          </Box>
        </Box>

        {/* Features Section */}
        <Typography
          variant="h4"
          component="h2"
          sx={{
            textAlign: 'center',
            mb: 6,
            fontWeight: 700,
            color: 'text.primary'
          }}
        >
          Why Choose MiddleLink?
        </Typography>

        <Grid
        container 
        spacing={4} 
        sx={{ mb: 8 }}
      >
        {features.map((feature, index) => (
          <Grid
            size={{ xs: 12, sm: 6, lg: 4 }} // New syntax for v6+
            key={index}
          >
            <Card
              sx={{
                height: '100%',
                p: 3,
                borderRadius: 3,
                border: '1px solid #e0e0e0',
                boxShadow: 'none',
                transition: 'all 0.3s ease-in-out',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: '0 8px 25px rgba(0,0,0,0.1)',
                  borderColor: '#fffffff'
                }
              }}
            >
              <CardContent 
                sx={{ 
                  textAlign: 'center', 
                  p: 0,
                  '&:last-child': { pb: 0 }
                }}
              >
                <Box sx={{ mb: 3 }}>
                  {feature.icon}
                </Box>
                <Typography
                  variant="h6"
                  component="h3"
                  sx={{ 
                    fontWeight: 600, 
                    mb: 2,
                    color: 'text.primary'
                  }}
                >
                  {feature.title}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ 
                    color: 'text.secondary', 
                    lineHeight: 1.6,
                    fontSize: '0.95rem'
                  }}
                >
                  {feature.description}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

        {/* How It Works Section */}
        <Box sx={{ textAlign: 'center', py: 8 }}>
          <Typography
            variant="h4"
            component="h2"
            sx={{
              mb: 6,
              fontWeight: 700,
              color: 'text.primary'
            }}
          >
            How It Works
          </Typography>
          
          <Grid container spacing={4} sx={{ maxWidth: 900, mx: 'auto' }}>
            <Grid  size={{lg:4, md:12}}>
              <Box sx={{ p: 3 }}>
                <Box
                  sx={{
                    width: 60,
                    height: 60,
                    borderRadius: '50%',
                    backgroundColor: '#f2f2f2',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    mx: 'auto',
                    mb: 2
                  }}
                >
                  <Typography variant="h5" sx={{ color: '#232323', fontWeight: 700 }}>
                    1
                  </Typography>
                </Box>
                <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
                  Create Request
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                  Submit your communication needs and we will assign a dedicated middleman.
                </Typography>
              </Box>
            </Grid>
            
            <Grid  size={{xs:12, md:4}}>
              <Box sx={{ p: 3 }}>
                <Box
                  sx={{
                    width: 60,
                    height: 60,
                    borderRadius: '50%',
                    backgroundColor: '#f2f2f2',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    mx: 'auto',
                    mb: 2
                  }}
                >
                  <Typography variant="h5" sx={{ color: '#232323', fontWeight: 700 }}>
                    2
                  </Typography>
                </Box>
                <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
                  Connect Parties
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                  We facilitate the connection while keeping all identities completely anonymous.
                </Typography>
              </Box>
            </Grid>
            
            <Grid  size={{xs:12, md:4}}>
              <Box sx={{ p: 3 }}>
                <Box
                  sx={{
                    width: 60,
                    height: 60,
                    borderRadius: '50%',
                    backgroundColor: '#f2f2f2',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    mx: 'auto',
                    mb: 2
                  }}
                >
                  <Typography variant="h5" sx={{ color: '#232323', fontWeight: 700 }}>
                    3
                  </Typography>
                </Box>
                <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
                  Complete Deal
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                  Secure transaction completion with full confidentiality maintained.
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Box>

        {/* CTA Section */}
        <Box
          sx={{
            backgroundColor: 'white',
            borderRadius: 4,
            p: { xs: 4, md: 6 },
            textAlign: 'center',
            border: '1px solid #e0e0e0'
          }}
        >
          <Typography
            variant="h4"
            component="h2"
            sx={{
              fontWeight: 700,
              mb: 2,
              color: 'text.primary'
            }}
          >
            Ready to Get Started?
          </Typography>
          <Typography
            variant="h6"
            sx={{
              color: 'text.secondary',
              mb: 4,
              maxWidth: 500,
              mx: 'auto'
            }}
          >
            Join thousands who trust MiddleLink for secure, anonymous communication and deal facilitation.
          </Typography>
          <Button
            variant="contained"
            size="large"
            sx={{
              backgroundColor: '#222222',
              px: 6,
              py: 2,
              borderRadius: 3,
              textTransform: 'none',
              fontSize: '1.2rem',
              fontWeight: 600,
              '&:hover': { backgroundColor: '#666666' }
            }}
          >
            Get Started Today
          </Button>
        </Box>
      </Container>

      {/* Footer */}
      <Box
        sx={{
          backgroundColor: '#f5f5f5',
          py: 4,
          mt: 8,
          borderTop: '1px solid #e0e0e0'
        }}
      >
        <Container maxWidth="lg">
          <Typography
            variant="body2"
            sx={{
              textAlign: 'center',
              color: 'text.secondary'
            }}
          >
            © 2024 MiddleLink. All rights reserved. Secure • Anonymous • Trusted
          </Typography>
        </Container>
      </Box>
    </Box>
  );
};

export default LandingPage;