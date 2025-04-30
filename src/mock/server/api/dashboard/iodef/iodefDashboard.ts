import { rest } from "msw";
import {getBaseUrl} from "../../../../../config";
export const iodefDashboard = [
    rest.get(`${getBaseUrl()}radar/v1/iodef/count`, async (req, res, ctx) => {
        return res(
            ctx.status(200),
            ctx.json({
                    "last_day": 0,
                    "last_month": 4,
                    "last_year": 28710,
                    "prev_last_day_growth_percent": 0,
                    "prev_last_month_growth_percent": -96.03,
                    "prev_last_year_growth_percent": 2871000,
                    "total": 28710
                }
            )
        );
    }),
    rest.get(`${getBaseUrl()}radar/v1/most-reported-impact-types`, async (req, res, ctx) => {
        return res(
            ctx.status(200),
            ctx.json([
                    {
                        "Result": [
                            {
                                "ImpactType": "recon",
                                "Count": 11631
                            },
                            {
                                "ImpactType": "info-leak",
                                "Count": 11472
                            },
                            {
                                "ImpactType": "social-engineering",
                                "Count": 11441
                            },
                            {
                                "ImpactType": "admin",
                                "Count": 11374
                            },
                            {
                                "ImpactType": "dos",
                                "Count": 7745
                            }
                        ],
                        "Total": 76692
                    }
                ]
            )
        );
    }),
    rest.get(`${getBaseUrl()}radar/v1/most-sourceip-attacks`, async (req, res, ctx) => {
        return res(
            ctx.status(200),
            ctx.json([
                    {
                        "IP": "test1",
                        "Count": 11326
                    },
                    {
                        "IP": "test2",
                        "Count": 11275
                    },
                    {
                        "IP": "test3",
                        "Count": 3815
                    },
                    {
                        "IP": "test4",
                        "Count": 50
                    },
                    {
                        "IP": "test5",
                        "Count": 22
                    }
                ]
            )
        );
    }),
    rest.get(`${getBaseUrl()}radar/v1/most-sourceport-attacks`, async (req, res, ctx) => {
        return res(
            ctx.status(200),
            ctx.json([
                    {
                        "Result": [
                            {
                                "Port": "2030",
                                "Count": 3786
                            },
                            {
                                "Port": "80",
                                "Count": 20
                            },
                            {
                                "Port": "702",
                                "Count": 8
                            },
                            {
                                "Port": "519",
                                "Count": 6
                            },
                            {
                                "Port": "731",
                                "Count": 5
                            }
                        ],
                        "Total": 4165
                    }
                ]
            )
        );
    }),


    rest.get(`${getBaseUrl()}radar/v1/most-application-by-sender`, async (req, res, ctx) => {
        return res(
            ctx.status(200),
            ctx.json([
                    {
                        "applications": [
                            {
                                "count": 51,
                                "name": "adlt--random-3137"
                            },
                            {
                                "count": 47,
                                "name": "adlt--random-3133"
                            },
                            {
                                "count": 44,
                                "name": "adlt--random-3132"
                            },
                            {
                                "count": 40,
                                "name": "adlt--random-3136"
                            },
                            {
                                "count": 40,
                                "name": "adlt--random-3134"
                            }
                        ],
                        "sender_name": "Melli-1"
                    },
                    {
                        "applications": [
                            {
                                "count": 58,
                                "name": "adlt--random-3136"
                            },
                            {
                                "count": 46,
                                "name": "adlt--random-3137"
                            },
                            {
                                "count": 41,
                                "name": "adlt--random-3132"
                            },
                            {
                                "count": 36,
                                "name": "adlt--random-3133"
                            },
                            {
                                "count": 35,
                                "name": "adlt--random-3134"
                            }
                        ],
                        "sender_name": "Kashef-1"
                    },
                    {
                        "applications": [
                            {
                                "count": 44,
                                "name": "adlt--random-3137"
                            },
                            {
                                "count": 35,
                                "name": "adlt--random-3132"
                            },
                            {
                                "count": 34,
                                "name": "adlt--random-3136"
                            },
                            {
                                "count": 31,
                                "name": "adlt--random-3135"
                            },
                            {
                                "count": 29,
                                "name": "adlt--random-3133"
                            }
                        ],
                        "sender_name": "Saman-1"
                    },
                    {
                        "applications": [
                            {
                                "count": 45,
                                "name": "hass"
                            },
                            {
                                "count": 17,
                                "name": "تست"
                            },
                            {
                                "count": 2,
                                "name": "RRRRRRRRRRR"
                            },
                            {
                                "count": 1,
                                "name": "RPC"
                            }
                        ],
                        "sender_name": "bluebank-1"
                    },
                    {
                        "applications": [
                            {
                                "count": 3,
                                "name": "adlt--random-3134"
                            },
                            {
                                "count": 1,
                                "name": "adlt--random-3136"
                            },
                            {
                                "count": 1,
                                "name": "adlt--random-3433"
                            },
                            {
                                "count": 1,
                                "name": "adlt--random-3135"
                            },
                            {
                                "count": 1,
                                "name": "adlt--random-3339"
                            }
                        ],
                        "sender_name": "Informatics-Services-1"
                    }
                ]
            )
        );
    }),
];