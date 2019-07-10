import React, { useMemo, useCallback } from 'react'
import moment from 'moment'

import { useQuery, useSubscription } from 'react-apollo-hooks'
import { Grid, Paper } from '@material-ui/core'
import {
  SectionHeader,
  Button,
  LoadingPlaceholder,
  ErrorPlaceholder,
  NotFoundPlaceholder,
  ExpandablePanel,
} from '~components'
import { TestRunStatus as Status } from '~config/constants'

import { getUrl } from '~utils/router'
import routes from '~config/routes'

import { ExecutionActionsMenu } from '../components'
import { MonitoringLineChart, MonitoringHeatmapChart } from './components'
import { StatusGraph } from '../Details/components'
import { getDataForChart } from './module.js'
import {
  SUBSCRIBE_TO_EXECUTION_WITH_MONITORING_DATA,
  GET_METRICS_DATA,
} from './graphql'
import useStyles from './Monitoring.styles'
import { TestConfigurationDetails } from '~pages/TestConfigurations/Details/components'

function Monitoring({ match, history, location }) {
  const { executionId } = match.params
  const { configurationId } = match.params

  const classes = useStyles()

  const { data: { execution } = {}, loading, error } = useSubscription(
    SUBSCRIBE_TO_EXECUTION_WITH_MONITORING_DATA,
    {
      variables: { executionId },
    }
  )

  const pollInterval = [Status.RUNNING, Status.PENDING, Status.MONITORING].includes(
    execution && execution.status
  )
    ? 5000
    : null

  const { data: { monitoring = {} } = {} } = useQuery(GET_METRICS_DATA, {
    fetchPolicy: 'cache-and-network',
    variables: { executionId },
    pollInterval,
  })

  const chartsWithData = useMemo(() => {
    if (
      !execution ||
      !execution.execution_metrics_metadata ||
      !monitoring ||
      !monitoring.metrics_data ||
      monitoring.metrics_data.length === 0
    ) {
      return []
    }

    const charts = execution.execution_metrics_metadata[0].chart_configuration.charts
    const monitoringData = monitoring.metrics_data

    return charts.map(chartConfig => ({
      chartConfig,
      ...getDataForChart(chartConfig, monitoringData),
    }))
  }, [execution, monitoring])

  const getTestDetailsUrl = useCallback(() => {
    return getUrl(routes.projects.configurations.executions.details, {
      ...match.params,
    })
  }, [match.params])

  return (
    <div>
      <SectionHeader
        title={`Monitoring for Test Run ${
          execution
            ? moment(execution.start_locust || execution.start).format(
                'YYYY-MM-DD HH:mm:ss'
              )
            : ''
        }`}
        marginBottom
      >
        {execution && execution.configuration.has_load_tests && (
          <Button href={getTestDetailsUrl()}>Test details</Button>
        )}
        {execution && <ExecutionActionsMenu execution={execution} />}
      </SectionHeader>

      <div className={classes.configDetails}>
        <ExpandablePanel defaultExpanded={false} title="Scenario Details">
          <TestConfigurationDetails configurationId={configurationId} />
        </ExpandablePanel>
      </div>

      {loading || error || !execution ? (
        <div>
          {loading ? (
            <LoadingPlaceholder title="Loading monitoring results..." />
          ) : error ? (
            <ErrorPlaceholder error={error} />
          ) : !execution ? (
            <NotFoundPlaceholder title="Test run not found" />
          ) : (
            <LoadingPlaceholder title="Waiting for results..." />
          )}
        </div>
      ) : (
        <Grid container spacing={2}>
          <StatusGraph
            executionStatus={execution.status}
            executionId={executionId}
            configurationId={configurationId}
          />

          {chartsWithData.length === 0 ? (
            <Grid item xs={12}>
              <Paper>
                <LoadingPlaceholder title="Waiting for results..." />
              </Paper>
            </Grid>
          ) : (
            chartsWithData.map(({ groupNames, chartConfig, data }, index) => {
              return (
                <Grid item xs={12} md={6} key={`chart-${index}`}>
                  <Paper square className={classes.tile}>
                    {chartConfig.type === 'heatmap' ? (
                      <MonitoringHeatmapChart
                        data={data}
                        config={chartConfig}
                        groupNames={groupNames}
                      />
                    ) : (
                      <MonitoringLineChart
                        data={data}
                        config={chartConfig}
                        groupNames={groupNames}
                      />
                    )}
                  </Paper>
                </Grid>
              )
            })
          )}
        </Grid>
      )}
    </div>
  )
}

export default Monitoring
