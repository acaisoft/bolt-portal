import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Formik } from 'formik'
import { Mutation } from 'react-apollo'

import { toast } from 'react-toastify'
import { AppBar, Button, Drawer, Typography, withStyles } from '@material-ui/core'

import FormField from '~components/FormField'
import { formFields, validationSchema } from './formSchema'

import styles from './RepositoryForm.styles'
import KeyRepositoryModal from '../KeyRepositoryModal'

import { ADD_REPOSITORY_MUTATION } from '~services/GraphQL/Mutations'
import { EDIT_REPOSITORY_MUTATION } from '~services/GraphQL/Mutations'
import { GET_REPOSITORIES_QUERY } from '~services/GraphQL/Queries'

export class RepositoryForm extends Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    open: PropTypes.bool.isRequired,
    close: PropTypes.func.isRequired,
    courseInitData: PropTypes.object,
  }

  state = {
    openModal: false,
  }

  handleModalOpen = () => {
    this.setState({ openModal: true })
  }

  handleModalClose = () => {
    this.setState({ openModal: false })
  }

  handleSubmit = (values, { repoMutation }) => {
    const { name, url } = values
    try {
      if (this.props.type === 'create') {
        repoMutation({ variables: { name, url, projectId: values.projectId } })
      } else {
        repoMutation({
          variables: { name, url, id: values.id },
        })
      }
    } catch (err) {
      toast.error('An error has occured. Project was not created.')
    }
    this.props.close(null, false)
  }

  renderForm = ({ handleSubmit, isSubmitting, dirty }) => (
    <React.Fragment>
      <AppBar className={this.props.classes.appBar} position="static">
        <Typography variant="h3">
          {this.props.type === 'create' ? 'NEW REPOSITORY' : 'UPDATE REPOSITORY'}
        </Typography>
        <Typography variant="body1">
          Here you can define your new test run repository, you can edit the data
          until first test run. After that you will be able only to change
          configuration name.
        </Typography>
      </AppBar>
      <form onSubmit={handleSubmit}>
        {Object.entries(formFields).map(([name, options]) => {
          return (
            <FormField
              key={name}
              name={name}
              label={options.label}
              margin="normal"
              fullWidth
              {...options.input}
            />
          )
        })}
        <div className={this.props.classes.keyContainer}>
          <Button color="primary" variant="contained" onClick={this.handleModalOpen}>
            GENERATE KEY
          </Button>
        </div>

        <Button
          color="primary"
          variant="text"
          disabled={isSubmitting}
          onClick={() => this.props.close(null, false)}
        >
          Cancel
        </Button>
        <Button
          color="primary"
          variant="contained"
          type="submit"
          disabled={!dirty || isSubmitting}
        >
          {this.props.type === 'create' ? 'ADD REPOSITORY' : 'UPDATE'}
        </Button>
      </form>
    </React.Fragment>
  )

  render() {
    const { classes, open, courseInitData, type } = this.props
    const { openModal } = this.state
    return (
      <div>
        <KeyRepositoryModal open={openModal} handleClose={this.handleModalClose} />
        <Drawer
          open={open}
          anchor="right"
          classes={{
            paper: classes.drawer,
          }}
        >
          <Mutation
            mutation={
              type === 'create' ? ADD_REPOSITORY_MUTATION : EDIT_REPOSITORY_MUTATION
            }
            refetchQueries={[{ query: GET_REPOSITORIES_QUERY }]}
          >
            {(repoMutation, { data }) => (
              <Formik
                initialValues={courseInitData}
                onSubmit={values => this.handleSubmit(values, { repoMutation })}
                validationSchema={validationSchema}
              >
                {this.renderForm}
              </Formik>
            )}
          </Mutation>
        </Drawer>
      </div>
    )
  }
}

export default withStyles(styles)(RepositoryForm)
