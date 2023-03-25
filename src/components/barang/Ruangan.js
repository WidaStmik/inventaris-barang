import React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Button } from "@mui/material";
import { useRuangan, deleteRuang } from "@/services/barang";
import toast from "react-hot-toast";

export default function Ruangan() {
  const data = useRuangan();

  const handleDelete = async (id) => {
    await toast.promise(deleteRuang(id), {
      loading: "Menghapus ruangan",
      success: "Berhasil menghapus ruangan",
      error: "Gagal menghapus ruangan",
    });
  };

  const tableData = data.map((item) => ({
    id: item.id,
    kode: item.kodeRuangan,
    nama: item.namaRuangan,
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
