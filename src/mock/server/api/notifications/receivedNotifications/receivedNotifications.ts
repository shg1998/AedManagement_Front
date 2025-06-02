import { rest } from "msw";
import {getBaseUrl} from "../../../../../config";
export const receivedNotifications = [
    rest.get(`${getBaseUrl()}message/v1`, async (req, res, ctx) => {
        return res(
            ctx.status(200),
            ctx.json({
                    data: {
                        items: [
                            {
                                message_id: 3,
                                sender_id: 1,
                                sender_username: "admin",
                                sender_first_name: "first_user",
                                sender_last_name: "last_user",
                                sender_image_url: "img/profile/2023-10-16-12-02-42-8e5dc4.png",
                                title: "string",
                                summary: "string",
                                is_read: true
                            },
                            {
                                message_id: 3,
                                sender_id: 1,
                                sender_username: "admin",
                                sender_first_name: "first_user",
                                sender_last_name: "last_user",
                                sender_image_url: "img/profile/2023-10-16-12-02-42-8e5dc4.png",
                                title: "string2",
                                summary: "string2",
                                is_read: false
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
    rest.get(`${getBaseUrl()}message/v1/details/3`, async (req, res, ctx) => {
        return res(
            ctx.status(200),
            ctx.json({
                    data: {
                        message_id: 3,
                        sender_id: 1,
                        sender_username: "admin",
                        sender_first_name: "first_user",
                        sender_last_name: "last_user",
                        sender_image_url: "img/profile/2023-10-16-12-02-42-8e5dc4.png",
                        title: "string",
                        summary: "string",
                        is_read: true,
                        read_date: "2023-10-24T10:16:53.974544",
                        text: "string"
                    },
                    type: "success",
                    detail: ""
                }
            )
        );
    }),
];