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
