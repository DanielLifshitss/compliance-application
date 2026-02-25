const userRepository = require('./user.repository')


async function getUsersInformation() {
    const users = await userRepository.getUsers()
    return users
}

async function getUserInformation(userId) {
    const user = await userRepository.getUserById(userId)
    return user
}

async function getCompanyUsersInformation(companyId) {
    const users = await userRepository.getCompanyUsers(companyId)
    return users
}

async function createNewUser(name, lastName, phoneNumber, companyId, role_id, userType, email) {
        console.log("NICE")
    
    const checkIfExists = await userRepository.checkUserInDatabase(phoneNumber)
    if (checkIfExists.length === 0) {
        const newUser = await userRepository.createUser(
            name, lastName, phoneNumber, companyId, role_id, userType, email
        )
        return newUser
    } else if (checkIfExists.length !== 0) {
        return { response : `User with phone number  ${phoneNumber} already exists`}
    }
}

async function updateUser(userId, name, lastName, phoneNumber, companyId, role_id, userType, email) {
    const checkIfExists = await userRepository.getUserById(userId)
    if (checkIfExists) { 
        await userRepository.updateUser(userId, name, lastName, phoneNumber, companyId, role_id, userType, email)
        return {response : 'User data updated'}
    } else if (!checkIfExists) {
        return { response: `No existing User`}
    }
}

module.exports = {
    getUsersInformation,
    getUserInformation,
    getCompanyUsersInformation,
    createNewUser,
    updateUser
}