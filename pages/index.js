import Head from "next/head";
import styles from "../styles/Login.module.css";
import Link from "next/link";

import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import LoginForm from "../components/LoginForm";
import { useRequireAuth } from "../hooks/useRequireAuth";

export default function login() {
  const auth = useRequireAuth();
  if (!auth.user) return null;

  return (
    <div className={styles.body}>
      <Head>
        <title>Login</title>
      </Head>
      <Container maxWidth="false" className={styles.container}>
        <Box
          sx={{
            backgroundColor: "#fff",
            textAlign: "center",
            borderRadius: "20px",
            width: "350px",
            height: "70%",
          }}
        >
          <Typography
            variant="h2"
            component="div"
            gutterBottom
            sx={{ marginTop: "20px" }}
          >
            Entre!
          </Typography>
          <LoginForm />
        </Box>
      </Container>
    </div>
  );
}
