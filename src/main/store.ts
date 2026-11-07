import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { EOL, userInfo } from 'node:os'
import { join } from 'node:path'
import { app, type Rectangle } from 'electron'
import { isLanguage, resolveLocale, translator } from '@shared/i18n'
import type { Settings } from '@shared/types'

const dir = (): string => {
  const path = app.getPath('userData')
  mkdirSync(path, { recursive: true })
  return path
}

function readJson<T>(file: string, fallback: T): T {
  const path = join(dir(), file)
  if (!existsSync(path)) return fallback
  try {
    return JSON.parse(readFileSync(path, 'utf8')) as T
  } catch {
    return fallback
  }
}

const writeJson = (file: string, value: unknown): void =>
  writeFileSync(join(dir(), file), JSON.stringify(value, null, 2))

function defaultNick(): string {
  try {
    return userInfo().username
  } catch {
    return translator(resolveLocale(app.getPreferredSystemLanguages()[0] ?? app.getLocale()))('you')
  }
}

/** A made-up 9-digit ICQ number, fixed on first run. */
const randomUin = (): string => String(100_000_000 + Math.floor(Math.random() * 899_999_999))

interface Stored extends Omit<Settings, 'locale'> {
  bounds?: Rectangle
  maximized?: boolean
}

let cache: Stored | undefined

function load(): Stored {
  if (cache) return cache
  const stored = readJson<Partial<Stored>>('settings.json', {})
  cache = {
    skin: 'msn',
    nick: defaultNick(),
    personalMessage: '',
    msnStatus: 'online',
    icqStatus: 'online',
    uin: randomUin(),
    sounds: true,
    shake: true,
    toasts: true,
    alwaysOnTop: false,
    ...stored,
    language: isLanguage(stored?.language) ? stored.language : 'system'
  }
  if (!stored.uin) writeJson('settings.json', cache)
  return cache
}

export const store = {
  get(): Settings {
    const { bounds: _bounds, maximized: _maximized, ...settings } = load()
    const locale = settings.language === 'system'
      ? resolveLocale(app.getPreferredSystemLanguages()[0] ?? app.getLocale())
      : settings.language
    return { ...settings, locale }
  },
  update({ locale: _locale, language, ...patch }: Partial<Settings>): Settings {
    const previous = load()
    cache = { ...previous, ...patch, language: isLanguage(language) ? language : previous.language }
    writeJson('settings.json', cache)
    return store.get()
  },
  windowState: (): Pick<Stored, 'bounds' | 'maximized'> => ({ bounds: load().bounds, maximized: load().maximized }),
  saveWindowState(bounds: Rectangle, maximized: boolean): void {
    cache = { ...load(), bounds, maximized }
    writeJson('settings.json', cache)
  }
}

/** Where users can drop their own .wav/.mp3 to replace the bundled sounds. */
export const soundsDir = (): string => join(dir(), 'sounds')

export function ensureSoundsDir(): string {
  const root = soundsDir()
  for (const skin of ['msn', 'icq']) mkdirSync(join(root, skin), { recursive: true })
  const { locale } = store.get()
  const t = translator(locale)
  const readme = join(root, { en: 'README.txt', de: 'LIESMICH.txt', es: 'LEEME.txt' }[locale])
  if (!existsSync(readme)) {
    writeFileSync(
      readme,
      [
        t('soundInstructions'),
        '',
        `msn/message.wav  → ${t('incomingMessage')}`,
        `msn/nudge.wav    → ${t('nudge')}`,
        `msn/online.wav   → ${t('online')}`,
        `icq/message.wav  → ${t('incomingMessage')} ("Uh-oh!")`,
        `icq/nudge.wav    → ${t('nudge')}`,
        `icq/online.wav   → ${t('online')}`
      ].join(EOL)
    )
  }
  return root
}
