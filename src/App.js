import React from "react";
import "./App.css";
import TaskForm from "./components/TaskForm";
import Control from "./components/Control";
import TaskList from "./components/TaskList";
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: [],
      isDisplayForm: false,
    };
  }
  //khởi chạy khi load lại trang
  componentWillMount() {
    if (localStorage && localStorage.getItem("tasks")) {
      var tasks = JSON.parse(localStorage.getItem("tasks"));
      this.setState({
        tasks: tasks,
      });
    }
  }
  // onGenerateData = () => {
  //   var tasks = [
  //     {
  //       id: this.generateID(),
  //       name: "hoc lap trinh",
  //       status: true,
  //     },
  //     {
  //       id: this.generateID(),
  //       name: "di boi",
  //       status: false,
  //     },
  //     {
  //       id: this.generateID(),
  //       name: "ngu",
  //       status: true,
  //     },
  //   ];
  //   this.setState({
  //     tasks: tasks,
  //   });
  //   //lưu vào localStorage
  //   localStorage.setItem("tasks", JSON.stringify(tasks));
  // };
  //random ID
  s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }
  generateID() {
    return (
      this.s4() +
      "-" +
      this.s4() +
      "-" +
      this.s4() +
      "-" +
      this.s4() +
      "-" +
      this.s4() +
      this.s4() +
      "-" +
      this.s4() +
      "-" +
      this.s4() +
      "-" +
      this.s4()
    );
  }
  onToggleForm = () => {
    this.setState({
      isDisplayForm: !this.state.isDisplayForm,
    });
  };
  onCloseForm = () => {
    this.setState({
      isDisplayForm: false,
    });
  };
  onSubmit = (data) => {
    var {tasks}=this.state;
    data.id=this.generateID();
    tasks.push(data);
    this.setState({
      tasks: tasks
    })
    localStorage.setItem('tasks',JSON.stringify(tasks)); 
  };
  render() {
    var { tasks, isDisplayForm } = this.state; //var tasks=this.state.tasks;
    var elmTasksForm = isDisplayForm ? (
      <TaskForm onCloseForm={this.onCloseForm} onSubmit={this.onSubmit} />
    ) : (
      ""
    );
    return (
      <div className="container">
        <div className="text-center">
          <h1>Quản Lý Công Việc</h1>
          <hr />
        </div>
        <div className="row">
          <div
            className={
              isDisplayForm ? "col-xs-4 col-sm-4 col-md-4 col-lg-4" : ""
            }
          >
            {/* Form */}
            {elmTasksForm}
          </div>
          <div
            className={
              isDisplayForm
                ? "col-xs-8 col-sm-8 col-md-8 col-lg-8"
                : "col-xs-12 col-sm-12 col-md-12 col-lg-12"
            }
          >
            <button
              type="button"
              className="btn btn-primary"
              onClick={this.onToggleForm}
            >
              <span className="fa fa-plus mr-5"></span>Thêm Công Việc
            </button>
            {/* <button
              type="button"
              className="btn btn-danger ml-5"
              onClick={this.onGenerateData}
            >
              Generate Data
            </button> */}
            {/* search-sort */}
            <Control />
            {/* list*/}
            <TaskList tasks={tasks} />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
