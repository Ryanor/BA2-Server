#!/bin/bash

for PID in $(pidof $1); do
        COM_ARGU=$(xargs -0 < /proc/$PID/cmdline);
        if [[ "$COM_ARGU" == "$1 $2" ]]; then
                kill -9 $PID;
                exit 0;
        fi
done
exit 1;
