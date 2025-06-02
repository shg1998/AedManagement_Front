import { malwares } from "./api/malwares/malwares";
import { attackPattern } from "./api/attack-pattern/attackPattern";
import { attackTool } from "./api/attack-tool/attackTool";
import { assets } from "./api/assets/assets";
import { organization } from "./api/organization/organization";
import { groups } from "./api/groups/groups";
import { users } from "./api/users/users";
import { roles } from "./api/roles/roles";
import { sco } from "./api/sco/sco";
import { cve } from "./api/cve/cve";
import { cwe } from "./api/cwe/cwe";
import { capec } from "./api/capec/capec";
import { attck } from "./api/attck/attck";
import { stixs } from "./api/stix/stix";
import { iodefs } from "./api/iodef/iodef";
import { vulnerability } from "./api/vulnerability/vulnerability";
import { campaign } from "./api/campaign/campaign";
import { organizationTag } from "./api/organizationTag/organizationTag";
import { locations } from "./api/locations/locations";
import { savedSearch } from "./api/saved-search/savedSearch";
import { alarms } from "./api/alarms/alarms";
import { labels } from "./api/labels/labels";
import { otp } from "./api/otp/otp";
import { intrusionSet } from "./api/intrusion-set/intrusionSet";
import { threatActor } from "./api/threat-actor/threatActor";
import { threatDashboard } from "./api/dashboard/threat/threat";
import { iodefDashboard } from "./api/dashboard/iodef/iodefDashboard";
import { stixDashboard } from "./api/dashboard/stix/stixDashboard";
import { vulnerabilityDashboard } from "./api/dashboard/vulnerability/vulnerabilityDashboard";
import { ttpDashboard } from "./api/dashboard/ttp/ttpDashboard";
import { sentNotifications } from "./api/notifications/sentNotifications/sentNotifications";
import { receivedNotifications } from "./api/notifications/receivedNotifications/receivedNotifications";
import { publicSituationalAwareness } from "./api/dashboard/publicSituationalAwareness/publicSituationalAwareness";
import { userSetting } from "./api/setting/userSetting/userSetting";
import { taxiiSetting } from "./api/setting/taxiiSetting/taxiiSetting";
import { notificationSetting } from "./api/setting/notificationSetting/notificationSetting";
import { reports } from "./api/reports/reports";

export const handlers = [
  ...malwares,
  ...attackPattern,
  ...attackTool,
  ...assets,
  ...organization,
  ...groups,
  ...users,
  ...roles,
  ...sco,
  ...cve,
  ...cwe,
  ...capec,
  ...attck,
  ...stixs,
  ...iodefs,
  ...vulnerability,
  ...campaign,
  ...intrusionSet,
  ...threatActor,
  ...threatDashboard,
  ...publicSituationalAwareness,
  ...iodefDashboard,
  ...stixDashboard,
  ...vulnerabilityDashboard,
  ...ttpDashboard,
  ...sentNotifications,
  ...receivedNotifications,
  ...savedSearch,
  ...alarms,
  ...organizationTag,
  ...locations,
  ...otp,
  ...userSetting,
  ...taxiiSetting,
  ...notificationSetting,
  ...reports,
  ...labels,
];
