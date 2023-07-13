import { pluginBundle } from '@freesewing/plugin-bundle'

export const strap = {
  name: 'strap',
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
  draft: draftStrap,
}

function draftStrap({
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
  points.topLeft = new Point(0, 0)
  points.bottomLeft = new Point(0, 700)
  points.bottomRight = new Point(80, 700)
  points.topRight = new Point(80, 0)

  paths.seam = new Path()
    .move(points.topLeft)
    .line(points.bottomLeft)
    .line(points.bottomRight)
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
    // macro('hd', {
    //     from: points.topLeft,
    //     to: points.topRight,
    //     y: points.topLeft.y + sa + 15,
    // })
    // macro('hd', {
    //     from: points.waistLeft,
    //     to: points.waistRight,
    //     y: points.waistLeft.y + sa + 15,
    // })
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
