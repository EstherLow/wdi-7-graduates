<template>
  <transition="modal">
  <div class="col-md-8">
  <div class="modal-wrapper" v-show="showProfile">
      <div class="modal-container">
        <h5 class="modal-header">{{ profile.name}} <button type="button" class="close" v-on:click="showProfile = false">
          <span aria-hidden="true">&times;</span></h5>
      <div class="modal-body">
        <img class="card-img-top" v-bind:src='profile.avatar_url' style="height: 250px; width: 250px">
        <h4 class="card-title">Bio</h4>
        <p class="card-text" v-if='profile.bio == null'>Bio not available </p>
        <p class="card-text" v-else>{{ profile.bio }}</p>
      </div>
    </div>
  </div>
  </div>
</div>
</transition>
</template>

<script>
  import axios from 'axios'

  export default {
    name: 'profiles',
    data () {
      return {
        profile: {},
        showProfile: false
      }
    },
    created: function () {
      let vm = this
      this.$bus.$on('showProfile', function (username) {
        console.log('showprofile hit ' + username);
        axios.get('https://api.github.com/users/' + username + '?access_token=f4a57a2b13ca28eef00bfbf2e7f3319be78433d2').then(function (response){
          vm.profile = response.data
          vm.showProfile = true
          console.log(vm.profile)
          console.log(vm.showProfile);
        }).catch(function (error) {
          console.log(error)
        })
      })
      this.$bus.$on('clearProfile', function () {
          vm.showProfile = false
      })
    }
  }
</script>

<style>
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, .5);
  display: table;
  transition: opacity .3s ease;
}

.modal-wrapper {
  position: fixed;
  z-index: 9998;
  display: table-cell;
  vertical-align: middle;
}

.modal-container {
  width: 350px;
  margin: 0px auto;
  padding: 20px 30px;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, .33);
  transition: all .3s ease;
  font-family: Helvetica, Arial, sans-serif;
}

.modal-header h3 {
  margin-top: 0;
  color: #42b983;
}

.modal-body {
  margin: 20px 0;
  max-height: 350px;
  overflow: scroll;
}

.modal-default-button {
  float: right;
}

.modal-enter {
  opacity: 0;
}

.modal-leave-active {
  opacity: 0;
}

.modal-enter .modal-container,
.modal-leave-active .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}

</style>
