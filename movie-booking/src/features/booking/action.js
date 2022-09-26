import { createAsyncThunk } from "@reduxjs/toolkit";
import instance from "api/instance";

export const bookingTicketAction = createAsyncThunk(
    "home/bookingTicket",
    async (ticket, { rejectWithValue }) => {
        try {
            const res = await instance.request({
                url: "/api/QuanLyDatVe/DatVe",
                method: "POST",
                data: ticket,
            });

            const cloneRes = { ...res.data.content };
            delete cloneRes.accessToken;

            return cloneRes;
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);
