import type { WeatherData } from "@/models/weatherData.ts";

const BASE_URL = "https://api.open-meteo.com/v1/forecast";

const LAT = 37.443632;
const LON = -7.9187;

/**
 * Haalt de actuele temperatuur en luchtvochtigheid op voor Santa Cruz (Portugal).
 * Retourneert een object met temperatuur, luchtvochtigheid en tijd.
 */
export async function fetchWeather(): Promise<WeatherData> {
  const url = `${BASE_URL}?latitude=${LAT}&longitude=${LON}&current_weather=true&hourly=relativehumidity_2m`;

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Ophalen van weerdata mislukt: ${response.status}`);
  }

  const data = await response.json();

  const temperature = data.current_weather?.temperature;
  const currentTime = data.current_weather?.time;

  const times: string[] = data.hourly?.time;
  const humidityValues: number[] = data.hourly?.relativehumidity_2m;

  const currentHour = currentTime.slice(0, 14) + "00";

  // Zoek de luchtvochtigheid die hoort bij het huidige hele uur
  const index = times.indexOf(currentHour);
  const humidity = humidityValues[index];

  return {
    temperature,
    humidity,
    time: currentHour,
  };
}
