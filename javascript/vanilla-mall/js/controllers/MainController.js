import FormView from '../Views/FormView.js'
import TabView from '../Views/TabView.js'
import ResultView from '../Views/ResultView.js'
import SearchModel from '../models/SearchModel.js'

const tag = '[MainController]'

export default {
  init() {
    FormView.setup(document.querySelector('form'))
      .on('@submit', e => this.onSubmit(e.detail.input))
      .on('@reset', e => this.onResetForm())

    TabView.setup(document.querySelector('#tabs'))
      .on('@change', e => this.onChangeTab(e.detail.tabName))

    ResultView.setup(document.querySelector('#search-result'))

    this.selectedTab = '추천 검색어'
    this.runderView()
    
  },

  runderView() {
    console.log(tag, '[renderView]')
    TabView.setActiveTab(this.selectedTab)
    ResultView.hide()
  },

  search(query) {
    console.log(tag, 'search()', query);
    // search API
    SearchModel.list(query).then(data => {
      this.onSearchResult(data)
    })
  },

  onSubmit(input) {
    console.log(tag, 'onSubmit()', input);
    this.search(input);
  },

  onResetForm() {
    console.log(tag, 'onResetForm()');
    ResultView.hide()
  },

  onSearchResult(data) {
    ResultView.render(data)
  },

  onChangeTab(tabName) {
    debugger
  }
}