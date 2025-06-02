// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import "@testing-library/jest-dom";

import { server } from "./mock/server/server";

jest.setTimeout(600000);

jest.mock("react-i18next", () => ({
  useTranslation: () => ({
    t: (key: any) => key,
    i18n: { changeLanguage: jest.fn() },
  }),
  initReactI18next: {
    type: "3rdParty",
    init: (i18next: any) => i18next,
  },
}));

jest.mock('./context/CurrentUserContext.tsx', () => ({
    useCurrentUserState: () => ({
        image_url: "",
        id: 1,
        permissions: [
            {
                id: null, section_name: "user", module_name: "ttp", get_access: 3, create_access: 3, update_access: 3, delete_access: 3
            },
            {
                id: null, section_name: "user", module_name: "stix",
                get_access: 3, create_access: 3, update_access: 3, delete_access: 3
            },
            {
                id: null, section_name: "admin", module_name: "organization",
                get_access: 3, create_access: 3, update_access: 3, delete_access: 3
            },
            {
                id: null,
                section_name: "user",
                module_name: "asset", get_access: 3, create_access: 3, update_access: 3, delete_access: 3
            },
            {
                id: null,
                section_name: "admin", module_name: "user", get_access: 3, create_access: 3, update_access: 3, delete_access: 3
            },
            {
                id: null, section_name: "admin",
                module_name: "group",
                get_access: 3, create_access: 3, update_access: 3, delete_access: 3
            },
            {
                id: null, section_name: "user",
                module_name: "message", get_access: 3, create_access: 3, update_access: 3, delete_access: 3
            },
            {
                id: null, section_name: "admin", module_name: "alarm", get_access: 3, create_access: 3, update_access: 3, delete_access: 3
            },
            {
                id: null, section_name: "admin", module_name: "role", get_access: 3, create_access: 3, update_access: 3, delete_access: 3
            },
            {
                id: null, section_name: "user", module_name: "incident", get_access: 3, create_access: 3, update_access: 3, delete_access: 3
            },{
                id: null, section_name: "user", module_name: "vulnerability", get_access: 3, create_access: 3, update_access: 3, delete_access: 3
            },{
                id: null, section_name: "user", module_name: "location", get_access: 3, create_access: 3, update_access: 3, delete_access: 3
            },{
                id: null, section_name: "user", module_name: "label", get_access: 3, create_access: 3, update_access: 3, delete_access: 3
            },{
                id: null, section_name: "admin", module_name: "config", get_access: 3, create_access: 3, update_access: 3, delete_access: 3
            },
        ]

    })
}));



beforeAll(() => {
  server.listen(); 
  jest.spyOn(console, "warn").mockImplementation(() => {});
  jest.spyOn(console, "error").mockImplementation(() => {});
  jest.spyOn(console, "log").mockImplementation(() => {});
});
afterEach(() => server.resetHandlers());
afterAll(() => server.close());
