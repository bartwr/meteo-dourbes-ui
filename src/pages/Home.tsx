import React, { Fragment } from 'react'
// import Counter from '../components/counter/Counter'
import Chart from '../components/Chart/Chart'

const serverUrl = 'http://162.55.161.20';
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
  return (
    <Fragment>
      <p>
        Hoi Chris, gefeliciteerd met je verjaardag!
      </p>
      <p>
        Hieronder vind je allereerst de linkjes naar de CSV-bestanden met ruwe data. Daaronder staan grafiekjes met data van de afgelopen maanden.
      </p>
      <h2>
        Download CSV-bestanden
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
      <Chart />
    </Fragment>
  )
}