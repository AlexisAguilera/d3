import { useState } from 'react';
import HistogramChart from './HistogramChart';
import wheater from '../data/wheater.json';

const WheaterChart = () => {
  const [selectedOption, setSelectOption] = useState('humidity');

  const onChangeSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    e.preventDefault();
    setSelectOption(e.target.value);
  };
  return (
    <div>
      <select id='metrics' onChange={onChangeSelect} defaultValue={'humidity'}>
        <option value='humidity'>Humidity</option>
        <option value='temperature'>Temperature</option>
        <option value='dewPoint'>Dew Poing</option>
        <option value='windSpeed'>Wind Speed</option>
        <option value='cloudCover'>Cloud Cover</option>
        <option value='ozone'>Ozone</option>
      </select>
      <HistogramChart
        yAccessor={(d) => {
          return d?.length || 0;
        }}
        xAccessor={(d) => d.currently[selectedOption]}
        dataset={wheater as any[]}
      />
    </div>
  );
};
export default WheaterChart;
