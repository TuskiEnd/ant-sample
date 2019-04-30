function ppHOC(WrappedComponent) {
  return class ExampleEnhance extends WrappedComponent {
    // ...
    componentDidMount() {
      super.componentDidMount();
      //
    }

    componentWillUnmount() {
      super.componentWillUnmount();
    }

    render() {
      // ...
      return super.render();
    }
  }
}
