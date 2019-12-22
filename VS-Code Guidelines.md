
### VSCode Guidelines
> Một số gợi ý để tăng tốc lập trình với **`VS Code`**

#### [A] Hướng dẫn cơ bản
1. Phím tắt
   - [`Ctrl` + `,`]: Mở trang cài đặt
   - [`Ctrl` + `P`]: Mở file nhanh
   - [`Ctrl` + `W`]: Đóng file hiện tại
   - [`Ctrl` + `Shift` + `T`]: Mở lại file vừa 
   - [`Ctrl` + `Shift` + `P`]: Thực hiện lệnh
   - [`Alt` + `Z`]: Bật/Tắt Word wrap
   - [`Ctrl` + `/`]: Comment dòng hiện tại
   - [`Alt` + `Shift` + `A`]: Comment khối lệnh
   - [`Ctrl` + `D`]: Chọn các đoạn tương tự đoạn đang chọn
   - [`Ctrl` + `Space`]: Xem gợi ý cho câu lệnh
   - [`Ctrl` + `Shift` + `Space`]: Xem gợi ý cho tham số truyền vào hàm
   - [`Ctrl` + `.`]: Xem trợ giúp sửa lỗi nhanh cho vị trí đang chọn
   - [`Ctrl` + `Shift` + `F`]: Tìm kiếm trên tất cả file
   - [`Ctrl` + `Shift` + `H`]: Replace trên tất cả file
   - [`Ctrl` + `Shift` + `D`]: Chuyển sang tab `Debug`
   - [`Ctrl` + `Shift` + `E`]: Chuyển sang tab `Explorer`
   - [`Ctrl` + `` ` ``]: Ẩn/Hiện khung `Terminal`, `Debug Console`, `Output`...
   - [`Ctrl` + `B`]: Ẩn/Hiện khung `Sidebar`

   > xem thêm phím tắt tại `Help`>`Keyboard shortcuts Reference`

   > Cài đặt phím tắt bằng [`Ctrl + K` + `Ctrl + S`]
   
   > Khôi phục phím tắt mặc định bằng cách xóa nội dung file `keybinding.json` (Mở file đó bằng `Ctrl + Shift + P` > `Open Keyboard Shortcuts (JSON)`)
2. Tiện ích
   - ESLint
   - vscode-icons
   - Auto Close Tag
   - Auto Rename Tag
   - Arduino
4. Cài phím tắt
   - [`Ctrl + L` + `Ctrl + L`] để xóa `terminal` (`Click chuột phải` > đặt `when` thành `"terminalFocus"`)
5. Cài đặt khác
   - Tab Size: 2 spaces (nhấn [`Ctrl` + `,`] để mở trang cài đặt)


#### [B] Môi trường
1. NodeJS
   - "./vscode/`launch.json`"
   - `nodemon`
   - [`Ctrl` + `,`] > Auto Fix On Save
2. Arduino
   - "`c_cpp_properties.json`"