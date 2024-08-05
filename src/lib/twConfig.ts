import resolveConfig from "tailwindcss/resolveConfig";
import tailwindConfig from "../../tailwind.config";

const twConfig = resolveConfig(tailwindConfig);

export default twConfig;
