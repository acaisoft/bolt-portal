import React from 'react'
import moment from 'moment'

import { IconButton, withStyles, Tooltip } from '@material-ui/core'
import { Edit, Delete, History, PlayArrow, Pageview } from '@material-ui/icons'

import { DataTable } from '~components'
import { TestConfiguration } from '~assets/icons'

import styles from './TestConfigurationsList.component.styles'

export function TestConfigurationsList({
  classes,
  configurations,
  loading,
  onDelete,
  onDetails,
  onEdit,
  onRun,
  projectId,
  runningConfigurationId,
}) {
  return (
    <DataTable
      data={configurations}
      isLoading={loading}
      rowKey={configuration => configuration.id}
    >
      <DataTable.Column
        key="icon"
        render={() => <TestConfiguration />}
        title=""
        width={20}
      />
      <DataTable.Column
        key="name"
        render={configuration => configuration.name}
        title="Name"
      />
      <DataTable.Column
        key="type"
        render={configuration => configuration.configuration_type.name}
        title="Type"
      />
      <DataTable.Column
        key="source"
        render={configuration =>
          configuration.test_source &&
          configuration.test_source[configuration.test_source.source_type].name
        }
        title="Source"
      />
      <DataTable.Column
        key="lastRun"
        render={configuration => (
          <div className={classes.dateContainer}>
            {(configuration.executions[0] || {}).start && (
              <React.Fragment>
                <IconButton className={classes.icon} disabled>
                  <History />
                </IconButton>
                <span>
                  {moment(configuration.executions[0].start).format('YYYY-MM-DD')}
                </span>
              </React.Fragment>
            )}
          </div>
        )}
        title="Last Run"
      />
      <DataTable.Column
        key="actions"
        render={configuration => {
          if (runningConfigurationId === configuration.id) {
            return 'Starting...'
          }
          return (
            <div className={classes.iconsContainer}>
              <IconButton
                aria-label="Start execution"
                className={classes.icon}
                onClick={() => onRun(configuration)}
                disabled={!configuration.test_source}
              >
                <PlayArrow />
              </IconButton>
              <IconButton
                aria-label="Show configuration details"
                className={classes.icon}
                onClick={() => onDetails(configuration)}
              >
                <Pageview />
              </IconButton>
              <IconButton
                aria-label="Edit configuration"
                className={classes.icon}
                onClick={() => onEdit(configuration)}
              >
                <Edit />
              </IconButton>
              <Tooltip
                title={
                  Boolean(configuration.performed)
                    ? "You can't delete a performed scenario."
                    : ''
                }
                PopperProps={{
                  classes: {
                    popper: {
                      opacity: 1,
                    },
                  },
                }}
              >
                <span>
                  <IconButton
                    aria-label="Delete configuration"
                    className={classes.icon}
                    disabled={Boolean(configuration.performed)}
                    onClick={() => onDelete(configuration)}
                  >
                    <Delete />
                  </IconButton>
                </span>
              </Tooltip>
            </div>
          )
        }}
        title="Actions"
      />
    </DataTable>
  )
}

export default withStyles(styles)(TestConfigurationsList)
