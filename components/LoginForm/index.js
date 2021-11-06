import React, { useState } from "react";

import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Popover from "@mui/material/Popover";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

import { useRouter } from "next/router";
import { useAuth } from "../../hooks/useAuth";

import styles from "../../styles/LoginForm.module.css";
function LoginForm() {
  const [popoverOpen, setPopoverOpen] = useState(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [openModal, setOpenModal] = React.useState(false);

  const handleClickOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

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
      } else {
        handleClickOpenModal();
      }
    } else {
      handleClickOpenModal();
    }
  };

  const onPressEnter = (e) => {
    if (e.charCode === 13) {
      onSubmit();
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
        onKeyPress={(e) => onPressEnter(e)}
      />
      <TextField
        id="outlined-basic"
        label="Senha"
        variant="outlined"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        onKeyPress={(e) => onPressEnter(e)}
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

      <Dialog
        open={openModal}
        onClose={handleCloseModal}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Usuário ou senha incorretos."}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Tente o botão de "Esqueceu a senha?"
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseModal}>Cancelar</Button>
          <Button onClick={handleCloseModal} autoFocus>
            Ok
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default LoginForm;
