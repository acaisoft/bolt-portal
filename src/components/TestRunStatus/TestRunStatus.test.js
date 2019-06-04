import React from 'react'
import { render, cleanup } from '@testing-library/react'
import { MockedThemeProvider } from '~utils/tests/mocks'

import { TestRunStatus, configurations } from './TestRunStatus'
import { TestRunStatus as Status } from '~config/constants'

jest.unmock('@material-ui/core')
jest.unmock('@material-ui/icons')

describe('component: TestRunStatus', () => {
  afterEach(cleanup)

  describe('rendering', () => {
    describe('render everything properly', () => {
      test.each([
        [Status.FINISHED, configurations.FINISHED.title],
        [Status.PENDING, configurations.PENDING.title],
        [Status.ERROR, configurations.ERROR.title],
        ['ANYOTHERSTATUS', configurations.ERROR.title],
        ['', configurations.ERROR.title],
        [null, configurations.ERROR.title],
        [undefined, configurations.ERROR.title],
      ])(
        'when status is %s expect %s as title',
        (specifiedStatus, expectedTitle) => {
          const { getByText, getByTestId } = render(
            <MockedThemeProvider>
              <TestRunStatus status={specifiedStatus} />
            </MockedThemeProvider>
          )

          const titleEl = getByText(expectedTitle)
          const iconEl = getByTestId('test-run-status-icon')
          const wrapperEl = getByTestId('test-run-status-wrapper')

          expect(wrapperEl).toBeVisible()
          expect(titleEl).toBeVisible()
          expect(iconEl).toBeVisible()
        }
      )
    })
  })
})