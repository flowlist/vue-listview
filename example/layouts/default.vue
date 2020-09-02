<style lang="scss">
#__layout {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  overflow-x: hidden;
  overflow-y: auto;
}

* {
  box-sizing: border-box;
  user-select: none;
}

ul {
  list-style-type: none;
  padding-left: 0;
  margin: 0;
}

a {
  text-decoration: none;
}

.header-shim {
  position: relative;
  height: 69px;
}

.header-bar {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 69px;
  line-height: 44px;
  font-size: 20px;
  font-weight: 500;
  padding: 25px 20px 0;
  background-color: #fff;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  user-select: none;
  z-index: 999;

  &:after {
    content: '';
    position: absolute;
    width: 100%;
    left: 0;
    bottom: -5px;
    height: 5px;
    background-position: left 0 top -2px;
    background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAHBAMAAADzDtBxAAAAD1BMVEUAAAAAAAAAAAAAAAAAAABPDueNAAAABXRSTlMUCS0gBIh/TXEAAAAaSURBVAjXYxCEAgY4UIICBmMogMsgFLtAAQCNSwXZKOdPxgAAAABJRU5ErkJggg==);
    background-repeat: repeat-x;
  }

  .back {
    color: #000;
    position: relative;
    width: 30px;
    height: 30px;

    &:before {
      content: '';
      position: absolute;
      left: 0;
      top: 10px;
      width: 10px;
      height: 10px;
      border-top: solid 2px #000;
      border-right: solid 2px #000;
      transform: rotate(-135deg);
    }

    &:after {
      content: '';
      position: absolute;
      left: 0;
      top: 50%;
      transform: translateY(-50%);
      height: 2px;
      width: 15px;
      background-color: #000;
    }

    & + .text {
      padding-right: 30px;
    }
  }

  .text {
    flex: 1;
  }

  &.ios {
    text-align: center;
    font-size: 17px;
    font-weight: 600;
    border-bottom: 1px solid #ebedf0;

    &:after {
      content: none;
    }

    .text {
      text-align: center;
    }
  }

  .qr {
    color: #000;
    position: absolute;
    margin-left: 2px;
    margin-top: 2px;
    width: 17px;
    height: 17px;
    border-radius: 1px;
    border: solid 1px #000;
    right: 26px;
    top: 38px;

    &:before {
      content: '';
      position: absolute;
      left: 3px;
      top: -2px;
      width: 9px;
      height: 19px;
      color: white;
      background-color: #fff;
      transform-origin: center;
    }

    &:after {
      content: '';
      position: absolute;
      left: 3px;
      top: -2px;
      width: 9px;
      height: 19px;
      color: white;
      background-color: #fff;
      transform-origin: center;
      transform: rotate(90deg);
    }

    .qrcode {
      position: absolute;
      top: 100%;
      right: 100%;
      border: 1px solid #ddd;
      border-radius: 5px;
      z-index: 1;
    }
  }
}

.demo-item {
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  height: 100px;
  margin: 15px 0;
  border-radius: 5px;
}

.list-view {
  padding: 0 15px;

  &__state--load,
  &__state--loading {
    height: 40px;
    line-height: 40px;
    margin-top: 15px;
    margin-bottom: 15px;
    text-align: center;
    font-size: 14px;
    background-color: rgba(lightslategray, 0.5);
    color: #fff;
    border-radius: 5px;
  }
}
</style>

<template>
  <div>
    <div class="header-bar ios">
      <div
        v-if="showBack"
        class="back"
        @click="back"
      />
      <span
        class="text"
        v-text="title"
      />
      <div
        v-if="showQRIcon"
        class="qr"
        @click.stop="showQR = !showQR"
      >
        <canvas
          v-show="showQR"
          ref="qrcode"
          class="qrcode"
        />
      </div>
    </div>
    <div class="header-shim" />
    <Nuxt />
  </div>
</template>

<script>
import QRCode from 'qrcode'

export default {
  name: 'Layout',
  data() {
    return {
      showQR: false,
      title: '',
    }
  },
  computed: {
    showTitle() {
      return this.$route.name !== 'index'
    },
    showBack() {
      return this.$route.path !== '/'
    },
    showQRIcon() {
      if (this.$isServer) {
        return false
      }
      return !('ontouchstart' in window)
    }
  },
  mounted() {
    this.generateQR()
    this.$watch('$route', () => {
      this.generateQR()
    })
    document.addEventListener('touchstart', function () {}, false)
  },
  methods: {
    back() {
      this.$router.replace({
        path: '/'
      })
    },
    generateQR(loop = 0) {
      this.$meta().refresh()
      this.title = typeof window === 'undefined' ? '' : document.title
      this.$nextTick(() => {
        if (!this.$refs.qrcode) {
          if (loop > 5) {
            return
          }
          setTimeout(() => {
            this.generateQR(loop + 1)
          }, 1000)
          return
        }
        QRCode.toCanvas(
          this.$refs.qrcode,
          `${window.location.origin}${window.location.pathname}`,
          {
            width: 250,
          }
        )
      })
    },
  },
}
</script>
