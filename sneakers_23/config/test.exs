# ---
# Excerpted from "Real-Time Phoenix",
# published by The Pragmatic Bookshelf.
# Copyrights apply to this code. It may not be used to create training material,
# courses, books, articles, and the like. Contact us if you are in doubt.
# We make no guarantees that this code is fit for any purpose.
# Visit http://www.pragmaticprogrammer.com/titles/sbsockets for more book information.
# ---
use Mix.Config

# Configure your database
config :sneakers_23, Sneakers23.Repo,
  username: "postgres",
  password: "postgres",
  database: "sneakers_23_test",
  hostname: "db",
  pool: Ecto.Adapters.SQL.Sandbox

# We don't run a server during test. If one is required,
# you can enable the server option below.
config :sneakers_23, Sneakers23Web.Endpoint,
  http: [port: 4002],
  server: true

# Print only warnings and errors during test
config :logger, level: :warn

# Config for selenium hub, remove default browser to test on Chrome, Firefox and Edge randomly.
# config :hound,
#   driver: "selenium",
#   browser: "chrome",
#   host: "http://seleniumhub",
#   port: 4444

config :hound,
  driver: "chrome_driver",
  host: "http://chrome",
  port: 4444,
  # Avoid timeout while creating a session
  http: [timeout: 60_000, recv_timeout: 60_000, connect_timeout: 60_000]

config :sneakers_23, sql_sandbox: true
