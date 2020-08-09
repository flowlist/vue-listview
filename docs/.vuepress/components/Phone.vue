<style lang="scss">
.phone-wrap {
  position: fixed;
  top: 100px;
  right: 25px;
  width: 384px;
  user-select: none;

  ::-webkit-scrollbar {
    width: 0;
    background: transparent;
  }

  @media (max-width: 1240px) {
    display: none;
  }

  .box {
    padding: 32px;

    .figure {
      position: relative;
      box-shadow: rgb(9, 10, 13) 0 0 0 14px, rgb(159, 163, 168) 0 0 0 17px, rgba(0, 0, 0, 0.2) 0 0 34px 17px;
      width: 100%;
      height: 680px;
      z-index: 1;
      margin: 0;
      border-radius: 20px;
      overflow: hidden;

      &.ios {
        border-radius: 32px;

        &:after {
          position: absolute;
          left: 50%;
          transform: translateX(-50%);
          background-color: rgba(0, 0, 0, 0.5);
          bottom: 6px;
          content: '';
          height: 4px;
          width: 35%;
          z-index: 1;
          border-radius: 2px;
        }
      }

      .header {
        position: relative;

        .ios-notch {
          position: absolute;
          left: 50%;
          transform: translateX(-50%);
          fill: rgb(9, 10, 13);
          top: -1px;
          width: 165px;
          z-index: 2;
        }

        .md-bar {
          position: absolute;
          left: 0;
          top: 0;
          width: 100%;
          display: block;
          fill: rgb(9, 10, 13);
          opacity: 0.1;
          z-index: 2;
          padding: 0.5rem 0.75rem;
          box-sizing: border-box;
        }
      }

      .frame-wrap {
        height: 100%;
        box-sizing: border-box;
        overflow-y: auto;
        overscroll-behavior: contain;

        iframe {
          display: block;
          width: 100%;
          height: 100%;
        }
      }
    }
  }
}
</style>

<template>
  <div class="phone-wrap">
    <div class="box">
      <div class="figure ios">
        <div class="header">
          <svg class="ios-notch" viewBox="0 0 219 31"><path d="M0 1V0h219v1a5 5 0 0 0-5 5v3c0 12.15-9.85 22-22 22H27C14.85 31 5 21.15 5 9V6a5 5 0 0 0-5-5z" fill-rule="evenodd"></path></svg>
        </div>
        <div class="frame-wrap">
          <iframe
            :src="url"
            scrolling="no"
            border="0"
            frameborder="no"
            framespacing="0"
            allowtransparency="true"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import pkg from '../../../package'

export default {
  name: 'Phone',
  props: {
    page: {
      type: String,
      required: true
    }
  },

  computed: {
    url() {
      const isProd = process.env.NODE_ENV === 'production'
      const host = isProd ? pkg.gen_url : `http://${process.env.LOCAL_IP}:9090/`
      return `${host}${this.page}`
    }
  }
}
</script>

