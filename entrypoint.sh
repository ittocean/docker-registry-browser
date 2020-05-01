#!/bin/bash
set -x

find /app/js -type f -name "*.js" -print0 | xargs -0 sed -i'' -e "s/\REGISTRY_ADDRESS_PH/${VUE_APP_REGISTRY_ADDRESS}/g"
nginx -g "daemon off;"