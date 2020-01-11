## **Too Long; Didn’t Read**
1. Khi tạo một `Component` mới, hãy kế thừa từ `BaseComponent` hoặc `BaseComponent.Pure` trừ khi bạn có lý do để không làm điều đó.
2. Sắp xếp các `members` và `methods` theo đúng thứ tự trong một component (Thứ tự theo mục `[A]` bên dưới).

---

### **`[A]` Bố cục của `1 Component`**
> Một số `Component` hiện vẫn chưa được sắp xếp lại theo bố cục này. Nhưng chúng ta sẽ dần sửa lại tất cả đó theo bố cục này.


```jsx
export default class extends BaseComponent {
  // 1. Getter/Setter
  get property() { return this._property; }
  set property(newValue) { this._property = newValue; }
  getDefaultValue() { return 'Hello World!'; }
  setValue(newValue) { this.value = newValue; }

  // 2. Constructor
  constructor(props) {
    super(props);

    // 2.1 Refs
    this.inputRef = React.createRef();

    // 2.2 Handlers
    this.bind(this.handleInputChange, this.toggle);

    // 2.3 Class Members
    this.id = 'some-uuid';

    // 2.4 State
    this.state = {
      isOpen: false
    };
  }

  // 3. Obvious Methods
  toggle() {
    this.setState(prevState => ({
      isOpen: !prevState.isOpen
    }));
  }

  // 4. Built-in Methods
  componentDidMount() {
    super.componentDidMount();
    this.fetchInputValue();
  }

  componentWillUnmount() {
    superrequest.post(ApiEndpoints.values, this.value);
  }

  // 5. Fetching Data
  fetchInputValue() {
    superrequest.get(ApiEndpoints.values)
      .then((res) => {
        this.setState({
          value: this.resolveValue(res.data)
        });
      })
  }

  // 6. Processing `Fetched Data`
  resolveValue(value) {
    return `${this.id}-${value}`;
  }

  // 7. Handlers
  handleInputChange(event) {
    const { target: { name, value } } = event;
    this.setState({
      [name]: this.processValue(value)
    });
  }

  // 8. Other Methods
  processValue(value) {
    return value.repeat(4);
  }

  // 9. Render's Methods
  renderHeader() {
    return (
      <div>
        {this.renderTitle()}
      </div>
    );
  }

  renderTitle() {
    return (
      <div>Component Header</div>
    );
  }

  renderContent() {
    return (
      <div>
        <div>Component Content</div>
        {this.renderSection1()}
        {this.renderSection2()}
      </div>
    );
  }

  renderSection1() {
    return (
      <div>Section 1</div>
    );
  }

  renderSection2() {
    return (
      <div>Section 2</div>
    );
  }

  // Be remember: `render()` should go last
  render() {
    return (
      <div>
        {this.renderHeader()}
        {this.renderContent()}
      </div>
    );
  }
}
```