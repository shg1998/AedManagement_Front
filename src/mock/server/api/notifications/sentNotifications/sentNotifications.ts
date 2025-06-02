import { rest } from "msw";
import {getBaseUrl} from "../../../../../config";
export const sentNotifications = [
    rest.get(`${getBaseUrl()}message/v1/sent_message`, async (req, res, ctx) => {
        return res(
            ctx.status(200),
            ctx.json({
                    data: {
                        items: [
                            {
                                id: 3,
                                title: "string",
                                text: "string",
                                created_date: "2023-10-24T10:16:06.214751"
                            },
                        ],
                        total: 1,
                        page: 1,
                        size: 1
                    },
                    type: "success",
                    detail: ""
                }
            )
        );
    }),
    rest.get(`${getBaseUrl()}message/v1/sent_message/details/3`, async (req, res, ctx) => {
        return res(
            ctx.status(200),
            ctx.json({
                    data: {
                        id: 3,
                        title: "string",
                        text: "string",
                        created_date: "2023-10-24T10:16:06.214751",
                        users: [
                            {
                                username: "admin",
                                first_name: "first_user",
                                last_name: "last_user",
                                image_url: "img/profile/2023-10-16-12-02-42-8e5dc4.png"
                            }
                        ],
                        groups: [
                            {
                                name: "کارشناسان امنیت"
                            },
                        ]
                    },
                    type: "success",
                    detail: ""
                }
            )
        );
    }),
    rest.post(`${getBaseUrl()}message/v1/send`, async (req, res, ctx) => {
        return res(
            ctx.status(200),
            ctx.json(
                {
                    id: 3,
                    status: "complete",
                    request_timestamp: "2023-08-08T06:18:56Z",
                    total: 1,
                    success_count: 1,
                    successes: [
                        {
                            id: 3,
                            title: "string",
                            text: "string",
                            created_date: "2023-10-24T10:16:06.214751"
                        }
                    ],
                    failure_count: 0,
                    pending_count: 0
                }
            )
        );
    }),
];