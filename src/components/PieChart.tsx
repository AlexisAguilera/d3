import { useEffect, useState } from 'react';
import * as d3 from 'd3';

const PieChart = ({ datasetPath }) => {
  const [slices, setSlices] = useState([]);
  const [colorScale, setColorScale] =
    useState<d3.ScaleOrdinal<string, unknown, never>>();

  useEffect(() => {
    const getDataset = async () => {
      try {
        const newDataset = await d3.csv(datasetPath);
        const populationPie = d3
          .pie()
          .value((d) => d.value)
          .sort(null);
        const newSlices = populationPie(newDataset);

        const colors = d3.quantize(
          (t) => d3.interpolateSpectral(t),
          newDataset.length
        );
        const newColorScale = d3
          .scaleOrdinal()
          .domain(newDataset.map((el) => el.name))
          .range(colors);

        setSlices(newSlices);
        setColorScale(() => newColorScale);
      } catch (error) {
        console.log('Error loading dataset:', error);
      }
    };

    getDataset();
  }, [datasetPath]);

  const dimensions = {
    width: 600,
    height: 600,
    margins: 10,
  };

  const containerWidth = dimensions.width - dimensions.margins * 2;
  const containerHeight = dimensions.height - dimensions.margins * 2;
  const radius = containerWidth / 2;
  const arc = d3.arc().outerRadius(radius).innerRadius(0);
  const arcLabels = d3.arc().outerRadius(radius).innerRadius(200);

  return (
    <div style={{ margin: '25px auto', width: '600px', position: 'relative' }}>
      <svg width={dimensions.width} height={dimensions.height}>
        <g
          transform={`translate(${dimensions.margins}, ${dimensions.margins})`}
        >
          <g
            transform={`translate(${containerHeight / 2}, ${
              containerWidth / 2
            })`}
          >
            {slices.map((d, i) => (
              <path key={i} d={arc(d)} fill={colorScale(d)} />
            ))}
          </g>
          <g
            transform={`translate(${containerHeight / 2}, ${
              containerWidth / 2
            })`}
            style={{ fontSize: '11px', textAnchor: 'middle' }}
          >
            {slices.map((d) => (
              <text
                key={d.data.value}
                transform={`translate(${arcLabels.centroid(d)})`}
              >
                <tspan style={{ fontWeight: 'bold' }} y={-4}>
                  {d.data.name}
                </tspan>
                {d.endAngle - d.startAngle > 0.25 && (
                  <tspan y={9} x={0}>
                    {d.data.value}
                  </tspan>
                )}
              </text>
            ))}
          </g>
        </g>
      </svg>
    </div>
  );
};

export default PieChart;
