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
import { addRuang } from "@/services/barang";
import toast from "react-hot-toast";

export default function RuanganDialog() {
  const [open, setOpen] = useState(false);
  const [namaRuangan, setNamaRuangan] = useState("");
  const [kodeRuangan, setKodeRuangan] = useState("");

  const handleAdd = async () => {
    await toast.promise(addRuang({ namaRuangan, kodeRuangan }), {
      loading: "Menambahkan ruangan",
      success: "Berhasil menambahkan ruangan",
      error: "Gagal menambahkan ruangan",
    });
    setNamaRuangan("");
    setKodeRuangan("");
    setOpen(false);
  };

  return (
    <div>
      <Button variant="contained" onClick={() => setOpen(true)}>
        Tambah Ruangan
      </Button>
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle className={styles.card}>Tambah Ruangan</DialogTitle>
        <DialogContent>
          <div style={{ marginTop: 10 }}>
            <FormControl fullWidth>
              <TextField
                label="Kode Ruangan"
                variant="outlined"
                value={kodeRuangan}
                onChange={(e) => setKodeRuangan(e.target.value)}
              />
            </FormControl>
            <FormControl fullWidth sx={{ mt: 2 }}>
              <TextField
                label="Nama Ruangan"
                variant="outlined"
                value={namaRuangan}
                onChange={(e) => setNamaRuangan(e.target.value)}
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
