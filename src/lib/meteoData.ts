import moment from 'moment';

interface DataObject {
  timestamp: string;
  name: string;
  temp?: string;
  precip?: string;
}

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
    objectData.date_time = moment.utc(objectToAdd.field1, 'x').local().format('YYYY-MM-DD HH:mm');
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

export const createDataObject = (tempData: any, precipData: any) => {
  // Create chartData variable
  let chartData;
  // Add tempData to chart data
  chartData = combineData([], tempData, 'temp');
  // Add precipData to chart data
  chartData = combineData(chartData, precipData, 'precip');

  return chartData;
};

export const getDataOfLastMonth = (allData: any) => {
  const dateOneMonthAgo = moment().subtract(1, 'month').unix() * 1000;
  const dataOfLastMonth = allData.filter((x: any) => {
    return Number(x.timestamp) >= Number(dateOneMonthAgo);
  });
  return dataOfLastMonth;
}
