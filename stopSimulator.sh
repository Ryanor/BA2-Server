#!/bin/bash

#first argument is process id from server child
PID=$1;
echo "$PID";
#kill process
kill -9 $PID;