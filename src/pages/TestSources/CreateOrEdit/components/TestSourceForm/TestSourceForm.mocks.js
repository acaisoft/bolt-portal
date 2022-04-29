import { mockGraphqlData } from 'utils/tests/mocks'
import {
  ADD_REPOSITORY_VALIDATE_MUTATION,
  EDIT_REPOSITORY_VALIDATE_MUTATION,
  GET_CONFIGURATION_TYPES_QUERY,
  GET_REPOSITORY_KEY,
  GET_TEST_SOURCE,
} from './graphql'

export const repoName = 'Repo name'
export const repoUrl = 'git@bitbucket.org:acaisoft/bolt-rc.git'
export const projectId = '83150c3c-239f-4bec-8d0e-973b96ca3c7a'

export const testConnectionSuccess = {
  validationResult: {
    ok: true,
  },
}

export const validationErrorMessage = 'repository is not accessible'
export const testConnectionError = [
  {
    message: validationErrorMessage,
    locations: [
      {
        line: 2,
        column: 3,
      },
    ],
    path: ['validationResult'],
  },
]

export const testsPerformedError = [
  {
    message:
      'cannot change type_slug, a test has been performed using this repository',
    locations: [
      {
        line: 2,
        column: 3,
      },
    ],
    path: ['validationResult'],
  },
]

export const repositoryKey = {
  repositoryKey: 'ssh-rsa TEST_REPOSITORY_KEY_SDADASDSADXV',
}

export const configurationTypes = {
  configurationTypes: [
    {
      id: 'bv324uio-dsakdad',
      name: 'Performance',
      slug_name: 'load_tests',
    },
  ],
}

export const sourceId = '529606f0-58ca-4ee6-8374-2bf4ca6d5635'
const testSource = {
  testSource: {
    id: sourceId,
    source_type: 'repository',
    test_creator: null,
    repository: {
      id: '529606f0-58ca-4ee6-8374-2bf4ca6d5635',
      name: repoName,
      type_slug: 'load_tests',
      url: repoUrl,
    },
  },
}

export const repositoryKeyMock = mockGraphqlData(GET_REPOSITORY_KEY, repositoryKey)

export const configurationTypesMock = mockGraphqlData(
  GET_CONFIGURATION_TYPES_QUERY,
  configurationTypes
)

const addRepoValidationVariables = {
  name: repoName,
  repository_url: repoUrl,
  type_slug: 'load_tests',
  project_id: projectId,
}

const editRepoValidationVariables = {
  id: sourceId,
  name: '',
  repository_url: '',
  type_slug: 'load_tests',
}

export const addRepositoryConnectionSuccessMock = mockGraphqlData(
  ADD_REPOSITORY_VALIDATE_MUTATION,
  testConnectionSuccess,
  addRepoValidationVariables
)

export const addRepositoryConnectionErrorMock = mockGraphqlData(
  ADD_REPOSITORY_VALIDATE_MUTATION,
  { validationResult: null },
  addRepoValidationVariables,
  testConnectionError
)

export const editRepositoryTestsPerformedMock = mockGraphqlData(
  EDIT_REPOSITORY_VALIDATE_MUTATION,
  { validationResult: null },
  editRepoValidationVariables,
  testsPerformedError
)

export const editRepositoryTestsNotPerformedMock = mockGraphqlData(
  EDIT_REPOSITORY_VALIDATE_MUTATION,
  testConnectionSuccess,
  editRepoValidationVariables
)

export const getTestSourceMock = mockGraphqlData(GET_TEST_SOURCE, testSource, {
  sourceId,
})
