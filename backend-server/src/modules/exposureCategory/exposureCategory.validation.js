const exposureCategoryController = require('./exposureCategory.controller')

const ExposureCategory = {
    type:'object',
    properties:{
        _id: {type:'string'},
        companyId: {type: 'string'},
        categoryName: {type: 'string'},
        risks: {
            type: 'array',
            items: { type: 'string' }
        },
        exposureCategoryWeight: {type: 'number'},
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

const getExposureCategoriesOpts = {
    schema: {
            tags: ['Exposure Categories'],
            summary: 'Get all exposure categories',
            response: {
            200: {
                type: 'array',
                items: ExposureCategory
            }
        }
    },
    handler: exposureCategoryController.getExposureCategories
}

const postExposureCategoryOpts = {
  schema: {
    body: {
      type: 'object',
      properties: {
        companyId: {type: 'string'},
        categoryName: {type: 'string'},
        risks: {
            type: 'array',
            items: { type: 'string' }
        },
        exposureCategoryWeight: {type: 'number'},
        createdAt: {
            type: 'string',
            format: 'date-time'
        },
        updatedAt: {
            type: 'string',
            format: 'date-time'
        },
      },
      required: ['categoryName'],
      additionalProperties: false
    }
  },
  handler: exposureCategoryController.createExposureCategory
}

const updateExposureCategoryOpts = {
    schema: {
        tags: ['Exposure Categories'],
        summary: 'Update Exposure Category',
        response: {
        201: ExposureCategory
        }
    },
    handler: exposureCategoryController.updateExposureCategory
}

module.exports = {
    getExposureCategoriesOpts,
    postExposureCategoryOpts,
    updateExposureCategoryOpts
}