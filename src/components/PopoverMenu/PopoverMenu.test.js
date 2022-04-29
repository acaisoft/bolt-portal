import React from 'react'
import { act, render, cleanup, fireEvent, queries } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import PopoverMenu from './PopoverMenu'

jest.unmock('@material-ui/core')

function renderComponent({ id, trigger, items, onClose, onOpen, closeOnClick }) {
  const user = userEvent.setup()
  const helpers = render(
    <PopoverMenu
      id={id}
      trigger={trigger}
      onClose={onClose}
      onOpen={onOpen}
      closeOnClick={closeOnClick}
    >
      {items}
    </PopoverMenu>
  )

  return {
    ...helpers,
    openMenu: async () => {
      await user.click(helpers.getByText('Trigger'))
    },
    closeMenu: () => {
      const menuEl = document.body.querySelector(`#${id}`)
      act(() => {
        fireEvent.keyDown(menuEl, { key: 'Escape' })
      })
    },
    clickOnItem: async itemText => {
      const menuEl = document.body.querySelector(`#${id} `)
      const item = queries.getByText(menuEl, itemText)
      await user.click(item)
    },
  }
}

let trigger, items, id
describe('component: PopoverMenu', () => {
  afterEach(cleanup)

  beforeEach(() => {
    id = 'fake-menu'
    trigger = <button type="button">Trigger</button>
    items = [
      <li key="one">one</li>,
      <li key="two">two</li>,
      <li key="three">three</li>,
    ]
  })

  test('render trigger only on init', () => {
    const { getByText, queryByText } = renderComponent({
      id,
      trigger,
      items,
    })

    expect(getByText('Trigger')).toBeVisible()
    expect(queryByText('one')).toBeNull()
    expect(queryByText('two')).toBeNull()
    expect(queryByText('three')).toBeNull()
  })

  test('render items after clicking the trigger', async () => {
    const { getByText, openMenu } = renderComponent({
      id,
      trigger,
      items,
    })

    await openMenu()

    expect(getByText('one')).toBeVisible()
    expect(getByText('two')).toBeVisible()
    expect(getByText('three')).toBeVisible()
  })

  describe('callbacks', () => {
    test('call onOpen on menu open', async () => {
      const onOpen = jest.fn()
      const { openMenu } = renderComponent({
        id,
        trigger,
        onOpen,
        items,
      })

      await openMenu()

      expect(onOpen).toHaveBeenCalledWith(expect.any(Object))
    })

    test('call onClose on menu close', async () => {
      const onClose = jest.fn()
      const { openMenu, closeMenu } = renderComponent({
        id,
        trigger,
        onClose,
        items,
      })

      await openMenu()
      closeMenu()

      expect(onClose).toHaveBeenCalledTimes(1)
    })

    describe('clicking on items', () => {
      test("call item's onClick and then close menu if closeOnClick is true", async () => {
        const onClick = jest.fn()
        const onClose = jest.fn()
        items = [
          <li key="one" onClick={onClick}>
            one
          </li>,
          <li key="two">two</li>,
        ]
        const { openMenu, clickOnItem } = renderComponent({
          id,
          trigger,
          onClose,
          items,
          closeOnClick: true,
        })

        await openMenu()
        await clickOnItem('one')

        expect(onClick).toHaveBeenCalledTimes(1)
        expect(onClose).toHaveBeenCalledTimes(1)
      })

      test("call item's onClick without closing menu if closeOnClick is false", async () => {
        const onClick = jest.fn()
        const onClose = jest.fn()
        items = [
          <li key="one" onClick={onClick}>
            one
          </li>,
          <li key="two">two</li>,
        ]
        const { openMenu, clickOnItem } = renderComponent({
          id,
          trigger,
          onClose,
          items,
          closeOnClick: false,
        })

        await openMenu()
        await clickOnItem('one')

        expect(onClick).toHaveBeenCalledTimes(1)
        expect(onClose).toHaveBeenCalledTimes(0)
      })
    })
  })
})
