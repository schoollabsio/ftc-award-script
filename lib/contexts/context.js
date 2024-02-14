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

        await server.listen({ host: '0.0.0.0', port: process.env.PORT?.length ? parseInt(process.env.PORT) : 8080 })
        console.log(`Server listening on ${server.server.address().address}:${server.server.address().port}`)
    }

}

module.exports = Context
