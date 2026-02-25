const companyController = require('./company.controller')

const Company = {
    type:'object',
    properties:{
        _id: {type:'string'},
        tenantId: {type: 'string'},
        companyName: {type: 'string'},
        companyIndustryId: {type: 'string'},
        companyWebsiteUrl: {type: 'string'},
        country: {type: 'string'},
        language: {type: 'string'},
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

const getCompaniesOpt = {
    schema: {
            tags: ['Company'],
            summary: 'Get all companies',
            response: {
            200: {
                type: 'array',
                items: Company
            }
        }
    },
    handler: companyController.getCompanies
}

const getCompanyOpts = {
    schema: {
        tags: ['Company'],
        summary: 'Get company',
        response: {
        200: Company
        }
    },
    handler: companyController.getCompany
}

const postCompanyOpts = {
  schema: {
    body: {
      type: 'object',
      properties: {
        tenantId: {type: 'string'},
        companyName: {type: 'string'},
        companyIndustryId: {type: 'string'},
        companyWebsiteUrl: {type: 'string'},
        country: {type: 'string'},
        language: {type: 'string'}
      },
      required: ['companyName' , 'companyIndustryId', 'country'],
      additionalProperties: false
    }
  },
  handler: companyController.createCompany
}

const getTenantCompaniesOpt = {
    schema: {
            tags: ['Company'],
            summary: 'Get all companies',
            response: {
            200: {
                type: 'array',
                items: Company
            }
        }
    },
    handler: companyController.getTenantCompanies
}

const updateCompanyOpts = {
    schema: {
        tags: ['Company'],
        summary: 'Update company',
        response: {
        201: Company
        }
    },
    handler: companyController.updateCompany
}

module.exports = {
    getCompaniesOpt,
    getCompanyOpts,
    postCompanyOpts,
    getTenantCompaniesOpt,
    updateCompanyOpts
}