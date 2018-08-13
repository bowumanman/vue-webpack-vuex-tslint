<template>
    <div class="content">
        <div class="main">
            <el-form ref="form" :rules="rules" :model="form" label-position="right" >
                <el-form-item label="用户名">
                    <el-input v-model="form.loginName"></el-input>
                </el-form-item>
                <el-form-item label="密码">
                    <el-input v-model="form.password"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" :loading="loginLoading" @click="onSubmit()" @keyup.enter="onSubmit('form')">登录</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
    import { mapActions } from 'vuex';
    export default {
        name: 'Login',
        data() {
            return {
                loginLoading: false,
                form: {
                    loginName: '',
                    password: '',
                },
                rules: {
                    loginName: [
                        {required: true, message: '用户名或者邮箱名不能为空', trigger: 'change'}
                    ],
                    password: [
                        {required: true, message: '密码不能为空', trigger: 'blur'}
                    ]
                },
            };
        },
        mounted() {
            document.onkeydown = event=>{
                var e = event || window.event;
                // enter 键
                if (e && e.keyCode === 13) {
                    this.onSubmit();
                }
            };
        },
        destroyed() {
            document.onkeydown = null;
        },
        methods: {
            ...mapActions(['signIn']),
            //登陆
            onSubmit() {
                this.$refs.form.validate((valid) => {
                    if (valid) {
                        this.loginLoading = true;
                        const userInfo = {
                            token: '1234qwer'
                        };
                        this.signIn(userInfo);
                        this.$router.push({name: 'home-page'});
                    }
                });
            }
        },
    };
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
    .main{
        width:500px;
        margin:15% auto;
        border:1px solid #e9e9e9;
        padding:30px 30px 50px;
    }
</style>
