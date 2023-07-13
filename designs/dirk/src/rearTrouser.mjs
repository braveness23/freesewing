import { pluginBundle } from '@freesewing/plugin-bundle'

export const rearTrouser = {
  name: 'rearTrouser',
  measurements: ['waist', 'waistToFloor'],
  options: {
    waistEase: {
      pct: 1,
      min: 0,
      max: 5,
      menu: 'fit',
    },
    lengthBonus: {
      pct: 2,
      min: -20,
      max: 10,
      menu: 'style',
    },
    crotchDrop: {
      pct: 2,
      min: 0,
      max: 15,
      menu: 'style',
    },
  },
  plugins: [pluginBundle],
  draft: draftRearTrouser,
}

function draftRearTrouser({
  points,
  Point,
  paths,
  Path,
  options,
  complete,
  paperless,
  measurements,
  macro,
  sa,
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
    .line(points.waistOut)
    .close()
    .attr('class', 'fabric')

  // Complete?
  if (complete) {
    // TODO: Logo here

    if (sa) {
      paths.sa = paths.seam.offset(sa).attr('class', 'fabric sa')
    }
  }

  // Paperless?
  if (paperless) {
    macro('hd', {
      from: points.waistIn,
      to: points.waistOut,
      y: points.waistIn.y + sa + 15,
    })
    macro('hd', {
      from: points.crotchIn,
      to: points.crotchOut,
      y: points.crotchIn.y + sa,
    })
    macro('hd', {
      from: points.legInBottom,
      to: points.legOutBottom,
      y: points.legInBottom.y + sa + 15,
    })
    macro('vd', {
      from: points.crotchOut,
      to: points.waistOut,
      x: points.crotchOut.x + sa + 15,
    })
    macro('vd', {
      from: points.legOutBottom,
      to: points.crotchOut,
      x: points.legOutBottom.x + sa + 15,
    })
  }

  return part
}
