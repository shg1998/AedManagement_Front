import jalaali from "jalaali-js";
import moment from "moment";

interface ConvertJalaliToGregorianUTC {
  (jalaliDateTime: string, customTime?: string): string;
}

const convertJalaliToGregorianUTC: ConvertJalaliToGregorianUTC = (
  jalaliDateTime,
  customTime
) => {
  let [jDate, jTime] = jalaliDateTime.split(" ");


  jTime = customTime ? customTime : jTime;

  const [jYear, jMonth, jDay] = jDate.split("/");

  const [hours, minutes] = jTime ? jTime.split(":") : ["00", "00"];

  const gDateObject = {
    gy: parseInt(jYear),
    gm: parseInt(jMonth),
    gd: parseInt(jDay),
  };

  const { gy, gm, gd } = jalaali.toGregorian(
    gDateObject.gy,
    gDateObject.gm,
    gDateObject.gd
  );


  const gDate = new Date(
    Date.UTC(gy, gm - 1, gd, parseInt(hours), parseInt(minutes))
  );



  const formattedDate = moment(gDate).format("YYYY-MM-DDTHH:mm");



  return formattedDate;
};

export default convertJalaliToGregorianUTC;
