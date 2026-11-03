// Service-Worker: öffnet Tabs an der eingestellten Position, startet das
// E-Mail-Programm und schaltet die Erweiterung über den Toolbar-Button an/aus.
'use strict';

importScripts('shared/settings.js');

const S = globalThis.HSLD.settings;
const TAB_GROUP_NONE = -1;
const ICON_SIZES = [16, 32];
const SVG_KEY_PREFIX = 'svg:';  // muss zu viewer/svg.js passen
const MAX_STORED_SVGS = 30;

// ---------- Tabs öffnen ----------

// Mehrere Tabs rechts vom Ursprungstab reihen sich in Öffnungsreihenfolge ein
// (wie bei Mittelklick). Gemerkt wird der zuletzt geöffnete Tab; ein Tabwechsel
// setzt die Reihe zurück. storage.session überlebt das Schlafen des Workers.
async function rightIndex(origin) {
  const { lastOpened } = await chrome.storage.session.get('lastOpened');
  if (lastOpened && lastOpened.originId === origin.id) {
    try {
      const last = await chrome.tabs.get(lastOpened.tabId);
      if (last.windowId === origin.windowId && last.index > origin.index) return last.index + 1;
    } catch (e) { /* Tab inzwischen geschlossen */ }
  }
  return origin.index + 1;
}

async function createTab(origin, url, active) {
  const { tabPosition } = await S.load();
  const props = { url, active, openerTabId: origin.id, windowId: origin.windowId };
  if (tabPosition === 'right') props.index = await rightIndex(origin);
  else if (tabPosition === 'left') props.index = origin.index;

  const tab = await chrome.tabs.create(props);

  if (tabPosition === 'right') {
    await chrome.storage.session.set({ lastOpened: { originId: origin.id, tabId: tab.id } });
  }
  // Neben dem Ursprungstab bleibt der neue Tab in dessen Tab-Gruppe.
  if (tabPosition !== 'end' && origin.groupId !== undefined && origin.groupId !== TAB_GROUP_NONE) {
    try {
      await chrome.tabs.group({ groupId: origin.groupId, tabIds: tab.id });
    } catch (e) { /* Gruppe existiert nicht mehr */ }
  }
  return tab;
}

async function handleRequest(request, origin) {
  switch (request.action) {
    case 'open':
      await createTab(origin, request.url, request.active);
      break;
    case 'search': {
      // Chrome-Standardsuchmaschine: erst Tab an der richtigen Stelle anlegen, dann darin suchen.
      const tab = await createTab(origin, 'about:blank', request.active);
      await chrome.search.query({ text: request.query, tabId: tab.id });
      break;
    }
    case 'openSvg': {
      const id = await storeSvg(request.svg);
      await createTab(origin, chrome.runtime.getURL(`viewer/svg.html#${id}`), request.active);
      break;
    }
    case 'mail':
      // Externes Protokoll: Chrome übergibt an das E-Mail-Programm, die Seite bleibt erhalten.
      await chrome.tabs.update(origin.id, { url: request.url });
      break;
  }
}

// ---------- SVG-Grafiken für die Anzeigeseite ----------

// Inline-SVGs haben keine Adresse. Der Inhalt wird in storage.session abgelegt
// (bis zum Browser-Neustart) und von viewer/svg.html angezeigt; nur die neuesten bleiben.
async function storeSvg(svg) {
  const all = await chrome.storage.session.get(null);
  const old = Object.keys(all)
    .filter((key) => key.startsWith(SVG_KEY_PREFIX))
    .sort((a, b) => all[b].time - all[a].time)
    .slice(MAX_STORED_SVGS - 1);
  if (old.length) await chrome.storage.session.remove(old);

  const id = crypto.randomUUID();
  await chrome.storage.session.set({ [SVG_KEY_PREFIX + id]: { svg, time: Date.now() } });
  return id;
}

chrome.runtime.onMessage.addListener((request, sender) => {
  if (!sender.tab || !request || typeof request.action !== 'string') return;
  handleRequest(request, sender.tab).catch((e) => console.warn('HSLinkDrag:', e));
});

chrome.tabs.onActivated.addListener(() => {
  chrome.storage.session.remove('lastOpened');
});

// ---------- Toolbar-Button: Ein/Aus ----------

function iconPaths(enabled) {
  const paths = {};
  for (const size of ICON_SIZES) paths[size] = `/icons/icon-${size}${enabled ? '' : '-off'}.png`;
  return paths;
}

async function updateAction(enabled) {
  await chrome.action.setIcon({ path: iconPaths(enabled) });
  await chrome.action.setBadgeText({ text: enabled ? '' : chrome.i18n.getMessage('badgeOff') });
  await chrome.action.setBadgeBackgroundColor({ color: '#777' });
  await chrome.action.setTitle({ title: chrome.i18n.getMessage(enabled ? 'actionTitleOn' : 'actionTitleOff') });
}

chrome.action.onClicked.addListener(async () => {
  const { enabled } = await S.load();
  await chrome.storage.sync.set({ enabled: !enabled });
});

chrome.storage.onChanged.addListener((changes, area) => {
  if (area === 'sync' && changes.enabled) updateAction(changes.enabled.newValue !== false);
});

function syncActionWithSettings() {
  S.load().then(({ enabled }) => updateAction(enabled)).catch((e) => console.warn('HSLinkDrag:', e));
}

chrome.runtime.onStartup.addListener(syncActionWithSettings);
chrome.runtime.onInstalled.addListener(syncActionWithSettings);
