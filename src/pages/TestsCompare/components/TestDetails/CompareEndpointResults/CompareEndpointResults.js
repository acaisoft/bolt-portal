import React from 'react'
import { Grid, Paper } from '@material-ui/core'
import { useResultsPerEndpointQuery } from 'hooks'
import {
  SectionHeader,
  LoadingPlaceholder,
  ErrorPlaceholder,
  ResultsPerEndpointChart,
  RequestsPerSecondChart,
} from 'components'
import { Chart } from 'config/constants'
import CompareResponsesTable from './CompareResponsesTable'
import CompareResponsesSummary from './CompareResponsesSummary'

function CompareEndpointResults({ classes, execution, getEndpointDetailsUrl }) {
  const { resultsPerEndpoint, loading, error } = useResultsPerEndpointQuery(
    execution.id
  )

  if (loading || error || resultsPerEndpoint.length === 0) {
    return (
      <Grid item xs={12}>
        <Paper square className={classes.tile}>
          {loading ? (
            <LoadingPlaceholder title="Loading data..." height={Chart.HEIGHT} />
          ) : error ? (
            <ErrorPlaceholder error={error} height={Chart.HEIGHT} />
          ) : (
            <LoadingPlaceholder
              title="Waiting for test run results..."
              height={Chart.HEIGHT}
            />
          )}
        </Paper>
      </Grid>
    )
  }

  return (
    <React.Fragment>
      <Grid item xs={12} xl={6}>
        <Paper square className={classes.tile}>
          <SectionHeader
            size="small"
            className={classes.tileTitle}
            title="Request Results"
          />
          <ResultsPerEndpointChart data={resultsPerEndpoint} />
        </Paper>
      </Grid>
      <Grid item xs={12} xl={6}>
        <Paper square className={classes.tile}>
          <SectionHeader
            size="small"
            className={classes.tileTitle}
            title="Requests/Second by request"
          />
          <RequestsPerSecondChart data={resultsPerEndpoint} />
        </Paper>
      </Grid>

      <Grid item xs={12}>
        <Paper square className={classes.tile}>
          <CompareResponsesTable
            data={resultsPerEndpoint}
            getEndpointDetailsUrl={getEndpointDetailsUrl}
          />
        </Paper>
      </Grid>

      <Grid item xs={12}>
        <Paper square className={classes.tile}>
          <CompareResponsesSummary data={resultsPerEndpoint} />
        </Paper>
      </Grid>
    </React.Fragment>
  )
}

export default CompareEndpointResults