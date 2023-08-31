import {
  addDoc,
  collection,
  onSnapshot,
  deleteDoc,
  doc,
  updateDoc,
  getDoc,
  getDocs,
  where,
  query,
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

export const getBarangByRuangan = async (ruanganId) => {
  try {
    const barang = [];

    const querySnapshot = await getDocs(
      query(collection(db, "barang"), where("ruanganId", "==", ruanganId))
    );

    await Promise.all(
      querySnapshot.docs.map(async (docs) => {
        const data = docs.data();
        const ruangan = await getDoc(doc(db, "ruangan", data.ruanganId));
        const kondisi = await getDoc(doc(db, "kondisi", data.kondisiId));
        const barangDoc = await getDoc(doc(db, "nama-barang", data.barangId));
        barang.push({
          id: docs.id,
          ...data,
          ruangan: ruangan.data(),
          kondisi: kondisi.data(),
          barang: barangDoc.data(),
        });
      })
    );

    return barang;
  } catch (e) {
    console.error("Error getting document: ", e);
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

export const kembalikanBarang = async (peminjamanId) => {
  try {
    const peminjamanRef = doc(db, "peminjaman", peminjamanId);
    const peminjamanDoc = await getDoc(peminjamanRef);

    if (peminjamanDoc.exists()) {
      const peminjamanData = peminjamanDoc.data();
      const jumlah = peminjamanData.jumlah;
      const barang = peminjamanData.barangId;

      const barangRef = doc(db, "nama-barang", barang);
      const barangDoc = await getDoc(barangRef);

      if (barangDoc.exists()) {
        const barangData = barangDoc.data();
        const stok = barangData.stok || 0;
        const stokBaru = stok + parseInt(jumlah);

        await updateDoc(barangRef, {
          stok: stokBaru,
        });

        await updateDoc(peminjamanRef, {
          kembali: true,
        });
      } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
        throw new Error("No such document!");
      }
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

export const useDataPeminjaman = () => {
  const [dataPeminjaman, setDataPeminjaman] = useState([]);

  useEffect(() => {
    setDataPeminjaman([]);
    const unsubscribe = onSnapshot(
      collection(db, "peminjaman"),
      async (querySnapshot) => {
        querySnapshot.forEach(async (docs) => {
          const data = docs.data();
          const barang = await getDoc(doc(db, "nama-barang", data.barangId));
          const user = await getDoc(doc(db, "users", data.userId));
          const ruangan = await getDoc(doc(db, "ruangan", data.ruanganId));

          if (dataPeminjaman.find((item) => item.id === docs.id)) {
            if (data.kembali) {
              setDataPeminjaman((prev) => {
                return prev.filter((item) => item.id !== docs.id);
              });
            }
          }

          if (!data.kembali)
            setDataPeminjaman((prev) => {
              if (prev.find((item) => item.id === docs.id)) {
                return prev;
              } else {
                return [
                  ...prev,
                  {
                    id: docs.id,
                    barang: barang.data(),
                    ruangan: ruangan.data(),
                    user: user.data(),
                    ...data,
                  },
                ];
              }
            });
        });
      }
    );

    return unsubscribe;
  }, []);

  return dataPeminjaman;
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
          const peminjamanQuery = await query(
            collection(db, "peminjaman"),
            where("barangId", "==", data.barangId),
            where("ruanganId", "==", data.ruanganId)
          );

          const peminjaman = await getDocs(peminjamanQuery);
          const peminjamanData = [];

          peminjaman.forEach((doc) => {
            peminjamanData.push({ id: doc.id, ...doc.data() });
          });

          retunedData.push({
            id: docs.id,
            barang: { ...barang.data(), id: barang.id },
            kondisi: { ...kondisi.data(), id: kondisi.id },
            ruangan: { ...ruangan.data(), id: ruangan.id },
            user: { ...user.data(), id: user.id },
            peminjaman: peminjamanData,
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

export const deleteDataBarang = async (id) => {
  try {
    // get data barang
    const barangRef = doc(db, "barang", id);
    const barangDoc = await getDoc(barangRef);

    if (barangDoc.exists()) {
      const barangData = barangDoc.data();
      const jumlah = barangData.jumlah;
      const barang = barangData.barangId;

      const barangRef = doc(db, "nama-barang", barang);
      const stokBarang = await getDoc(barangRef);

      if (stokBarang.exists()) {
        const stokBarangData = stokBarang.data();
        const stok = stokBarangData.stok || 0;
        const stokBaru = stok + parseInt(jumlah);

        await updateDoc(barangRef, {
          stok: stokBaru,
        });
      } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
        throw new Error("No such document!");
      }
      await deleteDoc(doc(db, "barang", id));
    } else {
      // doc.data() will be undefined in this case
      console.log("No such document!");
      throw new Error("No such document!");
    }
  } catch (e) {
    console.error("Error removing document: ", e);
  }
};

export const updateDataBarang = async (id, data) => {
  try {
    const barangRef = doc(db, "barang", id);
    const barangDoc = await getDoc(barangRef);

    if (barangDoc.exists()) {
      const barangData = barangDoc.data();
      const jumlah = data.jumlah;
      const diff = jumlah - barangData.jumlah;
      const barang = barangData.barangId;

      const stokBarangRef = doc(db, "nama-barang", barang);
      const stokBarang = await getDoc(stokBarangRef);

      if (stokBarang.exists()) {
        const stokBarangData = stokBarang.data();
        const stok = stokBarangData.stok || 0;
        const stokBaru = stok + parseInt(diff);

        await updateDoc(stokBarangRef, {
          stok: stokBaru,
        });
      } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
        throw new Error("No such document!");
      }

      await updateDoc(barangRef, {
        ...data,
      });
    } else {
      // doc.data() will be undefined in this case
      console.log("No such document!");
      throw new Error("No such document!");
    }
  } catch (e) {
    console.error("Error removing document: ", e);
  }
};
