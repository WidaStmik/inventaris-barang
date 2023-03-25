import React, { useEffect, useState } from "react";
import Head from "next/head";
import { DataGrid, GridToolbarQuickFilter } from "@mui/x-data-grid";
import { Button } from "@mui/material";
import { useDataBarang } from "@/services/barang";

export default function DataBarang() {
  const data = useDataBarang();
  const [trigger, setTrigger] = useState(false);

  const tableData = data.map((item) => ({
    id: item.id,
    nama: item.barang.namaBarang,
    kondisi: item.kondisi.namaKondisi,
    ruangan: item.ruangan.namaRuangan,
    tanggal_masuk: item.tanggal_masuk?.toDate().toLocaleDateString("id-ID"),
    user: item.user.displayName || item.user.id,
    tindakan: {
      detail: {
        key: "detail",
        label: "Detail",
        fn: () => {
          alert("Detail");
        },
      },
      edit: {
        key: "edit",
        label: "Edit",
        fn: () => {
          alert("Edit");
        },
      },
      delete: {
        key: "delete",
        label: "Hapus",
        fn: () => {
          alert("Delete");
        },
      },
    },
  }));

  useEffect(() => {
    document.getElementById("nav-data-barang").click();
  }, [tableData]);

  const columns = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "nama", headerName: "Nama Barang", width: 200 },
    { field: "kondisi", headerName: "Kondisi", width: 200 },
    { field: "ruangan", headerName: "Ruangan", width: 200 },
    { field: "tanggal_masuk", headerName: "Tanggal Masuk", width: 200 },
    { field: "user", headerName: "User", width: 200 },
    {
      field: "tindakan",
      headerName: "Tindakan",
      width: 300,
      renderCell: (params) => {
        return (
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              gap: 10,
            }}
          >
            <Button
              variant="contained"
              color="primary"
              onClick={params.value.detail.fn}
            >
              {params.value.detail.label}
            </Button>
            <Button
              color="warning"
              variant="contained"
              onClick={params.value.edit.fn}
            >
              {params.value.edit.label}
            </Button>
            <Button
              color="error"
              variant="contained"
              onClick={params.value.delete.fn}
            >
              {params.value.delete.label}
            </Button>
          </div>
        );
      },
    },
  ];
  return (
    <div>
      <Head>
        <title>Data Barang</title>
      </Head>
      <div>
        <div className="heading">Data Barang</div>

        <div style={{ height: 600, width: "100%" }}>
          <DataGrid
            rows={tableData}
            columns={columns}
            pageSize={5}
            components={{ Toolbar: GridToolbarQuickFilter }}
          />
        </div>
      </div>
    </div>
  );
}
