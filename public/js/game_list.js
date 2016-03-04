var vm = new Vue({
    el: '#gamelist',
    data:{
        games:[]
    },
    ready: function(){
        console.log("ready");
        //  request
        this.$http({url: '/api/gamelist'
            , method: 'GET'}).then(function (response) {
            if(response.data.flag == 1){
                this.$data.games = response.data.info.games;
                console.log(response.data.info.games);
            }
            else{
            }
        }, function (response) {
        });
    }
});

//console.log(vm.games);