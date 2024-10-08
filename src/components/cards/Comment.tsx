import React, { useState, useEffect } from 'react';

import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import LoadingButton from '@mui/lab/LoadingButton';
import Typography from '@mui/material/Typography';

import { axiosAuth as axios } from '@utils';
import { type Comment_Props } from '@declarations';
import { API } from '@config';

export default function AdminCommentCard({
  _id, userID, institutionID, content, rate,
}: Comment_Props) {
  // States
  const [loading, setLoading] = useState<boolean>(false);
  const [user, setUser] = useState<string>('');

  // Functions
  function remove() {
    axios.post(`${API.baseURL}/comments/remove`, { query: { _id } }).then((res) => {
      if (!res.data.err) {
        window.location.reload();
      } else {
        console.error(res.data.err);
      }
    });
  }

  function getUser() {
    const query: { query: { _id: string | undefined } } = { query: { _id: userID } };
    axios.post(`${API.baseURL}/users/find`, query)
      .then((response) => {
        if (!response.data.err) {
          setUser(response.data.login);
        } else {
          console.error(response.data.err);
        }
      });
  }

  useEffect(() => {
    setLoading(false);
    getUser();
  }, []);

  return (
    <Card className='h-fit m-2'>
      <CardHeader title={user} subheader={userID}/>
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          Rate:
          {' '}
          {rate}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Comment ID:
          {' '}
          {_id}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Institution ID:
          {' '}
          {institutionID}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Comment Text:
          {' '}
          {content}
        </Typography>
      </CardContent>
      <CardActions>
        <LoadingButton color="error" size="small" variant="contained" fullWidth loading={loading} onClick={() => { remove(); }}>Remove</LoadingButton>
        <LoadingButton color="error" size="small" variant="contained" fullWidth loading={loading} disabled onClick={() => { remove(); }}>Edit</LoadingButton>
      </CardActions>
    </Card>
  );
}
