import React, {
  Fragment,
  useState
  // useEffect
} from 'react'
// import Counter from '../components/counter/Counter'
// import JSConfetti from 'js-confetti'
import Chart from '../components/Chart/Chart'
import List from '../components/List/List'

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

  // useEffect(() => {
  //   const jsConfetti = new JSConfetti()
  //   jsConfetti.addConfetti({
  //     // emojis: ['🌈', '⚡️', '💥', '✨', '💫', '🌸'],
  //     // confettiColors: [
  //     //  '#ff0a54', '#ff477e', '#ff7096', '#ff85a1', '#fbb1bd', '#f9bec7',
  //     // ]
  //  })
  // }, []);

  const [view, setView] = useState('chart');

  console.log('view', view);

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
      {view === 'chart' && <Chart />}
      {view === 'list' && <List />}
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
