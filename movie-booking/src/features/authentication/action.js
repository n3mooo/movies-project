import { createAsyncThunk } from "@reduxjs/toolkit";
import instance from "api/instance";

export const signInAction = createAsyncThunk(
    "auth/setProfile",
    async (values, { rejectWithValue }) => {
        try {
            const res = await instance.request({
                url: "/api/QuanLyNguoiDung/DangNhap",
                method: "POST",
                data: values.user,
            });
            const profile = { ...res.data.content };
            delete profile.accessToken;

            localStorage.setItem("token", res.data.content.accessToken);

            values.history.push("/home");

            return profile;
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);

export const signUpAction = createAsyncThunk("auth/signUp", async (values, { rejectWithValue }) => {
    try {
        await instance.request({
            url: "api/QuanLyNguoiDung/DangKy",
            method: "POST",
            data: values.user,
        });

        values.history.push("/signin");
    } catch (error) {
        return rejectWithValue(error);
    }
});

export const fetchProfileAction = createAsyncThunk("auth/setProfile", async () => {
    try {
        const res = await instance.request({
            url: "api/QuanLyNguoiDung/ThongTinTaiKhoan",
            method: "POST",
        });

        return res.data.content;
    } catch (error) {}
});
