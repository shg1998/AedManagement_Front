import { rest } from "msw";
import { getBaseUrl } from "../../../../config";
export const stixs = [
  rest.get(
    `${getBaseUrl()}reporter/v1/table/x-incident`,
    async (req, res, ctx) => {
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
                x_organization: "Shahr-3",
                id: "x-incident--2fec550b-8b48-4bbb-a502-221ece10ac13",
                x_short_id: "inc-02-359599",
                created_by_ref: "random-identity_name-90",
                name: "random-name-82",
                occurred_time: "2023-07-20T04:47:42+03:30",
                ttp_count: 8,
                asset_count: 3,
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
            ],
          },
          type: "success",
          message: "",
        })
      );
    }
  ),
  rest.post(
    `${getBaseUrl()}taxii/v1/kashef/collections/sata/objects/`,
    async (req, res, ctx) => {
      return res(
        ctx.status(202),
        ctx.json({
          objects: [
            {
              id: "x-incident--0200422d-db61-4d48-a91c-14a2fc3df729",
              name: "test",
              x_organization: "",
              domain: "",
              description: "",
              occurred_time: "",
              reported_time: "",
              modified: "",
              categories_type: "",
              impact_assessment: ",,0",
              responder: [],
              coa_taken: [],
              coa_requested: 0,
              type: "x-incident",
            },
          ],
        })
      );
    }
  ),
];
