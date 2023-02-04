let color = '#3aa757';

chrome.runtime.onInstalled.addListener(() => {
chrome.storage.sync.set({ color });
console.log('Default background color set to %cgreen', `color: ${color}`);
});

// A generic onclick callback function.
function genericOnClick(info, tab) 
{
  console.log("item " + info.menuItemId + " was clicked");
  console.log("info: " + JSON.stringify(info));
  console.log("tab: " + JSON.stringify(tab));
}

var contextMenuId;

// Create one test item for each context type.
var contexts = ["selection"];
for (var i = 0; i < contexts.length; i++) {
  var context = contexts[i];
  var title = "Check highlighted item on Urban Dictionary";
  if (cmid != null)
  {
    chrome.contextMenus.remove(contextMenuId);
  }
  contextMenuId = chrome.contextMenus.create({"title": title, "id":"contextUrbanLookUp","contexts":[context]});
  console.log("'" + context + "' item:" + contextMenuId);
}

chrome.contextMenus.onClicked.addListener(function(info, tab) {
console.log("Clicked Motherfucker");
console.log(info);
console.log(tab);
 
chrome.tabs.create({
    url: 'https://www.urbandictionary.com/define.php?term='+info.selectionText,
    active: false
}, function(tab) {
    // After the tab has been created, open a window to inject the tab
    chrome.windows.create({
        tabId: tab.id,
        type: 'popup',
        focused: true
    });
});

})


