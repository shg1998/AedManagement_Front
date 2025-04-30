import { RuleGroupType } from "react-querybuilder";

export interface UserLoginInterface {
  username: string;
  password: string;
}

export interface IAccessToken {
  userName: string;
  password: string;
}

export interface NewPasswordDataInterface {
  reset_token: string;
  new_password: string;
  confirm_password: string;
}
export interface ChangePasswordDataInterface {
  reset_token?: string;
  old_password: string;
  new_password: string;
  confirm_password: string;
}
export interface ChangePassErrorTypes {
  count: boolean | null;
  smallAndCaps: boolean | null;
  num: boolean | null;
  symbol: boolean | null;
}

export interface ChangePassFormTypes {
  error?: ChangePassErrorTypes;
  oldPassword?: string;
  newPassword?: string;
  repeatNewPassword?: string;
}
export interface NewUserFormInterface {
  username: string;
  password: string;
  email: string;
  mobile: string;
  first_name: string;
  last_name: string;
  status: string;
  description: string;
  // image_url: string;
}
export interface NewUserFormInterfaceOTP {
  userData: NewUserFormInterface;
  otpCode: string;
}
export interface PersonalInfoInterface {
  email: string;
  mobile: string;
  first_name: string;
  last_name: string;
  image_url: string;
  authentication_method: string;
}
export interface PersonalInfoInterfaceProps {
  userData: PersonalInfoInterface;
  otpCode: string;
}
export interface SystemResetProps {
  userId: string;
  otpCode: string;
}

export interface EditUserInterface {
  userId: number;
  data: NewUserFormInterface;
  otpCode: string;
}

export interface NewGroupFormInterface {
  otp: string;
  name: string;
  description: string;
  is_active: boolean;
}
export interface UpdateGroupFormInterface {
  otp?: string;
  id?: number;
  data: any;
}
export interface objectType {
  type: string;
  relationship_type: string;
  target_ref: string;
  source_ref: string;
}

export interface Properties {
  id: string;
  name: string;
  x_organization: string;
  domain: string;
  description: string;
  occurred_time: string;
  reported_time: string;
  modified: string;
  categories_type: string;
}

export interface AddIncidentInterface {
  objects: (Properties | objectType)[];
}

export interface DeleteRoleInterface {
  otpCode: string;
  roleID: string;
}
export interface BatchDeleteInterface {
  otpCode: string;
  roleIDs: [];
}

export interface AddMalwareInterface {
  type: string;
  name: string;
  aliases: [];
  architecture_execution_envs: [];
  implementation_languages: [];
  malware_types: [];
  description: string;
  first_seen: string;
  last_seen: string;
  is_family: boolean;
}
export interface editMalwareInterface extends AddMalwareInterface {
  id: string;
}
export interface ListItemInterface {
  name?: string;
  section?: string;
  getOnly?: boolean;
  Icon: any;
  text: string;
  selected: boolean;
  link: string;
  props: any;
  isNested?: boolean;
  children?: any;
}

export interface AddObjectProps {
  type: string;
  data: string;
}
export interface ActionInterface {
  type: string;
  value?: any;
}

export interface ObjectPropsType {
  filter?: string;
  drilldownedPoint?: any;
  queryBuilderFormatDrillDown?: RuleGroupType;
  handleResetDrillDownQuery?: () => void;
  from_version?: string;
  to_version?: string;
  senderID?: string;
  outerTimeFilter?: { table_from: string; table_to: string };
}


export interface NewOrganizationLabelType {
  title: any;
  description?: any;
  tlp: string;
}