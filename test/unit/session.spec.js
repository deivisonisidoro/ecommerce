'use strict'
const { test, trait } = use('Test/Suite')('Session')

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const User = use('App/Models/User')

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')



trait('Test/ApiClient')

test("it should return JTW token when session created", async ({assert, client})=>{

    const user = await User.create({
        username: 'Deivison Isidoro',
        email: 'deivison@gmail.com',
        password: '123456'
    }) 
    const response = await client
        .post('/authenticate')
        .send({
            email: 'deivison@gmail.com',
            password: '123456'
        })
        .end()
    console.log(response)
    response.assertStatus(200)
    assert.exists(response.body.token)
})