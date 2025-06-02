import React from "react";
import ReactWordcloud, { Word, Options } from "react-wordcloud";
import "./MyWordCloudComponent.css";

interface Props {
  chartKey: number;
  data: Word[];
  callbackFunc?: any;
}

const MyWordCloudComponent: React.FC<Props> = ({
  chartKey,
  data,
  callbackFunc,
}) => {
  const TOPIC_COLORS = [
    "#58A2F9",
    "#4CD0D0",
    "#EC734C",
    "#F587B5",
    "#DA9A3BD1",
    "#41C59D",
    "#6CBD46AD",
    "#89D167AD",
    "#727EE9AD",
    "#EF5F5F",
    "#5AD3F9",
  ];
    const size: [number, number] = [600, 400];

  const options: any = {
    // colors: TOPIC_COLORS,
    enableTooltip: true,
    // fontFamily:
    //   "vazir, yekan, yekannums, Helvetica Neue, Helvetica, Arial,sans-serif",
    fontStyle: "normal",
    fontWeight: "bolder",
    padding: "3",
    rotations: 4,
    // rotationAngles: [-20, 30],
    fontSizes: [25, 40],
    size: size,
    scale: "linear",
    spiral: "rectangular",
    transitionDuration: 1000,
  };


  return (
    <div className="reactWordCloudContainerStyle" style={{ width: "100%" }}>
      <ReactWordcloud
        // key={chartKey}
        words={data}
        callbacks={callbackFunc ? callbackFunc : undefined}
        options={options}
      />
    </div>
  );
};

export default MyWordCloudComponent;
