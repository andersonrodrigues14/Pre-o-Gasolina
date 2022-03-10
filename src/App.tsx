import { useState } from 'react'
import logo from './logo.svg'
import './App.css'
import { FuelPage } from './pages/Fuel'
import {ThemeProvider} from 'styled-components'
import { theme } from './theme/theme'

function App() {
  return (
    <ThemeProvider theme={theme}>
      <FuelPage />
    </ThemeProvider>
  )
}

export default App
