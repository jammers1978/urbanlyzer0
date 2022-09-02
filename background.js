let color = '#3aa757';

chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.sync.set({ color });
  console.log('Default background color set to %cgreen', `color: ${color}`);
});

// A generic onclick callback function.
function genericOnClick(info, tab) {
  console.log("item " + info.menuItemId + " was clicked");
  console.log("info: " + JSON.stringify(info));
  console.log("tab: " + JSON.stringify(tab));
}

var cmid;

// Create one test item for each context type.
var contexts = ["selection"];
for (var i = 0; i < contexts.length; i++) {
  var context = contexts[i];
  var title = "Check highlighted item on Urban Dictionary";
  if (cmid != null){
    chrome.contextMenus.remove(cmid);
  }
  cmid = chrome.contextMenus.create({"title": title, "id":"contextUrbanLookUp","contexts":[context]});
  console.log("'" + context + "' item:" + cmid);
}


// Create a parent item and two children.
//var parent = chrome.contextMenus.create({"title": "Test parent item", "id":"context"+ Math.random()});
//var child1 = chrome.contextMenus.create(
 // {"title": "Child 1", "id":"context6"+ Math.random(),"parentId": parent});
//var child2 = chrome.contextMenus.create(
  //{"title": "Child 2", "id":"context5"+ Math.random(),"parentId": parent});
//console.log("parent:" + parent + " child1:" + child1 + " child2:" + child2);


// Create some radio items.
//function radioOnClick(info, tab) {
  //console.log("radio item " + info.menuItemId +
    //          " was clicked (previous checked state was "  +
      //        info.wasChecked + ")");
//}
//var radio1 = chrome.contextMenus.create({"title": "Radio 1", "type": "radio","id":"context0"+ Math.random()});
//var radio2 = chrome.contextMenus.create({"title": "Radio 2", "type": "radio","id":"context1"+ Math.random()});
//console.log("radio1:" + radio1 + " radio2:" + radio2);


// Create some checkbox items.
//function checkboxOnClick(info, tab) {
 // console.log(JSON.stringify(info));
  //console.log("checkbox item " + info.menuItemId +
    //          " was clicked, state is now: " + info.checked +
      //        "(previous state was " + info.wasChecked + ")");

//}
//var checkbox1 = chrome.contextMenus.create(
 // {"title": "Checkbox1", "type": "checkbox","id":"context2"+ Math.random()});
//var checkbox2 = chrome.contextMenus.create(
 // {"title": "Checkbox2", "type": "checkbox", "id":"context3"+ Math.random()});
//console.log("checkbox1:" + checkbox1 + " checkbox2:" + checkbox2);

chrome.contextMenus.onClicked.addListener(function(info, tab) {
  console.log("Clicked Motherfucker");
  console.log(info);
  console.log(tab);
  //document.getElementById("marquee").innerHTML = '<marquee>Hello! <span id="text">'+ info.selectionText +' Happy reading!</span></marquee>';
  //
  //var opt = {
    //iconUrl: "/images/get_started48.png",
    //type: 'list',
    //title: 'Primary Title',
    //message: 'Primary message to display',
    //priority: 1,
    //items: [{ title: 'Item1', message: 'This is item 1.'},
     //     { title: 'Item2', message: 'This is item 2.'},
    //        { title: 'Item3', message: 'This is item 3.'}]
  //};
  //chrome.notifications.create('notify1', opt, function() { console.log('created!'+chrome.runtime.lastError.message); });

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


// // Intentionally create an invalid item, to show off error checking in the
// // create callback.
// console.log("About to try creating an invalid item - an error about " +
//             "item 999 should show up");
// chrome.contextMenus.create({"title": "Oops", "parentId":999}, function() {
//   if (chrome.extension.lastError) {
//     console.log("Got expected error: " + chrome.extension.lastError.message);
//   }
// });