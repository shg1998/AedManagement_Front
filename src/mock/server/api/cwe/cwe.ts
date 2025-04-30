import { rest } from "msw";
import {getBaseUrl} from "../../../../config";
export const cwe = [
    rest.get(`${getBaseUrl()}reporter/v1/table/x-cwe`, async (req, res, ctx) => {
        return res(
            ctx.status(200),
            ctx.json({
                    data: {
                        total: 4,
                        page: 1,
                        size: 4,
                        items: [
                            {
                                id: "x-cwe--f5b68d74-621a-4361-a444-d8ac07c9052a",
                                description: "A covert storage channel transfers information through the setting of bits by one program and the reading of those bits by another. What distinguishes this case from that of ordinary operation is that the bits are used to convey encoded information.",
                                modified: "2023-06-29T00:00:00",
                                created: "2006-07-19T00:00:00",
                                name: "Covert Storage Channel",
                                x_short_id: "cwe-02-72b23d",
                                likelihood_of_exploit: "Medium",
                                cwe_id: 'CWE-335',
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
                            {
                                id: "x-cwe--f5b68d74-621a-4361-a444-d8ac07c9052a",
                                description: "A covert storage channel transfers information through the setting of bits by one program and the reading of those bits by another. What distinguishes this case from that of ordinary operation is that the bits are used to convey encoded information.",
                                modified: "2023-06-29T00:00:00",
                                created: "2006-07-19T00:00:00",
                                name: "Covert Storage Channel",
                                x_short_id: "cwe-02-72b23d",
                                likelihood_of_exploit: "High",
                                cwe_id: 'CWE-334',
                                external_references: [
                                    {
                                        source_name: 'cwe',
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
                                id: "x-cwe--f5b68d74-621a-4361-a444-d8ac07c9052a",
                                description: "A covert storage channel transfers information through the setting of bits by one program and the reading of those bits by another. What distinguishes this case from that of ordinary operation is that the bits are used to convey encoded information.",
                                modified: "2023-06-29T00:00:00",
                                created: "2006-07-19T00:00:00",
                                name: "Covert Storage Channel",
                                x_short_id: "cwe-02-72b23d",
                                likelihood_of_exploit: "Low",
                                cwe_id: 'CWE-336',
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
                            {
                                id: "x-cwe--f5b68d74-621a-4361-a444-d8ac07c9052a",
                                description: "A covert storage channel transfers information through the setting of bits by one program and the reading of those bits by another. What distinguishes this case from that of ordinary operation is that the bits are used to convey encoded information.",
                                modified: "2023-06-29T00:00:00",
                                created: "2006-07-19T00:00:00",
                                name: "Covert Storage Channel",
                                x_short_id: "cwe-02-72b23d",
                                cwe_id: 'CWE-337',
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
    rest.get(`${getBaseUrl()}reporter/v1/details/related/x-cwe--f5b68d74-621a-4361-a444-d8ac07c9052a`, async (req, res, ctx) => {
        return res(
            ctx.status(200),
            ctx.json({
                    data: {
                        total: 1,
                        page: 1,
                        size: 1,
                        items: [
                            {
                                id: "intrusion-set--c93fccb1-e8e8-42cf-ae33-2ad1d183913a",
                                relationship_type: "uses",
                                x_direction: "ingoing",
                                x_short_id: "int-02-0d2fef",
                                x_source: "att&ck",
                                name: "Lazarus Group",
                                type: "intrusion-set"
                            },
                        ]
                    },
                    type: "success",
                    message: ""
                }
            )
        );
    }),
];
