import type { IcqStatus, MsnStatus } from './types'

export const LANGUAGE_NAMES = { en: 'English', de: 'Deutsch', es: 'Español' } as const
export type Locale = keyof typeof LANGUAGE_NAMES
export type Language = Locale | 'system'

export function isLanguage(value: unknown): value is Language {
  return typeof value === 'string' && (value === 'system' || Object.hasOwn(LANGUAGE_NAMES, value))
}

export function resolveLocale(value: string): Locale {
  const language = value.toLowerCase().split(/[-_]/)[0]
  return language === 'de' || language === 'es' ? language : 'en'
}

const messages = {
  language: ['Language', 'Sprache', 'Idioma'],
  systemLanguage: ['System language', 'Systemsprache', 'Idioma del sistema'],
  minimize: ['Minimize', 'Minimieren', 'Minimizar'],
  restore: ['Restore', 'Wiederherstellen', 'Restaurar'],
  maximize: ['Maximize', 'Maximieren', 'Maximizar'],
  close: ['Close', 'Schließen', 'Cerrar'],
  file: ['File', 'Datei', 'Archivo'],
  contacts: ['Contacts', 'Kontakte', 'Contactos'],
  actions: ['Actions', 'Aktionen', 'Acciones'],
  tools: ['Tools', 'Extras', 'Herramientas'],
  help: ['Help', 'Hilfe', 'Ayuda'],
  signingIn: ['Signing in…', 'Anmeldung läuft…', 'Iniciando sesión…'],
  main: ['Main', 'Hauptmenü', 'Menú principal'],
  services: ['Services', 'Dienste', 'Servicios'],
  skin: ['Skin', 'Design', 'Tema'],
  connecting: ['Connecting…', 'Verbindung wird hergestellt…', 'Conectando…'],
  loading: ['Loading WhatsApp…', 'WhatsApp wird geladen…', 'Cargando WhatsApp…'],
  details: ['My Details', 'Meine Daten', 'Mis datos'],
  options: ['Options', 'Optionen', 'Opciones'],
  localOnly: ['These details are only shown here and do not change your WhatsApp profile.', 'Diese Angaben werden nur hier angezeigt und ändern dein WhatsApp-Profil nicht.', 'Estos datos solo se muestran acá y no cambian tu perfil de WhatsApp.'],
  nickname: ['Nickname', 'Spitzname', 'Apodo'],
  displayName: ['Display name', 'Anzeigename', 'Nombre para mostrar'],
  personalMessage: ['Personal message', 'Persönliche Nachricht', 'Mensaje personal'],
  save: ['Save', 'Speichern', 'Guardar'],
  cancel: ['Cancel', 'Abbrechen', 'Cancelar'],
  aboutIcq: ['About ICQ', 'Über ICQ', 'Acerca de ICQ'],
  aboutMessenger: ['About Messenger', 'Über Messenger', 'Acerca de Messenger'],
  appName: ['Retro Messenger for WhatsApp', 'Retro Messenger für WhatsApp', 'Retro Messenger para WhatsApp'],
  aboutSkin: ['WhatsApp Web in the style of {skin}.', 'WhatsApp Web im Stil von {skin}.', 'WhatsApp Web con el estilo de {skin}.'],
  aboutProject: ['A free, open-source fan project. Unaffiliated with WhatsApp, Meta, Microsoft or ICQ.', 'Ein kostenloses Open-Source-Fanprojekt ohne Verbindung zu WhatsApp, Meta, Microsoft oder ICQ.', 'Proyecto de fans, gratis y de código abierto. No está afiliado a WhatsApp, Meta, Microsoft ni ICQ.'],
  originalSkin: ['Original WhatsApp', 'WhatsApp-Original', 'WhatsApp original'],
  sounds: ['Sounds', 'Töne', 'Sonidos'],
  shake: ['Shake window on nudge', 'Fenster beim Anstupsen wackeln lassen', 'Sacudir la ventana con los zumbidos'],
  popups: ['Pop-up alerts', 'Popup-Benachrichtigungen', 'Avisos emergentes'],
  alwaysOnTop: ['Always on top', 'Immer im Vordergrund', 'Siempre visible'],
  changeSkin: ['Change Skin', 'Design wechseln', 'Cambiar de tema'],
  reload: ['Reload WhatsApp', 'WhatsApp neu laden', 'Recargar WhatsApp'],
  findContact: ['Find a contact', 'Kontakt suchen', 'Buscar un contacto'],
  sendNudge: ['Send a nudge', 'Anstupsen', 'Enviar un zumbido'],
  soundsFolder: ['Sounds folder…', 'Ordner für Töne…', 'Carpeta de sonidos…'],
  preferences: ['Preferences', 'Einstellungen', 'Preferencias'],
  findUsers: ['Find/Add Users', 'Kontakte suchen/hinzufügen', 'Buscar/agregar contactos'],
  open: ['Open', 'Öffnen', 'Abrir'],
  status: ['Status', 'Status', 'Estado'],
  exit: ['Exit', 'Beenden', 'Salir'],
  localStatus: ['Local status', 'Lokaler Status', 'Estado local'],
  profilePicture: ['Your display picture', 'Dein Profilbild', 'Tu imagen para mostrar'],
  writePersonalMessage: ['Enter a personal message', 'Persönliche Nachricht eingeben', 'Escribe un mensaje personal'],
  localIcqNumber: ['Local ICQ number', 'Lokale ICQ-Nummer', 'Número de ICQ local'],
  mockAd: ['Fictional retro ad', 'Fiktive Retro-Werbung', 'Publicidad ficticia de época'],
  customize: ['Customize your Messenger', 'Gestalte deinen Messenger', 'Personalizá tu Messenger'],
  adDetails: ['Emoticons · backgrounds · conversations', 'Emoticons · Hintergründe · Chats', 'Emoticonos · fondos · conversaciones'],
  systemNotice: ['System Notice', 'Systemhinweis', 'Aviso del sistema'],
  signIn: ['Sign in', 'Anmelden', 'Iniciar sesión'],
  icqLogin: ['ICQ Login', 'ICQ-Anmeldung', 'Inicio de sesión de ICQ'],
  scanQr: ['Scan the code with WhatsApp on your phone to link this app.', 'Scanne den Code mit WhatsApp auf deinem Handy, um die App zu verknüpfen.', 'Escaneá el código con WhatsApp en tu teléfono para vincular la app.'],
  font: ['Font', 'Schriftart', 'Fuente'],
  changeFont: ['Change font', 'Schriftart ändern', 'Cambiar la fuente'],
  emoticons: ['Emoticons', 'Emoticons', 'Emoticonos'],
  nudge: ['Nudge', 'Anstupsen', 'Zumbido'],
  send: ['Send', 'Senden', 'Enviar'],
  fontNotice: ['Messenger fonts do not carry over to WhatsApp :)', 'Messenger-Schriftarten werden in WhatsApp nicht übertragen :)', 'Las fuentes de Messenger no viajan por WhatsApp :)'],
  chatTitle: ['{name} - Conversation', '{name} - Unterhaltung', '{name} - Conversación'],
  icqChatTitle: ['Message Session - {name}', 'Nachrichtenfenster - {name}', 'Sesión de mensajes - {name}'],
  you: ['You', 'Du', 'Vos'],
  typing: ['{name} is typing…', '{name} schreibt…', '{name} está escribiendo un mensaje…'],
  lastMessage: ['Last message received on {date} at {time}.', 'Letzte Nachricht am {date} um {time} empfangen.', 'Último mensaje recibido el {date} a las {time}.'],
  openChatFirst: ['Open a chat to send a nudge.', 'Öffne einen Chat, um jemanden anzustupsen.', 'Abrí una conversación para enviar un zumbido.'],
  waitBeforeNudge: ['Wait a moment before sending another nudge.', 'Warte kurz, bevor du erneut anstupst.', 'Esperá un poco antes de enviar otro zumbido.'],
  finishDraft: ['Send or clear your draft before sending a nudge.', 'Sende oder lösche deinen Entwurf, bevor du jemanden anstupst.', 'Enviá o borrá lo que estás escribiendo antes del zumbido.'],
  nudgeSent: ['You sent a nudge.', 'Du hast angestupst.', 'Enviaste un zumbido.'],
  nudgeReceived: ['{name} nudged you.', '{name} hat dich angestupst.', '{name} te envió un zumbido.'],
  says: ['{name} says:', '{name} sagt:', '{name} dice:'],
  saysSuffix: [' says:', ' sagt:', ' dice:'],
  contactList: ['My Contact List', 'Meine Kontaktliste', 'Mi lista de contactos'],
  to: ['To: ', 'An: ', 'Para: '],
  signedIn: ['{name} just signed in.', '{name} hat sich gerade angemeldet.', '{name} acaba de iniciar sesión.'],
  incomingMessage: ['Incoming Message', 'Neue Nachricht', 'Mensaje nuevo'],
  notification: ['Notification', 'Benachrichtigung', 'Aviso'],
  online: ['Online', 'Online', 'En línea'],
  msnOnline: ['Online', 'Online', 'Conectado'],
  busy: ['Busy', 'Beschäftigt', 'Ocupado'],
  brb: ['Be Right Back', 'Bin gleich zurück', 'Vuelvo enseguida'],
  away: ['Away', 'Abwesend', 'Ausente'],
  phone: ['On the Phone', 'Am Telefon', 'Al teléfono'],
  lunch: ['Out to Lunch', 'Beim Essen', 'Salí a comer'],
  offline: ['Offline', 'Offline', 'Desconectado'],
  ffc: ['Free for Chat', 'Bereit zum Chatten', 'Disponible para chatear'],
  na: ['N/A (Extended Away)', 'Länger abwesend', 'No disponible (ausencia prolongada)'],
  occupied: ['Occupied (Urgent Msgs)', 'Beschäftigt (nur dringend)', 'Ocupado (solo urgencias)'],
  dnd: ['DND (Do Not Disturb)', 'Nicht stören', 'No molestar'],
  invisible: ['Privacy (Invisible)', 'Unsichtbar', 'Privacidad (invisible)'],
  soundInstructions: ['Put your own sounds here to replace the bundled ones. You can also use .mp3 or .ogg with the same name.', 'Lege hier eigene Töne ab, um die mitgelieferten zu ersetzen. .mp3 und .ogg mit gleichem Namen funktionieren ebenfalls.', 'Poné acá tus propios sonidos para reemplazar los incluidos. También sirven .mp3 u .ogg con el mismo nombre.']
} satisfies Record<string, [string, string, string]>

type Message = keyof typeof messages
const column: Record<Locale, number> = { en: 0, de: 1, es: 2 }

export function translate(locale: Locale, key: Message, values: Record<string, string> = {}): string {
  return messages[key][column[locale]].replace(/\{(\w+)\}/g, (match, name: string) => values[name] ?? match)
}

export function translator(locale: Locale) {
  return (key: Message, values?: Record<string, string>): string => translate(locale, key, values)
}

export const MSN_STATUS: Record<MsnStatus, Message> = {
  online: 'msnOnline', busy: 'busy', brb: 'brb', away: 'away', phone: 'phone', lunch: 'lunch', offline: 'offline'
}

export const ICQ_STATUS: Record<IcqStatus, Message> = {
  online: 'online', ffc: 'ffc', away: 'away', na: 'na', occupied: 'occupied', dnd: 'dnd', invisible: 'invisible'
}
