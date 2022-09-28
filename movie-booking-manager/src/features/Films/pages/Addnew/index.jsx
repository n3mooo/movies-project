import {
  Button,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Radio,
  Switch,
} from "antd";
import axios from "axios";
import moment from "moment";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import Navbar from "../../../../common/components/SideBar";
import { addNewFilm } from "../../action";
import style from "../Addnew/style.module.css";

function AddNew() {
  const [componentSize, setComponentSize] = useState("default");
  const dispatch = useDispatch();
  const onFormLayoutChange = ({ size }) => {
    setComponentSize(size);
  };
  const [image, setImage] = useState();
  const [previewImage, setPreviewImage] = useState();
  const handleChangeImage = (e) => {
    const file = e.target.files[0];
    if (e.target.name === "hinhAnh") {
      file.preview = URL.createObjectURL(file);
      setImage(file);
      setPreviewImage(file.preview);
    }
  };
  const [isShowing, setIsShowing] = useState(false);
  const [isUpComing, setIsUpComing] = useState(false);
  const [isHot, setIsHot] = useState(false);
  const handleChangeShowing = (e) => {
    setIsShowing(e);
  };
  const handleChangeUpComing = (e) => {
    setIsUpComing(e);
  };
  const handleChangeHot = (e) => {
    setIsHot(e);
  };
  const history = useHistory();
  const goToListFilms = () => {
    history.push("/films");
  };
  const onFinish = (values) => {
    // const newImgData = delete image.preview;
    const data = {
      ...values,
      hinhAnh: image,
      dangChieu: isShowing,
      sapChieu: isUpComing,
      hot: isHot,
      maNhom: "GP02",
    };
    let formData = new FormData();
    formData.append("maPhim", Math.floor(Math.random() * 100000));
    formData.append("tenPhim", data.tenPhim);
    formData.append("moTa", data.moTa);
    formData.append("trailer", data.trailer);
    formData.append(
      "ngayKhoiChieu",
      moment(data.ngayKhoiChieu).format("DD/MM/YYYY")
    );
    formData.append("sapChieu", data.sapChieu);
    formData.append("dangChieu", data.dangChieu);
    formData.append("hot", data.hot);
    formData.append("maNhom", data.maNhom);
    formData.append("danhGia", data.danhGia);
    formData.append("hinhAnh", data.hinhAnh);
    addNewFilmAction(formData);
    goToListFilms();
  };
  const addNewFilmAction = async (formData) => {
    dispatch(addNewFilm(formData));
  };
  return (
    <div>
      <Navbar />
      <div className={style.container}>
        <div className={style.content}>
          <h3>Thêm Phim mới</h3>
          <Form
            labelCol={{
              span: 4,
            }}
            wrapperCol={{
              span: 14,
            }}
            layout="horizontal"
            initialValues={{
              size: componentSize,
            }}
            onValuesChange={onFormLayoutChange}
            size={componentSize}
            onFinish={onFinish}
          >
            <Form.Item label="Form Size" name="size" style={{ marginTop: 20 }}>
              <Radio.Group>
                <Radio.Button value="small">Small</Radio.Button>
                <Radio.Button value="default">Default</Radio.Button>
                <Radio.Button value="large">Large</Radio.Button>
              </Radio.Group>
            </Form.Item>
            <Form.Item label="Tên Phim" name="tenPhim">
              <Input required/>
            </Form.Item>
            <Form.Item label="Trailer" name={"trailer"}>
              <Input required />
            </Form.Item>
            <Form.Item label="Mô tả" name={"moTa"}>
              <Input  required/>
            </Form.Item>
            <Form.Item label="Ngày Khởi chiếu" name={"ngayKhoiChieu"}>
              <DatePicker  required format={"DD/MM/YYYY"} />
            </Form.Item>
            <Form.Item label="Đang Chiếu">
              <Switch
                name={"dangChieu"}
                checked={isShowing}
                onChange={handleChangeShowing}
              />
            </Form.Item>
            <Form.Item label="Sắp Chiếu">
              <Switch
                name={"sapChieu"}
                checked={isUpComing}
                onChange={handleChangeUpComing}
              />
            </Form.Item>

            <Form.Item label="Hot">
              <Switch name={"hot"} checked={isHot} onChange={handleChangeHot} />
            </Form.Item>
            <Form.Item label="Số sao" name={"danhGia"}>
              <InputNumber required/>
            </Form.Item>
            <Form.Item label="Hình Ảnh">
              <Input
                name={"hinhAnh"}
                type="file"
                onChange={handleChangeImage}
              />
              {image && (
                <img src={previewImage} style={{ marginTop: 12, width: 200 }} />
              )}
            </Form.Item>
            <Form.Item label="Tác vụ">
              <Button htmlType="submit" type="primary">
                Thêm mới
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
}

export default AddNew;
