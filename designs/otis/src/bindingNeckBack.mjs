import { pluginCutlist } from '@freesewing/plugin-cutlist'
import { pluginBundle } from '@freesewing/plugin-bundle'
import { back } from './back.mjs'
import { front } from './front.mjs'
import { shortsleeve } from './shortsleeve.mjs'

function draftBindingNeckBack({
  Point,
  Path,
  points,
  paths,
  Snippet,
  snippets,
  complete,
  sa,
  paperless,
  store,
  macro,
  part,
}) {
  const backNeckOpening = store.get('BackNeckOpening')
  const hem = store.get('hem')

  points.p0 = new Point(0, 0)
  points.p1 = new Point(0, backNeckOpening)
  points.p2 = new Point(hem * 2, backNeckOpening)
  points.p3 = new Point(hem * 2, 0)

  paths.seam = new Path()
    .move(points.p0)
    .line(points.p1)
    .line(points.p2)
    .line(points.p3)
    .line(points.p0)
    .close()

  paths.foldLine = new Path()
    .move(points.p0.shiftFractionTowards(points.p3, 0.5))
    .line(points.p2.shiftFractionTowards(points.p1, 0.5))
    .addClass('dashed')

  // Complete?
  if (complete) {
    points.logo = points.p0.shiftFractionTowards(points.p2, 0.5)
    snippets.logo = new Snippet('logo', points.logo).attr('data-scale', 0.25)

    snippets.middle = new Snippet('notch', points.p2.shiftFractionTowards(points.p3, 0.5))

    macro('title', {
      at: points.logo.shift(-115, 15),
      nr: 5,
      title: 'bindingNeckBack',
      scale: 0.2,
    })

    if (sa) {
      paths.sa = paths.seam.offset(sa).close().attr('class', 'fabric sa')
    }
  }

  // Paperless?
  if (paperless) {
    macro('hd', {
      from: points.p0,
      to: points.p3,
      y: points.p0.y - sa - 15,
    })
    macro('vd', {
      from: points.p2,
      to: points.p3,
      x: points.p3.x + sa + 15,
    })
  }
  store.cutlist.addCut({ material: 'fabric', cut: 1 })

  return part
}

export const bindingNeckBack = {
  name: 'bindingNeckBack',
  after: [back, front, shortsleeve],
  options: {
    binding: { pct: 12, min: 0, max: 30, menu: 'advanced' },
  },
  plugins: [pluginBundle],
  draft: draftBindingNeckBack,
}
