import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [todos, setTodos] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("my-todos")) || [];
    } catch {
      return [];
    }
  });

  const [task, setTask] = useState("");
  const [assessments, setAssessments] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("my-assessments")) || [];
    } catch {
      return [];
    }
  });

  const [assessment, setAssessment] = useState("");
  const [subject, setSubject] = useState("");
  const [date, setDate] = useState("");
  const [bgColor, setBgColor] = useState("#171923");
  const [font, setFont] = useState("Poppins");
  const [fontSize, setFontSize] = useState("16");

  useEffect(() => {
    localStorage.setItem("my-todos", JSON.stringify(todos));
  }, [todos]);

  useEffect(() => {
    localStorage.setItem(
      "my-assessments",
      JSON.stringify(assessments)
    );
  }, [assessments]);

  function addTodo(e) {
    e.preventDefault();
    if (!task.trim()) return;

    setTodos((prev) => [
      ...prev,
      { id: Date.now(), text: task.trim(), done: false },
    ]);
    setTask("");
  }

  function addAssessment(e) {
    e.preventDefault();
    if (!assessment.trim() || !subject.trim() || !date) return;

    setAssessments((prev) => [
      ...prev,
      {
        id: Date.now(),
        name: assessment.trim(),
        subject: subject.trim(),
        date,
      },
    ]);

    setAssessment("");
    setSubject("");
    setDate("");
  }

  return (
    <main
      className="app"
      style={{
        backgroundColor: bgColor,
        fontFamily: font,
        fontSize: `${fontSize}px`,
      }}
    >
      <header className="hero">
        <p className="eyebrow">YOUR PERSONAL STUDY SPACE</p>
        <h1>My Study Planner ✨</h1>
        <p>Organize your tasks. Plan your assessments. Reach your goals.</p>
      </header>

      <section className="settings panel">
        <h2>🎨 Customize Your Page</h2>

        <div className="settings-grid">
          <label>
            Background Color
            <input
              type="color"
              value={bgColor}
              onChange={(e) => setBgColor(e.target.value)}
            />
          </label>

          <label>
            Font Style
            <select
              value={font}
              onChange={(e) => setFont(e.target.value)}
            >
              <option value="Poppins">Poppins</option>
              <option value="Arial">Arial</option>
              <option value="Georgia">Georgia</option>
              <option value="Verdana">Verdana</option>
              <option value="monospace">Monospace</option>
            </select>
          </label>

          <label>
            Font Size
            <select
              value={fontSize}
              onChange={(e) => setFontSize(e.target.value)}
            >
              <option value="14">Small</option>
              <option value="16">Medium</option>
              <option value="18">Large</option>
              <option value="22">Extra Large</option>
            </select>
          </label>
        </div>
      </section>

      <div className="content-grid">
        <section className="panel">
          <h2>✅ My To-Do List</h2>

          <form className="entry-form" onSubmit={addTodo}>
            <input
              value={task}
              onChange={(e) => setTask(e.target.value)}
              placeholder="Enter a new task..."
              aria-label="New task"
            />
            <button type="submit">Add Task</button>
          </form>

          <p className="muted">
            {todos.filter((todo) => !todo.done).length} tasks remaining
          </p>

          {todos.length === 0 && (
            <p className="empty">No tasks yet. Add your first task!</p>
          )}

          <ul className="todo-list">
            {todos.map((todo) => (
              <li
                key={todo.id}
                className={todo.done ? "completed" : ""}
              >
                <label className="todo-label">
                  <input
                    type="checkbox"
                    checked={todo.done}
                    onChange={() =>
                      setTodos((prev) =>
                        prev.map((item) =>
                          item.id === todo.id
                            ? { ...item, done: !item.done }
                            : item
                        )
                      )
                    }
                  />
                  <span>{todo.text}</span>
                </label>

                <button
                  type="button"
                  className="delete-btn"
                  onClick={() =>
                    setTodos((prev) =>
                      prev.filter((item) => item.id !== todo.id)
                    )
                  }
                  aria-label="Delete task"
                >
                  ✕
                </button>
              </li>
            ))}
          </ul>
        </section>

        <section className="panel">
          <h2>📚 Assessment Plans</h2>
          <p className="muted">
            Organize your upcoming assessments.
          </p>

          <form className="assessment-form" onSubmit={addAssessment}>
            <input
              value={assessment}
              onChange={(e) => setAssessment(e.target.value)}
              placeholder="Assessment name"
              aria-label="Assessment name"
              required
            />

            <input
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              placeholder="Subject name"
              aria-label="Subject name"
              required
            />

            <label className="date-label">
              Assessment Date
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                required
              />
            </label>

            <button type="submit">Add Assessment</button>
          </form>

          {assessments.length === 0 && (
            <p className="empty">
              No assessments yet. Add your first assessment!
            </p>
          )}

          <div className="assessment-list">
            {assessments
              .slice()
              .sort((a, b) => a.date.localeCompare(b.date))
              .map((item) => (
                <article className="assessment-card" key={item.id}>
                  <div>
                    <h3>{item.name}</h3>
                    <p>{item.subject}</p>
                    <time>{item.date}</time>
                  </div>

                  <button
                    type="button"
                    className="delete-btn"
                    onClick={() =>
                      setAssessments((prev) =>
                        prev.filter((a) => a.id !== item.id)
                      )
                    }
                    aria-label="Delete assessment"
                  >
                    ✕
                  </button>
                </article>
              ))}
          </div>
        </section>
      </div>

      <footer>Made for a more organized you 💜</footer>
    </main>
  );
}

export default App;