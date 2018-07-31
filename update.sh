#!/bin/sh
echo "-------注意：请先提交develop分之的代码，否则部署测试环境将会失败----------"
echo "-------切换到test分之----------"
git checkout test
echo "-------切换到test完毕----------"
echo "-------开始pull　test分之----------"
git pull origin test
echo "-------pull　test完毕----------"
echo "-------开始merge　develop分之----------"
git merge develop
echo "-------merge　develop分之完毕----------"
echo "-------开始push----------"
git push origin test
echo "-------完毕，切回develop----------"
git checkout develop

