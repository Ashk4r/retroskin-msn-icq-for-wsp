/**
 * Local chrome attached to the contact pane, outside React's managed DOM.
 * Resources are our own drawings; labels and layouts reference MSN 7.5 / ICQ 2000b.
 */
import { ICQ_STATUS, MSN_STATUS, translator, type Locale } from './i18n'
import type { Settings } from './types'
import { icqFlower, msnLogo, noteIcon, searchIcon, settingsIcon, smileyIcon } from './icons'

const esc = (value: string): string => value.replace(/[&<>"']/g, (c) =>
  ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c] as string)

export function sidebarProfile(s: Settings): string {
  const t = translator(s.locale)
  if (s.skin === 'msn') return `
    <div class="wm-profile-picture"><img id="wm-profile-pic" alt="${t('profilePicture')}" /></div>
    <div class="wm-profile-info">
      <div class="wm-profile-line">
        <span data-wm-edit="nick" contenteditable="plaintext-only" role="textbox" aria-multiline="false" spellcheck="false" aria-label="${t('displayName')}">${esc(s.nick)}</span>
        <button data-wm-menu="status" title="${t('localStatus')}">(${t(MSN_STATUS[s.msnStatus])}) ▾</button>
      </div>
      <div class="wm-personal-message" data-wm-edit="personalMessage" contenteditable="plaintext-only" role="textbox" aria-multiline="false"
        spellcheck="false" aria-label="${t('personalMessage')}" data-placeholder="&lt;${t('writePersonalMessage')}&gt;">${esc(s.personalMessage)}</div>
      <div class="wm-profile-links">${msnLogo(14)} <span>MSN Messenger</span>
        <button data-wm-menu="tools" title="${t('options')}">${settingsIcon(14)}</button></div>
    </div>`
  return `
    <div class="wm-icq-brand">${icqFlower('logo', 16)}<b>ICQ<span>2000b</span></b>
      <button data-wm-menu="icq-main" title="${t('details')} / ${t('preferences')}">${settingsIcon(14)}</button></div>
    <div class="wm-icq-details">
      <span data-wm-edit="nick" contenteditable="plaintext-only" role="textbox" aria-multiline="false" spellcheck="false" aria-label="${t('nickname')}">${esc(s.nick)}</span>
      <span class="wm-uin">ICQ# <span data-wm-edit="uin" contenteditable="plaintext-only" role="textbox" aria-multiline="false" spellcheck="false" aria-label="${t('localIcqNumber')}">${esc(s.uin)}</span></span>
    </div>`
}

export function sidebarFooter(s: Settings): string {
  const t = translator(s.locale)
  if (s.skin === 'msn') return `
    <div class="wm-add-contact"><button data-wm-action="search">${searchIcon(14)} ${t('findContact')}</button></div>
    <div class="wm-ad" title="${t('mockAd')}"><span>${smileyIcon(22)}</span>
      <div><b>${t('customize')}</b><small>${t('adDetails')}</small></div></div>`
  return `
    <div class="wm-system-notice">${noteIcon(14)}<span>${t('systemNotice')}</span><button data-wm-menu="icq-services" title="${t('services')}">▾</button></div>
    <div class="wm-icq-bottom">
      <button data-wm-menu="icq-main" class="wm-icq-main" title="${t('main')}">ICQ</button>
      <button data-wm-menu="status" class="wm-icq-status" title="${t('localStatus')}">${icqFlower(s.icqStatus, 16)}<span>${t(ICQ_STATUS[s.icqStatus]).split(' (')[0]}</span> ▾</button>
    </div>`
}

export function sidebarTools(locale: Locale): string {
  const t = translator(locale)
  return `
    <button data-wm-action="search" title="${t('findUsers')}">${searchIcon(16)}</button>
    <button data-wm-menu="icq-services" title="${t('services')}">${noteIcon(16)}</button>
    <button data-wm-menu="icq-main" title="${t('preferences')}">${settingsIcon(16)}</button>`
}
