import { Banner } from "@spectrum-web-components/banner";
import { css } from "lit";

class MyBanner extends Banner {
  static styles = [
    Banner.styles,
    css`
      :host([type="info"]) {
        background-color: rgb(103, 58, 183);
      }
    `,
  ];
}

customElements.define('my-banner', MyBanner);