import { configureStore, combineReducers } from '@reduxjs/toolkit'
import storage from 'redux-persist/lib/storage'
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist'
import { authApi } from './api/authApi'
import authReducer from './auth-slice'
import { usersApi } from './api/usersApi'
import { departmentsApi } from './api/departmentsApi'
import { serviceApi } from './api/serviceApi'
import { appointmentApi } from './api/appointmentApi'
import { patientApi } from './api/patientApi'
import { conversationApi } from './api/conversationApi'
import conversationReducer from './conversation-slice'
import { doctorApi } from './api/doctorApi'
const persistConfig = {
  key: 'main-root',
  storage,
}
const appReducer = combineReducers({
  [authApi.reducerPath]: authApi.reducer,
  auth: authReducer,
  [usersApi.reducerPath]: usersApi.reducer,
  [departmentsApi.reducerPath]: departmentsApi.reducer,
  [serviceApi.reducerPath]: serviceApi.reducer,
  [appointmentApi.reducerPath]: appointmentApi.reducer,
  [patientApi.reducerPath]: patientApi.reducer,
  [conversationApi.reducerPath]: conversationApi.reducer,
  conversation: conversationReducer,
  [doctorApi.reducerPath]:doctorApi.reducer
})

const rootReducer = (state, action) => {
  if (action.type === 'conversation/logoutState') {
    state = undefined
    storage.removeItem('persist:main-root')
    return appReducer(undefined, action);
  }
  return appReducer(state, action)
}
const persistedReducer = persistReducer(persistConfig, rootReducer)
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
    },
  }).concat(authApi.middleware,
    usersApi.middleware,
    departmentsApi.middleware,
    serviceApi.middleware,
    appointmentApi.middleware,
    patientApi.middleware,
    conversationApi.middleware,
    doctorApi.middleware),
  devTools: true

})
export const Persistor = persistStore(store)