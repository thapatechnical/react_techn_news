// 'use client'

import {createContext, useContext, useEffect, useReducer} from "react";
import {reducer} from "../reducer/reducer.jsx";

let API = "https://hn.algolia.com/api/v1/search? ";
export const AppContext = createContext();

const initialState = {
    query: "css",
    nbPages: 0,
    hits: []
}

export const AppProvider = ({children}) => {

    const [state, dispatch] = useReducer(reducer, initialState);

    // to get the actual api data
    const fetchApiData = async (url) => {
        try {
            const res = await fetch(url);
            const data = await  res.json();
            console.log(data)
            dispatch({
                type: "GET_STORIES",
                payload: {
                    hits: data.hits,
                    nbPages: data.nbPages
                }
            })
        } catch (e) {
            console.log(e)
        }
    }

    // to call the api data for the first time on page load
    useEffect(() => {
        fetchApiData(`${API}`)
    }, [])


    return <AppContext.Provider value={{...state}}>
        {children}
    </AppContext.Provider>
}

// useContext hook aka consumer
export const useGlobalContext = () => {
    let contextData =  useContext(AppContext)
    if(!contextData){
        throw  new Error('out of scope provider')
    }
    return contextData
}
