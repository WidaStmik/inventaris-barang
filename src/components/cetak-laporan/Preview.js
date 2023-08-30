import { useState, useEffect, useMemo } from "react";
import { forwardRef } from "react";
import { getBarangByRuangan } from "@/services/barang";
import styles from "./index.module.css";
import { DataGrid } from "@mui/x-data-grid";

function Preview({ ruanganId, ruangan }, ref) {
  const [barang, setBarang] = useState([]);

  const tableData = barang.map((item) => ({
    id: item.id,
    kode: item.barang?.kodeBarang,
    nama: item.barang?.namaBarang,
    jumlah: item.jumlah,
    kondisi: item.kondisi.namaKondisi,
    ruangan: item.ruangan.namaRuangan,
  }));

  const columns = [
    { field: "kode", headerName: "Kode", width: 100 },
    { field: "nama", headerName: "Nama", width: 250 },
    { field: "jumlah", headerName: "Jumlah", width: 100 },
    { field: "kondisi", headerName: "Kondisi", width: 200 },
  ];

  useEffect(() => {
    getBarangByRuangan(ruanganId).then((barang) => {
      setBarang(barang);
    });
  }, [ruanganId]);

  return (
    <div className={styles.container} id="print-preview" ref={ref}>
      <div className={styles.header}>
        <img src="/Kopsurat.png" alt="kop surat" className={styles.kopsurat} />
      </div>
      <div className={styles.content}>
        <div className={styles.subtitle}>
          Data Inventaris Ruangan {ruangan.namaRuangan}
        </div>
        <div className={styles.subtitle}>SMK Pasundan 2 Bandung</div>
        <div className={styles.subtitle}>
          Tanggal: {new Date().toLocaleDateString()}
        </div>

        <div className={styles.table}>
          <DataGrid
            rows={tableData}
            columns={columns}
            pageSize={20}
            rowsPerPageOptions={[5]}
            disableSelectionOnClick
          />
        </div>

        <div className={styles.signature}>
          <div>
            Mengetahui, <br />
            Ketua Prodi TAV
            <br />
            <br />
            <br />
            <br />
            <br />
            Egi
          </div>
        </div>
      </div>
    </div>
  );
}

export default forwardRef(Preview);
