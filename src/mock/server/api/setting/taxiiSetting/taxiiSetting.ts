import { rest } from "msw";
import {getBaseUrl} from "../../../../../config";
export const taxiiSetting = [
    rest.get(`${getBaseUrl()}config/v1/taxii`, async (req, res, ctx) => {
        return res(
            ctx.status(200),
            ctx.json(
                {
                    data: {
                        fetch_data_url: "test",
                        duration_minutes: 5,
                        api_key: "test",
                        batch_size: 200
                    },
                    type: "success",
                    detail: ""
                }
            )
        );
    }),
    rest.put(`${getBaseUrl()}config/v1/taxii`, async (req, res, ctx) => {
        return res(
            ctx.status(200),
            ctx.json(
                {
                    data: "عملیات با موفقیت انجام شد",
                    type: "success",
                    detail: ""
                }
            )
        );
    }),
    rest.get(`${getBaseUrl()}config/v1/taxii/reset`, async (req, res, ctx) => {
        return res(
            ctx.status(200),
            ctx.json(
                {
                    data: {
                        fetch_data_url: "test2",
                        duration_minutes: 5,
                        api_key: "test2",
                        batch_size: 200
                    },
                    type: "success",
                    detail: ""
                }
            )
        );
    }),
];
