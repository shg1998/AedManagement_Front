import { rest } from "msw";
import {getBaseUrl} from "../../../../config";
export const otp = [
    rest.get(`${getBaseUrl()}user/v1/send_validation_code`, async (req, res, ctx) => {
        return res(
            ctx.status(200),
            ctx.json({
                    data: null,
                    type: "success",
                    detail: "کد اعتبارسنجی شما از طریق ایمیل ارسال شد"
                }
            )
        );
    }),
];
