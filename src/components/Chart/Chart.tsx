import React, {
  Fragment,
  useEffect,
  useState
} from 'react'
// import { useSelector, useDispatch } from 'react-redux'
// import { actionTypes, selectors } from '../../features/counter'

import {
  LineChart,
  Line,
  XAxis,
  Legend,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';

import moment from 'moment';

// interface ChartProps {
//   // chartKey: string;
// }

// interface ResponseObject {
//   field2: string;
//   field3: string;
// }

const serverUrl = 'https://meteo-dourbes.bartroorda.nl/';

const Chart = () => {

  const [tempData, setTempData] = useState<any[]>([]);
  const [precipData, setPrecipData] = useState<any[]>([]);

  const getTempData = async () => {
    const response = await fetch(`${serverUrl}/api/temp`);
    const json = await response.json();
    setTempData(json);
  }

  const getPrecipData = async () => {
    const response = await fetch(`${serverUrl}/api/precip`);
    const json = await response.json();
    setPrecipData(json);
  }

  useEffect(() => {
    getTempData();
    getPrecipData();
  }, [])

  let data = tempData.map(x => {
    return {
      timestamp: x.field2,
      name: moment.utc(x.field2, 'x').format('DD MMM HH:mm'),
      temp: x.field3
    }
  })
  
  data = data.map(x => {
    const foundRecord = precipData.filter(precip => {
      return precip.field2 === x.timestamp;
    });
    if(! foundRecord || foundRecord.length === 0) return x;
    return Object.assign({}, x, {
      precip: foundRecord[0].field3
    });
  })

  const renderLineChart = (
    <div style={{ width: '100%', height: 400 }}>
      <ResponsiveContainer>
        <LineChart data={data} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
          <Line type="monotone" dataKey="temp" stroke="orange" />
          <Line type="monotone" dataKey="precip" stroke="blue" />
          <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend verticalAlign="top" height={36}/>
        </LineChart>
      </ResponsiveContainer>
    </div>
  );

  return (
    <Fragment>
      <div className="row">
        <div className="">
          <div className="card" style={{background: '#eee'}}>
            <div className="card-content black-text">
              <span className="card-title">Chart component</span>
              <p>
                Hieronder zie je de temperatuur en neerslag in Dourbes.
              </p>
            </div>
            {renderLineChart}
          </div>
        </div>
      </div>
    </Fragment>
  )
}

export default Chart
