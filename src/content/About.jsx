export default function About() {
  return <section className="w-100">
          <h1>About This Project</h1>
           <p>
            Customisable Menu is a React-based project designed to provide a flexible
            navigation system. It adapts to user roles, screen sizes, and allows
            drag-and-drop reordering of items.
          </p>
          <p>
            This project was built with React and demonstrates how to create a
            fully customisable navigation menu using <code>@dnd-kit</code> for drag
            and drop interactions.
          </p>
          <p>
            Features include:
          </p>
          <ul>
            <li>Drag-and-drop menu reordering</li>
            <li>Persistent user preferences</li>
            <li>Responsive design with a mobile-friendly layout</li>
            <li>Access control for menu items</li>
          </ul>
        </section>;
}
