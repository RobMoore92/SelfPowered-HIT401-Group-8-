import SearchFilter from "./SearchFilter";

const { render } = require("@testing-library/react");

test("renders without crashing", async () => {
  const { findByText } = render(
    <SearchFilter title={"title"} show={true} setShow={jest.fn()} />
  );
  await findByText("title");
});
