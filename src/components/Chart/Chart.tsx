import React, {
  Fragment,
  // useEffect,
  // useState
} from 'react'
// import { useSelector, useDispatch } from 'react-redux'
// import { actionTypes, selectors } from '../../features/counter'

import {
  ComposedChart,
  Line,
  Bar,
  XAxis,
  Legend,
  YAxis,
  CartesianGrid,
  Tooltip,
  Brush,
  ResponsiveContainer,
  ReferenceLine
} from 'recharts';

const Chart = (params: any) => {

  const renderLineChart = (
    <div style={{ width: '100%', height: 500 }}>
      <ResponsiveContainer>
        <ComposedChart data={params.combinedData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
          <Line yAxisId="right" type="monotone" dataKey="temp" name="Temperatuur" unit=" °C" stroke="orange" />
          <Bar yAxisId="left" type="monotone" dataKey="precip" name="Neerslag" unit=" mm/u" stroke="blue" />
          <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
          <XAxis dataKey="name" />
          <YAxis yAxisId="left" domain={[0, 15]} />
          <YAxis yAxisId="right" orientation="right" domain={[-10, 32]} />
          <ReferenceLine y={0} yAxisId="right" label="" stroke="aqua" strokeDasharray="100% 5" />
         <Tooltip />
          <Legend verticalAlign="top" height={36}/>
          <Brush dataKey="name" />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );

  return (
    <Fragment>
      <div className="row">
        <div className="">
          <div className="card" style={{background: '#eee'}}>
            <div className="card-content black-text">
              {/*<span className="card-title">Chart</span>*/}
              {/*<p>Temperatuur en neerslag in Dourbes</p>*/}
            </div>
            {renderLineChart}
          </div>
        </div>
      </div>
    </Fragment>
  )
}

export default Chart
