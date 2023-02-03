import axios from 'axios';

const token = `${localStorage.getItem('_auth_type')} ${localStorage.getItem(
  '_auth',
)}`;

const axiosAuth = axios.create({
  headers: {
    Authorization: token,
  },
});

export { axiosAuth };
