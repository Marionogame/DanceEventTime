import { applyMiddleware } from "redux";
import thunk from "redux-thunk";
import persist from "./persist";
import logger from "./logger";

export default applyMiddleware(thunk, logger, persist);
