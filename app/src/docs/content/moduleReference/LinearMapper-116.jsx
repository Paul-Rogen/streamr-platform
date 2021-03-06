/* eslint-disable max-len */
import moduleDescription from './LinearMapper-116.md'

export default {
    id: 116,
    name: 'LinearMapper',
    path: 'Time Series: Simple Math',
    help: {
        outputNames: [],
        inputs: {},
        helpText: moduleDescription,
        inputNames: [],
        params: {},
        outputs: {},
        paramNames: [],
    },
    inputs: [
        {
            id: 'ep_6N8sPpn9Sg2OL5ERuiMrPw',
            name: 'in',
            longName: 'LinearMapper.in',
            type: 'Double',
            connected: false,
            canConnect: true,
            export: false,
            drivingInput: true,
            canToggleDrivingInput: true,
            acceptedTypes: [
                'Double',
            ],
            requiresConnection: true,
            canHaveInitialValue: true,
            initialValue: null,
        },
    ],
    outputs: [
        {
            id: 'ep_P2xldNxYRRquBlMEjFHl6Q',
            name: 'out',
            longName: 'LinearMapper.out',
            type: 'Double',
            connected: false,
            canConnect: true,
            export: false,
            noRepeat: false,
            canBeNoRepeat: true,
        },
    ],
    params: [
        {
            id: 'ep_E4E8L9DmS1a6e1EVphWTqg',
            name: 'xMin',
            longName: 'LinearMapper.xMin',
            type: 'Double',
            connected: false,
            canConnect: true,
            export: false,
            value: 0,
            drivingInput: false,
            canToggleDrivingInput: true,
            acceptedTypes: [
                'Double',
            ],
            requiresConnection: false,
            defaultValue: 0,
        },
        {
            id: 'ep_vmPFeoskQuas4OCzSDD07A',
            name: 'xMax',
            longName: 'LinearMapper.xMax',
            type: 'Double',
            connected: false,
            canConnect: true,
            export: false,
            value: 1,
            drivingInput: false,
            canToggleDrivingInput: true,
            acceptedTypes: [
                'Double',
            ],
            requiresConnection: false,
            defaultValue: 1,
        },
        {
            id: 'ep_OJDeZ_8wQmutba2jj0tpWQ',
            name: 'yMin',
            longName: 'LinearMapper.yMin',
            type: 'Double',
            connected: false,
            canConnect: true,
            export: false,
            value: 0,
            drivingInput: false,
            canToggleDrivingInput: true,
            acceptedTypes: [
                'Double',
            ],
            requiresConnection: false,
            defaultValue: 0,
        },
        {
            id: 'ep_jIW5U_cqQoCRBLXmgSlwgA',
            name: 'yMax',
            longName: 'LinearMapper.yMax',
            type: 'Double',
            connected: false,
            canConnect: true,
            export: false,
            value: 100,
            drivingInput: false,
            canToggleDrivingInput: true,
            acceptedTypes: [
                'Double',
            ],
            requiresConnection: false,
            defaultValue: 100,
        },
    ],
}
