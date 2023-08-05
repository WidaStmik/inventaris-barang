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
  pinjamBarang,
} from "@/services/barang";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { selectAuth } from "@/redux/user";

export default function Peminjaman() {
  const router = useRouter();

  const { uid } = useSelector(selectAuth);
  const namaBarang = useNamaBarang();
  const kondisi = useKondisi();
  const ruangan = useRuangan();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      barangId: e.target.barang.value,
      ruanganId: e.target.ruangan.value,
      jumlah: e.target.jumlah.value,
      tanggal_keluar: new Date(),
      nama_peminjam: e.target.nama.value,
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

    await toast.promise(pinjamBarang(data), {
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
        <title>Peminjaman</title>
      </Head>
      <form className={styles.container} onSubmit={handleSubmit}>
        <div className="heading">Peminjaman Inventaris Barang</div>

        <Card elevation={2} className={styles.card}>
          <div className={styles.cardHeading}>Form Peminjaman Barang</div>
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
            <TextField
              id="nama"
              label="Nama Peminjam"
              variant="outlined"
              fullWidth
              name="nama"
            />
          </FormControl>

          <Button variant="contained" color="primary" fullWidth type="submit">
            Simpan
          </Button>
        </Card>
      </form>
    </div>
  );
}
