// custom appxigon functions used in demo playground

import { get } from 'lodash'
import { utils } from 'appxigon'
import { at } from 'prelude-ls'

export function customLocaleSwitch(params, ctx) {
  const locale = get(params, 'locale', 'en')
  const a = get(ctx, 'actions')
  a && a.axgSetLocale(locale)
}

// TODO: should be a built-in function
export function switchSchema(params, ctx) {
  const schemaName = get(params, 'schema', 'schema')
  const a = get(ctx, 'actions')
  a && a.axgSetSchema(get(window.appxigon.schemas, schemaName, {}))
}

// return arbitrary data collections
export function demoLocalDataFunction(params, ctx) {
  console.info(`Playground: /demoLocalDataFunction/params: ${JSON.stringify(params)}`)
  return [
    	{
    		"path": "/assets/midi/zelda.mid",
    		"name": "Zelda - demoLocalDataFunction"
    	},
    	{
    		"path": "/assets/midi/chasing-cars-mario.mid",
    		"name": "Mario - Chasing Cars - demoLocalDataFunction"
    	},
    	{
    		"path": "/assets/midi/mary-had-a-little-lamb-mario.mid",
    		"name": "Mario -  Mary had a little lamb - demoLocalDataFunction"
    	},
    	{
    		"path": "/assets/midi/prelude-final-fantasy-iii.mid",
    		"name": "Final Fantasy III Prelude - demoLocalDataFunction"
    	}
    ]
}

export function sendToSomeApi(params, ctx) {
  let dataToSend = utils.getGroupValue(params, ctx)
  console.log(`---> dataToSend: ${JSON.stringify(dataToSend)}`)
}

export function showGroupData(params, ctx) {
  let dataToSend = utils.getGroupValue(params, ctx)
  alert(`Collected Data: ${JSON.stringify(dataToSend)}`)
}

// Go to next view
export function nextView(params, ctx) {
  let appId = get(ctx, 'appId')
  let currentView = get(ctx, 'viewId')
  let views = get(params, 'views')
  let step = get(params, 'step')
  let nextView = currentView
  if (appId && currentView && views.length) {
    console.log(`nextView: ${currentView} of ${JSON.stringify(views)}`)
    nextView = utils.nextItemInArray({
      allItems: views,
      currentItem: currentView,
      step: step,
    })
    ctx.actions.axgSetViewId(`${appId}/${nextView}`)
  }
}

export function transitClass(params, ctx) {
  let name = get(params, 'name', 'dummy')
  let timeout = get(params, 'timeout', 0)
  let e = get(document.getElementsByClassName('axg-app'), 0)
  if (e) {
    e.classList.add(name)
    setTimeout(
      () => e.classList.remove(name),
      timeout
    )
  }
}

export function updateSlideProgress(params, ctx) {
  let id = get(params, 'id')
  let currentView = get(ctx, 'viewId')
  let views = get(params, 'views')
  let progress = views.indexOf(currentView) / (views.length - 1)
  if (id) {
    setTimeout(
      ()=> {
        ctx.actions.axgSetState({
          id: id,
          key: 'progress',
          val: progress,
        })
      },
      300
    )
  }
}

export function showModal(params, ctx) {
  let viewTokens = []
  let viewString = get(params, 'view')
  if (viewString) {
    viewTokens = viewString.split('/')
  }
  let appId = at(0, viewTokens)
  let viewId = at(-1, viewTokens)
  let modalSchema = get(ctx, ['schema', appId, viewId])
  let actions = get(ctx, 'actions')
  if (actions) {
    actions.axgSetModal(modalSchema)
    actions.axgSetModalTitle(viewId)
  } else {
    console.error("AXG: error showing modal...")
  }
}
