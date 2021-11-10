import '@testing-library/jest-dom'
import React from 'react'
import { render, screen, act } from '@testing-library/react'
import Provider, { useContext, dispatcher, useHook } from './index'
import { ActionType } from '../reducer'

const Comp = () => {
    const [store, dispatch] = useContext()
    React.useEffect(() => {
        useHook.dispatch({ type: ActionType.SET_CSRF, data: { csrf: '123av' } })
        dispatch({ type: ActionType.SET_CSRF, data: { csrf: '123av' } })
    }, [])

    return (<div data-testid='test-id'>{store.csrf}</div>)
}

describe('test context', () => {
    it('Provider', async (done: () => void) => {
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
    it('dispatcher', (done: () => void) => {
        expect(dispatcher()).toBeUndefined()
        done()
    })
})