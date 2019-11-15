// @flow

import React, { type Node, type ElementType } from 'react'
import cx from 'classnames'

import Spinner from '$shared/components/Spinner'

import styles from './newButton.pcss'

export type Size = 'mini' | 'normal' | 'big'
export type Type = 'primary' | 'secondary' | 'destructive' | 'link' | 'special'
export type Variant = 'dark'

type Props = {
    className?: string,
    tag: ElementType,
    size?: Size,
    type?: Type,
    variant?: Variant,
    outline?: boolean,
    disabled?: boolean,
    waiting?: boolean,
    onClick?: (e: SyntheticInputEvent<EventTarget>) => void | Promise<void>,
    children?: Node,
}

const Button = ({
    className,
    tag: Tag,
    size,
    type,
    variant,
    outline,
    disabled,
    waiting,
    onClick,
    children,
    ...args
}: Props) => (
    <Tag
        className={
            cx(styles.root, {
                [styles.primary]: type === 'primary',
                [styles.secondary]: type === 'secondary',
                [styles.destructive]: type === 'destructive',
                [styles.link]: type === 'link',
                [styles.special]: type === 'special',
                [styles.mini]: size === 'mini',
                [styles.normal]: size === 'normal',
                [styles.big]: size === 'big',
                [styles.dark]: variant === 'dark',
                [styles.outline]: outline,
            }, className)
        }
        onClick={onClick}
        disabled={disabled || waiting}
        {...args}
        tabIndex={disabled ? -1 : 0}
    >
        {children}
        {waiting && (
            <React.Fragment>
                &nbsp;
                <Spinner color="white" />
            </React.Fragment>
        )}
    </Tag>
)

Button.defaultProps = {
    tag: 'button',
    type: 'primary',
    size: 'normal',
    outline: false,
    disabled: false,
    waiting: false,
}

export default Button