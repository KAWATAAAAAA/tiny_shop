export default {

  data(){
    return{
      dialog:{
        title:'',
        component:null,
        visible:false,
        width:'50%',
        top:'15vh'
      }
    }
  },
  methods:{
    setDialog(visible = false,title='',component = null , width = '50%',top = '15vh'){
      this.dialog = {
        visible,
        title,
        component,
        width,
        top
      }
    }
  }
}
