import './App.css'
import React from 'react'

import MainRouter from './components/routing/MainRouter'
import { useAxiosIntercept } from './hooks/useAxiosIntercept'

const App = () => {
    const [isInterceptReady] = useAxiosIntercept()
    return <div className="App">{isInterceptReady && <MainRouter />}</div>
}

export default App
