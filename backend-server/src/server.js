// backend-server/src/index.js
const connectDB = require('../src/config/database')
const { userRoutes } = require('./modules/user/user.routes')
const { tenantRoutes } = require('./modules/tenant/tenant.routes')
const { companyRoutes } = require('./modules/company/company.routes')
const { industryRoutes } = require('./modules/industry/industry.routes')
const { exposureCategoryRoutes } = require('./modules/exposureCategory/exposureCategory.routes')
const { roleRoutes } = require('./modules/role/role.routes')
const { riskRoutes } = require('./modules/risk/risk.routes')
const { taskRoutes } = require('./modules/task/task.routes')

// Connect to MongoDB
connectDB()

const fastify = require('fastify')({ logger: true })

// Swagger
fastify.register(require('@fastify/swagger'), {
  openapi: {
    info: {
      title: 'compliance-application-api',
      version: '1.0.0'
    }
  }
})
fastify.register(require('@fastify/swagger-ui'), {
  exposeRoute: true,
  routePrefix: '/docs'
})

// CORS — allow both local dev and deployed frontend
fastify.register(require('@fastify/cors'), {
  origin: [
    'http://localhost:3000',                         // local React dev
    'https://compliance-application.vercel.app',    // deployed frontend
    'https://backend-compliance-application.vercel.app' // optional backend URL if needed
  ],
  methods: ['GET', 'POST', 'PUT', 'DELETE']
})

// Register API routes
fastify.register(userRoutes)
fastify.register(companyRoutes)
fastify.register(industryRoutes)
fastify.register(exposureCategoryRoutes)
fastify.register(tenantRoutes)
fastify.register(roleRoutes)
fastify.register(riskRoutes)
fastify.register(taskRoutes)

// Health check endpoint
fastify.get('/health', async (req, reply) => {
  return {
    serverName: 'compliance-backend-service',
    status: 'ok'
  }
})

// Start server
const PORT = 5000
const start = async () => {
  try {
    await fastify.listen({ port: PORT, host: '0.0.0.0' }) // host required for Render/Railway
    console.log(`Backend running on port ${PORT}`)
  } catch (error) {
    fastify.log.error(error)
    process.exit(1)
  }
}

start()