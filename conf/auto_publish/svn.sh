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
#the last version
rev_file="$cur_path/rev_file.log"
#svn
svn_log="$cur_path/svn.log"

#get the last version
test -f "$rev_file" && latest_rev=`cat $rev_file` || latest_rev=1

#echo $latest_rev


#=======================================================svn start
echo `date +%F......%T` >>$svn_log

#svn check the header-revision
head_rev=`svn info --username=$svn_user --password=$svn_passwd --no-auth-cache --non-interactive --xml $svn_path_1 | grep "revision" | head -1 |cut -d '"' -f2`

if [ "$head_rev" -gt "$latest_rev" ];then
#=======================================================

	svn export --force --username=$svn_user --password=$svn_passwd --no-auth-cache --non-interactive  $svn_path_1 $tmp_path_1 >>$svn_log
	#if [ "$?" == 0 ];then
		echo "$head_rev" > $rev_file
	#fi

    #delete the conf_path
    rm -fr $app_conf_path


    #
    chmod -R 777 $tmp_path_1/trunk/uploads

        #if [ `ls -al $tmp_path_1|wc -l` != 3 ];then
        cp -pfr $tmp_path_1/trunk/*  $www_path

    #scp code to 192.168.1.252
    #	scp -rp $tmp_path_1/*  192.168.1.252:/var/www/WWW_ROOT_DEX
    #	fi

    #if [ `ls -al $tmp_path_2|wc -l` != 3 ];then
    #	cp -pfr $tmp_path_2/*  /var/comm_der/
    #	cp -pfr $tmp_path_2/*  /var/comm_dev/
    #	cp -pfr $tmp_path_2/*  /var/comm_dew/
    #192.168.1.252
    #	scp -rp $tmp_path_2/*  192.168.1.252:/var/comm_dex
    #	fi

    #delete the tmp_path
        rm -fr $tmp_path_1/*

   echo "the version $head_rev publish finished!"

else
#=======================================================
	echo "SVN have no new version!"
fi
