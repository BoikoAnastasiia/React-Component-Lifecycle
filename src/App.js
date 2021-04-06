import React, { Component } from 'react';
import ColorPicker from './components/ColorPicker/ColorPicker';
import ToDoList from './components/ToDoList';
import initialToDos from './toDos.json';
import Container from './components/Container/Container';
import shortid from 'shortid';
import TodoEditor from './components/ToDOEditor/TodoEditor';
import Filter from './components/Filter';
import Modal from './components/Modal/Modal';
import Clock from './components/Clock';
import Tabs from './components/Tabs';
import tabs from './tabs.json';

const colorPickerOptions = [
  { label: 'red', color: '#F44336' },
  { label: 'green', color: '#4CAF50' },
  { label: 'blue', color: '#2196F3' },
  { label: 'grey', color: '#607D8B' },
  { label: 'pink', color: '#E91E63' },
  { label: 'indigo', color: '#3F51B5' },
];

class App extends Component {
  state = {
    inputValue: '',
    todos: initialToDos,
    filter: '',
    showModal: false,
  };

  componentDidUpdate(prevProps, prevState) {
    // console.log('App did update');
    if (this.state.todos !== prevState.todos) {
      localStorage.setItem('todos', JSON.stringify(this.state.todos));
    }
  }

  componentDidMount() {
    const todos = localStorage.getItem('todos');
    const parsedTodos = JSON.parse(todos);

    if (parsedTodos) {
      this.setState({ todos: parsedTodos });
    }
  }

  toggleModal = () => {
    this.setState(({ showModal }) => ({ showModal: !showModal }));
  };

  formSubmitHandler = data => {
    console.log(data);
  };

  addTodo = text => {
    const todo = {
      id: shortid.generate(),
      text,
      completed: false,
    };

    this.setState(({ todos }) => ({
      todos: [todo, ...todos],
    }));
  };

  deleteTodo = todoId => {
    this.setState(prevState => ({
      todos: prevState.todos.filter(todo => todo.id !== todoId),
    }));
  };

  toggleCompleted = todoId => {
    this.setState(({ todos }) => ({
      todos: todos.map(todo =>
        todo.id === todoId ? { ...todo, completed: !todo.completed } : todo,
      ),
    }));
  };

  changeFilter = event => {
    this.setState({ filter: event.currentTarget.value });
  };

  getFilteredTodos = () => {
    const { filter, todos } = this.state;
    const normilizeFilter = filter.toLowerCase();

    return todos.filter(todo =>
      todo.text.toLowerCase().includes(normilizeFilter),
    );
  };

  calcCompletedTodos = () => {
    const { todos } = this.state;

    return todos.reduce(
      (total, todo) => (todo.completed ? total + 1 : total),
      0,
    );
  };

  render() {
    const { todos, filter, showModal } = this.state;
    const completedTodoCount = this.calcCompletedTodos();

    const filteredTodos = this.getFilteredTodos();

    return (
      <Container>
        <button type="button" onClick={this.toggleModal}>
          Open Modal{' '}
        </button>
        {showModal && (
          <Modal onClose={this.toggleModal}>
            <h1>Hi</h1>
            <button type="button" onClick={this.toggleModal}>
              x
            </button>

            <p>
              Summary: Disco Elysium - The Final Cut is the definitive edition
              of the smash-hit RPG. Pursue your political dreams in new quests,
              meet and question more of the city's locals, and explore a whole
              extra area. Full voice-acting, controller support, and expanded
              language options also included. Get even… Expand
            </p>
          </Modal>
        )}

        {showModal && <Clock />}

        <Tabs items={tabs} />

        <h1>Todo List </h1>
        <TodoEditor onSubmit={this.addTodo} />
        <Filter value={filter} onChange={this.changeFilter} />

        <ToDoList
          todos={filteredTodos}
          onDeleteToDo={this.deleteTodo}
          onToggleCompleted={this.toggleCompleted}
        />
        <div>
          <p>Total amount: {todos.length}</p>
          <p>Total done: {completedTodoCount}</p>
        </div>

        <ColorPicker options={colorPickerOptions} />
      </Container>
    );
  }
}
export default App;
