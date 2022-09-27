import { Input, Button } from "antd";
import { useFormik } from "formik";
import React, { useState } from "react";
import instance from "../../../../api/instance";
import style from "./style.module.css";
import * as yup from "yup";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

function LogIn() {
  const dispatch = useDispatch()
  const schema = yup.object({
    taiKhoan: yup.string().required("*Trường này bắt buộc nhập"),
    matKhau: yup.string().required("*Trường này bắt buộc nhập"),
  });
  const [isLoading, setIsLoading] = useState(false);
  const formik = useFormik({
    initialValues: {
      taiKhoan: "",
      matKhau: "",
    },
    onSubmit: (values) => {
      console.log(values);
      const loginUser = { ...values};
      signIn(values);
    },
    validationSchema: schema,
  });
  const signIn = async (user) => {
    try {
      setIsLoading(true);
      const res = await instance.request({
        url: "/api/QuanLyNguoiDung/DangNhap",
        method: "POST",
        data: user,
      });
      setIsLoading(false);
      localStorage.setItem("token", res.data.content.accessToken)
      const profile = {...res.data.content}
      delete profile.accessToken;
      console.log(res.data);
      dispatch({
        type:"auth/SET_PROFILE",
        payload:profile,
      })
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };
  const history= useHistory()
  const handleSubmit = () => {
    history.push("/films")
  }
  return (
    <div>
      <h2 className={style.title}>SIGN IN</h2>
      <form className={style.form} onSubmit={handleSubmit}>
        <Input
          name="taiKhoan"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className={style.input}
          type="text"
          placeholder="User Name"
        />
        {formik.touched.taiKhoan && formik.errors.taiKhoan && (
          <p className={style.error}>{formik.errors.taiKhoan}</p>
        )}
        <Input
          name="matKhau"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className={style.input}
          type="password"
          placeholder="Password"
        />
        {formik.touched.matKhau && formik.errors.matKhau && (
          <p className={style.error}>{formik.errors.matKhau}</p>
        )}
        <Button htmlType="submit" type="primary" loading={isLoading} >
          Sign In
        </Button>
      </form>
    </div>
  );
}

export default LogIn;
