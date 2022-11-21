"use strict";

var connection = new signalR.HubConnectionBuilder().withUrl("/chatHub").build();
connection.start().then(function () {
    if (localStorage.getItem('user')) {
        ShowChatSection();

    }

}).catch(function (err) {
    return console.error(err.toString());
});

let joinGroupForm = document.getElementById('joinGroupForm');
let joinGroupSection = document.getElementById('joinGroupSection');
let chatSection = document.getElementById('chatSection');
let leaveGroupBtn = document.getElementById('leaveGroupBtn');
let sendMessageForm = document.getElementById('sendMessageForm');

joinGroupForm.addEventListener("submit", function (element) {
    element.preventDefault();

    var user = {
        name: document.getElementById('username').value,
        group: document.getElementById('group').value
    }

    connection.invoke("AddToGroup", user.group).catch(function (err) {
       return console.error(err.toString());
    });


    localStorage.setItem('user', JSON.stringify(user))

    ShowChatSection();
})

leaveGroupBtn.addEventListener('click', function () {

    var user = localStorage.getItem('user');


    connection.invoke("RemoveFromGroup", user.group).catch(function (err) {
        return console.error(err.toString());
    });

    localStorage.removeItem('user');

    ShowGroupSection();

})


sendMessageForm.addEventListener("submit", function (element) {

    element.preventDefault();

    var user = JSON.parse(localStorage.getItem('user'));

    var message = document.getElementById('message').value;

    document.getElementById('message').value = '';


    connection.invoke("SendMessage", user.name, user.group, message).catch(function (err) {
       return console.error(err.toString());
    });

})


connection.on("ReceiveMessage", function (username, message) {
    var li = `  <li class="list-group-item">
                    <b>${username}</b>
                    <i>${message}</i>
                </li>`


    document.getElementById("messages").innerHTML +=li;
  
});


function ShowChatSection() {

    joinGroupSection.classList.add('d-none');
    chatSection.classList.remove('d-none');
}



function ShowGroupSection() {

    chatSection.classList.add('d-none');
    joinGroupSection.classList.remove('d-none');
}




//connection.start().then(function () {
//    document.getElementById("sendButton").disabled = false;
//}).catch(function (err) {
//    return console.error(err.toString());
//});

//document.getElementById("sendButton").addEventListener("click", function (event) {
//    var user = document.getElementById("userInput").value;
//    var message = document.getElementById("messageInput").value;
//    connection.invoke("SendMessage", user, message).catch(function (err) {
//        return console.error(err.toString());
//    });
//    event.preventDefault();
//});