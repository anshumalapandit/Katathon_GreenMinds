# Predictive Analytics - Real-Time AQI Integration

## Summary
Updated the **Predictive Analytics** page to display real-time Air Quality Index (AQI) data from OpenWeatherMap API, with location search functionality allowing users to select any city or state on the map.

## Changes Made

### 1. **Real-Time AQI Data Integration**
- **API Endpoint**: `http://api.openweathermap.org/data/2.5/air_pollution?lat={lat}&lon={lon}&appid={API key}`
- **API Key**: `f4f5a20348dc6c0a0b3fb49989172800` (from environment)
- **Data Retrieved**:
  - AQI (1-5 scale): Good, Fair, Moderate, Poor, Very Poor
  - PM2.5, PM10, NO₂, CO, O₃ levels
  - Real-time pollution components

### 2. **Location Search Feature**
- **Search Integration**: TomTom API for city/location search
- **Functionality**:
  - Users can search for any city or location
  - Real-time search results with coordinates
  - Click to select location and fetch AQI data
  - Debounced search (300ms) for better performance

### 3. **UI Components Added**
- **Location Search Card**:
  - Search input with autocomplete dropdown
  - Shows latitude/longitude of results
  - Clear button for quick reset
  - Loading indicator during search

- **Real-Time AQI Display**:
  - AQI status badge (Good/Fair/Moderate/Poor/Very Poor)
  - Air quality description
  - PM2.5, PM10, NO₂ measurements
  - Color-coded AQI indicators

- **Hourly Forecast**:
  - 12-hour PM2.5 forecast based on current AQI
  - Trend indicators (increasing/decreasing/stable)
  - Time-specific recommendations

### 4. **AQI Status Mapping**
```
AQI 1: Good        - Air quality is satisfactory
AQI 2: Fair        - Acceptable air quality  
AQI 3: Moderate    - May affect sensitive groups
AQI 4: Poor        - Unhealthy for sensitive groups
AQI 5: Very Poor   - Unhealthy air quality
```

### 5. **Bug Fixes**
- Fixed TypeScript error in `voiceUtils.ts` (removed duplicate `speechSynthesis` declaration)
- Fixed `utterance.language` to `utterance.lang` for proper Web Speech API compatibility

## File Updates

### `/client/pages/PredictiveAnalytics.tsx`
- Added `AirQualityData` interface
- Added `handleLocationSearch()` function
- Added `selectLocation()` function  
- Added `getAQILabel()` helper function
- Updated `useEffect` to fetch real AQI data
- Added location search UI section
- Updated Air Quality Forecast section with real-time data
- Updated Route Summary Card to display current PM2.5

### `/client/lib/voiceUtils.ts`
- Removed duplicate `speechSynthesis` from Window interface
- Fixed `utterance.lang` property assignment

## How to Use

1. **Navigate to Predictive Analytics**:
   - Click on a route analysis or go to `/predictive-analytics`

2. **Search for Location**:
   - Type city name in the search box (e.g., "Mumbai", "Delhi", "Bangalore")
   - Select from dropdown results
   - Data automatically refreshes

3. **View Real-Time AQI**:
   - Current PM2.5, PM10, NO₂ levels
   - AQI status (Good/Fair/Moderate/Poor/Very Poor)
   - 12-hour forecast
   - Health recommendations based on AQI

## API Keys Used
- **OpenWeatherMap**: `f4f5a20348dc6c0a0b3fb49989172800`
- **TomTom**: `LxGeVBqp9HRFuVcG9C8wGLZvmVtedXdb`

## Features
✅ Real-time AQI data from OpenWeatherMap  
✅ Location search with autocomplete  
✅ PM2.5, PM10, NO₂ measurements  
✅ AQI status indicators with color coding  
✅ 12-hour forecast based on real data  
✅ Health profile recommendations  
✅ Responsive design  
✅ Loading states and error handling  

## Testing
- Search for different cities and verify AQI data updates
- Check that PM2.5 values match between UI and API response
- Verify color coding changes based on AQI levels
- Test with different health profiles to see recommendations
