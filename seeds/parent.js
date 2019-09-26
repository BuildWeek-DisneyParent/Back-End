
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('parentsInfo').del()
    .then(function () {
      // Inserts seed entries
      return knex('parentsInfo').insert([
        {id: 1, Name: 'May Day', about:'I like cheese', email: 'jonsnow@example.com', phone: '(205)555-5555'},
      ]);
    });
};
