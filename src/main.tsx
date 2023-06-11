import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import App from './App.tsx'
import './index.css'
import Settings from './pages/settings.tsx';
import ErrorPage from './pages/error-page.tsx';
import { Inbox } from './pages/inbox.tsx';
import { Preview } from './pages/preview.tsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/inbox",
        element: <Inbox />,
        errorElement: <ErrorPage />
      },
      {
        path: "/settings",
        element: <Settings />,
        errorElement: <ErrorPage />
      },
      {
        path: "/new",
        element: <Preview />,
        errorElement: <ErrorPage />
      }
    ]
  }
]);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
