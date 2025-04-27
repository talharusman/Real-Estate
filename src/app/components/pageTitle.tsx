import Link from "next/link";
interface Props {
  title?: string;
  href?: string;
  linkCaption?: string;
}
const PageTitle = (props: Props) => {
  return (
    <div className="p-4 bg-gradient-to-br from-primary-400 to-secondary-500 flex justify-between">
      <h1 className="text-white text-xl font-medium">{props.title}</h1>
      {props.href!! && (
        <Link className="text-white hover:text-gray-300 transition-colors" href={props.href}>
          {props.linkCaption}
        </Link>
      )}
    </div>
  );
};

export default PageTitle;
