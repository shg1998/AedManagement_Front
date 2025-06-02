import { makeStyles } from "@mui/styles";
const useStyles = makeStyles((theme) => ({
  cheapStyle: {
    width: "50px",
    height: "25px",
    borderRadius: "5px",
    display: "flex",
    justifyContent: "center",
    marginLeft: "10px",
    alignItems: "center",
  },
  widget: {
    display: "flex",
  },
}));

interface CVSSScoreType {
  score: number;
}
const CVSSScore: React.FC<CVSSScoreType> = ({ score }) => {
  const classes = useStyles();
  return (
    <>
      {score == null ? (
        <div className={classes.widget}>نامشخص</div>
      ) : score <= 2 ? (
        <div className={classes.widget}>
          <div
            className={classes.cheapStyle}
            style={{ color: "#00AC46", backgroundColor: "#D9F3E3" }}
          >
            {score}
          </div>
          بی اثر
        </div>
      ) : score > 2 && score <= 4 ? (
        <div className={classes.widget}>
          <div
            className={classes.cheapStyle}
            style={{ color: "#E3B100", backgroundColor: "#FFFFD6" }}
          >
            {score}
          </div>
          کم
        </div>
      ) : score > 4 && score < 7 ? (
        <div className={classes.widget}>
          <div
            className={classes.cheapStyle}
            style={{ color: "#FD8C00", backgroundColor: "#FFEED9" }}
          >
            {score}
          </div>
          متوسط
        </div>
      ) : score > 7 && score < 9 ? (
        <div className={classes.widget}>
          <div
            className={classes.cheapStyle}
            style={{ color: "#DC0000", backgroundColor: "#FAD9D9" }}
          >
            {score}
          </div>
          بالا
        </div>
      ) : (
        <div className={classes.widget}>
          <div
            className={classes.cheapStyle}
            style={{ color: "#780000", backgroundColor: "#EBD9D9" }}
          >
            {score}
          </div>
          بحرانی
        </div>
      )}
    </>
  );
};
export default CVSSScore;
