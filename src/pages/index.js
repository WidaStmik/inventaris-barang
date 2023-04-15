import React, { useEffect } from "react";
import Head from "next/head";
import { FaBox, FaTags, FaTasks, FaUsers } from "react-icons/fa";
import styles from "./index.module.css";
import { Card } from "@mui/material";
import Link from "next/link";
import {
  useNamaBarang,
  useDataBarang,
  useKondisi,
  useRuangan,
} from "@/services/barang";

export default function Dashboard() {
  const namaBarang = useNamaBarang();
  const dataBarang = useDataBarang();
  const kondisi = useKondisi();
  const ruangan = useRuangan();

  const data = [
    {
      label: "Barang",
      icon: FaBox,
      value: dataBarang.length,
      color: "lightblue",
      href: "/data-barang",
    },
    {
      label: "Nama Barang",
      icon: FaTags,
      value: namaBarang.length,
      color: "red",
      href: "/barang",
    },
    {
      label: "Kondisi",
      icon: FaTasks,
      value: kondisi.length,
      color: "green",
      href: "/barang",
    },
    {
      label: "Ruangan",
      icon: FaTasks,
      value: ruangan.length,
      color: "green",
      href: "/barang",
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
