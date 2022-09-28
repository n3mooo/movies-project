import axios from "axios";
import instance from "../../api/instance";
export const signIn = (user) => {
  return async (dispatch) => {
    try {
      const res = await instance.request({
        url: "/api/QuanLyNguoiDung/DangNhap",
        method: "POST",
        data: user,
      });

      localStorage.setItem("token", res.data.content.accessToken);
      const profile = { ...res.data.content };
      delete profile.accessToken;
      alert("Đăng nhập thành công!")
      dispatch({
        type: "auth/SET_PROFILE",
        payload: profile,
      });
    } catch (err) {
      alert(err.response.data.content);
    }
  };
};
