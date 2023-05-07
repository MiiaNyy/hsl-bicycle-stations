function Error({ error }) {
  console.log(error);
  return (
    <div>
      <h3>
        Something horrible went wrong and we could not load the component 😭
      </h3>
      <br />
      <h4>This is the error message:</h4>
      <p>🚫 {error.message} :(</p>
    </div>
  );
}

export default Error;
