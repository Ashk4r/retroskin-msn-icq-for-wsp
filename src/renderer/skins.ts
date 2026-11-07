/** The window chrome around WhatsApp for each skin. Plain template strings. */
import { translator } from '@shared/i18n'
import type { Settings } from '@shared/types'
import { icqFlower, msnBuddy, msnLogo } from '@shared/icons'

const esc = (text: string): string =>
  text.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c] as string)

const winButtons = (maximized: boolean, t: ReturnType<typeof translator>): string => `
  <div class="tbtns">
    <button data-win="minimize" title="${t('minimize')}"><i class="g-min"></i></button>
    <button data-win="maximize" title="${maximized ? t('restore') : t('maximize')}"><i class="${maximized ? 'g-restore' : 'g-max'}"></i></button>
    <button data-win="close" class="close" title="${t('close')}"><i class="g-close"></i></button>
  </div>`

/* ------------------------------------------------------------------ MSN 7.5 */

export function msnChrome(s: Settings, maximized: boolean): string {
  const t = translator(s.locale)
  return `
  <div class="window">
    <div class="titlebar">
      <span class="ticon">${msnBuddy(s.msnStatus, 16)}</span>
      <span class="ttext">MSN Messenger</span>
      ${winButtons(maximized, t)}
    </div>
    <nav class="menubar">
      <button data-menu="file">${t('file')}</button>
      <button data-menu="contacts">${t('contacts')}</button>
      <button data-menu="actions">${t('actions')}</button>
      <button data-menu="tools">${t('tools')}</button>
      <button data-menu="help">${t('help')}</button>
    </nav>
    <main id="content"><div class="loading"><div class="spin">${msnLogo(72)}</div><p>${t('signingIn')}</p></div></main>
  </div>`
}

/* ----------------------------------------------------------------- ICQ 2000b */

export function icqChrome(s: Settings, maximized: boolean): string {
  const t = translator(s.locale)
  return `
  <div class="window">
    <div class="titlebar">
      <span class="ticon">${icqFlower(s.icqStatus, 16)}</span>
      <span class="ttext">${esc(s.nick)}</span>
      ${winButtons(maximized, t)}
    </div>
    <nav class="icq-menubar"><button class="btn98" data-menu="icq-main">${t('main')}</button><button class="btn98" data-menu="icq-services">${t('services')}</button><button class="btn98" data-menu="skin">${t('skin')} ▾</button></nav>
    <main id="content"><div class="loading"><div class="blink">${icqFlower('logo',64)}</div><p>${t('connecting')}</p></div></main>
  </div>`
}

/* ------------------------------------------------------- WhatsApp original */

export function offChrome(s: Settings, maximized: boolean): string {
  const t = translator(s.locale)
  return `
  <div class="window">
    <div class="titlebar">
      <span class="ttext">WhatsApp</span>
      <button class="skinbtn" data-menu="skin">${t('skin')} ▾</button>
      ${winButtons(maximized, t)}
    </div>
    <main id="content"><div class="loading"><p>${t('loading')}</p></div></main>
  </div>`
}

/* ---------------------------------------------------------------- dialogs */

export function optionsDialog(s: Settings): string {
  const t = translator(s.locale)
  const icq = s.skin === 'icq'
  return `
  <form class="dialog" method="dialog">
    <div class="titlebar"><span class="ttext">${t(icq ? 'details' : 'options')}</span>
      <div class="tbtns"><button type="button" data-close class="close" title="${t('close')}"><i class="g-close"></i></button></div></div>
    <div class="dialog-body">
      <p class="hint">${t('localOnly')}</p>
      <label>${t(icq ? 'nickname' : 'displayName')}<input name="nick" value="${esc(s.nick)}" maxlength="80" /></label>
      ${icq ? '' : `<label>${t('personalMessage')}<input name="personalMessage" value="${esc(s.personalMessage)}" maxlength="120" /></label>`}
      ${icq ? `<label>ICQ#<input name="uin" value="${esc(s.uin)}" maxlength="12" inputmode="numeric" /></label>` : ''}
      <div class="actions"><button type="submit" class="btn">${t('save')}</button>
        <button type="button" data-close class="btn">${t('cancel')}</button></div>
    </div>
  </form>`
}

export function aboutDialog(s: Settings): string {
  const t = translator(s.locale)
  const icq = s.skin === 'icq'
  return `
  <div class="dialog about">
    <div class="titlebar"><span class="ttext">${t(icq ? 'aboutIcq' : 'aboutMessenger')}</span>
      <div class="tbtns"><button type="button" data-close class="close" title="${t('close')}"><i class="g-close"></i></button></div></div>
    <div class="dialog-body">
      <div class="about-logo">${icq ? icqFlower('logo', 64) : msnLogo(64)}</div>
      <h2>${t('appName')}</h2>
      <p>${t('aboutSkin', { skin: icq ? 'ICQ 2000b' : 'MSN Messenger 7.5' })}</p>
      <p class="hint">${t('aboutProject')}</p>
      <div class="actions"><button type="button" data-close class="btn">OK</button></div>
    </div>
  </div>`
}
