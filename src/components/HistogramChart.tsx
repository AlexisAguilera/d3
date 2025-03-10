import React, { useRef, useEffect } from 'react';
import * as d3 from 'd3';
import AnimatedRect from './ui/AnimatedRect';
import AnimatedText from './ui/AnimatedText';

type HistogramChartProps = {
  dataset: any[];
  xAccessor: (d: any) => number;
  yAccessor: (d: any) => number;
};

const HistogramChart: React.FC<HistogramChartProps> = ({
  dataset,
  xAccessor,
  yAccessor,
}) => {
  const gx = useRef<SVGGElement | null>(null);
  const rectRef = useRef<SVGRectElement | null>(null);
  const dimensions = {
    width: 800,
    height: 400,
    margins: 50,
  };
  const containerWidth = dimensions.width - dimensions.margins * 2;
  const containerHeight = dimensions.height - dimensions.margins * 2;

  // scales
  const xScale = d3
    .scaleLinear()
    .domain(d3.extent(dataset, xAccessor) as [number, number])
    .range([0, containerWidth])
    .nice();

  // formate data for histogram
  const bin = d3.bin().domain(xScale.domain()).value(xAccessor).thresholds(10);
  const binnedData = bin(dataset);

  const padding = 1;

  const yScale = d3
    .scaleLinear()
    .domain([0, d3.max(binnedData, yAccessor)])
    .range([containerHeight, 0])
    .nice();

  const calculateHeight = (d: any) => {
    return containerHeight - yScale(yAccessor(d));
  };

  const xAxis = d3.axisBottom(xScale);

  useEffect(() => {
    if (gx.current) d3.select(gx.current).transition().call(xAxis);
  }, [xAxis]);

  useEffect(() => {
    if (rectRef.current) {
      d3.select(rectRef.current).transition().duration(1000);
    }
  }, []);

  return (
    <div style={{ margin: '25px auto', width: 800, backgroundColor: 'white' }}>
      <svg height={dimensions.height} width={dimensions.width}>
        <g
          transform={`translate(${dimensions.margins}, ${dimensions.margins})`}
        >
          {binnedData.map((d, i) => (
            <g key={i}>
              <AnimatedRect
                width={Math.max(0, xScale(d.x1) - xScale(d.x0) - padding)}
                height={calculateHeight(d)}
                x={xScale(d.x0)}
                y={yScale(yAccessor(d))}
                fill='#01c5c4'
              />
              <AnimatedText
                x={xScale(d.x0) + (xScale(d.x1) - xScale(d.x0)) / 2}
                y={yScale(yAccessor(d)) - 10}
              >
                {yAccessor(d)}
              </AnimatedText>
            </g>
          ))}
          <g
            ref={gx}
            style={{
              transform: `translateY(${containerHeight}px)`,
              color: 'black',
            }}
          ></g>
        </g>
      </svg>
    </div>
  );
};

export default HistogramChart;
