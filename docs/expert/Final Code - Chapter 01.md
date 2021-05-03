


# Tiêu chí của lập trình?

### I. Thời gian & Chất lượng
"Trong Lập trình, tốc độ quyết định tất cả"

1. Tốn ít thời gian để thấu hiểu
   1. Viết ngắn gọn
   2. Không viết tắt
   3. Không dùng nhiều thuật ngữ chuyên sâu
   4. Trình bày đẹp, có bố cục rõ ràng, liên kết, mạch lạc
2. Tốn ít thời gian để viết
   1. Viết sao cho dễ dàng nâng cấp - Hãy hình dung về sản phẩm hoàn thiện cuối cùng
   2. Viết sao cho có khả năng sử dụng lại
3. Tốn ít thời gian để sửa lỗi
   1. Tránh làm rối hay phức tạp hóa vấn đề

### II. Các kỹ thuật & chiến lượt lập trình

1. Chiến thuật "Quick Code"
   1. Cân bằng giữa sự phức tạp và sự cần thiết của tính năng
      Hãy lập phép tính:
      + Giá trị tối đa = Giá trị hiện tại - Chi phí phải bỏ ra sau này
        Nếu code nhanh hiện tại sẽ được lợi nhuận A, nhưng sẽ phải tốn một chi phí A' lớn để cập nhập sau này
        Nếu code chậm ở hiện tại sẽ được lợi nhuận B nhỏ hơn nhưng sẽ đỡ tốn chi phí B' để cập nhập sau này
      + Khả năng hiện tại >< Khả năng sau này
        Khả năng sau này sẽ lớn hơn khả năng hiện tại nên nếu để sau này code sẽ cho ra sản phẩm tốt hơn.
        Bây giờ nếu cố gắng code cũng sẽ khó tạo ra giá trị lớn được
2. Phân tầng logic (Phân chia code)
   Mỗi tầng logic phải rõ ràng để có thể diễn tả được logic ở mức đơn giản nhất.
   Các implement tại mỗi tầng phải đồng đều về độ phức tạp với nhau.
   Tùy môi trường sẽ có số lượng tầng logic khác nhau nên cần linh hoạt.


https://sourcemaking.com/design_patterns/creational_patterns