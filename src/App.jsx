import { useState } from 'react'
import { HashRouter, Route, Routes } from 'react-router-dom'
import BootLoader from './components/BootLoader.jsx'
import Layout from './components/Layout.jsx'
import { ThemeProvider } from './context/ThemeContext.jsx'
import { extraPosts, siteConfig, writeups } from './data/content.js'
import ExtraDetailPage from './pages/ExtraDetailPage.jsx'
import ExtraPage from './pages/ExtraPage.jsx'
import HomePage from './pages/HomePage.jsx'
import NotFoundPage from './pages/NotFoundPage.jsx'
import WriteupDetailPage from './pages/WriteupDetailPage.jsx'
import WriteupsPage from './pages/WriteupsPage.jsx'

function App() {
  const [isLoaderComplete, setIsLoaderComplete] = useState(false)

  return (
    <ThemeProvider>
      <div className={`app-stage${isLoaderComplete ? ' app-stage-ready' : ''}`}>
        {!isLoaderComplete ? <BootLoader onComplete={() => setIsLoaderComplete(true)} /> : null}
        <div className="app-stage-content">
          <HashRouter>
            <Routes>
              <Route element={<Layout siteConfig={siteConfig} />}>
                <Route
                  index
                  element={
                    <HomePage
                      extraPosts={extraPosts}
                      siteConfig={siteConfig}
                      writeups={writeups}
                    />
                  }
                />
                <Route path="writeups" element={<WriteupsPage writeups={writeups} />} />
                <Route
                  path="writeups/:slug"
                  element={<WriteupDetailPage writeups={writeups} />}
                />
                <Route path="extra" element={<ExtraPage posts={extraPosts} />} />
                <Route path="extra/:slug" element={<ExtraDetailPage posts={extraPosts} />} />
                <Route path="*" element={<NotFoundPage />} />
              </Route>
            </Routes>
          </HashRouter>
        </div>
      </div>
    </ThemeProvider>
  )
}

export default App
