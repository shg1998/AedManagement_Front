import { rest } from "msw";
import {getBaseUrl} from "../../../../config";
export const groups = [
    rest.get(`${getBaseUrl()}user/v1/group/`, async (req, res, ctx) => {
        return res(
            ctx.status(200),
            ctx.json({
                    data: {
                        total: 1,
                        page: 1,
                        size: 10,
                        items: [
                            {
                                name: "grp",
                                description: "grp",
                                is_active: false,
                                id: 6,
                                creator: {
                                    username: "admin",
                                    first_name: "first_user",
                                    last_name: "last_user"
                                },
                                created_date: "2023-06-19T13:08:46.442509",
                                roles: [
                                    {
                                        name: "نقش جدید",
                                        description: "توضیحات",
                                        permissions: [
                                            {
                                                section_name: "user",
                                                module_name: "organization",
                                                get_access: 1,
                                                create_access: 1,
                                                update_access: 1,
                                                delete_access: 1
                                            },
                                            {
                                                section_name: "admin",
                                                module_name: "enrichment",
                                                get_access: 0,
                                                create_access: 0,
                                                update_access: 0,
                                                delete_access: 0
                                            },
                                            {
                                                section_name: "dashboard",
                                                module_name: "iodef",
                                                get_access: 1,
                                                create_access: 0,
                                                update_access: 0,
                                                delete_access: 0
                                            }
                                        ],
                                        id: 67,
                                        creator: {
                                            username: "admin",
                                            first_name: "first_user",
                                            last_name: "last_user"
                                        },
                                        created_date: "2023-07-19T07:18:13.261002"
                                    }
                                ]
                            },
                        ]
                    },
                    type: "success",
                    message: ""
                }
            )
        );
    }),
    rest.post(`${getBaseUrl()}user/v1/group/111111`, async (req, res, ctx) => {

        return res(
            ctx.status(200),
            ctx.json(
                {
                    data: {
                        name: "serser",
                        description: null,
                        is_active: true,
                        id: 40,
                        creator: {
                            username: "admin",
                            first_name: "Leila",
                            last_name: "Fathi",
                            image_url: "img/profile/2023-10-16-12-02-42-8e5dc4.png"
                        },
                        created_date: "2024-01-30T05:49:55.806521",
                        roles: []
                    },
                    type: "success",
                    detail: ""
                }
            )
        );
    }),
    rest.get(`${getBaseUrl()}user/v1/group/details/6`, (req, res, ctx) => {
        const groupId = req.url.searchParams.get('id')
        return res(
            ctx.status(200),
            ctx.json(
                {
                    data: {
                        name: "grp",
                        description: "grp",
                        is_active: true,
                        id: Number(groupId),
                        creator: {
                            username: "admin",
                            first_name: "first_user",
                            last_name: "last_user"
                        },
                        created_date: "2023-06-19T13:08:46.442509",
                        roles: [
                            {
                                name: "test001",
                                description: "test001",
                                permissions: [
                                    {
                                        section_name: "user",
                                        module_name: "organization",
                                        get_access: 0,
                                        create_access: 1,
                                        update_access: 0,
                                        delete_access: 0
                                    }
                                ],
                                id: 78,
                                creator: {
                                    username: "admin",
                                    first_name: "first_user",
                                    last_name: "last_user"
                                },
                                created_date: "2023-07-23T07:51:20.503812"
                            }
                        ],
                        users: [
                            {
                                email: "a@aaaa.com",
                                mobile: "09360549003",
                                description: "test",
                                first_name: "test007",
                                last_name: "test007",
                                image_url: "",
                                status: "active",
                                username: "test007",
                                id: 80,
                                organization_id: "x-organization--3b4575b3-58e8-4289-a6a6-15fec7b48c06",
                                group_count: 1,
                                is_deleted: false,
                                taxii_uuid: "identity--731dbe2d-2458-4ce2-8a52-72823d0eac7b"
                            },
                        ],
                        group_members: [],
                        joined_groups: []
                    },
                    type: "success",
                    message: ""
                }
        ),
        )
    }),
    rest.delete(`${getBaseUrl()}user/v1/group/6/111111`, (req, res, ctx) => {

        return res(
            ctx.status(200),
            ctx.json({
                data: "string",
                type: "success",
                message: "string"
            })
        )
    }),

    rest.put(`${getBaseUrl()}user/v1/group/6/111111`, (req, res, ctx) => {

        return res(
            ctx.status(200),
            ctx.json({
                data: "string",
                type: "success",
                message: "string"
            })
        )
    }),
];
