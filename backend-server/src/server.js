const connectDB = require('../src/config/database')
const { userRoutes } = require('./modules/user/user.routes');
const { tenantRoutes } = require('./modules/tenant/tenant.routes')
const { companyRoutes } = require('./modules/company/company.routes')
const { industryRoutes } = require('./modules/industry/industry.routes')
const { exposureCategoryRoutes } = require('./modules/exposureCategory/exposureCategory.routes')
const { roleRoutes } = require('./modules/role/role.routes')
const { riskRoutes } = require('./modules/risk/risk.routes')
const { taskRoutes } = require('./modules/task/task.routes')

connectDB()


const fastify = require('fastify')({ logger: true })
fastify.register(require('@fastify/swagger'), {
  openapi: {
    info: {
      title: 'compliance-application-api',
      version: '1.0.0'
    }
  }
})
fastify.register(require('@fastify/swagger-ui'), {
    exposeRoute:true,
  routePrefix: '/docs'
})

fastify.register(require('@fastify/cors'), {
  origin: 'http://localhost:3000',
  methods: ['GET', 'POST', 'PUT', 'DELETE']
})

//API Endpoints/Routes:
fastify.register(userRoutes)
fastify.register(companyRoutes)
fastify.register(industryRoutes)
fastify.register(exposureCategoryRoutes)
fastify.register(tenantRoutes)
fastify.register(roleRoutes)
fastify.register(riskRoutes)
fastify.register(taskRoutes)



const PORT = { port: 5000 }

fastify.get('/health', async (req, reply) => {
  return {
    serverName: 'compliance-backend-service',
    status: 'ok'
  }
})

const start = async () => {
  try {
    await fastify.listen(PORT)
  } catch (error) {
    fastify.log.error(error)
    process.exit(1)
  }
}

start()