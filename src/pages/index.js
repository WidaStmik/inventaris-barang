import React, { useEffect } from "react";
import Head from "next/head";
import { FaBoxes, FaCopy, FaPrint, FaTools, FaTruck, FaUsers, FaTruckLoading,} from "react-icons/fa";
import { TbTruckReturn } from "react-icons/tb";
import styles from "./index.module.css";
import { Card } from "@mui/material";
import Link from "next/link";
import {
  useDataPeminjaman,
  useDataBarang,
} from "@/services/barang";

export default function Dashboard() {
  const peminjaman = useDataPeminjaman();
  const dataBarang = useDataBarang();
  const pengembalian = useDataPeminjaman();
  const TransaksiMasuk = useDataBarang();
  const TransaksiKeluar = useDataBarang();

  const data = [
    {
      label: "Barang",
      icon: FaBoxes,
      value: dataBarang.length,
      color: "lightblue",
      href: "/data-barang",
    },
    {
      label: "Peminjaman",
      icon: FaCopy,
      value: peminjaman.length,
      color: "red",
      href: "/peminjaman",
    },
    {
      label: "Pengembalian",
      icon: TbTruckReturn,
      value: pengembalian.length,
      color: "green",
      href: "/pengembalian",
    },
    {
      label: "Transaksi Masuk",
      icon: FaTruck,
      value: TransaksiMasuk.length,
      color: "purple",
      href: "/transaksi-masuk",
    },
    {
      label: "Transaksi Keluar",
      icon: FaTruckLoading,
      value: TransaksiKeluar.length,
      color: "grey",
      href: "/transaksi-keluar",
    },
  ];

  useEffect(() => {
    if (dataBarang.length === 0)
      document.getElementById("nav-dashboard").click();
  });

  return (
    <div>
      <Head>
        <title>Dashboard</title>
      </Head>

      <div>
        <div className="heading">Welcome to Administrator</div>

        <div className={styles.container}>
          {data.map((item, index) => (
            <Link href={item.href} key={index} style={{ width: "100%" }}>
              <Card variant="outlined" className={styles.card}>
                <div
                  className={styles.icon}
                  style={{ backgroundColor: item.color }}
                >
                  <item.icon size={20} color="white" />
                </div>
                <div className={styles.value_container}>
                  <div className="label">{item.label}</div>
                  <div className={styles.value}>{item.value}</div>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
