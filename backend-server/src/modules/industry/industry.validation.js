const industryController = require('./industry.controller')

const Industry = {
    type:'object',
    properties:{
        _id: {type:'string'},
        industryName: {type: 'string'},
        exposureCategories: {
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
        }
    }
}

const getIndustriesOpt = {
    schema: {
            tags: ['Indusry'],
            summary: 'Get all industries',
            response: {
            200: {
                type: 'array',
                items: Industry
            }
        }
    },
    handler: industryController.getIndustries
}

const postIndustryOpts = {
  schema: {
    body: {
      type: 'object',
      properties: {
        industryName: {type: 'string'},
        exposureCategories: {
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
        }
      },
      required: ['industryName' , 'exposureCategories'],
      additionalProperties: false
    }
  },
  handler: industryController.createIndustry
}

const updateIndustryOpts = {
    schema: {
        tags: ['Industry'],
        summary: 'Update industry',
        response: {
        201: Industry
        }
    },
    handler: industryController.updateIndustry
}

module.exports = {
    getIndustriesOpt,
    postIndustryOpts,
    updateIndustryOpts
}