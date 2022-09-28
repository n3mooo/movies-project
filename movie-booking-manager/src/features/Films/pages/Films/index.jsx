import { Spin, Table } from "antd";
import React, { useState } from "react";
import Navbar from "../../../../common/components/SideBar";
import style from "../Films/style.module.css";
import { AudioOutlined } from "@ant-design/icons";
import { AiFillSetting, AiFillDelete, AiOutlineCalendar } from "react-icons/ai";
import { Input } from "antd";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteFilm, fetchMovieAction } from "../../action";
import { Link } from "react-router-dom";


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
  // const resetSelectedAction = () => {
  //   dispatch(resetSelected())
  // }
  useEffect(() => {
    fetchMovie();
    // resetSelectedAction();
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
  
  const deleteFilmAction = async (id) => {
    dispatch(deleteFilm(id));
    fetchMovie();
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
      width: "20%",
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
      width: "30%",
    },
    {
      title: "Hành Động",
      dataIndex: "hanhDong",
      key: "hanhDong",

      render: (_, record) => {
        return (
          <div style={{ textAlign: "center" }} className={style.action}>
            <Link
              to={"/films/edit/" + record.maPhim}
              style={{ marginRight: 12 }}
            >
              <AiFillSetting style={{ fontSize: 30, color: "gray" }} />
            </Link>
            <Link
              to={"#"}
              style={{ marginRight: 12 }}
              onClick={() => deleteFilmAction(record.maPhim)}
            >
              <AiFillDelete style={{ fontSize: 30, color: "red" }} />
            </Link>
            <Link to={"/showtime/" + record.maPhim}>
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
