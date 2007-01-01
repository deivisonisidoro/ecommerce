/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URLs and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route');


Route.group(()=>{
    Route.post('/store', 'UserController.register').validator('Create');
    Route.resource('/User', 'UserController').apiOnly()
})

    Route.post('/authenticate', 'AuthController.authenticate').validator('Auth')
    Route.post('/forgot', 'ForgotPasswordController.store').validator('Forgot');
    Route.post('/reset', 'ResetPasswordController.store').validator('Reset');



Route.group(()=>{
   
    Route.resource('/order', 'OrderController').apiOnly()
})

Route.group(()=>{ 
    Route.put('/upload/:id', 'UploadController.update')
    Route.resource("/product", "ProductController").apiOnly()
})

Route.group(()=>{
    Route.post("/files", "ProductController.store")
})
