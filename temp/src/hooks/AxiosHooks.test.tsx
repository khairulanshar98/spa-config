import { AxiosError, AxiosResponse } from 'axios'
import { config, errorHandler, successHandler } from './AxiosHooks'

describe('test errorHandler', () => {
    it('test with data', async (done: () => void) => {
        const data: AxiosError = {
            response: {
                config: config,
                data: {
                    status: 'ERROR',
                    errorCode: 0,
                    message: `Cancel: axios request cancelled`
                },
                status: 0,
                statusText: 'Error',
                headers: {},
            },
            isAxiosError: false,
            toJSON: () => JSON.parse('{}'),
            name: '',
            message: '',
            config: config,
        }
        await errorHandler(data)
        done()
    })
})

describe('test successHandler', () => {
    it('test with csrf', async (done: () => void) => {
        const data: AxiosResponse = {
            config: config,
            data: {},
            status: 200,
            statusText: '',
            headers: { csrf: '123' }
        }
        successHandler(data)
        done()
    })
    it('test without csrf', async (done: () => void) => {
        const data: AxiosResponse = {
            config: config,
            data: {},
            status: 200,
            statusText: '',
            headers: {}
        }
        await successHandler(data)
        done()
    })
})