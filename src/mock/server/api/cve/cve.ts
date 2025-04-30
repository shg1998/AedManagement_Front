import { rest } from "msw";
import {getBaseUrl} from "../../../../config";
export const cve = [
    rest.get(`${getBaseUrl()}reporter/v1/table/x-cve`, async (req, res, ctx) => {
        return res(
            ctx.status(200),
            ctx.json({
                    data: {
                        total: 2,
                        page: 1,
                        size: 2,
                        items: [
                            {
                                id: "x-cve--bed817e9-c6a9-42ae-97bc-62986cfc40be",
                                modified: "2023-08-15T17:07:12.596Z",
                                x_short_id: "cve-02-361c24",
                                created: "2023-08-15T17:07:12.596Z",
                                cve_id: "CVE-2023-4359",
                                description: "Inappropriate implementation in App Launcher in Google Chrome on iOS prior to 116.0.5845.96 allowed a remote attacker to potentially spoof elements of the security UI via a crafted HTML page. (Chromium security severity: Medium)",
                                assets: [
                                    "cpe:2.3:a:microsoft:edge_chromium:*:*:*:*:*:*:*:*"
                                ],
                                base_score: null,
                                external_references: [
                                    {
                                        source_name: 'cve',
                                        url: "test"
                                    },
                                    {
                                        url: "test"
                                    }
                                ],
                                x_labels: [
                                    {
                                        name: "fff",
                                        description: null,
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
                                    }
                                ]
                            },
                            {
                                created: "2023-08-07T17:15:43.465Z",
                                id: "x-cve--f8443d98-0d0b-460c-8c62-deb5dc93c628",
                                modified: "2023-08-26T00:14:33.735Z",
                                x_short_id: "cve-02-cc367a",
                                cve_id: "CVE-2023-38157",
                                description: "Microsoft Edge (Chromium-based) Security Feature Bypass Vulnerability",
                                assets: [],
                                base_score: 6.5,
                                external_references: [],
                                x_labels: [
                                    {
                                        name: "fff",
                                        description: null,
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

    rest.get(`${getBaseUrl()}reporter/v1/details/related/x-cve--bed817e9-c6a9-42ae-97bc-62986cfc40be`, async (req, res, ctx) => {
        return res(
            ctx.status(200),
            ctx.json({
                    data: {total: 1,
                        page: 1, size: 1,
                        items: [
                            {
                                id: "intrusion-set--c93fccb1-e8e8-42cf-ae33-2ad1d183913a", relationship_type: "uses",
                                x_direction: "ingoing", x_short_id: "int-02-0d2fef", x_source: "att&ck", name: "Lazarus Group", type: "intrusion-set"
                            },
                        ]
                    },
                    type: "success", message: ""
                }
            )
        );
    }),

    rest.get(`${getBaseUrl()}reporter/v1/details/related/x-cve--bed817e9-c6a9-42ae-97bc-62986cfc40be`, async (req, res, ctx) => {
        return res(
            ctx.status(200),
            ctx.json({
                    data: {
                        "id": "bundle--bd31f089-dc05-45fe-9bd0-31fc6e9227b4",
                        "objects":
                            [
                                {
                                    "x_organization": "x-organization--cf938bd4-e6d2-4183-a348-ca0171058580",
                                    "object_marking_refs": [
                                        "marking-definition--17d82bb2-eeeb-4898-bda5-3ddbcd2b799d"
                                    ],
                                    "x_capec_child_of_refs": [
                                        "attack-pattern--e9d5d2e4-588f-43c1-bc98-73417abbb727"
                                    ],
                                    "x_capec_skills_required": {"Low": "This technique has been demonstrated by amateur hackers and commercial tools and open source projects are available to automate the attack."},
                                    "x_capec_version": "3.9",
                                    "spec_version": "2.1",
                                    "created": "2015-11-09T00:00:00.000Z",
                                    "x_creator_refs": [
                                        1
                                    ],
                                    "x_capec_consequences": {"Confidentiality": ["Read Data (Intercept and control cellular data communications to/from mobile device.)"]},
                                    "description": "In this attack scenario, the attacker imitates a cellular base station with their own rogue base station equipment. Since cellular devices connect to whatever station has the strongest signal, the attacker can easily convince a targeted cellular device (e.g. the retransmission device) to talk to the rogue base station.",
                                    "type": "attack-pattern",
                                    "x_capec_status": "Draft",
                                    "x_short_id": "att-02-3b201c",
                                    "version": "2023-08-26T09:02:57Z",
                                    "x_capec_domains": [
                                        "Communications",
                                        "Hardware"
                                    ],
                                    "x_source": "CAPEC",
                                    "x_capec_typical_severity": "Low",
                                    "name": "Cellular Rogue Base Station",
                                    "x_capec_prerequisites": [
                                        "None"
                                    ],
                                    "modified": "2022-09-29T00:00:00.000Z",
                                    "created_by_ref": "identity--e50ab59c-5c4f-4d40-bf6a-d58418d89bcd",
                                    "id": "attack-pattern--fff5e678-9e98-4e12-b054-119ff429e214",
                                    "x_capec_abstraction": "Detailed",
                                    "external_references": [{"external_id": "CAPEC-617", "source_name": "capec", "url": "https://capec.mitre.org/data/definitions/617.html"}]
                                },
                                {
                                    "x_organization": "x-organization--cf938bd4-e6d2-4183-a348-ca0171058580",
                                    "object_marking_refs": [
                                        "marking-definition--17d82bb2-eeeb-4898-bda5-3ddbcd2b799d"
                                    ],
                                    "x_capec_version": "3.9",
                                    "spec_version": "2.1",
                                    "created": "2015-11-09T00:00:00.000Z",
                                    "x_creator_refs": [
                                        1
                                    ],
                                    "description": "Passively monitor cellular network connection for real-time threat detection and logging for manual review.",
                                    "type": "course-of-action",
                                    "x_short_id": "cou-02-4c40fb",
                                    "version": "2023-08-26T09:02:57Z",
                                    "x_source": "CAPEC",
                                    "name": "coa-617-0",
                                    "modified": "2022-09-29T00:00:00.000Z",
                                    "created_by_ref": "identity--e50ab59c-5c4f-4d40-bf6a-d58418d89bcd",
                                    "id": "course-of-action--b183808c-b043-46e6-a10a-acb7644ea511"
                                },
                                {
                                    "x_organization": "x-organization--cf938bd4-e6d2-4183-a348-ca0171058580",
                                    "spec_version": "2.1",
                                    "definition_type": "statement",
                                    "created": "2023-01-30T20:40:28.791035Z",
                                    "x_creator_refs": [
                                        1
                                    ],
                                    "definition": {"statement" : "test"},
                                    "id": "marking-definition--17d82bb2-eeeb-4898-bda5-3ddbcd2b799d",
                                    "type": "marking-definition",
                                    "x_short_id": "mar-02-ee7e1b",
                                    "version": "2023-08-26T09:02:57Z",
                                    "x_source": "CAPEC"
                                }
                            ],
                        "received_at": "2023-03-13T12:22:54.322Z",
                        "related_iodef": "_mTf1k5IKSXemvZs11txbNAg59lAljo5u4_KRXhmQ1IfAiJVqbC1Oc6BCe0ZuWzc",
                        "sender_name": "Kashef",
                        "type": "bundle"
                    }
                }
            )
        );
    })

];
