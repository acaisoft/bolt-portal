import React from 'react'
import { useListFilters } from '~hooks'

const withListFilters = ({ initialState = () => {} }) => Component => {
  const HOC = props => {
    const computedValues = initialState(props) || {}
    const listFilters = useListFilters(computedValues)

    return <Component listFilters={listFilters} {...props} />
  }

  HOC.displayName = `withListFilters(${Component.displayName || Component.name})`

  return HOC
}

export default withListFilters
