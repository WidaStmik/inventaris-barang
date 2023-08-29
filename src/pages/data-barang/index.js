import React, { useEffect, useRef, useState } from "react";
import Head from "next/head";
import { DataGrid, GridToolbarQuickFilter } from "@mui/x-data-grid";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  FormControl,
  InputLabel,
  Select,
  TextField,
  MenuItem,
} from "@mui/material";
import {
  useDataBarang,
  deleteDataBarang,
  useNamaBarang,
  useKondisi,
  useRuangan,
  updateDataBarang,
} from "@/services/barang";
import toast from "react-hot-toast";
import { useRouter } from "next/router";

export default function DataBarang() {
  const data = useDataBarang();
  const router = useRouter();

  const [trigger, setTrigger] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [deleteItem, setDeleteItem] = useState(null);
  const [editItemId, setEditItemId] = useState(null);

  const [editData, setEditData] = useState({
    barang: "",
    ruangan: "",
    jumlah: "",
    kondisi: "",
  });

  const onEditDataChange = (e) => {
    setEditData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const namaBarang = useNamaBarang();
  const kondisi = useKondisi();
  const ruangan = useRuangan();

  const handleAdd = () => {
    router.push("/barang");
  };

  const handleDeleteDialogOpen = () => {
    setDeleteDialogOpen(true);
  };

  const handleDeleteDialogClose = () => {
    setDeleteDialogOpen(false);
  };

  const handleEditDialogOpen = () => {
    setEditDialogOpen(true);
  };

  const handleEditDialogClose = () => {
    setEditDialogOpen(false);
  };

  const handleDeleteBarang = async () => {
    toast.promise(deleteDataBarang(deleteItem.id), {
      loading: "Menghapus data barang",
      success: () => {
        setTrigger(!trigger);
        handleDeleteDialogClose();
        return "Data barang berhasil dihapus";
      },
      error: (err) => {
        return err.message;
      },
    });
  };

  const handleEditBarang = async () => {
    const data = {
      barangId: editData.barang,
      ruanganId: editData.ruangan,
      jumlah: editData.jumlah,
      kondisiId: editData.kondisi,
    };

    toast.promise(updateDataBarang(editItemId, data), {
      loading: "Mengubah data barang",
      success: () => {
        setTrigger(!trigger);
        handleEditDialogClose();
        return "Data barang berhasil diubah";
      },
      error: (err) => {
        return err.message;
      },
    });
  };

  const tableData = data.map((item) => ({
    id: item.id,
    nama: item.barang?.namaBarang,
    kondisi: item.kondisi.namaKondisi,
    ruangan: item.ruangan.namaRuangan,
    jumlah: item.jumlah,
    tanggal_masuk:
      item.tanggal_masuk?.toDate().toLocaleDateString("id-ID") || "-",
    tanggal_keluar:
      item.tanggal_keluar?.toDate().toLocaleDateString("id-ID") || "-",
    user: item.user.displayName || item.user.id,
    pinjamanState:
      item.peminjaman.length === 0
        ? "-"
        : item.peminjaman.every((p) => p.kembali)
        ? "Sudah dikembalikan"
        : item.peminjaman.some((p) => p.kembali)
        ? "Sebagian dikembalikan"
        : "Belum dikembalikan",
    tindakan: {
      edit: {
        key: "edit",
        label: "Edit",
        fn: () => {
          handleEditDialogOpen();
          setEditData({
            barang: item.barang.id,
            ruangan: item.ruangan.id,
            jumlah: item.jumlah,
            kondisi: item.kondisi.id,
          });
          setEditItemId(item.id);
        },
      },
      delete: {
        key: "delete",
        label: "Hapus",
        fn: () => {
          handleDeleteDialogOpen();
          setDeleteItem(item);
        },
      },
    },
  }));

  useEffect(() => {
    if (tableData.length === 0)
      document.getElementById("nav-data-barang").click();
  }, [tableData]);

  const columns = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "nama", headerName: "Nama Barang", width: 200 },
    { field: "kondisi", headerName: "Kondisi", width: 200 },
    { field: "ruangan", headerName: "Ruangan", width: 200 },
    { field: "jumlah", headerName: "Jumlah", width: 100 },
    { field: "tanggal_masuk", headerName: "Tanggal Masuk", width: 200 },
    {
      field: "tanggal_keluar",
      headerName: "Tanggal Keluar",
      width: 200,
    },
    { field: "user", headerName: "User", width: 200 },
    {
      field: "pinjamanState",
      headerName: "Status Peminjaman",
      width: 200,
    },
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
              color="primary"
              variant="contained"
              onClick={params.value.edit.fn}
            >
              {params.value.edit.label}
            </Button>
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
    <div>
      <Dialog
        open={deleteDialogOpen}
        onClose={handleDeleteDialogClose}
        aria-labelledby="delete-dialog-title"
        aria-describedby="delete-dialog-description"
      >
        <DialogTitle id="delete-dialog-title">Hapus Data Barang?</DialogTitle>
        <DialogContent>
          <DialogContentText id="delete-dialog-description">
            <strong>Kode Barang</strong> {deleteItem?.barang?.kodeBarang} <br />
            <strong>Barang: </strong> {deleteItem?.barang?.namaBarang}
            <br />
            <strong>Ruangan: </strong> {deleteItem?.ruangan?.namaRuangan}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteDialogClose}>Batal</Button>
          <Button
            onClick={handleDeleteBarang}
            autoFocus
            variant="contained"
            color="error"
          >
            Hapus
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={editDialogOpen}
        onClose={handleEditDialogClose}
        aria-labelledby="edit-dialog-title"
        aria-describedby="edit-dialog-description"
      >
        <DialogTitle id="edit-dialog-title">Form Edit Data Barang</DialogTitle>
        <DialogContent style={{ paddingTop: 10 }}>
          <form
            style={{
              display: "grid",
              gap: 20,
              width: 500,
            }}
          >
            <FormControl fullWidth>
              <InputLabel id="barang-label">Barang</InputLabel>
              <div
                style={{
                  display: "flex",
                  gap: 10,
                }}
              >
                <Select
                  labelId="barang-label"
                  id="barang"
                  label="Barang"
                  fullWidth
                  variant="outlined"
                  name="barang"
                  value={editData.barang}
                  onChange={onEditDataChange}
                >
                  {namaBarang.map((barang) => (
                    <MenuItem value={barang.id} key={barang.id}>
                      {barang.namaBarang}
                    </MenuItem>
                  ))}
                </Select>
                <Button onClick={handleAdd} variant="contained" color="primary">
                  +
                </Button>
              </div>
            </FormControl>

            <FormControl fullWidth>
              <InputLabel id="ruangan-label">Ruangan</InputLabel>
              <div
                style={{
                  display: "flex",
                  gap: 10,
                }}
              >
                <Select
                  labelId="ruangan-label"
                  id="ruangan"
                  label="ruangan"
                  fullWidth
                  variant="outlined"
                  name="ruangan"
                  value={editData.ruangan}
                  onChange={onEditDataChange}
                >
                  {ruangan.map((ruangan) => (
                    <MenuItem value={ruangan.id} key={ruangan.id}>
                      {ruangan.namaRuangan}
                    </MenuItem>
                  ))}
                </Select>
                <Button onClick={handleAdd} variant="contained" color="primary">
                  +
                </Button>
              </div>
            </FormControl>

            <FormControl fullWidth>
              <TextField
                id="jumlah"
                label="Jumlah"
                variant="outlined"
                fullWidth
                type="number"
                name="jumlah"
                value={editData.jumlah}
                onChange={onEditDataChange}
              />
            </FormControl>

            <FormControl fullWidth>
              <InputLabel id="kondisi-label">Kondisi</InputLabel>
              <div
                style={{
                  display: "flex",
                  gap: 10,
                }}
              >
                <Select
                  labelId="kondisi-label"
                  id="kondisi"
                  label="kondisi"
                  fullWidth
                  variant="outlined"
                  name="kondisi"
                  value={editData.kondisi}
                  onChange={onEditDataChange}
                >
                  {kondisi.map((k) => (
                    <MenuItem value={k.id} key={k.id}>
                      {k.namaKondisi}
                    </MenuItem>
                  ))}
                </Select>
              </div>
            </FormControl>
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleEditDialogClose}>Batal</Button>
          <Button
            variant="contained"
            color="primary"
            onClick={handleEditBarang}
          >
            Simpan
          </Button>
        </DialogActions>
      </Dialog>
      <Head>
        <title>Data Barang</title>
      </Head>
      <div>
        <div
          className="heading"
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: 10,
          }}
        >
          <span>Data Inventaris Barang</span>
          <Button
            variant="contained"
            color="primary"
            style={{ marginRight: "200px" }}
            onClick={() => router.push("/barang")}
          >
            Tambah Data
          </Button>
        </div>
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
