const bcrypt = require('bcrypt-nodejs')

module.exports = app => {
    const getHash = (password, callback) => {
        bcrypt.genSalt(10, (error, salt) => {
            bcrypt.hash(password, salt, null, (error, hash) => callback(hash))
        })
    }

    const save = (request, response) => {
        getHash(request.body.password, hash => {
            const password = hash
            app.db('users')
                .insert({ 
                    name: request.body.name,
                    email: request.body.email.toLowerCase(),
                    password
                })
                .then(_ => response.status(204).send('Usuário cadastrado com sucesso.'))
                .catch(error => {
					response.status(500).json(error)	
				})
        })
    }

    return { save };
}