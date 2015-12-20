# aurelia-routed-footer

## Usage

Place a `footer-view` element in your top level view.

The `footer-view` requires either the `default-module` or `default-view` property to be set. The default view/module(viewmodel) is used when no footer is specified in the route hierarchy.

To replace the default footer, just add a `footer: /path/to/module` property to the route config when configuring the router.
