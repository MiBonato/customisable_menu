export default function Readme() {
  return <section className="w-100">
          <h1>README</h1>
          <p>
            This application is a proof of concept for building a customisable,
            user-specific navigation menu in React.
          </p>
          <h2>Technologies Used</h2>
          <ul>
            <li>React 18 with React Router</li>
            <li>@dnd-kit/core and @dnd-kit/sortable for drag-and-drop</li>
            <li>CSS for styling</li>
          </ul>
          <h2>How It Works</h2>
          <p>
            The menu items and user data are loaded from a mock API. Users can
            rearrange menu items in edit mode, and the new order is saved for
            future sessions.
          </p>
        </section>;
}
