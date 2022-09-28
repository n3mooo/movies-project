import { Input, Button } from "antd";
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import style from "./style.module.css";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { signIn } from "../../action";

function LogIn() {
  const dispatch = useDispatch();
  const history = useHistory();
  const logInData = useSelector((state) => {
    return state.auth.profile;
  });
  const schema = yup.object({
    taiKhoan: yup.string().required("*Trường này bắt buộc nhập"),
    matKhau: yup.string().required("*Trường này bắt buộc nhập"),
  });

  const formik = useFormik({
    initialValues: {
      taiKhoan: "",
      matKhau: "",
    },
    onSubmit: (values) => {
      signInAction(values);
      
    },
    validationSchema: schema,
  });
  const signInAction = async (user) => {
    dispatch(signIn(user));
  };
  useEffect(()=>{
    if (logInData) {
      history.push("/films");
    }
  },[logInData])
  
  return (
    <div className={style.container}>
      <h1>Login</h1>
      <form onSubmit={formik.handleSubmit}>
        <div className={style.content}>
          <input
            type={"text"}
            name={"taiKhoan"}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          ></input>
          <label>Tài Khoản</label>

          {formik.touched.taiKhoan && formik.errors.taiKhoan && (
            <span className={style.error}>{formik.errors.taiKhoan}</span>
          )}
        </div>
        <div className={style.content}>
          <input
            type={"password"}
            name={"matKhau"}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          ></input>
          <label>Mật khẩu</label>

          {formik.touched.matKhau && formik.errors.matKhau && (
            <span className={style.error}>{formik.errors.matKhau}</span>
          )}
        </div>
        <button className={style.btn} type="submit">
          Login
        </button>
      </form>
    </div>
  );
}

export default LogIn;
