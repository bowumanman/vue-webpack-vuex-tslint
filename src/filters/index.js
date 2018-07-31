import store from '../store';
// 通用过滤器
exports.csConstFilter = (data, constTYpe) => {
    let tempObj = store.state.csConst[constTYpe].filter((item) => {
        return data === item.id;
    });
    if (tempObj.length === 0) {
        return '';
    } else {
        return tempObj[0].name;
    }
};

