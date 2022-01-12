document.addEventListener('DOMContentLoaded', function() {

  // Use buttons to toggle between views
  document.querySelector('#inbox').addEventListener('click', () => load_mailbox('inbox'));
  document.querySelector('#sent').addEventListener('click', () => load_mailbox('sent'));
  document.querySelector('#archived').addEventListener('click', () => load_mailbox('archive'));
  document.querySelector('#compose').addEventListener('click', compose_email);

  document.querySelector('#send').addEventListener('click',function(){sent()});

  // By default, load the inbox
  load_mailbox('inbox');
});
 
function compose_email() {

  // Show compose view and hide other views
  document.querySelector('#emails-view').style.display = 'none';
  document.querySelector('#compose-view').style.display = 'block';

  // Clear out composition fields
  document.querySelector('#compose-recipients').value = '';
  document.querySelector('#compose-subject').value = '';
  document.querySelector('#compose-body').value = '';

  //Send Mail
  
    

  }


function sent(){
  fetch('/emails',{
      method: 'POST',
      body: JSON.stringify({
        recipients: document.querySelector('#compose-recipients').value,
        subject: document.querySelector('#compose-subject').value,
        body: document.querySelector('#compose-body').value
      })
    })
    .then(response => response.json())
    .then(result => {
      console.log(result);
    })
    .then(()=>load_mailbox('sent'))
    .catch(error => {
      alert(error);
    });
}

function load_mailbox(mailbox) {
  
  // Show the mailbox and hide other views
  document.querySelector('#emails-view').style.display = 'block';
  document.querySelector('#compose-view').style.display = 'none';
  document.querySelector('#content-view').style.display = 'none';

  // Show the mailbox name
  document.querySelector('#emails-view').innerHTML = `<h3>${mailbox.charAt(0).toUpperCase() + mailbox.slice(1)}</h3>`;

  fetch(`/emails/${mailbox}`)
  .then(response=>response.json())
  .then(emails => {
    console.log(emails);
    emails.forEach(add_email);
  });

  function add_email(email){
    const email_box = document.createElement('div');
    email_box.className = 'emails';
    const subject = document.createElement('div');
    subject.className = 'subject';
    subject.innerHTML = `${email.subject}`



    //show the inbox
    if (mailbox === 'inbox'){
      const sender = document.createElement('div');
      sender.className = 'sender';
      sender.innerHTML = 'From:' + '&#160;'+`${email.sender}`
      const timestamp = document.createElement('div');
    timestamp.className = 'timestamp';
    timestamp.innerHTML = `${email.timestamp}`

    email_box.append(sender,subject,timestamp);
    
    document.querySelector('#emails-view').append(email_box);

     //check for read
    if (email.read === true){
      email_box.style.backgroundColor = "white";
    }
    else{
      email_box.style.backgroundColor = "#D3D3D3";
    }

    }

    //show the sent box
    else if(mailbox === 'sent'){
      const recipient = document.createElement('div');
      recipient.className = 'recipient';
      recipient.innerHTML = 'To:';
      for(let i=0;i<email.recipients.length;++i){
        if (i === email.recipients.length-1){
          recipient.innerHTML += '&#160;' + `${email.recipients[i]}`;
        }
        else{
          recipient.innerHTML += '&#160;' + `${email.recipients[i]},`;
        }
        
      }
      const timestamp = document.createElement('div');
      timestamp.className = 'timestamp';
      timestamp.innerHTML = `${email.timestamp}`

      email_box.append(recipient,subject,timestamp);
    
      document.querySelector('#emails-view').append(email_box);

    }

    else if(mailbox === "archive"){
      if(`${email.archived}` === "true")
      {
        const sender = document.createElement('div');
      sender.className = 'sender';
      sender.innerHTML = 'From:' + '&#160;'+`${email.sender}`
      const timestamp = document.createElement('div');
    timestamp.className = 'timestamp';
    timestamp.innerHTML = `${email.timestamp}`

    email_box.append(sender,subject,timestamp);
    
    document.querySelector('#emails-view').append(email_box);
    }
    
      }
      
    
   

   
   email_box.addEventListener('click',function(){
    viewEmail(email.id,mailbox);
    
   }) 
  }



}

//view content of an email
function viewEmail(id,mailbox){
  fetch(`/emails/${id}`)
  .then(response => response.json())
  .then(email => {
    console.log(email);
    showEmail(email,mailbox);
  });

  document.querySelector('#emails-view').style.display = 'none';
  document.querySelector('#compose-view').style.display = 'none';
  document.querySelector('#content-view').style.display = 'block';

  if (document.querySelector('.SeeOnlyOnce')){
   var e = document.querySelector('.SeeOnlyOnce');
  var child = e.lastElementChild;
  while(child){
    e.removeChild(child);
    child = e.lastElementChild;
  }
  e.remove(); 
  }
  

  function showEmail(email,mailbox){
    const box = document.createElement('div');
    box.className = 'SeeOnlyOnce';
    const from = document.createElement('div');
    from.innerHTML = "<b>From: </b>";
    from.innerHTML += `${email.sender}`

    
    const to = document.createElement('div');
    to.innerHTML = "<b>To: </b>";
    for(let i=0;i<email.recipients.length;++i){
        if (i === email.recipients.length-1){
          to.innerHTML += `${email.recipients[i]}`;
        }
        else{
          to.innerHTML +=`${email.recipients[i]},`;
        }
        
      }

      if (mailbox === "inbox"){
        fetch(`/emails/${email.id}`, {
  method: 'PUT',
  body: JSON.stringify({
      read: true
  })
})
      }
     
    
    const subject = document.createElement('div');
    subject.innerHTML = "<b>Subject: </b>";
    subject.innerHTML += `${email.subject}`

    const time = document.createElement('div');
    time.innerHTML = "<b>Timestamp: </b>";
    time.innerHTML += `${email.timestamp}`

    if (mailbox === "inbox"){
      var reply = document.createElement('div');
    reply.innerHTML = "<button id='reply' class='btn btn-sm btn-outline-primary'>Reply</button>";
    reply.innerHTML += '&#160;' + '&#160;' + "<button id='archive' type='button' class='btn btn-sm btn-outline-primary'>Archive</button>";
    reply.innerHTML += "<br>" + "<br>" + "<hr>";

   
    }
    else if(mailbox === "sent"){
      time.innerHTML += "<br>" + "<br>" + "<hr>";
    }
    else{
      time.innerHTML += "<br>" + "<button id='unarchive' type='button' class='btn btn-sm btn-outline-primary'>Unarchive</button>"+ "<br>" + "<br>" + "<hr>";
        
    }
    

    const body = document.createElement('div');
    body.innerHTML = `${email.body}`;



    document.querySelector('#content-view').append(box);

    if (reply){
      box.append(from,to,subject,time,reply,body);
       document.querySelector('#archive').addEventListener('click',function(){
      fetch(`/emails/${email.id}`, {
  method: 'PUT',
  body: JSON.stringify({
      archived: true
  })
})
     .then(load_mailbox('inbox')); 
    })
     }
     else{
      box.append(from,to,subject,time,body);
      document.querySelector('#unarchive').addEventListener('click',function(){
      fetch(`/emails/${email.id}`, {
  method: 'PUT',
  body: JSON.stringify({
      archived: false
  })
})
     .then(load_mailbox('inbox')); 
    })

    }

   document.querySelector('#reply').addEventListener('click',function(){
    // Show compose view and hide other views
  document.querySelector('#emails-view').style.display = 'none';
  document.querySelector('#content-view').style.display = 'none';
  document.querySelector('#compose-view').style.display = 'block';

  // Reply
  document.querySelector('#compose-recipients').value = `${email.sender}`;
  
  
  if (`${email.subject}`.substr(0,3) === "Re:" ){
    document.querySelector('#compose-subject').value = `${email.subject}`;
  }
  else{
    document.querySelector('#compose-subject').value = "Re: ";
  document.querySelector('#compose-subject').value += `${email.subject}`;
  }
  
  document.querySelector('#compose-body').value = "\n" +"\n---------------------------------------------------------------------------\n" + `${email.timestamp}` + ' ';
  document.querySelector('#compose-body').value += `${email.sender}` + ' '+ "wrote: " + `${email.body}`;

  //Send Mail
  


   })    

    }
    
    

  }

