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
                    background-color="#324157"
                    active-text-color="#1a85e1">
                    <!--<div :key="index" v-for="(menu, index) in menuList">-->
                        <!---->
                    <!--</div>-->
                    <el-menu-item index="personal-center">
                        <i class="fa fa-fw fa-user-o"></i>
                        <span slot="title">
                                个人中心
                        </span>
                    </el-menu-item>
                </el-menu>
            </div>
            <div>
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
