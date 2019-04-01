import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { Mutation } from 'react-apollo'
import { withStyles } from '@material-ui/core'
import { DeleteModal } from '~components'
import { TestSourcesList } from '~containers/lists'

import { GET_TEST_SOURCES_QUERY } from '~services/GraphQL/Queries'
import { DELETE_REPOSITORY_MUTATION } from '~services/GraphQL/Mutations'

import styles from './List.styles'

export class List extends Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    history: PropTypes.shape({
      push: PropTypes.func.isRequired,
    }).isRequired,
    match: PropTypes.shape({
      params: PropTypes.shape({
        projectId: PropTypes.string,
      }).isRequired,
    }).isRequired,
  }

  emptyFormValues = {
    name: '',
    url: '',
    id: null,
  }

  state = {
    isDeleteModalOpen: false,
    selectedTestSource: '',
  }

  handleCreate = () => {
    const { history, match } = this.props
    history.push(`${match.url}/create`)
  }

  handleEdit = ({ id }) => {
    const { history, match } = this.props
    history.push(`${match.url}/${id}`)
  }

  handleDelete = testSource => {
    this.setState({ isDeleteModalOpen: true, selectedTestSource: testSource })
  }

  handleDeleteSubmit = async ({ delMutation }) => {
    const { selectedTestSource } = this.state
    await delMutation({ variables: { id: selectedTestSource.id } })
    this.handleCloseDeleteModal()
  }

  handleCloseDeleteModal = () => {
    this.setState({ isDeleteModalOpen: false })
  }

  render() {
    const { classes, match } = this.props
    const { projectId } = match.params
    const { isDeleteModalOpen, selectedTestSource } = this.state

    return (
      <div className={classes.root}>
        <Mutation
          mutation={DELETE_REPOSITORY_MUTATION}
          refetchQueries={[
            { query: GET_TEST_SOURCES_QUERY, variables: { projectId } },
          ]}
        >
          {(delMutation, { data }) =>
            isDeleteModalOpen && (
              <DeleteModal
                onClose={this.handleCloseDeleteModal}
                onSubmit={() => this.handleDeleteSubmit({ delMutation })}
                type="test source"
                name={selectedTestSource.name}
              />
            )
          }
        </Mutation>
        <TestSourcesList
          projectId={projectId}
          onCreate={this.handleCreate}
          onDelete={this.handleDelete}
          onEdit={this.handleEdit}
        />
      </div>
    )
  }
}

export default withStyles(styles)(List)