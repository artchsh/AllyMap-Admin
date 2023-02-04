// System
import React from 'react'
import { useRoutes } from 'react-router-dom'
import type { RouteObject } from 'react-router-dom'
import AdminControlPanel from './layouts/AdminControlPanel'
import AdminIndex from './pages'
import InstitutionsControl from './pages/InstitutionsControl'
import RequestInstitutionControl from './pages/RequestInstitutionsControl'
import UsersControl from './pages/UsersControl'
import SettingsControl from './pages/SettingsControl'
import CommentsControl from './pages/CommentsControl'
import { AuthProvider, RequireAuth } from 'react-auth-kit'
import Login from './pages/Login'

export default function App() {

  const routes: RouteObject[] = [
    {
      path: '/login',
      element: <Login />
    },
    {
      path: '/',
      element: <RequireAuth loginPath='/login'><AdminControlPanel /></RequireAuth>,
      children: [
        {
          index: true,
          element: <AdminIndex />,
        },
        {
          path: '/institution-control',
          element: <InstitutionsControl />,
        },
        {
          path: '/request-institution-control',
          element: <RequestInstitutionControl />,
        },
        {
          path: '/user-control',
          element: <UsersControl />,
        },
        {
          path: '/settings',
          element: <SettingsControl />,
        },
        {
          path: '/comments',
          element: <CommentsControl />,
        },
      ],
    },
  ]

  const router = useRoutes(routes)

  return (
    <AuthProvider authType="localstorage" authName="_auth">
      {router}
    </AuthProvider>
  )
}
