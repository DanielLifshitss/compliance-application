const roleCollector = require('./role.controller')

const Role = {
    type:'object',
    properties:{
        _id: {type:'string'},
        companyId: {type: 'string'},
        industryId: {type: 'string'},
        roleName: {type: 'string'},
        roleDescription: {type: 'string'},
        exposureCategories: {type: 'string'},
        roleRisks: {
            type: 'array',
            items: { type: 'string' }
        },
        createdAt: {
            type: 'string',
            format: 'date-time'
        },
        updatedAt: {
            type: 'string',
            format: 'date-time'
        },
    }
}

const getRolesOpts = {
    schema: {
            tags: ['Roles'],
            summary: 'Get all Roles',
            response: {
            200: {
                type: 'array',
                items: Role
            }
        }
    },
    handler: roleCollector.getRoles
}

const getRoleOpts = {
    schema: {
        tags: ['Role'],
        summary: 'Get role',
        response: {
        200: Role
        }
    },
    handler: roleCollector.getRole
}

const postRoleOpts = {
  schema: {
    body: {
      type: 'object',
      properties: {
        companyId: {type: 'string'},
        industryId: {type: 'string'},
        roleName: {type: 'string'},
        roleDescription: {type: 'string'},
        exposureCategories: {type: 'string'},
        roleRisks: {
            type: 'array',
            items: { type: 'string' }
        },
      },
      required: ['industryId' , 'roleName'],
      additionalProperties: false
    }
  },
  handler: roleCollector.createRole
}

const getIndustryRolesOpts = {
    schema: {
            tags: ['Role'],
            summary: 'Get all roles in industry',
            response: {
            200: {
                type: 'array',
                items: Role
            }
        }
    },
    handler: roleCollector.getIndustryRoles
}

const updateRoleOpts = {
    schema: {
        tags: ['Role'],
        summary: 'Update Role',
        response: {
        201: Role
        }
    },
    handler: roleCollector.updateRole
}

module.exports = {
    getRolesOpts,
    getIndustryRolesOpts,
    getRoleOpts,
    postRoleOpts,
    updateRoleOpts
}