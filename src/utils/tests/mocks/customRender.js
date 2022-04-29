import React from 'react'
import { MemoryRouter } from 'react-router-dom'
import { MockedProvider as MockedApolloProvider } from '@apollo/client/testing'
import { MockedThemeProvider } from '.'

export const customRender = (ui, mocks = [], initialEntries) => (
  <MockedApolloProvider mocks={mocks} addTypename={false}>
    <MemoryRouter initialEntries={initialEntries}>
      <MockedThemeProvider>{ui}</MockedThemeProvider>
    </MemoryRouter>
  </MockedApolloProvider>
)