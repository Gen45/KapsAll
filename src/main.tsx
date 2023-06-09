import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider, } from "react-router-dom";
import App from './App.tsx'
import '@utils/index.css'

import ErrorPage from '@pages/error-page.tsx';
import CampaignMain from './pages/campaigns/CampaignMain.tsx';
import ClientMain from './pages/clients/ClientMain.tsx';
import ProductMain from './pages/products/ProductMain.tsx';
import TemplateMain from './pages/templates/TemplatesMain.tsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <CampaignMain />,
        errorElement: <ErrorPage />
      },
      {
        path: "/campaigns",
        element: <CampaignMain />,
        errorElement: <ErrorPage />
      },
      {
        path: "/campaigns/new",
        element: <CampaignMain />,
        errorElement: <ErrorPage />
      },
      {
        path: "/clients",
        element: <ClientMain />,
        errorElement: <ErrorPage />
      },
      {
        path: "/products",
        element: <ProductMain />,
        errorElement: <ErrorPage />
      },
      {
        path: "/templates",
        element: <TemplateMain />,
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
