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

        await server.listen({ port: process.env.PORT?.length ? parseInt(process.env.PORT) : 8080 })
    }

}

module.exports = Context
