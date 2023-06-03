import React, {
  // Fragment,
  // useEffect,
  // useState,
} from 'react'
// import { useSelector, useDispatch } from 'react-redux'
// import { actionTypes, selectors } from '../../features/counter'
import MUIDataTable from 'mui-datatables';// https://www.npmjs.com/package/mui-datatables
import {
  FilterType,
} from 'mui-datatables';

const MUITable = (params: any) => {
  const columns = [
    { label: 'Datum/tijd', name: 'date_time' },
    { label: 'Temperatuur', name: 'temp' },
    { label: 'Neerslag', name: 'precip' }
  ];
  const options: {
    filterType: FilterType,
    sortOrder: any,
    rowsPerPage: any,
    storageKey: any,
    selectableRows: any,
    rowsPerPageOptions: any
  } = {
    filterType: 'checkbox',
    sortOrder: {
      name: 'date_time', direction: 'desc'
    },
    rowsPerPage: 25,
    storageKey: 'METEO_DOURBES__TableCache',
    selectableRows: 'none',
    rowsPerPageOptions: [10,25,50,100]  
  };
  return (
    <div style={{ maxWidth: '100%' }}>
      <MUIDataTable
        columns={columns}
        data={params.data}
        title=''
        options={options}
      />
    </div>
  );
};

const List = (params: any) => {
  return (
    <div>
      {params.combinedData.length > 0 && <MUITable data={params.combinedData} />}
    </div>
  )
}

export default List
