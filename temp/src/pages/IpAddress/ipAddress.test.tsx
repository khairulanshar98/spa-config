import '@testing-library/jest-dom'
import React from 'react'
import { render, screen, fireEvent, act } from '@testing-library/react'
import Provider, { useContext } from '../../hooks/context'
import { ActionType } from '../../hooks/reducer'
import IpAddress, { dateFormat } from './'

jest.mock('../../services/ipaddress', () => ({
    getData: () => Promise.resolve({ data: { 'data': [{ 'ipAddress': '::1', 'enable': true, '_id': '60603e6f257fa2891c62d941', 'createdAt': '2021-03-28T08:29:35.481Z', 'updatedAt': '2021-03-28T12:21:12.289Z' }, { 'ipAddress': '::ffff:127.0.0.1', 'enable': true, '_id': '6060474f257fa2891c68dc5b', 'createdAt': '2021-03-28T09:07:27.379Z', 'updatedAt': '2021-03-28T11:28:12.723Z' }, { 'ipAddress': '::1', 'enable': true, '_id': '60603e6f257fa2891c62d941', 'createdAt': '2021-03-28T08:29:35.481Z', 'updatedAt': '2021-03-28T12:21:12.289Z' }, { 'ipAddress': '::1', 'enable': true, '_id': '60603e6f257fa2891c62d941', 'createdAt': '2021-03-28T08:29:35.481Z', 'updatedAt': '2021-03-28T12:21:12.289Z' }, { 'ipAddress': '::1', 'enable': true, '_id': '60603e6f257fa2891c62d941', 'createdAt': '2021-03-28T08:29:35.481Z', 'updatedAt': '2021-03-28T12:21:12.289Z' },], 'count': 10 } }),
    patchData: () => Promise.resolve({ data: { 'data': [{ 'ipAddress': '::1', 'enable': true, '_id': '60603e6f257fa2891c62d941', 'createdAt': '2021-03-28T08:29:35.481Z', 'updatedAt': '2021-03-28T12:21:12.289Z' }, { 'ipAddress': '::ffff:127.0.0.1', 'enable': true, '_id': '6060474f257fa2891c68dc5b', 'createdAt': '2021-03-28T09:07:27.379Z', 'updatedAt': '2021-03-28T11:28:12.723Z' }], 'count': 2 } }),
}))
const Comp = () => {
    const [store, dispatch] = useContext()
    React.useEffect(() => {
        dispatch({ type: ActionType.SET_CSRF, data: { csrf: '123av', ip: 'foo' } })
    }, [])

    return (<div data-testid='test-id'><IpAddress /></div>)
}

describe('test context', () => {
    it('Provider', async (done: () => void) => {
        await act(async () => {
            render(<Provider><Comp /></Provider>)
        })
        await act(async () => {
            const search = await screen.getByTitle('search')
            fireEvent.click(search)
        })
        done()
    })
    it('switch', async (done: () => void) => {
        await act(async () => {
            render(<Provider><Comp /></Provider>)
        })
        await act(async () => {
            const switch0 = await screen.getByTestId('switch-0')
            fireEvent.change(switch0, { target: { checked: false } })
        })
        done()
    })
    it('checkbox', async (done: () => void) => {
        await act(async () => {
            render(<Provider><Comp /></Provider>)
        })
        await act(async () => {
            const mypIp = await screen.getByTestId('mypIp')
            fireEvent.click(mypIp)
        })
        await act(async () => {
            const mypIp = await screen.getByTestId('mypIp')
            fireEvent.click(mypIp)
        })
        done()
    })
    it('dropdown', async (done: () => void) => {
        await act(async () => {
            render(<Provider><Comp /></Provider>)
        })
        await act(async () => {
            const nextPage = await screen.getByTitle('Next page')
            fireEvent.click(nextPage)
        })
        done()
    })
    it('reset', async (done: () => void) => {
        await act(async () => {
            render(<Provider><Comp /></Provider>)
        })
        await act(async () => {
            const reset = await screen.getByTitle('reset')
            fireEvent.click(reset)
        })
        done()
    })
    it('Search IP Address', async (done: () => void) => {
        await act(async () => {
            render(<Provider><Comp /></Provider>)
        })
        await act(async () => {
            const searchText = await screen.getByPlaceholderText('Search IP Address')
            fireEvent.change(searchText, { target: { value: 'a' } })
        })
        done()
    })
    it('dateFormat', async (done: () => void) => {
        const date = dateFormat(new Date(1616922388027))
        expect(date).toEqual(expect.any(String))
        done()
    })
})