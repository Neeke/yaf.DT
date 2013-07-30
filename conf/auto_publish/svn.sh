#!/bin/sh
svn_path_1="https://github.com/Neeke/yaf.DT.git"
svn_user="ciogao@gmail.com"
svn_passwd=""

#www path
www_path="/data/home/website3/htdocs"

#base path
cur_path="/data/home/website3/ciogao/from_svn"

#svn co path
tmp_path_1="$cur_path/tmp"
app_conf_path="$cur_path/tmp/trunk/conf"

#the back-file-path
bak_path="$cur_path/bakdir"
#上次更新的版本号
rev_file="$cur_path/rev_file.log"
#svn记录
svn_log="$cur_path/svn.log"

#获取上次版本号
test -f "$rev_file" && latest_rev=`cat $rev_file` || latest_rev=1

#echo $latest_rev


#=======================================================svn start
echo `date +%F......%T` >>$svn_log

#svn check the header-revision
head_rev=`svn info --username=$svn_user --password=$svn_passwd --no-auth-cache --non-interactive --xml $svn_path_1 | grep "revision" | head -1 |cut -d '"' -f2`

if [ "$head_rev" -gt "$latest_rev" ];then
#=======================================================如果有新版本，则发布

	svn export --force --username=$svn_user --password=$svn_passwd --no-auth-cache --non-interactive  $svn_path_1 $tmp_path_1 >>$svn_log
	#if [ "$?" == 0 ];then
		echo "$head_rev" > $rev_file
	#fi

    #避免配置
    rm -fr $app_conf_path


    #
    chmod -R 777 $tmp_path_1/trunk/uploads

        #if [ `ls -al $tmp_path_1|wc -l` != 3 ];then
        cp -pfr $tmp_path_1/trunk/*  $www_path

    #发布到192.168.1.252
    #	scp -rp $tmp_path_1/*  192.168.1.252:/var/www/WWW_ROOT_DEX
    #	fi

    #发布if [ `ls -al $tmp_path_2|wc -l` != 3 ];then
    #	cp -pfr $tmp_path_2/*  /var/comm_der/
    #	cp -pfr $tmp_path_2/*  /var/comm_dev/
    #	cp -pfr $tmp_path_2/*  /var/comm_dew/
    #发布到192.168.1.252
    #	scp -rp $tmp_path_2/*  192.168.1.252:/var/comm_dex
    #	fi

    #清空临时目录
        rm -fr $tmp_path_1/*

   echo "版本$head_rev发布完成!"

else
#=======================================================如果没
	echo "SVN上没有最新版本!无需发布"
fi
