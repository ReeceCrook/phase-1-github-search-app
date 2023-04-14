const form = document.querySelector('#github-form')
const userList = document.querySelector('#user-list')
const repoList = document.querySelector('#repos-list')

form.addEventListener('submit', (e) => {
    e.preventDefault()
    userList.innerHTML = ''

    fetch(`https://api.github.com/search/users?q=${e.target[0].value}`)
    .then(res => res.json())
    .then(res => {
        res.items.map(item => {
            const li = document.createElement('li')
            
            const h1 = document.createElement('h1')
            h1.addEventListener('click', e => userRepoHandler(item.login, e))
           
            const img = document.createElement('img')
            img.src = item.avatar_url

            const a = document.createElement('a')
            a.href = item.html_url
            a.innerText = item.login
           
        
            h1.append(a)
            li.append(h1, img)
            userList.append(li)
            
            
        })
        
    })
    form.reset()
})

function userRepoHandler(name, e) {
    e.preventDefault()
    repoList.innerHTML = ''

    fetch(`https://api.github.com/users/${name}/repos`)
    .then(res => res.json())
    .then(res => res.map(repo => {
        const li = document.createElement('li')
        const h3 = document.createElement('h3')
        h3.textContent = repo.name

        li.append(h3)
        repoList.append(li)
    }))
}