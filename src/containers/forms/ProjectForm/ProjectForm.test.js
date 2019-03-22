import React from 'react'
import { shallow } from 'enzyme'

import { ProjectForm } from './ProjectForm'

import { mocks } from '~utils/tests'

const initProjectForm = overrides => {
  const mockProps = {
    onCancel: jest.fn(),
    onSubmit: jest.fn(),
  }
  const wrapper = shallow(
    <ProjectForm {...mockProps} {...overrides} classes={mocks.ClassesProxy} />
  )
  const instance = wrapper.instance()
  return { instance, mockProps, wrapper }
}

describe('component ProjectForm', () => {
  describe('rendering', () => {
    it('should render without crashing', () => {
      const { wrapper } = initProjectForm()
      expect(wrapper).toBeTruthy()
    })
  })
})