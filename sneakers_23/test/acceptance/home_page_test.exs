defmodule Acceptance.HomePageTest do
  use ExUnit.Case, async: false
  use Hound.Helpers

  # According to the documentation we should add this
  # (it will close the session at the end and release memory)
  # hound_session()

  setup do
    # The book does like this but it should not according to the documentation
    Hound.start_session()
    :ok
  end

  test "the page loads" do
    navigate_to("http://frontend:4002")
    assert page_title() == "Sneakers23"
  end
end
