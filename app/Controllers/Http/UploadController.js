'use strict'
const Helpers = use('Helpers')

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const User = use('App/Models/User');

class UpdateController {
    async update({request, auth}){

      const user = await auth.gethUser()
      const user_img = request.file('user_img', {
          types: ['image'],
          size: '2mb'
        })
        await user_img.move(Helpers.tmpPath('uploads'), {
          name: `${new Date().getTime()}.${user_img.subtype}`
        })
      if (!user_img.moved()) {
          
          return user_img.error()
      
      }
      
      user.user_img = user_img.fileName
      
      console.log(user_img)
      await user.save
      return user
    }
}

module.exports = UpdateController
