function moveByDate() {
  var threads = GmailApp.search('label:inbox is:unread older_than:2d');
  var timeZone = 'CST';
  for (var i = 0; i < threads.length; i++) {
   var date = new Date(threads[i].getLastMessageDate());
   var year =  Utilities.formatDate(date, timeZone, 'yyyy');
   var month = Utilities.formatDate(date, timeZone, 'MM');
   var day = Utilities.formatDate(date, timeZone, 'dd');
   var labels = [year,month,day];
   var gmail, label = "";
  
    for (var i=0; i<labels.length; i++) {  
      if (labels[i] !== "") {
        label = label + ((i===0) ? "" : "/") + labels[i];
        gmail = GmailApp.getUserLabelByName(label) ? 
          GmailApp.getUserLabelByName(label) : GmailApp.createLabel(label);
        
      }
    
    }
    threads[i].addLabel(gmail);
  
  }
}
