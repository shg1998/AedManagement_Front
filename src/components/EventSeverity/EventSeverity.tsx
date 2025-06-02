import { makeStyles } from "@mui/styles";
const useStyles = makeStyles((theme) => ({
  cheapStyle: {
    minWidth: "70px",
    height: "30px",
    borderRadius: "5px",
    display: "flex",
    padding: "5px",
    justifyContent: "center",
    // marginRight: "10px",
    alignItems: "center",
  },
  widget: {
    display: "flex",
    // justifyContent: "center",
    margin: "5px",
  },
}));

interface EventSeverityType {
  severity: string;
  title?: string;
}

const EventSeverity: React.FC<EventSeverityType> = ({ severity, title }) => {
  const classes = useStyles();
  return (
    <>
      {severity === "low" ? (
        <div className={classes.widget}>
          <div
            className={classes.cheapStyle}
            style={{
              color: "#00AC46",
              margin: "2px",
              backgroundColor: "#D9F3E3",
            }}
          >
            {title ? title : "کم"}
          </div>
        </div>
      ) : severity === "medium" ? (
        <div className={classes.widget}>
          <div
            className={classes.cheapStyle}
            style={{ color: "#FD8C00", backgroundColor: "#FFEED9" }}
          >
            {title ? title : "متوسط"}
          </div>
        </div>
      ) : severity === "high" ? (
        <div className={classes.widget}>
          <div
            className={classes.cheapStyle}
            style={{ color: "#DC0000", backgroundColor: "#FAD9D9" }}
          >
            {title ? title : "زیاد"}
          </div>
        </div>
      ) : (
        <div className={classes.widget}>
          <div
            className={classes.cheapStyle}
            style={{ color: "#0070D9", backgroundColor: "#E6F8FF" }}
          >
            نامشخص
          </div>
        </div>
      )}
    </>
  );
};
export default EventSeverity;
