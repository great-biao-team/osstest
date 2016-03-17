//基础控件列表
//后续再做
var MultipleSelector = Vue.extend({
    template: "#eg-multiple-selector",
    props: ['text_name', 'options']
    /*,
    ready: function(){
            $('#select-1').multiselect({
                includeSelectAllOption: true,
                enableFiltering: true
            });
    }*/
});

Vue.component('multiple-selector', MultipleSelector);
//页面列表

var PageWelcome = Vue.extend({
    template: '<div>Welcome!</div>'
});

var PageUser = Vue.extend({
    template: '<div>user ' +
    '</div>'
});

var PageGameData = Vue.extend({
    template: '#eg-game-data',
    props:['platforms','menu_id'],
    data: function(){
        return {
            serverlist:[],
            channellist:[],
            queryitem:[]
        }
    },
    ready: function(){
        //控件数据拉取
        game_id = Math.ceil(this.platforms[0].game_platform / 100000);
        this.$http({
            url: '/api/test/' + game_id + '/' + this.menu_id
            , methods: 'GET'
        }).then(function (response) {
            this.serverlist = response.data.info.serverList;
            this.channellist = response.data.info.channelList;
            this.queryitem = response.data.info.queryItem;
            console.log("get data from api");

            //selector初始化
            $('#platform-sel').multiselect();

            $('#server-sel').multiselect({
                includeSelectAllOption: true,
                enableFiltering: true
            });
            $('#server-sel').multiselect('dataprovider',this.serverlist.map(function(item){
                return {label:item.server_name, title:item.server_name, value:item.server_id}
            }));

            $('#channel-sel').multiselect({
                includeSelectAllOption: true,
                enableFiltering: true
            });
            $('#channel-sel').multiselect('dataprovider',this.channellist.map(function(item){
                return {label:item.channel_name, title:item.channel_name, value:item.channel_id}
            }));

            $('#item-sel').multiselect({
                enableFiltering: true
            });
            $('#item-sel').multiselect('dataprovider',this.queryitem.map(function(item){
                return {label:item.text_name, title:item.text_name, value:item.sql_id}
            }));

            $('#timestart').datetimepicker({
                todayHighlight: true,
                minView: 'day',
                autoClose: true
            });
            $('#timeend').datetimepicker({
                todayHighlight: true,
                minView: 'day',
                autoClose: true
            });
        }, function (response) {
            console.log(response);
        });
    },
    methods:{
        submit:function(){
            console.log($('#platform-sel').val());
            console.log($('#server-sel').val());
            console.log($('#channel-sel').val());
            console.log($('#item-sel').val());
            console.log(this.time_start);
            console.log(this.time_end);
        }
    }
});

Vue.component("/welcome", PageWelcome);
Vue.component('/user', PageUser);
Vue.component('/gamedata', PageGameData);

//Vues实例
var vm = new Vue({
    el: '#wrapper',
    data:{
        currentView: "/welcome",
        selected: -1,
        options:[],
        platforms:[],
        menu_id:0
    },
    ready: function(){
        //  获得游戏及功能列表
        this.$http({url: '/api/itemList/'
            , method: 'GET'}).then(function (response) {
            if(response.data.flag == 1){
                for(var i=0;i<response.data.info.game.length;i++){
                    var j = response.data.info.game[i].game_id;
                    this.options.push({
                        id: i,
                        game_name: response.data.info.game[i].game_name,
                        game_id: response.data.info.game[i].game_id,
                        menus: response.data.info.game[i].menus
                    });
                }
            }
            else{
                console.log("err response when get api itemlist")
        }
        }, function (response) {
            console.log("err when get api itemlist")
        });
        $('#test-selector').multiselect({
            includeSelectAllOption: true,
            enableFiltering: true,
            maxHeight: 400
        });
    },
    methods: {
        pageRefresh: function(dst, platforms, mid, other){
            this.currentView = dst;
            this.menu_id = mid;
            this.platforms = platforms;
        }
    }
});