import { rest } from "msw";
import {getBaseUrl} from "../../../../config";
export const alarms = [
    rest.get(`${getBaseUrl()}alarm/v1/`, async (req, res, ctx) => {
        return res(
            ctx.status(200),
            ctx.json(
                {
                    data: {
                        items: [
                            {
                                id: 3, title: "تست هشدار",
                                summary: "تست متن هشدار", creator_user_id: 1, creator_username: "admin",
                                creator_first_name: "first_user", creator_last_name: "last_user",
                                creator_image_url: "img/profile/2023-10-16-12-02-42-8e5dc4.png"
                            }
                        ],
                        total: 1,
                        page: 1,
                        size: 10
                    },
                    type: "success",
                    detail: ""
                }
            )
        );
    }),
    rest.delete(`${getBaseUrl()}alarm/v1/3`, async (req, res, ctx) => {
        return res(
            ctx.status(200),
            ctx.json({
                    data: {
                        id: 3, title: "تست هشدار", summary: "تست متن هشدار"
                    },
                    type: "success", detail: ""
                }
            )
        );
    }),
    rest.get(`${getBaseUrl()}alarm/v1/detail/3`, async (req, res, ctx) => {
        return res(
            ctx.status(200),
            ctx.json(
                {
                    data: {
                        id: 3, title: "تست هشدار", summary: "تست متن هشدار",
                        creator_user_id: 1, creator_username: "admin",
                        creator_first_name: "first_user", creator_last_name: "last_user",
                        creator_image_url: "img/profile/2023-10-16-12-02-42-8e5dc4.png",
                        description: "توضیحات تستی",
                        saved_search: {
                            id: "4ee5d9b58892a069739f480a69f28c5d",
                            title: "test11",
                            raw_query: "filter=type='iodef' and (document.Incidents.EventDataList.Flows.Systems.category = 'source' and document.Incidents.EventDataList.Flows.Systems.Node.Addresses.data = '192.0.2.200')",
                            creator_user_id: 1,
                            filter_fields: [
                                "type",
                                "document.Incidents.EventDataList.Flows.Systems.category",
                                "document.Incidents.EventDataList.Flows.Systems.Node.Addresses.data"
                            ]
                        },
                        text: "تست متن هشدار", prevent_repeated_alarm_hour: 0,
                        raise_hit_count: 5, check_period_step: 10,
                        check_period_range: "minutes",
                        range_step: 1, range_type: "day",
                        alert_channels: [
                            "app"
                        ],
                        users: [
                            {
                                id: 93, username: "p_shekari", first_name: "Pouya",
                                last_name: "Shekari", image_url: "img/profile/2023-08-09-05-40-14-2be251.png"
                            }
                        ],
                        groups: []
                    },
                    type: "success",
                    detail: ""
                }
            )
        );
    }),
    rest.get(`${getBaseUrl()}alarm/v1/triggered_alarm/3`, async (req, res, ctx) => {
        return res(
            ctx.status(200),
            ctx.json(
                {
                    data: {
                        items: [
                            {
                                id: 1, sms_id: null,
                                email_id: null, message_id: null,
                                message: "تست متن هشدار", created_date: "2023-11-12T04:45:58.028488", alarm_id: 3
                            }
                        ],
                        total: 1, page: 1, size: 10
                    },
                    type: "success", detail: ""
                }
            )
        );
    }),
];
