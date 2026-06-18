import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { TextField, Button, Container, Box, Typography } from '@mui/material'
import api from '../services/api'

export default function Register() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  const submit = async (e) => {
    e.preventDefault()
    try {
      await api.post('/auth/register', { name, email, password })
      alert('Conta criada com sucesso')
      navigate('/')
    } catch (err) {
      alert(err.response?.data?.error || 'Registration failed')
    }
  }

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 8 }}>
        <Typography variant="h4" gutterBottom>Cadastro</Typography>
        <form onSubmit={submit}>
          <TextField fullWidth label="Nome" value={name} onChange={(e)=>setName(e.target.value)} margin="normal" />
          <TextField fullWidth label="Email" value={email} onChange={(e)=>setEmail(e.target.value)} margin="normal" />
          <TextField fullWidth label="Senha" type="password" value={password} onChange={(e)=>setPassword(e.target.value)} margin="normal" />
          <Button variant="contained" type="submit" sx={{ mt: 2 }}>Cadastrar</Button>
        </form>
      </Box>
    </Container>
  )
}
