//

import { Design } from '@freesewing/core'
import { data } from '../data.mjs'
// Parts
import { frontTrouser } from './frontTrouser.mjs'
import { rearTrouser } from './rearTrouser.mjs'

// Create new design
const Dirk = new Design({
  data,
  parts: [frontTrouser, rearTrouser],
})

// Named exports
export { frontTrouser, rearTrouser, Dirk }
