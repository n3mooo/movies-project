import { createAsyncThunk } from "@reduxjs/toolkit";
import instance from "api/instance";

export const editProfileAction = createAsyncThunk(
    "auth/setProfile",
    async (data, { rejectWithValue }) => {
        try {
            const res = await instance.request({
                url: "/api/QuanLyNguoiDung/CapNhatThongTinNguoiDung",
                method: "POST",
                data: data,
            });

            const profile = { ...res.data.content };
            delete profile.accessToken;

            localStorage.setItem("token", res.data.content.accessToken);

            return profile;
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);
