#!/bin/sh

GIT=`which git`

${GIT} add .
${GIT} commit -m "Update code"
${GIT} push