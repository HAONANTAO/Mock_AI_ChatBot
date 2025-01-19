import "@testing-library/jest-dom";
import { TextEncoder, TextDecoder } from "util";

// 将 TextEncoder 和 TextDecoder 添加到全局环境
global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;
