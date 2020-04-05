<template>
  <div class="chat-container">
    <!--el-button
      size="small"
      @click="addTab(editableTabsValue)"
    >
      add tab
    </el-button-->
    <div class="char-title">
      与xxx的聊天
    </div>
    <el-tabs v-model="editableTabsValue"  :tab-position="tabPosition" type="card" closable @tab-remove="removeTab">
      <el-tab-pane
        v-for="(item) in editableTabs"
        :key="item.name"
        :label="item.title"
        :name="item.name"

      >
      <div class="message-container">
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
  export default {
    name:"Chat",
    data() {
      return {
        sendBody:"",
        tabPosition:"left",
        editableTabsValue: '5',
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
        tabIndex: 2
      }
    },
    methods: {
      sendMessage(){

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
