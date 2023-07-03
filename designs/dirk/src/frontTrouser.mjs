import { pluginBundle } from '@freesewing/plugin-bundle'

function draftFrontTrouser({
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
  points.waistIn = new Point(0, 0)
  points.crotchIn = new Point(-80, 250)
  points.crotchCurveCp1 = new Point(0, 145)
  points.crotchCurveCp2 = new Point(-25, 235)
  points.legInBottom = new Point(0, 950)
  points.legOutBottom = new Point(170, 950)
  points.crotchOut = new Point(250, 250)
  points.waistOut = new Point(250, 0)

  paths.seam = new Path()
    .move(points.waistIn)
    .curve(points.crotchCurveCp1, points.crotchCurveCp2, points.crotchIn)
    .line(points.legInBottom)
    .line(points.legOutBottom)
    .line(points.crotchOut)
    .line(points.waistOut)
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

export const frontTrouser = {
  name: 'frontTrouser',
  options: {
    size: { pct: 50, min: 10, max: 100, menu: 'fit' },
  },
  plugins: [pluginBundle],
  draft: draftFrontTrouser,
}
