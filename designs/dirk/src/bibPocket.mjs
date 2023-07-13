import { pluginBundle } from '@freesewing/plugin-bundle'

export const bibPocket = {
  name: 'bibPocket',
  plugins: [pluginBundle],
  draft: draftBibPocket,
}

function draftBibPocket({
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
  points.leftFold = new Point(-100, 120)
  points.bottomLeft = new Point(-60, 160)
  points.bottomRight = new Point(60, 160)
  points.rightFold = new Point(100, 120)
  points.topRight = new Point(100, 0)

  paths.seam = new Path()
    .move(points.topLeft)
    .line(points.leftFold)
    .line(points.bottomLeft)
    .line(points.bottomRight)
    .line(points.rightFold)
    .line(points.topRight)
    .line(points.topLeft)
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
    // macro('hd', {
    //   from: points.topLeft,
    //   to: points.topRight,
    //   y: points.topLeft.y + sa + 15,
    // })
    // macro('hd', {
    //   from: points.waistLeft,
    //   to: points.waistRight,
    //   y: points.waistLeft.y + sa + 15,
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
