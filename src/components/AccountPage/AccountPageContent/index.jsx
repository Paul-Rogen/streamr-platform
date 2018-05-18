// @flow

import React, { type Node } from 'react'
import { Container } from '@streamr/streamr-layout'

import styles from './accountPageContent.pcss'

type Props = {
    children: Node
}

const AccountPageContent = ({ children }: Props) => (
    <div className={styles.accountPageContent}>
        <Container>
            {children}
        </Container>
    </div>
)

export default AccountPageContent
