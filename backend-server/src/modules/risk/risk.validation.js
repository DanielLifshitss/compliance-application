const riskCollector = require('./risk.controller')

const Risk = {
    type:'object',
    properties:{
        _id: {type:'string'},
        riskName: {type: 'string'},
        exposureCategoryId: {type: 'string'},
        exposureRiskWeight: {type: 'number'},
        tasks: {
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

const getRisksOpts = {
    schema: {
            tags: ['Risks'],
            summary: 'Get all Risks',
            response: {
            200: {
                type: 'array',
                items: Risk
            }
        }
    },
    handler: riskCollector.getRisks
}

const getRiskOpts = {
    schema: {
        tags: ['Risk'],
        summary: 'Get risk',
        response: {
        200: Risk
        }
    },
    handler: riskCollector.getRisk
}

const postRiskOpts = {
  schema: {
    body: {
      type: 'object',
      properties: {
        riskName: {type: 'string'},
        exposureCategoryId: {type: 'string'},
        exposureRiskWeight: {type: 'number'},
        tasks: {
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
      },
      required: ['riskName' , 'exposureCategoryId'],
      additionalProperties: false
    }
  },
  handler: riskCollector.createRisk
}

const getExsposureCategoryRisksOpts = {
    schema: {
            tags: ['Risk'],
            summary: 'Get Risks By Exposure Category',
            response: {
            200: {
                type: 'array',
                items: Risk
            }
        }
    },
    handler: riskCollector.getExsposureCategoryRisks
}

const updateRiskOpts = {
    schema: {
        tags: ['Risk'],
        summary: 'Update Risk',
        response: {
        201: Risk
        }
    },
    handler: riskCollector.updateRisk
}

module.exports = {
    getRisksOpts,
    getExsposureCategoryRisksOpts,
    getRiskOpts,
    postRiskOpts,
    updateRiskOpts
}