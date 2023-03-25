import React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Button } from "@mui/material";
import { useNamaBarang, deleteBarang } from "@/services/barang";
import toast from "react-hot-toast";

export default function NamaBarang() {
  const data = useNamaBarang();

  const handleDelete = async (id) => {
    await toast.promise(deleteBarang(id), {
      loading: "Menghapus barang",
      success: "Berhasil menghapus barang",
      error: "Gagal menghapus barang",
    });
  };

  const tableData = data.map((item) => ({
    id: item.id,
    kode: item.kodeBarang,
    nama: item.namaBarang,
    stok: item.stok ? item.stok : 0,
    actions: {
      delete: {
        label: "Delete",
        fn: () => {
          handleDelete(item.id);
        },
      },
    },
  }));

  const columns = [
    { field: "kode", headerName: "Kode", width: 150 },
    { field: "nama", headerName: "Nama", width: 150 },
    { field: "stok", headerName: "Stok", width: 150 },
    {
      field: "actions",
      headerName: "Actions",
      width: 200,
      renderCell: (params) => {
        return (
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              gap: "10px",
            }}
          >
            <Button
              variant="contained"
              color="error"
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
    <div style={{ height: 600, width: "100%" }}>
      <DataGrid
        rows={tableData}
        columns={columns}
        pageSize={5}
        checkboxSelection
      />
    </div>
  );
}
