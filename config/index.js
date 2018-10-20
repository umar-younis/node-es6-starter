import production from "./config.prod";
import staging from "./config.staging";
import development from "./config.dev";

const env = () => {
  let ENV = process.env.NODE_ENV ? process.env.NODE_ENV : "development";
  console.info("Environment =>", ENV);
  switch (ENV) {
    case "production":
    return production;

    case "staging":
    return staging;

    case "development":
    return development;

    default:
    return development;
  }
}

export default env();
