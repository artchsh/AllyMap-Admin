import React, { useEffect, useState } from 'react'
import { API, MAIN_ADMIN_ID } from '@config'
import { axiosAuth as axios } from '@utils'
import UserCard from '@/components/cards/User'

export default function UsersControl() {
  // States
  const [users, setUsers] = useState<UserProp[]>([])

  async function fetchRequests() {
    axios.post(`${API.baseURL}/users/find/all`)
      .then((response) => {
        if (!response.data.err) {
          setUsers(response.data)
        } else {
          console.error(response.data.err)
        }
      });
  }

  useEffect(() => {
    fetchRequests()
  }, [])

  return (
    <div className='flex flex-wrap h-fit'>
      {users.map(({
        _id, login, inviteCode, acceptCode,
      }: UserProp) => (
        _id != MAIN_ADMIN_ID
        && (
          <>
            <UserCard key={_id} id={_id} login={login} inviteCode={inviteCode} acceptCode={acceptCode} />
          </>
        )
      ))}
    </div>
  );
}

interface UserProp {
  _id: string
  login: string
  inviteCode: string
  acceptCode: string
}
