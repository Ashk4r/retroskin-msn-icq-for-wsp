import './styles/toast.css'
import { resolveLocale, translator } from '@shared/i18n'
import { icqFlower, msnLogo } from '@shared/icons'

const params = new URLSearchParams(location.search)
const locale = resolveLocale(params.get('locale') ?? 'en')
const t = translator(locale)
document.documentElement.lang = locale
document.title = t('notification')
const skin = params.get('skin') === 'icq' ? 'icq' : 'msn'
const kind = params.get('kind') ?? 'message'
const name = params.get('name') ?? ''
const text = params.get('text') ?? ''

const box = document.getElementById('toast') as HTMLElement
document.body.dataset.skin = skin

const strong = document.createElement('b')
const line = document.createElement('span')
line.textContent = kind === 'message' ? text : ''

if (skin === 'msn') {
  strong.textContent = t(kind === 'online' ? 'signedIn' : kind === 'nudge' ? 'nudgeReceived' : 'says', { name })
  box.innerHTML = `<div class="bar"><span>${msnLogo(14)}</span>MSN Messenger<i>×</i></div><div class="body"><span class="logo">${msnLogo(40)}</span><p></p></div><div class="foot">${t('options')}</div>`
  const p = box.querySelector('p') as HTMLElement
  p.append(strong, document.createElement('br'), line)
} else {
  strong.textContent = name
  const title = kind === 'online' ? t('online') : kind === 'nudge' ? t('nudge') : t('incomingMessage')
  box.innerHTML = `<div class="bar">${icqFlower('logo', 14)}<span>ICQ</span><i>×</i></div><div class="body"><span class="logo">${icqFlower(kind === 'online' ? 'online' : 'logo', 36)}</span><p></p></div>`
  const p = box.querySelector('p') as HTMLElement
  const header = document.createElement('em')
  header.textContent = title
  p.append(header, document.createElement('br'), strong, document.createElement('br'), line)
}
