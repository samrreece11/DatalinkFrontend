import BackButton from "./BackButton";

interface TitleProps {
  children: string;
  size?: 1 | 2 | 3 | 4 | 5 | 6;
  backButton?: boolean;
}
const Title = ({ children, size = 3, backButton = false }: TitleProps) => {
  return (
    <div className="title_block flex items-center justify-center relative">
      {backButton && (
        <div className="absolute left-0">
          <BackButton />
        </div>
      )}
      {size === 1 && <h1 className="title">{children}</h1>}
      {size === 2 && <h2 className="title">{children}</h2>}
      {size === 3 && <h3 className="title">{children}</h3>}
      {size === 4 && <h4 className="title">{children}</h4>}
      {size === 5 && <h5 className="title">{children}</h5>}
      {size === 6 && <h6 className="title">{children}</h6>}
    </div>
  );
};

export default Title;
