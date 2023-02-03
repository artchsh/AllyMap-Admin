import AdminSideNavigationBar from '../components/SideNavigationBar'
import * as React from 'react'
import { Outlet } from 'react-router-dom'
import { useAuthUser } from 'react-auth-kit'
import { axiosAuth as axios } from '@utils'
import { API } from '@config'

export default function AdminControlPanel() {
  const authStateUser = useAuthUser()
  const user: { _id?: string } | null = authStateUser()

  function fetchAdmins() {
    axios.get(`${API.baseURL}/config/`).then((response) => {
      if (!response.data.err) {
        const ADMINS = response.data.admins
        const isAdmin = ADMINS.includes(user!._id)
        if (!isAdmin) { window.location.href = 'https://allymap.info/' }
      } else {
        console.error(response.data.err)
      }
    });
  }

  React.useEffect(() => {
    fetchAdmins()
  }, [])

  return (
    <div className='flex'>
      <div>
        <AdminSideNavigationBar />
      </div>
      <Outlet />
    </div>
  );
}
