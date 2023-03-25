import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  FormControl,
} from "@mui/material";
import { useState } from "react";
import styles from "./index.module.css";
import { addBarang } from "@/services/barang";
import toast from "react-hot-toast";

export default function BarangDialog() {
  const [open, setOpen] = useState(false);
  const [namaBarang, setNamaBarang] = useState("");
  const [kodeBarang, setKodeBarang] = useState("");

  const handleAdd = async () => {
    await toast.promise(addBarang({ namaBarang, kodeBarang }), {
      loading: "Menambahkan barang",
      success: "Berhasil menambahkan barang",
      error: "Gagal menambahkan barang",
    });
    setNamaBarang("");
    setKodeBarang("");
    setOpen(false);
  };

  return (
    <div>
      <Button variant="contained" onClick={() => setOpen(true)}>
        Tambah Barang
      </Button>
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle className={styles.card}>Tambah Barang</DialogTitle>
        <DialogContent>
          <div style={{ marginTop: 10 }}>
            <FormControl fullWidth>
              <TextField
                label="Kode Barang"
                variant="outlined"
                value={kodeBarang}
                onChange={(e) => setKodeBarang(e.target.value)}
              />
            </FormControl>
            <FormControl fullWidth sx={{ mt: 2 }}>
              <TextField
                label="Nama Barang"
                variant="outlined"
                value={namaBarang}
                onChange={(e) => setNamaBarang(e.target.value)}
              />
            </FormControl>
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Batal</Button>
          <Button variant="contained" onClick={handleAdd}>
            Simpan
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
