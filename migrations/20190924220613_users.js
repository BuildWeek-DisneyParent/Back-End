exports.up = function(knex) {
    return knex.schema.createTable('users', tbl => {
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
    });
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTableIfExists('users');
  };