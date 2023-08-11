import { pluginBundle } from '@freesewing/plugin-bundle'

export const bib = {
  name: 'bib',
  plugins: [pluginBundle],
  measurements: ['waist', 'waistToFloor'],
  options: {
    // TODO: set these to reasonable values
    bodyEase: { pct: 21, min: 21, max: 50, menu: 'fit' },
    bibTopWidth: { pct: 1, min: 0, max: 5, menu: 'style' },
    waistEase: { pct: 1, min: 0, max: 5, menu: 'fit' },
    shiftLength: { pct: 2, min: 0, max: 20, menu: 'style' },
  },

  draft: function draftBib({
    points,
    Point,
    paths,
    Path,
    Snippet,
    snippets,
    options,
    complete,
    paperless,
    measurements,
    macro,
    sa,
    part,
  }) {
    //body
    const lengthBody =
      (measurements.waistToKnee + measurements.hpsToWaistBack) * (1 + options.shiftLength)

    const workingHip =
      measurements.chest > measurements.hips ? measurements.chest / 2 : measurements.hips / 2

    const widthBody = workingHip * (1 + options.bodyEase)

    const maxLength =
      lengthBody > measurements.waistToFloor + measurements.hpsToWaistBack
        ? measurements.waistToFloor + measurements.hpsToWaistBack
        : lengthBody

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
      // Logo
      points.logo = new Point(0, 150)
      // points.logo = points.middle.shiftTowards(points.middleHem, lengthBody / 4)
      snippets.logo = new Snippet('logo', points.logo)

      // Title
      points.title = new Point(0, 250)
      macro('title', {
        at: points.title,
        nr: 1,
        title: 'bib',
      })

      // TODO: Logo here

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
  },
}
