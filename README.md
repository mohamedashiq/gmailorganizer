# gmailorganizer

ref : https://www.johneday.com/422/time-based-gmail-filters-with-google-apps-script

Go to https://script.google.com , create a script for a Blank Project, and paste the code below into the editor. You may edit the delayDays variable to specify how many days should pass before the matched messages will be moved to the trash.

After you save your script, run it by either clicking the play button or by selecting it from the Run menu at the top of the screen. Authorize the script to access your Gmail account, then schedule the interval in which you would like the script to run. Select Current script’s triggers… from the Resources menu and select a period, I chose every 30 minutes.



Notice that your Trash is now filled with old messages, previously destined to collect dust in your Inbox. To save one of your “delete me” messages, simply remove the label.

Time-based filters can also be used to auto-archive emails older than x days. You can simplify your javascript function by using the search method to combine several advanced search operators. For example, using the script below I can archive every thread in my Inbox that is read, older than two days, and not labeled “delete me”.

function archiveInbox() {
// Every thread in your Inbox that is read, older than two days, and not labeled "delete me".
var threads = GmailApp.search('label:inbox is:read older_than:2d -label:"delete me"');
  for (var i = 0; i < threads.length; i++) {
    threads[i].moveToArchive();
}
}
Deleting or archiving thousands of messages may take some time. You can speed things up and minimize “Exceeded maximum execution time” errors by processing threads in batches of 100. Here are several examples:

Batch Delete Functions

function batchDeleteA() {
  var batchSize = 100 // Process up to 100 threads at once
  var threads = GmailApp.search('label:"delete me" older_than:2d');
  for (j = 0; j < threads.length; j+=batchSize) {
    GmailApp.moveThreadsToTrash(threads.slice(j, j+batchSize));
  }
}
 
function batchDeleteB() {
  var mySearch = "'label:\"delete me\" older_than:2d'"
  var batchSize = 100 // Process up to 100 threads at once
  while (GmailApp.search(mySearch, 0, 1).length == 1)
  {
    GmailApp.moveThreadsToTrash(GmailApp.search(mySearch, 0, batchSize));
  }  
}
 
function batchDeletePromotions() {
  // include one or more categories below
  // valid categories include ["primary", "promotions", "social", "updates", "forums"];  
  // category descriptions: https://support.google.com/mail/answer/3094596?hl=en
  var categories = ["social", "promotions", "forums"];
   
  var batchSize = 100 // Process up to 100 threads at once
  for (i = 0; i < categories.length; i++) {
    var threads = GmailApp.search('label:inbox category:'+categories[i]+' older_than:2d');
    for (j = 0; j < threads.length; j+=batchSize) {
      GmailApp.moveThreadsToTrash(threads.slice(j, j+batchSize));
    }
  }
}
 
function multipleLabels() {
  var myLabels = {'"delete me"': "2d", '"scripts"': "5d"};
  var batchSize = 100; // Process up to 100 threads at once
  for(aLabel in myLabels)
  {
    var threads = GmailApp.search('label:'+aLabel+' older_than:'+myLabels[aLabel]+'');
    for (j = 0; j < threads.length; j+=batchSize) {
      GmailApp.moveThreadsToTrash(threads.slice(j, j+batchSize));
    }
  }  
}

Batch Archive Functions

function batchArchiveA() {
  var batchSize = 100 // Process up to 100 threads at once
  var threads = GmailApp.search('label:inbox is:read older_than:1d -label:"delete me"');
  for (j = 0; j < threads.length; j+=batchSize) {
    GmailApp.moveThreadsToArchive(threads.slice(j, j+batchSize));
  }
}
 
function batchArchiveB() {
  var mySearch = "'label:inbox is:read older_than:2d -label:\"delete me\"'"
  var batchSize = 100 // Process up to 100 threads at once
  while (GmailApp.search(mySearch, 0, 1).length == 1)
  {
    GmailApp.moveThreadsToArchive(GmailApp.search(mySearch, 0, batchSize));
  }  
}
Other Functions

function markMutedThreadsRead() {
  // mark muted threads as read and remove label
  var labelName= "my label",
      batchSize = 100,
      threadLabel = GmailApp.getUserLabelByName(labelName),
      threads = GmailApp.search('is:muted');
   
  for (j = 0; j < threads.length; j+=batchSize) {
      GmailApp.markThreadsRead(threads.slice(j, j+batchSize));
      if (threadLabel) {
        threadLabel.removeFromThreads(threads.slice(j, j+batchSize));
  }
  } 
}
