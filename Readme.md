
# component-server

  Serve your component (like github) on your own server to build
  private repositories.

## Installation

    $ npm install component-server

## Usage

### component-server(1)

  This is still work in progress.  Give the server a directory with
  component repositories as `root` and it serves them.  There's no
  problem if the repositories are *bare*.

    $ bin/component-server --help

    Usage: component-server [options]

    Options:

      -h, --help        output usage information
      -V, --version     output the version number
      -p,--port <port>  port to listen on
      -r,--root <root>  root of the repositories

## Tests

   To run the unit tests use the following commands.

   $ npm install
   $ make test
