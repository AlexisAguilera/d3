import * as d3 from 'd3';
import { useEffect, useRef } from 'react';

interface Dimensions {
  width: number;
  height: number;
  margin: {
    top: number;
    bottom: number;
    left: number;
    right: number;
  };
}

interface ScatterplotProps {
  data: any[];
  dimensions: Dimensions;
  xAccessor: (d: any) => number;
  yAccessor: (d: any) => number;
  xAxisLabel: string;
  yAxisLabel: string;
}

const Scatterplot: React.FC<ScatterplotProps> = ({
  data,
  dimensions,
  xAccessor,
  yAccessor,
  xAxisLabel,
  yAxisLabel,
}) => {
  const gx = useRef<SVGGElement | null>(null);
  const gy = useRef<SVGGElement | null>(null);

  const { width, height, margin } = dimensions;
  const containerWidth = width - margin.left - margin.right;
  const containerHeight = height - margin.top - margin.bottom;

  const xScale = d3
    .scaleLinear()
    .domain(d3.extent(data, xAccessor) as [number, number])
    .rangeRound([0, containerWidth])
    .clamp(true);

  const yScale = d3
    .scaleLinear()
    .domain(d3.extent(data, yAccessor) as [number, number])
    .rangeRound([containerHeight, 0])
    .nice()
    .clamp(true);

  const xAxis = d3
    .axisBottom(xScale)
    //this add number of ticks in the axis + change the format
    .ticks(5)
    .tickFormat((d) => d * 100 + '%');

  const yAxis = d3.axisLeft(yScale);

  useEffect(() => {
    if (gx.current) d3.select(gx.current).call(xAxis);
  }, [xAxis]);

  useEffect(() => {
    if (gy.current) d3.select(gy.current).call(yAxis);
  }, [yAxis]);

  return (
    <div>
      <svg width={width} height={height}>
        <g transform={`translate(${margin.left}, ${margin.top})`}>
          <g
            ref={gx}
            transform={`translate(0,${containerHeight})`}
            fontSize='18px'
          >
            <text x={containerWidth / 2} y={margin.bottom / 1.5} fill='white'>
              {xAxisLabel}
            </text>
          </g>
          <g ref={gy} fontSize='18px'>
            <text
              x={-containerHeight / 2}
              y={-margin.left + 15}
              style={{
                textAnchor: 'middle',
                transform: 'rotate(270deg)',
                fill: 'white',
              }}
            >
              {yAxisLabel}
            </text>
          </g>
          {data.map((d, i) => (
            <circle
              key={i}
              cx={xScale(xAccessor(d))}
              cy={yScale(yAccessor(d))}
              r='5'
              fill='red'
              onMouseEnter={(_event: React.MouseEvent<SVGCircleElement>) =>
                console.log('holis', d)
              }
            />
          ))}
        </g>
      </svg>
    </div>
  );
};

export default Scatterplot;
