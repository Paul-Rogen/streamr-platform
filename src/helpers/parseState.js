// @flow

import type { DashboardState } from '../flowtype/states/dashboard-state'
import type { Dashboard } from '../flowtype/dashboard-types'

export const parseDashboard = ({ dashboard: { byId, openDashboard } }: {dashboard: DashboardState}): {
    dashboard: ?Dashboard,
    canShare: boolean,
    canWrite: boolean
} => {
    const db = openDashboard.id ? byId[openDashboard.id] : null
    return {
        dashboard: db,
        canShare: !!db && db.new !== true && (db.ownPermissions || []).includes('share'),
        canWrite: !!(db && db.new === true) || ((db && db.ownPermissions) ? db.ownPermissions : []).includes('write'),
    }
}
