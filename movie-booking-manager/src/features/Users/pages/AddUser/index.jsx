import React from "react";
import Navbar from "../../../../common/components/SideBar";
import { Button, Form, Input, InputNumber, Select } from "antd";
import style from "./style.module.css";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { addNewUser, getLoaiNguoiDung } from "../../action";
import { useEffect } from "react";
const { Option } = Select;
const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};
/* eslint-disable no-template-curly-in-string */

const validateMessages = {
  required: "${label} is required!",
  types: {
    email: "",
    password: "",
  },
};
/* eslint-enable no-template-curly-in-string */

function AddUser() {
  const dispatch = useDispatch();
  const history = useHistory();
  const goToUsers = () => {
    history.push("/users")
  }
  const handleChange = (e) => {
    console.log(e);
  };
  const onFinish = (values) => {
    if (!values.maLoaiNguoiDung) {
      values.maLoaiNguoiDung = "KhachHang";
    } else {
      values.maLoaiNguoiDung = values.maLoaiNguoiDung.value;
    }
    if (!values.soDT) {
      values.soDT = "";
    }
    const data = { ...values, maNhom: "GP02" };
    dispatch(addNewUser(data));
    console.log( dispatch(addNewUser(data)))
  };
  const getUserTypes = () => {
    dispatch(getLoaiNguoiDung())
  }
  const userTypes = useSelector((state)=>{
    return state.user.userTypes;
  })
  console.log(userTypes)
  useEffect(()=>{
    getUserTypes()
  },[])
  return (
    <div>
      <Navbar />
      <div className={style.title}>Add user</div>
      <Form
        {...layout}
        name="nest-messages"
        onFinish={onFinish}
        validateMessages={validateMessages}
        className={style.container}
      >
        <Form.Item
          name={"taiKhoan"}
          label="Tài Khoản"
          rules={[
            {
              required: true,
              message: "Vui lòng nhập Tài khoản",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name={"matKhau"}
          label="Mật Khẩu"
          rules={[
            {
              required: true,
              message: "Vui lòng nhập Mật khẩu",
            },
          ]}
        >
          <Input type="password" />
        </Form.Item>
        <Form.Item
          name={"hoTen"}
          label="Họ Tên"
          rules={[
            {
              required: true,
              message: "Vui lòng nhập Họ tên",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name={"email"}
          label="Email"
          rules={[
            {
              required: true,
              type: "email",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name={"soDT"}
          label="Số điện thoại"
          rules={[
            {
              type: "string",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item name={"maLoaiNguoiDung"} label="Mã loại người dùng">
          <Select
            labelInValue
            defaultValue={{ value: "khachHang", label: "Khách hàng" }}
            onChange={handleChange}
          >
            {/* <Option value="khachHang">Khách Hàng</Option>
            <Option value="quanTri">Quản trị</Option> */}
            {userTypes.map((item)=>{
              return (
                <Option key={item.maLoaiNguoiDung} value={item.maLoaiNguoiDung}>{item.tenLoai}</Option>
              )
            })}
          </Select>
        </Form.Item>
        <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default AddUser;
