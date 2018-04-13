<template>
  <div>
    <x-header :left-options="{showBack: false}" :right-options="{showMore: true}" @on-click-more="showMenus = true">管理系统</x-header>
    <router-view></router-view>
    <div v-transfer-dom>
      <actionsheet :menus="menus" v-model="showMenus" @on-click-menu="logoutHandle()" show-cancel></actionsheet>
    </div>
    <tabbar style="position:fixed">
      <tabbar-item link="/layout/message" selected>
        <span slot="label">Message</span>
      </tabbar-item>
      <tabbar-item link="/layout/goods">
        <span slot="label">Goods</span>
      </tabbar-item>
      <tabbar-item link="/layout/news">
        <span slot="label">News</span>
      </tabbar-item>
    </tabbar>
  </div>
</template>

<script>
import API from '@/api'
import { getUUID } from '@/utils'
import { XHeader, Actionsheet, TransferDom, ViewBox, Group, Cell, Tabbar, TabbarItem } from 'vux'

export default {
    directives: {
        TransferDom
    },
  components: {
    XHeader,
    Actionsheet,
    ViewBox,
    Group,
    Cell,
    Tabbar,
    TabbarItem
  },
  data () {
    return {
      menus: {
        menu: '注销',
      },
      showMenus: false,
      msg: 'Hello World!'
    }
  },
  methods: {
        doAction () {
            console.log(11);
        },
        logoutHandle () {
            API.common.logout().then(({data}) => {
                if (data && data.code === 0) {
                    this.$cookie.delete('token')
                    this.$router.replace({ name: 'login' })
                }
            })
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
