#!name=GitHub Accelerate
#!desc=GitHub 访问加速 

[MITM]
hostname=%APPEND% raw.githubusercontent.com, gist.githubusercontent.com

[URL Rewrite]
^(+)$ https://github.shuikezhang0303.workers.dev/$1 302

[Rule]
DOMAIN,github.shuikezhang0303.workers.dev,DIRECT
