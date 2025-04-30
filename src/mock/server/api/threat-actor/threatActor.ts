import { rest } from "msw";
import { getBaseUrl } from "../../../../config";
const item = {
  first_seen: "2023-09-26T10:36:36.473Z",
  resource_level: "individual",
  x_short_id: "thr-02-a18b34",
  x_organization: "x-organization--7f2ac664-a315-465b-9db9-72d5c152dc5c",
  modified: "2023-09-26T10:34:20Z",
  description: "",
  id: "threat-actor--7917eb24-a919-4ce9-bd19-5c87db5a1e77",
  sophistication: "advanced",
  roles: ["agent", "independent", "infrastructure-operator"],
  created: "2023-09-26T10:34:20Z",
  type: "threat-actor",
  secondary_motivations: ["ideology", "notoriety"],
  threat_actor_types: ["activist", "competitor"],
  spec_version: "2.1",
  aliases: [],
  last_seen: "2023-09-26T10:36:36.473Z",
  goals: [],
  primary_motivation: "accidental",
  personal_motivations: ["personal-gain"],
  x_source: "sata",
  version: "2023-09-26T10:34:20Z",
  name: "test",
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
};
export const threatActor = [
  rest.get(
    `${getBaseUrl()}reporter/v1/table/threat-actor`,
    async (req, res, ctx) => {
      return res(
        ctx.status(200),
        ctx.json({
          data: {
            total: 1,
            page: 1,
            size: 10,
            filter_fields: [],
            items: [item],
          },
          type: "success",
          message: "",
        })
      );
    }
  ),
  rest.get(
    `${getBaseUrl()}reporter/v1/details/threat-actor--7917eb24-a919-4ce9-bd19-5c87db5a1e77`,
    async (req, res, ctx) => {
      return res(
        ctx.status(200),
        ctx.json({
          data: { ...item },
          type: "success",
          message: "",
        })
      );
    }
  ),
];
