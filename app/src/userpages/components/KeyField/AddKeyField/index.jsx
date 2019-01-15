// @flow

import React from 'react'
import { Button } from 'reactstrap'

import KeyFieldEditor from '../KeyFieldEditor'

type Props = {
    label: string,
    createWithValue?: boolean,
    onSave: (keyName: string, value: string) => Promise<void>,
}

type State = {
    editing: boolean,
    waiting: boolean,
    error: ?string,
}

class AddKeyField extends React.Component<Props, State> {
    state = {
        editing: false,
        waiting: false,
        error: undefined,
    }

    componentWillUnmount() {
        this.unmounted = true
    }

    unmounted: boolean = false

    onEdit = (e: SyntheticInputEvent<EventTarget>) => {
        e.preventDefault()
        this.setState({
            editing: true,
        })
    }

    onCancel = () => {
        this.setState({
            editing: false,
            waiting: false,
        })
    }

    onSave = (keyName: string, value: string) => {
        this.setState({
            waiting: true,
            error: null,
        }, () => {
            this.props.onSave(keyName, value)
                .then(() => {
                    if (!this.unmounted) {
                        this.setState({
                            editing: false,
                            waiting: false,
                        })
                    }
                }, (error) => {
                    if (!this.unmounted) {
                        this.setState({
                            waiting: false,
                            error: error.message,
                        })
                    }
                })
        })
    }

    render = () => {
        const { editing, waiting, error } = this.state
        const { label, createWithValue } = this.props
        return !editing ? (
            <Button type="button" onClick={this.onEdit}>{label}</Button>
        ) : (
            <KeyFieldEditor
                createNew
                onCancel={this.onCancel}
                onSave={this.onSave}
                editValue={createWithValue}
                waiting={waiting}
                error={error}
            />
        )
    }
}

export default AddKeyField
