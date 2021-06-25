import {debounce} from "./utils.js";
export const imgListnerMixin = {
    data() {
        return {
            // 保存回调函数
            homeListener:null,
        }
    },
    // 因为代码是放在mounted中所以这里也是混入到mounted中
    mounted() {

        const refresh = debounce(this.$refs.home_scroll.refresh,100);
        // 对监听的时间进行保存
        this.homeListener = () => {
          //this.$refs.home_scroll.refresh();
           refresh();
        };
        this.$bus.$on("itemImgLoad",this.homeListener);  
    }
}

// 返回顶部图标混入
export const backTopMixin = {
    data(){
        return {
            istopShow: false,   
        }
    },
    methods: {
        backClick(){
            this.$refs.home_scroll.scrollTo(0,0,300);
        },
    },
}