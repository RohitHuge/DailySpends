import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import '@fortawesome/fontawesome-free/css/all.min.css'

// Import FontAwesome core
import { library } from '@fortawesome/fontawesome-svg-core'
// Import the icons you want to use
import { faChevronUp, faChevronDown, faHome, faUsers, faChartBar } from '@fortawesome/free-solid-svg-icons'

// Add icons to the library
library.add(faChevronUp, faChevronDown, faHome, faUsers, faChartBar)

createRoot(document.getElementById('root')).render(
        <App />
)
