import React from "react";
import { ThreeDots } from "react-loader-spinner";
import styles from "./index.module.css";

export default function Loading() {
  return (
    <div className={styles.loading}>
      <ThreeDots width={100} height={100} color="#00BFFF" />
    </div>
  );
}
