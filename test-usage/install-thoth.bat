@echo off

setlocal

set "target=.\node_modules\thoth-cli"

rm -rf .\node_modules\thoth-cli\dist

@REM if NOT exist .\node_modules (
@REM 	mkdir .\node_modules
@REM )

@REM if not exist %target% (
@REM 	echo [thoth-cli] directory not found. Creating it
@REM 	mkdir %target%
@REM ) else (
@REM 	echo [thoth-cli] directory already exists
@REM )

@REM if not exist %target%\package.json (
@REM 	echo [package.json] syslink not found. Creating it
@REM 	cp ..\package.json %target%\package.json
@REM ) else (
@REM 	echo [package.json] syslink already exists
@REM )

if not exist %target%\dist (
	echo [dist] syslink not found. Creating it
	cp -r ..\dist %target%\dist
) else (
	echo [dist] syslink already exists
)