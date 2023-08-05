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
import {
  useNamaBarang,
  useKondisi,
  useRuangan,
  transaksiKeluar,
} from "@/services/barang";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { selectAuth } from "@/redux/user";

export default function TransaksiKeluar() {
  const router = useRouter();

  const { uid } = useSelector(selectAuth);
  const namaBarang = useNamaBarang();
  const kondisi = useKondisi();
  const ruangan = useRuangan();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      barangId: e.target.barang.value,
      kondisiId: e.target.kondisi.value,
      ruanganId: e.target.ruangan.value,
      jumlah: e.target.jumlah.value,
      tanggal_keluar: new Date(),
      userId: uid,
    };

    if (
      data.barangId === "" ||
      data.kondisiId === "" ||
      data.ruanganId === "" ||
      data.jumlah === ""
    ) {
      toast.error("Semua field harus diisi");
      return;
    }

    if (data.jumlah <= 0) {
      toast.error("Jumlah barang tidak boleh kurang dari 1");
      return;
    }

    await toast.promise(transaksiKeluar(data), {
      loading: "Menyimpan data",
      success: "Transaksi berhasil",
      error: (err) => err,
    });

    e.target.reset();
  };

  const handleAdd = () => {
    router.push("/barang");
  };
  return (
    <div>
      <Head>
        <title>Transaksi Keluar</title>
      </Head>
      <form className={styles.container} onSubmit={handleSubmit}>
        <div className="heading">Transaksi Inventaris Barang Keluar</div>

        <Card elevation={2} className={styles.card}>
          <div className={styles.cardHeading}>Form Transaksi Keluar</div>
          <FormControl fullWidth>
            <InputLabel id="barang-label">Barang</InputLabel>
            <div className={styles.formGroup}>
              <Select
                labelId="barang-label"
                id="barang"
                label="Barang"
                fullWidth
                variant="outlined"
                name="barang"
              >
                {namaBarang.map((barang) => (
                  <MenuItem value={barang.id} key={barang.id}>
                    {barang.namaBarang}
                  </MenuItem>
                ))}
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
                name="ruangan"
              >
                {ruangan.map((ruangan) => (
                  <MenuItem value={ruangan.id} key={ruangan.id}>
                    {ruangan.namaRuangan}
                  </MenuItem>
                ))}
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
              type="number"
              name="jumlah"
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
                name="kondisi"
              >
                {kondisi.map((k) => (
                  <MenuItem value={k.id} key={k.id}>
                    {k.namaKondisi}
                  </MenuItem>
                ))}
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
