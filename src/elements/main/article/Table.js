function Table(props) {
  return (
    <ul className="rows">
      {props.table.split("\n").map((table) => {
        return (
          <li className="column">
            <ul>
              {table.split("#T").map((cell) => (
                <li>{cell}</li>
              ))}
            </ul>
          </li>
        );
      })}
    </ul>
  );
}
export default Table;
