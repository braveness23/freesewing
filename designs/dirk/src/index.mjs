//

import { Design } from '@freesewing/core'
import { data } from '../data.mjs'
// Parts
import { frontTrouser } from './frontTrouser.mjs'
import { rearTrouser } from './rearTrouser.mjs'
import { bib } from './bib.mjs'
import { strap } from './strap.mjs'

// Create new design
const Dirk = new Design({
  data,
  parts: [frontTrouser, rearTrouser, bib, strap],
})

// Named exports
export { frontTrouser, rearTrouser, bib, strap, Dirk }
