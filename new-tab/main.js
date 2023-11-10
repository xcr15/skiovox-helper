import { DraggableElement } from "./draggable-element.js";
import { FullscreenElement } from "./fullscreen-element.js";
import { HTMLContent } from "./html-content.js"; 

const FILES_URL = "chrome://file-manager";
const HELP_URL = `data:text/html,${HTMLContent.initilize()}`; // TODO
const WEBSTORE_URL = "https://chromewebstore.google.com";
const ADDSESSION_URL = "https://accounts.google.com/signin/v2/identifier?hl=en&continue=https%3A%2F%2Fwww.google.com%2F&ec=GAlAmgQ&flowName=GlifWebSignIn&flowEntry=AddSession";

let [
    files,
    help,
    webStore,
    addAccount,
    move,
    fullscreen
] = document.querySelectorAll('svg')

files.addEventListener('click', () => {
    chrome.tabs.create({}, (tab) => {
        chrome.tabs.update(tab.id, { url: FILES_URL })
    })
})

help.addEventListener('click', () => {
    chrome.tabs.create({ url: HELP_URL })
})

webStore.addEventListener('click', () => {
    let version = Number(navigator.appVersion.match(/Chrom(e|ium)\/([0-9]+)/)[2]);
    if (version <= 112) {
        // not sure if this is actually the version
        alert("This web store may not supported by your version");
    }

    chrome.tabs.create({ url: WEBSTORE_URL })
});

addAccount.addEventListener('click', () => {
    chrome.tabs.create({ url: ADDSESSION_URL })
})

new DraggableElement(move);
new FullscreenElement(fullscreen);
