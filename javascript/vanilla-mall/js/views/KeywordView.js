import View from './View.js'

const tag = '[KeywordView]'

const KeywordView = Object.create(View)

KeywordView.setup = function (el) {
  this.init(el)
  return this
}

KeywordView.render = function (data = []) {
  this.el.innerHTML = data.length ? this.getKeywordsHtml(data) : '추천 검색어가 없습니다.'
  this.bindClickEvent()
  this.show()
  return this
}

KeywordView.getKeywordsHtml = function (data) {
  return data.reduce((html, item, index) => {
    html += `<li data-keyword="${item.keyword}">
      <span class="number">${index + 1}</span>
      ${item.keyword}
    </li>`
    return html
  }, '<ul class="list">') + '</ul>'
}

KeywordView.bindClickEvent = function () {
  Array.from(this.el.querySelectorAll('li')).forEach(li => {
    li.addEventListener('click', e => this.onclickKeyword(e))
  })
}

KeywordView.onclickKeyword = function (e) {
  const {keyword} = e.currentTarget.dataset
  this.emit('@click', {keyword})
}

export default KeywordView