const Fastify = require('fastify')
const ScriptService = require('../services/script-service')
const handler = require('../pages/home')

class Context {

    get server() {
        return Fastify({})
    }

    get scriptService() {
        return new ScriptService(this);
    }

    async start() {
        const server = this.server

        server.get('/', {}, async (request, reply) => {
            reply.headers({
                'Content-Type': 'text/html'
            })
            return handler()
        })

        server.post('/api/script', async (request, reply) => {
            reply.headers({
                'Content-Type': 'application/json'
            })
            return this.scriptService.generateScript(request.body)
        })

        await server.listen({ port: 80 })
        // const address = server.address()
        // const port = typeof address === 'string' ? address : address?.port
    }

}

module.exports = Context
