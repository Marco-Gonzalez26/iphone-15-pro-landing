import React from 'react'
import ReactDOM from 'react-dom/client'
import * as Sentry from '@sentry/react'
import App from './App.tsx'
import './index.css'
import { Location, Action } from '@sentry/react/types/types'

Sentry.init({
  dsn: 'https://bfc202ef3fcb624533ba8d14ccbedf0b@o4506947468328960.ingest.us.sentry.io/4506961488183296',
  integrations: [
    Sentry.browserTracingIntegration(),
    Sentry.metrics.metricsAggregatorIntegration(),
    Sentry.reactRouterV6BrowserTracingIntegration({
      useEffect: React.useEffect,
      useLocation: function (): Location {
        return;
      },
      useNavigationType: function (): Action {
        return;
      },
      createRoutesFromChildren: function (children: JSX.Element[]) {
        return;
      },
      matchRoutes: function (routes: any, location: Location, basename?: string): any[] {
        return;
      }
    }),
    Sentry.replayIntegration({
      maskAllText: false,
      blockAllMedia: false
    })
  ],
  // Performance Monitoring
  tracesSampleRate: 1.0,
  tracePropagationTargets: ['localhost', /^https:\/\/yourserver\.io\/api/],

  replaysSessionSampleRate: 0.1,
  replaysOnErrorSampleRate: 1.0
})

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
