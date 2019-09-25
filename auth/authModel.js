const data = require('../data/dbConfig')

module.exports = {
    findBy,
    add,
    remove
}

function findBy(item) {
    return data('auth').where(item)
}

function add(user) {
    return data('auth')
      .insert(user, 'id')
      .then(([id]) => this.findById(id));
  }

function remove(id) {
    return data('auth')
      .where('id', id)
      .del();
  }