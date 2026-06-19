import React, { useState, useContext } from 'react'
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
import AuthContext from '../contexts/AuthContext'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const { setToken } = useContext(AuthContext)
  const navigate = useNavigate()

  const submit = async (e) => {
    e.preventDefault()

    try {
      setLoading(true)

      const { data } = await api.post('/auth/login', {
        email,
        password
      })

      setToken(data.token)
      navigate('/dashboard')

    } catch (err) {
      const message = err.response?.data?.error

      if (
        message === 'Email and password are required'
      ) {
        setError('Informe e-mail e senha para continuar')
      } else if (
        message === 'Invalid credentials'
      ) {
        setError('E-mail ou senha inválidos')
      } else {
        setError('Falha ao realizar login')
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

      {/* LADO ESQUERDO */}
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
          Analise repositórios do GitHub com inteligência, métricas e dashboards em tempo real.
        </Typography>
      </Box>

      {/* LADO DIREITO */}
      <Box
        sx={{
          flex: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <Paper
          elevation={10}
          sx={{
            p: 4,
            width: 360,
            borderRadius: 4,
            backdropFilter: 'blur(10px)',
            backgroundColor: 'rgba(255,255,255,0.9)',
            animation: 'fadeIn 0.6s ease'
          }}
        >
          <style>
            {`
              @keyframes fadeIn {
                from { opacity: 0; transform: translateY(20px); }
                to { opacity: 1; transform: translateY(0); }
              }
            `}
          </style>

          <Typography variant="h5" fontWeight={700} gutterBottom>
            Bem-vindo
          </Typography>

          <Typography variant="body2" color="text.secondary" mb={2}>
            Faça login para continuar
          </Typography>

          <form onSubmit={submit}>
            <TextField
              fullWidth
              label="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              margin="normal"
            />

            <TextField
              fullWidth
              label="Senha"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              margin="normal"
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
                background: 'linear-gradient(90deg, #2a2cba, #4b07e9)',
                textTransform: 'none',
                fontWeight: 600,
                '&:hover': {
                  opacity: 0.9
                }
              }}
            >
              {loading ? (
                <CircularProgress size={22} sx={{ color: '#fff' }} />
              ) : (
                'Entrar'
              )}
            </Button>
          </form>

          <Box sx={{ mt: 2, textAlign: 'center' }}>
            <Link
              to="/register"
              style={{
                color: '#2a2cba',
                textDecoration: 'none',
                fontWeight: 500
              }}
            >
              Criar conta
            </Link>
          </Box>
        </Paper>
      </Box>

      {/* SNACKBAR DE ERRO */}
      <Snackbar
        open={!!error}
        autoHideDuration={4000}
        onClose={() => setError('')}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right'
        }}
      >
        <Alert
          severity="error"
          variant="filled"
          onClose={() => setError('')}
          sx={{ fontWeight: 500 }}
        >
          {error}
        </Alert>
      </Snackbar>
    </Box>
  )
}