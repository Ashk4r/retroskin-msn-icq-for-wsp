# Retro Messenger for WhatsApp

Use WhatsApp Web in a desktop window styled like **MSN Messenger 7.5** or **ICQ 2000b**, complete with classic sounds, pop-up alerts, and window-shaking nudges. It’s a companion project to [Winamp Remote for TIDAL](https://github.com/Lisandro46/winamp-tidal).

> Retro Messenger is a free, open-source fan project. WhatsApp Web handles your chats and sign-in, while Retro Messenger supplies the interface. The project is unaffiliated with WhatsApp, Meta, Microsoft, and ICQ. The icons are handmade recreations, and the original MSN and ICQ sounds belong to their respective owners. [Sound credits](resources/sounds/CREDITOS.md)

## Languages

This branch adds **English, German, and Spanish** to the desktop interface. The app follows your system language by default, uses English for other languages, and remembers your selection. WhatsApp Web has its own language setting.

| Skin | Where to change the language |
|---|---|
| MSN Messenger | **Tools → Language** |
| ICQ | **Main → Preferences → Language** |
| Original WhatsApp | **Skin → Language** |

You can also change the language from the system tray menu. To try the multilingual build, follow the [development instructions](#development).

## Download and install

The links below point to the original project's releases for Windows, macOS, and Linux. [Project website](https://retro.trincherai.com) · [Upstream releases](https://github.com/Lisandro46/retroskin-msn-icq-for-wsp/releases/latest)

### Windows

Use the [Windows installer](https://github.com/Lisandro46/retroskin-msn-icq-for-wsp/releases/latest/download/Retro-Messenger-Setup.exe) or run the [portable version](https://github.com/Lisandro46/retroskin-msn-icq-for-wsp/releases/latest/download/Retro-Messenger-Portable.exe) without installing it.

1. Open the downloaded file. The installer creates a desktop shortcut and runs without administrator permissions.
2. The upstream installer is unsigned, so Windows may show **Windows protected your PC**. To proceed, select **More info → Run anyway**.
3. Open WhatsApp on your phone, go to **Linked devices → Link a device**, and scan the QR code in Retro Messenger.
4. Your session is saved. To switch between MSN and ICQ, open the skin menu.

Requires 64-bit Windows 10 or 11 and WhatsApp on your phone. To uninstall, find **Retro Messenger para WhatsApp** under **Settings → Apps**.

### macOS

Download for [Apple Silicon](https://github.com/Lisandro46/retroskin-msn-icq-for-wsp/releases/latest/download/Retro-Messenger-mac-arm64.dmg) or [Intel](https://github.com/Lisandro46/retroskin-msn-icq-for-wsp/releases/latest/download/Retro-Messenger-mac-x64.dmg). Check **Apple menu → About This Mac** to find your chip type.

1. Open the `.dmg` and drag **Retro Messenger para WhatsApp** into **Applications**.
2. The upstream build uses an ad-hoc signature. If macOS blocks it, Control-click the app and choose **Open**. If macOS reports that the app is damaged, run the following in Terminal and then reopen it.
   ```bash
   xattr -cr "/Applications/Retro Messenger para WhatsApp.app"
   ```
3. Scan the QR code from **Linked devices** in WhatsApp on your phone.

Requires macOS 12 or later.

### Linux

Choose the package for your distribution and run the command from your downloads folder.

- [**.deb**](https://github.com/Lisandro46/retroskin-msn-icq-for-wsp/releases/latest/download/Retro-Messenger-linux-amd64.deb) for Ubuntu, Debian, Mint, or Pop!_OS. Open the package in your software installer or use the command below.
  ```bash
  sudo apt install ./Retro-Messenger-linux-amd64.deb
  ```
- [**.rpm**](https://github.com/Lisandro46/retroskin-msn-icq-for-wsp/releases/latest/download/Retro-Messenger-linux-x86_64.rpm) for Fedora or openSUSE. Use the command below on Fedora.
  ```bash
  sudo dnf install ./Retro-Messenger-linux-x86_64.rpm
  ```
- [**AppImage**](https://github.com/Lisandro46/retroskin-msn-icq-for-wsp/releases/latest/download/Retro-Messenger-linux-x86_64.AppImage) runs directly after you make it executable.
  ```bash
  chmod +x Retro-Messenger-linux-x86_64.AppImage
  ./Retro-Messenger-linux-x86_64.AppImage
  ```
  If the AppImage reports a missing FUSE library, install `libfuse2` on Ubuntu 22.04 or `libfuse2t64` on Ubuntu 24.04. If it reports a sandbox error on Ubuntu 24.04, use the `.deb` package.

With the `.deb` or `.rpm` package, look for **Retro Messenger para WhatsApp** in your applications menu. Scan the QR code from **Linked devices** in WhatsApp on your phone.

Requires 64-bit Linux (x86_64). The system tray icon requires AppIndicator support. On GNOME, use the **AppIndicator and KStatusNotifierItem Support** extension.

## Features

| | MSN Messenger 7.5 | ICQ 2000b |
|---|---|---|
| Window | Blue Windows XP frame with File, Contacts, Actions, Tools, and Help menus | Beveled Windows 98 frame with **Main** and **Services** menus, an ICQuick sidebar, and a status bar |
| Profile | Display picture, editable nickname, status, and personal message above the contact list | Editable **ICQ#** and nickname with a flower icon for your status |
| Chat list | **Contacts** heading, neutral icons when presence is unknown, and orange unread counts | **My Contact List** heading, gray flowers when presence is unknown, and yellow notes for unread messages |
| Conversation | **“Juan says:”** instead of chat bubbles, photos on the right, a typing indicator, and a toolbar with Font, Emoticons, Nudge, and Send | Incoming names in red and yours in blue, a **Message Session** heading, and a **Send** button. Send a nudge from the menu or with `Ctrl+G`. |
| Sounds | Original new-message, sign-in, and nudge sounds | Original **“Uh-oh!”**, sign-in, and alert sounds |
| Extras | A fictional retro ad below the contact list and MSN-style pop-ups | Windows 98-style pop-ups |

The app also includes the **original WhatsApp** skin with a floating nudge button, a system tray icon, and taskbar alerts. On macOS, alerts bounce the Dock icon.

### Nudges

Select **Nudge** or press `Ctrl+G` to send `*ZUMBIDO*`. Your window shakes and plays a sound. Other Retro Messenger users see a nudge in their chosen language and get the same shake and sound if enabled. People using standard WhatsApp see **ZUMBIDO** in bold. You can send one nudge every ten seconds.

### Custom sounds

Open **Tools → Sounds folder…** in MSN or **Main → Preferences → Sounds folder…** in ICQ to find the sound folder.

- Windows `%APPDATA%\retro-messenger-whatsapp\sounds`
- macOS `~/Library/Application Support/retro-messenger-whatsapp/sounds`
- Linux `~/.config/retro-messenger-whatsapp/sounds`

Add a file such as `msn/message.wav`, `msn/nudge.wav`, `msn/online.wav`, or `icq/message.wav` to replace the bundled sound. Files with the same base name and an `.mp3` or `.ogg` extension work too. The app plays a synthesized sound when neither a custom nor a bundled file is available.

## Local profile

Your nickname, personal message, status, and ICQ number are stored on your computer and only appear in Retro Messenger.

## Development

Use Node.js 22.12 or later. Run these commands from the checkout for this branch.

```bash
npm ci
npm run dev           # Start the desktop app in development mode
npm run preview:retro # Preview the skins with sample data at http://127.0.0.1:4173
npm run typecheck
npm run dist:win      # Build the Windows installer and portable app in dist/
npm run dist:mac      # Build .dmg and .zip packages on macOS
npm run dist:linux    # Build AppImage, .deb and .rpm on Linux (requires rpmbuild for .rpm)
npm run icon          # Regenerate build/icon.png at 1024 px
npm run web:assets    # Regenerate screenshots and the sharing image for web/
```

`npm run dist` is an alias for `npm run dist:win`. See the [publishing guide](PUBLICAR.md) for website asset details.

Push a version tag such as `v0.3.0` to trigger the **Release** workflow, which builds packages for Windows, macOS, and Linux. To generate build artifacts only, run it manually from **Actions → Release → Run workflow**.

### How it works

- `src/main` manages the frameless Electron window and the `WebContentsView` that loads WhatsApp Web with a Chrome user agent and a persistent session. It also handles the tray, notifications, and window shake.
- `src/renderer` renders the title bar and menus for each skin and plays the bundled sounds from `resources/sounds`, with synthesized Web Audio fallbacks.
- `src/preload/whatsapp.ts` tags WhatsApp elements with `data-wm-*` attributes, adds the retro profile and chat controls, and detects nudges and new messages.
- `src/wa/selectors.ts` contains the selectors for WhatsApp Web. Start here if a WhatsApp update changes the page structure.
- `src/wa/css` contains the styles applied to WhatsApp Web.
- `src/shared/i18n.ts` contains the translations used by the desktop app and skins.

The preview runs the real templates, styles, and preload code against simulated WhatsApp markup. It is useful for checking layout with sample data. [First-stage notes](docs/ETAPA_1_FIDELIDAD.md) · [Full design plan](docs/PLAN_FIDELIDAD_RETRO.md)

## License

The project code is available under the [MIT License](LICENSE). See the [sound credits](resources/sounds/CREDITOS.md) for ownership details.
