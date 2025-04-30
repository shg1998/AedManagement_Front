import { rest } from "msw";
import {getBaseUrl} from "../../../../config";
export const assets = [
    rest.get(`${getBaseUrl()}reporter/v1/table/x-asset`, async (req, res, ctx) => {
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
                                id: "x-asset--ef5aeebb-0b4a-4661-a817-4a40f1bc0569",
                                x_short_id: "ast-02-4bcfda",
                                name: "asset_name--254",
                                x_organization: "Ansar-2",
                                asset_type: "asset_type-03",
                                vulnerability_count: 1,
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
                            }
                        ]
                    },
                    type: "success",
                    message: ""
                }
            )
        );
    }),

    rest.get(`${getBaseUrl()}reporter/v1/table/related/x-asset`, async (req, res, ctx) => {
        return res(
          ctx.status(200),
          ctx.json({
            data: {
              total: 1,
              page: 1,
              size: 10,
              items: [
                {
                  type: "x-asset",
                  id: "x-asset--ef5aeebb-0b4a-4661-a817-4a40f1bc0569",
                  x_short_id: "ast-02-4bcfda",
                  name: "asset_name--254",
                  x_organization: "Ansar-2",
                  asset_type: "asset_type-03",
                  x_relationships: {
                    outgoing: ["duplicate-of", "derived-from", "related-to"],
                    ingoing: ["duplicate-of", "derived-from", "related-to"],
                  },
                },
              ],
            },
            type: "success",
            message: "",
          })
        );
    }),
    rest.get(`${getBaseUrl()}reporter/v1/details/x-asset--ef5aeebb-0b4a-4661-a817-4a40f1bc0569`, async (req, res, ctx) => {
        return res(
            ctx.status(200),
            ctx.json({
                    data:
                        {
                            modified: "2023-09-18T10:57:36Z",
                            operating_system: "windows",
                            created: "2023-09-18T10:57:36Z",
                            product_version: "1",
                            description: "test1",
                            x_organization: "x-organization--7f2ac664-a315-465b-9db9-72d5c152dc5c",
                            x_source: "sata",
                            spec_version: "2.1",
                            version: "2023-09-18T10:57:36Z",
                            type: "x-asset",
                            asset_type: "operating_system",
                            operating_system_version: "2",
                            name: "test1",
                            product_vendor: "ms",
                            x_short_id: "ast-02-fc8e2b",
                            id: "x-asset--163e0a29-ca34-42b0-be7d-b41ff3665169",
                            datatype: "model"
                        }
                    ,
                    type: "success",
                    message: ""
                }
            )
        );
    }),
];
