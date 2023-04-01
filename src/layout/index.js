import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { AiOutlineMenuUnfold } from "react-icons/ai";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/services/firebase";
import toast from "react-hot-toast";
import Link from "next/link";
import { MdOutlineSpaceDashboard } from "react-icons/md";
import {
  FaBox,
  FaBoxes,
  FaCopy,
  FaPrint,
  FaTools,
  FaTruck,
  FaUsers,
  FaTruckLoading,
} from "react-icons/fa";
import { TbTruckReturn } from "react-icons/tb";
import { Tooltip, Avatar, Menu, MenuItem } from "@mui/material";
import Loading from "@/components/loading";
import { useDispatch } from "react-redux";
import { setUser, setAuth } from "@/redux/user";
import { getUser } from "@/services/auth";

const drawerWidth = 325;

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  })
);

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

export default function Layout({ children }) {
  const dispatch = useDispatch();
  const theme = useTheme();
  const [open, setOpen] = useState(false);

  const [user, loading, error] = useAuthState(auth);

  const [anchorEl, setAnchorEl] = useState(null);

  const router = useRouter();

  const WHITELIST = ["/login"];

  const handleLogout = async () => {
    try {
      await signOut(auth);
      toast.success("Berhasil logout");
      setLoggedOut(true);
      router.push("/login");
    } catch (error) {
      toast.error("Gagal logout");
      console.log(error);
    }
  };

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  if (loading) {
    return <Loading />;
  }

  if (!user && !WHITELIST.includes(router.pathname)) {
    router.push("/login");
  }

  if (!user && WHITELIST.includes(router.pathname)) {
    return <>{children}</>;
  }

  if (user && WHITELIST.includes(router.pathname)) {
    router.push("/");
  }

  const menuOpen = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  if (user && !WHITELIST.includes(router.pathname)) {
    dispatch(setAuth(user));
    getUser(user.uid).then((res) => {
      dispatch(setUser(res));
    });
    return (
      <Box
        sx={{
          display: "flex",
          backgroundColor: "#f5f5fb",
          minHeight: "100vh",
          overflow: "auto",
        }}
      >
        <CssBaseline />
        <AppBar position="fixed" open={open}>
          <Toolbar
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              sx={{ mr: 2, ...(open && { opacity: 0 }) }}
            >
              <AiOutlineMenuUnfold />
            </IconButton>
            <React.Fragment>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  textAlign: "center",
                }}
              >
                <Tooltip title="Account settings">
                  <IconButton
                    onClick={handleClick}
                    size="small"
                    sx={{ ml: 2 }}
                    aria-controls={menuOpen ? "account-menu" : undefined}
                    aria-haspopup="true"
                    aria-expanded={menuOpen ? "true" : undefined}
                  >
                    <Avatar sx={{ width: 32, height: 32 }}>M</Avatar>
                  </IconButton>
                </Tooltip>
              </Box>
              <Menu
                anchorEl={anchorEl}
                id="account-menu"
                open={menuOpen}
                onClose={handleClose}
                onClick={handleClose}
                PaperProps={{
                  elevation: 0,
                  sx: {
                    overflow: "visible",
                    filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                    mt: 1.5,
                    "& .MuiAvatar-root": {
                      width: 32,
                      height: 32,
                      ml: -0.5,
                      mr: 1,
                    },
                    "&:before": {
                      content: '""',
                      display: "block",
                      position: "absolute",
                      top: 0,
                      right: 14,
                      width: 10,
                      height: 10,
                      bgcolor: "background.paper",
                      transform: "translateY(-50%) rotate(45deg)",
                      zIndex: 0,
                    },
                  },
                }}
                transformOrigin={{ horizontal: "right", vertical: "top" }}
                anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
              >
                <MenuItem onClick={handleClose}>
                  <Avatar /> Profile
                </MenuItem>
                <Divider />
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
              </Menu>
            </React.Fragment>
          </Toolbar>
        </AppBar>
        <Drawer
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            "& .MuiDrawer-paper": {
              width: drawerWidth,
              boxSizing: "border-box",
              backgroundColor: "#2C3333",
              color: "whitesmoke",
            },
          }}
          variant="persistent"
          anchor="left"
          open={open}
        >
          <DrawerHeader
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: 2,
            }}
          >
            <div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: 10,
                }}
              >
                <Avatar sx={{ width: 48, height: 48 }} src="logo.jpg" />
                <div>
                  <div>Sistem Inventasi Barang</div>
                  <div style={{ fontSize: 12 }}>SMK Pasundan 2 Bandung</div>
                </div>
              </div>
            </div>
            <IconButton onClick={handleDrawerClose}>
              {theme.direction === "ltr" ? (
                <BsChevronLeft color="whitesmoke" />
              ) : (
                <BsChevronRight color="whitesmoke" />
              )}
            </IconButton>
          </DrawerHeader>
          <Divider sx={{ backgroundColor: "gray" }} />

          <section>
            <List>
              <Link href="/" style={{ color: "whitesmoke" }}>
                <ListItem disablePadding>
                  <ListItemButton>
                    <ListItemIcon>
                      <MdOutlineSpaceDashboard size={25} color="whitesmoke" />
                    </ListItemIcon>
                    <ListItemText
                      primary="Dashboard"
                      sx={{ marginLeft: "-20px" }}
                    />
                  </ListItemButton>
                </ListItem>
              </Link>
            </List>
          </section>

          <section>
            <div style={{ marginLeft: 20, marginBottom: 10 }}>Inventory</div>
            <Divider sx={{ backgroundColor: "gray" }} />
            <List>
              <Link
                href="/data-barang"
                style={{ color: "whitesmoke" }}
                id="nav-data-barang"
              >
                <ListItem disablePadding>
                  <ListItemButton>
                    <ListItemIcon>
                      <FaBoxes size={25} color="whitesmoke" />
                    </ListItemIcon>
                    <ListItemText
                      primary="Data Barang"
                      sx={{ marginLeft: "-20px" }}
                    />
                  </ListItemButton>
                </ListItem>
              </Link>

              <Link href="/alat-praktikum" style={{ color: "whitesmoke" }}>
                <ListItem disablePadding>
                  <ListItemButton>
                    <ListItemIcon>
                      <FaTools size={25} color="whitesmoke" />
                    </ListItemIcon>
                    <ListItemText
                      primary="Alat Praktikum"
                      sx={{ marginLeft: "-20px" }}
                    />
                  </ListItemButton>
                </ListItem>
              </Link>

              <Link href="/peminjaman" style={{ color: "whitesmoke" }}>
                <ListItem disablePadding>
                  <ListItemButton>
                    <ListItemIcon>
                      <FaCopy size={25} color="whitesmoke" />
                    </ListItemIcon>
                    <ListItemText
                      primary="Peminjaman"
                      sx={{ marginLeft: "-20px" }}
                    />
                  </ListItemButton>
                </ListItem>
              </Link>

              <Link href="/pengembalian" style={{ color: "whitesmoke" }}>
                <ListItem disablePadding>
                  <ListItemButton>
                    <ListItemIcon>
                      <TbTruckReturn size={25} color="whitesmoke" />
                    </ListItemIcon>
                    <ListItemText
                      primary="Pengembalian"
                      sx={{ marginLeft: "-20px" }}
                    />
                  </ListItemButton>
                </ListItem>
              </Link>

              <Link href="/transaksi-masuk" style={{ color: "whitesmoke" }}>
                <ListItem disablePadding>
                  <ListItemButton>
                    <ListItemIcon>
                      <FaTruck size={25} color="whitesmoke" />
                    </ListItemIcon>
                    <ListItemText
                      primary="Transaksi Barang Masuk"
                      sx={{ marginLeft: "-20px" }}
                    />
                  </ListItemButton>
                </ListItem>
              </Link>

              <Link href="/transaksi-keluar" style={{ color: "whitesmoke" }}>
                <ListItem disablePadding>
                  <ListItemButton>
                    <ListItemIcon>
                      <FaTruckLoading size={25} color="whitesmoke" />
                    </ListItemIcon>
                    <ListItemText
                      primary="Transaksi Barang Keluar"
                      sx={{ marginLeft: "-20px" }}
                    />
                  </ListItemButton>
                </ListItem>
              </Link>

              <Link href="/cetak-laporan" style={{ color: "whitesmoke" }}>
                <ListItem disablePadding>
                  <ListItemButton>
                    <ListItemIcon>
                      <FaPrint size={25} color="whitesmoke" />
                    </ListItemIcon>
                    <ListItemText
                      primary="Cetak Laporan Barang"
                      sx={{ marginLeft: "-20px" }}
                    />
                  </ListItemButton>
                </ListItem>
              </Link>
            </List>
          </section>

          <section>
            <div style={{ marginLeft: 20, marginBottom: 10 }}>Master</div>
            <Divider sx={{ backgroundColor: "gray" }} />
            <List>
              <Link href="/barang" style={{ color: "whitesmoke" }}>
                <ListItem disablePadding>
                  <ListItemButton>
                    <ListItemIcon>
                      <FaBox size={25} color="whitesmoke" />
                    </ListItemIcon>
                    <ListItemText
                      primary="Pengelolaan Barang"
                      sx={{ marginLeft: "-20px" }}
                    />
                  </ListItemButton>
                </ListItem>
              </Link>

              <Link href="/users" style={{ color: "whitesmoke" }}>
                <ListItem disablePadding>
                  <ListItemButton>
                    <ListItemIcon>
                      <FaUsers size={25} color="whitesmoke" />
                    </ListItemIcon>
                    <ListItemText
                      primary="Manajemen User"
                      sx={{ marginLeft: "-20px" }}
                    />
                  </ListItemButton>
                </ListItem>
              </Link>
            </List>
          </section>
        </Drawer>
        <Main open={open}>
          <DrawerHeader />
          {children}
        </Main>
      </Box>
    );
  }
}
