import Title from "../utils/TitleBlock";

interface Props {
  title: string;
  titleSize?: 1 | 2 | 3 | 4 | 5 | 6;
  children: React.ReactNode;
  className?: string;
  backButton?: boolean;
}
const BoxComponent = ({
  title,
  titleSize,
  children,
  className,
  backButton = false,
}: Props) => {
  return (
    <div className={`box-component ${className || ""}`.trim()}>
      <Title size={titleSize} backButton={backButton}>
        {title}
      </Title>
      <div className="body">{children}</div>
    </div>
  );
};

export default BoxComponent;
