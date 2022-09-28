import React from "react";
import Navbar from "../../../../common/components/SideBar";
import { Button, Form, Input, InputNumber, Select } from "antd";
import style from "./style.module.css";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useRouteMatch } from "react-router-dom";
import { fetchUsersDetailAction, getLoaiNguoiDung, updateUserAction } from "../../action";
import { useEffect } from "react";
import { useFormik } from "formik";
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

function UpdateUser() {
  const dispatch = useDispatch();
  const history = useHistory();
  const match = useRouteMatch();
  const fetchUserDetail = () => {
    const taiKhoan = match.params.id;
    dispatch(fetchUsersDetailAction(taiKhoan));
  };
  const goToUsers = () => {
    history.push("/users");
  };
  const userData = useSelector((state) => {
    return state.user.selectedUser;
  });

  const handleChange = (e) => {
    console.log(e);
  };
  const onFinish = (values) => {
    const val = delete values.loaiNguoiDung;
    console.log(val);
    const val2 = delete val.thongTinDatVe;
    const data = {...val2,maNhom : userData.maNhom}
    dispatch(updateUserAction(data))
  };
  
  const userTypes = useSelector((state) => {
    return state.user.userTypes;
  });
  
  console.log(userData)
  useEffect(() => {
    fetchUserDetail();
  }, []);
  
  return (
    <div>
      <Navbar />
      
      {userData && (
        <Form
        {...layout}
        name="nest-messages"
        onFinish={onFinish}
        validateMessages={validateMessages}
        className={style.form}
        fields={[
          {
            name: "taiKhoan",
            value: userData.taiKhoan,
          },
          {
            name: ["matKhau"],
            value: userData.matKhau,
          },
          {
            name: ["hoTen"],
            value: userData.hoTen,
          },

          {
            name: ["email"],
            value: userData.email,
          },
          {
            name: ["soDT"],
            value: userData.soDT,
          },
          {
            name: ["maLoaiNguoiDung"],
            value: userData.maLoaiNguoiDung
          },
        ]}
      >
        <div className={style.title}>Update User</div>
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
            {userTypes && userTypes.map((item) => {
              return (
                <Option key={item.maLoaiNguoiDung} value={item.maLoaiNguoiDung}>
                  {item.tenLoai}
                </Option>
              );
            })}
          </Select>
        </Form.Item>
        <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
          <Button type="primary" htmlType="submit">
            Cập Nhật
          </Button>
        </Form.Item>
      </Form>
      )}
    </div>
  );
}

export default UpdateUser;
