import {
  Button,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Radio,
  Switch,
} from "antd";
import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouteMatch } from "react-router-dom";
import Navbar from "../../../../common/components/SideBar";
import style from "../Edit/style.module.css";
import axios from "axios";
import { useState } from "react";
import moment from "moment/moment";
import { useFormik } from "formik";
import { fetchMovieDetail } from "../../action";
function Edit() {
  const [componentSize, setComponentSize] = useState("default");
  const selectedMovie = useSelector((state) => {
    return state.movieList.selectedMovie;
  });
  const onFormLayoutChange = ({ size }) => {
    setComponentSize(size);
  };
  const match = useRouteMatch();
  const dispatch = useDispatch();

  const fetchMovieDetailAction = async () => {
    const id = +match.params.id;
    dispatch(fetchMovieDetail(id));
  };

  useEffect(() => {
    fetchMovieDetailAction();
  }, []);
  const dateFormat = "DD/MM/YYYY";
  const formik = useFormik({
    initialValues: {
      tenPhim: selectedMovie.tenPhim,
      trailer: selectedMovie.trailer,
      moTa: selectedMovie.moTa,
      dangChieu: selectedMovie.dangChieu,
      hot: selectedMovie.hot,
      sapChieu: selectedMovie.sapChieu,
      ngayKhoiChieu: selectedMovie.ngayKhoiChieu,
      hinhAnh: selectedMovie.hinhAnh,
      danhGia: selectedMovie.danhGia,
    },
    onSubmit: (values) => {
      console.log(values);
    },
  });

  const handleChangeShowing = (e) => {};
  const handleChangeUpComing = (e) => {};
  const handleChangeHot = (e) => {};
  const handleChangeDate = (e) => {};

  // const handleChangeImage = (e) => {
  //   const file = e.target.files[0];
  //   if (e.target.name === "hinhAnh") {
  //     setImage(file);
  //     file.preview = URL.createObjectURL(file);
  //     setImageChange(file);
  //     console.log(image, imageChange);
  //   }
  // };
  return (
    <div>
      <Navbar />
      <div className={style.container}>
        <div className={style.content}>
          <Form
            labelCol={{
              span: 4,
            }}
            wrapperCol={{
              span: 14,
            }}
            onFinish={formik.handleSubmit}
            fields={[
              {
                name: ["tenPhim"],
                value: formik.values.tenPhim,
              },
              {
                name: ["trailer"],
                value: formik.values.trailer,
              },
              {
                name: ["moTa"],
                value: formik.values.moTa,
              },

              {
                name: ["danhGia"],
                value: formik.values.danhGia,
              },
            ]}
          >
            {/* <Form.Item label="Form Size" name="size" style={{ marginTop: 20 }}>
              <Radio.Group>
                <Radio.Button value="small">Small</Radio.Button>
                <Radio.Button value="default">Default</Radio.Button>
                <Radio.Button value="large">Large</Radio.Button>
              </Radio.Group>
            </Form.Item> */}
            <Form.Item label="Tên Phim" name="tenPhim">
              <Input />
            </Form.Item>
            <Form.Item label="Trailer" name={"trailer"}>
              <Input />
            </Form.Item>
            <Form.Item label="Mô tả" name={"moTa"}>
              <Input />
            </Form.Item>
            <Form.Item label="Ngày Khởi chiếu" name={"ngayKhoiChieu"}>
              <DatePicker />
            </Form.Item>
            <Form.Item label="Đang Chiếu">
              <Switch
                name={"dangChieu"}
                checked={formik.values.dangChieu}
                onClick={handleChangeShowing}
              />
            </Form.Item>
            <Form.Item label="Sắp Chiếu">
              <Switch
                name={"sapChieu"}
                checked={formik.values.sapChieu}
                onClick={handleChangeUpComing}
              />
            </Form.Item>

            <Form.Item label="Hot">
              <Switch
                name={"hot"}
                checked={formik.values.hot}
                onClick={handleChangeHot}
              />
            </Form.Item>
            <Form.Item label="Số sao" name={"danhGia"}>
              <InputNumber />
            </Form.Item>
            <Form.Item label="Hình Ảnh">
              <Input name="hinhAnh" type="file" />
              {formik.values.hinhAnh && (
                <img
                  src={formik.values.hinhAnh}
                  style={{ marginTop: 12, width: 80 }}
                />
              )}
            </Form.Item>
            <Form.Item label="Tác vụ">
              <Button htmlType="submit" type="primary">
                Cập nhật
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
}

export default Edit;
