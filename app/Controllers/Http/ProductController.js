'use strict'
const Product = use('App/Models/Product') 

class ProductController {
 
  async index ({request}) {
    const { page =1} = request.get()
    const product = await Product.query()
    .paginate(page , 10);
    return product
  }
    
    //return view.render('products', {product: products.toJSON() })
  
  async store ({ request, response}) {
    const data = request.only(["name", "type", "description", "price"])
    const product = await Product.create(data)
    return response.status(201).json(product)
  }

  async show ({ params}) {
    const product = await Product.find(params.id)
    return product
  }

  async update ({ params, request }) {
    const data = request.only(["name", "type", "description"])
    const product = await Product.find(params.id)
    product.merge(data)
    await product.save()
    return product
  }

  async destroy ({ params}) {
    const product = await Product.find(params.id)
    await product.delete()
  }
}

module.exports = ProductController
