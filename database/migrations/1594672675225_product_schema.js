/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class ProductSchema extends Schema {
  up() {
    this.create('products', (table) => {
      table.increments();
      table.string('product_img')
      table.string('name').notNullable();
      table.string('type').notNullable();
      table.text('description').notNullable();
      table.string('price').notNullable();
      table.timestamps();
    });
  }

  down() {
    this.drop('products');
  }
}

module.exports = ProductSchema;
