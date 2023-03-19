<template>
  <div class="pagination">
    <button
      :disabled="myCurrentPage === 1"
      @click="setCurrentPage(myCurrentPage - 1)"
    >
      上一页
    </button>
    <!-- start要大于1 -->
    <button v-if="startEnd.start > 1" @click="setCurrentPage(1)">1</button>
    <!-- start要大于2 -->
    <button disabled v-if="startEnd.start > 2">···</button>
    <!-- 
      v-for与v-if的优先级   面试题
      v-for的优先级高, 先执行, 每个遍历都会执行v-if
      1). 将v-if判断的处理放在v-for父标签上: 只需要判断一次(原本是每个遍历的元素都会判断)  ==> 适用于判断与元素无关的情况
      2). 最好使用计算属性来去掉v-if  ===> 减少遍历的次数 ==> 适用于根据元素数据来判断的情况
    -->
    <!-- 
      <span v-if="isShow"> 
        <button v-for="item in startEndArr"  :class="{active: item===myCurrentPage}" @click="setCurrentPage(item)">{{item}}</button>
      </span> 
    -->

    <!-- <button v-for="item in startEnd.end" v-if="item>=startEnd.start" 
      :class="{active: item===myCurrentPage}" @click="setCurrentPage(item)">{{item}}</button> -->

    <button
      v-for="item in startEndArr"
      :key="item"
      :class="{ active: item === myCurrentPage }"
      @click="setCurrentPage(item)"
    >
      {{ item }}
    </button>

    <button disabled v-if="startEnd.end < totalPages - 1">···</button>
    <button
      v-if="startEnd.end < totalPages"
      @click="setCurrentPage(totalPages)"
    >
      {{ totalPages }}
    </button>
    <button
      :disabled="myCurrentPage === totalPages"
      @click="setCurrentPage(myCurrentPage + 1)"
    >
      下一页
    </button>

    <button style="margin-left: 30px" disabled>共 {{ total }} 条</button>
  </div>
</template>
<script>
export default {
  name: "MyPagination",
  /* 设计props: 从父组件(外部)传入的可变数据
		currentPage: 当前页码
		total: 所有数据的总数量
		pageSize: 每页的最大数量
		showPageNo: 最大连续页码数 */
  props: {
    currentPage: {
      //当前页码
      type: Number,
      deafult: 1,
    },
    total: {
      type: Number, //所有数据的总数量
      deafult: 0,
    },
    pageSize: {
      //每页的最大数量
      type: Number,
      deafult: 10,
    },
    showPageNo: {
      //最大连续页码数
      type: Number,
      deafult: 5,
      validator: function (value) {
        return value % 2 === 1;
      },
    },
  },
  data() {
    return {
      //初始值由父组件来决定
      // myCurrentPage:内部保存的当前页码数
      myCurrentPage: this.currentPage || 1,
      //   isShow: true,
    };
  },
  watch: {
    // 当接收到新的currentPage(本质就是Sesarch组件中的options.pageNo变化了)
    currentPage(value) {
      // this.myCurrentPage = this.currentPage
      this.myCurrentPage = value;
    },
  },
  computed: {
    /* 
      计算出包含从start到end的数组
      */
    startEndArr() {
      const { start, end } = this.startEnd;
      const arr = [];
      for (let i = start; i <= end; i++) {
        arr.push(i);
      }
      return arr;
    },
    /* 设计computed: 基于props和data计算的数据 */
    /* 	totalPages: 总页数 */
    totalPages() {
      const { total, pageSize } = this;
      return Math.ceil(total / pageSize);
    },

    startEnd() {
      /* 	start/end: 连续页码数的开始页码与结束页码 */
      let start, end;
      const { myCurrentPage, showPageNo, totalPages } = this;
      //   45[6]78
      start = myCurrentPage - Math.floor(showPageNo / 2);
      if (start < 1) {
        start = 1;
      }
      end = start + showPageNo - 1;
      if (end > totalPages) {
        end = totalPages;
        start = end - showPageNo + 1;
        if (start < 1) {
          start = 1;
        }
      }
      return { start, end };
    },
  },
  methods: {
    /* 
    设置新的当前页码
    */
    setCurrentPage(page) {
      this.CurrentPage = page;
      //分发自定义事件通知父组件
      this.$emit("currentChange", page);
    },
  },
};
</script>

<style lang="less" scoped>
.pagination {
  button {
    margin: 0 5px;
    background-color: #f4f4f5;
    color: #606266;
    outline: none;
    border-radius: 2px;
    padding: 0 4px;
    vertical-align: top;
    display: inline-block;
    font-size: 13px;
    min-width: 35.5px;
    height: 28px;
    line-height: 28px;
    cursor: pointer;
    box-sizing: border-box;
    text-align: center;
    border: 0;

    &[disabled] {
      color: #c0c4cc;
      cursor: not-allowed;
    }

    &.active {
      cursor: not-allowed;
      background-color: #409eff;
      color: #fff;
    }
  }
}
</style>





























