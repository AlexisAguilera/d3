import React, { useRef, useEffect } from 'react';
import * as d3 from 'd3';

interface LogScaleChartProps {
  data: { [key: string]: any }[]; // dataset with dynamic structure
  nameAccessor: (d: any) => string; // function to access name
  sizeAccessor: (d: any) => number; // function to access size
  width?: number;
  height?: number;
  margin?: number;
}

const LogScaleChart: React.FC<LogScaleChartProps> = ({
  data,
  nameAccessor,
  sizeAccessor,
  width = 200,
  height = 500,
  margin = 50,
}) => {
  const gy = useRef<SVGGElement | null>(null);

  const universeScale = d3
    .scaleLog()
    .domain(d3.extent(data, sizeAccessor) as [number, number])
    .range([height - margin, margin]);

  const axis = d3
    .axisLeft(universeScale)
    .tickValues([1e-15, 1e-8, 1e-3, 1, 1e3, 1e6, 1e9, 1e13, 1e18]) // Specify desired ticks
    .tickFormat(d3.format('.0e'));

  useEffect(() => {
    if (gy.current) d3.select(gy.current).call(axis);
  }, [axis]);

  return (
    <div
      style={{
        width,
        height,
        backgroundColor: '#f7f7f7',
        margin: '25px auto',
      }}
    >
      <svg width={width} height={height}>
        <g style={{ fontSize: '16px', dominantBaseline: 'middle' }}>
          {data.map((d, i) => (
            <g key={i}>
              <circle
                cx={margin}
                cy={universeScale(sizeAccessor(d))}
                r={6}
              ></circle>
              <text x={margin + 15} y={universeScale(sizeAccessor(d))}>
                {nameAccessor(d)}
              </text>
            </g>
          ))}
        </g>
        <g ref={gy} transform={`translate(${margin}, 0)`} color='black'></g>
      </svg>
    </div>
  );
};

export default LogScaleChart;
