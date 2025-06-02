import { rest } from "msw";
import {getBaseUrl} from "../../../../config";
export const locations = [
    rest.get(`${getBaseUrl()}reporter/v1/table/location`, async (req, res, ctx) => {
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
                                id: "location--28f84ee3-44fc-4dee-bf53-131efa4830f7",
                                created: "2024-01-02T11:13:41Z",
                                version: "2024-01-02T11:13:41Z",
                                city: "کرمانشاه",
                                postal_code: "test30",
                                modified: "2024-01-02T11:13:41Z",
                                spec_version: "2.1",
                                type: "location",
                                name: "test30",
                                x_short_id: "loc-02-0133ce",
                                x_organization: "x-organization--7f2ac664-a315-465b-9db9-72d5c152dc5c",
                                x_source: "sata",
                                country: "ایران",
                                province: "کرمانشاه",
                                street_address: "test30",
                                object_marking_refs: [
                                    "marking-definition--5e57c739-391a-4eb3-b6be-7d15ca92d5ed"
                                ],
                                x_tlp: "red",
                                x_labels: [
                                    {
                                        name: "test014",
                                        description: "test014",
                                        importance: 2,
                                        count: 1,
                                        is_automated: false,
                                        assignable: true,
                                        unassignable: true,
                                        assigners: [
                                            {
                                                username: "admin",
                                                first_name: "Leila",
                                                last_name: "Fathi",
                                                image_url: "img/profile/2023-10-16-12-02-42-8e5dc4.png"
                                            }
                                        ]
                                    },
                                    {
                                        name: "tag20",
                                        description: null,
                                        importance: 3,
                                        count: 1,
                                        is_automated: false,
                                        assignable: true,
                                        unassignable: true,
                                        assigners: [
                                            {
                                                username: "admin",
                                                first_name: "Leila",
                                                last_name: "Fathi",
                                                image_url: "img/profile/2023-10-16-12-02-42-8e5dc4.png"
                                            }
                                        ]
                                    }
                                ]
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
