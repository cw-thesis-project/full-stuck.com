import { useEffect } from 'react';

function usePageTitle(title: string): void {
  useEffect(() => {
    document.title = title;
  }, [title]);
}

export default usePageTitle;
