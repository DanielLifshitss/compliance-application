const Risk = require('./risk.model')

async function getRisks() {
    return await Risk.find()
}

async function getExsposureCategoryRisks(exposureCategoryId) {
    return await Risk.find({exposureCategoryId})
}

async function getRiskById(riskId) {
    return await Risk.findById(riskId) 
}

async function  getRiskByName(riskName, exposureCategoryId) {
    return await Risk.find({riskName, exposureCategoryId})
}

async function createRisk(riskObj) {
    const newRisk = Object.fromEntries(
        Object.entries(riskObj).filter(([_, value]) => value !== undefined)
    )
    return await Risk.create(newRisk)
}

async function updateRisk(riskId, riskName, exposureCategoryId, exposureRiskWeight, tasks){
    const risk = await getRiskById(riskId)
    if(risk.riskName !== riskName){
        risk.riskName = riskName
    }
    if(risk.exposureCategoryId.toString()!== exposureCategoryId){
        risk.exposureCategoryId = exposureCategoryId
    }
    if(exposureRiskWeight){
        if(Number(exposureRiskWeight) > 0 && Number(exposureRiskWeight) <= 10){
            if(risk.exposureRiskWeight !== exposureRiskWeight){
                risk.exposureRiskWeight = exposureRiskWeight
            }
        }
    }
    if(tasks){
        if (risk.tasks !== tasks){
            risk.tasks = tasks
        }
    }
    await risk.save()
    return risk
}


module.exports = {
    getRisks,
    getExsposureCategoryRisks,
    getRiskById,
    getRiskByName,
    createRisk,
    updateRisk
}