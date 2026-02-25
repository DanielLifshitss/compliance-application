const riskRepository = require('./risk.repository')


async function getRisksInformation() {
    const risks = await riskRepository.getRisks()
    return risks
}
async function getExsposureCategoryRisksInformation(exposureCategoryId) {
    const risks = await riskRepository.getExsposureCategoryRisks(exposureCategoryId.exposureCategoryId)
    return risks
}

async function getRiskInformation(riskId) {
    const risk = await riskRepository.getRiskById(riskId)
    return risk
}

async function createNewRisk(riskName, exposureCategoryId, exposureRiskWeight, tasks) {
    const checkIfExists = await riskRepository.getRiskByName(riskName, exposureCategoryId)
    if (checkIfExists.length !== 0) {
        return { response: `Role ${riskName} already exists` }
    } else if (checkIfExists.length === 0){
        const newRiskObj = {
            riskName, exposureCategoryId, exposureRiskWeight, tasks
        }
        const newRisk= await riskRepository.createRisk(newRiskObj)
        return newRisk
    }
}

async function updateRisk(riskId, riskName, exposureCategoryId, exposureRiskWeight, tasks) {
        console.log(riskId)

    const checkIfExists = await riskRepository.getRiskById(riskId)
    if (checkIfExists) { 
        await riskRepository.updateRisk(
            riskId, riskName, exposureCategoryId, exposureRiskWeight, tasks
        )
        return {response : 'Risk data updated'}
    } else if (!checkIfExists) {
        return { response: `No existing risk`}
    }
}


module.exports = {
    getRisksInformation,
    getExsposureCategoryRisksInformation,
    getRiskInformation,
    createNewRisk,
    updateRisk
}