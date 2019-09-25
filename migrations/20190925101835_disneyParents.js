
exports.up = function(knex) {
    return knex.schema.createTable('auth', tbl => {
      users.increments();
      tbl
      .string('username', 255)
      .notNullable()
      .unique();
      tbl
      .string('password', 255)
      .notNullable();
      tbl
      .string('email', 50)
      .notNullable()
      .unique();
      tbl
      .string('fullname', 50)
      .notNullable();
    })
    .createTable('parentInfo', tbl => {
        tbl.increments();
        tbl.string('name', 50)
        .unsigned().notNullable().references('fullname').inTable('auth')
        .onDelete('CASCADE')
        .onUpdate('CASCADE');
        tbl.text('about', 500);
        tbl.string('parent_email')
        .unsigned().notNullable().references('email').inTable('auth')
        .onDelete('CASCADE')
        .onUpdate('CASCADE');
        tbl.integer('parent_id')
        .unsigned().notNullable().references('id').inTable('auth')
        .onDelete('CASCADE')
        .onUpdate('CASCADE');
        tbl.string('phone')
    })
    .createTable('request', tbl => {
        users.increments();
        tbl
        .string('name', 50)
        .notNullable();
        tbl
        .string('meeting_place')
        .notNullable();
        tbl
        .string('time')
        .notNullable();
        tbl
        .integer('kids')
        .notNullable();
        tbl
        .text('question', 500)
      })
};
  
  exports.down = function(knex) {
    return knex.schema.dropTableIfExists('auth')
    .dropTableIfExists('parentInfo')
    .dropTableIfExists('request')
  };