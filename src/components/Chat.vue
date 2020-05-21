<template>
  <div class="chat-container">
    <!--el-button
      size="small"
      @click="addTab(editableTabsValue)"
    >
      add tab
    </el-button-->
    <div class="char-title">
      
    </div>
    <el-tabs v-model="editableTabsValue"  :tab-position="tabPosition" type="card" closable @tab-remove="removeTab" @tab-click="handelTabClick">
      <el-tab-pane
        v-for="(item) in editableTabs"
        :key="item.name"
        :label="item.title"
        :name="item.name"

      >
      <div class="message-container">
       <!-- <div v-for="(msg,index) in receivedHistoryMessageList" :key="index" class="received-item">{{msg}}</div>
        <div v-for="(msg,index) in sendHistoryMessageList" :key="index" class="send-item">{{msg}}</div>-->
        <div v-for="(msgEntity,index) in messageQueue" :key="index" :class="{'send-item':user.userId == msgEntity.from,'received-item':user.userId != msgEntity.from}" :style="{width:`${msgEntity.from.length + msgEntity.content.length}rem`}">
          {{msgEntity.from}}:{{msgEntity.content}}
        </div>
      </div>
      <div class="send-container">
        <textarea class="send-body" v-model="sendBody">

        </textarea>
        <div class="send-footer">
          {{sendBody.length}} / 500
          <el-button type="primary" @click="sendMessage">发送</el-button>
        </div>
      </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
  import {mapState} from 'vuex'
  import Api from '../api'
  import UserAvatar from './UserAvatar'
  export default {
    name:"Chat",
    data() {
      return {
        websocket:{},
        sendBody:"",
        tabPosition:"left",
        editableTabsValue: '1',// 打开 editableTabs item中的 name 一致的窗口
        editableTabs: [
          {
            title: 'Tab 1',
            name: '1',
            content: 'Tab 1'
          },
          {
            title: 'Tab 2',
            name: '2',
            content: 'Tab 2'
          }
        ],
        ws:{},
        tabIndex: 2,
        userList:[],
        extCompoent:UserAvatar,
        sendHistoryMessageList:[],
        receivedHistoryMessageList:[],
        messageQueue:[],
        that:{}
      }
    },
    created () {
      //this.WebSocketTest()
    },
    watch:{
      userList:{
        deep:true,
        handler:function () {
          this.editableTabs = []
          for (const item of this.userList)
          {
            this.editableTabs.push({
              title:item.userNickName,
              name:item.userId + '',
              img:item.userAvatar
            })
          }
        }
      }
    },
    mounted () {
      this.that = this
      Api.getActiveUserList().then(res=>{
        console.log(res)
        if (res.code === 200)
        {
          this.userList = res.data
          this.tabIndex = this.userList.length
        }
      })

    },
    computed:{
      ...mapState('userInfo',['user'])
    },
    methods: {
      sendMessage(){
        this.ws.send(this.sendBody)
      },
      handelTabClick(tab){
        //console.log(tab)
        this.WebSocketTest(tab.name)
      },
      addTab(targetName) {
        let newTabName = ++this.tabIndex + '';
        this.editableTabs.push({
          title: 'New Tab',
          name: newTabName,
          content: 'New Tab content'
        });
        this.editableTabsValue = newTabName;
      },
      removeTab(targetName) {
        let tabs = this.editableTabs;
        let activeName = this.editableTabsValue;
        if (activeName === targetName) {
          tabs.forEach((tab, index) => {
            if (tab.name === targetName) {
              let nextTab = tabs[index + 1] || tabs[index - 1];
              if (nextTab) {
                activeName = nextTab.name;
              }
            }
          });
        }

        this.editableTabsValue = activeName;
        this.editableTabs = tabs.filter(tab => tab.name !== targetName);
      },
      WebSocketTest(userId) {
        if ("WebSocket" in window)
        {
          //alert("您的浏览器支持 WebSocket!");

          // 打开一个 web socket，建立连接
          let ws

          ws = new WebSocket(`ws://localhost:8080/tiny_shop/websocket/${userId}`)

          // 建立连接时触发
          ws.onopen = function()
          {
            // Web Socket 已连接上，使用 send() 方法发送数据

          };

          let that = this.that
          // 客户端接收服务端数据时触发
          ws.onmessage = function (evt)
          {

            let res = JSON.parse(evt.data)
            console.log(res)
            if (!res.from){
              that.$notify({
                title:'提示',
                type:'success',
                message:'已发出消息，但对方不在线 ',
                position: 'bottom-right'
              })

              that.sendHistoryMessageList.push(res.content)
              that.messageQueue.push(res)
              return
            }
            if(that.user.userId == res.from){
              console.log("这条信息是自己发出去的")
              that.sendHistoryMessageList.push(res.content)
              that.messageQueue.push(res)
            }else {
              console.log("这条信息是从别人那边收到的")
              that.receivedHistoryMessageList.push(res.content)
              that.messageQueue.push(res)
            }
          };

          ws.onclose = function()
          {
            // 关闭 websocket
            alert("连接已关闭...");
          };

          this.ws = ws
        }

        else
        {
          alert("您的浏览器不支持 WebSocket!");
        }
      }
    }
  }
</script>

<style scoped lang="scss">
  *{
    *border:1px solid red;
  }
.chat-container{
  width: 800px;
  height: 800px;
  *border:1px solid red;

}
  .char-title{
    width: 100%;
    height: 35px;
    line-height: 35px;
    background: #ffffff;
    border-bottom:1px solid  #cccccc;
  }
  .message-container{
    width: 100%;
    height: 80%;
    border-bottom: 1px solid #cccccc;
    background: #ffffff;
    position: relative;
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    justify-content: space-around;
    align-items: center;
    padding: 0 1rem;
    .received-item{
      width: auto;
      padding: .5rem;
      background: #ff4400;
      color: #ffffff;
      border-radius: 5px;
      align-self: flex-start;
    }
    .send-item{
      width: auto;
      padding: .5rem;
      background: #03a9f4;
      color: #ffffff;
      border-radius: 5px;
      align-self: flex-end;
    }
  }

  .send-container{
    width: 100%;
    height: 20%;
    background: #ffffff;
  }
  .send-body{
    border: none;
    min-width: 100%;
    max-width: 100%;
    height: 70%;
    background: inherit;
    outline: none;
    padding: 1.5rem;
    resize: none;
    overflow-x: hidden;
    overflow-y: auto;
    &::-webkit-scrollbar{
      background: #cccccc;
      width: 10px;
      -webkit-border-radius:6px;
    }
    &::-webkit-scrollbar-thumb{
      background: transparent;
    }
  }
  .send-footer{
    height: 30%;
  }
</style>

<style lang="scss">
  .chat-container{

    border-radius: 5px;
    padding: 10px;
    margin-top: 10px;
    box-shadow: 0px 2px 15px -8px rgba(0,0,0,.3);
    .el-tabs__item{
      height: 60px;
      display: flex;
      align-items: center;
      line-height: 60px;
      border-left: none;
      border-right:none;
      color: #0b2e13;
      padding-right: 0;
    }
    .el-tabs{
      width: 100%;
      height: calc(100% - 35px);
      display: flex;
      flex-direction: row;
      justify-content: flex-start;
    }
    .el-tabs__header{
      width: 150px;
      background: #ffffff;
      margin-right: 0 !important;
      border: none;

      overflow: hidden;
    }
    .el-tabs__nav{
      border: none !important;
    }

    .el-tab-pane{
      width: 100%;
      background: #f5f6f7;
    }
    .el-tabs__content{
      border: none;
      border-left: 1px solid #cccccc;
      display: flex;
      width: calc(100% - 150px);
      height: 100%;
    }
    .send-footer{
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: flex-end;
      padding: 0 1rem;
      color: #999999;
      .el-button{

        padding: 5px 10px;
        margin-left: 2rem;
      }
    }
  }
</style>
