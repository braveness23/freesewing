import { pluginBundle } from '@freesewing/plugin-bundle'
import { shortsleeve } from './shortsleeve.mjs'

import {
  adjustPoints,
  consoleLogPoints,
  scalePoints,
  addPoint,
  addPointX,
  addPointY,
  makeRelativePoints,
} from './utils.mjs'

function draftLongsleeve({
  options,
  Point,
  Path,
  points,
  paths,
  Snippet,
  snippets,
  complete,
  sa,
  paperless,
  measurements,
  store,
  macro,
  part,
}) {
  const waist = store.get('waist')
  const ease = store.get('ease')
  const sideseam = store.get('sideseam')

  // for( const p in paths ) {
  //   delete paths[p]
  // }

  points.rp1 = points.p0.shift(180, 293.7625802105263 * (ease + 1))
  points.rp2 = points.p0.shift(194.345521471841, 303.21713769055657 * (ease + 1))
  points.rp3 = points.p0.shift(194.66320209996223, 290.50417302498295 * (ease + 1))
  points.rp3Cp1 = points.p0.shift(200.01156103077165, 229.3425471399697 * (ease + 1))
  points.rp4Cp2 = points.p0.shift(213.17727589125565, 174.25165593501407 * (ease + 1))

  paths.seam2 = new Path()
    .move(points.rp0)
    .line(points.rp1)
    .line(points.rp2)
    .line(points.rp3)
    .curve(points.rp3Cp1, points.rp4Cp2, points.rp4)
    .curve(points.rp4Cp1, points.rp0Cp2, points.rp0)
    .close()
    .attr('class', 'lining')

  // Complete?
  if (complete) {
    // points.logo = points.topLeft.shiftFractionTowards(points.bottomRight, 0.5)
    // snippets.logo = new Snippet('logo', points.logo)
    // points.text = points.logo
    //   .shift(-90, w / 8)
    //   .attr('data-text', 'hello')
    //   .attr('data-text-class', 'center')

    if (sa) {
      paths.sa = paths.seam.offset(sa).attr('class', 'fabric sa')
    }
  }

  // Paperless?
  if (paperless) {
    macro('hd', {
      from: points.bottomLeft,
      to: points.bottomRight,
      y: points.bottomLeft.y + sa + 15,
    })
    macro('vd', {
      from: points.bottomRight,
      to: points.topRight,
      x: points.topRight.x + sa + 15,
    })
  }

  return part
}

export const longsleeve = {
  name: 'longsleeve',
  from: shortsleeve,
  plugins: [pluginBundle],
  draft: draftLongsleeve,
}
