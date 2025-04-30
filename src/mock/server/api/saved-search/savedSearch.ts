import { rest } from "msw";
import {getBaseUrl} from "../../../../config";
export const savedSearch = [
    rest.get(`${getBaseUrl()}reporter/v1/saved_search`, async (req, res, ctx) => {
        return res(
            ctx.status(200),
            ctx.json(
                {
                    data: {
                        total: 2, page: 1, size: 2, filter_fields: [],
                        items: [
                            {
                                title: "test1", description: null,
                                query: "filter=type='malware' and (x_short_id = 'mal-02-56a511' and malware_types = 'spyware')",
                                id: "5dd4e8bf20b577a8451042107f5aa392",
                                created_date: "2023-11-04T09:57:30.146076"
                            },
                            {
                                title: "test2",
                                description: null,
                                query: "filter=type='malware' and (x_short_id = 'mal-02-56a511' or malware_types = 'spyware')",
                                id: "88b58f2c1deaa10c67f23bd1964d57e0", created_date: "2023-11-04T09:59:55.934433"
                            },
                        ]
                    },
                    type: "success", detail: ""
                }
            )
        );
    }),
    rest.delete(`${getBaseUrl()}reporter/v1/saved_search/5dd4e8bf20b577a8451042107f5aa392`, async (req, res, ctx) => {
        return res(
            ctx.status(200),
            ctx.json({
                    data: {
                        title: "test500",
                        description: null,
                        query: "filter=type='campaign' and (x_short_id = 'cam-02-aa3012')",
                        id: "5dd4e8bf20b577a8451042107f5aa392",
                        created_date: "2023-11-07T12:43:52.627068"
                    },
                    type: "success",
                    detail: ""
                }
            )
        );
    }),
];