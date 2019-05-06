const routes = {
  projects: {
    list: '/projects',
    details: '/projects/:projectId',
    sources: {
      list: '/projects/:projectId/sources',
      create: '/projects/:projectId/sources/create',
      edit: '/projects/:projectId/sources/:sourceId/edit',
      details: '/projects/:projectId/sources/:sourceId',
    },
    configurations: {
      list: '/projects/:projectId/configs',
      create: '/projects/:projectId/configs/create',
      edit: '/projects/:projectId/configs/:configurationId/edit',
      details: '/projects/:projectId/configs/:configurationId',
      executions: {
        list: '/projects/:projectId/configs/:configurationId/runs',
        details: '/projects/:projectId/configs/:configurationId/runs/:executionId',
        endpoints: {
          details:
            '/projects/:projectId/configs/:configurationId/runs/:executionId/endpoint/:endpointId',
        },
      },
    },
    executions: {
      list: '/projects/:projectId/runs',
    },
  },
}

export default routes