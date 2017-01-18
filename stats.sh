#!/usr/bin/env bash
set -eau

set +e
(
    set -eau
    FILE_LIST=`find . -type f | grep -v 'node_modules' | grep -v 'dist' | grep -v '/app/ws/vendor/' |\
        grep -v '/app/wpk/' | grep -v './.git' | grep -v './app/favicon' |\
        grep -v '/app/img/' | grep -v '.zip' | grep -v '/app/files'`
    #echo "$FILE_LIST"
    FILE_COUNT=`echo "$FILE_LIST" | wc -l`
    echo "FILE_COUNT=$FILE_COUNT"
    STAT=`wc $FILE_LIST`
    echo "STAT=$STAT"
)
STATUS=$?
if [ $STATUS -ne 0 ]; then
    echo 'error'
else
    echo 'successfull'
fi

