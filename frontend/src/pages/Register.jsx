import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  TextField,
  Button,
  Box,
  Typography,
  Paper,
  CircularProgress,
  Snackbar,
  Alert
} from '@mui/material'

import api from '../services/api'

export default function Register() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const navigate = useNavigate()

  const submit = async (e) => {
    e.preventDefault()

    try {
      setLoading(true)

      await api.post('/auth/register', {
        name,
        email,
        password
      })

      setSuccess('Conta criada com sucesso!')
      
      setTimeout(() => {
        navigate('/')
      }, 1200)

    } catch (err) {
      const message = err.response?.data?.error

      if (message === 'Email already exists') {
        setError('Este e-mail já está cadastrado')
      } else if (message === 'Password is too weak') {
        setError('Senha muito fraca. Use letras e números.')
      } else {
        setError('Erro ao criar conta')
      }

    } finally {
      setLoading(false)
    }
  }

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        background: 'linear-gradient(135deg, #0f172a, #1e293b)'
      }}
    >
      {/* ESQUERDA */}
      <Box
        sx={{
          flex: 1,
          display: { xs: 'none', md: 'flex' },
          flexDirection: 'column',
          justifyContent: 'center',
          px: 8,
          color: 'white'
        }}
      >
        <Typography variant="h3" fontWeight={700}>
          RepoVision
        </Typography>

        <Typography sx={{ mt: 2, opacity: 0.8 }}>
          Crie sua conta e comece a explorar métricas,
          linguagens e tendências dos repositórios do GitHub.
        </Typography>
      </Box>

      {/* DIREITA */}
      <Box
        sx={{
          flex: 1,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        <Paper
          elevation={10}
          sx={{
            width: 420,
            p: 4,
            borderRadius: 4,
            backgroundColor: 'rgba(255,255,255,0.9)',
            backdropFilter: 'blur(10px)',
            animation: 'fadeIn 0.6s ease'
          }}
        >
          <style>
            {`
              @keyframes fadeIn {
                from {
                  opacity: 0;
                  transform: translateY(20px);
                }
                to {
                  opacity: 1;
                  transform: translateY(0);
                }
              }
            `}
          </style>

          <Typography variant="h5" fontWeight={700} gutterBottom>
            Criar Conta
          </Typography>

          <Typography variant="body2" color="text.secondary" mb={2}>
            Preencha os dados para acessar o RepoVision
          </Typography>

          <form onSubmit={submit}>
            <TextField
              fullWidth
              label="Nome"
              margin="normal"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <TextField
              fullWidth
              label="Email"
              margin="normal"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <TextField
              fullWidth
              label="Senha"
              type="password"
              margin="normal"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <Button
              fullWidth
              variant="contained"
              type="submit"
              disabled={loading}
              sx={{
                mt: 2,
                py: 1.2,
                borderRadius: 2,
                textTransform: 'none',
                fontWeight: 600,
                background: 'linear-gradient(90deg, #2a2cba, #4b07e9)',
                '&:hover': { opacity: 0.9 }
              }}
            >
              {loading ? (
                <CircularProgress size={22} sx={{ color: '#fff' }} />
              ) : (
                'Cadastrar'
              )}
            </Button>
          </form>

          <Box sx={{ mt: 3, textAlign: 'center' }}>
            <Typography variant="body2">
              Já possui conta?{' '}
              <Link
                to="/"
                style={{
                  color: '#2a2cba',
                  fontWeight: 600,
                  textDecoration: 'none'
                }}
              >
                Entrar
              </Link>
            </Typography>
          </Box>
        </Paper>
      </Box>

      {/* SNACKBAR ERRO */}
      <Snackbar
        open={!!error}
        autoHideDuration={4000}
        onClose={() => setError('')}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Alert
          severity="error"
          variant="filled"
          onClose={() => setError('')}
        >
          {error}
        </Alert>
      </Snackbar>

      {/* SNACKBAR SUCCESS */}
      <Snackbar
        open={!!success}
        autoHideDuration={2500}
        onClose={() => setSuccess('')}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Alert
          severity="success"
          variant="filled"
          onClose={() => setSuccess('')}
        >
          {success}
        </Alert>
      </Snackbar>
    </Box>
  )
}