/* eslint-disable no-restricted-globals */
import React, { useState, useEffect } from 'react'
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import CardHeader from '@mui/material/CardHeader'
import LoadingButton from '@mui/lab/LoadingButton'
import Typography from '@mui/material/Typography'
import { axiosAuth as axios } from '@utils'
import { type UserCard_Props } from '@declarations'
import { API } from '@config'

export default function UserCard({
  id, login, inviteCode, acceptCode,
}: UserCard_Props) {

  // States
  const [loading, setLoading] = useState<boolean>(false)

  // Functions
  function remove() {
    axios.post(`${API.baseURL}/users/remove`, { query: { id } }).then((res) => {
      if (!res.data.err) {
        location.reload()
      } else {
        console.error(res.data.err)
      }
    });
  }

  useEffect(() => {
    setLoading(false)
  }, [])

  return (
    <Card className='h-fit m-2 w-96'>
      <CardHeader title={login} subheader={id} />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          Invite Code:
          {' '}
          {inviteCode}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Accept Code:
          {' '}
          {acceptCode}
        </Typography>
      </CardContent>
      <CardActions>
        <LoadingButton color="error" variant="contained" fullWidth loading={loading} disabled onClick={() => { remove(); }}>Ban</LoadingButton>
        <LoadingButton color="error" variant="contained" fullWidth loading={loading} onClick={() => { remove(); }}>Delete</LoadingButton>
        <LoadingButton color="error" variant="contained" fullWidth loading={loading} disabled onClick={() => { remove(); }}>Revoke IC</LoadingButton>
      </CardActions>
    </Card>
  );
}
