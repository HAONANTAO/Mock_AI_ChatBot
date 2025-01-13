declare const ChatItem: ({ content, role, }: {
    content: string;
    role: "user" | "assistant";
}) => import("react/jsx-runtime").JSX.Element;
export default ChatItem;
