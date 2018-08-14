<!--    左侧导航菜单  -->
<template>
    <div>
        <div class="content">
            <div class="left">
                <el-menu
                    :default-active="activeUrl"
                    class="el-menu-vertical-demo"
                    @select="selectMenu"
                    :unique-opened="true"
                    background-color="#545c64"
                    text-color="#fff"
                    active-text-color="#ffd04b"
                    >
                    <el-menu-item index="home-page">
                        <i class="fa fa-fw fa-home"></i>
                        <span slot="title">我的主页</span>
                    </el-menu-item>
                    <el-submenu index="1">
                        <template slot="title">
                            <i class="fa fa-fw fa-home"></i>
                            <span>导航一12</span>
                        </template>
                        <el-menu-item index="1-1">选项1</el-menu-item>
                        <el-menu-item index="1-2">选项2</el-menu-item>
                        <el-menu-item index="1-3">选项3</el-menu-item>
                    </el-submenu>
                    <el-menu-item index="personal-center">
                        <i class="fa fa-fw fa-user-o"></i>
                        <span slot="title">个人中心</span>
                    </el-menu-item>
                </el-menu>
            </div>
            <div class="right">
                <router-view style="width:100%;"></router-view>
            </div>
        </div>
    </div>
</template>
<script type="text/ecmascript-6">
    export default {
        data() {
            const activeUrl = this.$route.path.split('/index/')[1].split('/')[0];
            return {
                activeUrl: activeUrl,
                user: this.$store.state.user,
            };
        },
        methods: {
            // 路由跳转
            selectMenu(url) {
                this.$router.push({ name: url});
            },
            // 退出登录
            exit() {
                this.$router.push({ name: 'login'});
            }
        },
    };
</script>
<style rel="stylesheet/scss" lang="scss" scoped>

</style>
