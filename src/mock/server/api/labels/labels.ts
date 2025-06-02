import { rest } from "msw";
import { getBaseUrl } from "../../../../config";
export const labels = [
  rest.get(`${getBaseUrl()}labeling/v1/`, async (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        data: {
          items: [
            {
              id: 3,
              name: "تست برچسب",
              description: "تست برچسب",
              importance: 1,
              created_by: {
                username: "admin",
                first_name: "test_fname",
                last_name: "test_lname",
                image_url: "img/profile/2023-10-16-12-02-42-8e5dc4.png",
              },
              saved_search: {
                id: "c00cf5b53e78b32872edb4c4e1aaf704",
                title: "test8",
                description: "saved_search test description",
                raw_query:
                  "filter=type='campaign' and (x_short_id = 'cam-02-3a067f')",
              },
            },
          ],
          total: 1,
          page: 1,
          size: 10,
        },
        type: "success",
        detail: "",
      })
    );
  }),
  rest.get(`${getBaseUrl()}labeling/v1/details/3`, async (req, res, ctx) => {
      return res(
          ctx.status(200),
          ctx.json(
              {
                  data: {
                    name: "تست برچسب",
                    description: "تست برچسب توضیحات",
                    importance: 3,
                    id: 3,
                    created_by: {
                        username: "admin",
                        first_name: "Leila",
                        last_name: "Fathi",
                        image_url: "img/profile/2023-10-16-12-02-42-8e5dc4.png"
                    },
                    saved_search: null,
                    modified_by: {
                        username: "admin",
                        first_name: "Leila",
                        last_name: "Fathi",
                        image_url: "img/profile/2023-10-16-12-02-42-8e5dc4.png"
                    },
                    created_at: "2024-01-15 14:09:02.149001",
                    modified_at: "2024-02-04 10:38:44.701731"
                  },
                  type: "success",
                  detail: ""
              }
          )
      );
  }),


  // rest.delete(`${getBaseUrl()}alarm/v1/3`, async (req, res, ctx) => {
  //     return res(
  //         ctx.status(200),
  //         ctx.json({
  //                 data: {
  //                     id: 3, title: "تست هشدار", summary: "تست متن هشدار"
  //                 },
  //                 type: "success", detail: ""
  //             }
  //         )
  //     );
  // }),

  // rest.get(`${getBaseUrl()}alarm/v1/triggered_alarm/3`, async (req, res, ctx) => {
  //     return res(
  //         ctx.status(200),
  //         ctx.json(
  //             {
  //                 data: {
  //                     items: [
  //                         {
  //                             id: 1, sms_id: null,
  //                             email_id: null, message_id: null,
  //                             message: "تست متن هشدار", created_date: "2023-11-12T04:45:58.028488", alarm_id: 3
  //                         }
  //                     ],
  //                     total: 1, page: 1, size: 10
  //                 },
  //                 type: "success", detail: ""
  //             }
  //         )
  //     );
  // }),
];
