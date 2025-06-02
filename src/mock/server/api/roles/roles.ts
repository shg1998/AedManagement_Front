import { rest } from "msw";
import {getBaseUrl} from "../../../../config";
export const roles = [
    rest.get(`${getBaseUrl()}user/v1/role`, async (req, res, ctx) => {
        return res(
            ctx.status(200),
            ctx.json({
                    data: {
                        total: 1,
                        page: 1,
                        size: 10,
                        filter_fields: [],
                        items: [
                            {
                                created_date: "2023-08-15T08:14:55.939066",
                                creator:{
                                    first_name: "first_user",
                                    last_name: "last_user",
                                    username: "admin"
                                },
                                description: "organizational access to iodef",
                                id: 95,
                                name: "sanatmadan1_iodef",
                                permissions: [
                                    {
                                        create_access: 2,
                                        delete_access: 2,
                                        get_access: 2,
                                        module_name: "iodef",
                                        section_name: "user",
                                        update_access: 2
                                    }
                                ]
                            },
                        ],
                    },
                    type: "success",
                    message: ""
                }
            )
        );
    }),
    rest.post(`${getBaseUrl()}user/v1/role/111111`, async (req, res, ctx) => {
        return res(
            ctx.status(202),
            ctx.json(
                {
                    data: {
                        name: "test777",
                        description: "test777",
                        permissions: [
                            {
                                section_name: "dashboard",
                                module_name: "iodef",
                                get_access: 1,
                                create_access: 0,
                                update_access: 0,
                                delete_access: 0
                            }
                        ],
                        id: 131,
                        creator: {
                            username: "admin",
                            first_name: "Leila",
                            last_name: "Fathi",
                            image_url: "img/profile/2023-10-16-12-02-42-8e5dc4.png"
                        },
                        created_date: "2024-01-29T10:34:43.422345"
                    },
                    type: "success",
                    detail: ""
                }
            )
        );
    }),
];
