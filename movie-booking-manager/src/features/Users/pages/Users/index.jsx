import { Spin, Table } from "antd";
import React, { useState } from "react";
import Navbar from "../../../../common/components/SideBar";
import style from "../Users/style.module.css";
import { AudioOutlined } from "@ant-design/icons";
import { AiFillSetting, AiFillDelete, AiOutlineCalendar } from "react-icons/ai";
import { Input } from "antd";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Link, NavLink } from "react-router-dom";
import { deleteUserAction, fetchUsersAction, getLoaiNguoiDung } from "../../action";

function Users() {
  const { Search } = Input;
  const usersList = useSelector((state)=>{
    return state.user.userList;
  })
  const suffix = (
    <AudioOutlined
      style={{
        fontSize: 16,
        color: "#1890ff",
      }}
    />
  );
  const userTypes = useSelector((state)=>{
    return state.user.userTypes;
  })
  const getUserTypes = () => {
    dispatch(getLoaiNguoiDung())
  }
  const dispatch = useDispatch();
  const fetchUserDetailAction = async () => {
    dispatch(fetchUsersAction)
  }
  useEffect(()=>{
    fetchUserDetailAction();
    getUserTypes();
  },[])
  const [sortedInfo, setSortedInfo] = useState({});
  const handleChange = (sorter) => {
    setSortedInfo(sorter);
  };

  const deleteUser = (id) => {
    dispatch(deleteUserAction(id));
    fetchUserDetailAction();
  };
  const [page, setPage] = useState(1);
  const columns = [
    {
      title: "STT",
      dataIndex: "index",
      key: "index",
      render: (text, object, index) =>(  (page-1)*10 + index+1),
      sorter: (a, b) => {
        return a.maPhim - b.maPhim;
      },
    },
    {
      title: "Tài Khoản",
      dataIndex: "taiKhoan",
      key: "taiKhoan",
      // render: (text, record) => {
      //   return <img src={record.hinhAnh} style={{ width: 80, height: 80 }} />;
      // },
    },
    {
      title: "Mật khẩu",
      dataIndex: "matKhau",
      key: "tenPhim",
      width: "20%",
      sorter: (a, b) => {
        return a.tenPhim.localeCompare(b.tenPhim);
      },
    },
    {
      title: "Họ Tên",
      dataIndex: "hoTen",
      key: "hoTen",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Số điện thoại",
      dataIndex: "soDT",
      key: "soDT",
    },
    {
      title: "Hành Động",
      dataIndex: "hanhDong",
      key: "hanhDong",

      render: (_, record) => {
        return (
          <div style={{ textAlign: "center" }}>
            <Link
              to={"/users/update/"+record.taiKhoan}
              style={{ marginRight: 12 }}
            >
              <AiFillSetting style={{ fontSize: 30, color: "gray" }} />
            </Link>
            <Link
              to={"#"}
              style={{ marginRight: 12 }}
              onClick={() => deleteUser(record.taiKhoan)}
            >
              <AiFillDelete style={{ fontSize: 30, color: "red" }} />
            </Link>
            
          </div>
        );
      },
    },
  ];

  return (
    <div>
      <Navbar />
      <div className={style.container}>
        <div className={style.content}>
          <div className={style.header}>
            <h2>Quản lý người dùng</h2>
            <NavLink to={"/users/adduser"} className={style.add}>
              Thêm người dùng
            </NavLink>
            <Search placeholder="input search text" enterButton />
          </div>
          <div className={style.main}>
            <Table
              dataSource={usersList}
              columns={columns}
              pagination={{
                onChange(current) {
                  setPage(current);
                },
              }}
              loading={false}
            />
            ;
          </div>
        </div>
      </div>
    </div>
  );
}

export default Users;
