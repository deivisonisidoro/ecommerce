'use strict'
const User = use("App/Models/User")

class AuthController {
    async register({request}){
        const data = request.only(['username', 'email', 'password'])
        const user = await User.create(data)
        return user
    }
    async authenticate({request, auth}){
        const {email, password} = request.all()
        const {token} = await auth.attempt(email, password)
        return {token}
    }
    /*async store({request,  auth}){
        const {email, password} = request.only([
            'email',
            'password'
        ])
        const token = await  auth.attempt(email, password)

        return {token}
    }*/
}

module.exports = AuthController
