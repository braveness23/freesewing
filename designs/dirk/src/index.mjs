//

import { Design } from '@freesewing/core'
import { data } from '../data.mjs'
// Parts
import { frontTrouser } from './frontTrouser.mjs'
import { rearTrouser } from './rearTrouser.mjs'
import { bib } from './bib.mjs'
import { bibPocket } from './bibPocket.mjs'
import { strap } from './strap.mjs'
import { frontWaistBand } from './frontWaistBand.mjs'
import { rearWaistBand } from './rearWaistBand.mjs'

// Create new design
const Dirk = new Design({
  data,
  parts: [frontTrouser, rearTrouser, bib, bibPocket, strap, frontWaistBand, rearWaistBand],
})

// Named exports
export { frontTrouser, rearTrouser, bib, bibPocket, strap, frontWaistBand, rearWaistBand, Dirk }
