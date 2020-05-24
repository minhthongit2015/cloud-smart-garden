# Final Code
> `First Edition - 2020`

---

#### >Idea 01 - Quy trình xuất bản phần mềm
- **`DD` - Daily Deployment** -> Mỗi ngày một bản cập nhập phần mềm
  + Thử tưởng tượng nếu mỗi ngày đều ra bản cập nhập mới?
    + Nếu người dùng gặp lỗi gì đó thì nó có thể sẽ được fix ngay vào ngày mai - Tức là dù lỗi đó có là gì thì chỉ cần ngủ 1 giấc sang ngày hôm sau và họ lại có thể tiếp tục công việc của mình. /=)
    + Giảm áp lực lên người lập trình - Nếu biết lỗi của họ có thể fix ngay vào ngày mai thì họ sẽ k quá áp lực khi code vì biết lỡ có lỗi thì mai fix lại là xong.
  
  + Cơ hội để gắn kết hơn với người dùng:
    + Tặng một món quà hằng ngày để họ chấp nhận update lên bản mới - update là phụ, cảm giác vui vẻ của mọi người khi nhận được quà mới là chính.<br>
      Có một khuyết điểm ở **"quà tặng mỗi ngày"** trên các phần mềm khác đó là *"mọi người biết là nhà phát hành phần mềm đó đang cố nài nỉ giữ chân họ"*. Điều đó sẽ khiến họ cảm thấy k thoải mái khi có người cứ giữ chân mình.
      Còn ở đây chúng ta vừa tặng quà nhưng sẽ ít hoặc hầu như k mang tiếng "nài nỉ" đó là vì chúng ta tặng những món quà này như **"một sự xin lỗi - chân thành"**.
  
  > Hiệu ứng phụ:
    + Người dùng sẽ quen hơn với việc update và cảm thấy thoải mái hơn với nó. (vì mỗi ngày có update được nhận quà là một niềm vui)
    + Sản phẩm sẽ đi sâu hơn vào tâm trí mọi người nhờ việc tiếp xúc hằng ngày.

- - - - -

#### >Idea 02 - Tiêu chí lập trình mọi thời đại

> Viết code theo hướng tư duy, không viết theo hướng máy móc kỹ thuật.<br>
> Code không còn là để cho máy chạy nữa mà là để cho người đọc.<br>
> Vậy nên hãy tư duy đơn giản, viết code đơn giản. Như vậy mọi người sẽ dễ dàng nắm bắt, tránh mắc lỗi, tốn thời gian vô ích.

1. **`Code dễ hiểu nhất`** > Code đẹp<br>
   (Code dài mà dễ hiểu > Code ngắn gọn mà khó hiểu)<br>
   => `Đừng viết code quá đẹp!!!!`
2. **`Code đơn giản`** > Code đúng kiến trúc<br>
   (Ít method, ít file, ít rắc rối > Đúng theo Design Pattern/SOLID/Software Architecture)<br>
   Hãy tự đặt câu hỏi cho mình mỗi khi thiết kế module mới: **"Liệu có cần phải phức tạp như vậy không? Làm sao để đơn giản nhất có thể?"**<br>
   => `Đừng viết code đúng kiến trúc!!!`
3. **`Code đồng nhất nhất`** - Tránh lặp code nhất có thể<br>
   "Khi một đoạn code được viết lại nhiều lần thì nghĩa là có cách tốt hơn để làm điều đó."<br>
   => `Đừng bao giờ viết 1 đoạn code logic 2 lần, cùng 1 hằng số khai báo tại 2 nơi...!!`
4. SOLID - Thiết kế vào chi tiết
   1. **`S`** (`Single Responsibility`):<br>
      Mỗi function/method/class chỉ nhằm một chức năng duy nhất (theo đúng ý nghĩa của tên func/method/class đó).
   2. **`O`** (`Open/Closed`):<br>
      Mỗi module nên được thiết kế để tiện cho mở rộng sau này ở các module con hoặc module khác, còn bản thân nó thì cần tránh phải bị thay đổi.
   3. **`L`** (`Liskov Substitution`):<br>
      Các class con kế thừa từ class cha vẫn phải thực hiện được những việc mà class cha đã làm được.
   4. **`I`** (`Interface Segregation`):<br>
      Class con không bị buộc phải implement một method nào mà nó không cần sử dụng (Này xảy ra khi sử dụng Interface trong các ngôn ngữ *static type* (java, c#...)).<br>
      Điều này nghĩa là bạn phải thiết kế Interface hợp lý sao cho Class implement nó không bị buộc phải implement các methods trong Interface mà Class đó không muốn sử dụng.
   5. **`D`** (`Dependency Inversion`):<br>
      Khi thiết kế nên thiết kế theo hướng tư duy, không nên thiết kế theo hướng kĩ thuật!
      - Module cấp cao không phụ thuộc vào module cấp thấp
      - Interface không phụ thuộc vào Class implement nó
      - Các Class nên giao tiếp với nhau thông qua Interface
      1. => Định hình tư duy về chức năng cần thực hiện trước
      2. => Chuyển tư duy đó thành các Interface
      3. => Xây dựng các Class implement các Interface đó
      <br>(* Trong JS k có Interface)
<br>*Design Pattern chỉ cần khi bạn lập trình vào chi tiết. Nhưng trước khi vào chi tiết, bạn bắt buộc phải hiểu rõ những gì mình sắp làm. Nếu tư duy chưa rõ ràng, hãy dành thời gian để hoàn thiện nó trước. Bạn có thể vẽ nó ra giấy, note lại nó ở đâu đó một cách rõ ràng trước rồi hãy bắt đầu.

- - - - -

#### >Idea 03 - Khi nào xảy ra lỗi -> Làm sao để tránh lỗi
1. Tư duy lập trình không rõ ràng - Bạn cần biết bạn muốn làm điều gì và hãy liệt kê ra bạn sẽ làm điều đó như thế nào
   Điều này xảy ra khi người lập trình nhận thức mơ hồ về những gì mình sẽ làm.
   Điều đó sẽ dẫn đến những phần code không "hợp tự nhiên" và nó dẫn đến những lỗi sau này, và thậm chí là rất nhiều lỗi kỹ thuật/logic trong quá trình thực hiện.
2. Code quá dài
3. Code không được sắp xếp - Hãy tuân thủ theo những cấu trúc nhất định
   - CRUD
   - Với React: get/set > Constructor > Lifecycle >  Hanlder > Orther Methods > Sub-Render > Render
   *Lưu ý khi sắp xếp, hãy sắp xếp sao cho đơn giản nhất, dù có thể điều đó sẽ phá vỡ các kiến trúc đã có trước đây trong lịch sử lập trình.
4. 

- - - - -

#### >Idea 04 - Lập trình sao cho hiệu quả nhất
- Xây dựng quy trình phát triển phần mềm mới - `Quick Dev`
  1. Trong hoàn cảnh như nào chương trình sẽ được viết tốt nhất?
     1. Hiểu rõ về chức năng, kiến trúc cần thiết, yêu cầu
        - Có một điều là khi nhìn lại chương trình cũ luôn thấy nó tốt hơn
     2. Tinh thần thoải mái
        - .
     3. Tập trung cao độ
    
  2. **`Quick Dev`**
     1. Lập trình ít nhất 3 lần tại 3 thời điểm khác nhau
     2. Lập trình nhanh và gọn nhất có thể, lót đường để tái cấu trúc lại tại lần lập trình sau
     3. Mục đích là để lập trình nhanh và tốt nhất có thể
     4. Người quản lý từ cấp cao tới cấp cao hơn nữa tuyệt đối k thúc ép gâp áp lực mà hãy tạo điều kiện để họ làm ra những thứ tuyệt vời hơn
     
     => 2 Tiêu chí chính của `Quick Dev`
        1. Hãy lập trình nhanh và đừng lo ngại code quá tệ bởi vì theo quy trình bạn bắt buộc phải lập trình lại nó trong tương lai
        2. Hãy lập trình với tinh thần "lót đường" cho lần lập trình tiếp theo
        