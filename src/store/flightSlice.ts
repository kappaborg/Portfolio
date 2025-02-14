import { FlightData } from '@/services/aviationService';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface FlightState {
  selectedFlight: FlightData | null;
}

const initialState: FlightState = {
  selectedFlight: null,
};

const flightSlice = createSlice({
  name: 'flight',
  initialState,
  reducers: {
    setSelectedFlight(state, action: PayloadAction<FlightData | null>) {
      state.selectedFlight = action.payload;
    },
  },
});

export const { setSelectedFlight } = flightSlice.actions;
export default flightSlice.reducer; 