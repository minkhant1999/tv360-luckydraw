import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { HashRouter, Route, Routes } from 'react-router-dom'
import './index.css'
import App from './App.tsx'
import AuthGate from './components/AuthGate'
import { store } from './store'

const root = document.getElementById('root')
if (!root) throw new Error('Root element not found')

createRoot(root).render(
  <StrictMode>
    <Provider store={store}>
      <HashRouter>
        <Routes>
          <Route
            path="/"
            element={
              <AuthGate>
                <App />
              </AuthGate>
            }
          />
        </Routes>
      </HashRouter>
    </Provider>
  </StrictMode>,
)
