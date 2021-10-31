import SearchModel from './models/SearchModel.js'
import KeywordsModel from './models/KeywordModel.js'
import HistoryModel from './models/HistoryModel.js'

import FormComponent from './components/FormComponent.js'
import ResultComponent from './components/ResultComponent.js'
import ListComponent from './components/ListComponent.js'
import TabComponent from './components/TabComponent.js'

new Vue({
  el: '#app',
  components: {
    'search-form': FormComponent,
    'search-result': ResultComponent,
    'list': ListComponent,
    'tabs': TabComponent,
  },
  data() {
    return {
      query: '',
      submited: false,
      tabs: ['추천 검색어', '최근 검색어'],
      selectedTab: '',
      keywords: [],
      history: [],
      searchResult: [],
    }
  },
  created() {
    this.selectedTab = this.tabs[0]
    this.fetchKeyword()
    this.fetchHistory()
  },
  methods: {
    onSubmit(val) {
      this.query = val
      this.search()
    },
    onReset() {
      this.query = ''
      this.submited = false
      this.searchResult = []
    },
    onClickTab(tab) {
      this.selectedTab = tab
    },
    onClickKeyword(keyword) {
      this.query = keyword
      this.search(keyword)
    },
    onClickRemoveHistory(keyword) {
      HistoryModel.remove(keyword)
      this.fetchHistory()
    },
    search() {
      SearchModel.list().then(data => {
        this.submited = true
        this.searchResult = data
      })
      HistoryModel.add(this.query)
      this.fetchHistory()
    },
    fetchKeyword() {
      KeywordsModel.list().then(data => {
        this.keywords = data
      })
    },
    fetchHistory() {
      HistoryModel.list().then(data => {
        this.history = data
      })
    }
  }
})