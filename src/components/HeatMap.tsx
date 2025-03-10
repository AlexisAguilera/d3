import * as d3 from 'd3';
import React from 'react';

type ScaleType = 'linear' | 'quantize' | 'quantile' | 'threshold';

interface HeatmapProps {
  data: number[];
  dimensions: { width: number; height: number };
  boxSize?: number;
  scale: ScaleType;
}

const Heatmap: React.FC<HeatmapProps> = ({
  data,
  dimensions,
  boxSize = 30,
  scale,
}) => {
  const sortedData = data;

  let colorScale;
  switch (scale) {
    case 'linear':
      colorScale = d3
        .scaleLinear()
        .domain(d3.extent(sortedData) as [number, number])
        .range(['white', 'red']);
      break;
    case 'quantize':
      colorScale = d3
        .scaleQuantize()
        .domain(d3.extent(sortedData) as [number, number])
        .range(['white', 'pink', 'red']);
      break;
    case 'quantile':
      colorScale = d3
        .scaleQuantile()
        .domain(sortedData)
        .range(['white', 'pink', 'red']);
      break;
    case 'threshold':
      colorScale = d3
        .scaleThreshold()
        .domain([45200, 135600])
        .range(d3.schemeReds[3]);
      break;
    default:
      colorScale = d3
        .scaleLinear()
        .domain(d3.extent(sortedData) as [number, number])
        .range(['white', 'red']);
  }

  return (
    <div style={{ backgroundColor: 'white' }}>
      <div>
        <svg width={dimensions.width} height={dimensions.height}>
          <g stroke='black' transform='translate(2,2)'>
            {sortedData.map((d, i) => (
              <rect
                key={i}
                width={boxSize - 3}
                height={boxSize - 3}
                x={boxSize * (i % 20)}
                y={boxSize * Math.floor(i / 20)}
                fill={String(colorScale(d))}
              />
            ))}
          </g>
        </svg>
      </div>
    </div>
  );
};

export default Heatmap;
