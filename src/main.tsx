import { StrictMode } from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import "./index.css"
import { ThemeProvider } from "@/components/theme-provider"


// Render the app
const rootElement = document.getElementById('root')!
if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement)
  root.render(
    <StrictMode>
      <ThemeProvider  defaultTheme="dark" storageKey="vite-ui-theme">
        <App/>
      </ThemeProvider>
    </StrictMode>,
  )
}