import { pluginBundle } from '@freesewing/plugin-bundle'

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
  points.topLeft = new Point(-100, 0)
  points.leftFold = new Point(-200, 300)
  points.waistLeft = new Point(-200, 340)
  points.waistRight = new Point(200, 340)
  points.rightFold = new Point(200, 300)
  points.topRight = new Point(100, 0)

  paths.seam = new Path()
    .move(points.topLeft)
    .line(points.leftFold)
    .line(points.waistLeft)
    .line(points.waistRight)
    .line(points.rightFold)
    .line(points.topRight)
    .line(points.topLeft)
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
      from: points.topLeft,
      to: points.topRight,
      y: points.topLeft.y + sa + 15,
    })
    macro('hd', {
      from: points.waistLeft,
      to: points.waistRight,
      y: points.waistLeft.y + sa + 15,
    })

    // macro('vd', {
    //   from: points.waistOut,
    //   to: points.foldOut,
    //   x: points.waistOut.x + sa + 15,
    // })
    // macro('vd', {
    //   from: points.topIn,
    //   to: points.waistIn,
    //   x: points.topIn.x + sa + 15,
    // })
  }

  return part
}
