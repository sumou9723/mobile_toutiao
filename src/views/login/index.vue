<template>
  <div>
    <!-- 导航栏 -->
    <van-nav-bar class="page-nav-bar" title="登录" />
    <!-- form -->
    <van-form @submit="onSubmit" ref="loginForm">
      <van-field
        v-model="user.mobile"
        placeholder="请输入手机号"
        :rules="rules.mobile"
        type="number"
        maxlength="11"
        name="mobile"
      >
        <i slot="left-icon" class="news news-shouji"> </i>
      </van-field>

      <van-field
        v-model="user.code"
        left-icon="smile-o"
        placeholder="请输入验证码"
        :rules="rules.code"
        type="number"
        maxlength="6"
      >
        <i slot="left-icon" class="news news-yanzhengma"></i>
        <template #button>
          <van-count-down
            v-if="isCountDownShow"
            :time="1000 * 60"
            format="ss s"
            @finish="isCountDownShow = false"
          >
          </van-count-down>
          <van-button
            v-else
            block
            class="send-sms-btn"
            round
            size="small"
            type="number"
            native-type="button"
            @click="onSendSmsCode"
            >发送验证码
          </van-button>
        </template>
      </van-field>
      <div style="margin: 16px" class="login-btn-wrap">
        <van-button class="login-btn" block type="info" native-type="submit">
          登录
        </van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
import { login, getSmsCode } from '@/api/user.js'
export default {
  name: 'loginPage',
  data() {
    return {
      user: {
        mobile: '13911111111',
        code: '246810'
      },
      rules: {
        mobile: [
          { required: true, message: '请填写手机号' },
          { pattern: /^1[3|5|7|8]\d{9}$/, message: '手机号码不规范' }
        ],
        code: [
          { required: true, message: '请填写验证码' },
          { pattern: /^\d{6}$/, message: '验证码格式错误' }
        ]
      },
      isCountDownShow: false
    }
  },
  methods: {
    async onSubmit() {
      this.$toast.loading({
        message: '登陆中...',
        forbidClick: true,
        duration: 0
      })
      const user = this.user
      try {
        const res = await login(user)
        console.log(res.data.data)
        this.$store.commit('setUser', res.data.data)
        this.$toast.success('登录成功')
        this.$router.push('/')
        // this.$router.back()
      } catch (err) {
        // console.log(err)
        if (err.response.status === 400) {
          this.$toast.fail('手机号或验证码错误')
        } else {
          this.$toast.fail('登录失败，请稍后重试')
        }
      }
    },
    async onSendSmsCode() {
      // console.log(11)
      try {
        await this.$refs.loginForm.validate('mobile')
      } catch (err) {
        return console.log('验证失败', err)
      }
      this.isCountDownShow = true
      try {
        await getSmsCode(this.user.mobile)
        this.$toast('发送成功')
      } catch (err) {
        // console.log(err)
        this.isCountDownShow = false
        if (err.response.status === 429) {
          this.$toast('发送太频繁了，请稍后重试')
        } else {
          this.$toast('发送失败，请稍后重试')
        }
      }
    }
  }
}
</script>

<style lang="less" scoped>
.news {
  font-size: 37px;
}
.send-sms-btn {
  width: 200px;
  height: 46px;
  line-height: 46px;
  background-color: #ededed;
  color: #666;
  font-size: 10px;
}
.login-btn-wrap {
  padding: 53px 33px;
  .login-btn {
    background-color: #6db4fb;
    border: none;
  }
}
</style>
