'use strict'

const  { Worker } = require('worker_threads')


/** exec -> execute console commands */
/** spawn -> execute console commands, receive params as array  */
/** fork -> execute console commands, events oriented, execute a child.js process (pdf example) */

function createWorker (workerData) {
    return  new Promise((resolve, reject) => {
        const worker = new Worker('./worker.js', {
            workerData
        })

        worker.on('message', message => {
            resolve(message)
        })

        worker.on('error', error => {
            reject(error)
        })

        worker.on('exit', exitCode => {
            if (exitCode !== 0) {
                reject(new Error('Something bad happened'))
            }
        })

        worker.on('online', ()=> {
            console.log(`${worker.threadId} is online`)
        })
    });
}

createWorker({ hello: 'its my first worker', number: 1e3 }).then(result => {
    console.log(result)
}).catch( error => {
    console.error(error)
})