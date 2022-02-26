
const $ = document.querySelector.bind(document)
const $$ = document.querySelectorAll.bind(document)

const list = $('.list-todo')
const tagImportant = $('.tag-important.content-tag-pc')
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
    numberTodo.setAttribute('mark', `${item.mark}`)
    numberTodo.classList.add('number-todo', `${item.status}`, `${item.mark}`)
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

function addTodoImportant() {
    const listTodoImportan = $$('.number-todo.Important')
    let htmls = ''
    listTodoImportan.forEach(function(item) {
        htmls += item.outerHTML
        item.onclick = function (e) {
            item.classList.toggle('done')
            update()
        }

        item.querySelector('.delete').onclick = function (e) {
            item.remove()
            update()
        }
    })

    tagImportant.innerHTML = htmls
}


function update() {
    const numberTodo = $$('.number-todo')
    const listTodo = []
    numberTodo.forEach(function (item) {
        listTodo.push({
            text: item.querySelector('.text-nt').innerText,
            status: item.classList.contains('done') ? 'done' : undefined,
            mark: item.getAttribute('mark')
        })
    })

    localStorage.setItem('listTodo', JSON.stringify(listTodo))
    const html2 = `${tagNameCurrent} <span class="number-task">${list.children.length}</span>`
    textTag.innerHTML = html2;
    textTagPc.innerHTML = html2;
}

submit.onclick = function (e) {
    const text = areaText.value.trim()
    if (text != '') {
        addTodo({ text, status: undefined, mark: undefined})
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
        areaCreate.classList.remove('plusAmination')
        btnCircle.style.zIndex = '1';
        listTagChoose.classList.add('hide')
        overlay.classList.add('hide')
    }
}

btnCircle.onclick = function () {
    areaCreate.classList.add('plusAmination')
    overlay.classList.remove('hide')
}


/* Pc */
submitPc.onclick = function (e) {
    const text = areaTextPc.value.trim()
    const mark = areaTextPc.getAttribute('mark') || 'Day'
    if (text != '') {
        addTodo({ text, status: undefined, mark})
    }

    areaTextPc.value = ''
    areaTextPc.focus()
}

const iconTag = $('.icon-tag-pc')
const bookmarkList = $$('.list-tag-choose li')

bookmarkList.forEach(function (item) {
    item.onclick = function (e) {
        if (item.innerText == 'My Day') {
            areaTextPc.setAttribute('mark', 'Day')
            iconTag.classList.remove('background-color-important')
        }
        else  {
            areaTextPc.setAttribute('mark', `${item.innerText}`)
            iconTag.classList.add('background-color-important')
        }
        listTagChoose.classList.add('hide')
        overlay.classList.remove('overlay-list-tag')
        overlay.classList.add('hide')
    }
})


const listTag = $$('.tag-pc')
const listContentTag = $$('.content-tag-pc')

listTag.forEach((item, index) => {
    const contentTag = listContentTag[index]
    item.onclick = (e) => {
        $('.tag-pc.current').classList.remove('current')
        $('.content-tag-pc.current').classList.remove('current')

        item.classList.add('current')
        contentTag.classList.add('current')

        $('.text-tag-pc.number-task-list').innerHTML = `${item.querySelector('.text-tag').innerText}`

        if (contentTag.classList.contains('list-todo')) {
            const span = document.createElement('span')
            span.classList.add('number-task')
            span.innerHTML = `${list.children.length}`
            $('.text-tag-pc.number-task-list').appendChild(span)
        }

        if (contentTag.classList.contains('tag-important')) {
            addTodoImportant()
        }
        else {
            tagImportant.innerHTML = '';
        }

    }
})

const iconTagPc = $('.icon-tag-pc')
const listTagChoose = $('.list-tag-choose')
iconTagPc.onclick = function(e) {
    listTagChoose.classList.remove('hide')
    listTagChoose.classList.add('overlay-list-tag')
    overlay.classList.remove('hide')
    overlay.classList.add('overlay-list-tag')
}