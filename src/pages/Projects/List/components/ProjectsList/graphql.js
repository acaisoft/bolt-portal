import { gql } from '@apollo/client'

export const GET_PROJECT_SUMMARIES = gql`
  query getProjectCards {
    summaries: testrun_project_summary {
      projects {
        id: project_id
        name
        description
        image_url
        num_scenarios
        num_sources
        num_tests_failed
        num_tests_passed
      }
    }
  }
`
