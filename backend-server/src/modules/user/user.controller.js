const userService = require('./user.service')

const getUsers = async (req, reply) => {
    try {
        const users = await userService.getUsersInformation()
        return reply
        .code(200)
        .header('Content-Type', 'application/json; charset=utf-8')
        .send(users)
    } catch(err) {
        return reply
        .code(500)
        .header('Content-Type', 'application/json; charset=utf-8')
        .send({ response: 'Error - Connection to DB', error: err.message });
    }
}


const getUser = async (req, reply) => {
    try{
        const { userId } = req.params
        if (!userId){
            return reply
            .send(`Invalide User Id: ${userId}`)
        }
        const respUser = await userService.getUserInformation(userId)
        return reply
        .code(200)
        .header('Content-Type', 'application/json; charset=utf-8')
        .send(respUser)
    } catch (err) {
        return reply
        .code(500)
        .header('Content-Type', 'application/json; charset=utf-8')
        .send({ response: 'Error - Connection to DB', error: err.message });
    }
}

const getCompanyUsers = async (req, reply) => {
    try {
        console.log('NICE')
        const companyId  = req.params
        const users = await userService.getCompanyUsersInformation(companyId)
        return reply
        .code(200)
        .header('Content-Type', 'application/json; charset=utf-8')
        .send(users)
    } catch(err) {
        return reply
        .code(500)
        .header('Content-Type', 'application/json; charset=utf-8')
        .send({ response: 'Error - Connection to DB', error: err.message });
    }
}

const createUser = async (req,reply) => {
    try {
        const { 
            name,
            lastName,
            phoneNumber,
            companyId,
            role_id,
            userType,
            email
         }  = req.body
        if (!name || !lastName || !phoneNumber || !role_id || !companyId) {
            return reply
            .send(`Invalide User information`)
        }
        const newUser =  await userService.createNewUser(
            name, lastName, phoneNumber, companyId, role_id, userType, email
        )
        return reply
            .code(200)
            .header('Content-Type', 'application/json; charset=utf-8')
            .send(newUser)
    } catch (err) {
        return reply
        .code(500)
        .header('Content-Type', 'application/json; charset=utf-8')
        .send({ response: 'Error - Connection to DB', error: err.message });
    }   
}

const updateUser = async (req, reply) => {
    try{
        const { userId } = req.params
        if (!userId) {
            return userId.send('userId not provided')
        } else {
            const { 
                name,
                lastName,
                phoneNumber,
                companyId,
                role_id,
                userType,
                email
            }  = req.body            
            const updateUser = await userService.updateUser(
                userId, name, lastName, phoneNumber, companyId, role_id, userType, email
            )
            return reply
            .code(200)
            .header('Content-Type', 'application/json; charset=utf-8')
            .send(updateUser)
        }
    }catch (err){
        return reply
        .code(500)
        .header('Content-Type', 'application/json; charset=utf-8')
        .send({ response: 'Error - Connection to DB', error: err.message });
    }
}

module.exports = {
    getUsers,
    getUser,
    getCompanyUsers,
    createUser,
    updateUser
}