export declare const loginUser: (email: string, password: string) => Promise<any>;
export declare const signupUser: (name: string, email: string, password: string) => Promise<any>;
export declare const checkAuthStatus: () => Promise<any>;
export declare const sendChatRequest: (message: string) => Promise<any>;
export declare const getUserChats: () => Promise<any>;
export declare const deleteUserChats: () => Promise<any>;
export declare const logoutUser: () => Promise<any>;
