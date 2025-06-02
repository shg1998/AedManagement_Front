import { rest } from "msw";
import {getBaseUrl} from "../../../../config";
export const organizationTag = [
    rest.get(`${getBaseUrl()}taxii/v1/kashef/collections/sata/organization-tag`, async (req, res, ctx) => {
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
                                id: "3ce5b0de",
                                title: "نهاد بالادست",
                                tlp: "red",
                                created: "2024-01-02T13:17:14.057Z",
                                modified: "2024-01-06T13:02:48.752Z",
                                creator: {
                                    username: "admin",
                                    first_name: "Leila",
                                    last_name: "Fathi",
                                    image_url: "img/profile/2023-10-16-12-02-42-8e5dc4.png"
                                }
                            }
                        ]
                    },
                    type: "success",
                    message: ""
                }
            )
        );
    }),
    rest.post(`${getBaseUrl()}taxii/v1/kashef/collections/sata/organization-tag`, async (req, res, ctx) => {
        return res(
            ctx.status(200),
            ctx.json({
                    data: "",
                    detail: "تگ با موفقیت ایجاد شد."
                }
            )
        );
    }),
];
