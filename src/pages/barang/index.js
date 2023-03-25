import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import Head from "next/head";
import { Card } from "@mui/material";
import styles from "./index.module.css";
import NamaBarang from "@/components/barang/NamaBarang";
import BarangDialog from "@/components/barang/BarangDialog";
import Ruangan from "@/components/barang/Ruangan";
import RuanganDialog from "@/components/barang/RuanganDialog";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function Barang() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div>
      <Head>
        <title>Barang</title>
      </Head>
      <Box sx={{ width: "100%" }}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
          >
            <Tab label="Nama Barang" {...a11yProps(0)} />
            <Tab label="Ruangan" {...a11yProps(1)} />
            <Tab label="Kondisi" {...a11yProps(2)} />
          </Tabs>
        </Box>
        <TabPanel value={value} index={0}>
          <Card elevation={2} className={styles.card}>
            <div className={styles.header}>
              <div className={styles.cardHeading}>Daftar Nama Barang</div>
              <BarangDialog />
            </div>

            <NamaBarang />
          </Card>
        </TabPanel>
        <TabPanel value={value} index={1}>
          <Card elevation={2} className={styles.card}>
            <div className={styles.header}>
              <div className={styles.cardHeading}>Daftar Nama Barang</div>
              <RuanganDialog />
            </div>

            <Ruangan />
          </Card>
        </TabPanel>
        <TabPanel value={value} index={2}>
          Item Three
        </TabPanel>
      </Box>
    </div>
  );
}
