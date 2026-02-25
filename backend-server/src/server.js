const connectDB = require('../src/config/database')
const { userRoutes } = require('./modules/user/user.routes');
const { tenantRoutes } = require('./modules/tenant/tenant.routes')
const { companyRoutes } = require('./modules/company/company.routes')

connectDB()


//Fastify Swagger Configuration:
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


//API Endpoints/Routes:
fastify.register(userRoutes)
fastify.register(companyRoutes)
// fastify.register(require('../src/modules/company/company.routes'))
// fastify.register(require('../src/modules/exposureCategory/exposureCategory.routes'))
// fastify.register(require('../src/modules/file/file.routes'))
// fastify.register(require('../src/modules/industry/industry.routes'))
// fastify.register(require('../src/modules/risk/risk.routes'))
// fastify.register(require('../src/modules/role/role.routes'))
// fastify.register(require('../src/modules/task/task.routes'))
fastify.register(tenantRoutes)



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