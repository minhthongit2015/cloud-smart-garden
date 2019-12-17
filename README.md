# Beyond Garden

---

Hướng dẫn cài đặt `Tensorflow`
> Repo: https://github.com/tensorflow/tfjs/tree/master/tfjs-node

1. NodeJS 12.13.0 (`nvm install 12.13.0 && nvm use 12.13.0`) + Nodemon (`npm i -g nodemon`)
2. Cài đặt `python 2.7`
3. Chạy `npm install -g --production windows-build-tools` dưới quyền admin
4. `npm i @tensorflow/tfjs-node` (v1.4.0 - 16/12/2019)
5. Nếu đã cài `Tensorflow` rồi thì build lại với `npm rebuild @tensorflow/tfjs-node --build-from-source` (`npm run rebuild-tfjs`)
6. Start Server