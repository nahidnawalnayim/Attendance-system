const User = require('../models/user')
const userService = require('../service/user')
const authService = require('../service/auth')

const getUsers = async (req, res, next) => {
    try {
        const users = await userService.findUser()
        return res.status(200).json(users)
    } catch (e) {
        next(e)
    }
}

const getUserbyID = async (req, res, next) => {
    const userId = req.params.userId
    console.log(userId);
    try {
        const user = await userService.findUserByprop('_id', userId)
        if (!user) {
            throw Error('User not found')
        }
        return res.status(200).json(user)
    } catch (e) {
        next(e)
    }
}
const postUser = async (req, res, next) => {
    const { name, email, password } = req.body
    try {
        const user = await authService.registerService({ name, email, password })
        return res.status(201).json(user)
    } catch (e) {
        console.log(e);
        next(e)
    }
}

const patchUser = async (req, res, next) => {
    const { userId } = req.params
    const { name } = req.body
    try {
        const user = await userService.findUserByprop('_id', userId)
        if (!user) {
            console.log('user not found');
        }
        user.name = name ?? user.name
        await user.save()
        return res.status(200).json(user)
    } catch (e) {
        next(e)
        console.log(e);
    }
}

const putUser = async (req, res, next) => {
    const { userId } = req.params
    const { name, email } = req.body
    try {
        const user = await userService.updateUser(userId, {
            name, email
        })
        if (!user) {
            console.log('user not found 404.');
        }
        res.status(200).json(user)
    } catch (e) {
        next(e)
        console.log(e);
    }
}

const deleteUser = async (req, res, next) => {
    const { userId } = req.params
    try {
        const user = await userService.findUserByprop('_id', userId);
        if (!user) {
            console.log('user not found');

        }
        await user.delete()
        return res.status(200).json(user)

    } catch (e) {
        next(e)
        console.log(e);
    }
}
module.exports = { getUsers, getUserbyID, postUser, patchUser, deleteUser,putUser }
