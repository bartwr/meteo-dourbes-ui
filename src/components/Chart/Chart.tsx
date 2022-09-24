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
  Brush,
  ResponsiveContainer,
  ReferenceLine
} from 'recharts';

import moment from 'moment';

interface DataObject {
  timestamp: string;
  name: string;
  temp?: string;
  precip?: string;
}

let serverUrl = 'https://meteo-dourbes.bartroorda.nl';
serverUrl = 'http://localhost:5000';

const Chart = () => {

  const [tempData, setTempData] = useState<any[]>([]);
  const [precipData, setPrecipData] = useState<any[]>([]);

  const getTempData = async () => {
    const response = await fetch(`${serverUrl}/api/temp`);
    const json = await response.json();
    // Save to state
    setTempData(json);
  }

  const getPrecipData = async () => {
    const response = await fetch(`${serverUrl}/api/precip`);
    const json = await response.json();
    // Save to state
    setPrecipData(json);
  }

  useEffect(() => {
    getTempData();
    getPrecipData();
  }, [])

  const combineData = (dataSet1: any, dataSet2: any, dataSet2Type: string) => {

    // Create variable for combined data
    let combinedData: Array<DataObject> = [];

    const getTimestampInDataSet = (dataSet: any, timestamp: any) => {
      const foundRecord = dataSet.filter((x: any) => {
        return Number(x.timestamp) === Number(timestamp);
      });
      return foundRecord ? foundRecord[0] : false;
    }

    const addObject = (dataStore: any, dataTypeToAdd: any, objectToAdd: any) => {
      // Validate that field2 was set
      if(! objectToAdd.field2) return;

      // Check if there's a record with this timestamp already
      const timestamp = objectToAdd.field1;
      const existingRecord = getTimestampInDataSet(dataSet1, timestamp);
      let objectData = existingRecord || [];
      // If there was an existing record with this timestamp:
      if(existingRecord) {
        objectData[dataTypeToAdd] = objectToAdd.field2;
        combinedData.push(objectData)
        return objectData;
      }
      // If there was no existing record with this timestamp yet:
      // -> Create record for timestamp
      objectData.timestamp = objectToAdd.field1;
      objectData.name = moment.utc(objectToAdd.field1, 'x').local().format('DD MMM HH:mm');
      objectData[dataTypeToAdd] = objectToAdd.field2;

      // Add object to combinedData object
      combinedData.push(objectData)

      return objectData;
    }

    // For every dataSet2 object: Add it to combinedData
    dataSet2.forEach((x: any) => addObject(combinedData, dataSet2Type, x));

    return combinedData;
  }

  const getChartData = () => {
    // Create chartData variable
    let chartData;
    // Add tempData to chart data
    chartData = combineData([], tempData, 'temp');
    // Add precipData to chart data
    chartData = combineData(chartData, precipData, 'precip');

    return chartData;
  };

  const getDataOfLastMonth = (allData: any) => {
    const dateOneMonthAgo = moment().subtract(1, 'month').unix() * 1000;
    const dataOfLastMonth = allData.filter((x: any) => {
      return Number(x.timestamp) >= Number(dateOneMonthAgo);
    });
    return dataOfLastMonth;
  }

  // Get all chart data of last month
  let data = getChartData();
  data = getDataOfLastMonth(data);

  const renderLineChart = (
    <div style={{ width: '100%', height: 500 }}>
      <ResponsiveContainer>
        <LineChart data={data} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
          <Line type="monotone" dataKey="temp" name="Temperatuur" unit=" °C" stroke="orange" />
          <Line type="monotone" dataKey="precip" name="Neerslag" unit=" mm/u" stroke="blue" />
          <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
          <XAxis dataKey="name" />
          <YAxis domain={[-10, 20]} />
         <ReferenceLine y={0} label="" stroke="#666" strokeDasharray="100% 5" />
         <Tooltip />
          <Legend verticalAlign="top" height={36}/>
          <Brush dataKey="name" />
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
              <span className="card-title">Chart</span>
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
