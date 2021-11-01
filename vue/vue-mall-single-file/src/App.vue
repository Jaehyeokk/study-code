<template>
  <div id="app">
    <header>
      <h2 class="container">검색</h2>
    </header>
    <div class="container">
      <!-- form -->
      <form-component :value="query" @@submit="onSubmit" @@reset="onReset"></form-component>
      <div v-if="submited">
        <!-- result -->
        <result-component :data="searchResult" :query="query"></result-component>
      </div>
      <div v-else>
        <!-- tabs -->
        <tab-component :tabs="tabs" :selected-tab="selectedTab" @@change="onClickTab"></tab-component>
        <!-- list -->
        <div v-if="selectedTab === tabs[0]">
          <!-- recommended search list -->
          <list-component :data="keywords" type="keywords" @@click="onClickKeyword"></list-component>
        </div>
        <div v-else>
          <!-- recent search list -->
          <list-component :data="history" type="history" @@click="onClickKeyword" @@remove="onClickRemoveHistory"></list-component>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SearchModel from './models/SearchModel.js'
import KeywordModel from './models/KeywordModel.js'
import HistoryModel from './models/HistoryModel.js'

import FormComponent from './components/FormComponent.vue'
import ResultComponent from './components/ResultComponent.vue'
import TabComponent from './components/TabComponent.vue'
import ListComponent from './components/ListComponent.vue'

export default {
  name: 'App',
  components: {
    FormComponent,
    ResultComponent,
    TabComponent,
    ListComponent,
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
      KeywordModel.list().then(data => {
        this.keywords = data
      })
    },
    fetchHistory() {
      HistoryModel.list().then(data => {
        this.history = data
      })
    }
  }
}
</script>

<style>
@import './assets/css/style.css';
</style>
