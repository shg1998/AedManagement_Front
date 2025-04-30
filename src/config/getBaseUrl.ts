import def from "./default.json";

export const getBaseUrl = (): string => {
  if(window.location.host.includes('localhost')) return def.api.baseUrl;
  else return window.location.origin + '/api/';
};
