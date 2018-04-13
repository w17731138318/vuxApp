<template>
  <div>
    <group title="cell news">
      <cell title="VUX" value="cool" is-link></cell>
    </group>
  </div>
</template>

<script>
import { ViewBox, Group, Cell, Tabbar, TabbarItem } from 'vux'

export default {
  components: {
    ViewBox,
    Group,
    Cell,
    Tabbar,
    TabbarItem
  },
  data () {
    return {
      msg: 'Hello World!'
    }
  }
}
</script>

<style>
.vux-demo {
  text-align: center;
}
.logo {
  width: 100px;
  height: 100px
}
</style>
