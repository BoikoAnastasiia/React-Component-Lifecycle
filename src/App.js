import React, { Component } from "react";

class App extends Component {
  state = { hasError: false };

  componentDidCatch(error, info) {
    // Если метод был вызван значит есть ошибка!
    // Устанавливаем состояние
    this.setState({ hasError: true });
    // Также можно отправить отчет об ошибке вашему аналитическому сервису
    // logErrorToMyService(error, info);
  }

  render() {
    // Если есть ошибка...
    if (this.state.hasError) {
      // Рендерим fallback UI
      return <h1>Something went wrong, please try again later :(</h1>;
    }

    // Если все ок, рендерим детей
    return this.props.children;
  }
}

export default App;
