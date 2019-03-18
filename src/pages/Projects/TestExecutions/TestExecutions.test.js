import React from 'react'
import { shallow } from 'enzyme'

import { TestExecutions } from './TestExecutions'
import { mocks } from '~utils/tests'

const initTestExecutions = overrides => {
  const mockProps = {
    match: {
      url: '/projects/project-1/test-execs',
    },
    projectId: 'project-1',
  }
  const wrapper = shallow(
    <TestExecutions classes={mocks.ClassesProxy} {...mockProps} {...overrides} />
  )
  return { wrapper }
}

describe('page: TestExecutions', () => {
  describe('rendering', () => {
    it('should render without crashing', () => {
      const { wrapper } = initTestExecutions()
      expect(wrapper).toBeTruthy()
    })
  })
})
