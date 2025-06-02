import AccessControl from "../AccessControl/AccessControl";

interface Props {
  element: any;
  section_name: string;
  module_name: string;
  access?: string;
}

const CustomRoute: React.FC<Props> = ({
  element,
  section_name,
  module_name,
  access,
}) => {
  return (
    <>
      <AccessControl section_name={section_name} module_name={module_name} access={access}>
        {element}
      </AccessControl>
    </>
  );
};

export default CustomRoute;
