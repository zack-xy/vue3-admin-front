<template>
  <div class="user-info-container">
    <el-card class="print-box">
      <el-button type="primary" :loading="printLoading" v-print="printObj">{{$t('msg.userInfo.print')}}</el-button>
    </el-card>
    <el-card>
      <div class="user-info-box" id="userInfoBox">
        <h2 class="title">{{$t('msg.userInfo.title')}}</h2>
        <div class="header">
          <el-descriptions :column="2" border>
            <el-descriptions-item :label="$t('msg.userInfo.name')">
              {{detailData.userName}}
            </el-descriptions-item>
            <el-descriptions-item :label="$t('msg.userInfo.sex')">
              {{detailData.gender}}
            </el-descriptions-item>
            <el-descriptions-item :label="$t('msg.userInfo.nation')">
              {{detailData.nationality}}
            </el-descriptions-item>
            <el-descriptions-item :label="$t('msg.userInfo.mobile')">
              {{detailData.mobile}}
            </el-descriptions-item>
            <el-descriptions-item :label="$t('msg.userInfo.province')">
              {{detailData.province}}
            </el-descriptions-item>
            <el-descriptions-item :label="$t('msg.userInfo.date')">
              {{$filters.dateFilter(detailData.openTime)}}
            </el-descriptions-item>
            <el-descriptions-item :label="$t('msg.userInfo.remark')" :span="2">
              <el-tag
                class="remark"
                size="small"
                v-for="(item, idx) in detailData.remark"
                :key="idx"
              >{{item}}</el-tag>
            </el-descriptions-item>
            <el-descriptions-item :label="$t('msg.userInfo.address')" :span="2">
              {{detailData.address}}
            </el-descriptions-item>
          </el-descriptions>
          <el-image class="avatar" :src="detailData.avatar"></el-image>
        </div>
        <div class="body">
          <el-descriptions direction="vertical" :column="1" border>
            <el-descriptions-item :label="$t('msg.userInfo.experience')">
              <ul>
                <li v-for="(item, idx) in detailData.experience" :key="idx">
                  <span>{{item.startTime}}</span>
                  --
                  <span>{{item.endTime}}</span>
                  <span>{{item.title}}</span>
                  <span>{{item.desc}}</span>
                </li>
              </ul>
            </el-descriptions-item>
            <el-descriptions-item :label="$t('msg.userInfo.major')">
              {{detailData.major}}
            </el-descriptions-item>
            <el-descriptions-item :label="$t('msg.userInfo.glory')">
              {{detailData.glory}}
            </el-descriptions-item>
          </el-descriptions>
        </div>
        <div class="foot">{{$t('msg.userInfo.foot')}}</div>
      </div>
    </el-card>
  </div>
</template>

<script setup>
import { getUserDetail } from '@/api/user-manage'
import { defineProps, ref } from 'vue'
import { watchSwitchLang } from '@/utils/i18n'

const props = defineProps({
  id: {
    type: String,
    required: true
  }
})

const detailData = ref({})
const getUserDetailInfo = async () => {
  console.log('id>>>>>', props.id)
  detailData.value = await getUserDetail({ id: props.id })
}
getUserDetailInfo()
watchSwitchLang(getUserDetailInfo)

// 打印相关
const printLoading = ref(false)
const printObj = {
  // 打印区域
  id: 'userInfoBox',
  // 打印标题
  popTitle: 'vue3-admin-front',
  // 打印前回调
  beforeOpenCallback () {
    printLoading.value = true
  },
  // 执行打印回调
  openCallback () {
    printLoading.value = false
  }
}
</script>

<style lang="scss" scoped>
.print-box {
  margin-bottom: 20px;
  text-align: right;
}
.user-info-box {
  width: 1024px;
  margin: 0 auto;
  .title {
    text-align: center;
    margin-bottom: 18px;
  }
  .header {
    display: flex;
    ::v-deep .el-descriptions {
      flex-grow: 1;
    }
  }
  .avatar {
    width: 187px;
    height: 201px;
    box-sizing: border-box;
    padding: 30px 20px;
    border: 1px solid #ebeef5;
    border-left: none;
  }
  .remark {
    margin-right: 12px;
  }
}
.body {
  ul {
    list-style: none;
    li {
      span {
        margin-right: 62px;
      }
    }
  }
}
.foot {
  margin-top: 42px;
  text-align: center;
}
</style>
