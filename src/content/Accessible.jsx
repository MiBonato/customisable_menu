import { Link } from "react-router-dom";

function Accessible({ items }) {
  return (
    <section className="w-100">
      <h2>Pages accessibles</h2>
      <ul>
        {items.map(i => (
          <li key={i.id}>
            <Link to={i.url}>{i.name}</Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
export default Accessible;
