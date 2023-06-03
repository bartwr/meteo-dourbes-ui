let serverUrl = 'https://meteo-dourbes.bartroorda.nl';
if(document.location.host === 'localhost:3000') {
  serverUrl = 'http://localhost:5000';
}

export const fetchTempData = async () => {
  const response = await fetch(`${serverUrl}/api/temp`);
  const json = await response.json();
  return json;
}

export const fetchPrecipData = async () => {
  const response = await fetch(`${serverUrl}/api/precip`);
  const json = await response.json();
  return json;
}
