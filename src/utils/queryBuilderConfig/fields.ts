import { Field, Option } from "react-querybuilder";

export const iodefCreateItem = (name: string, datatype: string) => {
  return {
    name: name,
    label: name,
    // placeholder: "Enter " + name,
    inputType: datatype,
    type: datatype,
  };
};

export const iodefCreateItemSelect = (name: string, values: any[]) => {
  return {
    name: name,
    label: name,
    placeholder: "Enter " + name,
    inputType: "select",
    valueEditorType: "select",
    values: values,
  };
};

export const booleanCreateItemSelect = (name: string) => {
  return {
    name: name,
    label: name,
    inputType: "select",
    // operators: ["is", "is not"],
    // valueSources: ["value", "field"],
    values: [
      { name: true, title: "True" },
      { name: false, title: "False" },
    ],
  };
};

export const createItem = (name: string, datatype: string) => {
  return {
    name: name,
    label: name,
    placeholder: "Enter " + name,
    inputType: datatype,
    type: datatype,
  };
};

export const createItemSelect = (name: string, values: any[]) => {
  return {
    name: name,
    label: name,
    placeholder: "Enter " + name,
    inputType: "select",
    valueEditorType: "select",
    values: values,
  };
};

export let fields: Field[] = [];

export function setFields(newFields: any[]) {
  fields = newFields;
}

export const Impacts = [
  { value: "low", title: "low" },
  { value: "medium", title: "medium" },
  { value: "high", title: "high" },
];
export const TimeImpactMetric = [
  { value: "labor", title: "labor" },
  { value: "elapsed", title: "elapsed" },
  { value: "downtime", title: "downtime" },
  { value: "ext-value", title: "ext-value" },
];

export const Duration = [
  { value: "second", title: "second" },
  { value: "minute", title: "minute" },
  { value: "hour", title: "hour" },
  { value: "day", title: "day" },
  { value: "month", title: "month" },
  { value: "quarter", title: "quarter" },
  { value: "year", title: "year" },
  { value: "ext-value", title: "ext-value" },
];
export const AdditionalDatadtype = [
  { value: "boolean", title: "boolean" },
  { value: "byte", title: "byte" },
  { value: "character", title: "character" },
  { value: "date-time", title: "date-time" },
  { value: "integer", title: "integer" },
  { value: "portlist", title: "portlist" },
  { value: "real", title: "real" },
  { value: "string", title: "string" },

  { value: "file", title: "file" },
  { value: "frame", title: "frame" },
  { value: "packet", title: "packet" },
  { value: "ipv4-packet", title: "ipv4-packet" },
  { value: "ipv6-packet", title: "ipv6-packet" },
  { value: "path", title: "path" },
  { value: "url", title: "url" },
  { value: "csv", title: "csv" },
  { value: "winreg", title: "winreg" },
  { value: "xml", title: "xml" },
  { value: "ext-value", title: "ext-value" },
];
export const ConfidenceRating = [
  { value: "low", title: "low" },
  { value: "medium", title: "medium" },
  { value: "high", title: "high" },
  // { value: "numeric", title: "numeric" },
];
export const Severity = [
  { value: "low", title: "low" },
  { value: "medium", title: "medium" },
  { value: "high", title: "high" },
];

export const restriction = [
  { value: "public", title: "public" },
  { value: "need-t-know", title: "need-t-know" },
  { value: "privete", title: "privete" },
  { value: "default", title: "default" },
];

export const FlowCategory = [
  { value: "source", title: "source" },
  { value: "target", title: "target" },
  { value: "intermediate", title: "intermediate" },
  { value: "sensor", title: "sensor" },
  { value: "infrastructure", title: "infrastructure" },
  { value: "ext-value", title: "ext-value" },
];

export const Spoofed = [
  { value: "unknown", title: "unknown" },
  { value: "yes", title: "yes" },
  { value: "no", title: "no" },
];
export const addressCategory = [
  { value: "asn", title: "asn" },
  { value: "atm", title: "atm" },
  { value: "e-mail", title: "e-mail" },

  { value: "ipv4-addr", title: "ipv4-addr" },
  { value: "ipv4-net", title: "ipv4-net" },
  { value: "ipv4-net-mask", title: "ipv4-net-mask" },

  { value: "ipv6-addr", title: "ipv6-addr" },
  { value: "ipv6-net", title: "ipv6-net" },
  { value: "ipv6-net-mask", title: "ipv6-net-mask" },

  { value: "mac", title: "mac" },
  { value: "ext-value", title: "ext-value" },
];
export const Roles = [
  { value: "creator", title: "creator" },
  { value: "admin", title: "admin" },
  { value: "tech", title: "tech" },
  { value: "irt", title: "irt" },
  { value: "cc", title: "cc" },
  { value: "ext-value", title: "ext-value" },
];

export const nodeRoleCategory = [
  { value: "client", title: "client" },
  { value: "server-internal", title: "server-internal" },
  { value: "server-public", title: "server-public" },
  { value: "www", title: "www" },
  { value: "mail", title: "mail" },
  { value: "messaging", title: "messaging" },
  { value: "streaming", title: "streaming" },
  { value: "voice", title: "voice" },
  { value: "file", title: "file" },
  { value: "ftp", title: "ftp" },
  { value: "p2p", title: "p2p" },
  { value: "value", title: "value" },
  { value: "directory", title: "directory" },
  { value: "credential", title: "credential" },
  { value: "print", title: "print" },
  { value: "application", title: "application" },
  { value: "database", title: "database" },
  { value: "infra", title: "infra" },
  { value: "log", title: "log" },
  { value: "ext-value", title: "ext-value" },
];

export const Registry = [
  { value: "internic", title: "internic" },
  { value: "apnic", title: "apnic" },
  { value: "arin", title: "arin" },
  { value: "lacnic", title: "lacnic" },
  { value: "ripe", title: "ripe" },
  { value: "afrinic", title: "afrinic" },
  { value: "local", title: "local" },
  { value: "ext-value", title: "ext-value" },
];

export const ContactType = [
  { value: "person", title: "person" },
  { value: "organization", title: "organization" },
  { value: "ext-value", title: "ext-value" },
];
export const completion = [
  { value: "failed", title: "failed" },
  { value: "succeeded", title: "succeeded" },
];
export const impactType = [
  { value: "admin", title: "admin" },
  { value: "dos", title: "dos" },
  { value: "file", title: "file" },
  { value: "info-leak", title: "info-leak" },
  { value: "misconfiguration", title: "misconfiguration" },
  { value: "policy", title: "policy" },
  { value: "recon", title: "recon" },
  { value: "social-engineering", title: "social-engineering" },
  { value: "user", title: "user" },
  { value: "unknown", title: "unknown" },
  { value: "ext-value", title: "ext-value" },
];
export const CounterType = [
  { value: "byte", title: "byte" },
  { value: "packet", title: "packet" },
  { value: "flow", title: "flow" },
  { value: "session", title: "session" },
  { value: "alert", title: "alert" },
  { value: "message", title: "message" },
  { value: "event", title: "event" },
  { value: "host", title: "host" },
  { value: "site", title: "site" },
  { value: "organization", title: "organization" },
  { value: "ext-value", title: "ext-value" },
];

export const systemCategory = [
  { value: "source", title: "source" },
  { value: "target", title: "target" },
];

export const reviewed = [
  { value: "true", title: "true" },
  { value: "false", title: "false" },
];
export const viewed = [
  { value: "true", title: "true" },
  { value: "false", title: "false" },
];

export const stixFields = [
  createItem("x_short_id", "text"),
  createItem("id", "text"),
  createItem("x_tlp", "text"),
  createItem("created_by_ref", "text"),
  createItem("created", "text"),
  createItem("modified", "text"),
  createItem("revoked", "text"),
  createItem("labels", "text"),
  createItem("external_references", "text"),
  createItem("object_marking_refs", "text"),
  createItem("granular_markings", "text"),
  createItem("name", "text"),
  createItem("categories_type", "text"),
  createItem("description", "text"),
  createItem("reported-time", "date"),
  createItem("occurred_time", "date"),
  createItem("responder", "text"), //list of string
  createItem("impact_assessment", "text"),
  createItem("coa_taken", "text"),
  createItem("coa_requested", "number"),
  createItem("confidence", "number"),
  createItem("x_organization", "text"),
  createItem("ttp_count", "number"),
  createItem("asset_count", "number"),
  createItemSelect("x_severity", Severity),
];

export const vulnerabilityFields = [
  createItem("x_short_id", "text"),

  createItem("name", "text"),
  createItem("x_tlp", "text"),
  createItem("created", "date"),
  createItem("id", "text"),
  createItem("x_organization", "text"),
  createItem("asset_name", "text"),

  createItem("asset_count", "number"),
  createItem("vuln_severity", "number"),
  createItem("base_score", "number"),
  createItem("cve_id", "text"),
  createItem("type", "text"),
  createItem("spec_version", "text"),
  createItem("modified", "text"),
  createItem("created_by_ref", "text"),
  createItem("revoked", "text"),
  createItem("labels", "text"),
  createItem("confidence", "text"),
  createItem("lang", "text"),
  createItem("external_references", "text"),
  createItem("object_marking_refs", "text"),
  createItem("granular_markings", "text"),
  createItem("extensions", "text"),
];

export const malwareFields = [
  createItem("x_short_id", "text"),

  createItem("name", "text"),
  createItem("x_organization", "text"),
  createItem("x_tlp", "text"),
  createItem("created", "date"),
  createItem("id", "text"),
  createItem("name", "text"),
  createItem("created", "date"),
  createItem("id", "text"),
  createItem("x_short_id", "text"),

  createItem("name", "text"),
  createItem("description", "text"),
  createItem("malware_types", "text"),

  createItem("is_family", "text"),

  createItem("aliases", "text"),

  createItem("kill_chain_phases", "date"),
  createItem("first_seen", "date"),
  createItem("last_seen", "date"),
  createItem("operating_system_refs", "text"),
  createItem("architecture_execution_envs", "text"),
  createItem("implementation_languages", "text"),
  createItem("capabilities", "text"),
  createItem("sample_refs", "text"),
];

export const attackPatternFields = [
  createItem("x_short_id", "text"),

  createItem("name", "text"),
  createItem("x_organization", "text"),
  createItem("x_tlp", "text"),
  createItem("spec_version", "text"),
  createItem("id", "text"),
  createItem("created", "date"),
  createItem("modified", "date"),
  createItem("created_by_ref", "text"),
  createItem("revoked", "text"),
  createItem("labels", "text"),
  createItem("confidence", "text"),
  createItem("lang", "text"),
  createItem("external_references", "text"),

  createItem("object_marking_refs", "text"),
  createItem("granular_markings", "text"),
  createItem("extensions", "text"),
  createItem("description", "text"),
  createItem("aliases", "text"),
  createItem("kill_chain_phases", "text"),
];

export const toolFields = [
  createItem("x_short_id", "text"),

  createItem("spec_version", "text"),
  createItem("id", "text"),
  createItem("created", "date"),
  createItem("modified", "date"),

  createItem("created_by_ref", "text"),
  createItem("revoked", "text"),
  createItem("labels", "text"),
  createItem("confidence", "text"),
  createItem("lang", "text"),
  createItem("external_references", "text"),
  createItem("object_marking_refs", "text"),
  createItem("granular_markings", "text"),
  createItem("extensions", "text"),

  createItem("name", "text"),
  createItem("x_organization", "text"),
  createItem("x_tlp", "text"),
  createItem("description", "text"),
  createItem("tool_types", "text"),
  createItem("aliases", "text"),
  createItem("kill_chain_phases", "text"),
  createItem("tool_version", "text"),
];

export const campaignFields = [
  createItem("x_short_id", "text"),

  createItem("spec_version", "text"),
  createItem("id", "text"),
  createItem("created", "date"),
  createItem("modified", "date"),

  createItem("name", "text"),
  createItem("x_organization", "text"),
  createItem("x_tlp", "text"),
  createItem("objective", "text"),
  createItem("description", "text"),
  createItem("aliases", "text"),
  createItem("first_seen", "date"),
  createItem("last_seen", "date"),
];

export const intrusionSet = [
  createItem("x_short_id", "text"),

  createItem("spec_version", "text"),
  createItem("id", "text"),
  createItem("created", "date"),
  createItem("modified", "date"),

  createItem("name", "text"),
  createItem("x_organization", "text"),
  createItem("x_tlp", "text"),
  createItem("description", "text"),
  createItem("resource_level", "text"),
  createItem("goals", "text"),
  createItem("primary_motivation", "text"),
  createItem("secondary_motivations", "text"),
  createItem("aliases", "text"),
  createItem("first_seen", "date"),
  createItem("last_seen", "date"),
];

export const threatActor = [
  createItem("x_short_id", "text"),

  createItem("spec_version", "text"),
  createItem("id", "text"),
  createItem("created", "date"),
  createItem("modified", "date"),

  createItem("name", "text"),
  createItem("x_organization", "text"),
  createItem("x_tlp", "text"),
  createItem("description", "text"),
  createItem("resource_level", "text"),
  createItem("goals", "text"),
  createItem("threat_actor_types", "text"),
  createItem("roles", "text"),
  createItem("sophistication", "text"),
  createItem("primary_motivation", "text"),
  createItem("secondary_motivations", "text"),
  createItem("personal_motivations", "text"),
  createItem("aliases", "text"),
  createItem("first_seen", "date"),
  createItem("last_seen", "date"),
];

export const assetFields = [
  createItem("x_short_id", "text"),
  createItem("id", "text"),
  createItem("created", "date"),
  createItem("modified", "date"),
  createItem("created_by_ref", "text"),
  createItem("revoked", "text"),
  createItem("labels", "text"),
  createItem("external_references", "text"),
  createItem("object_marking_refs", "text"),
  createItem("granular_markings", "text"),
  createItem("name", "text"),
  createItem("x_tlp", "text"),
  createItem("description", "text"),
  createItem("x_asset-domain ", "text"),
  createItem("x_name", "text"),
  createItem("x_organization", "text"),
  createItem("asset_type", "text"),

  createItem("version", "text"),
  createItem("product_name", "text"),
  createItem("product_vendor", "text"),
  createItem("status_identifier", "text"),
  createItem("operating_system", "text"),
  createItem("operating_system_version", "text"),
  createItem("domain_name", "text"),
  createItem("subnet_mask", "text"),
  createItem("network_type", "text"),
];

export const locationFields = [
  createItem("x_short_id", "text"),
  createItem("id", "text"),
  createItem("created", "date"),
  createItem("modified", "date"),
  createItem("city", "text"),
  createItem("country", "text"),
  createItem("postal_code", "text"),
  createItem("province", "text"),
  createItem("street_address", "text"),
  createItem("name", "text"),
  createItem("x_tlp", "text"),
  createItem("x_organization", "text"),
  createItem("version", "text"),
];

export const organizationFields = [
  createItem("x_short_id", "text"),
  createItem("id", "text"),
  createItem("name", "text"),
  createItem("x_tlp", "text"),
  createItem("description", "text"),
  createItem("location_count", "number"),
  createItem("created", "date"),
  createItem("modified", "date"),
  createItem("version", "text"),
  createItem("has_reported_vulnerabilities", "text"),
];

export const ReceivedNotificationsFields = [
  createItem("message_id", "number"),
  createItem("sender_id", "number"),
  createItem("sender_username", "text"),
  createItem("sender_first_name", "text"),
  createItem("sender_last_name", "text"),
  createItem("sender_image_url", "text"),
  createItem("title", "text"),
  createItem("summary", "text"),
  createItem("is_read", "text"),
];

export const SentNotificationsFields = [
  createItem("id", "number"),
  createItem("title", "text"),
  createItem("text", "text"),
  createItem("created_date", "date"),
];

//.............................................................................................................

export const iodefIncidentID = {
  name: "IncidentID",
  label: "IncidentID",
  children: [
    iodefCreateItem("data", "text"),
    iodefCreateItem("name", "text"),
    iodefCreateItem("instance", "text"),
    iodefCreateItemSelect("restriction", restriction),
  ],
};

export const iodefIncidentIDs = {
  name: "IncidentIDs",
  label: "IncidentIDs",
  children: [
    iodefCreateItem("data", "text"),
    iodefCreateItem("name", "text"),
    iodefCreateItem("instance", "text"),
    iodefCreateItemSelect("restriction", restriction),
  ],
};

export const iodefAlternativeID = {
  name: "AlternativeID",
  label: "AlternativeID",
  children: [
    iodefCreateItem("data", "text"),
    iodefCreateItem("name", "text"),
    iodefCreateItem("instance", "text"),
    iodefCreateItemSelect("restricion", restriction),
    iodefIncidentIDs,
  ],
};

export const iodefRegistryHandles = {
  name: "RegistryHandles",
  label: "RegistryHandles",
  children: [
    iodefCreateItem("data", "text"),
    iodefCreateItemSelect("regitry", Registry),
    iodefCreateItem("extRegitry", "text"),
  ],
};

export const iodefPostalAddress = {
  name: "PostalAddress",
  label: "PostalAddress",
  children: [
    iodefCreateItem("data", "text"),
    iodefCreateItem("meaning", "text"),
    iodefCreateItem("lang", "text"),
  ],
};

export const iodefEmails = {
  name: "Emails",
  label: "Emails",
  children: [
    iodefCreateItem("data", "text"),
    iodefCreateItem("meaning", "text"),
  ],
};

export const iodefTelephones = {
  name: "Telephones",
  label: "Telephones",
  children: [
    iodefCreateItem("data", "text"),
    iodefCreateItem("meaning", "text"),
  ],
};
export const iodefFax = {
  name: "Fax",
  label: "Fax",
  children: [
    iodefCreateItem("data", "text"),
    iodefCreateItem("meaning", "text"),
  ],
};

export const iodefAdditionalDataList = {
  name: "AdditionalDataList",
  label: "AdditionalDataList",
  children: [
    iodefCreateItem("data", "text"),
    iodefCreateItemSelect("dtype", AdditionalDatadtype),
    iodefCreateItem("extDtype", "text"),
    iodefCreateItem("meaning", "text"),
    iodefCreateItem("formatID", "text"),
    iodefCreateItemSelect("restriction", restriction),
  ],
};

export const iodefContact = {
  name: "Contact",
  label: "Contact",
  children: [
    iodefCreateItem("contactName", "text"),
    iodefCreateItem("Descriptions", "text"),
    iodefRegistryHandles,
    iodefPostalAddress,
    iodefEmails,
    iodefTelephones,
    iodefFax,
    iodefCreateItem("timezone", "text"),
    iodefAdditionalDataList,

    // iodefCreateItem(
    //   "Contacts",
    //   "text"
    // ),
    iodefCreateItemSelect("role", Roles),
    iodefCreateItem("extRole", "text"),
    iodefCreateItemSelect("type", ContactType),
    iodefCreateItem("extType", "text"),
    iodefCreateItemSelect("restriction", restriction),
  ],
};

export const iodefContacts = {
  name: "Contacts",
  label: "Contacts",
  children: [
    iodefCreateItem("contactName", "text"),
    iodefCreateItem("Descriptions", "text"),
    iodefRegistryHandles,
    iodefPostalAddress,
    iodefEmails,
    iodefTelephones,
    iodefFax,
    iodefCreateItem("timezone", "text"),
    iodefAdditionalDataList,

    // iodefCreateItem(
    //   "Contacts",
    //   "text"
    // ),
    iodefCreateItemSelect("role", Roles),
    iodefCreateItem("extRole", "text"),
    iodefCreateItemSelect("type", ContactType),
    iodefCreateItem("extType", "text"),
    iodefCreateItemSelect("restriction", restriction),
  ],
};

export const iodefRelatedActivity = {
  name: "RelatedActivity",
  label: "RelatedActivity",
  children: [
    iodefCreateItem("URLs", "text"),
    iodefCreateItemSelect("restricion", restriction),
    iodefIncidentIDs,
  ],
};

export const iodefHistoryItems = {
  name: "HistoryItems",
  label: "HistoryItems",
  children: [
    iodefCreateItem("dateTime", "text"),
    iodefIncidentID,
    iodefContact,
    iodefCreateItem("Descriptions", "text"),
    iodefAdditionalDataList,
    iodefCreateItemSelect("restriction", restriction),
    iodefCreateItem("action", "text"),
    iodefCreateItem("extAction", "text"),
  ],
};

export const iodefHistory = {
  name: "History",
  label: "History",
  children: [
    iodefHistoryItems,
    iodefCreateItemSelect("restriction", restriction),
  ],
};

export const iodefImpacts = {
  name: "Impacts",
  label: "Impacts",
  children: [
    iodefCreateItem("data", "text"),
    iodefCreateItem("lang", "text"),
    iodefCreateItemSelect("severity", Impacts),
    iodefCreateItemSelect("completion", completion),
    iodefCreateItemSelect("type", impactType),
    iodefCreateItem("extType", "text"),
  ],
};
export const iodefTimeImpacts = {
  name: "TimeImpacts",
  label: "TimeImpacts",
  children: [
    iodefCreateItem("data", "text"),

    iodefCreateItemSelect("severity", Impacts),
    iodefCreateItemSelect("metric", TimeImpactMetric),
    iodefCreateItem("extMetric", "text"),
    iodefCreateItemSelect("duration", Duration),
    iodefCreateItem("extDuration", "text"),
  ],
};

export const iodefMonetaryImpacts = {
  name: "MonetaryImpacts",
  label: "MonetaryImpacts",
  children: [
    iodefCreateItem("data", "text"),
    iodefCreateItemSelect("severity", Impacts),
    iodefCreateItem("currency", "text"),
  ],
};
export const iodefCounters = {
  name: "Counters",
  label: "Counters",
  children: [
    iodefCreateItem("data", "text"),
    iodefCreateItemSelect("type", CounterType),
    iodefCreateItem("extType", "text"),
    iodefCreateItem("meaning", "text"),
    iodefCreateItemSelect("duration", Duration),
    iodefCreateItem("extDuration", "text"),
  ],
};

export const iodefConfidence = {
  name: "Confidence",
  label: "Confidence",
  children: [
    iodefCreateItem("data", "text"),
    iodefCreateItemSelect("rating", ConfidenceRating),
  ],
};
export const iodefAssessments = {
  name: "Assessments",
  label: "Assessments",
  children: [
    iodefCreateItem("occurrence", "text"),
    iodefCreateItemSelect("restriction", restriction),
    iodefImpacts,
    iodefTimeImpacts,
    iodefMonetaryImpacts,
    iodefCounters,
    iodefConfidence,
    iodefAdditionalDataList,
  ],
};

export const iodefAdditionalData = {
  name: "AdditionalData",
  label: "AdditionalData",
  children: [
    iodefCreateItemSelect("dtype", AdditionalDatadtype),
    iodefCreateItem("extDtype", "text"),
    iodefCreateItem("meaning", "text"),
    iodefCreateItem("formatID", "text"),
    iodefCreateItemSelect("restriction", restriction),
  ],
};
export const iodefReference = {
  name: "Reference",
  label: "Reference",
  children: [
    iodefCreateItem("referenceName", "text"),
    iodefCreateItem("URLs", "text"),
    iodefCreateItem("Descriptions", "text"),
  ],
};

export const iodefMethod = {
  name: "Method",
  label: "Method",
  children: [
    iodefCreateItemSelect("restriction", restriction),
    iodefAdditionalData,
    iodefReference,
    iodefCreateItem("Descriptions", "text"),
  ],
};

export const iodefAddresses = {
  name: "Addresses",
  label: "Addresses",
  children: [
    iodefCreateItem("data", "text"),
    iodefCreateItemSelect("category", addressCategory),

    iodefCreateItem("extCategory", "text"),
    iodefCreateItem("vlanName", "text"),
    iodefCreateItem("vlanNum", "number"),
  ],
};

export const iodefNodeRoles = {
  name: "NodeRoles",
  label: "NodeRoles",
  children: [
    iodefCreateItemSelect("category", nodeRoleCategory),
    iodefCreateItem("extCategory", "text"),
    iodefCreateItem("lang", "text"),
  ],
};

export const iodefNode = {
  name: "Node",
  label: "Node",
  children: [
    iodefCreateItem("NodeNames", "text"),
    iodefCreateItem("location", "text"),
    iodefCreateItem("dateTime", "date"),
    iodefNodeRoles,

    iodefCounters,
    iodefAddresses,
  ],
};

export const iodefServices = {
  name: "Services",
  label: "Services",
  children: [
    iodefCreateItem("ipProtocol", "text"),
    iodefCreateItem("port", "text"),
    iodefCreateItem("portList", "text"),
    iodefCreateItem("protoCode", "text"),
    iodefCreateItem("protoType", "text"),
    iodefCreateItem("protoFlags", "text"),
    iodefCreateItem("Applications.swID", "text"),
    iodefCreateItem("Applications.configID", "text"),
    iodefCreateItem("Applications.vendor", "text"),
    iodefCreateItem("Applications.family", "text"),
    iodefCreateItem("Applications.name", "text"),
    iodefCreateItem("Applications.version", "text"),
    iodefCreateItem("Applications.patch", "text"),
    iodefCreateItem("Applications.url", "text"),
  ],
};

export const iodefSystems = {
  name: "Systems",
  label: "Systems",
  children: [
    iodefCreateItemSelect("restriction", restriction),
    iodefCreateItemSelect("category", FlowCategory),
    iodefCreateItem("extCategory", "text"),
    iodefCreateItem("systemInterface", "text"),
    iodefCreateItemSelect("spoofed", Spoofed),
    iodefNode,
    iodefCreateItem("OperatingSystems", "text"), ///with application can we see its details
    iodefCounters,
    iodefCreateItem("Descriptions", "text"),
    iodefAdditionalDataList,
  ],
};

export const iodefFlows = {
  name: "Flows",
  label: "Flows",
  children: [iodefSystems],
};
export const iodefExpectations = {
  name: "Expectations",
  label: "Expectations",

  children: [
    iodefCreateItemSelect("restriction", restriction),
    iodefCreateItem("Severity", "text"),
    iodefCreateItem("Descriptions", "text"),
    iodefCreateItem("startTime", "date"),
    iodefCreateItem("endTime", "date"),
    iodefContact,
  ],
};

export const iodefApplication = {
  name: "Application",
  label: "Application",

  children: [
    iodefCreateItem("swID", "text"),
    iodefCreateItem("configID", "text"),
    iodefCreateItem("vendor", "text"),
    iodefCreateItem("family", "text"),
    iodefCreateItem("name", "text"),
    iodefCreateItem("version", "text"),
    iodefCreateItem("patch", "text"),
    iodefCreateItem("url", "text"),
    iodefCreateItemSelect("restriction", restriction),
  ],
};
export const iodefRecordPatterns = {
  name: "RecordPatterns",
  label: "RecordPatterns",

  children: [
    iodefCreateItem("data", "text"),
    iodefCreateItem("type", "text"),
    iodefCreateItem("extType", "text"),
    iodefCreateItem("offset", "text"),
    iodefCreateItem("offsetUnit", "text"),
    iodefCreateItem("extOffsetUnit", "text"),
    iodefCreateItem("instance", "text"),
  ],
};
export const iodefRecordDataList = {
  name: "RecordDataList",
  label: "RecordDataList",

  children: [
    iodefCreateItem("Descriptions", "text"),
    iodefCreateItemSelect("restriction", restriction),
    iodefCreateItem("dateTime", "date"),
    iodefAdditionalDataList,
    iodefApplication,
    iodefRecordPatterns,
    iodefCreateItem("RecordDataList", "text"),
  ],
};

export const iodefRecord = {
  name: "Record",
  label: "Record",

  children: [
    iodefRecordDataList,
    //------------------------------------------------------------------------------------------
  ],
};

export const iodefEventDataList = {
  name: "EventDataList",
  label: "EventDataList",
  children: [
    iodefContacts,
    iodefAssessments,
    iodefMethod,
    iodefFlows,
    iodefExpectations,
    iodefRecord,
    iodefAdditionalDataList,

    iodefCreateItem("Descriptions", "text"),
    iodefCreateItem("detectTime", "date"),
    iodefCreateItem("startTime", "date"),
    iodefCreateItem("endTime", "date"),
  ],
};

export const iodefIncident = {
  name: "document.Incidents",
  label: "document.Incidents",
  children: [
    iodefIncidentID,
    iodefAlternativeID,
    iodefRelatedActivity,
    iodefHistory,
    iodefAdditionalDataList,
    iodefContacts,
    iodefAssessments,
    iodefMethod,
    iodefEventDataList,

    iodefCreateItem("reportTime", "date"),
    iodefCreateItem("detectTime", "date"),
    iodefCreateItem("startTime", "date"),
    iodefCreateItem("endTime", "date"),

    iodefCreateItem("Descriptions", "text"),
    iodefCreateItem("purpose", "text"),
    iodefCreateItem("extPurpose", "text"),
    iodefCreateItemSelect("restriction", restriction),
    iodefCreateItem("lang", "text"),

    // iodefCreateItem("source_addresses", "text", false),
    // iodefCreateItem("target_addresses", "text", false),
    // iodefCreateItem("source_ports", "text", false),
    // iodefCreateItem("target_ports", "text", false),
  ],
};

export const sender = {
  name: "sender",
  label: "sender",
  children: [createItem("id", "text"), createItem("name", "text")],
};
export const created_by = {
  name: "created_by",
  label: "created_by",
  children: [createItem("id", "text"), createItem("name", "text")],
};
export const iodefFields = [
  iodefIncident,
  iodefCreateItem("received_at", "date"),
  iodefCreateItem("created_by", "text"),
  iodefCreateItem("source_addresses", "text"),
  iodefCreateItem("target_addresses", "text"),
  iodefCreateItem("source_ports", "text"),
  iodefCreateItem("target_ports", "text"),
  iodefCreateItem("Descriptions", "text"),
  booleanCreateItemSelect("viewed"),
  booleanCreateItemSelect("reviewed"),
  iodefCreateItem("error_grade", "text"),
  sender,
  created_by,
];

// x_labels.name (string)
// x_labels.importance (integer)
// x_labels.description (string)
