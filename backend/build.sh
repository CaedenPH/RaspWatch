#!/bin/bash

echo "=======[ build | Back end | Debug ]======="
cd ../backend

mkdir -p build

cd build

cmake ..

ninja

cd ..

