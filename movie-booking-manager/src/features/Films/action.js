
import axios from "axios";
export const GET_MOVIE_DETAIL = "films/GET_MOVIES_DETAIL"
export const SET_MOVIES = "films/SET_MOVIES"
export const RESET_SELECTED = "films/RESET_SELECTED"
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
        type: GET_MOVIE_DETAIL,
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
      type: SET_MOVIES,
      payload: res.data.content,
    });
  } catch (err) {}
}


export const addNewFilm = (formData) => {
  return async (dispatch) => {
    try {
      const res = await axios({
        url:"https://movienew.cybersoft.edu.vn/api/QuanLyPhim/ThemPhimUploadHinh",
        method: "POST",
        data: formData,
        headers: {
          TokenCybersoft:
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJGcm9udCBFbmQgNzIiLCJIZXRIYW5TdHJpbmciOiIxNC8wMi8yMDIzIiwiSGV0SGFuVGltZSI6IjE2NzYzMzI4MDAwMDAiLCJuYmYiOjE2NTAzODc2MDAsImV4cCI6MTY3NjQ4MDQwMH0.e3UrKdKqwFislz0cqribEEthuaW4HOuD4xwr1CTRQwg",
        },
      })
      alert("Thêm phim thành công")
    } catch(err) {
      alert(err.response.data.content)
    }
  }
}

export const deleteFilm = (id) => {
  return async (dispatch) => {
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
        
      } catch (err) {}
    } else {
      alert("Dừng lại là thất bại")
    }
  }
}

export const updateMovie = (formData) => {
  return async (dispatch) => {
    try {
      const res = await axios({
        url: "https://movienew.cybersoft.edu.vn/api/QuanLyPhim/CapNhatPhimUpload",
        method:"POST",
        data:formData,
        headers: {
          TokenCybersoft:
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJGcm9udCBFbmQgNzIiLCJIZXRIYW5TdHJpbmciOiIxNC8wMi8yMDIzIiwiSGV0SGFuVGltZSI6IjE2NzYzMzI4MDAwMDAiLCJuYmYiOjE2NTAzODc2MDAsImV4cCI6MTY3NjQ4MDQwMH0.e3UrKdKqwFislz0cqribEEthuaW4HOuD4xwr1CTRQwg",
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoiYWJjMTIzIiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvZW1haWxhZGRyZXNzIjoia2hhbmg2NjZAZ21haWwuY29tIiwiaHR0cDovL3NjaGVtYXMubWljcm9zb2Z0LmNvbS93cy8yMDA4LzA2L2lkZW50aXR5L2NsYWltcy9yb2xlIjpbIlF1YW5UcmkiLCJraGFuaDY2NkBnbWFpbC5jb20iLCJHUDAxIl0sIm5iZiI6MTY2NDA5MzU1NCwiZXhwIjoxNjY0MDk3MTU0fQ.QpWBnFcK9d0YGqMzRzz7bP62QZWKu0lOIhEVLyx4_S8",
        },
      });
      alert("Cập nhật phim thành công!");
      
    } catch (err) {
      alert(err.response.data.content)
    }
  }
}

// export const resetSelected = () => {
//   return (dispatch) => {
//     dispatch( {
//       type: RESET_SELECTED,
//       payload: null,
//     })
//   }
// }