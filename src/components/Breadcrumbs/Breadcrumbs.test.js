import React from 'react'
import { Router } from 'react-router-dom'
import { createMemoryHistory } from 'history'
import { cleanup, render } from '@testing-library/react'

import { Breadcrumbs } from './Breadcrumbs'
import { ClassesProxy } from '~utils/tests/mocks'

afterEach(cleanup)

jest.unmock('react-router-dom')
jest.unmock('@material-ui/core')
jest.unmock('@material-ui/icons')

function renderWithRouter(
  ui,
  { route = '/', history = createMemoryHistory({ initialEntries: [route] }) } = {}
) {
  return {
    ...render(<Router history={history}>{ui}</Router>),
    history,
  }
}

describe('Breadcrumbs', () => {
  test('should render null when no items', () => {
    const { container } = render(<Breadcrumbs />)

    expect(container.firstChild).toEqual(null)
  })

  test('should render items', () => {
    const items = [
      {
        key: 'projects',
      },
      {
        key: 'configurations',
      },
      {
        key: 'executions',
      },
    ]
    const { queryAllByTestId } = render(
      <Breadcrumbs classes={ClassesProxy} items={items} />
    )

    expect(queryAllByTestId('item')).toHaveLength(3)
  })

  test('should render items with url', () => {
    const items = [
      {
        key: 'projects',
        url: 'projects_url',
        label: 'projects_label',
      },
      {
        key: 'configurations',
        url: 'configurations_url',
        label: 'configurations_label',
      },
      {
        key: 'executions',
        url: 'executions_url',
        label: 'executions_label',
      },
    ]
    const { queryAllByText, queryAllByTestId } = renderWithRouter(
      <Breadcrumbs classes={ClassesProxy} items={items} />
    )

    expect(queryAllByTestId('link')).toHaveLength(3)
    expect(queryAllByText(/.+_label/)).toHaveLength(3)
  })

  test('should render items with render', () => {
    const renderer = ({ index }) => <div data-testid="render">{index}</div>
    const items = [
      {
        key: 'projects',
        render: renderer,
      },
      {
        key: 'configurations',
        render: renderer,
      },
      {
        key: 'executions',
        render: renderer,
      },
    ]
    const { queryAllByText, queryAllByTestId } = render(
      <Breadcrumbs classes={ClassesProxy} items={items} />
    )

    expect(queryAllByTestId('render')).toHaveLength(3)
    expect(queryAllByText(/\d/)).toHaveLength(3)
  })

  test('should render separator between items', () => {
    const items = [
      {
        key: 'projects',
      },
      {
        key: 'configurations',
      },
      {
        key: 'executions',
      },
    ]
    const { queryAllByTestId } = render(
      <Breadcrumbs classes={ClassesProxy} items={items} />
    )

    expect(queryAllByTestId('separator')).toHaveLength(2)
  })
})
