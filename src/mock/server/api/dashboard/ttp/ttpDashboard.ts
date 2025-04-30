import { rest } from "msw";
import {getBaseUrl} from "../../../../../config";
export const ttpDashboard = [
    rest.get(`${getBaseUrl()}reporter/v1/dashboard-situation/recent_reports`, async (req, res, ctx) => {
        return res(
            ctx.status(200),
            ctx.json({
                    "data": [
                        {
                            "report_types": [
                                "intrusion-set",
                                "incident"
                            ],
                            "version": "2023-07-29T08:24:22Z",
                            "created_by_ref": "identity--a8e78952-7a75-4a4d-b6c3-44c3007de616",
                            "id": "report--d5d3de06-88c9-4b42-8160-a8d1637a8bb6",
                            "object_marking_refs": [
                                "marking-definition--f88d31f6-486f-44da-b317-01333bde0b82"
                            ],
                            "published": "1988-10-04T06:52:05+03:30",
                            "type": "report",
                            "modified": "1990-10-30T08:52:05+03:30",
                            "name": "report_name--998",
                            "object_refs": [
                                "location--792e86ef-56ea-425b-9e90-a5d6751c1137",
                                "relationship--d16d59aa-f056-4cc7-9f67-0e80db9cdacb",
                                "course-of-action--a18fc294-727b-4324-b4c9-05796bf96648",
                                "indicator--ed41a1ff-f505-4f65-bc66-3b235c453cc2",
                                "relationship--719676a8-9d6c-4ac6-812b-aa268a9abc88",
                                "relationship--b5a39593-27ad-44dc-99f9-fcadc6d464ed",
                                "relationship--f703f9e5-e210-433c-8f09-f20c5a0d00da",
                                "attack-pattern--0ad7bc5c-235a-4048-944b-3b286676cb74",
                                "x-mitre-data-source--1ac0ca69-e07e-4b34-9061-e4588e146c52",
                                "relationship--7c60bccc-f485-403d-ab3b-db861a3a4429"
                            ],
                            "x_organization": "x-organization--50308e94-a946-421d-b1cb-9203f63146dc",
                            "spec_version": "2.1",
                            "x_short_id": "rep-02-253fe4",
                            "created": "1976-02-27T16:52:05+03:30",
                            "x_source": "sata",
                            "x_importance": "medium",
                            "x_creator_name": "Unknown",
                            "x_tlp": "orange"
                        },
                    ],
                    "type": "success",
                    "detail": ""
                }
            )
        );
    }),
    rest.get(`${getBaseUrl()}reporter/v1/dashboard-TTP/count`, async (req, res, ctx) => {
        return res(
            ctx.status(200),
            ctx.json({
                    "data": {
                        "tool": {
                            "Last": 1630,
                            "Percent": 163000.0
                        },
                        "malware": {
                            "Last": 2689,
                            "Percent": 268900.0
                        },
                        "attack_pattern": {
                            "Last": 2146,
                            "Percent": 214600.0
                        },
                        "ttp": {
                            "Last": 6465,
                            "Percent": 646500.0
                        }
                    },
                    "type": "success",
                    "detail": ""
                }
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
    rest.get(`${getBaseUrl()}reporter/v1/dashboard-TTP/malware_most_type`, async (req, res, ctx) => {
        return res(
            ctx.status(200),
            ctx.json({
                    "data": [
                        {
                            "result": {
                                "screen-capture": 543,
                                "spyware": 525,
                                "wiper": 525,
                                "remote-access-trojan": 520,
                                "resource-exploitation": 515,
                                "dropper": 514,
                                "adware": 514,
                                "downloader": 503,
                                "ddos": 494,
                                "trojan": 491
                            }
                        }
                    ],
                    "type": "success",
                    "detail": ""
                }
            )
        );
    }),


    rest.get(`${getBaseUrl()}reporter/v1/dashboard-TTP/malware_most_detected`, async (req, res, ctx) => {
        return res(
            ctx.status(200),
            ctx.json({
                    "data": [
                        {
                            "result": {
                                "malware_name--128": 10,
                                "malware_name--273": 9,
                                "malware_name--849": 9,
                                "malware_name--836": 9,
                                "malware_name--533": 9,
                                "malware_name--325": 9,
                                "malware_name--844": 9,
                                "malware_name--314": 9,
                                "malware_name--609": 8,
                                "malware_name--894": 8
                            }
                        }
                    ],
                    "type": "success",
                    "detail": ""
                }
            )
        );
    }),


    rest.get(`${getBaseUrl()}reporter/v1/dashboard-TTP/attack_pattern_most_name`, async (req, res, ctx) => {
        return res(
            ctx.status(200),
            ctx.json({
                    "data": [
                        {
                            "result": {
                                "attack-pattern--462": 9,
                                "attack-pattern--615": 9,
                                "attack-pattern--693": 9,
                                "attack-pattern--611": 9,
                                "attack-pattern--466": 9,
                                "attack-pattern--150": 8,
                                "attack-pattern--325": 8,
                                "attack-pattern--935": 7,
                                "attack-pattern--736": 7,
                                "attack-pattern--787": 7
                            }
                        }
                    ],
                    "type": "success",
                    "detail": ""
                }
            )
        );
    }),
];