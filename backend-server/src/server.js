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

// ✅ CORS setup
fastify.register(require('@fastify/cors'), {
  origin: (origin, cb) => {
    const allowedOrigins = [
      'http://localhost:3000',
      'https://compliance-application.vercel.app'
    ]
    if (!origin || allowedOrigins.includes(origin)) {
      cb(null, true)
    } else {
      cb(new Error(`Origin ${origin} not allowed by CORS`))
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
})

// ✅ Root route
fastify.get('/', async (req, reply) => {
  return { message: 'Compliance Backend API is running' }
})

// ✅ Health check route
fastify.get('/health', async (req, reply) => {
  return {
    serverName: 'compliance-backend-service',
    status: 'ok'
  }
})

// ✅ Register API routes with "/api" prefix
fastify.register(userRoutes, { prefix: '/api' })
fastify.register(companyRoutes, { prefix: '/api' })
fastify.register(industryRoutes, { prefix: '/api' })
fastify.register(exposureCategoryRoutes, { prefix: '/api' })
fastify.register(tenantRoutes, { prefix: '/api' })
fastify.register(roleRoutes, { prefix: '/api' })
fastify.register(riskRoutes, { prefix: '/api' })
fastify.register(taskRoutes, { prefix: '/api' })

// Start server
const PORT = 5000
const start = async () => {
  try {
    await fastify.listen({ port: PORT, host: '0.0.0.0' })
    console.log(`Backend running on port ${PORT}`)
  } catch (error) {
    fastify.log.error(error)
    process.exit(1)
  }
}

start()