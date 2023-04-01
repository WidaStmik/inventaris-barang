import { useEffect, useState, useRef, useCallback } from "react";
import Head from "next/head";
import {
  Card,
  Select,
  InputLabel,
  FormControl,
  MenuItem,
  Button,
} from "@mui/material";
import styles from "./index.module.css";
import { useRouter } from "next/router";
import { useRuangan } from "@/services/barang";
import toast from "react-hot-toast";
import Preview from "@/components/cetak-laporan/Preview";
import { useReactToPrint } from "react-to-print";

export default function CetakLaporan() {
  const router = useRouter();
  const [ruanganId, setRuanganId] = useState("");
  const ruangan = useRuangan();
  const contentRef = useRef();

  const reactToPrintContent = useCallback(() => {
    return contentRef.current;
  }, [contentRef.current]);

  const print = useReactToPrint({
    content: reactToPrintContent,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!ruanganId) {
      toast.error("Pilih ruangan terlebih dahulu");
      return;
    }

    print();
  };

  const handleAdd = () => {
    router.push("/barang");
  };
  return (
    <div>
      <Head>
        <title>Cetak Laporan</title>
      </Head>
      <form className={styles.container} onSubmit={handleSubmit}>
        <div className="heading">Cetak Laporan</div>

        <Card elevation={2} className={styles.card}>
          <div className={styles.cardHeading}>Form Cetak Laporan</div>
          <FormControl fullWidth>
            <InputLabel id="barang-label">Barang</InputLabel>
            <div className={styles.formGroup}>
              <Select
                labelId="ruangan-label"
                id="ruangan"
                label="Ruangan"
                fullWidth
                variant="outlined"
                name="ruangan"
                value={ruanganId}
                onChange={(e) => setRuanganId(e.target.value)}
              >
                {ruangan.map((i) => (
                  <MenuItem value={i.id} key={i.id}>
                    {i.namaRuangan}
                  </MenuItem>
                ))}
              </Select>
              <Button onClick={handleAdd} variant="contained" color="primary">
                +
              </Button>
            </div>
          </FormControl>

          <Button variant="contained" color="primary" fullWidth type="submit">
            Cetak
          </Button>
        </Card>
      </form>
      {ruanganId && (
        <div className={styles.container}>
          <div className="heading">Preview</div>

          <Preview
            ruanganId={ruanganId}
            ruangan={ruangan.find((i) => i.id === ruanganId)}
            ref={contentRef}
          />
        </div>
      )}
    </div>
  );
}
