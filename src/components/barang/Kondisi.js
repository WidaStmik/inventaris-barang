import React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Button } from "@mui/material";
import { useKondisi, deleteKondisi } from "@/services/barang";
import toast from "react-hot-toast";

export default function Ruangan() {
  const data = useKondisi();

  const handleDelete = async (id) => {
    await toast.promise(deleteKondisi(id), {
      loading: "Menghapus kondisi",
      success: "Berhasil menghapus kondisi",
      error: "Gagal menghapus kondisi",
    });
  };

  const tableData = data.map((item) => ({
    id: item.id,
    kode: item.kodeKondisi,
    nama: item.namaKondisi,
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
    { field: "kode", headerName: "Kode Inventaris", width: 150 },
    { field: "nama", headerName: "Nama Kondisi", width: 150 },
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
