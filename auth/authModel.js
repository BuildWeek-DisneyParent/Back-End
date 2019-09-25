const data = require('../data/dbConfig')

module.exports = {
    findBy,
    add,
    remove
}

function findBy(item) {
    return data('users').where(item)
}

function add(user) {
    return data('users')
      .insert(user, 'id')
      .then(([id]) => this.findById(id));
  }

function remove(id) {
    return data('users')
      .where('id', id)
      .del();
  }