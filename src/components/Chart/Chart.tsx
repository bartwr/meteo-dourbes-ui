import React, { Fragment, useEffect } from 'react'
// import { useSelector, useDispatch } from 'react-redux'
// import { actionTypes, selectors } from '../../features/counter'

import {
  LineChart,
  Line,
  XAxis,
  // Legend,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';

// interface ChartProps {
//   // chartKey: string;
// }

const Chart = () => {
  // const count = useSelector(selectors.getCountValue)
  // const dispatch = useDispatch()

  useEffect(() => {
  }, [])

  const data = [
    {name: 'Page A', uv: 400, pv: 2400, amt: 2400},
    {name: 'Page B', uv: 600, pv: 22400, amt: 24001}
  ];

  const renderLineChart = (
    <div style={{ width: '100%', height: 400 }}>
      <ResponsiveContainer>
        <LineChart data={data} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
          <Line type="monotone" dataKey="uv" stroke="#8884d8" />
          <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );

  return (
    <Fragment>
      <div className="row">
        <div className="">
          <div className="card blue-grey darken-1">
            <div className="card-content white-text">
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
