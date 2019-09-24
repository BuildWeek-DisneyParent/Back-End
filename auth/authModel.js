const data = require('../data/dbConfig')

module.exports = {
    findBy,
    add,
    remove
}

function findBy(item) {
    return data('users').where(item)
}

async function add(user) {
    const [id] = await data('users').insert(user)
}

function remove(id) {
    return db('users')
      .where('id', id)
      .del();
  }