import React from "react";
import Head from "next/head";
import { DataGrid, GridToolbarQuickFilter } from "@mui/x-data-grid";
import { Button } from "@mui/material";

const DUMMY_DATA = Array.from({ length: 100 }, (_, index) => ({
  id: index + 1,
  nama: `Nama Barang ${index + 1}`,
  kondisi: `Kondisi Barang ${index + 1}`,
  ruangan: `Ruangan ${index + 1}`,
  tanggal_masuk: new Date(
    Math.floor(Math.random() * 1000000000000)
  ).toLocaleDateString(),
  user: `User ${index + 1}`,
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

export default function DataBarang() {
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
            rows={DUMMY_DATA}
            columns={columns}
            pageSize={5}
            components={{ Toolbar: GridToolbarQuickFilter }}
          />
        </div>
      </div>
    </div>
  );
}
