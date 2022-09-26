import { createAsyncThunk } from "@reduxjs/toolkit";
import instance from "api/instance";

export const fetchBannersAction = createAsyncThunk("home/setBanners", async () => {
    try {
        const res = await instance.request({
            url: "/api/QuanLyPhim/LayDanhSachBanner",
            method: "GET",
        });

        return res.data.content;
    } catch (error) {}
});

export const fetchMoviesAction = createAsyncThunk("home/setMovies", async () => {
    try {
        const res = await instance.request({
            url: "/api/QuanLyPhim/LayDanhSachPhim",
            method: "GET",
            params: {
                maNhom: "GP05",
            },
        });

        return res.data.content;
    } catch (error) {}
});

export const fetchMovieDetailAction = createAsyncThunk("home/setMovieDetail", async (id) => {
    try {
        const res = await instance.request({
            url: "/api/QuanLyRap/LayThongTinLichChieuPhim",
            method: "GET",
            params: {
                MaPhim: id,
            },
        });

        return res.data.content;
    } catch (error) {}
});

export const fetchCinemasAction = createAsyncThunk("home/setCinemas", async () => {
    try {
        const res = await instance.request({
            url: "/api/QuanLyRap/LayThongTinHeThongRap",
            method: "GET",
        });

        return res.data.content;
    } catch (error) {}
});

export const fetchBoxOfficeAction = createAsyncThunk("home/setBoxOffice", async (id) => {
    try {
        const res = await instance.request({
            url: "/api/QuanLyDatVe/LayDanhSachPhongVe",
            method: "GET",
            params: {
                MaLichChieu: id,
            },
        });

        return res.data.content;
    } catch (error) {}
});
