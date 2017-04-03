<template>
<div class="ui container">


  <div class="ui items">
    <div class="item" v-for="profile in profiles">
      <div class="ui small image">
        <img v-bind:src="profile.avatar_url">
      </div>
      <div class="content">
        <div class="header" v-if='profile.name'>{{ profile.name}} </div>
        <div class="header" v-else>{{ profile.login}} </div>
        <div class="meta">
          <span>Description</span>
        </div>
        <div class="description">
          <p>{{ profile.bio}}</p>
          <p> Github URL: <a class="item" v-bind:href="profile.html_url"> {{ profile.html_url }} </a> </p>
        </div>
      </div>
    </div>
  </div>



</div>
</template>

<script>
  import axios from 'axios'

  export default {
    name: 'alumnis',
    data () {
      return {
        alumnis: [],
        selectedBatch: '',
        batches:[],
        filterBool: false,
        tempArr: [],
        profiles: []
      }
    },
    created: function () {
      let vm = this
      axios.get('https://raw.githubusercontent.com/wdi-sg/alumni/master/data.json')
      .then(function (response) {
        vm.alumnis = response.data
        let b = ['Show all batches']
        let tempProfile = []
        for (let i = 0; i < vm.alumnis.length; i++) {
          let batchNum = vm.alumnis[i].batch
          if (b.indexOf(batchNum) === -1) {
            b.push(batchNum)
          }

          let username = vm.alumnis[i].githubLogin
          axios.get('https://api.github.com/users/' + username + '?access_token=f4a57a2b13ca28eef00bfbf2e7f3319be78433d2').then(function (response){
            tempProfile.push(response.data)
          }).catch(function (error) { console.log(error) })
          console.log('tempProfile', tempProfile);
        }
        vm.batches = b
        vm.profiles = tempProfile
        console.log('this is profiles', vm.profiles);
      })
      .catch(function (error) {
        console.log(error)
      })
    },
    methods: {
      getUser: function (name) {
          let username = name
          console.log(username)
          this.$bus.$emit('showProfile', username)
        },
      filterBatch: function () {
        let keyword = this.selectedBatch
        let alumnis = this.alumnis
        console.log('keyword', keyword);
        // console.log('alumnis', alumnis);
        let temp = []
        for (let i = 0; i < alumnis.length; i++) {
        if (keyword === "Show all batches") {
          console.log('alumnis in if', alumnis);
          return this.tempArr = this.alumnis
        } else if (alumnis[i].batch === keyword) {
          temp.push(alumnis[i])
          }
        }
        this.tempArr = temp
        this.filterBool = true
        console.log('tempArr', this.tempArr);
        console.log('this alumnis', this.alumnis);
      }
    }
  }

</script>

<style scoped>


</style>
