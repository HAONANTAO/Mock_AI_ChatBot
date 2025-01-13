import "../../App.css";
type Props = {
    to: string;
    bg: string;
    text: string;
    textColor: string;
    onClick?: () => Promise<void>;
};
declare const NavigationLink: (props: Props) => import("react/jsx-runtime").JSX.Element;
export default NavigationLink;
