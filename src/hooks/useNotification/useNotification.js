import React, { useCallback } from 'react'
import { toast } from 'react-toastify'
import { makeStyles } from '@material-ui/styles'
import { ToastSuccess, ToastError, ToastInfo } from '~assets/icons'
import { ToastContent } from './components'

const variants = {
  info: {
    defaultTitle: 'Information',
    icon: ToastInfo,
  },
  success: {
    defaultTitle: 'Success',
    icon: ToastSuccess,
  },
  error: {
    defaultTitle: 'Error',
    icon: ToastError,
  },
}

function useNotification() {
  return {
    success: createVariant(variants.success),
    info: createVariant(variants.info),
    error: createVariant(variants.error),
  }
}

const useStyle = makeStyles(({ palette }) => {
  return {
    className: {
      borderRadius: 4,
      minHeight: 80,
      backgroundColor: ({ name }) => palette[name].main,
      color: ({ name }) => palette[name].contrastText,
    },
    progressClassName: {
      height: 7,
      background: 'rgba(255, 255, 255, 0.3)',
    },
  }
})

function createVariant({ name, defaultTitle, icon }) {
  return useCallback((message, options = {}) => {
    const { title, ...toastifyOptions } = options
    const classes = useStyle({ name })

    toast[name](
      <ToastContent
        IconComponent={icon}
        message={message}
        title={title || defaultTitle}
      />,
      {
        ...toastifyOptions,
        ...classes,
      }
    )
  }, [])
}

export default useNotification
