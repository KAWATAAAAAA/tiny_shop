<template>
  <div class="goods-tags-edit">
    <el-tag
      v-for="tag in dynamicTags"
      :key="tag.id"
      :type="tag.type"
      @click="collectTag(tag)"
      :ref="tag.id"
      :effect="tag.effect"
      closable
      @close="handleClose(tag)">
      {{tag.label}}
    </el-tag>
    <el-input
      class="input-new-tag"
      v-if="inputVisible"
      v-model="inputValue"
      ref="saveTagInput"
      size="small"
      @keyup.enter.native="handleInputConfirm"
      @blur="handleInputConfirm"
    >
    </el-input>
    <el-button v-else class="button-new-tag" size="small" @click="showInput">+ New Tag</el-button>
  </div>
</template>

<script>
  export default {
    name:"TagsEdit",
    props:{
      dynamicTags:{
        type:Array,
        required: true
      }
    },
    data() {
      return {
        inputVisible: false,
        inputValue:"",
      };
    },
    methods: {
      handleClose(tag) {

        this.$emit('removeDynamicTag',tag)
      },

      showInput() {
        this.inputVisible = true;
        this.$nextTick(_ => {
          this.$refs.saveTagInput.$refs.input.focus();
        });
      },

      handleInputConfirm() {
        this.$emit('addDynamicTag',this.inputValue) //去父组件改变状态
        this.inputVisible = false;
        this.inputValue = ""
      },
      collectTag(tag){
        let ref = this.$refs[tag.id][0]
        this.$emit('collectDynamicTag',tag,ref)
      }
    }
  }
</script>
<style lang="scss">
  .goods-tags-edit{
    min-width: 800px;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: flex-start;
    align-items: center;

    .el-tag + .el-tag {
      margin-left: 10px;
    }
    .button-new-tag {
      margin-left: 10px;
      height: 32px;
      line-height: 30px;
      padding-top: 0;
      padding-bottom: 0;
    }
    .input-new-tag {
      width: 90px;
      margin-left: 10px;
      vertical-align: bottom;
    }
  }

</style>
