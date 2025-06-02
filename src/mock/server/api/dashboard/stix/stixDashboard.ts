import { rest } from "msw";
import { getBaseUrl } from "../../../../../config";
export const stixDashboard = [
  rest.get(
    `${getBaseUrl()}reporter/v1/dashboard-incident/count`,
    async (req, res, ctx) => {
      return res(
        ctx.status(200),
        ctx.json({
          data: {
            total: 368,
            lastMonth: 0,
            lastDay: 0,
            lastWeek: 0,
            Pre_lastMonth: 0,
            Pre_lastDay: 0,
            Pre_lastWeek: 0,
            Precent_Day: 0.0,
            Precent_Month: 0.0,
            Precent_Week: 0.0,
          },
          type: "success",
          detail: "",
        })
      );
    }
  ),
  rest.get(
    `${getBaseUrl()}reporter/v1/dashboard-incident/detection_process`,
    async (req, res, ctx) => {
      return res(
        ctx.status(200),
        ctx.json({
          data: [{ "1398/10/11 00:00": 2, start_time: "2020/01/01 00:00" }],
          type: "success",
          detail: "",
        })
      );
    }
  ),
  rest.get(
    `${getBaseUrl()}reporter/v1/dashboard-incident/frequent_name`,
    async (req, res, ctx) => {
      return res(
        ctx.status(200),
        ctx.json({
          data: [
            {
              result: {
                "random-name-7": 12,
                "random-name-25": 12,
                "random-name-11": 12,
                "random-name-33": 12,
                "random-name-55": 12,
                "random-name-88": 11,
                "random-name-24": 11,
                "random-name-82": 9,
                "random-name-72": 8,
                "random-name-49": 8,
              },
            },
          ],
          type: "success",
          detail: "",
        })
      );
    }
  ),
  rest.get(
    `${getBaseUrl()}reporter/v1/dashboard-incident/most_effective_organizations`,
    async (req, res, ctx) => {
      return res(
        ctx.status(200),
        ctx.json({
          data: [
            {
              result: {
                "Sina-1": 5,
                "Maskan-2": 4,
                "Melli-1": 7,
                "Gardeshgari-3": 5,
                "Shahr-1": 4,
              },
            },
          ],
          type: "success",
          detail: "",
        })
      );
    }
  ),

  rest.get(
    `${getBaseUrl()}reporter/v1/dashboard-incident/periodic_number`,
    async (req, res, ctx) => {
      return res(
        ctx.status(200),
        ctx.json({
          data: {
            Puya: [{ "1398/10/11": 0, start_time: "2020/01/01" }],
          },
          type: "success",
          detail: "",
        })
      );
    }
  ),

  rest.get(
    `${getBaseUrl()}reporter/v1/dashboard-incident/importance_reports`,
    async (req, res, ctx) => {
      return res(
        ctx.status(200),
        ctx.json({
          data: [
            {
              report_types: ["intrusion-set", "incident"],
              version: "2023-07-29T08:24:22Z",
              created_by_ref: "identity--a8e78952-7a75-4a4d-b6c3-44c3007de616",
              id: "report--d5d3de06-88c9-4b42-8160-a8d1637a8bb6",
              object_marking_refs: [
                "marking-definition--f88d31f6-486f-44da-b317-01333bde0b82",
              ],
              published: "1988-10-04T06:52:05+03:30",
              type: "report",
              modified: "1990-10-30T08:52:05+03:30",
              name: "report_name--998",
              object_refs: [
                "location--792e86ef-56ea-425b-9e90-a5d6751c1137",
                "relationship--d16d59aa-f056-4cc7-9f67-0e80db9cdacb",
                "course-of-action--a18fc294-727b-4324-b4c9-05796bf96648",
                "indicator--ed41a1ff-f505-4f65-bc66-3b235c453cc2",
                "relationship--719676a8-9d6c-4ac6-812b-aa268a9abc88",
                "relationship--b5a39593-27ad-44dc-99f9-fcadc6d464ed",
                "relationship--f703f9e5-e210-433c-8f09-f20c5a0d00da",
                "attack-pattern--0ad7bc5c-235a-4048-944b-3b286676cb74",
                "x-mitre-data-source--1ac0ca69-e07e-4b34-9061-e4588e146c52",
                "relationship--7c60bccc-f485-403d-ab3b-db861a3a4429",
              ],
              x_organization:
                "x-organization--50308e94-a946-421d-b1cb-9203f63146dc",
              spec_version: "2.1",
              x_short_id: "rep-02-253fe4",
              created: "1976-02-27T16:52:05+03:30",
              x_source: "sata",
              x_importance: "medium",
              x_creator_name: "Unknown",
              x_tlp: "orange",
            },
          ],
          type: "success",
          detail: "",
        })
      );
    }
  ),

  rest.get(
    `${getBaseUrl()}reporter/v1/dashboard-incident/most_financial_losses`,
    async (req, res, ctx) => {
      return res(
        ctx.status(200),
        ctx.json({
          data: [
            {
              coa_taken:
                "course-of-action--2bef8a95-f505-437b-8c5c-35406f6e8e53",
              object_marking_refs: [
                "marking-definition--df4608d5-8c51-4d4f-a6ea-f35239669fb7",
              ],
              occurred_time: "2023-07-24T21:08:01+03:30",
              reported_time: "2024-07-07T17:36:01+03:30",
              created: "2028-08-14T02:36:01+03:30",
              created_by_ref: "identity--9906cb8d-36d6-4046-8111-8490fff356f4",
              modified: "2026-05-05T02:36:01+03:30",
              spec_version: "2.1",
              type: "x-incident",
              x_organization: "Melli-3",
              coa_requested:
                "course-of-action--d5c5c860-e96c-4626-990d-acaabda23218",
              description: "random-dummy generated description-85",
              domain: "random-domain-98",
              name: "random-name-88",
              responder: ["identity--81c52b5b-b8f4-4c23-ab2b-48d108cb0eb0"],
              version: "2023-06-12T16:45:51Z",
              categories_type: "random-category-59",
              id: "x-incident--e654b417-3b17-439e-ba03-707dac712e48",
              impact_assessment: "random-impact_assessment-34",
              x_short_id: "inc-02-294714",
              x_severity: "medium",
              x_source: "sata",
              x_actual_damage: 1597761509,
              x_estimated_damage: 879221466,
            },
          ],
          type: "success",
          detail: "",
        })
      );
    }
  ),
];
