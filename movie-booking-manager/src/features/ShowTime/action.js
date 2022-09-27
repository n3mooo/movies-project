import axios from "axios";

export const fetchHeThongRap =() => {
  return async (dispatch) => {
    try {
      const res = await axios({
        url: "https://movienew.cybersoft.edu.vn/api/QuanLyRap/LayThongTinHeThongRap",

        method: "GET",
        headers: {
          TokenCybersoft:
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJGcm9udCBFbmQgNzIiLCJIZXRIYW5TdHJpbmciOiIxNC8wMi8yMDIzIiwiSGV0SGFuVGltZSI6IjE2NzYzMzI4MDAwMDAiLCJuYmYiOjE2NTAzODc2MDAsImV4cCI6MTY3NjQ4MDQwMH0.e3UrKdKqwFislz0cqribEEthuaW4HOuD4xwr1CTRQwg",
        },
      });
      console.log(res.data.content)
      dispatch({
        type: "films/SET_HE_THONG_RAP",
        payload: res.data.content,
      });
    } catch (err) {}
  }
}
export const fetchDetailHeThongRap =(id) => {
    return async (dispatch) => {
      try {
        const res = await axios({
          url: "https://movienew.cybersoft.edu.vn/api/QuanLyRap/LayThongTinCumRapTheoHeThong",
  
          method: "GET",
          params: {
            maHeThongRap:id
          },
          headers: {
            TokenCybersoft:
              "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJGcm9udCBFbmQgNzIiLCJIZXRIYW5TdHJpbmciOiIxNC8wMi8yMDIzIiwiSGV0SGFuVGltZSI6IjE2NzYzMzI4MDAwMDAiLCJuYmYiOjE2NTAzODc2MDAsImV4cCI6MTY3NjQ4MDQwMH0.e3UrKdKqwFislz0cqribEEthuaW4HOuD4xwr1CTRQwg",
          },
        });
        console.log(res.data.content)
        dispatch({
          type: "films/SET_MA_RAP",
          payload: res.data.content,
        });
      } catch (err) {}
    }
  }

  export const taoLichChieu = (values) => {
    return async (dispatch) => {
      try {
        const res = await axios({
          url: "https://movienew.cybersoft.edu.vn/api/QuanLyDatVe/TaoLichChieu",
          method: "POST",
          data:values,
          headers: {
            TokenCybersoft:
              "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJGcm9udCBFbmQgNzIiLCJIZXRIYW5TdHJpbmciOiIxNC8wMi8yMDIzIiwiSGV0SGFuVGltZSI6IjE2NzYzMzI4MDAwMDAiLCJuYmYiOjE2NTAzODc2MDAsImV4cCI6MTY3NjQ4MDQwMH0.e3UrKdKqwFislz0cqribEEthuaW4HOuD4xwr1CTRQwg",
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoiYWJjMTIzIiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvZW1haWxhZGRyZXNzIjoia2hhbmg2NjZAZ21haWwuY29tIiwiaHR0cDovL3NjaGVtYXMubWljcm9zb2Z0LmNvbS93cy8yMDA4LzA2L2lkZW50aXR5L2NsYWltcy9yb2xlIjpbIlF1YW5UcmkiLCJraGFuaDY2NkBnbWFpbC5jb20iLCJHUDAxIl0sIm5iZiI6MTY2NDA5MzU1NCwiZXhwIjoxNjY0MDk3MTU0fQ.QpWBnFcK9d0YGqMzRzz7bP62QZWKu0lOIhEVLyx4_S8",
          },
        });
        alert("Tạo Lịch chiếu thành công")
      } catch (err) {
        alert(err.response.data.content);
      }
    };
  };