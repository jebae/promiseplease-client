import React from "react";
import { addDecorator } from "@storybook/react"
import '@storybook/addon-console';
import "../src/stylesheets/base.scss";

const Base = ({ children }) => <div>{ children }</div>

addDecorator(storyFn => <Base>{ storyFn() }</Base>)