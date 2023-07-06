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
  macro,
  sa,
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
  // additional points
  points.waistX = new Point(measurements.waistFrontArc * (1 + options.waistEase), 0)
  points.floor = new Point(0, measurements.waistToFloor * (1 + options.lengthBonus))

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

export const frontTrouser = {
  name: 'frontTrouser',
  options: {
    measurements: ['waist', 'waistToFloor'],
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
  draft: draftFrontTrouser,
}
