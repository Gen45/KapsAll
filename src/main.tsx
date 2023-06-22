import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import App from './App.tsx'
import './index.css'
import Settings from './pages/Settings.tsx';
import ErrorPage from './pages/error-page.tsx';
import { Inbox } from './pages/inbox.tsx';
import { Preview } from './pages/preview.tsx';
import { ClientSettings } from './pages/settings/Clients.tsx';
import { ProductsSettings } from './pages/settings/Products.tsx';
import { TemplatesSettings } from './pages/settings/Templates.tsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/campaigns",
        element: <Inbox />,
        errorElement: <ErrorPage />
      }, 
      {
        path: "/",
        element: <Inbox />,
        errorElement: <ErrorPage />
      },
      {
        path: "/settings",
        element: <Settings />,
        errorElement: <ErrorPage />,
        children: [
          {
            path: "/settings/clients",
            element: <ClientSettings />,
            errorElement: <ErrorPage />
          }, {
            path: "/settings/products",
            element: <ProductsSettings />,
            errorElement: <ErrorPage />
          }, {
            path: "/settings/templates",
            element: <TemplatesSettings />,
            errorElement: <ErrorPage />
          }
        ]
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
