import { gql } from '@apollo/client'

const TEST_CONFIGURATION_LIST_ITEM = gql`
  fragment testConfigurationListItem on configuration {
    id
    name
    performed
    configuration_type {
      id
      name
    }
    configuration_parameters {
      id
      value
      parameter_slug
    }
    executions(order_by: { start: desc }, limit: 1) {
      id
      start
      execution_request_totals_aggregate {
        aggregate {
          sum {
            num_failures
            num_requests
          }
          min {
            min_response_time
          }
          avg {
            average_response_time
          }
          max {
            max_response_time
          }
        }
      }
    }
    test_source {
      id
      source_type
      repository {
        id
        name
        url
      }
      test_creator {
        id
        name
      }
    }
  }
`

export const SUBSCRIBE_TO_TEST_CONFIGURATION_AGGREGATE_LIST_ITEM = gql`
  subscription subscribeConfigurationListItem($projectId: uuid) {
    configurationsAggregate: configuration_aggregate(
      where: { project_id: { _eq: $projectId }, is_deleted: { _eq: false } }
    ) {
      aggregate {
        count
      }
    }
  }
`

export const SUBSCRIBE_TO_TEST_CONFIGURATION_LIST_ITEM = gql`
  subscription subscribeConfigurationListItem(
    $projectId: uuid
    $limit: Int
    $offset: Int
    $order_by: [configuration_order_by!]
  ) {
    configurations: configuration(
      where: { project_id: { _eq: $projectId }, is_deleted: { _eq: false } }
      limit: $limit
      offset: $offset
      order_by: $order_by
    ) {
      ...testConfigurationListItem
    }
  }

  ${TEST_CONFIGURATION_LIST_ITEM}
`
