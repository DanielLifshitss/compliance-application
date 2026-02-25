const { User } = require('../user/user.validation')
const tenantController = require('./tenant.controller')

const Tenant ={
    type: 'object',
    properties: {
        _id: {type : 'string'},
        tenantName : {type: 'string'},
        buyerId: {type: 'string'}
    }
}

const getTenantsOpts = {
    schema: {
        tags: ['Tenants'],
        summary: 'Get all tenants',
        response: {
        200: {
            type: 'array',
            items: Tenant
            }
        }
    },
    handler: tenantController.getTenants
}

const getTenantOpts = {
    schema: {
        tags: ['Tenants'],
        summary: 'Get all tenants',
        response: {
        200: Tenant
        }
    },
    handler: tenantController.getTenant
}

const postTenantOpts = {
  schema: {
    body: {
      type: 'object',
      properties: {
        tenantName: { type: 'string' },
        buyerId: { type: 'string' }
      },
      required: ['tenantName'],
      additionalProperties: false
    }
  },
  handler: tenantController.createTenant
}

const updateTenantOpts = {
    schema: {
        tags: ['Tenants'],
        summary: 'Update tenant',
        response: {
        201: Tenant
        }
    },
    handler: tenantController.updateTenant
}

module.exports = {
    getTenantsOpts,
    getTenantOpts,
    postTenantOpts,
    updateTenantOpts
}