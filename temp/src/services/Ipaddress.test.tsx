import '@testing-library/jest-dom'
import React from 'react'
import { render, screen, act } from '@testing-library/react'
import Provider from '../hooks/context'
import { getData, patchData } from './ipaddress'

jest.mock('../hooks/AxiosHooks', () => ({
    get: () => Promise.resolve({ data: { 'data': [{ 'ipAddress': '::1', 'enable': true, '_id': '60603e6f257fa2891c62d941', 'createdAt': '2021-03-28T08:29:35.481Z', 'updatedAt': '2021-03-28T12:21:12.289Z' }, { 'ipAddress': '::ffff:127.0.0.1', 'enable': true, '_id': '6060474f257fa2891c68dc5b', 'createdAt': '2021-03-28T09:07:27.379Z', 'updatedAt': '2021-03-28T11:28:12.723Z' }], 'count': 2 } }),
    patch: () => Promise.resolve({ data: { 'data': [{ 'ipAddress': '::1', 'enable': true, '_id': '60603e6f257fa2891c62d941', 'createdAt': '2021-03-28T08:29:35.481Z', 'updatedAt': '2021-03-28T12:21:12.289Z' }, { 'ipAddress': '::ffff:127.0.0.1', 'enable': true, '_id': '6060474f257fa2891c68dc5b', 'createdAt': '2021-03-28T09:07:27.379Z', 'updatedAt': '2021-03-28T11:28:12.723Z' }], 'count': 2 } }),
}))


const Comp = () => {
    React.useEffect(() => {
        getData(1, 5, 'a').then(() => { })
        patchData({}, 1, 5, 'a').then(() => { })
    }, [])

    return (<div data-testid='test-id'>123av</div>)
}
const Comp1 = () => {
    React.useEffect(() => {
        getData(2, 3, '').then(() => { })
        patchData({}, 2, 3, '').then(() => { })
    }, [])

    return (<div data-testid='test-id'>123av</div>)
}
const Comp2 = () => {
    React.useEffect(() => {
        getData().then(() => { })
        patchData({}).then(() => { })
    }, [])

    return (<div data-testid='test-id'>123av</div>)
}

describe('ipaddressw', () => {
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