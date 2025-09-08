"use client";

import { useState } from "react";
import axios from "axios";
import {
  TextField,
  Button,
  IconButton,
  InputAdornment,
  Box,
  Typography,
  Card,
  CardContent,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useRouter } from "next/navigation";

export default function SignInPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const validateEmail = (value: string) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setEmailError(!regex.test(value));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    validateEmail(email);
    if (emailError || !password) return;

    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/login`,
        { email, password }
      );

      const { success, message, data } = res.data;

      if (success) {
        // store token + user in localStorage
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));

        console.log("Login successful:", message);
        // navigate to home page
        router.push("/");
      } else {
        console.error("Login failed:", message);
        alert(message);
      }
    } catch (err: any) {
      console.error("Login error:", err.response?.data || err.message);
      alert("Login failed, please try again.");
    }
  };


  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        bgcolor: "#f9fafb",
      }}
    >
      <Card  sx={{ maxWidth: 400, width: "100%", p: 2, boxShadow: 0, border: 1, borderColor: '#b4b4b4' }}>
        <CardContent>
          <Typography variant="h5" align="center" gutterBottom>
            Sign In
          </Typography>

          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label="Email"
              type="email"
              margin="normal"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onBlur={(e) => validateEmail(e.target.value)}
              error={emailError}
              helperText={emailError ? "Enter a valid email address" : ""}
            />

            <TextField
              fullWidth
              label="Password"
              type={showPassword ? "text" : "password"}
              margin="normal"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowPassword(!showPassword)}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            <Button
              type="submit"
              variant="contained"
              fullWidth
              disableElevation
              sx={{
                    mt: 2,
                    color: "black",
                    backgroundColor: "white",
                    boxShadow: "none",
                    border: 1,
                    borderColor: "#b4b4b4",
                    "&:hover": {
                    backgroundColor: "#f5f5f5", // light gray
                    boxShadow: "none",          // remove shadow on hover
                    },
                }}
              disabled={!email || !password}
            >
              Sign In
            </Button>
          </form>
        </CardContent>
      </Card>
    </Box>
  );
}
