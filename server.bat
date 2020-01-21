@echo off
setlocal
FOR /F "tokens=*" %%i in ('type .env.dev.ini') do SET %%i
npm start
endlocal