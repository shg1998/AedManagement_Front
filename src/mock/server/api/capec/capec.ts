import { rest } from "msw";
import {getBaseUrl} from "../../../../config";
export const capec = [
    rest.get(`${getBaseUrl()}reporter/v1/table/x--capec`, async (req, res, ctx) => {
        return res(
            ctx.status(200),
            ctx.json({
                    data: {
                        total: 4,
                        page: 1,
                        size: 4,
                        items: [
                            {
                                modified: "2022-09-29T00:00:00.000Z",
                                x_short_id: "att-02-3b201c",
                                id: "attack-pattern--fff5e678-9e98-4e12-b054-119ff429e214",
                                name: "Cellular Rogue Base Station",
                                x_capec_typical_severity: "Low",
                                description: "In this attack scenario, the attacker imitates a cellular base station with their own \"rogue\" base station equipment. Since cellular devices connect to whatever station has the strongest signal, the attacker can easily convince a targeted cellular device (e.g. the retransmission device) to talk to the rogue base station.",
                                created: "2015-11-09T00:00:00.000Z",
                                type: "attack-pattern",
                                capec_id: "CAPEC-617",
                                x_capec_likelihood_of_attack: null,
                                x_labels: []
                            },
                            {
                                modified: "2022-08-29T00:00:00.000Z",
                                x_short_id: "att-02-3b502c",
                                id: "attack-pattern--fff5e695-9e98-4e12-b054-119ff429e214",
                                name: "Cellular Test",
                                x_capec_typical_severity: "High",
                                description: "In this attack scenario, test a cellular base station with their own \"rogue\" base station equipment. Since cellular devices connect to whatever station has the strongest signal, the attacker can easily convince a targeted cellular device (e.g. the retransmission device) to talk to the rogue base station.",
                                created: "2015-11-07T00:00:00.000Z",
                                type: "attack-pattern",
                                capec_id: "CAPEC-650",
                                x_capec_likelihood_of_attack: 'Low',
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
                                modified: "2021-09-20T00:00:00.000Z",
                                x_short_id: "att-02-3b209c",
                                id: "attack-pattern--fff5e678-9e98-4e12-b054-119ff429e288",
                                name: "test Rogue Base Station",
                                x_capec_typical_severity: "Medium",
                                description: "test, the attacker imitates a cellular base station with their own \"rogue\" base station equipment. Since cellular devices connect to whatever station has the strongest signal, the attacker can easily convince a targeted cellular device (e.g. the retransmission device) to talk to the rogue base station.",
                                created: "2018-11-09T00:00:00.000Z",
                                type: "attack-pattern",
                                capec_id: "CAPEC-697",
                                x_capec_likelihood_of_attack: "High",
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
                                modified: "2012-09-29T00:00:00.000Z",
                                x_short_id: "att-02-3b961c",
                                id: "attack-pattern--fff5e678-9e98-4e12-b054-119ff429e111",
                                name: "Cellular Rogue Base 7 test",
                                x_capec_typical_severity: null,
                                description: "In this attack test, the attacker imitates a cellular base station with their own \"rogue\" base station equipment. Since cellular devices connect to whatever station has the strongest signal, the attacker can easily convince a targeted cellular device (e.g. the retransmission device) to talk to the rogue base station.",
                                created: "2005-11-09T00:00:00.000Z",
                                type: "attack-pattern",
                                capec_id: "CAPEC-601",
                                x_capec_likelihood_of_attack: "Medium",
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
    rest.get(`${getBaseUrl()}reporter/v1/details/related/attack-pattern--fff5e678-9e98-4e12-b054-119ff429e214`, async (req, res, ctx) => {
        return res(
            ctx.status(200),
            ctx.json({
                    data: {
                        total: 1, page: 1, size: 1, items: [{id: "intrusion-set--c93fccb1-e8e8-42cf-ae33-2ad1d183913a", relationship_type: "uses", x_direction: "ingoing",
                                x_short_id: "int-02-0d2fef", x_source: "att&ck", name: "Lazarus Group", type: "intrusion-set"},
                        ]
                    },
                    type: "success", message: ""
                }
            )
        );
    }),
];
