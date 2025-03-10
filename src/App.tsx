import * as d3 from 'd3';
import Scatterplot from './components/Scaterrplot';
import Heatmap from './components/HeatMap';
import LogScaleChart from './components/LogScaleChart';
import WheaterChart from './components/WheaterChart';

import wheater from './data/wheater.json';
import heatmap from './data/heatmap.json';
import logScale from './data/logScale.json';

import './App.css';
import { useEffect, useState } from 'react';
import PieChart from './components/PieChart';

function App() {
  return (
    <>
      <PieChart datasetPath='/src/data/piechart.csv' />
      <WheaterChart />
      <LogScaleChart
        data={logScale}
        nameAccessor={(d) => d.name}
        sizeAccessor={(d) => d.size}
      />

      <Heatmap
        data={heatmap}
        dimensions={{ width: 600, height: 150 }}
        scale='linear'
      />
      <Heatmap
        data={heatmap}
        dimensions={{ width: 600, height: 150 }}
        scale='quantile'
      />
      <Heatmap
        data={heatmap}
        dimensions={{ width: 600, height: 150 }}
        scale='quantize'
      />
      <Heatmap
        data={heatmap}
        dimensions={{ width: 600, height: 150 }}
        scale='threshold'
      />

      <Scatterplot
        data={wheater as any[]}
        dimensions={{
          width: 800,
          height: 800,
          margin: { top: 50, bottom: 50, left: 50, right: 50 },
        }}
        xAccessor={(d) => d.currently.humidity}
        yAccessor={(d) => d.currently.apparentTemperature}
        yAxisLabel='Temperature &deg; F'
        xAxisLabel='Humidity'
      />
    </>
  );
}

export default App;
