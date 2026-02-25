const riskService = require('./risk.service')

const getRisks = async (req, reply) => {
    try {
        const risks = await riskService.getRisksInformation()
        return reply
        .code(200)
        .header('Content-Type', 'application/json; charset=utf-8')
        .send(risks)
    } catch(err) {
        return reply
        .code(500)
        .header('Content-Type', 'application/json; charset=utf-8')
        .send({ response: 'Error - Connection to DB', error: err.message });
    }
}

const getExsposureCategoryRisks = async (req, reply) => {
    try {
        const exposureCategoryId  = req.params
        const risk = await riskService.getExsposureCategoryRisksInformation(exposureCategoryId)
        return reply
        .code(200)
        .header('Content-Type', 'application/json; charset=utf-8')
        .send(risk)
    } catch(err) {
        return reply
        .code(500)
        .header('Content-Type', 'application/json; charset=utf-8')
        .send({ response: 'Error - Connection to DB', error: err.message });
    }
}

const getRisk = async (req, reply) => {
    try{
        const { riskId } = req.params
        if (!riskId){
            return reply
            .send(`Invalide risk Id: ${riskId}`)
        }        
        const respRisk = await riskService.getRiskInformation(riskId)
        return reply
        .code(200)
        .header('Content-Type', 'application/json; charset=utf-8')
        .send(respRisk)
    } catch (err) {
        return reply
        .code(500)
        .header('Content-Type', 'application/json; charset=utf-8')
        .send({ response: 'Error - Connection to DB', error: err.message });
    }
}

const createRisk = async (req, reply) => {
    try {
        const { 
            riskName,
            exposureCategoryId,
            exposureRiskWeight,
            tasks
        }  = req.body
        if (!riskName && !exposureCategoryId) {
            return reply
            .send(`Invalide Risk information`)
        }
        const newRisk =  await riskService.createNewRisk(
            riskName, exposureCategoryId, exposureRiskWeight, tasks
        )
        return reply
            .code(200)
            .header('Content-Type', 'application/json; charset=utf-8')
            .send(newRisk)
    } catch (err) {
        return reply
        .code(500)
        .header('Content-Type', 'application/json; charset=utf-8')
        .send({ response: 'Error - Connection to DB', error: err.message });
    }   
}

const updateRisk = async (req, reply) => {
    try{
        const { riskId } = req.params
        if (!riskId) {
            return reply.send('riskId not provided')
        } else {
            const { 
                riskName,
                exposureCategoryId,
                exposureRiskWeight,
                tasks
            }  = req.body
            const updateRisk = await riskService.updateRisk(
                riskId, riskName, exposureCategoryId, exposureRiskWeight, tasks
            )
            return reply
            .code(200)
            .header('Content-Type', 'application/json; charset=utf-8')
            .send(updateRisk)
        }
    }catch (err){
        return reply
        .code(500)
        .header('Content-Type', 'application/json; charset=utf-8')
        .send({ response: 'Error - Connection to DB', error: err.message });
    }
}


module.exports = {
    getRisks,
    getRisk,
    createRisk,
    getExsposureCategoryRisks,
    updateRisk
}