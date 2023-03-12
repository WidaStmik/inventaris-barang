import React from "react";
import styles from "@/styles/login.module.css";
import { TextField, Button, InputAdornment } from "@mui/material";
import { HiUser } from "react-icons/hi2";
import { IoIosKey } from "react-icons/io";
import { auth } from "@/services/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import toast from "react-hot-toast";
import { useRouter } from "next/router";

export default function Login() {
  const router = useRouter();
  const handleLogin = async (e) => {
    e.preventDefault();
    const { username, password } = e.target.elements;
    try {
      const user = await signInWithEmailAndPassword(
        auth,
        username.value,
        password.value
      );

      toast.success("Login Berhasil");
      router.push("/");
    } catch (error) {
      alert(error);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.login}>
        <h1 className={styles.title}>LAB TAV</h1>
        <form className={styles.form} onSubmit={handleLogin}>
          <h3 className={styles.form_title}>SMK PASUNDAN 2 BANDUNG</h3>
          <TextField
            id="username"
            label="Username"
            variant="outlined"
            fullWidth
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <HiUser />
                </InputAdornment>
              ),
            }}
            sx={{ marginBottom: "1rem" }}
          />
          <TextField
            id="password"
            label="Outlined"
            variant="outlined"
            fullWidth
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <IoIosKey />
                </InputAdornment>
              ),
            }}
            type="password"
            sx={{ marginBottom: "1rem" }}
          />

          <div className={styles.button}>
            <Button variant="contained" type="submit">
              Login
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
