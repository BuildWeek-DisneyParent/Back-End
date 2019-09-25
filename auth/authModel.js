const data = require('../data/dbConfig')

module.exports = {
    findAll,
    findBy,
    add,
    remove
}
function findAll(){
    return data('auth')
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