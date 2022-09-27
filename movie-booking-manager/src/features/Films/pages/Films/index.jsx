import { Spin, Table } from "antd";
import React, { useState } from "react";
import Navbar from "../../../../common/components/SideBar";
import style from "../Films/style.module.css";
import { AudioOutlined } from "@ant-design/icons";
import { AiFillSetting, AiFillDelete, AiOutlineCalendar } from "react-icons/ai";
import { Input } from "antd";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMovieAction } from "../../action";
import { Link } from "react-router-dom";
import instance from "../../../../api/instance";
import axios from "axios";

function Films() {
  const { Search } = Input;
  const suffix = (
    <AudioOutlined
      style={{
        fontSize: 16,
        color: "#1890ff",
      }}
    />
  );

  const dispatch = useDispatch();

  const fetchMovie = async () => {
    dispatch(fetchMovieAction);
  };
  const resetSelected = () => {
    dispatch({
      type: "films/RESET_SELECTED",
    });
  };
  useEffect(() => {
    fetchMovie();
    resetSelected();
  }, []);
  const movieList = useSelector((state) => {
    return state.movieList.movies;
  });
  const [sortedInfo, setSortedInfo] = useState({});
  const handleChange = (sorter) => {
    setSortedInfo(sorter);
  };

  const [isLoading, setLoading] = useState(false);
  if (!movieList) {
    return (
      <div>
        <Spin />
      </div>
    );
  }
  const deleteFilm = async (id) => {
    
    if (window.confirm("Hãy suy nghĩ kĩ lại!!!")) {
      try {
        const res = await axios({
          url: "https://movienew.cybersoft.edu.vn/api/QuanLyPhim/XoaPhim",
          method:"DELETE",
          params: {
            MaPhim: id,
          },
          headers: {
            TokenCybersoft:
              "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJGcm9udCBFbmQgNzIiLCJIZXRIYW5TdHJpbmciOiIxNC8wMi8yMDIzIiwiSGV0SGFuVGltZSI6IjE2NzYzMzI4MDAwMDAiLCJuYmYiOjE2NTAzODc2MDAsImV4cCI6MTY3NjQ4MDQwMH0.e3UrKdKqwFislz0cqribEEthuaW4HOuD4xwr1CTRQwg",
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoiYWJjMTIzIiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvZW1haWxhZGRyZXNzIjoia2hhbmg2NjZAZ21haWwuY29tIiwiaHR0cDovL3NjaGVtYXMubWljcm9zb2Z0LmNvbS93cy8yMDA4LzA2L2lkZW50aXR5L2NsYWltcy9yb2xlIjpbIlF1YW5UcmkiLCJraGFuaDY2NkBnbWFpbC5jb20iLCJHUDAxIl0sIm5iZiI6MTY2NDA5MzU1NCwiZXhwIjoxNjY0MDk3MTU0fQ.QpWBnFcK9d0YGqMzRzz7bP62QZWKu0lOIhEVLyx4_S8",
          },
        });
        alert("Xóa phim thành công!");
        fetchMovie()
      } catch (err) {}
    } else {
      alert("Dừng lại là thất bại")
    }
  };

  const columns = [
    {
      title: "Mã Phim",
      dataIndex: "maPhim",
      key: "maPhim",
      sorter: (a, b) => {
        return a.maPhim - b.maPhim;
      },
    },
    {
      title: "Hình Ảnh",
      dataIndex: "hinhAnh",
      key: "hinhAnh",
      render: (text, record) => {
        return <img src={record.hinhAnh} style={{ width: 80, height: 80 }} />;
      },
    },
    {
      title: "Tên Phim",
      dataIndex: "tenPhim",
      key: "tenPhim",
      width: "20%",
      sorter: (a, b) => {
        return a.tenPhim.localeCompare(b.tenPhim);
      },
    },
    {
      title: "Mô tả",
      dataIndex: "moTa",
      key: "moTa",
      width: "40%",
    },
    {
      title: "Hành Động",
      dataIndex: "hanhDong",
      key: "hanhDong",

      render: (_, record) => {
        return (
          <div style={{ textAlign: "center" }}>
            <Link
              to={"/films/edit/" + record.maPhim}
              style={{ marginRight: 12 }}
            >
              <AiFillSetting style={{ fontSize: 30, color: "gray" }} />
            </Link>
            <Link
              to={"#"}
              style={{ marginRight: 12 }}
              onClick={() => deleteFilm(record.maPhim)}
            >
              <AiFillDelete style={{ fontSize: 30, color: "red" }} />
            </Link>
            <Link to={"/showtime/"+record.maPhim}>
              <AiOutlineCalendar style={{ fontSize: 30, color: "green" }} />
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
            <h2>Quản lý phim</h2>
            <Link to={"/films/addnew"} className={style.add}>
              Thêm Phim
            </Link>
            <Search placeholder="input search text" enterButton />
          </div>
          <div className={style.main}>
            <Table
              dataSource={movieList}
              columns={columns}
              onChange={handleChange}
              loading={isLoading}
            />
            ;
          </div>
        </div>
      </div>
    </div>
  );
}

export default Films;
