// Commented out values didn't align with the database
// Database couldn't be changed during our stay
// Look into updating the app or changing the database for better functionality
export interface PlantDTO {
  plotNr?: string;
  coordinate?: string;
  species?: string;
  cover?: string; // This value is currently being used for microclimate
  // microclimate?: string;
  temperature?: string;
  humidity?: string;
  date?: string;
  zone?: string;
}
