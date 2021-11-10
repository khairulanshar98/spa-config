import '@testing-library/jest-dom'
import React from 'react'
import { render, screen, fireEvent, act } from '@testing-library/react'
import Provider, { useContext } from '../../hooks/context'
import { ActionType } from '../../hooks/reducer'
import IpAddress from '.'

jest.mock('../../services/ipaddress', () => ({
    getData: () => Promise.resolve({ data: {} }),
}))
const Comp = () => {
    const [store, dispatch] = useContext()
    React.useEffect(() => {
        dispatch({ type: ActionType.SET_CSRF, data: { csrf: '123av' } })
    }, [])

    return (<div data-testid='test-id'><IpAddress /></div>)
}

describe('test context', () => {
    it('Provider', async (done: () => void) => {
        await act(async () => {
            render(<Provider><Comp /></Provider>)
        })
        await act(async () => {
            const searchText = await screen.getByPlaceholderText('Search IP Address')
            fireEvent.change(searchText, { target: { value: 'a' } })
        })
        done()
    })
})