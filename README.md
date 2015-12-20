# aurelia-routed-footer

## Usage

Place a `footer-view` element in your top level view. The `footer-view` requires either the `default-module` or `default-view` property to be set. The default view/module(viewmodel) is used when no footer is specified in the route hierarchy. e.g.

```html
<footer-view default-view="./views/emptyfooter.html"></footer-view>
```

To replace the default footer, just add a `footer: /path/to/module` property to the route config when configuring the router. The following example switches the footer for the Edit route: 

```javascript
configureRouter(config, router){
    config.map([
      { route: '',    title: 'Search',  moduleId: 'viewmodels/search',  nav: true },
      { route: ':id', title: 'Edit',    moduleId: 'viewmodels/edit',    nav: false, footer: 'viewmodels/editfooter' }
    ]);

    this.router = router;
  }
```
