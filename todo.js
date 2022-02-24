
const $ = document.querySelector.bind(document)
const $$ = document.querySelectorAll.bind(document)

const list = $('.list-todo')
const btnCircle = $('.circle-plus')
const textTag = $('.number-task-list')
const textTagPc = $('.text-tag-pc.number-task-list')
const deleteTodo = $('.delete')
const todo = $('.text-nt')
const navBar = $('.icon-bar')
const overlay = $('#overlay')
const barMore = $('.bars-more')
const areaCreate = $('.area-create')
const areaText = $('.text-note')
const submit = $('.icon-tag.ok')

const areaTextPc = $('.text-note-pc')
const submitPc = $('.ok-pc')

let tagNameCurrent = 'My Day'

const listTodo = JSON.parse(localStorage.getItem('listTodo'))
if (listTodo) {
    listTodo.forEach(function (item) {
        addTodo(item)
    })
}

function addTodo(item) {
    const numberTodo = document.createElement('div')
    numberTodo.classList.add('number-todo', `${item.status}`)
    numberTodo.innerHTML = `
            <div class="box-check">
                <i class="check1 fa-solid fa-circle"></i>
                <i class="check2 fa-solid fa-circle-check"></i>
            </div>
            <p class="text-nt">${item.text}</p>
            <span class="delete">&times</span>
     `

    numberTodo.onclick = function (e) {
        numberTodo.classList.toggle('done')
        update()
    }

    numberTodo.querySelector('.delete').onclick = function (e) {
        numberTodo.remove()
        update()
    }

    list.appendChild(numberTodo)
    update()
}

function update() {
    const list = $$('.number-todo')
    const listTodo = []
    list.forEach(function (item) {
        listTodo.push({
            text: item.querySelector('.text-nt').innerText,
            status: item.classList.contains('done') ? 'done' : undefined
        })
    })

    localStorage.setItem('listTodo', JSON.stringify(listTodo))
    const html2 = `${tagNameCurrent} <span class="number-task">${listTodo.length}</span>`
    textTag.innerHTML = html2;
    textTagPc.innerHTML = html2;
}

submit.onclick = function (e) {
    const text = areaText.value.trim()
    if (text != '') {
        addTodo({ text, status: undefined })
    }

    areaText.value = ''
    areaText.focus()
}

navBar.onclick = function () {
    barMore.classList.add('fadeIn')
    overlay.classList.remove('hide')
    btnCircle.style.zIndex = '-1';
}

overlay.onclick = function (e) {
    if (e.target === e.currentTarget) {
        barMore.classList.remove('fadeIn')
        overlay.classList.add('hide')
        areaCreate.classList.remove('plusAmination')
        btnCircle.style.zIndex = '1';
    }
}

btnCircle.onclick = function () {
    areaCreate.classList.add('plusAmination')
    overlay.classList.remove('hide')
}


/* Pc */
submitPc.onclick = function (e) {
    const text = areaTextPc.value.trim()
    if (text != '') {
        addTodo({ text, status: undefined })
    }

    areaTextPc.value = ''
    areaTextPc.focus()
}