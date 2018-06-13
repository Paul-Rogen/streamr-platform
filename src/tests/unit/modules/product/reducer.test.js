import assert from 'assert-diff'

import reducer, { initialState } from '../../../../modules/product/reducer'
import * as constants from '../../../../modules/product/constants'

describe('product - reducer', () => {
    it('has initial state', () => {
        assert.deepEqual(reducer(undefined, {}), initialState)
    })

    describe('getProductById', () => {
        it('handles request', () => {
            const expectedState = {
                ...initialState,
                id: 1,
                fetchingProduct: true,
            }

            assert.deepEqual(reducer(undefined, {
                type: constants.GET_PRODUCT_BY_ID_REQUEST,
                payload: {
                    id: 1,
                },
            }), expectedState)
        })

        it('handles success', () => {
            const expectedState = {
                ...initialState,
                fetchingProduct: false,
            }

            assert.deepEqual(reducer(undefined, {
                type: constants.GET_PRODUCT_BY_ID_SUCCESS,
            }), expectedState)
        })

        it('handles failure', () => {
            const error = new Error('Test')

            const expectedState = {
                ...initialState,
                fetchingProduct: false,
                productError: {},
            }

            assert.deepEqual(reducer(undefined, {
                type: constants.GET_PRODUCT_BY_ID_FAILURE,
                payload: {
                    error,
                },
            }), expectedState)
        })
    })

    describe('getStreamsByProductId', () => {
        it('handles request', () => {
            const expectedState = {
                ...initialState,
                fetchingStreams: true,
                streamsError: null,
                streams: [],
            }

            assert.deepEqual(reducer(undefined, {
                type: constants.GET_STREAMS_BY_PRODUCT_ID_REQUEST,
            }), expectedState)
        })

        it('handles success', () => {
            const streams = [
                {
                    id: 1,
                    name: 'Test 1',
                },
            ]
            const expectedState = {
                ...initialState,
                fetchingStreams: false,
                streamsError: null,
                streams,
            }

            assert.deepEqual(reducer(undefined, {
                type: constants.GET_STREAMS_BY_PRODUCT_ID_SUCCESS,
                payload: {
                    streams,
                },
            }), expectedState)
        })

        it('handles failure', () => {
            const error = new Error('Test')

            const expectedState = {
                ...initialState,
                fetchingStreams: false,
                streamsError: {},
            }

            assert.deepEqual(reducer(undefined, {
                type: constants.GET_STREAMS_BY_PRODUCT_ID_FAILURE,
                payload: {
                    error,
                },
            }), expectedState)
        })
    })

    describe('getProductSubscriptionFromContract', () => {
        it('handles request', () => {
            const expectedState = {
                ...initialState,
                fetchingContractSubscription: true,
            }

            assert.deepEqual(reducer(undefined, {
                type: constants.GET_PRODUCT_SUBSCRIPTION_FROM_CONTRACT_REQUEST,
            }), expectedState)
        })

        it('handles success', () => {
            const subscription = {
                id: 1,
                name: 'Test 1',
            }
            const expectedState = {
                ...initialState,
                fetchingContractSubscription: false,
                contractSubscription: subscription,
            }

            assert.deepEqual(reducer(undefined, {
                type: constants.GET_PRODUCT_SUBSCRIPTION_FROM_CONTRACT_SUCCESS,
                payload: {
                    subscription,
                },
            }), expectedState)
        })

        it('handles failure', () => {
            const error = new Error('Test')

            const expectedState = {
                ...initialState,
                fetchingContractSubscription: false,
                contractSubscription: null,
                contractSubscriptionError: {},
            }

            assert.deepEqual(reducer(undefined, {
                type: constants.GET_PRODUCT_SUBSCRIPTION_FROM_CONTRACT_FAILURE,
                payload: {
                    error,
                },
            }), expectedState)
        })
    })
})
