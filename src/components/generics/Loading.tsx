import clsx from 'clsx';
import Link from 'next/link';

interface LoadingProps {
  errorInfo?: Error | string;
  isError?: boolean;
  fullpage?: boolean;
}
const Loading = ({ fullpage = false, isError = false, errorInfo = undefined }: LoadingProps) => {
  return (
    <div className={clsx('loading', { 'loading-fullpage': fullpage })}>
      <div className={'loader'}>
        {!isError ? (
          <div className={'dot-typing'} />
        ) : (
          <div>
            <h1>Oops</h1>
            <h2>Error loading page</h2>
            {errorInfo && <h3 className="errorInfo">{errorInfo.toString()}</h3>}
            <Link href='/'>Home</Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Loading;
