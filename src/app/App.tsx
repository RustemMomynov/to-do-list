import React, { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import {
  AppBar,
  Button,
  CircularProgress,
  Container,
  IconButton,
  LinearProgress,
  Toolbar,
  ThemeProvider,
  createTheme,
  Switch,
} from "@mui/material"
import { LogoDev, Menu } from "@mui/icons-material"
import { useAppDispatch } from "common/hooks"
import "./App.css"
import { ErrorSnackbar } from "common/components"
import { authThunks, selectIsLoggedIn } from "../features/auth/model/authSlice"
import { Login } from "../features/auth/ui/login/Login"
import { TodolistsList } from "../features/todolistsList/ui/TodolistsList"
import { selectIsInitialized, selectStatus } from "./appSlice"

type ThemeMode = "dark" | "light"

function App() {
  const theme = createTheme({
    palette: {
      mode: "dark",
      primary: {
        main: "#087EA4",
      },
    },
  })

  const status = useSelector(selectStatus)
  const isInitialized = useSelector(selectIsInitialized)
  const isLoggedIn = useSelector(selectIsLoggedIn)

  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(authThunks.initializeApp())
  }, [])

  const logoutHandler = () => {
    dispatch(authThunks.logout())
  }

  if (!isInitialized) {
    return (
      <div
        style={{
          position: "fixed",
          top: "30%",
          textAlign: "center",
          width: "100%",
        }}
      >
        <CircularProgress />
      </div>
    )
  }

  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <div className="App">
          <ErrorSnackbar />
          <AppBar position="static">
            <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
              <div
                className="logo"
                style={{ fontSize: "20px", margin: "12px" }}
              >
                To-Do List
              </div>
              {isLoggedIn && (
                <>
                  <Button
                    color="inherit"
                    onClick={logoutHandler}
                    sx={{ fontSize: "20px" }}
                  >
                    Log out
                  </Button>
                </>
              )}
            </Toolbar>
            {status === "loading" && <LinearProgress />}
          </AppBar>
          <Container fixed>
            <Routes>
              <Route path="/" element={<TodolistsList />} />
              <Route path="/login" element={<Login />} />
            </Routes>
          </Container>
        </div>
      </BrowserRouter>
    </ThemeProvider>
  )
}

export default App
