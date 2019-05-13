import {Server} from './server/server'
import {usersRouter} from './users/user.router'
import {interfaceRouter} from './interface/interface.router'

const server = new Server()
server.bootstrap([usersRouter, interfaceRouter]).then(server=>{
    console.log('Server is listening on:', server.aplication.address())
}).catch(error=>{
    console.log('Server failed to start')
    console.error(error)
    process.exit(1)
})