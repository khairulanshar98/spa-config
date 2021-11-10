import '@testing-library/jest-dom'
import React from 'react'
import { render, screen, act } from '@testing-library/react'
import Provider from '../hooks/context'
import { getData } from './client'


jest.mock('../hooks/AxiosHooks', () => ({
    get: () => Promise.resolve({ data: { 'data': [{ 'path': '/api/v1/checktoken', 'epoch': 1616922388027, 'count': 11, '_id': '60603e6f257fa2891c62d952', 'ipAddress': { 'ipAddress': '::1', 'enable': true, '_id': '60603e6f257fa2891c62d941' }, 'createdAt': '2021-03-28T08:29:35.511Z', 'updatedAt': '2021-03-28T09:06:28.027Z' }, { 'path': '/api/v1/ip/1/5/@', 'epoch': 1616922388027, 'count': 11, '_id': '60603e6f257fa2891c62d982', 'ipAddress': { 'ipAddress': '::1', 'enable': true, '_id': '60603e6f257fa2891c62d941' }, 'createdAt': '2021-03-28T08:29:35.602Z', 'updatedAt': '2021-03-28T09:06:28.027Z' }, { 'path': '/api/v1/request/1/5/@', 'epoch': 1616922388027, 'count': 11, '_id': '60603fdb257fa2891c63bf0c', 'ipAddress': { 'ipAddress': '::1', 'enable': true, '_id': '60603e6f257fa2891c62d941' }, 'createdAt': '2021-03-28T08:35:39.698Z', 'updatedAt': '2021-03-28T09:06:28.027Z' }, { 'path': '/api/v1/checktoken', 'epoch': 1616930845892, 'count': 1, '_id': '6060474f257fa2891c68dc65', 'ipAddress': { 'ipAddress': '::ffff:127.0.0.1', 'enable': true, '_id': '6060474f257fa2891c68dc5b' }, 'createdAt': '2021-03-28T09:07:27.389Z', 'updatedAt': '2021-03-28T11:28:03.540Z' }, { 'path': '/api/v1/ip/1/5/@', 'epoch': 1616930845892, 'count': 0, '_id': '6060474f257fa2891c68dc94', 'ipAddress': { 'ipAddress': '::ffff:127.0.0.1', 'enable': true, '_id': '6060474f257fa2891c68dc5b' }, 'createdAt': '2021-03-28T09:07:27.556Z', 'updatedAt': '2021-03-28T11:27:25.892Z' }, { 'path': '/api/v1/request/1/5/@', 'epoch': 1616930845892, 'count': 2, '_id': '60604757257fa2891c68e1fa', 'ipAddress': { 'ipAddress': '::ffff:127.0.0.1', 'enable': true, '_id': '6060474f257fa2891c68dc5b' }, 'createdAt': '2021-03-28T09:07:35.932Z', 'updatedAt': '2021-03-28T11:28:03.796Z' }, { 'path': '/api/v1/request/1/10/@', 'epoch': 1616930845892, 'count': 10, '_id': '60604764257fa2891c68ecb7', 'ipAddress': { 'ipAddress': '::ffff:127.0.0.1', 'enable': true, '_id': '6060474f257fa2891c68dc5b' }, 'createdAt': '2021-03-28T09:07:48.768Z', 'updatedAt': '2021-03-28T11:28:12.172Z' }, { 'path': '/api/v1/request/1/25/@', 'epoch': 1616930845892, 'count': 0, '_id': '606065c5257fa2891c7df024', 'ipAddress': { 'ipAddress': '::ffff:127.0.0.1', 'enable': true, '_id': '6060474f257fa2891c68dc5b' }, 'createdAt': '2021-03-28T11:17:25.863Z', 'updatedAt': '2021-03-28T11:27:25.892Z' }], 'count': 8 } }),
}))


const Comp = () => {
    React.useEffect(() => {
        getData(1, 5, 'a').then(() => { })
    }, [])

    return (<div data-testid='test-id'>123av</div>)
}
const Comp1 = () => {
    React.useEffect(() => {
        getData(2, 3, '').then(() => { })
    }, [])

    return (<div data-testid='test-id'>123av</div>)
}
const Comp2 = () => {
    React.useEffect(() => {
        getData().then(() => { })
    }, [])

    return (<div data-testid='test-id'>123av</div>)
}

describe('client', () => {
    it('Provider 1', async (done: () => void) => {
        await act(async () => {
            render(<Provider><Comp /></Provider>)
        })
        await act(async () => {
            const winner = await screen.getByTestId('test-id')
            expect(winner).toBeInTheDocument()
            expect(winner).toHaveTextContent(/123av/i)
        })
        done()
    })
    it('Provider 2', async (done: () => void) => {
        await act(async () => {
            render(<Provider><Comp1 /></Provider>)
        })
        await act(async () => {
            const winner = await screen.getByTestId('test-id')
            expect(winner).toBeInTheDocument()
            expect(winner).toHaveTextContent(/123av/i)
        })
        done()
    })
    it('Provider 3', async (done: () => void) => {
        await act(async () => {
            render(<Provider><Comp2 /></Provider>)
        })
        await act(async () => {
            const winner = await screen.getByTestId('test-id')
            expect(winner).toBeInTheDocument()
            expect(winner).toHaveTextContent(/123av/i)
        })
        done()
    })
})