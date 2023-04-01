import { useEffect } from "react";
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
  pinjamBarang,
  useDataPeminjaman,
  kembalikanBarang,
} from "@/services/barang";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { selectAuth } from "@/redux/user";

export default function Peminjaman() {
  const router = useRouter();

  const { uid } = useSelector(selectAuth);
  const peminjaman = useDataPeminjaman();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const id = e.target.barang.value;

    if (!id) {
      toast.error("Semua field harus diisi");
      return;
    }

    await toast.promise(kembalikanBarang(id), {
      loading: "Mengembalikan barang",
      success: "Barang berhasil dikembalikan",
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
        <title>Pengembalian</title>
      </Head>
      <form className={styles.container} onSubmit={handleSubmit}>
        <div className="heading">Pengembalian Barang</div>

        <Card elevation={2} className={styles.card}>
          <div className={styles.cardHeading}>Form Pengembalian Barang</div>
          <FormControl fullWidth>
            <InputLabel id="barang-label">Barang</InputLabel>
            <Select
              labelId="barang-label"
              id="barang"
              label="Barang"
              fullWidth
              variant="outlined"
              name="barang"
            >
              {peminjaman.map((i) => (
                <MenuItem value={i.id} key={i.id}>
                  {i.user.displayName || i.user.email} - {i.barang.namaBarang}
                  {" - "}
                  {i.tanggal_keluar.toDate().toLocaleDateString()}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <Button variant="contained" color="primary" fullWidth type="submit">
            Simpan
          </Button>
        </Card>
      </form>
    </div>
  );
}
