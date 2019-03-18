import React from 'react'

import { Link } from 'react-router-dom'
import { IconButton } from '@material-ui/core'
import { Pageview } from '@material-ui/icons'

import { DataTable } from '~components'

export function ExecutionsTable({ executions, loading, getDetailsRoute }) {
  return (
    <DataTable data={executions} isLoading={loading} rowKey={test => test.id}>
      <DataTable.Column key="runDate" render={test => test.start} title="Run Date" />
      <DataTable.Column key="status" render={test => test.status} title="Status" />
      <DataTable.Column
        key="type"
        render={test => test.configuration.configuration_type.name}
        title="Type"
      />
      <DataTable.Column
        key="config"
        render={test => test.configuration.name}
        title="Configuration"
      />
      <DataTable.Column
        key="total"
        render={test =>
          test.result_aggregate_aggregate.aggregate.sum.number_of_fails ||
          0 + test.result_aggregate_aggregate.aggregate.sum.number_of_successes ||
          0
        }
        title="Total"
      />
      <DataTable.Column
        key="passed"
        render={test =>
          test.result_aggregate_aggregate.aggregate.sum.number_of_successes || 0
        }
        title="Passed"
      />
      <DataTable.Column
        key="fails"
        render={test =>
          test.result_aggregate_aggregate.aggregate.sum.number_of_fails || 0
        }
        title="Fails"
      />
      <DataTable.Column
        key="actions"
        render={execution => (
          <div>
            <IconButton
              aria-label="Show details"
              component={Link}
              to={getDetailsRoute(execution)}
            >
              <Pageview />
            </IconButton>
          </div>
        )}
        title="Actions"
      />
    </DataTable>
  )
}

export default ExecutionsTable
