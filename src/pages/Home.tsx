import React, {
  Fragment,
  useState,
  useEffect
} from 'react'
// import Counter from '../components/counter/Counter'
// import JSConfetti from 'js-confetti'
import Chart from '../components/Chart/Chart'
import List from '../components/List/List'

import {
  fetchTempData,
  fetchPrecipData
} from '../api/meteo'

import {
  createDataObject,
  getDataOfLastMonth
} from '../lib/meteoData';

const serverUrl = 'https://meteo-dourbes.bartroorda.nl';
const csvFiles = [
  'temp.csv',
  'precip.csv',
  'humidity.csv',
  'wind_strenght.csv',
  'wind_direction.csv',
  'pressure.csv',
  'radiation.csv'
]

export const Home: React.FC = () => {

  const [view, setView] = useState('chart');
  const [tempData, setTempData] = useState<any[]>([]);
  const [precipData, setPrecipData] = useState<any[]>([]);
  const [combinedData, setCombinedData] = useState<any[]>([]);

  // Get all chart data of last month
  useEffect(() => {
    if(tempData.length === 0 || precipData.length === 0) return;

    // Create combined meteo data object
    let data = createDataObject(tempData, precipData);
    data = getDataOfLastMonth(data);

    // Convert data arrays to data objects
    // Inspiration from https://stackoverflow.com/a/36388401
    data = data.map(x => Object.assign({}, x));

    // Set state variable
    setCombinedData(data);
  }, [
    tempData,
    precipData
  ])

  useEffect(() => {
    (async () => {
      const temp = await fetchTempData();
      setTempData(temp);
    })();
    (async () => {
      const precip = await fetchPrecipData();
      setPrecipData(precip);
    })();
  }, [])

  return (
    <Fragment>
      <div className="flex">
        <h2 className="flex-1">
          Temperatuur en neerslag
        </h2>
        <a
          className="flex flex-col justify-center"
          style={{fontSize: '20px', lineHeight: '32px', cursor: 'pointer'}}
          onClick={() => setView(view === 'chart' ? 'list' : 'chart')}
        >
          {view === 'chart' ? 'tabel' : 'grafiek'}
        </a>
      </div>
      {view === 'chart' && <Chart combinedData={combinedData} />}
      {view === 'list' && <List combinedData={combinedData} />}
      {! combinedData || combinedData.length === 0 ? <p>Data wordt geladen..</p> : <></>}
      <h2>
        Download CSV's
      </h2>
      <ul>
        {csvFiles.map(x => {
          return <li key={x}>
            <a href={`${serverUrl}/data/${x}`} target="_blank">
              {x}
            </a>
          </li>
        })}
      </ul>
    </Fragment>
  )
}
