#! /bin/bash
base_root='/Users/mark/sites/m.blog/dist/'
online_root='aliyun01:/app/site/b.mcgoldfish.com/dist/'
rsync -avz --delete $base_root $online_root
