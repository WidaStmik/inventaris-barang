import React from "react";
import Head from "next/head";
import { FaBox, FaTags, FaTasks, FaUsers } from "react-icons/fa";
import styles from "./index.module.css";
import { Card } from "@mui/material";
import Link from "next/link";

const DUMMY_DATA = [
  {
    label: "Barang",
    icon: FaBox,
    value: 10,
    color: "lightblue",
    href: "/data-barang",
  },
  {
    label: "Nama Barang",
    icon: FaTags,
    value: 10,
    color: "red",
    href: "/barang",
  },
  {
    label: "Kondisi",
    icon: FaTasks,
    value: 10,
    color: "green",
    href: "/barang",
  },
  {
    label: "Users",
    icon: FaUsers,
    value: 10,
    color: "orange",
    href: "/users",
  },
];

export default function Dashboard() {
  return (
    <div>
      <Head>
        <title>Dashboard</title>
      </Head>

      <div>
        <div className="heading">Welcome to Administrator</div>

        <div className={styles.container}>
          {DUMMY_DATA.map((item, index) => (
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
