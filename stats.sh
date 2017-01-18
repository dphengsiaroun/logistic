#!/usr/bin/env bash
set -eau

set +e
(
    set -eau
    echo 'coucou'
)
STATUS=$?
if [ $STATUS -ne 0 ]; then
    echo 'error'
else
    echo 'successfull'
fi

