import CircularProgress from "@mui/material/CircularProgress";
import ReactLoading from "react-loading";
import { useThemeContext } from "../../ThemeContext";

const LoadingComponent: React.FC = () => {
  const { theme } = useThemeContext();

  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100%",
          marginTop: "50px",
        }}
      >
        <ReactLoading
          delay={10}
          type="spokes"
          color={theme.palette.primaryColor.main}
        />
      </div>
    </>
  );
};

export default LoadingComponent;
