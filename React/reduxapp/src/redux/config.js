import { configureStore } from '@reduxjs/toolkit'
const newReducer = (state=0,action)=>{

}

export const myStore = configureStore({
    
    reducer:{
        "counter":newReducer,
        "country":newReducer
        
    }
    
})