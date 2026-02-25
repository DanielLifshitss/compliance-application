const User = require('./user.model')

async function getUsers() {
    return await User.find()
}

async function getUserById(userId) {
    return await User.findById(userId) 
}

async function getCompanyUsers(companyId){
    return await User.find(companyId)
}

async function checkUserInDatabase(phoneNumber){
    return await User.find({phoneNumber})
}

async function createUser(name, lastName, phoneNumber, companyId, role_id, userType, email) {
    const newUser = new User()
    newUser.name = name
    newUser.lastName = lastName
    newUser.phoneNumber = phoneNumber
    newUser.companyId = companyId
    newUser.role_id = role_id
    if (userType) {
        newUser.userType = userType
    }
    if (email){
        newUser.email = email
    }
    await newUser.save()
    return newUser
}

async function updateUser(userId, name, lastName, phoneNumber, companyId, role_id, userType, email){
    const user = await getUserById(userId)
    if(user.name !== name){
        user.name = name
    }
    if(user.lastName !== lastName){
        user.lastName = lastName
    }
    if(user.phoneNumber !== phoneNumber){
        user.phoneNumber = phoneNumber
    }
    if(user.companyId !== companyId){
        user.companyId = companyId
    }
    if(user.role_id !== role_id){
        user.role_id = role_id
    }
    if(user.userType !== userType){
        user.userType = userType
    }
    if(user.email !== email){
        user.email = email
    }
    
    await user.save()
    return user
}

module.exports = {
    getUsers,
    getUserById,
    getCompanyUsers,
    checkUserInDatabase,
    createUser,
    updateUser
}