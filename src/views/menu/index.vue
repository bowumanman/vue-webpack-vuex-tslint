<!--    左侧导航菜单  -->
<template>
    <div>
        <div class="content">
            <div class="left">
                <div class="ca-left-menu__logo" @click="toWelcome"><a class="russia-logo"></a></div>
                <el-menu
                    :default-active="activeUrl"
                    class="el-menu-vertical-demo"
                    @select="selectMenu"
                    :unique-opened="true"
                    background-color="#324157"
                    active-text-color="#1a85e1">
                    <div :key="index" v-for="(menu, index) in menuList">
                        <!--showType 0 没有子目录-->
                        <el-menu-item :index="menu.url" v-if="menu.showType == 0">
                            <i class="fa fa-fw" :class="menu.icon"></i>
                            <span slot="title">
                                {{menu.name}}
                                <div class="ca-badge__num" v-if="menu.name === '个人中心' && menuMap.scheduleCount != 0">{{ menuMap.scheduleCount | badgeNumFilter}}</div>
                            </span>
                        </el-menu-item>
                        <el-submenu :index="menu.id" v-else>
                            <template slot="title">
                                <i class="fa fa-fw" :class="menu.icon"></i>
                                <span>{{menu.name}}</span>
                                <div class="ca-badge__num" v-if="menu.name === '项目管理' && menuMap.holdItemCount + menuMap.quasiItemCount != 0">{{menuMap.holdItemCount + menuMap.quasiItemCount | badgeNumFilter}}</div>
                                <div class="ca-badge__num" v-if="menu.name === '基金管理' && menuMap.ansatFundCount + menuMap.estFundCount != 0">{{menuMap.ansatFundCount + menuMap.estFundCount | badgeNumFilter}}</div>
                                <div class="ca-badge__num" v-if="menu.name === '母基金管理' && menuMap.holdFoFCount != 0">{{menuMap.holdFoFCount | badgeNumFilter}}</div>
                            </template>
                            <el-menu-item-group>
                                <el-menu-item :index="menuSecond.url || menu.id" :key="menuSecond.id"
                                              v-for="(menuSecond, indexSecond) in menu.childMenus"
                                >
                                    <el-badge v-if="menuSecond.name == '投资中母基金'" :is-dot="menuMap.holdFoFCount != 0 && menuSecond.name == '投资中母基金'"><p class="router-menu">{{menuSecond.name}}</p></el-badge>
                                    <el-badge v-if="menuSecond.name == '拟投资项目'" :is-dot="menuMap.quasiItemCount != 0 && menuSecond.name == '拟投资项目'"><p class="router-menu">{{menuSecond.name}}</p></el-badge>
                                    <el-badge v-if="menuSecond.name == '持有中项目'" :is-dot="menuMap.holdItemCount != 0 && menuSecond.name == '持有中项目'"><p class="router-menu">{{menuSecond.name}}</p></el-badge>
                                    <el-badge v-if="menuSecond.name == '拟投资基金'" :is-dot="menuMap.ansatFundCount != 0 && menuSecond.name == '拟投资基金'"><p class="router-menu" >{{menuSecond.name}}</p></el-badge>
                                    <el-badge v-if="menuSecond.name == '已投资基金'" :is-dot="menuMap.estFundCount != 0 && menuSecond.name == '已投资基金'"><p class="router-menu" >{{menuSecond.name}}</p></el-badge>
                                    <p v-if="menuSecond.name != '拟投资项目' && menuSecond.name != '持有中项目' && menuSecond.name != '拟投资基金' && menuSecond.name != '已投资基金'" :class="{'ca-router--active': menuMap.isActive}" class="router-menu">{{menuSecond.name}}</p>
                                </el-menu-item>
                            </el-menu-item-group>
                        </el-submenu>
                    </div>
                    <el-menu-item index="personal-center">
                        <i class="fa fa-fw fa-user-o"></i>
                        <span slot="title">
                                个人中心
                                <div class="ca-badge__num" v-if="menuMap.scheduleCount != 0">{{ menuMap.scheduleCount | badgeNumFilter}}</div>
                            </span>
                    </el-menu-item>
                </el-menu>
                <div class="l_pos_f" style="width: 205px">
                    <div class="head_right">
                        <div class="head_r_01" style="margin-left: 20px">
                            <router-link :to="{ name: 'personal-center', params: { tabIndex: '0'}}" />
                            <h3><a class="m_l_20" :title="name">{{name}}</a></h3>
                        </div>
                        <div class="exit"><i style="color: #fff;" class="fa fa-power-off" aria-hidden="true" @click="exit()"></i></div>
                    </div>
                </div>
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
            let activeUrl = this.$route.path.split('/index/')[1].split('/')[0];
            return {
                name: this.$store.state.user.cnName,
                menuList: this.$store.state.user.menuList,
                // 菜单标识
                menuFlag: [],
                menuPicture: this.$store.state.user.headImg.imgId,
                menuIndex: false,
                // 基金和项目菜单数字和小圆点
                menuMap: this.$store.state.message,
                isAuthIndexSee: this.isNoAuth('我的首页-查看'),
                activeUrl: activeUrl,
                user: this.$store.state.user,
            }
        },
        methods: {
            // 返回头像
            returnHeadImg() {
                return this.baseURL + '/file/' + this.$store.state.user.headImg.imgId + '?X-Token=' + this.$store.state.user.token;
            },
            // 路由跳转
            selectMenu(url) {
                // 暂时处理;
                if (isNaN(Number(url))) {
                    // 报告管理单独做处理 因为他们都是同一个页面;
                    if (url.indexOf('report') !== -1) {
                        // 投中报告单独处理 在报告管理中是新页面;
                        if (url.indexOf('china') !== -1) {
                            this.$router.push({ name: url})
                        } else {
                            let name = url.split('/')[0];
                            let id = url.split('/')[1];
                            this.$router.push({ name: name, params: { id: id }})
                        }
                    } else if (url === 'personal-center') {
                        this.$router.push({ name: url, params: { tabIndex: '0' }})
                    } else if (url === 'system-settings-user-list') {
                        this.$router.push({ name: url, params: { roleId: '-1' }})
                    } else {
                        this.$router.push({ name: url})
                    }
                }
            },
            // 退出登录
            exit() {
                this.$router.push({ name: 'login'})
            },
            // 跳到欢迎页
            toWelcome() {
                this.$router.push({ name: 'welcome'})
            }
        },
    }
</script>
