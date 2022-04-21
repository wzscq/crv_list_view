import { configureStore } from '@reduxjs/toolkit'

import frameReducer from './frameSlice';
import dataReducer from './dataSlice';
import definitionReducer from './definitionSlice';

export default configureStore({
  reducer: {
    frame:frameReducer,
    data:dataReducer,
    definition:definitionReducer
  }
});