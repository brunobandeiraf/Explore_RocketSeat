import { GithubUser } from "./GithubUser.js"

// classe que vai conter a lógica dos dados
// como os dados serão estruturados
export class Favorites {
  constructor(root) {
    //root = "#app"
    this.root = document.querySelector(root)
    // carrega os dados
    this.load()
  }

  load() {
    // Busca se tiver, ou retorna um array vazio
    this.entries = JSON.parse(localStorage.getItem('@github-favorites:')) || []
  }

  save() {
    localStorage.setItem('@github-favorites:', JSON.stringify(this.entries))
  }

  async add(username) {
    try { // try - tente

      // Verifica se já existe
      // Se ele encontrar, devolve um objeto e o usuário já existe
      const userExists = this.entries.find(entry => entry.login === username)

      if(userExists) {
        throw new Error('Usuário já cadastrado')
      }

      // Busca os dados do usuário na API do github
      // await aguarda a promessa
      const user = await GithubUser.search(username)

      if(user.login === undefined) {
        throw new Error('Usuário não encontrado!')
      }

      // ...this.entries - spread
      // add o user no começo, espalhando o que já tinha
      this.entries = [user, ...this.entries]
      this.update()
      this.save()

    } catch(error) { //catch - capture
      alert(error.message)
    }
  }

  delete(user) {
    // Higher-order functions (map, filter, find, reduce...)
    // filter busca todos, exceto o 
    const filteredEntries = this.entries
      .filter(entry => entry.login !== user.login)
      // verifica se o entry é diferente do user.login
      // se não for diferente, remove do array
      // retorna todos, exceto o que encontrar igual ao passado como parâmetro

    this.entries = filteredEntries
    this.update()
    this.save() // salva no localstorage
  }
}

// classe que vai criar a visualização e eventos do HTML
export class FavoritesView extends Favorites {
  constructor(root) {
    super(root)

    this.tbody = this.root.querySelector('table tbody')

    this.update()
    this.onadd()
  }

  // Evento do botão que dispara as funcionalidades
  onadd() {
    // Encontra o botão
    const addButton = this.root.querySelector('.search button')
    // Quando clicar no botão
    addButton.onclick = () => {
      // Pega o valor do input - digitado pelo usuário
      const { value } = this.root.querySelector('.search input')
      // Passa o valor digitado pelo usuário
      this.add(value)
    }
  }

  update() {
    // Remove todos os tr
    this.removeAllTr()

    this.entries.forEach( user => {
      // Inicialmente, criar toda a estrutura do html 
      const row = this.createRow()

      // Altera os elementos
      row.querySelector('.user img').src = `https://github.com/${user.login}.png`
      row.querySelector('.user img').alt = `Imagem de ${user.name}`
      row.querySelector('.user a').href = `https://github.com/${user.login}`
      row.querySelector('.user p').textContent = user.name
      row.querySelector('.user span').textContent = user.login
      row.querySelector('.repositories').textContent = user.public_repos
      row.querySelector('.followers').textContent = user.followers

      row.querySelector('.remove').onclick = () => {
        
        const isOk = confirm('Tem certeza que deseja deletar essa linha?')
        if(isOk) {
          this.delete(user) // lógica para deletar o conjunto
        }

      }

      // append - recebe um elemento criado com a DOM
      this.tbody.append(row)
    })
  }

  createRow() {
    const tr = document.createElement('tr')

    tr.innerHTML = `
      <td class="user">
        <img src="https://github.com/brunobandeiraf.png" alt="Imagem do Bruno Bandeira">
        <a href="https://github.com/brunobandeiraf" target="_blank">
          <p>Bruno Bandeira</p>
          <span>brunobandeira</span>
        </a>
      </td>
      <td class="repositories">
        76
      </td>
      <td class="followers">
        100
      </td>
      <td>
        <button class="remove">&times;</button>
      </td>
    `

    return tr
  }

  removeAllTr() {
    this.tbody.querySelectorAll('tr')
      .forEach((tr) => {
        tr.remove()
      })  
  }
}