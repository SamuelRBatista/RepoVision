import React, { useState, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  TextField,
  Button,
  Container,
  Box,
  Typography,
  Paper,
  CircularProgress
} from '@mui/material'
import api from '../services/api'
import AuthContext from '../contexts/AuthContext'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  const { setToken } = useContext(AuthContext)
  const navigate = useNavigate()

  const submit = async (e) => {
    e.preventDefault()
    try {
      setLoading(true)
      const { data } = await api.post('/auth/login', { email, password })
      setToken(data.token)
      navigate('/dashboard')
    } catch (err) {
      alert(err.response?.data?.error || 'Login failed')
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

      {/* LADO ESQUERDO (branding) */}
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

      {/* LADO DIREITO (form) */}
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
            transform: 'translateY(0)',
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
              {loading ? <CircularProgress size={22} sx={{ color: 'white' }} /> : 'Entrar'}
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
    </Box>
  )
}