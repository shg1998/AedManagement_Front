import { rest } from "msw";
import {getBaseUrl} from "../../../../config";
export const reports = [
    rest.get(`${getBaseUrl()}reporter/v1/sharing/`, async (req, res, ctx) => {
        return res(
            ctx.status(200),
            ctx.json(

                {
                    data: {
                        items: [
                            {
                                object_id: "x-incident--c2a33632-8ab7-4ffc-b6ac-b1f0765856c5",
                                title: "sss",
                                importance: "low",
                                id: "x-incident--c2a33632-8ab7-4ffc-b6ac-b1f0765856c5-1-1706528405514",
                                shared_by: {
                                    username: "admin",
                                    first_name: "Leila",
                                    last_name: "Fathi",
                                    image_url: "img/profile/2023-10-16-12-02-42-8e5dc4.png"
                                },
                                created: "2024-01-29T11:40:05.514000",
                                organizations: [
                                    {
                                        name: "Puya",
                                        id: "x-organization--7f2ac664-a315-465b-9db9-72d5c152dc5c"
                                    }
                                ],
                                organization_count: 1,
                                object_tlp: "red",
                                is_read: true
                            },
                            {
                                object_id: "attack-pattern--63dec20c-f054-4bf0-81a5-d99287a42e1b",
                                title: "test06",
                                importance: "medium",
                                id: "attack-pattern--63dec20c-f054-4bf0-81a5-d99287a42e1b-1-1705321565621",
                                shared_by: {
                                    username: "admin",
                                    first_name: "Leila",
                                    last_name: "Fathi",
                                    image_url: "img/profile/2023-10-16-12-02-42-8e5dc4.png"
                                },
                                created: "2024-01-15T12:26:05.621000",
                                organizations: [
                                    {
                                        name: "Puya",
                                        id: "x-organization--7f2ac664-a315-465b-9db9-72d5c152dc5c"
                                    }
                                ],
                                organization_count: 1,
                                object_tlp: "green",
                                is_read: true
                            },
                        ],
                        total: 2,
                        page: 1,
                        size: 2,
                        filter_fields: []
                    },
                    type: "success",
                    detail: ""
                }
            )
        );
    }),
    rest.patch(`${getBaseUrl()}reporter/v1/sharing/read/x-incident--c2a33632-8ab7-4ffc-b6ac-b1f0765856c5-1-1706528405514`, async (req, res, ctx) => {
        return res(
            ctx.status(200),
            ctx.json(
                {
                    data: "",
                    type: "success",
                    detail: "شی به اشتراک گذاشته شده با موفقیت خوانده شد."
                }
            )
        );
    }),
];
