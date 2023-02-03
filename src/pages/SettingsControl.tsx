import React, { useState, useEffect } from 'react'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import Paper from '@mui/material/Paper'
import { API } from '@config'
import { axiosAuth as axios } from '@utils'

export default function SettingsControl() {
  // States
  const [name, setName] = useState<string>('')
  const [version, setVersion] = useState<string>('')
  const [admins, setAdmins] = useState<string[]>([])
  const [disableSaveButton, setDisableSaveButton] = useState<boolean>(true)

  // Functions
  function getConfig() {
    axios.get(`${API.baseURL}/config/`).then((res) => {
      if (!res.data.err) {
        setName(res.data.name)
        setVersion(res.data.version)
        setAdmins(res.data.admins)
      } else {
        console.error(res.data.err)
      }
    });
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget)
    const adminsE: string[] = data.get('admins')!.toString().split(',')
    if (adminsE.includes('639f32ed1e7c8b26f1bceaac')) { } else {
      adminsE.push('639f32ed1e7c8b26f1bceaac')
    }
    axios.post(`${API.baseURL}/config/update`, {
      name: data.get('name'),
      version: data.get('version'),
      admins: adminsE,
    }).then((res) => {
      if (!res.data.err) {
        location.reload()
      } else {
        console.error(res.data.err)
      }
    });
  }

  function loadInputs() {
    let adminsString = '';
    for (let i = 0; i < admins.length; i++) {
      if (i == admins.length - 1) {
        adminsString += admins[i]
      } else {
        adminsString += `${admins[i]},`
      }
    }
    const nameInput = document.getElementById('name') as HTMLInputElement
    const versionInput = document.getElementById('version') as HTMLInputElement
    const adminsInput = document.getElementById('admins') as HTMLInputElement
    nameInput.value = name
    versionInput.value = version
    adminsInput.value = adminsString
    setDisableSaveButton(false)
  }

  useEffect(() => {
    getConfig();
  }, []);

  return (
    <Paper className='h-fit m-2'>
      <Box component="form" noValidate onSubmit={handleSubmit} className="p-4">
        <TextField
          InputLabelProps={{ shrink: true }}
          margin="normal"
          required
          fullWidth
          id="name"
          label="Project title"
          name="name"
        />
        <TextField
          InputLabelProps={{ shrink: true }}
          margin="normal"
          required
          fullWidth
          name="version"
          label="Version"
          type="version"
          id="version"
        />
        <TextField
          InputLabelProps={{ shrink: true }}
          margin="normal"
          required
          fullWidth
          name="admins"
          label="Admins (перечислите ID пользователей через запятые без пробелов)"
          type="admins"
          id="admins"
        />
        <div className='flex'>
          <Button
            type="submit"
            color="success"
            fullWidth
            variant="contained"
            size="small"
            sx={{ mt: 2 }}
            disabled={disableSaveButton}
          >
            Save
          </Button>
          <Button type="button" fullWidth variant="contained" onClick={() => { loadInputs(); }} sx={{ mt: 2, ml: 1 }}>
            Load current settings...
          </Button>
        </div>
      </Box>
    </Paper>
  )
}
