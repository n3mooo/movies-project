import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouteMatch } from "react-router-dom";
import Navbar from "../../../../common/components/SideBar";
import { fetchMovieDetail } from "../../../Films/action";
import style from "../ShowTime/style.module.css";
import { Button, DatePicker, Input, InputNumber, Select } from "antd";
import { useFormik } from "formik";
import {
  fetchDetailHeThongRap,
  fetchHeThongRap,
  taoLichChieu,
} from "../../action";
import { useState } from "react";
import moment from "moment/moment";
const Option = Select;
function ShowTime() {
  const dispatch = useDispatch();
  const match = useRouteMatch();
  const [maCumRap, setCumRap] = useState("");
  const [date, setDate] = useState("");
  const [price, setPrice] = useState(0);
  const fetchMovieDetailAction = (id) => {
    const maPhim = +match.params.id;
    dispatch(fetchMovieDetail(maPhim));
  };
  useEffect(() => {
    fetchMovieDetailAction();
  }, []);
  const selectedMovie = useSelector((state) => {
    return state.movieList.selectedMovie;
  });
  const formik = useFormik({
    initialValues: {
      maPhim: +match.params.id,
      giaVe: "",
    },
    onSubmit: (values) => {
      const data = {
        ...values,
        maRap: maCumRap,
        ngayChieuGioChieu: date,
      };
      console.log(data);
      taoLichChieuAction(data);
    },
  });
  const fetchHeThongRapAction = () => {
    dispatch(fetchHeThongRap());
  };
  const heThongRap = useSelector((state) => {
    return state.showtime.heThongRap;
  });
  const cumRap = useSelector((state) => {
    return state.showtime.maRap;
  });
  const handleOnChange = (e) => {
    dispatch(fetchDetailHeThongRap(e));
  };

  const handleCumRap = (e) => {
    setCumRap(e);
  };
  function padTo2Digits(num) {
    return num.toString().padStart(2, "0");
  }
  function formatDate(date) {
    return (
      [
        padTo2Digits(date.getDate()),
        padTo2Digits(date.getMonth() + 1),
        date.getFullYear(),
      ].join("/") +
      " " +
      [
        padTo2Digits(date.getHours()),
        padTo2Digits(date.getMinutes()),
        padTo2Digits(date.getSeconds()),
      ].join(":")
    );
  }
  const handleChangeDate = (e) => {
    setDate(formatDate(e._d));
    console.log(typeof date);
  };
  const onChangeGiaVe = (e) => {
    formik.setFieldValue("giaVe",e)
  };
  const taoLichChieuAction = (data) => {
    dispatch(taoLichChieu(data));
  };
  useEffect(() => {
    fetchHeThongRapAction();
  }, []);
  return (
    <div>
      <Navbar />
      {selectedMovie && (
        <div className={style.container}>
          <div className={style.content}>
            <div className={style.info}>
              <h2>Thêm Lịch chiếu của {selectedMovie.tenPhim}</h2>
              <img style={{ width: "80%" }} src={selectedMovie.hinhAnh} />
            </div>
            <div className={style.main}>
              <form style={{ width: "100%" }} onSubmit={formik.handleSubmit}>
                <div className={style.select}>
                  <label>Hệ thống rạp:</label>
                  <Select
                    style={{
                      width: "100%",
                    }}
                    name="heThongRap"
                    onChange={handleOnChange}
                  >
                    {heThongRap &&
                      heThongRap.map((item) => {
                        return (
                          <Option
                            key={item.maHeThongRap}
                            value={item.maHeThongRap}
                          >
                            {item.tenHeThongRap}
                          </Option>
                        );
                      })}
                  </Select>
                </div>
                <div className={style.select}>
                  <label>Cụm Rạp:</label>
                  <Select
                    style={{
                      width: "100%",
                    }}
                    name="maRap"
                    onChange={handleCumRap}
                  >
                    {cumRap &&
                      cumRap.map((item) => {
                        return (
                          <Option key={item.maCumRap} value={item.maCumRap}>
                            {item.tenCumRap}
                          </Option>
                        );
                      })}
                  </Select>
                </div>

                <div className={style.select}>
                  <label>Giá vé:</label>
                  <InputNumber
                    name="giaVe"
                    min={75000}
                    max={225000}
                    defaultValue={75000}
                    onChange={onChangeGiaVe}
                  />
                  
                </div>
                <div className={style.select}>
                  <label>Ngày giờ chiếu:</label>
                  <DatePicker
                    name="ngayChieuGioChieu"
                    onChange={handleChangeDate}
                  ></DatePicker>
                </div>
                <Button htmlType="submit" type="primary">
                  Tạo lịch chiếu
                </Button>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ShowTime;
