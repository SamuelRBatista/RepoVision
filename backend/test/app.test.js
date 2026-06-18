import http from 'node:http'
import assert from 'node:assert'
import app from '../src/app.js'

test('GET / responds ok', async () => {
  const server = app.listen(0)
  const port = server.address().port
  const res = await new Promise((resolve, reject) => {
    const req = http.get({ hostname: '127.0.0.1', port, path: '/', agent: false }, (r) => {
      let data = ''
      r.on('data', (c) => data += c)
      r.on('end', () => resolve({ status: r.statusCode, body: JSON.parse(data) }))
    })
    req.on('error', reject)
  })
  server.close()
  assert.equal(res.status, 200)
  assert.equal(res.body.ok, true)
})
