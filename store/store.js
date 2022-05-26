import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { createWrapper, HYDRATE } from 'next-redux-wrapper'

const combinedReducer = combineReducers({
    // pass in the individual reducer slices below 
    
})


// created a master reducer to handle both SSR and client-side state updates

const masterReducer = (state, action) => {
    if (action.type === HYDRATE) {
        const nextState = {
            ...state,
            // put each of the slices that were updated in SSR below

        }
        return nextState
    } else {
        return combinedReducer(state, action)
    }
}
export const makeStore = () => configureStore({
    reducer: masterReducer
})

export const wrapper = createWrapper(makeStore)