import React, { useState, useContext } from 'react'
import {
  Container,
  Box,
  TextField,
  Button,
  Typography,
  Grid,
  Card,
  CardContent,
  Link as MuiLink,
  CircularProgress,
  Paper,
  Divider
} from '@mui/material'

import SearchIcon from '@mui/icons-material/Search'
import LogoutIcon from '@mui/icons-material/Logout'

import api from '../services/api'
import AuthContext from '../contexts/AuthContext'
import { useNavigate } from 'react-router-dom'

import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer
} from 'recharts'

const COLORS = ['#2a2cba', '#22c55e', '#f59e0b', '#ef4444', '#06b6d4', '#84cc16']

const BG = '#10141c'
const CARD = '#111827'
const BORDER = '#1f1e07'
const TEXT_SECONDARY = '#e1e1e1'

export default function Dashboard() {
  const [q, setQ] = useState('react')
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(false)

  const { setToken } = useContext(AuthContext)
  const navigate = useNavigate()

  const search = async () => {
    try {
      setLoading(true)
      const resp = await api.get('/github/search', { params: { q } })
      setData(resp.data)
    } catch (err) {
      alert(err.response?.data?.error || 'Search failed')
    } finally {
      setLoading(false)
    }
  }

  // 🔥 LOGOUT
  const logout = () => {
    setToken(null)
    localStorage.removeItem('token')
    navigate('/')
  }

  const languageData = data
    ? Object.entries(data.languages).map(([k, v]) => ({ name: k, value: v }))
    : []

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: BG, color: '#fff' }}>

      {/* HEADER */}
      <Paper
        elevation={0}
        sx={{
          px: 3,
          py: 2,
          borderBottom: `1px solid ${BORDER}`,
          bgcolor: CARD,
          color: '#fff'
        }}
      >
        <Container maxWidth="lg">

          {/* HEADER TOP */}
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>

            <Box>
              <Typography variant="h5" fontWeight={700}>
                GitHub Insights Dashboard
              </Typography>

              <Typography variant="body2" sx={{ color: TEXT_SECONDARY }}>
                Explore repositories, linguagens e métricas do GitHub em tempo real
              </Typography>
            </Box>

            {/* 🔴 BOTÃO DESLOGAR */}
            <Button
              onClick={logout}
              startIcon={<LogoutIcon />}
              sx={{
                color: '#fff',
                border: `1px solid ${BORDER}`,
                textTransform: 'none',
                fontWeight: 600,
                '&:hover': {
                  bgcolor: '#1f2937',
                  borderColor: '#6366f1'
                }
              }}
            >
              Deslogar
            </Button>

          </Box>

          {/* SEARCH */}
          <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
            <TextField
              fullWidth
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Ex: Python, Java, PHP..."
              size="small"
              sx={{
                input: { color: '#fff' },
                '& .MuiOutlinedInput-root': {
                  '& fieldset': { borderColor: BORDER },
                  '&:hover fieldset': { borderColor: '#6366f1' },
                  '&.Mui-focused fieldset': { borderColor: '#6366f1' }
                }
              }}
            />

            <Button
              variant="contained"
              startIcon={<SearchIcon />}
              onClick={search}
              sx={{
                bgcolor: '#2a2cba',
                fontWeight: 600,
                '&:hover': { bgcolor: '#3930e9' }
              }}
            >
              Buscar
            </Button>
          </Box>

        </Container>
      </Paper>

      {/* CONTENT (resto igual) */}
      <Container maxWidth="lg" sx={{ py: 4 }}>

        {loading && (
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 6 }}>
            <CircularProgress sx={{ color: '#3930e9' }} />
          </Box>
        )}

        {!data && !loading && (
          <Paper sx={{
            p: 5,
            textAlign: 'center',
            borderRadius: 3,
            bgcolor: CARD,
            color: '#fff',
            border: `1px solid ${BORDER}`
          }}>
            <Typography variant="h6" fontWeight={600}>
              Nenhuma busca realizada ainda
            </Typography>
            <Typography sx={{ color: TEXT_SECONDARY }}>
              Pesquise um termo para visualizar métricas do GitHub
            </Typography>
          </Paper>
        )}

         {/* DASHBOARD */}
        {data && (
          <>
            {/* METRICS */}
            <Grid container spacing={2}>
              {[
                { label: 'Total Repos', value: data.total },
                { label: 'Stars', value: data.totalStars },
                { label: 'Forks', value: data.totalForks },
                { label: 'Languages', value: Object.keys(data.languages).length }
              ].map((item, i) => (
                <Grid item xs={12} md={3} key={i}>
                  <Card sx={{
                    bgcolor: CARD,
                    border: `1px solid ${BORDER}`,
                    borderRadius: 3,
                    boxShadow: 'none'
                  }}>
                    <CardContent>
                      <Typography variant="body2" sx={{ color: TEXT_SECONDARY }}>
                        {item.label}
                      </Typography>

                      <Typography variant="h4" fontWeight={800} color="#a3a3b8">
                        {item.value}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>

            {/* CHARTS */}
            <Grid container spacing={3} sx={{ mt: 2 }}>

              {/* PIE */}
              <Grid item xs={12} md={5}>
                <Paper sx={{
                  p: 2,
                  borderRadius: 3,
                  bgcolor: CARD,
                  border: `1px solid ${BORDER}`,
                  color: '#fff'
                }}>
                  <Typography fontWeight={600} mb={2}>
                    Linguagens mais usadas
                  </Typography>

                  <ResponsiveContainer width="100%" height={260}>
                    <PieChart>
                      <Pie
                        data={languageData}
                        dataKey="value"
                        nameKey="name"
                        outerRadius={90}
                        label
                      >
                        {languageData.map((_, i) => (
                          <Cell key={i} fill={COLORS[i % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </Paper>
              </Grid>

              {/* BAR */}
              <Grid item xs={12} md={7}>
                <Paper sx={{
                  p: 2,
                  borderRadius: 3,
                  bgcolor: CARD,
                  border: `1px solid ${BORDER}`,
                  color: '#fff'
                }}>
                  <Typography fontWeight={600} mb={2}>
                    Repositórios mais estrelados
                  </Typography>

                  <ResponsiveContainer width="100%" height={260}>
                    <BarChart data={data.topByStars} layout="vertical">
                      <XAxis type="number" stroke={TEXT_SECONDARY} />
                      <YAxis dataKey="name" type="category" width={150} stroke={TEXT_SECONDARY} />
                      <Tooltip />
                      <Bar dataKey="stars" fill="#2a2cba" radius={[0, 8, 8, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </Paper>
              </Grid>
            </Grid>

            {/* TABLE */}
            <Paper sx={{
              mt: 4,
              borderRadius: 3,
              bgcolor: CARD,
              border: `1px solid ${BORDER}`,
              color: '#fff',
              overflow: 'hidden'
            }}>
              <Box sx={{ p: 2 }}>
                <Typography fontWeight={600}>
                  Top 10 Repositórios
                </Typography>
              </Box>

              <Divider sx={{ borderColor: BORDER }} />

              <Box sx={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', color: '#fff' }}>
                  <thead style={{ background: '#0f172a', color: TEXT_SECONDARY }}>
                    <tr>
                      <th align="left">Nome</th>
                      <th align="left">Owner</th>
                      <th align="left">Linguagem</th>
                      <th align="left">Stars</th>
                      <th align="left">Forks</th>
                      <th align="left">Link</th>
                    </tr>
                  </thead>

                  <tbody>
                    {data.topByStars.map((r) => (
                      <tr key={r.id} style={{ borderTop: `2px solid ${BORDER}` }}>
                        <td>{r.name}</td>
                        <td>{r.owner}</td>
                        <td>{r.language}</td>
                        <td style={{ color: '#6366f1' }}>{r.stars}</td>
                        <td>{r.forks}</td>
                        <td>
                          <MuiLink href={r.html_url} target="_blank" sx={{ color: '#6366f1' }}>
                            Abrir
                          </MuiLink>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </Box>
            </Paper>

          </>
        )}
      </Container>
    </Box>
  )
}