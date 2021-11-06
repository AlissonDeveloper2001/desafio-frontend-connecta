import React from "react";
import { useRequireAuth } from "../hooks/useRequireAuth";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import Container from "@mui/material/Container";

function dashboard() {
  const auth = useRequireAuth();
  if (!auth.user) return null;
  return (
    <div>
      <Container maxWidth="false" className="dashboard-container">
        <Box sx={{ flexGrow: 1, width: "100%", padding: 0 }}>
          <AppBar position="static">
            <Toolbar>
              <Avatar sx={{ marginRight: "10px" }}>C</Avatar>
              <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                Olá, Connecta!
              </Typography>
              <Button color="inherit" onClick={() => auth.signOut()}>
                Logout
              </Button>
            </Toolbar>
          </AppBar>
        </Box>
      </Container>
    </div>
  );
}

export default dashboard;
