import { rest } from "msw";
import { getBaseUrl } from "../../../../config";
export const iodefs = [
  rest.get(
    `${getBaseUrl()}radar/v1/iodef`,
    async (req, res, ctx) => {
      return res(
        ctx.status(200),
        ctx.json({
          data:{
            items:[
              {
                view: null,
                review: null,
                id:
                    "_N9Bp2KRA7WUCIC8i_bg8KR55mr_g5fT0O2vjj0xs051ZZtDGZF-bobzKJQTiykl",
                removed: false,
                document: {
                  Incidents: [
                    {
                      Assessments: [
                        {
                          Impacts: [
                            {
                              type: "recon",
                            },
                          ],
                        },
                      ],
                      reportTime: "2022-04-27T23:56:00+03:30",
                      startTime: "2022-04-27T21:50:00+03:30",
                      endTime: "",
                      detectTime: "2022-04-27T22:30:00+03:30",
                    },
                  ],
                },
                received_at: "2023-08-27T11:37:11.503Z",
                sender: {
                  name: "sata",
                  id: "POhCYjG35n07W1YDQXW1RGN8SSOex3YA",
                },
                created_by: {
                  id: "",
                  username: "",
                },
              },
            ],
            total: 1
          }
        })
      );
    }
  ),
];
