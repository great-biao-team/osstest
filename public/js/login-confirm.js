var vm = new Vue({
    el: '#example',
    data:{
        err: false,
        errmsg: ''
    },
    methods:{
        check: function() {
            //  request
            this.$http({url: '/api/user/check'
                ,data:{name: this.name, password:this.password}
                , method: 'POST'}).then(function (response) {
                if(response.data.flag == 1){
                    this.$data.err = false;
                    console.log(response.data.info);
                    window.location.href="home";
                }
                else{
                    this.$data.err = true;
                    this.$data.errmsg = response.data.info;
                }
            }, function (response) {
                this.$data.err = true;
                this.$data.errmsg = response.data.info;
            });
        }
}
});