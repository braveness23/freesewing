import { pluginBundle } from '@freesewing/plugin-bundle'

function draftBib({
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
  points.topIn = new Point(0, 0)
  points.waistIn = new Point(0, 340)
  points.waistOut = new Point(200, 340)
  points.foldOut = new Point(200, 300)
  points.topOut = new Point(100, 0)

  paths.seam = new Path()
    .move(points.topIn)
    .line(points.waistIn)
    .line(points.waistOut)
    .line(points.foldOut)
    .line(points.topOut)
    .line(points.topIn)
    .close()
    .attr('class', 'fabric')

  // Complete?
  if (complete) {
    macro('cutonfold', {
      from: points.topIn,
      to: points.waistIn,
      grainline: true,
    })

    if (sa) {
      paths.sa = paths.seam.offset(sa).attr('class', 'fabric sa')
    }
  }

  // Paperless?
  if (paperless) {
    macro('hd', {
      from: points.topIn,
      to: points.topOut,
      y: points.topIn.y + sa + 15,
    })
    macro('hd', {
      from: points.waistIn,
      to: points.waistOut,
      y: points.waistIn.y + sa + 15,
    })

    macro('vd', {
      from: points.waistOut,
      to: points.foldOut,
      x: points.waistOut.x + sa + 15,
    })
    macro('vd', {
      from: points.topIn,
      to: points.waistIn,
      x: points.topIn.x + sa + 15,
    })
  }

  return part
}

export const bib = {
  name: 'bib',
  //measurements: ['waist', 'waistToFloor'],
  options: {
    waistEase: {
      pct: 1,
      min: 0,
      max: 5,
      menu: 'fit',
    },
  },
  plugins: [pluginBundle],
  draft: draftBib,
}
