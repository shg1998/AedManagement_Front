import emptyPiChart from "../../assets/images/emptyChart/emptyChart.png";

const EmptyChartPlaceHolder = () => {
  return (
    <div style={{ position: "relative", display: "inline-block" }}>
      <p
        style={{
          position: "absolute",
          top: "52%",
          left: "25%",
          fontSize: "18px",
          textAlign: "center",
          opacity: "0.5",
        }}
      >
        {"داده‌ای وجود ندارد "}
      </p>
      <img
        style={{
          display: "block",
          width: "100%",
          height: "auto",
          opacity: "0.4",
        }}
        alt=""
        src={emptyPiChart}
      />
    </div>
  );
};
export default EmptyChartPlaceHolder;
