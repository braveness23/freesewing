import chalk from 'chalk'
// Load environment variables
import dotenv from 'dotenv'
import { asJson } from './utils/index.mjs'
dotenv.config()

// Allow these 2 to be imported
export const port = process.env.API_PORT || 3000
export const api = process.env.API_URL || `http://localhost:${port}`

// All environment variables are strings
// This is a helper method to turn them into a boolean
const envToBool = (input = 'no') => {
  if (['yes', '1', 'true'].includes(input.toLowerCase())) return true
  return false
}

// Construct config object
const config = {
  api,
  port,
  website: {
    domain: process.env.BACKEND_WEBSITE_DOMAIN || 'freesewing.org',
    scheme: process.env.BACKEND_WEBSITE_SCHEME || 'https',
  },
  db: {
    url: process.env.BACKEND_DB_URL,
  },
  tests: {
    allow: envToBool(process.env.BACKEND_TEST_ALLOW),
    domain: process.env.BACKEND_TEST_DOMAIN || 'freesewing.dev',
    sendEmail: envToBool(process.env.BACKEND_TEST_SEND_EMAIL),
    includeSanity: envToBool(process.env.BACKEND_TEST_SANITY),
  },
  static: process.env.BACKEND_STATIC_PATH,
  encryption: {
    key: process.env.BACKEND_ENC_KEY,
  },
  jwt: {
    secretOrKey: process.env.BACKEND_ENC_KEY,
    issuer: process.env.BACKEND_JWT_ISSUER,
    audience: process.env.BACKEND_JWT_ISSUER,
    expiresIn: process.env.BACKEND_JWT_EXPIRY || '7d',
  },
  apikeys: {
    levels: [0, 1, 2, 3, 4, 5, 6, 7, 8],
    expiryMaxSeconds: 365 * 24 * 3600,
  },
  roles: {
    levels: {
      user: 4,
      bughunter: 5,
      support: 7,
      admin: 8,
    },
    base: 'user',
  },
  languages: ['en', 'de', 'es', 'fr', 'nl'],
  aws: {
    ses: {
      region: process.env.BACKEND_AWS_SES_REGION || 'us-east-1',
      from: process.env.BACKEND_AWS_SES_FROM || 'FreeSewing <info@freesewing.org>',
      replyTo: process.env.BACKEND_AWS_SES_REPLY_TO
        ? JSON.parse(process.env.BACKEND_AWS_SES_REPLY_TO)
        : ['FreeSewing <info@freesewing.org>'],
      feedback: process.env.BACKEND_AWS_SES_FEEDBACK,
      cc: process.env.BACKEND_AWS_SES_CC ? JSON.parse(process.env.BACKEND_AWS_SES_CC) : [],
      bcc: process.env.BACKEND_AWS_SES_BCC
        ? JSON.parse(process.env.BACKEND_AWS_SES_BCC)
        : ['FreeSewing records <records@freesewing.org>'],
    },
  },
  sanity: {
    project: process.env.SANITY_PROJECT,
    dataset: 'production',
    token: process.env.SANITY_TOKEN,
    version: process.env.SANITY_VERSION || 'v2022-10-31',
    api: `https://${process.env.SANITY_PROJECT || 'missing-project-id'}.api.sanity.io/${
      process.env.SANITY_VERSION || 'v2022-10-31'
    }`,
  },
  oauth: {
    github: {
      clientId: process.env.BACKEND_GITHUB_CLIENT_ID,
      clientSecret: process.env.BACKEND_GITHUB_CLIENT_SECRET,
      tokenUri: 'https://github.com/login/oauth/access_token',
      dataUri: 'https://api.github.com/user',
      emailUri: 'https://api.github.com/user/emails',
    },
    google: {
      clientId: process.env.BACKEND_GOOGLE_CLIENT_ID,
      clientSecret: process.env.BACKEND_GOOGLE_CLIENT_SECRET,
      tokenUri: 'https://oauth2.googleapis.com/token',
      dataUri:
        'https://people.googleapis.com/v1/people/me?personFields=emailAddresses,names,photos',
    },
  },
  github: {
    token: process.env.BACKEND_GITHUB_TOKEN,
    api: 'https://api.github.com',
    bot: {
      user: process.env.BACKEND_GITHUB_USER || 'freesewing-robot',
      name: process.env.BACKEND_GITHUB_USER_NAME || 'Freesewing bot',
      email: process.env.BACKEND_GITHUB_USER_EMAIL || 'bot@freesewing.org',
    },
    notify: {
      specific: {
        albert: ['woutervdub'],
        bee: ['bobgeorgethe3rd'],
        benjamin: ['woutervdub'],
        cornelius: ['woutervdub'],
        diana: ['alfalyr'],
        holmes: ['alfalyr'],
        hortensia: ['woutervdub'],
        lunetius: ['starfetch'],
        penelope: ['woutervdub'],
        tiberius: ['starfetch'],
        sandy: ['alfalyr'],
        ursula: ['nataliasayang'],
        yuri: ['biou', 'hellgy'],
        walburga: ['starfetch'],
        waralee: ['woutervdub'],
      },
      dflt: [process.env.BACKEND_GITHUB_NOTIFY_DEFAULT_USER || 'joostdecock'],
    },
  },
}

// Stand-alone config
export const sanity = config.sanity
export const website = config.website

/*
 * This method is how you load the config.
 *
 * It will verify whether whether everyting is setup correctly
 * which is not a given since there's a number of environment
 * variables that need to be set for this backend to function.
 */
export function verifyConfig() {
  const nonEmptyString = (input) => {
    if (typeof input === 'string' && input.length > 0) return true
    return false
  }
  const warnings = []
  const errors = []

  /*
   * Required (error when missing)
   */

  // Database
  if (!nonEmptyString(config.db.url)) errors.push({ e: 'API_DB_URL', i: './dev.sqlite' })

  // Encryption
  //if (!nonEmptyString(config.encryption.key)) errors.push({ e: 'FS_ENC_KEY', i: 'encryption' })

  /*
   * Wanted (warning when missing)
   */
  // API
  //if (!nonEmptyString(config.api)) warnings.push({ e: 'FS_BACKEND', i: 'api' })

  // Site
  //if (!nonEmptyString(config.api)) warnings.push({ e: 'FS_SITE', i: 'site' })

  // SMTP
  //if (!nonEmptyString(config.smtp.host)) warnings.push({ e: 'FS_SMTP_HOST', i: 'smtp' })

  //if (!nonEmptyString(config.smtp.user)) warnings.push({ e: 'FS_SMTP_USER', i: 'smtp' })

  //if (!nonEmptyString(config.smtp.pass)) warnings.push({ e: 'FS_SMTP_PASS', i: 'smtp' })

  // OAUTH
  //if (!nonEmptyString(config.oauth.github.clientId))
  //  warnings.push({ e: 'FS_GITHUB_CLIENT_ID', i: 'oauth' })

  //if (!nonEmptyString(config.oauth.github.clientSecret))
  //  warnings.push({ e: 'FS_GITHUB_CLIENT_SECRET', i: 'oauth' })

  //if (!nonEmptyString(config.oauth.google.clientId))
  //  warnings.push({ e: 'FS_GOOGLE_CLIENT_ID', i: 'oauth' })

  //if (!nonEmptyString(config.oauth.google.clientSecret))
  //  warnings.push({ e: 'FS_GOOGLE_CLIENT_SECRET', i: 'oauth' })

  for (let { e, i } of warnings) {
    console.log(
      chalk.yellow('Warning:'),
      'Missing',
      chalk.yellow(e),
      "environment variable. Some features won't be available.",
      '\n',
      chalk.yellow('See: '),
      chalk.yellow.bold('https://dev.freesewing.org/backend/configuration#' + i),
      '\n'
    )
  }

  for (let { e, i } of errors) {
    console.log(
      chalk.redBright('Error:'),
      'Required environment variable',
      chalk.redBright(e),
      "is missing. The backend won't start without it.",
      '\n',
      chalk.yellow('See: '),
      chalk.yellow.bold('https://dev.freesewing.org/backend/configuration#' + i),
      '\n'
    )
  }

  if (errors.length > 0) {
    console.log(chalk.redBright('Invalid configuration. Stopping here...'))
    return process.exit(1)
  }

  if (process.env.API_DUMP_CONFIG_AT_STARTUP) {
    console.log(
      'Dumping configuration:',
      asJson(
        {
          ...config,
          encryption: {
            ...config.encryption,
            key:
              config.encryption.key.slice(0, 4) + '[ REDACTED ]' + config.encryption.key.slice(-4),
          },
          jwt: {
            secretOrKey:
              config.jwt.secretOrKey.slice(0, 4) +
              '[ REDACTED ]' +
              config.jwt.secretOrKey.slice(-4),
          },
        },
        null,
        2
      )
    )
  }

  return config
}
