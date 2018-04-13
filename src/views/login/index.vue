<template>
  <div>
    <group title="管理员登录">
      <x-input title="账号：" :min="3" :max="10" v-model="dataForm.userName" placeholder="帐号"></x-input>
      <x-input title="密码：" :min="3" :max="10" v-model="dataForm.password" type="password" placeholder="密码"></x-input>
      <x-input title="验证码：" v-model="dataForm.captcha">
        <img slot="right-full-height" :src="captchaPath">
      </x-input>
      <box gap="10px 10px">
        <flexbox>
          <flexbox-item>
            <x-button type="primary" @click.native="dataFormSubmit()">登录</x-button>
          </flexbox-item>
        </flexbox>
      </box>
    </group>
  </div>
</template>

<script>
  import { Group, XInput, XButton,Box,Flexbox, FlexboxItem, Divider } from 'vux'
  import API from '@/api'
  import { getUUID } from '@/utils'
  export default {
    components: {
      Group,
      XInput,
      XButton,
      Box,
      Flexbox,
      FlexboxItem,
      Divider
    },
    data () {
      return {
        dataForm: {
          userName: '',
          password: '',
          uuid: '',
          captcha: ''
        },
        requiredRule: function (value) {
          return {
            valid: value != ''||value!=null,
            msg: '不能为空'
          }
        },
        captchaPath: ''
      }
    },
    created () {
      this.getCaptcha()
    },
    methods: {
      // 提交表单
      dataFormSubmit () {
        console.log(11);
        var params = {
            'username': this.dataForm.userName,
            'password': this.dataForm.password,
            'uuid': this.dataForm.uuid,
            'captcha': this.dataForm.captcha
          }
        API.common.login(params).then(({data}) => {
          console.log(data);
          if (data && data.code === 0) {
            this.$cookie.set('token', data.token, { expires: `${data.expire || 0}s` })
            this.$router.replace({ name: 'layout' })
          } else {
            this.getCaptcha()
            this.$message.error(data.msg)
          }
        })
      },
      // 获取验证码
      getCaptcha () {
        this.dataForm.uuid = getUUID()
        this.captchaPath = API.common.captcha(this.dataForm.uuid)
      }
    }
  }
</script>

<style>
  
</style>
