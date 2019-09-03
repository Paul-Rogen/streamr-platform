// @flow

import React, { useMemo } from 'react'
import { useSelector } from 'react-redux'
import useProduct from '../ProductController/useProduct'
import { selectStreams } from '$mp/modules/streams/selectors'

import ProductPage from '$mp/containers/ProductPage2/Page'

const Preview = () => {
    const product = useProduct()
    const streamIds = product.streams
    const streams = useSelector(selectStreams) // todo: safe to assume streams are fetched?

    const selectedStreams = useMemo(() => streams.filter((s) => streamIds.includes(s.id)), [streamIds, streams])

    return (
        <ProductPage
            product={product}
            streams={selectedStreams}
            relatedProducts={[]}
        />
    )
}

export default Preview