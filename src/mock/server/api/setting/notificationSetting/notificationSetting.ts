import { rest } from "msw";
import {getBaseUrl} from "../../../../../config";
export const notificationSetting = [
    rest.get(`${getBaseUrl()}config/v1/notification`, async (req, res, ctx) => {
        return res(
            ctx.status(200),
            ctx.json(
                {
                    data: {
                        sms_api_key_kashef: "test",
                        sms_base_url_kashef: "test",
                        smtp_host: "test",
                        emails_from_name: "سامانه sata",
                        smtp_user: "satatest",
                        smtp_port: 587,
                        smtp_tls: true,
                        emails_from_email: "test"
                    },
                    type: "success",
                    detail: ""
                }
            )
        );
    }),
    rest.put(`${getBaseUrl()}config/v1/notification`, async (req, res, ctx) => {
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
    rest.get(`${getBaseUrl()}config/v1/notification/reset`, async (req, res, ctx) => {
        return res(
            ctx.status(200),
            ctx.json(
                {
                    data: {
                        sms_api_key_kashef: "test",
                        sms_base_url_kashef: "test",
                        smtp_host: "test",
                        emails_from_name: "سامانه sata",
                        smtp_user: "satatest",
                        smtp_port: 587,
                        smtp_tls: true,
                        emails_from_email: "test"
                    },
                    type: "success",
                    detail: ""
                }
            )
        );
    }),
];
