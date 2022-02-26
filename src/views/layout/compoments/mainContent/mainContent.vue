<template>
  <div class="main-container">
    <!-- <TopAside /> -->
    <!-- <TableCard /> -->
    <Content />
  </div> 
</template>

<script> 
  // import TopAside from './topAside'
  import Content from './content'
  import TableCard from './tableCard'
  // import SockJS from "sockjs-client";
  // import Stomp from "stompjs";
  import {mapState, mapGetters} from "vuex";

  export default {
    props: {},
    data() {
      return {
        timer: "",
        socket: "",
        stompClient: "",
        timmer:null,
        dialogWidth:document.body.clientWidth
      };
    },
    mounted() {
    },
    computed: {

    },
    methods: {

    },
    components: {
      // TopAside,
      Content,
      TableCard
    },
  };

</script>

<style scoped rel="stylesheet/stylus" lang="stylus">
  .main-container 
    margin-left 200px ;
    min-height 100% ;
    transition 0.25s ;
    background #F0F2F5 ;
    box-sizing border-box;
    display: flex;
    flex-direction: column;

</style>
