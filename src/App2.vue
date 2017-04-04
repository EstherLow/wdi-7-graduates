<template>
  <div id="app">
    <div class="ui top attached menu" id="search-bar">
      <div class="ui purple massive two item inverted menu">
        <a class="item" href="#graduates">WDI-7</a>
        <a class="item" href="#search">Projects</a>
      </div>
    </div>

    <div id="graduates">
      <alumnis></alumnis>
    </div>




    <div id="search">
        <search></search>
    </div>




  </div>
</div>
</template>

<script>
import Alumnis from './components/alumnis'
import Profiles from './components/profiles'
import Search from './components/search'

export default {
  name: 'app',
  components: {
    Alumnis, Profiles, Search
  },
}
</script>

<style scoped>
#showall {
  max-height: 500px;
  overflow-y: scroll;
}

</style>
