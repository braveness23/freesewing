import { pluginBundle } from '@freesewing/plugin-bundle'

function draftRearTrouser({
  points,
  Point,
  paths,
  Path,
  options,
  complete,
  paperless,
  measurements,
  store,
  macro,
  utils,
  snippets,
  Snippet,
  sa,
  log,
  part,
}) {
  points.waistOut = new Point(0, 0)
  points.crotchOut = new Point(0, 250)
  points.legOutBottom = new Point(30, 950)
  points.legInBottom = new Point(220, 950)
  points.crotchIn = new Point(360, 250)
  points.crotchCurveCp1 = new Point(274, 70)
  points.crotchCurveCp2 = new Point(239, 203)
  points.waistIn = new Point(240, -40)

  paths.seam = new Path()
    .move(points.waistOut)
    .line(points.crotchOut)
    .line(points.legOutBottom)
    .line(points.legInBottom)
    .line(points.crotchIn)
    .curve(points.crotchCurveCp2, points.crotchCurveCp1, points.waistIn)
    //.line(points.waistIn)
    .close()
    .attr('class', 'fabric')

  // Complete?
  if (complete) {
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

export const rearTrouser = {
  name: 'rearTrouser',
  options: {
    size: { pct: 50, min: 10, max: 100, menu: 'fit' },
  },
  plugins: [pluginBundle],
  draft: draftRearTrouser,
}
