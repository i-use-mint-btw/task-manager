/* const user = {
    email: "joelgill234985843@gmail.com",
    password: "needanewpass234434"
}

// fetch({method: "POST", url: "http://localhost:2680/register", body: JSON.stringify(user)})
fetch("http://localhost:2680/api/users/login", {method: "POST", body: JSON.stringify(user), credentials: "include"})
    .then(res => {
        console.log(res.status, res.statusText, res.headers)
        return res.text()
    })
    .then(text => console.log(text))
    .then(() => {
        fetch("http://localhost:2680/api/boards")
            .then(res => {
                console.log(res.status)
                return res.text()
            })
            .then(text => console.log(text))
    }) */

fetch("http://localhost:2680/api/boards", {credentials: "include"})
    .then(res => res.json())
    .then(payload => {
        console.log(payload)
        document.getElementById("main-content").textContent = JSON.stringify(payload)
    })