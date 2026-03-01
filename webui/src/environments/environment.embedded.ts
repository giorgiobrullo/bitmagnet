// Derive GraphQL endpoint from the page's base href.
// When served at a sub-path (e.g., /prefix/webui), the base href will be "/prefix/webui"
// and the GraphQL endpoint will be at /prefix/graphql.
const baseEl = document.querySelector("base");
const baseHref = (baseEl?.getAttribute("href") || "/webui").replace(/\/+$/, "");
const pathPrefix = baseHref.substring(0, baseHref.lastIndexOf("/")) || "";
export const graphqlEndpoint =
  window.location.origin + pathPrefix + "/graphql";
