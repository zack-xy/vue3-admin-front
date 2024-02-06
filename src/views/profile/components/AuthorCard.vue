<template>
  <div class="author-container">
    <div class="header">
      <pan-thumb image="https://avatars.githubusercontent.com/u/18522167?v=4" height="60px" width="60px">
        {{$t('msg.profile.name')}}
      </pan-thumb>
      <div class="header-desc">
           <h3>
            {{$t('msg.profile.name')}}
           </h3>
           <span>
            {{$t('msg.profile.job')}}
           </span>
        </div>
    </div>
    <div class="info">
      {{$t('msg.profile.introduction')}}
    </div>
  </div>
</template>

<script setup>
import PanThumb from '@/components/PanThumb'
</script>

<style lang="scss" scoped>
.author-container {
  .header {
    display: flex;
    .header-desc {
      margin-left: 12px;
      display: flex;
      flex-direction: column;
      justify-content: space-around;
    }

    span {
      font-size: 14px;
    }
  }
}

.info {
  margin-top: 16px;
  line-height: 22px;
  font-size: 14px;
  text-indent: 26px;
}
</style>
