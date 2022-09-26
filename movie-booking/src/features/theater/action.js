import { createAsyncThunk } from "@reduxjs/toolkit";
import instance from "api/instance";

export const fetchMovieScheduleAction = createAsyncThunk(
    "theater/setScheduleTheater",
    async (id) => {
        try {
            const res = await instance.request({
                url: "/api/QuanLyRap/LayThongTinLichChieuHeThongRap",
                method: "GET",
                params: {
                    maHeThongRap: id,
                    maNhom: "GP05",
                },
            });

            return res.data.content[0];
        } catch (error) {}
    }
);
