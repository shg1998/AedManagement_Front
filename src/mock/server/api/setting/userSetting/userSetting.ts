import { rest } from "msw";
import {getBaseUrl} from "../../../../../config";
export const userSetting = [
    rest.get(`${getBaseUrl()}config/v1/user`, async (req, res, ctx) => {
        return res(
            ctx.status(200),
            ctx.json(
                {
                    data: {
                        is_development_environment: true,
                        reset_password_expire_minutes: 60,
                        reset_code_expire_minutes: 10,
                        access_token_expire_minutes: 1440,
                        secret_key: "test"
                    },
                    type: "success",
                    detail: ""
                }
            )
        );
    }),
    rest.put(`${getBaseUrl()}config/v1/user`, async (req, res, ctx) => {
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
    rest.get(`${getBaseUrl()}config/v1/user/reset`, async (req, res, ctx) => {
        return res(
            ctx.status(200),
            ctx.json(
                {
                    data: {
                        is_development_environment: false,
                        reset_password_expire_minutes: 60,
                        reset_code_expire_minutes: 10,
                        access_token_expire_minutes: 1440,
                        secret_key: "old test"
                    },
                    type: "success",
                    detail: ""
                }
            )
        );
    }),
];
