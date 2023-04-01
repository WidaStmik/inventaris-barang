import {
  addDoc,
  collection,
  onSnapshot,
  deleteDoc,
  doc,
  updateDoc,
  getDoc,
} from "firebase/firestore";
import { db } from "../firebase";
import { useState, useEffect } from "react";
import { toast } from "react-hot-toast";

export const addBarang = async (barang) => {
  try {
    const docRef = await addDoc(collection(db, "nama-barang"), barang);

    return docRef.id;
  } catch (e) {
    console.error("Error adding document: ", e);
    throw e;
  }
};

export const deleteBarang = async (id) => {
  try {
    await deleteDoc(doc(db, "nama-barang", id));
  } catch (e) {
    console.error("Error removing document: ", e);
    throw e;
  }
};

export const addRuang = async (ruang) => {
  try {
    const docRef = await addDoc(collection(db, "ruangan"), ruang);

    return docRef.id;
  } catch (e) {
    console.error("Error adding document: ", e);
    throw e;
  }
};

export const deleteRuang = async (id) => {
  try {
    await deleteDoc(doc(db, "ruangan", id));
  } catch (e) {
    console.error("Error removing document: ", e);
    throw e;
  }
};

export const addKondisi = async (kondisi) => {
  try {
    const docRef = await addDoc(collection(db, "kondisi"), kondisi);

    return docRef.id;
  } catch (e) {
    console.error("Error adding document: ", e);
    throw e;
  }
};

export const deleteKondisi = async (id) => {
  try {
    await deleteDoc(doc(db, "kondisi", id));
  } catch (e) {
    console.error("Error removing document: ", e);
    throw e;
  }
};

export const useNamaBarang = () => {
  const [namaBarang, setNamaBarang] = useState([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, "nama-barang"),
      (querySnapshot) => {
        const data = [];

        querySnapshot.forEach((doc) => {
          data.push({ id: doc.id, ...doc.data() });
        });

        setNamaBarang(data);
      }
    );

    return unsubscribe;
  }, []);

  return namaBarang;
};

export const useRuangan = () => {
  const [ruangan, setRuangan] = useState([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, "ruangan"),
      (querySnapshot) => {
        const data = [];

        querySnapshot.forEach((doc) => {
          data.push({ id: doc.id, ...doc.data() });
        });

        setRuangan(data);
      }
    );

    return unsubscribe;
  }, []);

  return ruangan;
};

export const useKondisi = () => {
  const [kondisi, setKondisi] = useState([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, "kondisi"),
      (querySnapshot) => {
        const data = [];

        querySnapshot.forEach((doc) => {
          data.push({ id: doc.id, ...doc.data() });
        });

        setKondisi(data);
      }
    );

    return unsubscribe;
  }, []);

  return kondisi;
};

export const transaksiMasuk = async (transaksi) => {
  try {
    const docRef = await addDoc(collection(db, "barang"), transaksi);

    const jumlah = transaksi.jumlah;
    const barang = transaksi.barangId;

    const barangRef = doc(db, "nama-barang", barang);
    const barangDoc = await getDoc(barangRef);

    if (barangDoc.exists()) {
      const barangData = barangDoc.data();
      const stok = barangData.stok || 0;
      const stokBaru = stok + parseInt(jumlah);

      await updateDoc(barangRef, {
        stok: stokBaru,
      });
    } else {
      // doc.data() will be undefined in this case
      console.log("No such document!");
      throw new Error("No such document!");
    }

    return docRef.id;
  } catch (e) {
    console.error("Error adding document: ", e);
    throw e;
  }
};

export const transaksiKeluar = async (transaksi) => {
  try {
    const jumlah = transaksi.jumlah;
    const barang = transaksi.barangId;

    const barangRef = doc(db, "nama-barang", barang);
    const barangDoc = await getDoc(barangRef);

    if (barangDoc.exists()) {
      const barangData = barangDoc.data();
      const stok = barangData.stok || 0;
      const stokBaru = stok - parseInt(jumlah);

      if (stokBaru < 0) {
        throw "Stok tidak cukup";
      }

      await updateDoc(barangRef, {
        stok: stokBaru,
      });

      await addDoc(collection(db, "barang"), {
        ...transaksi,
        jumlah: -transaksi.jumlah,
      });
    } else {
      // doc.data() will be undefined in this case
      console.log("No such document!");
      throw new Error("No such document!");
    }
  } catch (e) {
    console.error("Error adding document: ", e);
    throw e;
  }
};

export const pinjamBarang = async (transaksi) => {
  try {
    const jumlah = transaksi.jumlah;
    const barang = transaksi.barangId;

    const barangRef = doc(db, "nama-barang", barang);
    const barangDoc = await getDoc(barangRef);

    if (barangDoc.exists()) {
      const barangData = barangDoc.data();
      const stok = barangData.stok || 0;
      const stokBaru = stok - parseInt(jumlah);

      if (stokBaru < 0) {
        throw "Stok tidak cukup";
      }

      await updateDoc(barangRef, {
        stok: stokBaru,
      });

      await addDoc(collection(db, "peminjaman"), {
        ...transaksi,
        jumlah: -transaksi.jumlah,
      });
    } else {
      // doc.data() will be undefined in this case
      console.log("No such document!");
      throw new Error("No such document!");
    }
  } catch (e) {
    console.error("Error adding document: ", e);
    throw e;
  }
};

export const kembalikanBarang = async (transaksi) => {
  try {
    const docRef = await addDoc(collection(db, "peminjaman"), transaksi);

    const jumlah = transaksi.jumlah;
    const barang = transaksi.barangId;

    const barangRef = doc(db, "nama-barang", barang);
    const barangDoc = await getDoc(barangRef);

    if (barangDoc.exists()) {
      const barangData = barangDoc.data();
      const stok = barangData.stok || 0;
      const stokBaru = stok + parseInt(jumlah);

      await updateDoc(barangRef, {
        stok: stokBaru,
      });
    } else {
      // doc.data() will be undefined in this case
      console.log("No such document!");
      throw new Error("No such document!");
    }

    return docRef.id;
  } catch (e) {
    console.error("Error adding document: ", e);
    throw e;
  }
};

export const useDataBarang = () => {
  const [dataBarang, setDataBarang] = useState([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, "barang"),
      (querySnapshot) => {
        const retunedData = [];

        querySnapshot.forEach(async (docs) => {
          const data = docs.data();
          const barang = await getDoc(doc(db, "nama-barang", data.barangId));
          const kondisi = await getDoc(doc(db, "kondisi", data.kondisiId));
          const ruangan = await getDoc(doc(db, "ruangan", data.ruanganId));
          const user = await getDoc(doc(db, "users", data.userId));
          retunedData.push({
            id: docs.id,
            barang: barang.data(),
            kondisi: kondisi.data(),
            ruangan: ruangan.data(),
            user: { ...user.data(), id: user.id },
            ...data,
          });
        });

        setDataBarang(retunedData);
      }
    );

    return unsubscribe;
  }, []);

  return dataBarang;
};
