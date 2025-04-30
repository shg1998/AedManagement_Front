// import React, { memo } from "react";
// import ReactWordcloud, { Options, Word } from "react-wordcloud";



import React from 'react';
import HCWordCloud from 'highcharts/modules/wordcloud';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import HCMore from 'highcharts/highcharts-more';
import {exportingOptions, EXPORT_TOOLTIP} from '../chartUtils';
HCMore(Highcharts);
HCWordCloud(Highcharts);

interface Props {
  data: any;
}

const WordCloud: React.FC<Props> = ({ data }) => {

  const options = {
    series: [{
      type: 'wordcloud',
      data: data  ?? [],
      name: 'فراوانی',
      // rotation: {
      //   from: -45,
      //   to: 45,
      // },
      // shape: 'circle',

      maxFontSize: 100,
      minFontSize: 40,
    }],
    title: {
      text: ''
    },
    credits: {
      enabled: false
    },
    exporting: {
      ...exportingOptions(),
    },
    lang: {
      contextButtonTitle: EXPORT_TOOLTIP
    },
    // placementStrategy: 'spiral',
    // Set the maximum font size to 30 and the minimum font size to 10
    maxSize: '80px',
    minSize: 40,
    padding: '20px',
  };

  return (
    <>
      <HighchartsReact highcharts={Highcharts} options={options} />
    </>
  );
};

export default WordCloud;


