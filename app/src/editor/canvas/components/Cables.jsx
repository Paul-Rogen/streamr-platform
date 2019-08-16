/* eslint-disable react/no-unused-state */
import React, { useEffect, useState, useContext } from 'react'
import cx from 'classnames'
import { getModulePorts, isConnectedToModule } from '../state'
import styles from './Canvas.pcss'
import { DragDropContext } from './DragDropContext'

function curvedHorizontal(x1, y1, x2, y2) {
    const STEEPNESS = 1
    const line = []
    const mx = ((x2 - x1) / 2) * STEEPNESS

    line.push('M', x1, y1)
    line.push('C', x1 + mx, y1, x2 - mx, y2, x2, y2)

    return line.join(' ')
}

const LAYER_0 = 0
const LAYER_1 = 1

// offset cables from edge of port
const PORT_OFFSET = 4

export function Cable({ className, cable, ...props }) {
    if (!cable) { return null }
    const [from, to] = cable
    return (
        <path
            className={cx(styles.Connection, className)}
            d={curvedHorizontal(
                from.left + PORT_OFFSET,
                from.top,
                to.left - PORT_OFFSET,
                to.top,
            )}
            stroke="#525252"
            fill="none"
            strokeWidth="1"
            {...props}
        />
    )
}

export function getCableKey([from, to] = []) {
    return `${from && from.id}-${to && to.id}`
}

const DRAG_CABLE_ID = 'DRAG_CABLE_ID'

class Cables extends React.PureComponent {
    el = React.createRef()

    state = {}

    shouldFade = ([a, b]) => {
        const { canvas, selectedModuleHash } = this.props
        // no fade if no selection
        if (selectedModuleHash == null) { return false }
        // no fade if dragging cable
        if (a.id === DRAG_CABLE_ID || b.id === DRAG_CABLE_ID) { return false }
        // fade if not connected to selection
        return !isConnectedToModule(canvas, selectedModuleHash, a.id, b.id)
    }

    shouldHighlight = ([a, b]) => {
        const { selectedModuleHash } = this.props
        // no highlight if no selection
        if (selectedModuleHash == null) { return false }
        // no highlight if dragging cable
        if (a.id === DRAG_CABLE_ID || b.id === DRAG_CABLE_ID) { return false }
        return !this.shouldFade([a, b])
    }

    getCables() {
        const hasMoved = this.props.isDragging && !(this.props.diff.x === 0 && this.props.diff.y === 0)
        if (this.props.isDragging && this.props.data.moduleHash != null && hasMoved) {
            return this.getCablesDraggingModule()
        }

        if (this.props.isDragging && this.props.data.portId != null && hasMoved) {
            return this.getCablesDraggingPort()
        }

        return this.getStaticCables()
    }

    getPositions() {
        // cache positions while drag operation is in progress
        if (this.props.isDragging) {
            if (!this.positions) {
                this.positions = this.props.positions
            }
            return this.positions
        }
        if (this.positions) {
            this.positions = undefined
        }
        return this.props.positions
    }

    /**
     * Get static cable positions according to connections & supplied port positions.
     */

    getStaticCables() {
        const { canvas } = this.props
        const positions = this.getPositions()
        return canvas.modules
            .reduce((c, m) => {
                [].concat(m.params, m.inputs, m.outputs).forEach((port) => {
                    if (!port.connected) { return }
                    c.push([port.sourceId, port.id])
                })
                return c
            }, [])
            .map(([from, to]) => [positions[from], positions[to]])
            .filter(([from, to]) => from && to)
    }

    /**
     * Cable config when dragging a module
     */

    getCablesDraggingModule() {
        const { canvas, diff, data, isDragging } = this.props
        if (!isDragging) {
            return this.getStaticCables()
        }

        const { moduleHash } = data

        const ports = getModulePorts(canvas, moduleHash)
        return this.getStaticCables().map(([from, to]) => {
            // update the positions of ports in dragged module
            let fromNew = from
            let toNew = to
            let layer = LAYER_0
            if (ports[from.id]) {
                fromNew = {
                    id: from.id,
                    top: from.top + diff.y,
                    left: from.left + diff.x,
                }
                layer = LAYER_1
            }
            if (ports[to.id]) {
                toNew = {
                    id: to.id,
                    top: to.top + diff.y,
                    left: to.left + diff.x,
                }
                layer = LAYER_1
            }
            return [fromNew, toNew, layer]
        })
    }

    /**
     * Cable config when dragging a port
     */

    getCablesDraggingPort() {
        const { data, isDragging } = this.props
        if (!isDragging) {
            return this.getStaticCables()
        }

        const { portId, sourceId } = data

        const cables = this.getStaticCables().filter(([from, to]) => {
            // remove currently dragged cable
            if (sourceId) {
                return !(from.id === sourceId && to.id === portId)
            }
            return true
        })

        return [
            ...cables,
            this.getDragCable(), // append dragging cable
        ].filter(Boolean)
    }

    getDragCable() {
        const { data, diff, isDragging } = this.props
        const positions = this.getPositions()
        const { portId, sourceId } = data
        if (!isDragging || portId == null) {
            return null
        }

        // add new dynamic cable for drag operation
        const p = positions[portId]
        if (!p) { return null } // ignore if no position e.g. variadic removed
        return [
            positions[sourceId || portId],
            {
                id: DRAG_CABLE_ID,
                top: p.top + diff.y,
                left: p.left + diff.x,
                bottom: p.bottom + diff.y,
                right: p.right + diff.x,
            },
            LAYER_1, // drag cable goes on layer 1
        ]
    }

    render() {
        const cables = this.getCables()
        const layer0 = cables.filter(([, , layer]) => !layer)
        const layer1 = cables.filter(([, , layer]) => layer === LAYER_1)
        return (
            <React.Fragment>
                <svg
                    className={cx(styles.Cables, styles.layer0)}
                    preserveAspectRatio="xMidYMid meet"
                    height="100%"
                    width="100%"
                >
                    {layer0.filter(Boolean).map((cable) => (
                        <Cable
                            key={getCableKey(cable)}
                            cable={cable}
                            className={cx({
                                [styles.fade]: this.shouldFade(cable),
                                [styles.highlight]: this.shouldHighlight(cable),
                            })}
                        />
                    ))}
                </svg>
                <svg
                    className={cx(styles.Cables, styles.layer1)}
                    preserveAspectRatio="xMidYMid meet"
                    height="100%"
                    width="100%"
                >
                    {layer1.filter(Boolean).map((cable) => (
                        <Cable
                            key={getCableKey(cable)}
                            cable={cable}
                            className={cx({
                                [styles.fade]: this.shouldFade(cable),
                                [styles.highlight]: this.shouldHighlight(cable),
                            })}
                        />
                    ))}
                </svg>
            </React.Fragment>
        )
    }
}

export default function CablesContainer(props) {
    const dragDrop = useContext(DragDropContext)
    const [diff, setDiff] = useState(dragDrop.getDiff())
    const { onMove, offMove, isDragging, data } = dragDrop
    useEffect(() => {
        onMove(setDiff)
        return () => {
            offMove(setDiff)
        }
    }, [onMove, offMove, setDiff])

    useEffect(() => {
        if (isDragging) { return }
        // reset
        setDiff({
            x: 0,
            y: 0,
        })
    }, [isDragging])

    return (
        <Cables
            isDragging={isDragging}
            data={data}
            diff={diff}
            {...props}
        />
    )
}
