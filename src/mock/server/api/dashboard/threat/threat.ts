import { rest } from "msw";
import {getBaseUrl} from "../../../../../config";
export const threatDashboard = [
    rest.get(`${getBaseUrl()}reporter/v1/dashboard_threat_actor/count`, async (req, res, ctx) => {
        return res(
            ctx.status(200),
            ctx.json({
                    "data": {
                        "campaign": {
                            "Last": 4,
                            "Percent": 400
                        },
                        "threat-actor": {
                            "Last": 728,
                            "Percent": 72800
                        },
                        "intrusion-set": {
                            "Last": 1,
                            "Percent": 100
                        },
                        "total": {
                            "Last": 733,
                            "Percent": 73300
                        }
                    },
                    "type": "success",
                    "detail": ""
                }
            )
        );
    }),
    rest.get(`${getBaseUrl()}reporter/v1/dashboard_threat_actor/type`, async (req, res, ctx) => {
        return res(
            ctx.status(200),
            ctx.json({
                    "data": {
                        "result": {
                            "competitor": 196,
                            "unknown": 191,
                            "criminal": 190,
                            "crime-syndicate": 189,
                            "spy": 188,
                            "insider-accidental": 182,
                            "insider-disgruntled": 176,
                            "terrorist": 174,
                            "nation-state": 173,
                            "sensationalist": 166
                        }
                    },
                    "type": "success",
                    "detail": ""
                }
            )
        );
    }),
    rest.get(`${getBaseUrl()}reporter/v1/dashboard_threat_actor/most_goal`, async (req, res, ctx) => {
        return res(
            ctx.status(200),
            ctx.json({
                    "data": {
                        "result": {
                            "goal--120": 10,
                            "goal--732": 9,
                            "goal--576": 8,
                            "goal--246": 8,
                            "goal--989": 8,
                            "goal--836": 7,
                            "goal--609": 7,
                            "goal--859": 7,
                            "goal--889": 7,
                            "goal--350": 7
                        }
                    },
                    "type": "success",
                    "detail": ""
                }
            )
        );
    }),
    rest.get(`${getBaseUrl()}reporter/v1/dashboard_threat_actor/most_sophistication`, async (req, res, ctx) => {
        return res(
            ctx.status(200),
            ctx.json({
                    "data": {
                        "result": {
                            "advanced": 114,
                            "intermediate": 111,
                            "strategic": 106,
                            "innovator": 103,
                            "minimal": 100,
                            "none": 99,
                            "expert": 92
                        }
                    },
                    "type": "success",
                    "detail": ""
                }
            )
        );
    }),

    rest.get(`${getBaseUrl()}reporter/v1/dashboard_threat_actor/most_primary_motivation`, async (req, res, ctx) => {
        return res(
            ctx.status(200),
            ctx.json({
                    "data": {
                        "result": {
                            "organizational-gain": 86,
                            "dominance": 83,
                            "ideology": 80,
                            "revenge": 75,
                            "personal-gain": 75,
                            "coercion": 73,
                            "accidental": 69,
                            "unpredictable": 67,
                            "notoriety": 62,
                            "personal-satisfaction": 58
                        }
                    },
                    "type": "success",
                    "detail": ""
                }
            )
        );
    }),

    rest.get(`${getBaseUrl()}reporter/v1/dashboard_threat_actor/most_resource_level`, async (req, res, ctx) => {
        return res(
            ctx.status(200),
            ctx.json({
                    "data": {
                        "result": {
                            "contest": 131,
                            "team": 122,
                            "organization": 122,
                            "individual": 121,
                            "government": 119,
                            "club": 113
                        }
                    },
                    "type": "success",
                    "detail": ""
                }
            )
        );
    }),

    rest.get(`${getBaseUrl()}reporter/v1/dashboard_threat_actor/most_role`, async (req, res, ctx) => {
        return res(
            ctx.status(200),
            ctx.json({
                    "data": {
                        "result": {
                            "infrastructure-operator": 336,
                            "agent": 334,
                            "independent": 321,
                            "malware-author": 310,
                            "infrastructure-architect": 309,
                            "director": 303,
                            "sponsor": 297
                        }
                    },
                    "type": "success",
                    "detail": ""
                }
            )
        );
    }),

    rest.get(`${getBaseUrl()}reporter/v1/dashboard_threat_actor/opportunity_ability_threat`, async (req, res, ctx) => {
        return res(
            ctx.status(200),
            ctx.json({
                data: [
                    {
                        x_short_id: "vul-02-f0499b",
                        description: "vulnerability_description--711",
                        external_references: [
                            {
                                source_name: "cve",
                                external_id: "CVE-2023-66666"
                            }
                        ],
                        base_score: 6.8
                    },
                    {
                        x_short_id: "vul-02-f0488b",
                    },

                ]}
            )
        );
    }),

    rest.get(`${getBaseUrl()}reporter/v1/dashboard_threat_actor/most_effective`, async (req, res, ctx) => {
        return res(
            ctx.status(200),
            ctx.json({
                    "data": {
                        "result": {
                            "threat_actor_name--517": 10,
                            "threat_actor_name--931": 9,
                            "threat_actor_name--977": 8,
                            "threat_actor_name--465": 7,
                            "threat_actor_name--346": 7,
                            "threat_actor_name--176": 7,
                            "threat_actor_name--774": 7,
                            "threat_actor_name--623": 6,
                            "threat_actor_name--806": 6,
                            "threat_actor_name--698": 5
                        }
                    },
                    "type": "success",
                    "detail": ""
                }
            )
        );
    }),
];