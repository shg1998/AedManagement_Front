import { rest } from "msw";
import {getBaseUrl} from "../../../../config";
export const users = [
    rest.get(`${getBaseUrl()}user/v1`, async (req, res, ctx) => {
        return res(
            ctx.status(200),
            ctx.json({
                    data: {
                        total: 1,
                        page: 1,
                        size: 10,
                        items: [
                            {
                                email: "a_feyzi@kashef.ir",
                                mobile: "09351843001",
                                authentication_method: "email",
                                description: null,
                                first_name: "Leila",
                                last_name: "Fathi",
                                image_url: "img/profile/2023-10-16-12-02-42-8e5dc4.png",
                                status: "active",
                                username: "admin",
                                id: 1,
                                organization_id: "x-organization--7f2ac664-a315-465b-9db9-72d5c152dc5c",
                                group_count: 0,
                                is_deleted: false,
                                taxii_uuid: ""
                            }
                        ]
                    },
                    type: "success",
                    message: ""
                }
            )
        );
    }),
    rest.post(`${getBaseUrl()}user/v1/111111`, async (req, res, ctx) => {
        return res(
            ctx.status(202),
            ctx.json(
                {
                    email: "shahabht1@gmail.com",
                    mobile: "09365874444",
                    description: "",
                    first_name: "",
                    last_name: "",
                    image_url: "",
                    status: "active",
                    username: "test",
                    id: 103,
                    organization_id: "x-organization--2ee6859b-b615-4e86-8e93-fac487263303",
                    group_count: 0,
                    is_deleted: false,
                    taxii_uuid: "identity--49521718-d588-42c4-88ca-3a9222c017d0"
                }
            )
        );
    }),
    rest.get(`${getBaseUrl()}user/v1/details/1`, (req, res, ctx) => {
        return res(
            ctx.json(
                {
                    data: {
                        email: "a_feyzi@kashef.ir",
                        mobile: "09351843001",
                        authentication_method: "email",
                        description: null,
                        first_name: "Leila",
                        last_name: "Fathi",
                        image_url: "img/profile/2023-10-16-12-02-42-8e5dc4.png",
                        status: "active",
                        username: "admin",
                        id: 1,
                        organization_id: "x-organization--7f2ac664-a315-465b-9db9-72d5c152dc5c",
                        group_count: 0,
                        is_deleted: false,
                        taxii_uuid: "",
                        created: "2023-05-23T09:00:52.637689",
                        last_login: "2024-01-29T11:58:02.516642",
                        last_logout: "2023-10-17T11:01:51.641963",
                        roles: [],
                        groups: [],
                        permissions: [],
                        organization_name: "Puya"
                    },
                    type: "success",
                    message: ""
                }
            ),
        )
    }),
    rest.delete(`${getBaseUrl()}user/v1/1/111111`, (req, res, ctx) => {

        return res(
            ctx.status(200),
            ctx.json({
                data: "string",
                type: "success",
                message: "string"
            })
        )
    }),
    rest.put(`${getBaseUrl()}user/v1/1/111111`, (req, res, ctx) => {
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
