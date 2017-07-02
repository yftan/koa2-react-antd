/**
 * Created by tanyufeng on 2017/6/28.
 */
import React, {
    Component,
    PropTypes
} from 'react';
import {
    connect
} from 'react-redux';
import {
    addTodo,
    completeTodo,
    setVisibilityFilter,
    VisibilityFilters
} from '../actions/notes';
import {
    fetchNotes
} from '../actions/notes'
import AddTodo from '../components/AddTodo';
import TodoList from '../components/TodoList';
import Footer from '../components/Footer';
class Notes extends Component {
    constructor() {
        super()
    }

    // static fetch(state, dispatch) {
    //     const fetchTasks = []
    //     fetchTasks.push(
    //         dispatch(fetchNotes(state))
    //     )
    //     return fetchTasks
    // }

    // // 前端在组件挂载后，要判断一下这个页面的状态数据，有没有初始化，如果没有，应该加载一次
    // // 避免在前端路由跳转后，新的页面没有数据而报错
    // componentDidMount() {
    //     const {
    //         loaded
    //     } = this.props
    //     if (!loaded) {
    //         this.constructor.fetch(this.props, this.props.dispatch)
    //     }
    // }
    render() {
        const {
            dispatch,
            visibleTodos,
            visibilityFilter
        } = this.props;
        return (
            <div>
                <AddTodo
                    onAddClick={text =>
                        dispatch(addTodo(text))
                    }
                />
                <TodoList
                    todos={visibleTodos}
                    onTodoClick={index => dispatch(completeTodo(index))}
                />
                <Footer
                    filter={visibilityFilter}
                    onFilterChange={nextFilter => dispatch(setVisibilityFilter(nextFilter))}
                />
            </div>
        );
    }
}
Notes.propTypes = {
    visibleTodos: PropTypes.arrayOf(PropTypes.shape({
        text: PropTypes.string.isRequired,
        completed: PropTypes.bool.isRequired
    })),
    visibilityFilter: PropTypes.oneOf([
        'SHOW_ALL',
        'SHOW_COMPLETED',
        'SHOW_ACTIVE'
    ]).isRequired
};

function selectTodos(todos, filter) {
    switch (filter) {
        case VisibilityFilters.SHOW_ALL:
            return todos;
        case VisibilityFilters.SHOW_COMPLETED:
            return todos.filter(todo => todo.completed);
        case VisibilityFilters.SHOW_ACTIVE:
            return todos.filter(todo => !todo.completed);
    }
}
// 这里的 state 是 Connect 的组件的
function select(state) {
    return {
        visibleTodos: selectTodos(state.todos, state.visibilityFilter),
        visibilityFilter: state.visibilityFilter
    };
}
export default connect(select)(Notes);