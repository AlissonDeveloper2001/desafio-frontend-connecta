import React, { useState } from "react";

import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Popover from "@mui/material/Popover";
import { useRouter } from "next/router";
import { useAuth } from "../../hooks/useAuth";

import styles from "../../styles/LoginForm.module.css";
function LoginForm() {
  const [popoverOpen, setPopoverOpen] = useState(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handlePopoverOpen = (event) => {
    setPopoverOpen(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setPopoverOpen(null);
  };

  const open = Boolean(popoverOpen);
  const router = useRouter();
  const auth = useAuth();

  const onSubmit = () => {
    console.log(auth.user);
    if (username == "desafioconnecta@connecta.com") {
      if (password == "connecta") {
        return auth.signIn({ email: username, password: password }).then(() => {
          router.push("/dashboard");
        });
      }
    }
  };
  return (
    <Box
      component="form"
      sx={{
        "& > :not(style)": { m: 1, width: "80%" },
      }}
      noValidate
      autoComplete="off"
    >
      <TextField
        id="outlined-basic"
        label="Usuário"
        variant="outlined"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <TextField
        id="outlined-basic"
        label="Senha"
        variant="outlined"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <Button
        variant="contained"
        className={styles.submitButton}
        // type="submit"
        onClick={onSubmit}
      >
        Entrar
      </Button>

      <Typography
        aria-owns={open ? "mouse-over-popover" : undefined}
        aria-haspopup="true"
        onMouseEnter={handlePopoverOpen}
        onMouseLeave={handlePopoverClose}
        sx={{ width: "100%!important" }}
      >
        Esqueceu a senha?
      </Typography>
      <Popover
        id="mouse-over-popover"
        sx={{
          pointerEvents: "none",
        }}
        open={open}
        anchorEl={popoverOpen}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        onClose={handlePopoverClose}
        disableRestoreFocus
      >
        <Typography sx={{ p: 1 }}>
          User: desafioconnecta@connecta.com
        </Typography>
        <Typography sx={{ p: 1 }}>Password: connecta</Typography>
      </Popover>
    </Box>
  );
}

export default LoginForm;
