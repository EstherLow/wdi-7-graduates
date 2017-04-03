<template>
<div class="ui container">
  <div class="ui two column grid">
    <div class="column">
      <div class="ui floating dropdown labeled icon button" id="show-button">
        <i class="filter icon"></i>
        <span class="text">Filter Project</span>
        <div class="menu" id="projects-list">
          <div class="item" v-for="option in options" v-bind:value="option.value" v-on:click="filterProject(option.value)">{{ option.text }}</div>
        </div>
      </div>
    </div>
    <div class="column">
        <button class='ui red button' v-on:click="clearFilter()">Clear Filter</button>
    </div>
  </div>

  <div class="ui three stackable cards" v-show="showResults" id="project-cards">
      <div class="card" v-for="project in filteredProjects">
        <div class="content">
          <div class="header">{{ project.repoName }}</div>
          <h4 class="ui sub header">{{project.githubLogin}} </h4>
        </div>
        <div class="extra content">
          <a class="ui bottom attached pink button" v-bind:href="project.deployedUrl">
            Click to open project
          </a>
        </div>
      </div>

  </div>

</div>
</template>
<script>
  import axios from 'axios'

  export default {
    name: 'search',
    data () {
      return {
        options: [{text: 'project1', value:'project1'},
                  {text: 'project2', value:'project2'},
                  {text: 'project3', value:'project3'}],
        filteredProjects: {},
        allProjects: {},
        showResults: false
      }
    },
    created: function () {
      let vm = this
      this.$bus.$on('showProfile', function () {
        if (vm.showResults === true) {
          vm.showResults = false
        }
      })
    },
    mounted: function (){
	     $(this.$el).find('.dropdown').dropdown();
     },
    methods: {
      filterProject: function (value) {
        let keyword = this.selected || value
        let vm = this;
        axios.get('https://raw.githubusercontent.com/wdi-sg/alumni/master/data.json')
        .then(function (response) {
          let filtered = {}
          let data = response.data
          for (let i = 0; i < data.length; i++) {
            if (data[i].hasOwnProperty(keyword)) {
              console.log(data[i][keyword])
              data[i][keyword].githubLogin = data[i].githubLogin
              filtered[data[i].githubLogin] = data[i][keyword]
            }
            console.log('filtered', filtered)
          }
          vm.showResults = true
          return vm.filteredProjects = filtered
        })
        .catch(function (error) {
          console.log(error)
        })
      },
      clearFilter: function () {
        this.showResults = false
      }
    }
  }

</script>

<style scoped>
  #search-bar {
    width: 100%;
  }

</style>
