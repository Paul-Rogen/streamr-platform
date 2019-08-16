// @flow

import { useMemo, useCallback, useContext } from 'react'

import { Context as UndoContext } from '$shared/components/UndoContextProvider'
import { Context as ValidationContext } from './ValidationContextProvider'
import useProductUpdater from '../ProductController/useProductUpdater'

import type { Product } from '$mp/flowtype/product-types'
import type { StreamIdList } from '$shared/flowtype/stream-types'

export function useProductActions() {
    const { updateProduct: commit } = useProductUpdater()
    const { undo } = useContext(UndoContext)
    const { touch } = useContext(ValidationContext)

    const updateProduct = useCallback((product: Object, msg: string = 'Update product') => {
        commit(msg, (p) => ({
            ...p,
            ...product,
        }))
    }, [commit])
    const updateName = useCallback((name: $ElementType<Product, 'name'>) => {
        commit('Update name', (p) => ({
            ...p,
            name,
        }))
        touch('name')
    }, [commit, touch])
    const updateDescription = useCallback((description: $ElementType<Product, 'description'>) => {
        commit('Update description', (p) => ({
            ...p,
            description,
        }))
        touch('description')
    }, [commit, touch])
    const updateImageUrl = useCallback((image: File | $ElementType<Product, 'imageUrl'>) => {
        commit('Update image url', (p) => ({
            ...p,
            imageUrl: image,
        }))
        touch('coverImage')
    }, [commit, touch])
    const updateStreams = useCallback((streams: StreamIdList) => {
        commit('Update streams', (p) => ({
            ...p,
            streams,
        }))
        touch('streams')
    }, [commit, touch])
    const updateCategory = useCallback((category: $ElementType<Product, 'category'>) => {
        commit('Update category', (p) => ({
            ...p,
            category,
        }))
        touch('details')
    }, [commit, touch])
    const updateAdminFee = useCallback((adminFee: number) => {
        commit('Update admin fee', (p) => ({
            ...p,
            adminFee,
        }))
        touch('details')
    }, [commit, touch])
    const updatePricePerSecond = useCallback((pricePerSecond: $ElementType<Product, 'pricePerSecond'>) => {
        commit('Update price per second', (p) => ({
            ...p,
            pricePerSecond,
        }))
    }, [commit])
    const updatePriceCurrency = useCallback((priceCurrency: $ElementType<Product, 'priceCurrency'>) => {
        commit('Update price currency', (p) => ({
            ...p,
            priceCurrency,
        }))
        touch('price')
    }, [commit, touch])
    const updateBeneficiaryAddress = useCallback((beneficiaryAddress: $ElementType<Product, 'beneficiaryAddress'>) => {
        commit('Update beneficiary address', (p) => ({
            ...p,
            beneficiaryAddress,
        }))
        touch('beneficiaryAddress')
    }, [commit, touch])
    const updateType = useCallback((type: $ElementType<Product, 'type'>) => {
        commit('Update type', (p) => ({
            ...p,
            type,
        }))
        touch('type')
    }, [commit, touch])

    return useMemo(() => ({
        undo,
        updateProduct,
        updateName,
        updateDescription,
        updateImageUrl,
        updateStreams,
        updateCategory,
        updateAdminFee,
        updatePricePerSecond,
        updatePriceCurrency,
        updateBeneficiaryAddress,
        updateType,
    }), [
        undo,
        updateProduct,
        updateName,
        updateDescription,
        updateImageUrl,
        updateStreams,
        updateCategory,
        updateAdminFee,
        updatePricePerSecond,
        updatePriceCurrency,
        updateBeneficiaryAddress,
        updateType,
    ])
}

export default useProductActions