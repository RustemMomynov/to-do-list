import {
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  Grid,
  TextField,
  Paper,
} from "@mui/material"
import { useAppDispatch } from "common/hooks"
import { BaseResponse } from "common/types"
import { FormikHelpers, useFormik } from "formik"
import React from "react"
import { useSelector } from "react-redux"
import { Navigate } from "react-router-dom"
import { LoginParamsType } from "../../api/authApi"
import { authThunks, selectIsLoggedIn } from "../../model/authSlice"
import s from "./Login.module.css"
import { useLogin } from "features/auth/lib/useLogin"

export const Login = () => {
  const { formik, isLoggedIn } = useLogin()

  if (isLoggedIn) {
    return <Navigate to={"/"} />
  }

  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      margin="200px 0"
    >
      <Grid item xs={4}>
        <Paper style={{ padding: "30px", width: "223px" }}>
          <form onSubmit={formik.handleSubmit} style={{ width: "223px" }}>
            <FormControl>
              <FormGroup>
                <TextField
                  label="Email"
                  margin="normal"
                  {...formik.getFieldProps("email")}
                />

                {formik.touched.email && formik.errors.email && (
                  <p className={s.error}>{formik.errors.email}</p>
                )}

                <TextField
                  type="password"
                  label="Password"
                  margin="normal"
                  {...formik.getFieldProps("password")}
                />

                {formik.touched.password && formik.errors.password && (
                  <p className={s.error}>{formik.errors.password}</p>
                )}
                <FormControlLabel
                  label={"Remember me"}
                  control={
                    <Checkbox
                      {...formik.getFieldProps("rememberMe")}
                      checked={formik.values.rememberMe}
                    />
                  }
                />
                <Button
                  type={"submit"}
                  variant={"contained"}
                  disabled={!formik.isValid}
                  color={"primary"}
                >
                  Login
                </Button>
              </FormGroup>
            </FormControl>
          </form>
        </Paper>
      </Grid>
    </Grid>
  )
}
