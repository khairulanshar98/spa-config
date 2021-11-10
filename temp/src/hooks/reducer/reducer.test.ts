import { reducers, ActionType } from './'
import { initialData } from '../store'
describe('test reducer', () => {
    it('test reducer', (done: () => void) => {
        expect(reducers({}, { type: undefined, data: {} })).toEqual({})
        done()
    })
    it('test SET_CSRF', (done: () => void) => {
        expect(reducers({ csrf: '' }, { type: ActionType.SET_CSRF, data: { csrf: '12as' } })).toEqual({ csrf: '12as' })
        done()
    })
    it('test SET_ERRORMSG', (done: () => void) => {
        expect(reducers({ errorMsg: '' }, { type: ActionType.SET_ERRORMSG, data: { errorMsg: 'error' } })).toEqual({ errorMsg: 'error' })
        done()
    })
    it('test CLEAR', (done: () => void) => {
        expect(reducers({}, { type: ActionType.CLEAR, data: {} })).toEqual(initialData)
        done()
    })
})