import { generatePath } from 'react-router-dom'

export const getSubpageUrl = (match, relativePath, params = {}) => {
  return generatePath(`${match.path}${relativePath}`, {
    ...match.params,
    ...params,
  })
}