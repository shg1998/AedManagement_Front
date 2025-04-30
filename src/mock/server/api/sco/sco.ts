import { rest } from "msw";
import {getBaseUrl} from "../../../../config";
export const sco = [
    rest.get(`${getBaseUrl()}reporter/v1/table/x--sco`, async (req, res, ctx) => {
        return res(
            ctx.status(200),
            ctx.json({
                    data: {
                        total: 1,
                        page: 1,
                        size: 1,
                        items: [
                            {
                                type: "ipv4-addr",
                                x_short_id: "invalid-flow-02-a9dc16",
                                value: "test-ipv4",
                                id: "ipv4-addr--fdd5c36a-2d1f-47f1-a853-e4bd8972cfa6"
                            }
                        ]
                    },
                    type: "success",
                    message: ""
                }
            )
        );
    }),
];