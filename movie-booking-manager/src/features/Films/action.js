
import axios from "axios";

export const fetchMovieDetail =(id) => {
  return async (dispatch) => {
    try {
      const res = await axios({
        url: "https://movienew.cybersoft.edu.vn/api/QuanLyPhim/LayThongTinPhim",

        method: "GET",
        params: {
          MaPhim: id,
        },
        headers: {
          TokenCybersoft:
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJGcm9udCBFbmQgNzIiLCJIZXRIYW5TdHJpbmciOiIxNC8wMi8yMDIzIiwiSGV0SGFuVGltZSI6IjE2NzYzMzI4MDAwMDAiLCJuYmYiOjE2NTAzODc2MDAsImV4cCI6MTY3NjQ4MDQwMH0.e3UrKdKqwFislz0cqribEEthuaW4HOuD4xwr1CTRQwg",
        },
      });
      dispatch({
        type: "films/GET_MOVIES_DETAIL",
        payload: res.data.content,
      });
    } catch (err) {}
  }
}
export const fetchMovieAction = async (dispatch) => {
  try {
    const res = await axios({
      url: "https://movienew.cybersoft.edu.vn/api/QuanLyPhim/LayDanhSachPhim",

      method: "GET",
      params: {
        maNhom: "GP02",
      },
      headers: {
        TokenCybersoft:
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJGcm9udCBFbmQgNzIiLCJIZXRIYW5TdHJpbmciOiIxNC8wMi8yMDIzIiwiSGV0SGFuVGltZSI6IjE2NzYzMzI4MDAwMDAiLCJuYmYiOjE2NTAzODc2MDAsImV4cCI6MTY3NjQ4MDQwMH0.e3UrKdKqwFislz0cqribEEthuaW4HOuD4xwr1CTRQwg",
      },
    });
    dispatch({
      type: "films/SET_MOVIES",
      payload: res.data.content,
    });
  } catch (err) {}
}
