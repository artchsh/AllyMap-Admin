import React, { useState, useEffect } from 'react'

import { useNavigate } from 'react-router-dom'
import { useAuthUser, useIsAuthenticated } from 'react-auth-kit'

import { axiosAuth as axios } from '@utils'
import { API } from '@config'
import { type Institution_Data } from '@declarations'
import AdminInstitutionCard from '@/components/cards/Institution'

export default function InstitutionsControl() {
  // Setups
  const isAuthenticated = useIsAuthenticated()
  const navigate = useNavigate()
  const authStateUser = useAuthUser()
  const user = authStateUser()

  // States
  const [institutions, setInstitutions] = useState<Institution_Data[]>([]);

  // Functions
  async function fetchInstitutions() {
    axios.post(`${API.baseURL}/institutions/find`, {}).then((res) => {
      if (!res.data.err) {
        setInstitutions(res.data)
      } else {
        console.error(res.data.err)
      }
    });
  }

  useEffect(() => {
    if (isAuthenticated()) {
      fetchInstitutions()
    } else {
      navigate('/login')
    }
  }, []);

  return (
    <div className='flex flex-wrap'>
      {institutions.map((institution, index: number) => (
        <>
          <AdminInstitutionCard
            key={index}
            imagePath={institution.imagePath}
            name={institution.title}
            status={institution.status}
            description={institution.description}
            address={institution.address}
            id={institution._id}
            link={institution.link}
            userID={user?._id}
          />
        </>
      )
      )}
    </div>
  );
}
