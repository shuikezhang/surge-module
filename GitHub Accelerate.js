#!name=GitHub Accelerate
#!desc=GitHub 访问加速 

[MITM]
hostname=%APPEND% raw.githubusercontent.com, gist.githubusercontent.com

[URL Rewrite]
^(https?:\/\/(?:raw|gist)\.githubusercontent\.com\/.+)$ https://raw.sevencdn.com/$1 302

[Rule]
DOMAIN,raw.sevencdn.com,DIRECT
