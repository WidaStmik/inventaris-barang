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
import { addKondisi } from "@/services/barang";
import toast from "react-hot-toast";

export default function RuanganDialog() {
  const [open, setOpen] = useState(false);
  const [namaKondisi, setNamaKondisi] = useState("");
  const [kodeKondisi, setKodeKondisi] = useState("");

  const handleAdd = async () => {
    await toast.promise(addKondisi({ namaKondisi, kodeKondisi }), {
      loading: "Menambahkan kondisi",
      success: "Berhasil menambahkan kondisi",
      error: "Gagal menambahkan kondisi",
    });
    setNamaKondisi("");
    setKodeKondisi("");
    setOpen(false);
  };

  return (
    <div>
      <Button variant="contained" onClick={() => setOpen(true)}>
        Tambah Kondisi
      </Button>
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle className={styles.card}>Tambah Kondisi</DialogTitle>
        <DialogContent>
          <div style={{ marginTop: 10 }}>
            <FormControl fullWidth>
              <TextField
                label="Kode Kondisi"
                variant="outlined"
                value={kodeKondisi}
                onChange={(e) => setKodeKondisi(e.target.value)}
              />
            </FormControl>
            <FormControl fullWidth sx={{ mt: 2 }}>
              <TextField
                label="Nama Kondisi"
                variant="outlined"
                value={namaKondisi}
                onChange={(e) => setNamaKondisi(e.target.value)}
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
