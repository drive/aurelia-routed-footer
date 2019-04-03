import { FooterView } from "./footer-view";

declare module "aurelia-router" {
  interface Router {
    footer: any;
    registerFooterViewPort(footerView: FooterView);
    setFooter(footerContext);
  }
}