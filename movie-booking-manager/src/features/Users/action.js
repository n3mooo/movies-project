import axios from "axios";
import { useHistory } from "react-router-dom";
import instance from "../../api/instance";

export const fetchUsersAction = async (dispatch) => {
  try {
    const res = await axios({
      url: "https://movienew.cybersoft.edu.vn/api/QuanLyNguoiDung/LayDanhSachNguoiDung",
      method: "GET",
      params: {
        MaNhom: "GP02",
      },
      headers: {
        TokenCybersoft:
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJGcm9udCBFbmQgNzIiLCJIZXRIYW5TdHJpbmciOiIxNC8wMi8yMDIzIiwiSGV0SGFuVGltZSI6IjE2NzYzMzI4MDAwMDAiLCJuYmYiOjE2NTAzODc2MDAsImV4cCI6MTY3NjQ4MDQwMH0.e3UrKdKqwFislz0cqribEEthuaW4HOuD4xwr1CTRQwg",
      },
    });
    dispatch({
      type: "user/GET_USER_LIST",
      payload: res.data.content,
    });
  } catch (err) {}
};

export const getLoaiNguoiDung = () => {
  return async (dispatch) => {
    try {
      const res = await axios({
        url: "https://movienew.cybersoft.edu.vn/api/QuanLyNguoiDung/LayDanhSachLoaiNguoiDung",
        method: "GET",
        headers: {
          TokenCybersoft:
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJGcm9udCBFbmQgNzIiLCJIZXRIYW5TdHJpbmciOiIxNC8wMi8yMDIzIiwiSGV0SGFuVGltZSI6IjE2NzYzMzI4MDAwMDAiLCJuYmYiOjE2NTAzODc2MDAsImV4cCI6MTY3NjQ4MDQwMH0.e3UrKdKqwFislz0cqribEEthuaW4HOuD4xwr1CTRQwg",
        },
      });
      dispatch({
        type: "user/GET_LOAI_NGUOI_DUNG",
        payload: res.data.content,
      });
    } catch (err) {}
  };
};
export const addNewUser = (values) => {
  return async (dispatch) => {
    try {
      const res = await axios({
        url: "https://movienew.cybersoft.edu.vn/api/QuanLyNguoiDung/ThemNguoiDung",
        method: "POST",
        data: values,
        headers: {
          TokenCybersoft:
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJGcm9udCBFbmQgNzIiLCJIZXRIYW5TdHJpbmciOiIxNC8wMi8yMDIzIiwiSGV0SGFuVGltZSI6IjE2NzYzMzI4MDAwMDAiLCJuYmYiOjE2NTAzODc2MDAsImV4cCI6MTY3NjQ4MDQwMH0.e3UrKdKqwFislz0cqribEEthuaW4HOuD4xwr1CTRQwg",
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoiYWJjMTIzIiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvZW1haWxhZGRyZXNzIjoia2hhbmg2NjZAZ21haWwuY29tIiwiaHR0cDovL3NjaGVtYXMubWljcm9zb2Z0LmNvbS93cy8yMDA4LzA2L2lkZW50aXR5L2NsYWltcy9yb2xlIjpbIlF1YW5UcmkiLCJraGFuaDY2NkBnbWFpbC5jb20iLCJHUDAxIl0sIm5iZiI6MTY2NDA5MzU1NCwiZXhwIjoxNjY0MDk3MTU0fQ.QpWBnFcK9d0YGqMzRzz7bP62QZWKu0lOIhEVLyx4_S8",
        },
      });
      alert("Thêm thành công!");
    } catch (err) {
      alert(err.response.data.content);
    }
  };
};

export const fetchUsersDetailAction = (taiKhoan) => {
  return async (dispatch) => {
    try {
      const res = await axios({
        url: "https://movienew.cybersoft.edu.vn/api/QuanLyNguoiDung/LayThongTinNguoiDung",
        method: "POST",
        params: {
          MaNhom: "GP02",
          taiKhoan: taiKhoan,
        },
        headers: {
          TokenCybersoft:
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJGcm9udCBFbmQgNzIiLCJIZXRIYW5TdHJpbmciOiIxNC8wMi8yMDIzIiwiSGV0SGFuVGltZSI6IjE2NzYzMzI4MDAwMDAiLCJuYmYiOjE2NTAzODc2MDAsImV4cCI6MTY3NjQ4MDQwMH0.e3UrKdKqwFislz0cqribEEthuaW4HOuD4xwr1CTRQwg",
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoiYWJjMTIzIiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvZW1haWxhZGRyZXNzIjoia2hhbmg2NjZAZ21haWwuY29tIiwiaHR0cDovL3NjaGVtYXMubWljcm9zb2Z0LmNvbS93cy8yMDA4LzA2L2lkZW50aXR5L2NsYWltcy9yb2xlIjpbIlF1YW5UcmkiLCJraGFuaDY2NkBnbWFpbC5jb20iLCJHUDAxIl0sIm5iZiI6MTY2NDA5MzU1NCwiZXhwIjoxNjY0MDk3MTU0fQ.QpWBnFcK9d0YGqMzRzz7bP62QZWKu0lOIhEVLyx4_S8",
        },
      });
      dispatch({
        type: "user/GET_USER_DETAIL",
        payload: res.data.content,
      });
    } catch (err) {}
  };
};

export const updateUserAction = (values) => {
  return async (dispatch) => {
    try {
      const res = await axios({
        url: "https://movienew.cybersoft.edu.vn/api/QuanLyNguoiDung/CapNhatThongTinNguoiDung",
        method: "POST",
        data: values,
        headers: {
          TokenCybersoft:
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJGcm9udCBFbmQgNzIiLCJIZXRIYW5TdHJpbmciOiIxNC8wMi8yMDIzIiwiSGV0SGFuVGltZSI6IjE2NzYzMzI4MDAwMDAiLCJuYmYiOjE2NTAzODc2MDAsImV4cCI6MTY3NjQ4MDQwMH0.e3UrKdKqwFislz0cqribEEthuaW4HOuD4xwr1CTRQwg",
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoiYWJjMTIzIiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvZW1haWxhZGRyZXNzIjoia2hhbmg2NjZAZ21haWwuY29tIiwiaHR0cDovL3NjaGVtYXMubWljcm9zb2Z0LmNvbS93cy8yMDA4LzA2L2lkZW50aXR5L2NsYWltcy9yb2xlIjpbIlF1YW5UcmkiLCJraGFuaDY2NkBnbWFpbC5jb20iLCJHUDAxIl0sIm5iZiI6MTY2NDA5MzU1NCwiZXhwIjoxNjY0MDk3MTU0fQ.QpWBnFcK9d0YGqMzRzz7bP62QZWKu0lOIhEVLyx4_S8",
        },
      });
      alert("Cập nhật thành công!");
    } catch (err) {
      alert(err.response.data.content);
    }
  };
};

export const deleteUserAction = (values) => {
  return async (dispatch) => {
    try {
      const res = await axios({
        url: "https://movienew.cybersoft.edu.vn/api/QuanLyNguoiDung/XoaNguoiDung",
        method: "DELETE",
        params: {
          MaNhom: "GP02",
          taiKhoan: values,
        },
        headers: {
          TokenCybersoft:
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJGcm9udCBFbmQgNzIiLCJIZXRIYW5TdHJpbmciOiIxNC8wMi8yMDIzIiwiSGV0SGFuVGltZSI6IjE2NzYzMzI4MDAwMDAiLCJuYmYiOjE2NTAzODc2MDAsImV4cCI6MTY3NjQ4MDQwMH0.e3UrKdKqwFislz0cqribEEthuaW4HOuD4xwr1CTRQwg",
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoiYWJjMTIzIiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvZW1haWxhZGRyZXNzIjoia2hhbmg2NjZAZ21haWwuY29tIiwiaHR0cDovL3NjaGVtYXMubWljcm9zb2Z0LmNvbS93cy8yMDA4LzA2L2lkZW50aXR5L2NsYWltcy9yb2xlIjpbIlF1YW5UcmkiLCJraGFuaDY2NkBnbWFpbC5jb20iLCJHUDAxIl0sIm5iZiI6MTY2NDA5MzU1NCwiZXhwIjoxNjY0MDk3MTU0fQ.QpWBnFcK9d0YGqMzRzz7bP62QZWKu0lOIhEVLyx4_S8",
        },
      });
      alert("Xóa thành công!");
    } catch (err) {
      alert(err.response.data.content);
    }
  };
};