import assert from 'assert-diff'

import * as all from '$shared/modules/integrationKey/selectors'
import { integrationKeyServices } from '$shared/utils/constants'

const service1 = {
    id: '1',
    name: 'test 1',
    service: integrationKeyServices.ETHEREREUM_IDENTITY,
    json: {
        address: '0x13581255eE2D20e780B0cD3D07fac018241B5E03',
    },
}
const service2 = {
    id: '2',
    name: 'test 2',
    service: integrationKeyServices.ETHEREREUM_IDENTITY,
    json: {
        address: '0x7Ce38183F7851EE6eEB9547B1E537fB362C79C10',
    },
}
const service3 = {
    id: '3',
    name: 'test 3',
    service: integrationKeyServices.PRIVATE_KEY,
    json: {
        address: '0x876EabF441B2EE5B5b0554Fd502a8E0600950cFa',
    },
}
const state = {
    test: true,
    integrationKey: {
        ethereumIdentities: ['1', '2'],
        privateKeys: ['3'],
        fetchingIntegrationKeys: false,
        integrationKeysError: {
            message: 'error',
        },
    },
    entities: {
        integrationKeys: {
            '1': {
                ...service1,
            },
            '2': {
                ...service2,
            },
            '3': {
                ...service3,
            },
        },
    },
}

describe('integrationKey - selectors', () => {
    it('selects integration keys fetching status', () => {
        assert.deepStrictEqual(all.selectFetchingIntegrationKeys(state), false)
    })

    it('selects ethereum identity ids', () => {
        assert.deepStrictEqual(all.selectEthereumIdentityIds(state), state.integrationKey.ethereumIdentities)
    })

    it('selects ethereum identities', () => {
        assert.deepStrictEqual(all.selectEthereumIdentities(state), [service1, service2])
    })

    it('selects private key ids', () => {
        assert.deepStrictEqual(all.selectPrivateKeyIds(state), state.integrationKey.privateKeys)
    })

    it('select private keys', () => {
        assert.deepStrictEqual(all.selectPrivateKeys(state), [service3])
    })

    it('selects integration keys error', () => {
        assert.deepStrictEqual(all.selectIntegrationKeysError(state), state.integrationKey.integrationKeysError)
    })
})
