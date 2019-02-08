// @flow

import marketplaceAbi from './abis/marketplace'
import tokenAbi from './abis/token'
import type { Hash, Abi } from '$shared/flowtype/web3-types'

type ContractConfig = {
    abi: Abi,
    address: Hash,
}

type Config = {
    networkId: string,
    publicNodeAddress: string,
    websocketAddress: string,
    marketplace: ContractConfig,
    token: ContractConfig,
}

const getConfig = (): Config => ({
    networkId: process.env.WEB3_REQUIRED_NETWORK_ID || '',
    publicNodeAddress: process.env.WEB3_PUBLIC_HTTP_PROVIDER || '',
    websocketAddress: process.env.WEB3_PUBLIC_WS_PROVIDER || '',
    marketplace: {
        abi: marketplaceAbi,
        address: process.env.MARKETPLACE_CONTRACT_ADDRESS || '',
    },
    token: {
        abi: tokenAbi,
        address: process.env.TOKEN_CONTRACT_ADDRESS || '',
    },
})

export default getConfig
