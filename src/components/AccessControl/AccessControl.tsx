import { useCurrentUserState } from "../../context/CurrentUserContext";
import React, { PropsWithChildren } from "react";

interface Props {
  section_name?: string;
  module_name?: string;
  access?: string;
  level?: number;
  getOnly?: boolean;
}
export const useHandleAccessControl = (
  section_name?: string,
  module_name?: string,
  access?: string,
  level?: number,
  getOnly?: boolean
): boolean => {
  const currentUserInfo = useCurrentUserState();
  const permissions = currentUserInfo?.permissions;
  let show = false;
  let visibleTabs = [];
  const all_modules = permissions?.filter(
    (per) => per?.section_name === section_name
  );
  const current_module: any = all_modules?.filter(
    (item) => item?.module_name === module_name
  )?.[0];
  if (
    (section_name === "undefined" || section_name === undefined) &&
    (module_name === "undefined" || module_name === undefined)
  ) {
    show = true;
  } else if (current_module === undefined) {
    if (module_name?.includes("|")) {
      // for multi tabs pages(incident)
      const modules = module_name.split("|");
      const temp_modules = all_modules?.filter((item) =>
        modules.includes(item?.module_name)
      );
      if (getOnly) {
        // for advance search in sidebar
        visibleTabs = temp_modules?.filter((item) => item?.get_access > 0);
      } else {
        visibleTabs = temp_modules?.filter(
          (item) => item?.get_access > 0 || item?.create_access > 0
        );
      }
    } else if (module_name === "") {
      // check all tabs of a page (dashboard)
      visibleTabs = all_modules?.filter((item) => item?.get_access > 0);
    } else {
      // check when module_name has no access
      show = false;
    }
  } else {
    //@ts-ignore
    // check if have specific access
    if (access && !level && current_module[access] > 0) {
      show = true;
    } else if (access && level && current_module[access] > level) {
      show = true;
    }
  }
  if (access) {
    return show;
  } else if (
    current_module?.get_access > 0 ||
    current_module?.create_access > 0 ||
    visibleTabs.length > 0 ||
    show
  ) {
    return true;
  } else {
    return false;
  }
};

const AccessControl: React.FC<PropsWithChildren<Props>> = ({
  section_name,
  module_name,
  access,
  children,
  getOnly,
}) => {
  // const hasAccess =  useHandleAccessControl(
  //   section_name,
  //   module_name,
  //   access,
  //   undefined,
  //   getOnly
  // );
  return <>{children}</>;
};

export default AccessControl;
