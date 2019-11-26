// @flow

import React, { useEffect, useCallback, useContext } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { I18n } from 'react-redux-i18n'
import { Helmet } from 'react-helmet'
import { withRouter } from 'react-router-dom'

import Layout from '$shared/components/Layout'
import type { ProductId, CommunityId } from '$mp/flowtype/product-types'
import * as RouterContext from '$shared/contexts/Router'
import ProductController, { useController } from '../ProductController'
import usePending from '$shared/hooks/usePending'

import { getProductSubscription } from '$mp/modules/product/actions'
import LoadingIndicator from '$userpages/components/LoadingIndicator'
import { Provider as ModalProvider } from '$shared/contexts/ModalApi'

import { getRelatedProducts } from '../../modules/relatedProducts/actions'
import PurchaseModal from './PurchaseModal'
import useProduct from '$mp/containers/ProductController/useProduct'
import { selectUserData } from '$shared/modules/user/selectors'

import Page from './Page'
import styles from './page.pcss'

const ProductPage = () => {
    const dispatch = useDispatch()
    const { loadContractProductSubscription, loadCategories, loadProductStreams, loadCommunityProduct } = useController()
    const product = useProduct()
    const userData = useSelector(selectUserData)
    const isLoggedIn = userData !== null

    const { match } = useContext(RouterContext.Context)

    const loadProduct = useCallback(async (id: ProductId) => {
        dispatch(getRelatedProducts(id))
        loadContractProductSubscription(id)
        loadCategories()
        loadProductStreams(id)
        if (isLoggedIn) {
            dispatch(getProductSubscription(id))
        }
    }, [dispatch, isLoggedIn, loadContractProductSubscription, loadCategories, loadProductStreams])

    const loadCommunity = useCallback(async (id: CommunityId) => {
        loadCommunityProduct(id)
    }, [loadCommunityProduct])

    useEffect(() => {
        loadProduct(match.params.id)
    }, [loadProduct, match.params.id])

    const { communityDeployed, beneficiaryAddress } = product

    useEffect(() => {
        if (communityDeployed && beneficiaryAddress) {
            loadCommunity(beneficiaryAddress)
        }
    }, [communityDeployed, beneficiaryAddress, loadCommunity])

    return (
        <Layout navShadow>
            <Helmet title={`${product.name} | ${I18n.t('general.title.suffix')}`} />
            <Page />
            <PurchaseModal />
        </Layout>
    )
}

const LoadingView = () => (
    <Layout>
        <LoadingIndicator loading className={styles.loadingIndicator} />
    </Layout>
)

const EditWrap = () => {
    const product = useProduct()
    const { isPending: loadPending } = usePending('product.LOAD')
    const { isPending: permissionsPending } = usePending('product.PERMISSIONS')

    if (!product || loadPending || permissionsPending) {
        return <LoadingView />
    }

    const key = (!!product && product.id) || ''

    return (
        <ModalProvider key={key}>
            <ProductPage
                product={product}
            />
        </ModalProvider>
    )
}

const ProductContainer = withRouter((props) => (
    <ProductController key={props.match.params.id}>
        <EditWrap />
    </ProductController>
))

export default () => (
    <ProductContainer />
)
