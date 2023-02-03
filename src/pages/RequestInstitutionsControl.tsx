import React, { useEffect, useState } from 'react'
import { useIsAuthenticated } from 'react-auth-kit'
import { useNavigate } from 'react-router-dom'
import { type RequestInstitution_Data } from '@declarations'
import { axiosAuth as axios } from '@utils'
import { API } from '@config'
import RequestInstitutionCard from '@/components/cards/RequestInstitution'

export default function RequestInstitutionControl() {
  // Setups
  const isAuthenticated = useIsAuthenticated()
  const navigate = useNavigate()

  // States
  const [requests, setRequests] = useState<RequestInstitution_Data[]>([])

  async function fetchRequests() {
    axios.post(`${API.baseURL}/institutions/request/find`, { query: {} })
      .then((response) => {
        if (!response.data.err) {
          setRequests(response.data)
        } else {
          console.error(response.data.err)
        }
      })
  }

  useEffect(() => {
    if (isAuthenticated()) {
      fetchRequests()
    } else {
      navigate('/login')
    }
  }, []);

  return (
    <div className='flex flex-wrap w-full h-fit'>
      {requests.map(({
        _id, title, address, description, link, imagePath, userRequestID,
      }, index) => (
        <>
          <RequestInstitutionCard key={index} id={_id} name={title} address={address} description={description} link={link} imagePath={imagePath} userID={userRequestID} />
        </>
      ))}
    </div>
  );
}
