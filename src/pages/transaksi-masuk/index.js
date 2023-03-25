import React from "react";
import Head from "next/head";
import {
  Card,
  Select,
  TextField,
  InputLabel,
  FormControl,
  MenuItem,
  Button,
} from "@mui/material";
import styles from "./index.module.css";
import { useRouter } from "next/router";

export default function TransaksiMasuk() {
  const router = useRouter();
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const handleAdd = () => {
    router.push("/barang");
  };
  return (
    <div>
      <Head>
        <title>Transaksi Masuk</title>
      </Head>
      <form className={styles.container} onSubmit={handleSubmit}>
        <div className="heading">Transaksi Barang Masuk</div>

        <Card elevation={2} className={styles.card}>
          <div className={styles.cardHeading}>Form Transaksi Masuk</div>
          <FormControl fullWidth>
            <InputLabel id="barang-label">Barang</InputLabel>
            <div className={styles.formGroup}>
              <Select
                labelId="barang-label"
                id="barang"
                label="Barang"
                fullWidth
                variant="outlined"
              >
                <MenuItem value="barang1">Barang 1</MenuItem>
              </Select>
              <Button onClick={handleAdd} variant="contained" color="primary">
                +
              </Button>
            </div>
          </FormControl>

          <FormControl fullWidth>
            <InputLabel id="ruangan-label">Ruangan</InputLabel>
            <div className={styles.formGroup}>
              <Select
                labelId="ruangan-label"
                id="ruangan"
                label="ruangan"
                fullWidth
                variant="outlined"
              >
                <MenuItem value="ruangan1">Ruangan 1</MenuItem>
              </Select>
              <Button onClick={handleAdd} variant="contained" color="primary">
                +
              </Button>
            </div>
          </FormControl>

          <FormControl fullWidth>
            <TextField
              id="jumlah"
              label="Jumlah"
              variant="outlined"
              fullWidth
            />
          </FormControl>

          <FormControl fullWidth>
            <InputLabel id="kondisi-label">Kondisi</InputLabel>
            <div className={styles.formGroup}>
              <Select
                labelId="kondisi-label"
                id="kondisi"
                label="kondisi"
                fullWidth
                variant="outlined"
              >
                <MenuItem value="kondisi1">Kondisi 1</MenuItem>
              </Select>
            </div>
          </FormControl>

          <Button variant="contained" color="primary" fullWidth type="submit">
            Simpan
          </Button>
        </Card>
      </form>
    </div>
  );
}
