
// localStorage.setItem("username","abcd")
let username = localStorage.getItem("username")

// Viewing canvas

var wt = new api.WhiteboardTeam('#wt-container', {
    clientId: '51a4013c35cc0835339357ada81f1458',
    boardCode: '61249e0-feca-4acb-8483-66cf47dad409-pz3r0',
    participant: {
        role : 'viewer',
        name : username //change this username with respect to login.
    },
    board: {
        tool: 'pen',

    }
});

// 