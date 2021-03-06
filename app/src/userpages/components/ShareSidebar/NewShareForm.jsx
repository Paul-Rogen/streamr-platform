import React, { useState, useCallback } from 'react'
import styled from 'styled-components'
import { I18n } from 'react-redux-i18n'
import useUniqueId from '$shared/hooks/useUniqueId'
import Button from '$shared/components/Button'
import SvgIcon from '$shared/components/SvgIcon'
import canShareToUserId from '$shared/utils/sharing/canShareToUserId'
import isValidUserId from '$shared/utils/sharing/isValidUserId'
import Label from '$ui/Label'
import Text from '$ui/Text'
import Errors from '$ui/Errors'

const Inner = styled.div`
    display: grid;
    grid-column-gap: 16px;
    grid-template-columns: 1fr auto;
`

const UnstyledNewShareForm = ({ className, onAdd }) => {
    const [value, setValue] = useState('')

    const [focused, setFocused] = useState(false)

    const [showErrorsImmediately, setShowErrorsImmediately] = useState(false)

    const validationError = (() => {
        if (!isValidUserId(value)) { return I18n.t('share.error.invalidUserError') }
        if (value === 'anonymous') { return I18n.t('share.error.anonymousUserError') }
    })()

    const onSubmit = useCallback((e) => {
        e.preventDefault()

        if (validationError) {
            return
        }

        if (typeof onAdd === 'function') {
            onAdd(value)
        }

        setValue('')
    }, [value, validationError, onAdd])

    const onChange = useCallback((e) => {
        setValue(e.target.value)
        setShowErrorsImmediately(false)
    }, [])

    const onFocus = useCallback(() => {
        setFocused(true)
    }, [])

    const onBlur = useCallback(() => {
        setFocused(false)
        setShowErrorsImmediately(false)
    }, [])

    const onKeyDown = useCallback(({ key }) => {
        if (key === 'Enter' && validationError) {
            // Invalid values prevent Enter key from submitting the form. That's why the following
            // is here and not in `onSubmit`.
            setShowErrorsImmediately(true)
        }
    }, [validationError])

    const isValid = canShareToUserId(value)

    const uid = useUniqueId('InputNewShare')

    const showValidationError = (showErrorsImmediately || (!focused && !!value)) && !!validationError

    return (
        <form className={className} onSubmit={onSubmit}>
            <Label htmlFor={uid}>
                {I18n.t('auth.labels.address')}
            </Label>
            <Inner>
                <Text
                    autoComplete="email"
                    id={uid}
                    invalid={showValidationError}
                    onBlur={onBlur}
                    onChange={onChange}
                    onFocus={onFocus}
                    onKeyDown={onKeyDown}
                    placeholder={I18n.t('modal.shareResource.enterEmailAddress')}
                    value={value}
                />
                <Button
                    disabled={!isValid}
                    kind="secondary"
                    type="submit"
                >
                    <SvgIcon name="plus" />
                </Button>
                {showValidationError && (
                    <Errors>{validationError}</Errors>
                )}
            </Inner>
        </form>
    )
}

const NewShareForm = styled(UnstyledNewShareForm)`
    input {
        background-color: #fdfdfd;
        font-size: 14px;
        line-height: normal;
    }

    button {
        height: 40px;
        padding: 0;
        width: 40px;
    }

    svg {
        display: block;
        height: 16px;
        width: 16px;
    }
`

export default NewShareForm
