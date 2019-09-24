const auth = require('./auth-router')
const db = require('../database/dbConfig')
const request = require('supertest')

describe('Status 201 when it creates a user', () => {
    it('responds with status 201 when a user is created', () => {
        const newUser = {
            username: 'Sandy',
            password: 'password1'
        }
        request(auth)
            .post('/register')
                .send(newUser)
                .set('Accept', "application/json")
                .then(res => {
                    expect(res.status).toBe(201)
                })
    })
    
})


describe('Status 401 when a username is missing', () => {
    it('responds with 401 when username is missing', () => {
        const newUser = {
            "password":"test"
        }
        request(auth)
          .post('/register')
              .send(newUser)
              .set('Accept', "application/json")
              .then(res => {
                  expect(res.status).toBe(401)
              })
    })  
})

describe('Status 401 when a username is missing', () => {
    it('responds with 401 when username is missing', () => {
        const newUser = {
            "password":"test"
        }
        request(auth)
          .post('/login')
              .send(newUser)
              .set('Accept', "application/json")
              .then(res => {
                  expect(res.status).toBe(401)
              })
    })  
})

describe('Status 401 when a password is incorrect', () => {
    it('responds with 401 when password is incorrect', () => {
        const userToLog = {
            "username":"Bishop",
            "password":"test"
        }
        request(auth)
          .post('/login')
              .send(userToLog)
              .set('Accept', "application/json")
              .then(res => {
                  expect(res.status).toBe(401)
              })
    })  
})

describe('Status 200 when login i successfull', () => {
    it('responds with 200 when login i successfull', () => {
        const correctUserToLog = {
            "username":"Bishop",
            "password":"password"
        }
        request(auth)
          .post('/login')
              .send(correctUserToLog)
              .set('Accept', "application/json")
              .then(res => {
                expect(res.status).toBe(200)
    })  
})
})

describe('Status 200 when login i successfull', () => {
    it('responds with 200 when login i successfull', () => {
        const correctUserToLog = {
           id:'id'
        }
        request(auth)
          .delete('/login/:id')
              .send(correctUserToLog)
              .then(res => {
                expect(res.status).toBe(200)
    })  
})
})